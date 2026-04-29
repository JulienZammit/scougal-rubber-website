# Julien — final deployment checklist

What's already done locally:
- ✅ Sanity Studio embedded at `/studio`, schemas + Author + Post + BlockContent
- ✅ All 11 articles migrated from Azure Blob to Sanity (`production` dataset, project `cisq1pi5`)
- ✅ 5 team-member Author documents seeded with their photos
- ✅ Frontend (`/blog`, `/blog/[slug]`, `/sitemap.xml`) reads from Sanity
- ✅ Old `app/blog-management/`, all related API routes, NextAuth, OpenAI, busboy: removed
- ✅ Justin invited to the project (justin.joyce@scougalrubber.com — should already see the project in his inbox)

To go live, you need to **add 3 environment variables to Azure App Service** and push the code:

---

## 1. Add Sanity env vars to Azure App Service

Open the Azure portal → App Service **scougalrubber** → **Configuration** → **Application settings**.

Add these three keys (click "New application setting" for each):

| Name | Value |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `cisq1pi5` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-10-01` |

Click **Save** at the top — Azure will restart the app.

> You don't need `SANITY_API_TOKEN` in Azure — that's only used locally for migrations. The public website reads from Sanity's CDN, no token required.

> The existing `AZURE_STORAGE_CONNECTION_STRING` can stay — it's harmless, just unused now. You can delete it later if you want to clean up.

> The existing LinkedIn vars (`CLIENT_ID`, `CLIENT_SECRET`, `REFRESH_TOKEN`, `LINKEDIN_ACCESS_TOKEN`) stay as-is for the LinkedIn feed on `/blog`.

---

## 2. Verify Justin's invite

Confirm Justin received the Sanity invitation:
- He should have an email from Sanity titled "You've been invited to Scougal Rubber Blog"
- He clicks **"Accept invitation"** → signs in with his `justin.joyce@scougalrubber.com` Google account
- After accepting, his role should be **Editor** (not Viewer or Admin) — verify on https://www.sanity.io/manage/project/cisq1pi5/members

If you invited him as Admin or another role, change it to **Editor** there.

---

## 3. Send the email to Justin

The email is ready at `docs/JUSTIN_BLOG_ONBOARDING.md`. Copy/paste the body into your mail client and send to `justin.joyce@scougalrubber.com`. The link in the email points to `https://www.scougalrubber.com/studio` — this works as soon as the deployment is live.

---

## 4. Deploy

```bash
git add -A
git commit -m "feat(blog): migrate from Azure Blob to Sanity CMS"
git push origin main
```

GitHub Actions will deploy automatically (workflow `main_scougalrubber.yml`). Wait ~3-5 minutes.

Once live, verify:
- `https://www.scougalrubber.com/blog` → shows all 11 articles
- `https://www.scougalrubber.com/blog/celebrating-solar-success` → article renders correctly with author photo
- `https://www.scougalrubber.com/studio` → loads the Sanity Studio (shows the Sanity sign-in)
- `https://www.scougalrubber.com/sitemap.xml` → includes all 11 blog URLs

---

## 5. Things you can clean up later (low priority)

These are not blocking:
- Delete the old `posts` and `images` containers in Azure Blob Storage (once you're confident the migration is complete and you don't need the source markdown files anymore — recommend keeping them for 30 days as backup).
- Remove `AZURE_STORAGE_CONNECTION_STRING` from Azure App Service config and `.env`.
- Re-tag old articles to point to `authorRef` (a real Author document) instead of the legacy embedded `author` field. The site already handles both via `coalesce`, so it's purely a cleanup task — Justin can do it gradually as he edits articles. Or I can write a one-liner script if you want it done in bulk.

---

## TL;DR — what you need to do right now

1. Add 3 env vars to Azure App Service (5 minutes)
2. Send the email at `docs/JUSTIN_BLOG_ONBOARDING.md` to Justin
3. `git push` to deploy
4. Verify the 4 URLs above

Total: ~10 minutes hands-on.
