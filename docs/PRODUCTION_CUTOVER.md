# Production Cutover Preparation

Preparation date: 2026-08-11

Production source: <https://www.findfeedrestore.com/>

## Readiness summary

- Certified application baseline: `441e86ccfd57bff2e54a6e377c148a4e892c681a` (`441e86c`)
- Certification status: **PASS — READY FOR CUTOVER**
- Cutover configuration status: **HOLD — OWNER VERIFICATION REQUIRED**
- DNS changed: **No**
- Production WordPress changed: **No**
- Production traffic switched: **No**

The application is certified, but production traffic must not be switched until the owning Vercel account completes the project, environment, domain, and analytics checks below. The available Vercel CLI session is authenticated to a different team and cannot inspect the intended project. No duplicate Vercel project was created and no setting was guessed.

## Certified baseline and repository

The native-Instagram certification refresh started with `main`, `HEAD`, and `origin/main` all matching accepted commit `441e86c`, and the working tree was clean. The remote is `https://github.com/find-feed-restore/find-feed-restore.git`. `.visual-qa/`, `.env*` overrides, `.next/`, and dependencies remain ignored; no secret file is tracked.

The prior certified commit has a successful GitHub/Vercel deployment record for the intended `findfeedrestore/find-feed-restore` project. Accepted baseline `441e86c` passes the optimized production build locally, but this preparation milestone does not deploy it. The available Vercel access still cannot independently confirm the owning project's dashboard settings, latest deployment selection, or Production environment-variable scope.

The repository root is the application root. `package.json` uses Next.js 16.3 with `npm run build`; it has no custom `engines` entry, output-directory override, or `vercel.json`. The intended owner must verify, without changing working settings:

| Vercel setting | Expected configuration | Verification state |
| --- | --- | --- |
| Project/team | Existing `findfeedrestore/find-feed-restore`; do not create a duplicate | Deployment evidence found; owner access required |
| Git repository | `find-feed-restore/find-feed-restore` | Supported by successful Vercel bot deployment |
| Production branch | `main` | Strongly indicated by successful main-commit deployment; confirm in dashboard |
| Framework preset | Next.js | Successful automatic build; confirm in dashboard |
| Root Directory | Repository root | Repository architecture requires this; confirm no override |
| Install command | Vercel/npm automatic default | No repository override; confirm no dashboard override |
| Build command | `npm run build` / Next.js automatic default | No repository override; confirm no dashboard override |
| Output directory | Next.js automatic output; no manual directory | No repository override; confirm no dashboard override |
| Node.js runtime | A Next.js 16.3-supported Vercel runtime | No repository pin; record the dashboard selection before launch |

Final preparation gates pass: ESLint, strict TypeScript, `git diff --check`, and the optimized Next.js production build. Following the approved post-certification Volunteer enhancement, the production build prerenders all 15 canonical pages plus `/sitemap.xml`, `/robots.txt`, and the framework 404. The full repository crawler passes all 15 routes, canonical/title/runtime/assets/overflow checks, internal links with zero failures or redirecting links, all four compatibility redirects, and all tested 404s. The only crawler warnings are the already documented production-matched Board & Staff intermediate widths.

## Production environment variables

Five application-specific environment variables are referenced by runtime code. All are server-only: three support the trailer Server Action and two support the native Instagram provider. Their values must never be printed, logged, documented, committed, or exposed with a `NEXT_PUBLIC_` prefix.

| Variable name | Classification | Required scope | Verification |
| --- | --- | --- | --- |
| `RESEND_API_KEY` | **REQUIRED FOR LAUNCH** | Production | Owner-reported configured; direct dashboard presence was not accessible during refresh |
| `CONTACT_FROM_EMAIL` | **REQUIRED FOR LAUNCH** | Production | Owner-reported configured; direct dashboard presence was not accessible during refresh |
| `CONTACT_TO_EMAIL` | **REQUIRED FOR LAUNCH** | Production | Owner-reported configured; direct dashboard presence was not accessible during refresh |
| `INSTAGRAM_ACCESS_TOKEN` | **REQUIRED FOR LAUNCH** | Production | Owner-reported configured; direct dashboard presence was not accessible during refresh |
| `INSTAGRAM_ACCOUNT_ID` | **REQUIRED FOR LAUNCH** | Production | Owner-reported configured; direct dashboard presence was not accessible during refresh |

