# Deployment and release workflow

Find Feed Restore uses one GitHub repository (`find-feed-restore/find-feed-restore`) and one Vercel project. Vercel's Production environment serves `main`. The `develop` branch deploys as a Preview with its own domain.

## Branch and environment model

| Purpose | Git branch | Vercel environment | Public origin |
| --- | --- | --- | --- |
| Development/staging | `develop` | Preview (branch domain) | `https://dev.findfeedrestore.com` |
| Production | `main` | Production | `https://www.findfeedrestore.com` |

`dev.findfeedrestore.com` is assigned to the `develop` branch, so every `develop` deployment updates it. Other branches and pull requests receive ordinary Preview URLs. Ordinary feature work must not be committed directly to `main`.

Preview deployments (`VERCEL_ENV=preview`) send `X-Robots-Tag: noindex, nofollow`, add a `noindex, nofollow` robots meta tag to every page, and serve a `robots.txt` that disallows everything, so the dev site stays out of search results. Canonical URLs, the sitemap, and structured data always point to `https://www.findfeedrestore.com`.

## One-time Vercel setup

- **Production branch:** `main` (Settings → Environments → Production).
- **Dev domain:** add `dev.findfeedrestore.com` under Settings → Domains and assign it to the `develop` Git branch.
- **Environment variables:** the five server-only variables (`RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`, `INSTAGRAM_ACCESS_TOKEN`, `INSTAGRAM_ACCOUNT_ID`) must target Preview as well as Production so the trailer form and Hope In Action feed work on dev.
- **Deployment Protection:** disable Vercel Authentication, or the dev domain sits behind a Vercel login. Even "All except custom domains" protects a custom domain assigned to a Preview branch.

## DNS (Cloudflare)

Add a `CNAME dev` record pointing to the target Vercel shows for `dev.findfeedrestore.com`, set to **DNS only** (not proxied) so Vercel manages TLS. Do not change the `www`, apex, email (`MX`, SPF/DKIM `TXT`), or Resend records. If Vercel asks for ownership verification, add the `TXT _vercel` value it provides.

## Sitemap

`/sitemap.xml` (for search engines) and the `/sitemap/` page (for visitors) are built from `src/data/sitemap-pages.json`. After adding, removing, or substantially changing a page, rescan the site against a local production build and commit the updated JSON:

```sh
npm run build && npm run start   # in one terminal
QA_BASE_URL=http://localhost:3000 npm run sitemap:scan
```

The scan crawls internal links from the homepage, keeps pages that return 200 with a matching canonical URL and no `noindex`, records each page's images and last git change date, and fails if it finds a broken internal link. New pages appear under "More Pages" on `/sitemap/` until they are added to a section in `src/lib/sitemap.ts`.

## Daily development

1. Branch from `develop` for non-trivial work.
2. Implement and test the change (`npm run lint`, `npx tsc --noEmit`, `npm run build`).
3. Merge or push the approved work to `develop`.
4. Let Vercel deploy `develop` to `dev.findfeedrestore.com`.
5. Review the change there.

## Production release

1. Open a pull request from `develop` into `main`.
2. Confirm lint, TypeScript, `git diff --check`, and the production build pass.
3. Merge to `main`; Vercel deploys it to Production automatically.
4. Smoke-test the changed pages on `https://www.findfeedrestore.com`.

## Hotfix and rollback

For a production hotfix, branch from `main`, fix and test, merge into `main`, verify the production deployment, then merge `main` back into `develop` immediately.

For a rollback, use Vercel's Instant Rollback to restore the last known-good production deployment, then revert or correct the responsible `main` commit through a reviewed PR.
