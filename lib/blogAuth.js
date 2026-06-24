// lib/blogAuth.js
//
// Minimal, dependency-free auth for the blog editor. A single shared login
// (username/password from env) is exchanged for an HMAC-signed, httpOnly cookie.
// The GitHub token never touches the browser — every write route re-verifies the
// cookie server-side via requireAuth().

import crypto from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "blog_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

// In local dev we fall back to a fixed secret so the editor works out of the box
// without any setup. In production BLOG_SESSION_SECRET must be set.
function secret() {
  return (
    process.env.BLOG_SESSION_SECRET ||
    "dev-only-insecure-secret-change-me-in-production"
  );
}

function b64url(buf) {
  return Buffer.from(buf)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function hmac(data) {
  return b64url(crypto.createHmac("sha256", secret()).update(data).digest());
}

/**
 * Create a signed session token for the given username.
 */
export function signSession(username) {
  const payload = b64url(
    JSON.stringify({ u: username, exp: Date.now() + SESSION_TTL_MS })
  );
  return `${payload}.${hmac(payload)}`;
}

/**
 * Verify a session token. Returns { valid, username }.
 */
export function verifySession(token) {
  if (!token || typeof token !== "string" || !token.includes(".")) {
    return { valid: false };
  }
  const [payload, sig] = token.split(".");
  const expected = hmac(payload);
  // Constant-time compare; bail if lengths differ (timingSafeEqual throws then).
  if (
    sig.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
  ) {
    return { valid: false };
  }
  try {
    const { u, exp } = JSON.parse(Buffer.from(payload, "base64").toString("utf8"));
    if (!exp || Date.now() > exp) return { valid: false };
    return { valid: true, username: u };
  } catch {
    return { valid: false };
  }
}

/**
 * Constant-time credential check against env config.
 */
export function checkCredentials(username, password) {
  const u = process.env.BLOG_ADMIN_USERNAME || "";
  const p = process.env.BLOG_ADMIN_PASSWORD || "";
  if (!u || !p) return false; // refuse login if not configured
  const a = crypto.createHash("sha256").update(`${username}`).digest();
  const b = crypto.createHash("sha256").update(`${u}`).digest();
  const c = crypto.createHash("sha256").update(`${password}`).digest();
  const d = crypto.createHash("sha256").update(`${p}`).digest();
  return crypto.timingSafeEqual(a, b) && crypto.timingSafeEqual(c, d);
}

const cookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: SESSION_TTL_MS / 1000,
});

/**
 * Set the session cookie (call from the login route).
 */
export async function setSessionCookie(username) {
  const store = await cookies();
  store.set(SESSION_COOKIE, signSession(username), cookieOptions());
}

/**
 * Clear the session cookie (logout).
 */
export async function clearSessionCookie() {
  const store = await cookies();
  store.set(SESSION_COOKIE, "", { ...cookieOptions(), maxAge: 0 });
}

/**
 * Read & verify the current session. Returns { ok, username }.
 * Use at the top of every protected route handler.
 */
export async function requireAuth() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  const { valid, username } = verifySession(token);
  return { ok: valid, username };
}
