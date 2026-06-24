import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/blogAuth";
import { storageMode } from "@/lib/blogStore";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const { ok, username } = await requireAuth();
  return NextResponse.json({
    authenticated: ok,
    username: ok ? username : null,
    mode: storageMode(),
  });
}
