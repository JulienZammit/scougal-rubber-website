import { unstable_cache } from "next/cache";

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const STATIC_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const ORG_URN =
  process.env.LINKEDIN_ORGANIZATION_ID || "urn:li:organization:15962711";

async function refreshAccessToken() {
  if (!REFRESH_TOKEN || !CLIENT_ID || !CLIENT_SECRET) {
    throw new Error("Missing LinkedIn OAuth env vars");
  }
  const res = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`refresh_token failed (${res.status}): ${text}`);
  }
  const data = await res.json();
  return data.access_token;
}

async function fetchPostsWithToken(accessToken) {
  const encodedOrg = encodeURIComponent(ORG_URN);
  const url = `https://api.linkedin.com/v2/ugcPosts?q=authors&authors=List(${encodedOrg})&sortBy=LAST_MODIFIED&count=5`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Restli-Protocol-Version": "2.0.0",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`ugcPosts (${res.status}): ${text}`);
  }
  const data = await res.json();
  return (data?.elements || []).slice(0, 2);
}

const getLatestLinkedInPosts = unstable_cache(
  async () => {
    let lastError = null;

    if (REFRESH_TOKEN && CLIENT_ID && CLIENT_SECRET) {
      try {
        const token = await refreshAccessToken();
        return await fetchPostsWithToken(token);
      } catch (err) {
        lastError = err;
        console.warn("LinkedIn refresh flow failed, falling back:", err.message);
      }
    }

    if (STATIC_ACCESS_TOKEN) {
      try {
        return await fetchPostsWithToken(STATIC_ACCESS_TOKEN);
      } catch (err) {
        lastError = err;
        console.error("LinkedIn static token also failed:", err.message);
      }
    }

    throw lastError || new Error("No LinkedIn credentials configured");
  },
  ["linkedin-latest-posts-v2"],
  { revalidate: 300, tags: ["linkedinPosts"] }
);

export async function GET() {
  try {
    const latestPosts = await getLatestLinkedInPosts();
    return new Response(JSON.stringify(latestPosts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("LinkedIn API error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
