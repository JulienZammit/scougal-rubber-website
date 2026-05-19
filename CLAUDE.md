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

### Layout

`app/layout.js` wraps everything in `Providers` (passthrough) → `LayoutClient`. `LayoutClient` always renders `Header` + `Footer` around the page content. (There used to be chrome-hiding logic for `/studio` and `/blog-management`; both routes were removed.)

### Blog: file-based markdown

The blog is powered by plain markdown files in `content/blog/*.md`. No CMS, no database — just commit a `.md` file and it shows up.

- **Articles** live in `content/blog/<slug>.md`. Filename (minus `.md`) is the default slug; override with `slug:` in frontmatter.
- **Frontmatter** (YAML) supports: `title`, `description`, `slug`, `coverImage` (path under `public/` or absolute URL), `ogImage`, `category`, `tags[]`, `date` (ISO 8601), `lastModified`, `status` (`published` or `draft`; non-published is hidden), `featured`, `trending`, `author { name, title, bio, avatar, twitter, linkedin }`, `readingTime` (auto-computed from word count if omitted), `wordCount`, `canonicalUrl`, `twitterCard`, `twitterCreator`. See any file in `content/blog/` for a full example.
- **Body** is Markdown (GFM). Inline images use standard `![alt](/path/to/image.jpg)` — store image assets under `public/blog/<some-folder>/` and reference them with absolute paths (`/blog/myarticle/banner1.jpg`).
- **Reader/parser**: `service/blog.js` exposes `getAllPosts()`, `getAllPostSlugs()`, `getPostBySlug(slug)`, and `extractHeadings(markdown)`. It uses `gray-matter` for frontmatter and `marked` (v18) for Markdown → HTML, with a custom renderer that injects `id` attributes on `h2`/`h3` (matched against `extractHeadings` so the in-page table of contents anchors line up) and adds `loading="lazy"` to inline `<img>`.
- **Routes**: `app/blog/page.js` lists all published posts; `app/blog/[slug]/page.js` renders a single post via `generateStaticParams()` (SSG). Both inject JSON-LD on the server.
- **To add a new article**: drop a new `.md` in `content/blog/`, add any referenced images to `public/blog/<folder>/`, commit, and deploy. The sitemap, blog index, and static `[slug]` route all pick it up at build time.

### SEO infra (load-bearing)

- `app/sitemap.js` is `force-dynamic`, lists static product/marketing pages plus `/blog` and every blog post from `getAllPosts()` (filesystem). `NEXT_PUBLIC_APP_URL` is the base URL.
- `app/robots.js` is `force-dynamic` and points at `${NEXT_PUBLIC_APP_URL}/sitemap.xml`. No disallows are needed since `/studio` and `/blog-management` are gone.
- `next.config.mjs` redirects (permanent):
  - apex `scougalrubber.com` → `www.scougalrubber.com` (host-based).
  - Many legacy `.html` and old slugs → current clean URLs (`/contact.html` → `/contact-us`, `/bearingPads.html` → `/bearing-pads`, `/molded-products` → `/rubber-parts`, `/steel-laminated-elastomeric-bearings` → `/steel`, etc.). When renaming a route, **add a redirect here** to preserve SEO equity.
- Page-level metadata sets `alternates.canonical`. Keep canonicals correct on any new page.

### Email (employment applications)

`app/api/submit-application/route.js` uses `nodemailer` over SMTP (`SMTP_HOST`/`SMTP_PORT`/`SMTP_SECURE`/`SMTP_USER`/`SMTP_PASS`/`FROM_EMAIL`), accepts a base64-encoded resume, sanity-checks the PDF magic bytes (`JVBER` prefix), and sends to `info@scougalrubber.com, scougal.rubber@gmail.com` with a subject containing the chosen location (Reno/Seattle).

## Environment

`.env.local.example` documents SMTP keys. The full set used by the codebase:

- **LinkedIn integration**: `CLIENT_ID`, `CLIENT_SECRET`, `REFRESH_TOKEN`, `LINKEDIN_ACCESS_TOKEN` (fallback if refresh fails), `LINKEDIN_ORGANIZATION_ID`.
- **SMTP (application emails)**: `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `FROM_EMAIL`.
- **URLs**: `NEXT_PUBLIC_APP_URL` (sitemap/robots), `NEXT_PUBLIC_BASE_URL` (blog post canonicals; defaults to `https://www.scougalrubber.com`).

The blog has no environment dependencies — articles are checked into the repo under `content/blog/`.

## Styling

Tailwind with `preline`, `@tailwindcss/typography`, `@tailwindcss/line-clamp` plugins. `components.json` is shadcn-style (`baseColor: neutral`, `cssVariables: false`, JSX). `tailwind.config.js` injects every theme color as a CSS custom property on `:root` (used by Aurora/sparkles UI effects in `components/ui/`). Animations come from `framer-motion` and `aos`.

## License

Proprietary — Scougal Rubber. No redistribution.
