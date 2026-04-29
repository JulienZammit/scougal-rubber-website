# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — local Next.js dev server (default port 3000).
- `npm run build` — production build. Runs `next build` then post-processes the standalone output: copies `.next/static` and `public/` into `.next/standalone/`, and **deletes** `public/sitemap.xml`, `public/sitemap-0.xml`, `public/robots.txt`, and `public/public/` from the standalone copy. Sitemap and robots are served dynamically by `app/sitemap.js` and `app/robots.js`; do not commit static versions to `public/` or the build will silently re-delete them.
- `npm start` — runs the standalone server on **PORT 8080** (`node .next/standalone/server.js`). Must run `build` first.
- `npm run lint` — `next lint` (no test framework is configured).
- Node **22.x** is required (matches CI in `.github/workflows/main_scougalrubber.yml`).

## Path alias

`@/*` resolves to the repo root (see `jsconfig.json`). Components are JSX (`tsx: false` in `components.json`); TypeScript is a devDep but the codebase is JS.

## Deployment

GitHub Actions (`main_scougalrubber.yml`) auto-deploys `main` to Azure Web App **scougalrubber** via OIDC. The build zips `.next/standalone`, `node_modules`, `package.json`, `package-lock.json` and ships the standalone server. `next.config.mjs` sets `output: 'standalone'` and `images.unoptimized: true` (Azure App Service has no Next image optimizer).

## Architecture

### Page pattern: server `page.js` + client `XxxClient.js`

Every route under `app/` follows the same split: `page.js` is a server component that exports `metadata` and renders an inlined JSON-LD `<script type="application/ld+json">`, then delegates UI to a `"use client"` sibling (e.g., `app/bearing-pads/page.js` → `BearingPadsClient.js`). When adding/editing a page, update **both**: SEO metadata + structured data live in `page.js`, all interactive UI in the client component. Many product pages set `dynamic = "force-dynamic"` to avoid stale caches. The exception is `app/studio/[[...tool]]/page.jsx` — this is the Sanity Studio mounted as a client component.

### Layout & header/footer suppression

`app/layout.js` wraps everything in `Providers` (passthrough) → `LayoutClient`. `LayoutClient` uses `useSelectedLayoutSegments()` to **hide `Header` and `Footer` on `/studio`** routes — the Sanity Studio is intentionally chrome-less. Don't add a header/footer there.

### Blog: Sanity CMS (project `cisq1pi5`, dataset `production`)

The blog is powered by Sanity. There is no in-house admin and no Azure Blob CMS.

- **Studio** is embedded at `app/studio/[[...tool]]/page.jsx` and reachable at `/studio`. Auth is delegated to Sanity (Google sign-in). The Studio config lives at `sanity.config.js` (basePath `/studio`).
- **Schemas** are in `sanity/schemas/` (`post`, `blockContent`). The post schema covers title, slug, description, cover image, OG image, category, date, reading time, embedded author, Portable Text body, SEO meta fields, and a `status` field (`draft` / `published`). Only `status == "published"` posts are returned to the public site.
- **Read client + queries** live in `service/sanity.js`. Public reads use the CDN (`useCdn: true`) with `revalidate: 60`. Used by `app/blog/page.js`, `app/blog/[slug]/page.js`, and `app/sitemap.js`.
- **Portable Text rendering**: `components/PortableTextRenderer.jsx` renders the article body. It generates anchored h2/h3 (used by the in-page table of contents via `extractHeadings`) and renders inline images through Sanity's image URL builder.
- **Images** are uploaded to Sanity's asset store and served via `cdn.sanity.io`.

### Migration (one-shot, archived)

`scripts/migrate-blog-to-sanity.mjs` migrated the original 11 markdown blogs from Azure Blob (container `posts`) to Sanity. It converts markdown → HTML → Portable Text via `marked` + `@sanity/block-tools` and uploads images to Sanity assets. Re-running the script will overwrite existing documents (`createOrReplace`).

### SEO infra (load-bearing)

- `app/sitemap.js` is `force-dynamic`, lists static product/marketing pages plus `/blog` and every blog post from `getAllPosts()` (Sanity). `NEXT_PUBLIC_APP_URL` is the base URL.
- `app/robots.js` is `force-dynamic`, **disallows `/blog-management` and `/studio`** and points at `${NEXT_PUBLIC_APP_URL}/sitemap.xml`.
- `next.config.mjs` redirects (permanent):
  - apex `scougalrubber.com` → `www.scougalrubber.com` (host-based).
  - Many legacy `.html` and old slugs → current clean URLs (`/contact.html` → `/contact-us`, `/bearingPads.html` → `/bearing-pads`, `/molded-products` → `/rubber-parts`, `/steel-laminated-elastomeric-bearings` → `/steel`, etc.). When renaming a route, **add a redirect here** to preserve SEO equity.
- Page-level metadata sets `alternates.canonical`. Keep canonicals correct on any new page.

### Email (employment applications)

`app/api/submit-application/route.js` uses `nodemailer` over SMTP (`SMTP_HOST`/`SMTP_PORT`/`SMTP_SECURE`/`SMTP_USER`/`SMTP_PASS`/`FROM_EMAIL`), accepts a base64-encoded resume, sanity-checks the PDF magic bytes (`JVBER` prefix), and sends to `info@scougalrubber.com, scougal.rubber@gmail.com` with a subject containing the chosen location (Reno/Seattle).

## Environment

`.env.local.example` documents SMTP keys. The full set used by the codebase:

- **Sanity (blog)**: `NEXT_PUBLIC_SANITY_PROJECT_ID` (= `cisq1pi5`), `NEXT_PUBLIC_SANITY_DATASET` (= `production`), `SANITY_API_TOKEN` (Editor token, only needed for migration scripts; not needed at runtime since the public site reads from CDN).
- **LinkedIn integration**: `CLIENT_ID`, `CLIENT_SECRET`, `REFRESH_TOKEN`, `LINKEDIN_ACCESS_TOKEN` (fallback if refresh fails), `LINKEDIN_ORGANIZATION_ID`.
- **SMTP (application emails)**: `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `FROM_EMAIL`.
- **URLs**: `NEXT_PUBLIC_APP_URL` (sitemap/robots), `NEXT_PUBLIC_BASE_URL` (blog post canonicals; defaults to `https://www.scougalrubber.com`).
- **Legacy (no longer required at runtime, kept for reference)**: `AZURE_STORAGE_CONNECTION_STRING` was used by the old Azure Blob blog backend; it is now only needed if re-running the migration script.

## Styling

Tailwind with `preline`, `@tailwindcss/typography`, `@tailwindcss/line-clamp` plugins. `components.json` is shadcn-style (`baseColor: neutral`, `cssVariables: false`, JSX). `tailwind.config.js` injects every theme color as a CSS custom property on `:root` (used by Aurora/sparkles UI effects in `components/ui/`). Animations come from `framer-motion` and `aos`.

## License

Proprietary — Scougal Rubber. No redistribution.
