// These three values are PUBLIC by design (they appear in client-side requests
// to api.sanity.io / cdn.sanity.io). Hardcoded fallbacks ensure the build
// produces a working bundle even if env vars aren't set at build time.
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "cisq1pi5";

export const isConfigured = Boolean(projectId);