No additional required, optional, or development-only application variables are referenced. `.env.local` is ignored and is not a source of Production configuration. After confirming all five names in Production scope, redeploy the accepted/current descendant commit if Vercel indicates the active deployment predates either integration's configuration.

## Instagram token lifecycle runbook

The long-lived Instagram User access token has a finite lifetime of approximately 60 days. It must be refreshed while it is still valid; an expired token cannot be recovered through the refresh endpoint. The production procedure is:

1. Refresh the unexpired long-lived token before its expiry through the controlled Meta operations account.
2. Replace `INSTAGRAM_ACCESS_TOKEN` in the controlled Vercel Production environment without displaying or logging its value.
3. Redeploy the accepted application commit.
4. Run the Hope In Action smoke check: HTTP 200, ready provider state, 16 initial cards, secure permalinks, Load More, and no overflow.
5. Confirm recent media loads from the organization account.

Do not persist tokens in browser code, repository files, logs, or an ad hoc runtime store, and do not attempt to mutate Vercel environment variables from the application. A future owned secret-management workflow may automate renewal reminders, secure rotation, redeployment, and post-deploy smoke checks, but it is not required for this focused refresh.

## Domains and DNS

The primary canonical origin is **`https://www.findfeedrestore.com`**. The apex **`https://findfeedrestore.com`** must permanently redirect to the `www` origin, preserving path and query. HTTPS is required for both hostnames.

Read-only DNS and HTTP inspection on 2026-08-11 found:

- Authoritative DNS: Cloudflare (`darwin.ns.cloudflare.com`, `blakely.ns.cloudflare.com`)
- Apex A records: `199.16.172.89` and `199.16.173.145`, TTL 300
- `www` currently resolves to the same two WordPress addresses, TTL 300
- `http://findfeedrestore.com/` currently reaches `https://www.findfeedrestore.com/` in two hops
- `https://findfeedrestore.com/` redirects once to `https://www.findfeedrestore.com/`
- `https://www.findfeedrestore.com/` is the current WordPress 200 origin

Do not change nameservers, MX, TXT, email authentication, or unrelated subdomains. Before changing web records, export/screenshot the complete Cloudflare zone and record the current apex/`www` records, proxy state, and TTL for rollback.

### Vercel domain checklist

1. In the existing intended project, add `www.findfeedrestore.com` and `findfeedrestore.com` under Settings → Domains without changing DNS yet.
2. Set `www.findfeedrestore.com` as the primary production domain.
3. Configure the apex as a permanent redirect to `www`, preserving path/query.
4. Use Vercel's project-specific domain inspection to obtain and verify the exact required records. Current Vercel documentation commonly shows apex A `76.76.21.21` and `www` CNAME `cname.vercel-dns-0.com`, but the dashboard/`vercel domains inspect` values are authoritative and must be confirmed for this project before editing Cloudflare.
5. Resolve any Vercel TXT ownership challenge before the launch window; do not weaken Deployment Protection.
6. Confirm an SSL certificate can be issued for both hostnames.

### DNS changes for the cutover window

Once the Vercel checks above pass:

1. Replace only the two apex WordPress A records with the exact Vercel-provided apex A record.
2. Replace only the `www` WordPress web record(s) with the exact Vercel-provided `www` CNAME.
3. Preserve the Cloudflare nameservers and all non-web DNS records.
4. Confirm `https://www.findfeedrestore.com/` returns the intended Vercel deployment with a valid certificate and 200 response.
5. Confirm `https://findfeedrestore.com/<path>` permanently redirects in one hostname hop to `https://www.findfeedrestore.com/<path>`.
6. Confirm plain HTTP upgrades to HTTPS and reaches the same canonical host without a loop.

The final A/CNAME values must be copied from the owning project's domain screen immediately before cutover; applying generic values without that confirmation is prohibited.

## Redirect coverage

