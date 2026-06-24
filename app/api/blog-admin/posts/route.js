import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/blogAuth";
import { listPosts } from "@/lib/blogStore";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const { ok } = await requireAuth();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const posts = await listPosts();
    return NextResponse.json({ posts });
  } catch (e) {
    return NextResponse.json({ error: String(e?.message || e) }, { status: 500 });
  }
}
