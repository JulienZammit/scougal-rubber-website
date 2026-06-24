import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/blogAuth";
import { validatePost, slugify } from "@/lib/blogSerialize";
import { savePost } from "@/lib/blogStore";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request) {
  const { ok } = await requireAuth();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { metadata = {}, body = "", images = [], originalSlug } = await request.json();

    // Normalize slug server-side so we never trust the client blindly.
    const slug = (metadata.slug || slugify(metadata.title)).trim();
    const meta = { ...metadata, slug };

    const { ok: valid, errors } = validatePost(meta, body);
    if (!valid) return NextResponse.json({ error: errors.join(" ") }, { status: 422 });

    const result = await savePost({ metadata: meta, body, images, originalSlug });
    return NextResponse.json({ ok: true, ...result });
  } catch (e) {
    return NextResponse.json({ error: String(e?.message || e) }, { status: 500 });
  }
}