The live Yoast page sitemap contains 14 WordPress content URLs. The Next.js sitemap contains those migrated destinations plus the approved post-migration `/volunteer/` route, for 15 canonical URLs. Thirteen WordPress pages retain the same pathname. The WordPress people page `/about-us/` becomes the canonical Next.js `/board-staff/`. Four permanent application redirects cover source routing and known aliases; the homepage trailer card and two previously slashless body CTAs now link directly to their canonical routes rather than consuming redirects.

| Old WordPress URL / alias | New canonical URL | Next.js status | Expected hops | Final result |
| --- | --- | --- | --- | --- |
| `/about-us/` | `/board-staff/` | 308 permanent | 1 | 200 |
| `/terms` | `/terms-conditions/` | 308 permanent | 2 | 200 |
| `/news` | `/news-media/` | 308 permanent | 2 | 200 |
| `/trailer-ministry` | `/we-need-trailers/` | 308 permanent | 2 | 200 |

`/terms` and `/news` currently redirect on WordPress. `/about-us/` is the current sitemap URL. `/trailer-ministry` currently returns 404 on WordPress but remains a documented historical alias worth preserving. With production-aligned trailing slashes, a slashless alias first receives Next.js's normal slash canonicalization and then the application redirect; the slash form takes one application hop. All direct internal links and sitemap entries use 200 canonical URLs, so no visitor-facing navigation consumes these compatibility chains. All other sitemap pathnames map directly to their same canonical Next.js route. Hostname canonicalization is separate from content redirects and must not introduce an additional content-path chain.

## Sitemap, robots, and canonical URLs

`src/app/sitemap.ts` emits `/sitemap.xml` with only the 14 certified canonical URLs. It excludes aliases, redirects, WordPress paths, technical endpoints, and QA artifacts. `src/app/robots.ts` emits an allow-all production policy, the canonical host, and the production sitemap URL. `public/llms.txt` provides a concise Markdown directory of the same canonical public content for systems that choose to use the emerging `llms.txt` proposal; it does not replace or override robots directives, canonicals, or the XML sitemap.

All page metadata uses `https://www.findfeedrestore.com` through `metadataBase` and route-specific canonical paths. `trailingSlash: true` aligns Next.js routing with the production WordPress URL convention, canonical tags, sitemap entries, and existing direct internal links, so each canonical sitemap URL returns 200 rather than normalizing through a redirect. No localhost, Vercel Preview, or WordPress-only alias is used as a canonical. Vercel Preview deployments remain a separate concern: standard Preview URLs receive Vercel's `X-Robots-Tag: noindex`, and the inspected protected deployment did so. Production must not receive that header after the custom domain is attached.

After cutover, submit `https://www.findfeedrestore.com/sitemap.xml` to the existing search-console property if one is controlled, and verify that all sitemap URLs return 200 without canonical mismatch.

## Analytics

Production WordPress currently injects both a Google Analytics Google tag and the Gauges tracker globally. The certified Next.js site does not include either tracker. No tracking ID was invented or copied into application code.

Analytics continuity is classified **MUST HAVE BEFORE CUTOVER** because both trackers are active on the existing public site. Before traffic moves, the owner must choose one of these documented outcomes:

- authorize and provide the controlled production configuration for equivalent consent/privacy-compliant loading in Next.js; or
- explicitly approve a temporary analytics gap and reclassify migration as a dated post-launch action.

Until that decision is recorded, cutover configuration remains on hold. The cutover must also verify that analytics does not double-load through both application code and any Vercel/injection mechanism.

## External services

