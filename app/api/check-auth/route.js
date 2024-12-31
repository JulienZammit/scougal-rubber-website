// app/api/check-auth/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  const { username, password } = await request.json();
  const envUser = process.env.BLOG_BUILD_USERNAME;
  const envPass = process.env.BLOG_BUILD_PASSWORD;

  if (username === envUser && password === envPass) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
