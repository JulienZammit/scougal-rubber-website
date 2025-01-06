import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { commentary, slug, date } = await request.json();
    const prompt = `
    You are a blog post generator. The user has a LinkedIn post excerpt:

    ${commentary}

    Return a JSON object in this exact shape:

    {
    "metadata": {
        "title": "A short compelling title",
        "description": "An excerpt (max ~160 chars)",
        "slug": "${slug}",
        "canonicalUrl": "",
        "coverImage": "",
        "ogImage": "",
        "category": "",
        "tags": "",
        "date": "${date}",
        "lastModified": "",
        "status": "draft",
        "featured": false,
        "trending": false,
        "authorName": "Scott Nelson",
        "authorTitle": "Vice President Sales & Marketing",
        "authorBio": "Since 2006, Scott has played a vital role...",
        "authorAvatar": "/employees/sn.jpg",
        "readingTime": 3,
        "related": "",
        "prerequisites": ""
    },
    "blocks": [
        { "type": "h2", "text": "An example heading" },
        { "type": "text", "text": "This is an example paragraph written in Markdown syntax to demonstrate structure." }
    ]
    }

    Rules:
    1) Output must be valid JSON (no extra text, no code fences).
    2) "slug" must be exactly "${slug}".
    3) "status" must be "draft".
    4) The "blocks" section should form a complete blog post. Use Markdown syntax in the "text" fields to write headings, paragraphs, and any other relevant content inspired by the LinkedIn excerpt.
    5) The "blocks" section must contain multiple headings and paragraphs forming a coherent article. The above example is a placeholder—expand it fully to make the content complete and meaningful.
    6) Author info defaults to "Scott Nelson" if uncertain.
    7) No extra keys. Only "metadata" and "blocks" at top-level.
    8) Do not output anything except this JSON.
    9) For "tags", provide a comma-separated list of relevant keywords. These tags should be SEO-focused, comprehensive, and directly related to the LinkedIn content and the generated article.
    `;

    const openAiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_4O_MINI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      }
    );

    if (!openAiRes.ok) {
      const errText = await openAiRes.text();
      throw new Error(`OpenAI error: ${errText}`);
    }

    const jsonRes = await openAiRes.json();
    const rawText = jsonRes?.choices?.[0]?.message?.content?.trim();
    if (!rawText) {
      throw new Error("No content returned by AI");
    }

    let data;
    try {
      data = JSON.parse(rawText);
    } catch (err) {
      throw new Error("AI did not return valid JSON:\n" + rawText);
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
