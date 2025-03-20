import { unstable_cache } from 'next/cache'

// Variables d'environnement
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

async function getAccessToken() {
  try {
    const tokenResponse = await fetch(
      "https://www.linkedin.com/oauth/v2/accessToken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: REFRESH_TOKEN,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
        }),
      }
    );

    if (!tokenResponse.ok) {
      throw new Error(
        `Failed to refresh access token: ${tokenResponse.statusText}`
      );
    }

    const tokenData = await tokenResponse.json();
    return tokenData.access_token;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
}

const getLatestLinkedInPosts = unstable_cache(
  async () => {
    // Récupération du token
    const accessToken = await getAccessToken();

    const orgId = "urn:li:organization:15962711";
    const encodedOrgId = encodeURIComponent(orgId);

    const url = `https://api.linkedin.com/v2/ugcPosts?q=authors&authors=List(${encodedOrgId})&sortBy=LAST_MODIFIED&count=5`;

    const postsResponse = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Restli-Protocol-Version": "2.0.0",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!postsResponse.ok) {
      const errorText = await postsResponse.text();
      throw new Error(
        `Failed to fetch LinkedIn posts (${postsResponse.status}): ${errorText}`
      );
    }

    const postsData = await postsResponse.json();
    const latestPosts = postsData.elements.slice(0, 2);

    return latestPosts;
  },
  ['linkedin-latest-posts'],
  { revalidate: 5, tags: ['linkedinPosts'] }
);

// Le Handler GET principal
export async function GET() {
  try {
    // On récupère les 2 derniers posts via la fonction cachée
    const latestPosts = await getLatestLinkedInPosts();

    // On renvoie une réponse JSON
    return new Response(JSON.stringify(latestPosts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("LinkedIn API error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
