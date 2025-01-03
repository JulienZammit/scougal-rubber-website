export async function GET() {
    try {
        // 1. D'abord récupérer l'access token
        const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: '78qm724spbii64',
                client_secret: 'WPL_AP1.bkBOngTYqwp1BVys.BtvnHQ=='
            })
        });

        if (!tokenResponse.ok) {
            throw new Error('Failed to get access token');
        }

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        // 2. Ensuite utiliser ce token pour récupérer les posts
        const orgId = "urn:li:organization:YOUR_ORGANIZATION_ID"; // Remplacez par votre vrai ID
        const encodedOrgId = encodeURIComponent(orgId);
        const url = `https://api.linkedin.com/v2/ugcPosts?q=authors&authors=List(${encodedOrgId})&sortBy=LAST_MODIFIED`;
        
        const postsResponse = await fetch(url, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'X-Restli-Protocol-Version': '2.0.0'
            },
        });

        if (!postsResponse.ok) {
            throw new Error(`LinkedIn API returned ${postsResponse.status}`);
        }

        const data = await postsResponse.json();
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}