| Service | Current Next.js contract | Launch check |
| --- | --- | --- |
| Resend | Server-only trailer form; authenticated From, configured To, visitor Reply-To; three required Production variables | Confirm Production variable presence; owner performs one clearly labeled manual acceptance submission after authorized deployment |
| Instagram API with Instagram Login | Server-only `graph.instagram.com/v26.0` provider; 24-post/15-minute cache; native React cards and Load More | Confirm both Production variable names, 16 initial cards, secure links, Load More, and fallback |
| YouTube | Care Coach iframe; testimonial click-to-load iframes; campaign/watch links | Sources, controls, fullscreen, and mobile containment |
| Typeform | Volunteer/partner/application links | Destination and intended new-tab behavior |
| PlanStreet | Family-assistance public form link | Destination and same-tab behavior |
| Kindful/Bloom | Donation links and floating donate control | Donation destination on desktop/mobile |
| Candid | Footer transparency profile link/image | Destination and image load |
| Google Analytics / Gauges | Present on WordPress; absent in Next.js | Resolve the pre-cutover continuity decision above |
| Social, sponsor, and publisher sites | External links only | Sample critical destinations; provider outages do not invalidate the local route |

None of Resend, Instagram, YouTube, Typeform, PlanStreet, Kindful, or Candid depends on Elementor-rendered markup. Instagram and Resend are the two custom server-side external request paths; no Meta credential is sent to the browser.

## Large hosted video

`public/images/campaigns/live-here-love-here/keller-williams-volunteer-day.mp4` is 90,101,823 bytes (85.93 MiB) and remains committed. Existing Vercel deployments and local optimized builds have succeeded with it, so it is **not a blocker**.

Recommendation: **retain the repository/public asset for the initial cutover** to avoid changing an accepted factual media source during launch. Classify relocation to Vercel Blob or another controlled object/CDN store as **POST-LAUNCH OPTIMIZATION**. Blob/object storage is better suited to large video delivery, repository growth, bandwidth accounting, and independent cache lifecycle, but any move must preserve the source, poster, controls, range behavior, and URL transition. Monitor initial bandwidth and playback before choosing Vercel Blob versus another existing organizational CDN.

## Board & Staff intermediate clipping

At 1101–1311px and part of 701–787px, the fixed people grid can clip edge cards while the global page suppresses a horizontal scrollbar. Production `/about-us/` has the same behavior, so this is a faithful source reproduction rather than a migration regression. It does create real partial content loss at those intermediate widths.

Recommendation: preserve the accepted implementation for cutover, but retain a **SHOULD FIX BEFORE CUTOVER** owner decision. If the owner prioritizes exact production parity, launch as certified. If complete card visibility at every intermediate width is required, schedule a separately approved narrow responsive fix and rerun Board & Staff visual/interaction regression before launch.

## 404 behavior

The Next.js default not-found response is technically correct: nonexistent pages, `/wp-admin/`, and `/wp-login.php` return 404 rather than false 200 content. A branded 404 remains a **POST-LAUNCH OPTIMIZATION** and is not required for safe routing.

## Manual launch checks

Perform these against the custom production hostname immediately after DNS converges:

- Homepage, header at page top, desktop navigation/dropdowns, sticky-on-scroll behavior, mobile menu, footer, and floating Donate control
- Affordable Housing, Housing First, Homelessness Avoidance, Care Coach, News & Media, Testimonials, Contact Us, Board & Staff, Sponsors, Live Here Love Here Lake, We Need Trailers, Hope In Action, and Terms & Conditions
- One controlled, clearly labeled trailer-form user acceptance submission; verify receipt and Reply-To in inbox/provider records without exposing values
- Native Instagram initial 16 posts, secure original-post links, Load More to the bounded 24-post result, and provider-error fallback
- Care Coach and testimonial YouTube controls plus hosted MP4 playback, seek/range behavior, sound, fullscreen, and mobile containment
- Typeform, PlanStreet, Kindful, Candid, primary social links, and critical sponsor destinations
- All four path redirects plus apex-to-`www`, HTTP-to-HTTPS, and no loops/chains
- `/sitemap.xml`, `/robots.txt`, canonical tags, title/description behavior, and absence of Production `noindex`
- Representative 1440px and 390/320px layouts, with no horizontal overflow
- `/terms-conditions/`, `/terms`, a clearly nonexistent route, `/wp-admin/`, and `/wp-login.php`
- Analytics presence/absence exactly matching the approved pre-cutover decision, with no duplicate tracker initialization

## Rollback plan

Keep WordPress hosting, files, database, Elementor, plugins, SSL, and admin access untouched through the launch window and stabilization period.

