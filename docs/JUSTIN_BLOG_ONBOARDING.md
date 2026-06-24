# Blog editor — how to publish

The blog has a simple built-in editor. You log in, write in a Markdown editor
with a live preview, add images, and hit **Publish**. No GitHub, no copy-paste.

---

## Part A — For the writer

### 1. Log in
Open **https://www.scougalrubber.com/blog-management** and sign in with the
username and password you were given.

### 2. The article list
After login you see all articles (published and drafts). From here you can:
- **New article** — start a fresh post.
- **Edit** (pencil) — open an existing post.
- **Delete** (trash) — remove a post.
- **View live** (arrow) — open the published article in a new tab.

### 3. Write an article
Click **New article**. Fill in the top form:

| Field | What to put |
|---|---|
| **Title** | The headline (50–70 characters works best for Google). |
| **Slug (URL)** | Auto-fills from the title → `/blog/your-slug`. Edit it if you want. |
| **Description** | 1–2 sentences for Google & the blog list. 150–160 characters is ideal. |
| **Cover image** | The main image. Click “Choose cover image”. |
| **Category / Tags** | Pick a category, add comma-separated tags. |
| **Publish date** | Defaults to now. |
| **Status** | Draft (hidden) or Published (live). |
| **Author** | Click a team member card. |

Then write the body in the **Markdown editor**:
- Toolbar buttons for **Heading 2/3**, **bold**, *italic*, lists, links, code.
- **H2** and **H3** headings automatically become the table of contents on the
  article page.
- **Insert image** (picture icon): pick a file — it’s uploaded and the image is
  inserted where your cursor is. Always keep the `![alt text](...)` description.
- The **right pane is a live preview** — it looks like the real article.

### 4. Save or publish
- **Save draft** — keeps it hidden from the website.
- **Publish** — makes it public.

> On the live site, after you click Publish the article goes live in about
> **1–2 minutes** (the site rebuilds and redeploys automatically). It’s not a bug —
> just wait a minute and refresh.

### 5. Quick SEO checklist (1 min)
- ✅ Title 50–70 characters
- ✅ Description 150–160 characters with your main keyword
- ✅ Cover image set
- ✅ At least one **H2** in the body
- ✅ Category + author selected
- ✅ Every image has alt text

---

## Part B — Admin / deployment setup (one-time, for Julien)

The editor stores articles as Markdown files in this repo
(`content/blog/*.md`) and images under `public/blog/<slug>/`. It has two modes,
chosen automatically by whether `GITHUB_TOKEN` is set.

### Local mode (development)
With **no `GITHUB_TOKEN`**, the editor writes files directly to disk. Great for
testing: run `npm run dev`, open `/blog-management`, and articles appear under
`content/blog/` instantly. Local credentials live in `.env.local`.

### GitHub mode (production)
Set these in **Azure App Service → Configuration → Application settings**:

| Variable | Value |
|---|---|
| `BLOG_ADMIN_USERNAME` | the editor login |
| `BLOG_ADMIN_PASSWORD` | the editor password |
| `BLOG_SESSION_SECRET` | random string — `openssl rand -hex 32` |
| `GITHUB_TOKEN` | fine-grained PAT, **Contents: Read and write**, this repo only |
| `GITHUB_OWNER` | `JulienZammit` |
| `GITHUB_REPO` | `scougal-rubber-website` |
| `GITHUB_BRANCH` | `main` |

With the token set, **Publish** creates a single commit (article + images) on
`main`, which the existing GitHub Actions pipeline auto-deploys. That’s the
~1–2 minute delay writers see.

**Creating the PAT:** github.com → Settings → Developer settings → Fine-grained
tokens → only this repository → Repository permissions → **Contents: Read and
write**. Paste the value into `GITHUB_TOKEN` on Azure. Never commit it.

### Security notes
- `/blog-management` and `/api/blog-admin/*` are `noindex` + disallowed in
  `robots.txt`.
- The GitHub token lives only on the server; every write route re-checks the
  signed session cookie. The browser never sees the token.
