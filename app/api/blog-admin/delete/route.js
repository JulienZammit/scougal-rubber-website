import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/blogAuth";
import { deletePost } from "@/lib/blogStore";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request) {
  const { ok } = await requireAuth();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { slug } = await request.json();
    if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    const result = await deletePost(slug);
    return NextResponse.json({ ok: true, ...result });
  } catch (e) {
    return NextResponse.json({ error: String(e?.message || e) }, { status: 500 });
  }
}
