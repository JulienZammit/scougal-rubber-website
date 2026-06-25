// lib/githubCommit.js
//
// Thin GitHub REST client (native fetch, no SDK dependency). Used only in
// production "github" storage mode. The headline feature is commitFiles(): it
// writes a Markdown file plus any number of images in a SINGLE commit via the
// Git Data API, so publishing triggers exactly one deploy.

const API = "https://api.github.com";

function cfg() {
  // Trim to survive stray whitespace/newlines pasted into Azure App Settings,
  // a common cause of GitHub "401: Bad credentials".
  const owner = process.env.GITHUB_OWNER?.trim();
  const repo = process.env.GITHUB_REPO?.trim();
  const branch = process.env.GITHUB_BRANCH?.trim() || "main";
  const token = process.env.GITHUB_TOKEN?.trim();
  if (!owner || !repo || !token) {
    throw new Error(
      "GitHub storage is enabled but GITHUB_OWNER / GITHUB_REPO / GITHUB_TOKEN are not all set."
    );
  }
  return { owner, repo, branch, token };
}

async function gh(path, { method = "GET", body, token } = {}) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      "User-Agent": "scougal-blog-editor",
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) {
    throw new Error(
      `GitHub ${method} ${path} → ${res.status}: ${data.message || text}`
    );
  }
  return data;
}

/**
 * Commit multiple files in one commit.
 * @param {Object}   opts
 * @param {string}   opts.message
 * @param {Array<{path:string, content:string, encoding?:'utf-8'|'base64'}>} opts.files
 * @returns {Promise<{commit:string, url:string}>}
 */
export async function commitFiles({ message, files }) {
  const { owner, repo, branch, token } = cfg();
  const base = `/repos/${owner}/${repo}`;

  // 1) Current branch tip + its tree.
  const ref = await gh(`${base}/git/ref/heads/${branch}`, { token });
  const headSha = ref.object.sha;
  const headCommit = await gh(`${base}/git/commits/${headSha}`, { token });
  const baseTree = headCommit.tree.sha;

  // 2) Create a blob per file.
  const treeItems = [];
  for (const f of files) {
    const blob = await gh(`${base}/git/blobs`, {
      method: "POST",
      token,
      body: { content: f.content, encoding: f.encoding || "utf-8" },
    });
    treeItems.push({ path: f.path, mode: "100644", type: "blob", sha: blob.sha });
  }

  // 3) New tree → commit → move the branch ref.
  const tree = await gh(`${base}/git/trees`, {
    method: "POST",
    token,
    body: { base_tree: baseTree, tree: treeItems },
  });
  const commit = await gh(`${base}/git/commits`, {
    method: "POST",
    token,
    body: { message, tree: tree.sha, parents: [headSha] },
  });
  await gh(`${base}/git/refs/heads/${branch}`, {
    method: "PATCH",
    token,
    body: { sha: commit.sha },
  });

  return { commit: commit.sha, url: commit.html_url };
}

/**
 * List the .md files in content/blog on the branch.
 * @returns {Promise<Array<{name:string, path:string}>>}
 */
export async function listBlogDir() {
  const { owner, repo, branch, token } = cfg();
  try {
    const items = await gh(
      `/repos/${owner}/${repo}/contents/content/blog?ref=${branch}`,
      { token }
    );
    return (Array.isArray(items) ? items : [])
      .filter((i) => i.type === "file" && i.name.endsWith(".md"))
      .map((i) => ({ name: i.name, path: i.path }));
  } catch (e) {
    if (String(e.message).includes("404")) return [];
    throw e;
  }
}

/**
 * Fetch a raw file's UTF-8 contents (and its blob sha, needed for delete).
 * @returns {Promise<{content:string, sha:string}|null>}
 */
export async function getFile(path) {
  const { owner, repo, branch, token } = cfg();
  try {
    const data = await gh(
      `/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
      { token }
    );
    const content = Buffer.from(data.content, "base64").toString("utf8");
    return { content, sha: data.sha };
  } catch (e) {
    if (String(e.message).includes("404")) return null;
    throw e;
  }
}

/**
 * Delete a single file (its .md). Images are intentionally left in place (v1).
 */
export async function deleteFile(path, message) {
  const { owner, repo, branch, token } = cfg();
  const existing = await getFile(path);
  if (!existing) return { ok: true, already: true };
  await gh(`/repos/${owner}/${repo}/contents/${path}`, {
    method: "DELETE",
    token,
    body: { message, sha: existing.sha, branch },
  });
  return { ok: true };
}