1. Before cutover, export the Cloudflare zone and capture the current apex/`www` web records, proxy state, TTL, and successful WordPress health checks.
2. Declare rollback if the canonical host has sustained 5xx/SSL/DNS failure, critical navigation or assets are unavailable, required redirects loop or fail, the trailer form cannot reach its server action, or a launch-critical external integration is unusable with no safe fallback.
3. In Cloudflare, replace only the Vercel apex/`www` web records with the captured WordPress records: apex A `199.16.172.89` and `199.16.173.145`, plus the captured `www` configuration. Do not change nameservers, MX, TXT, or mail records.
4. Wait at least the effective TTL, then verify apex and `www` HTTPS, homepage, navigation, form/contact paths, Terms, and representative program pages on WordPress.
5. Leave the Vercel project and deployment intact for diagnosis; do not delete either platform during rollback.
6. Record the failure evidence and do not retry cutover until the triggering issue has a verified correction and rollback check.

Vercel's deployment rollback/revert can be used if the custom domain is already on Vercel and only the selected Vercel deployment is faulty. DNS rollback to WordPress remains the independent recovery path for platform/domain failures.

## Outstanding items

### BLOCKER

- The owning Vercel account must verify the existing project settings, `main` production branch, Production scope presence of all five required variable names, and project-specific domain requirements. The available CLI identity cannot access that scope.
- Resolve the Google Analytics/Gauges continuity decision. Existing production tracking makes this **MUST HAVE BEFORE CUTOVER** unless the owner explicitly accepts and records a temporary gap.

### SHOULD FIX BEFORE CUTOVER

- Decide whether to preserve or separately correct the production-matched Board & Staff intermediate clipping. It is not a deployment blocker.
- Establish an owned reminder or secure operations job to refresh the long-lived Instagram token before its approximately 60-day expiry, update the Vercel Production value, and redeploy. The application must not attempt to mutate Vercel configuration at runtime.

### USER ACCEPTANCE TEST / MANUAL POST-DEPLOYMENT CHECK

- After an authorized deployment, perform one labeled trailer-form submission and verify delivery plus visitor Reply-To. Do not create a separate Preview solely for this check and do not send repeated messages.

### POST-LAUNCH OPTIMIZATION

- Move the 85.93 MiB MP4 to Vercel Blob or another controlled object/CDN store after measuring launch traffic and preserving the accepted media contract.
- Add researched descriptions for the seven source pages that intentionally omit them and consider route-appropriate structured data.
- Add a branded custom 404.
- Consider non-destructive optimization of the Terms hero and other large factual images.
- Review safe static-asset deduplication without altering public identity assets.
- Monitor Instagram token health/expiry, YouTube, Resend, Typeform, PlanStreet, Kindful, Candid, publisher, sponsor, and social-provider availability.

## Recommended launch sequence

1. Complete both BLOCKER decisions and record the owner/dashboard evidence.
2. Verify or configure analytics according to the approved decision; rerun only the affected build/runtime checks.
3. Confirm the three Resend variable names in Production scope without displaying their values.
4. Confirm `INSTAGRAM_ACCESS_TOKEN` and `INSTAGRAM_ACCOUNT_ID` in Production scope without displaying their values, and schedule token refresh before expiry.
5. Add both domains to the existing Vercel project, establish `www` as primary, configure apex redirect, complete ownership validation, and record the exact Vercel DNS targets.
6. Confirm the accepted/current descendant commit is the successful Vercel production deployment and run the protected-host smoke checklist.
7. Export current Cloudflare DNS and confirm WordPress remains healthy and untouched.
8. In the agreed window, change only apex/`www` web records to the verified Vercel targets.
9. Run the manual launch checks above, including one owner-controlled Resend acceptance submission.
10. Monitor SSL, 4xx/5xx, form delivery, Instagram token/feed health, analytics, video bandwidth, and critical user paths through the stabilization window.
11. If rollback criteria are met, restore the captured WordPress records immediately; otherwise leave WordPress intact until the agreed retention period ends.

No DNS, production WordPress, production traffic, or destructive provider change was made during this preparation milestone.
