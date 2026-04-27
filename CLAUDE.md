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

Every route under `app/` follows the same split: `page.js` is a server component that exports `metadata` and renders an inlined JSON-LD `<script type="application/ld+json">`, then delegates UI to a `"use client"` sibling (e.g., `app/bearing-pads/page.js` → `BearingPadsClient.js`). When adding/editing a page, update **both**: SEO metadata + structured data live in `page.js`, all interactive UI in the client component. Many product pages set `dynamic = "force-dynamic"` to avoid stale caches.

### Layout & header/footer suppression

`app/layout.js` wraps everything in `Providers` (NextAuth `SessionProvider`) → `LayoutClient`. `LayoutClient` uses `useSelectedLayoutSegments()` to **hide `Header` and `Footer` on `/blog-management`** routes — the admin UI is intentionally chrome-less. Don't add a header/footer there.

### Blog: Azure Blob Storage as CMS

There is no database. Posts are Markdown files with `gray-matter` frontmatter stored in Azure Blob Storage:

- Container `posts` — `.md` files (slug = blob name without `.md`).
- Container `images` — uploaded post images (blob name = UUID + extension).

`service/postsAzure.js` is the live reader (`getAllPosts`, `getPostBySlug`) used by `app/blog/page.js`, `app/blog/[slug]/page.js`, and `app/sitemap.js`. **`service/posts.js` is a legacy filesystem reader (`process.cwd()/posts/`) and is not wired into any route — do not introduce new callers; use `postsAzure.js`.**

API routes under `app/api/` implement the CMS:

- `list-posts` (GET) — public, lists frontmatter-stripped post metadata.
- `get-post?slug=…` (GET) — public, returns frontmatter + raw markdown.
- `generate-post` (POST) — auth-gated, creates/updates a post. Builds the YAML frontmatter from a `metadata` object plus a `blocks` array (`h1|h2|h3|text|image`) and uploads the result. **Image GC**: before overwriting, parses old image URLs from frontmatter (`coverImage`, `ogImage`) and inline `![](...)` markdown, diffs against the new content, and deletes any old image blob whose URL contains `IMAGE_DOMAIN` (default `myblogimages.blob.core.windows.net`).
- `delete-post` (POST) — auth-gated, deletes the `.md` and all referenced images on the same domain.
- `upload-image` (POST) — auth-gated, multipart via `busboy` (forces `runtime = "nodejs"`), writes to `images` container, returns the blob URL.
- `ai/generate-post-data` (POST) — auth-gated, calls OpenAI `gpt-4o-mini` to draft a `{ metadata, blocks }` JSON for a given LinkedIn excerpt and slug.
- `linkedin-latest-posts` (GET) — public, refreshes the LinkedIn org access token (via `CLIENT_ID`/`CLIENT_SECRET`/`REFRESH_TOKEN`) and fetches the 2 most recent posts for org `urn:li:organization:15962711`. Wrapped in `unstable_cache` with a 5-second `revalidate`.

Any new write API in this area must (a) call `getServerSession(authOptions)` and (b) preserve image GC if it mutates post content.

### Auth

`app/api/auth/[...nextauth]/route.js` exports `authOptions` (JWT strategy) with a single `CredentialsProvider`. Valid credentials are env-driven (`BLOG_BUILD_USERNAME` / `BLOG_BUILD_PASSWORD`); the user object is `{ id: "internal-user", role: "admin" }`. There is no DB user table — this is admin-only access for the in-app blog editor. Other API routes import `authOptions` from this path; keep that re-export stable.

### SEO infra (load-bearing)

- `app/sitemap.js` is `force-dynamic`, lists static product/marketing pages plus `/blog` and every blog post from `getAllPosts()`. `NEXT_PUBLIC_APP_URL` is the base URL.
- `app/robots.js` is `force-dynamic`, **disallows `/blog-management`** and points at `${NEXT_PUBLIC_APP_URL}/sitemap.xml`.
- `next.config.mjs` redirects (permanent):
  - apex `scougalrubber.com` → `www.scougalrubber.com` (host-based).
  - Many legacy `.html` and old slugs → current clean URLs (`/contact.html` → `/contact-us`, `/bearingPads.html` → `/bearing-pads`, `/molded-products` → `/rubber-parts`, `/steel-laminated-elastomeric-bearings` → `/steel`, etc.). When renaming a route, **add a redirect here** to preserve SEO equity.
- Page-level metadata sets `alternates.canonical`. Keep canonicals correct on any new page.

### Email (employment applications)

`app/api/submit-application/route.js` uses `nodemailer` over SMTP (`SMTP_HOST`/`SMTP_PORT`/`SMTP_SECURE`/`SMTP_USER`/`SMTP_PASS`/`FROM_EMAIL`), accepts a base64-encoded resume, sanity-checks the PDF magic bytes (`JVBER` prefix), and sends to `info@scougalrubber.com, scougal.rubber@gmail.com` with a subject containing the chosen location (Reno/Seattle).

## Environment

`.env.local.example` documents SMTP + NextAuth keys. The full set used by the codebase:

- `AZURE_STORAGE_CONNECTION_STRING` — required for the entire blog CMS.
- `IMAGE_DOMAIN` — host used to identify "our" image blobs eligible for GC (default `myblogimages.blob.core.windows.net`).
- `NEXTAUTH_SECRET`, `NEXTAUTH_URL`.
- `BLOG_BUILD_USERNAME`, `BLOG_BUILD_PASSWORD` — admin login.
- `OPENAI_API_KEY` — AI draft endpoint.
- `CLIENT_ID`, `CLIENT_SECRET`, `REFRESH_TOKEN` — LinkedIn OAuth.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `FROM_EMAIL` — application emails.
- `NEXT_PUBLIC_APP_URL` — used by sitemap/robots; `NEXT_PUBLIC_BASE_URL` — used by blog post canonicals (defaults to `https://www.scougalrubber.com`).

## Styling

Tailwind with `preline`, `@tailwindcss/typography`, `@tailwindcss/line-clamp` plugins. `components.json` is shadcn-style (`baseColor: neutral`, `cssVariables: false`, JSX). `tailwind.config.js` injects every theme color as a CSS custom property on `:root` (used by Aurora/sparkles UI effects in `components/ui/`). Animations come from `framer-motion` and `aos`.

## License

Proprietary — Scougal Rubber. No redistribution.
