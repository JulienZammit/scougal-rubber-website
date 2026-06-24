import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/blogAuth";
import { getPost } from "@/lib/blogStore";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request) {
  const { ok } = await requireAuth();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const slug = new URL(request.url).searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  try {
    const post = await getPost(slug);
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ post });
  } catch (e) {
    return NextResponse.json({ error: String(e?.message || e) }, { status: 500 });
  }
}
