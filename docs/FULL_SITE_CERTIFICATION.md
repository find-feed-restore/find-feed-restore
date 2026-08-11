# Full Site Certification and Launch Readiness

Certification date: 2026-08-11

Local production target: Next.js 16.3 optimized build served with `next start`

Production comparison source: <https://www.findfeedrestore.com/>

Certification baseline: accepted Milestone 16 commit `0eefbd6`; this report includes the subsequent dedicated mobile-parity extension

## Summary

- Canonical routes certified: **14 of 14**
- Routes returning HTTP 200 with one correct canonical, one H1, unique title, header/footer, no site-code runtime error, no missing local asset, and no unclassified overflow: **14 of 14**
- Required production/local visual captures completed: **56 of 56**
- Dedicated production/local mobile visual captures completed: **70 of 70** at 430, 390, 375, 360, and 320px
- Route interaction assertions passed: **203 of 203**
- Dedicated mobile route-width interaction assertions passed: **70 of 70**
- Dedicated Resend/form, Juicer, and legal assertions passed: **37 of 37**
- Routes with minor documented differences: **3** — We Need Trailers' approved functional form enhancement, Hope In Action's changing live feed, and Board & Staff's source-matched intermediate fixed-grid clipping
- Blocked routes: **0**
- Overall migration certification: **PASS WITH DOCUMENTED LAUNCH BLOCKER**
- Production cutover status: **NOT READY** until one controlled Vercel Preview Resend delivery and visitor Reply-To test is verified

The repository started clean on `main`. The dedicated mobile continuation started from accepted Milestone 16 commit `0eefbd6`, with `HEAD` and `origin/main` aligned. Certification used the actual clean shared baseline and did not rewrite history.

## Certification method

`scripts/full-site-certification.mjs` is the repository-local crawl harness. It uses Playwright Core and system Chrome against an optimized local production server. It records detailed ignored evidence at `.visual-qa/certification/crawl.json` and checks every route for HTTP/runtime health, local resource failures, canonical/title/description/Open Graph state, noindex, heading order, image alt attributes, control labels, fragments, header/footer presence, internal destinations, desktop/mobile overflow, shared breakpoint behavior, redirects, external origins, and 404 responses.

The existing visual harness generated production/local screenshots, side-by-sides, overlays, amplified differences, element metrics, and page heights at 1440, 1024, 768, and 390px for every route. Board & Staff correctly used production `/about-us/` as its visual source. The existing interaction harness ran on all 14 routes. Dedicated form, Juicer, and legal harnesses supplied service-specific evidence. All `.visual-qa` output remains ignored.

`scripts/mobile-visual-certification.mjs` runs the established visual harness for every canonical route at 430, 390, 375, 360, and 320px, preserving the `/about-us/` production source mapping for Board & Staff. `scripts/mobile-certification.mjs` separately checks each of the 70 route-width combinations for the mobile header/logo/toggle, keyboard menu geometry and close behavior, body-lock restoration, scroll behavior, footer stacking, floating control, clipped text, horizontal overflow, media/images/controls, card stacking, and route-specific form/feed/video/logo/people/legal containment. Evidence is written only under ignored `.visual-qa` paths.

## Dedicated mobile visual-parity certification

All 70 identical-width production/local captures include full-page screenshots, side-by-side images, overlays, amplified differences, and height measurements. Shared mobile geometry is stable across routes: the header is 175/167/164/161/153px high at 430/390/375/360/320px, the centered logo is 215/195/188/180/160px wide, and the 28px menu toggle remains centered and contained. The header begins full-size at page top and scrolls away on mobile, matching production; it does not shrink on navigation or become incorrectly sticky.

Every mobile interaction run confirms the hamburger opens and closes from the keyboard, `aria-expanded` tracks state, menu rows remain at least 47px high, navigation stays within the viewport, and body overflow state is restored after closing. All routes have zero document-level horizontal overflow and zero clipped visible text. CTAs, cards, images, iframes/video, footer sections/logo, and the floating donation control remain contained. People cards and testimonial cards stack in DOM order; the 18-logo sponsor wall and 29-logo campaign directory collapse without overflow; legal text remains contained; and Juicer media stays within its feed wrapper.

We Need Trailers retains all five semantic labels, six visible form controls including submit, full-width field containment, and stable submitting/success/error status geometry at every mobile width. The state checks mutate the local status region only and never invoke the Server Action or send email. Hope In Action is evaluated using static wrapper/section geometry plus live-provider containment; changing Juicer card media and text remain dynamic variance rather than frozen visual data.

| Route | 430px | 390px | 375px | 360px | 320px | Mobile interaction | Horizontal overflow | Remaining documented differences |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | **PASS** 8025/8024 | **PASS** 8176/8175 | **PASS** 8237/8234 | **PASS** 8388/8385 | **PASS** 8694/8691 | **PASS** | **PASS** | 0–3px cumulative raster/font variance. |
| `/affordable-housing/` | **PASS** 6154/6153 | **PASS** 6166/6164 | **PASS** 6181/6177 | **PASS** 6357/6353 | **PASS** 6488/6484 | **PASS** | **PASS** | 1–4px cumulative raster/font variance. |
| `/housing-first/` | **PASS** 6117/6116 | **PASS** 6170/6169 | **PASS** 6247/6243 | **PASS** 6289/6285 | **PASS** 6459/6456 | **PASS** | **PASS** | 1–4px cumulative raster/font variance. |
| `/homelessness-avoidance/` | **PASS** 6128/6127 | **PASS** 6171/6169 | **PASS** 6218/6214 | **PASS** 6319/6315 | **PASS** 6549/6545 | **PASS** | **PASS** | 1–4px cumulative raster/font variance. |
| `/care-coach-mobile-unit/` | **PASS** 6101/6100 | **PASS** 6184/6182 | **PASS** 6199/6195 | **PASS** 6261/6257 | **PASS** 6412/6408 | **PASS** | **PASS** | 1–4px variance; YouTube frame remains contained and keyboard reachable. |
| `/news-media/` | **PASS** 8166/8164 | **PASS** 8398/8397 | **PASS** 8474/8470 | **PASS** 8571/8567 | **PASS** 9167/9163 | **PASS** | **PASS** | 1–4px cumulative raster/font variance. |
| `/testimonials/` | **PASS** 4559/4558 | **PASS** 4614/4613 | **PASS** 4604/4600 | **PASS** 4634/4631 | **PASS** 4708/4705 | **PASS** | **PASS** | 1–4px variance; cards stack and click-to-load media stays contained. |
| `/contact-us/` | **PASS** 6707/6706 | **PASS** 6810/6809 | **PASS** 6923/6919 | **PASS** 6941/6938 | **PASS** 7078/7075 | **PASS** | **PASS** | 1–4px variance after matching production contact-value typography. |
| `/board-staff/` | **PASS** 9087/9086 | **PASS** 9198/9197 | **PASS** 9252/9248 | **PASS** 9274/9270 | **PASS** 9324/9321 | **PASS** | **PASS** | 1–4px variance; all 17 cards are single-column and contained. |
| `/sponsors/` | **PASS** 5952/5951 | **PASS** 5993/5992 | **PASS** 6088/6085 | **PASS** 6152/6149 | **PASS** 6275/6271 | **PASS** | **PASS** | 1–4px variance; all 18 tiles use the production one-column mobile layout. |
| `/live-here-love-here-lake/` | **PASS** 12370/12369 | **PASS** 12460/12458 | **PASS** 12541/12537 | **PASS** 12664/12660 | **PASS** 12729/12725 | **PASS** | **PASS** | 1–4px variance after binding the route to the loaded production-equivalent Noto Sans metrics. |
| `/we-need-trailers/` | **PASS WITH MINOR DIFFERENCES** 7766/7693 | **PASS WITH MINOR DIFFERENCES** 7936/7863 | **PASS WITH MINOR DIFFERENCES** 8074/7999 | **PASS WITH MINOR DIFFERENCES** 8059/7983 | **PASS WITH MINOR DIFFERENCES** 8362/8269 | **PASS** | **PASS** | Intentional accessible functional status region replaces production's obsolete form note; field/button geometry passes. |
| `/hope-in-action/` | **PASS WITH MINOR DIFFERENCES** 13177/13162 | **PASS WITH MINOR DIFFERENCES** 12994/12979 | **PASS WITH MINOR DIFFERENCES** 12930/12912 | **PASS WITH MINOR DIFFERENCES** 12890/12872 | **PASS WITH MINOR DIFFERENCES** 13013/13023 | **PASS** | **PASS** | Changing live Juicer cards/media; static shell, one-column feed, CTA, and footer structure pass. |
| `/terms-conditions/` | **PASS** 3304/3303 | **PASS** 3415/3414 | **PASS** 3481/3477 | **PASS** 3517/3514 | **PASS** 3644/3641 | **PASS** | **PASS** | 1–4px cumulative legal typography variance; no clipped copy. |

Heights are production/local pixels. The dedicated sweep found and corrected three source mismatches: homepage mission copy now uses production's 500 weight with the matching desktop section padding, Contact values inherit production's Arial 500 treatment instead of Noto Sans 900, and Live Here consistently resolves the loaded Next Noto Sans face while removing a non-source story letter-spacing override. Standard 1440/1024/768/390 visual regressions and full interaction suites were rerun for all three affected routes.

## Route matrix

All metadata checks below include one canonical matching `https://www.findfeedrestore.com` plus the listed route, one unique non-empty title, and no `noindex`. “Source metadata” means the page intentionally has no description or `og:description`, matching the accepted production-derived implementation; this is recorded as a later SEO enhancement rather than filled with invented copy.

| Route | HTTP | Visual heights: production/local at 1440 · 1024 · 768 · 390 | Interaction | Metadata | Links/runtime/accessibility | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | 200 | 4712/4712 · 5828/5829 · 6108/6108 · 8176/8175 | 12/12 | Complete; Organization JSON-LD valid | Clean | **PASS** |
| `/affordable-housing/` | 200 | 4096/4096 · 4487/4487 · 5004/5004 · 6166/6164 | 13/13 | Source metadata | Clean | **PASS** |
| `/housing-first/` | 200 | 3898/3898 · 4443/4443 · 5017/5018 · 6170/6169 | 13/13 | Source metadata | Clean | **PASS** |
| `/homelessness-avoidance/` | 200 | 3981/3980 · 4509/4509 · 4958/4958 · 6171/6169 | 13/13 | Source metadata | Clean | **PASS** |
| `/care-coach-mobile-unit/` | 200 | 4557/4557 · 4482/4482 · 5883/5883 · 6184/6182 | 18/18 | Source metadata | YouTube source, geometry, focus, play/pause pass | **PASS** |
| `/news-media/` | 200 | 4672/4672 · 5189/5189 · 5488/5488 · 8398/8397 | 15/15 | Source metadata | Eleven publisher links and CTA contracts pass | **PASS** |
| `/testimonials/` | 200 | 3116/3115 · 3460/3460 · 3433/3434 · 4614/4613 | 19/19 | Source metadata | Three click-to-load YouTube contracts pass | **PASS** |
| `/contact-us/` | 200 | 4477/4477 · 5554/5554 · 5594/5594 · 6810/6809 | 17/17 | Source metadata | Phone, email, PlanStreet, Typeform, Kindful pass | **PASS** |
| `/board-staff/` | 200 | 4601/4601 · 5460/5460 · 5485/5485 · 9198/9197 | 16/16 | Complete | Identity assets/cards pass; source-matched intermediate warning below | **PASS WITH WARNING** |
| `/sponsors/` | 200 | 3167/3166 · 3641/3642 · 3708/3708 · 5993/5992 | 16/16 | Complete | All 18 identities, secure external contracts, hover/focus pass | **PASS** |
| `/live-here-love-here-lake/` | 200 | 6686/6685 · 8364/8364 · 8896/8896 · 12460/12458 | 18/18 | Complete | 29-logo directory and native video pass | **PASS** |
| `/we-need-trailers/` | 200 | 5123/5251 · 7059/7019 · 7017/7099 · 7936/7863 | 11/11 shared + 22/22 form/server | Complete | Functional form difference; all field geometry and states pass | **PASS WITH APPROVED DIFFERENCE** |
| `/hope-in-action/` | 200 | 4917/4916 · 6147/6147 · 7455/7455 · 12994/12979 | 11/11 shared + 8/8 provider | Complete | Live Juicer behavior/fallback pass | **PASS WITH DYNAMIC TREATMENT** |
| `/terms-conditions/` | 200 | 2474/2474 · 2496/2496 · 2562/2562 · 3415/3414 | 11/11 shared + 7/7 legal | Complete | Exact legal copy, hierarchy, canonical and alias pass | **PASS** |

We Need Trailers reproduces the exact Milestone 13 accepted measurements. The larger raster difference is caused by the intentional accessible functional status region replacing production's obsolete form note, not a new regression; the dedicated harness confirms production-equivalent field geometry at all four widths. Hope In Action reproduces exact desktop/tablet static geometry. Its 15px mobile height difference and larger live-card raster variance are changing Juicer content, not static layout drift.

## Shared breakpoint certification

Every route was inspected at 1231, 1230, 1181, 1180, 1025, 1024, 901, 900, 768, and 767px. Header variants switch once and correctly: desktop at 1025px and above, tablet from 768–1024px, and mobile at 767px and below. Footer sections remain contained and change to the mobile stack at 767px. The desktop navigation remains one row and all sticky, dropdown, mobile-menu, focus, and route-navigation-to-page-top checks pass.

Certification found a local-only 31px header overflow beginning at 1181px and continuing through 1230px. Production avoids overflow there by wrapping its last two menu entries; the accepted Next.js system deliberately keeps a single row. The existing compact-desktop rule was narrowly extended through 1230px, eliminating overflow while preserving the accepted single-row composition. Adjacent 1231/1230 captures and the shared interaction suite pass.

Board & Staff's fixed 240px people cards produce a 1312px grid width in the 1101–1311px range and a 788px grid width in part of the 701–787px range. Production `/about-us/` reproduces the same scroll widths at 1230 and 768px. The global body suppresses a horizontal scrollbar, but edge cards can be clipped at those intermediate widths. Because this is a source-matched legacy behavior and route redesign was prohibited, it is documented as a pre-cutover improvement rather than changed during certification.

## Internal-link audit

Every anchor in the header, footer, and page body on all 14 routes was collected. After deduplication, every internal destination returns 200 directly; there are no internal 404s, localhost/127.0.0.1 URLs, broken fragments, or links through aliases. The footer's legacy `/news` link was corrected to `/news-media/`; the Testimonials Contact CTA and Contact corporate-partnership CTA were corrected to direct 200 forms without trailing-slash normalization hops. The footer's production-preserved HTTP LinkedIn URL was corrected to its verified HTTPS canonical profile. All external route-specific contracts continue to pass their interaction checks.

## Redirect matrix

Next.js permanent redirects return 308. Each audited no-slash alias takes one redirect hop and ends in a 200 canonical route without a loop or duplicate indexable page.

| Source | Destination | Status | Redirect hops | Final result |
| --- | --- | --- | --- | --- |
| `/terms` | `/terms-conditions` | 308 permanent | 1 | 200 |
| `/trailer-ministry` | `/we-need-trailers` | 308 permanent | 1 | 200 |
| `/news` | `/news-media` | 308 permanent | 1 | 200 |
| `/about-us` | `/board-staff` | 308 permanent | 1 | 200 |

`/news` was required by the original inventory, and `/about-us/` is the current production people-page URL. Both were missing locally and were added as narrow launch corrections. Next.js performs its normal slash normalization before configured redirects when a slash variant is requested; canonical internal links do not use these aliases.

## Metadata and structured data

- All 14 routes have exactly one correct production-domain canonical, a unique title, and no accidental `noindex`.
- Seven routes have descriptions and matching `og:description`: home, Board & Staff, Sponsors, Live Here Love Here Lake, We Need Trailers, Hope In Action, and Terms.
- Affordable Housing, Housing First, Homelessness Avoidance, Care Coach, News & Media, Testimonials, and Contact intentionally preserve the production-derived absence of description and `og:description`. Adding researched descriptions is a post-launch SEO enhancement, not a certification rewrite.
- Every route includes the currently implemented Open Graph title, URL, site name, locale, and type.
- The homepage's Organization JSON-LD is valid and is the only implemented structured-data block. No page schema was invented for certification.

## Resend form certification

The architecture remains Browser → Next.js Server Action → server normalization/validation and spam checks → Resend → configured inbox. `src/app/we-need-trailers/actions.ts` imports `server-only`; only `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL` are read, and the variable names do not occur in `.next/static` client output. No value is tracked, printed, documented, or exposed. `.env.local` is ignored.

Ten injected-seam Node tests pass: required and malformed email, malformed/overlong input, honeypot, 1.5-second/24-hour timing bounds, trimming/lowercasing/line-ending normalization, mocked successful delivery, duplicate lock acquisition, configured From/To mapping, visitor `reply_to`, HTML/text field content, Resend request success, safe provider failure, and server-only environment-name usage. Twelve browser checks pass for the exact five-field/only-email-required contract, semantic labels, live region, hidden honeypot/timing controls, native invalid/required email validation, keyboard order, production-equivalent geometry at all four widths, duplicate-disabled submitting preview, safe error preview, and success preview. Routine browser QA now previews states without invoking the Server Action.

During the initial certification run, the older browser harness assumed local delivery was unconfigured. It attempted one submission using the clearly labeled address `website-test@example.com` before the audit established—by presence booleans only—that all three variables existed in `.env.local`. That request may have produced one local test delivery; no value was read or logged, no repeat was made, and delivery or Reply-To behavior cannot be verified from this environment. The harness was immediately changed to a non-delivery routine and subsequent local servers were started with all three variables explicitly empty.

No controlled Vercel Preview delivery has been verified. Before production cutover, perform exactly one clearly labeled Preview submission and confirm receipt plus Reply-To mapping in the destination inbox.

## Juicer certification

The provider adapter remains `src/components/hope-social-feed.tsx` with feed slug `findfeedrestore` and standard `https://www.juicer.io/embed/findfeedrestore/embed-code.js` loader. Eight dedicated checks pass: one feed node/loader/runtime, claimed loaded state, Load More, secure external post target/rel and keyboard focus, media containment, all container-query transitions, 390px containment, App Router away/back remount without duplicate initialization, and blocked-loader fallback.

Juicer's optional page-view call to its legacy HTTP endpoint emits a provider CORS console warning on localhost. The feed, cards, links, load-more control, media, and fallback remain operational; no site-code error occurs. No Juicer post media was committed as static content.

## Video and media certification

| Route/media | Source and behavior | Result |
| --- | --- | --- |
| Care Coach YouTube | `https://www.youtube.com/embed/SonlnoRUCQg`; no autoplay parameter; fullscreen; desktop/mobile aspect geometry; iframe keyboard focus; play/pause verified | **PASS** |
| Testimonials YouTube | IDs `69VFG8OXVAs`, `3OEgOEgOsSA`, `C4Gta9eC0Ho`; thumbnails load iframe only after keyboard/click activation; autoplay follows user action; `allowFullScreen` and provider play/pause verified | **PASS** |
| Live Here hosted MP4 | Local `/images/campaigns/live-here-love-here/keller-williams-volunteer-day.mp4`; controls, metadata preload, no autoplay, poster button, keyboard play/pause, contained geometry; byte-range request returns 206 `video/mp4` | **PASS** |

Production's native MP4 also omits `playsinline`; local preserves that source behavior and mobile keyboard/playback checks pass. There is no autoplay audio. No severe media layout shift appears in accepted screenshots.

## Asset and build-readiness audit

- `public` contains 110 files and is approximately 95 MB; `public/images` is approximately 94 MB.
- The hosted MP4 is 90,101,823 bytes (85.93 MiB), SHA-256 `8dd0c506c5dd9b7d5cd3178dbf3bccb7ce0b8a3b4f009e4ec0858143bc5be2a3`. It is tracked in Git and is the only asset over 2 MB. It does not prevent the build, route, range request, or playback checks, but dominates deployment weight.
- All 18 sponsor logos and 17 identity-critical staff/board portraits plus the people hero remain present and pass rendered identity checks.
- The three unique trailer assets remain present. No generated substitute or live social-feed media is committed.
- Runtime crawling found no missing image, stylesheet, script, font, poster, or other local asset on any canonical route.
- Hash audit found one existing duplicate pair: `public/images/programs/affordable-housing/hero.jpg` and `public/images/programs/housing-first/support-family.jpg`, SHA-256 `6ac72f949551120c67b281baafdd24672c7ec1f449711f0ba765befcd88f7935`. Both belong to accepted routes; cleanup is deferred rather than changing source paths during certification.
- Optimized client static output is approximately 912 KB (768 KB JavaScript chunks). Client islands are limited to the shared header, homepage counter, testimonial video activation, native-video poster/control, trailer form, and Juicer adapter.

## Accessibility smoke audit

All 14 routes have one logical H1 and no heading-level skip, no image missing an `alt` attribute, no unlabeled visible form control, no broken fragment, visible three-pixel keyboard focus, keyboard-reachable navigation/dropdowns/forms/media, no keyboard trap found, and accessible form status messaging. Decorative images use empty alt text where appropriate. Route-specific interaction tests cover menus, CTA links, media, testimonial activation, sponsor focus, form order/states, Juicer links, and legal structure. This is a smoke certification, not a complete WCAG conformance claim.

## 404 behavior

The clearly nonexistent certification route, `/terms-and-conditions/`, `/wp-admin/`, and `/wp-login.php` all finish with HTTP 404 rather than false 200 content. Next.js currently supplies its default “This page could not be found” presentation. A branded custom 404 is a post-certification enhancement, not a launch blocker.

## External dependencies

| Dependency | Routes/use | Certification treatment |
| --- | --- | --- |
| Resend | Trailer Server Action delivery | Mocked contract passes; Preview delivery verification outstanding |
| Juicer | Hope In Action live feed | Loader, feed, remount, links, media, load-more, fallback pass |
| YouTube | Care Coach and Testimonials | Source, user activation, fullscreen, focus, play/pause pass |
| Typeform | Volunteer, partnership, application CTAs | Destinations and secure new-tab contracts pass where specified |
| PlanStreet | Assistance applications | Destination contracts pass |
| Kindful/Bloom | Donation CTAs and floating control | Destinations pass on every route |
| Candid | Footer transparency profile | Image/link contract loads without local asset error |
| Social, sponsors, publishers | Footer profiles, sponsor directories, News cards | Stored destinations, target/rel, identity and focus contracts pass; remote services remain third-party operational dependencies |
| Local MP4 | Live Here story video | Source, range response, controls and playback pass; large deployment asset |

## Outstanding launch items

### BLOCKER

- Deploy to an authorized Vercel Preview environment, perform one clearly labeled real trailer test, verify successful receipt in `CONTACT_TO_EMAIL`, and verify the visitor email is the actual Reply-To. Do not cut production over until this is recorded.

### SHOULD FIX BEFORE CUTOVER

- Decide whether to retain the 90,101,823-byte MP4 in the Vercel static deployment or move it to an appropriate media/CDN workflow. Current architecture works and is not itself a build blocker.
- Decide whether to correct the source-matched Board & Staff card clipping at intermediate 1101–1311px and 701–787px widths. No horizontal scrollbar appears because global overflow is suppressed, but edge cards can be clipped.

### POST-LAUNCH OPTIMIZATION

- Add researched meta and Open Graph descriptions to the seven source pages that currently omit them.
- Consider route-appropriate structured data beyond the existing homepage Organization schema.
- Add a branded custom 404.
- Hash-deduplicate the accepted 211,091-byte program image pair if route paths can be changed safely.
- Review the 1.52 MB Terms hero and other factual images for non-destructive delivery optimization.
- Monitor Juicer's optional HTTP page-view CORS warning and live-feed availability; the current adapter fallback is usable.
- Continue monitoring YouTube, Juicer, Typeform, PlanStreet, Kindful, Candid, publisher, social, and sponsor availability as external operational dependencies.

## Certification corrections

Certification made only narrow, evidence-backed changes:

- Added permanent `/news` → `/news-media` and `/about-us` → `/board-staff` redirects.
- Changed the footer News link and two body CTAs to direct 200 canonical paths rather than redirecting path variants.
- Updated the footer LinkedIn URL from the legacy HTTP form to the verified HTTPS canonical profile.
- Extended the existing compact-desktop header rule through the measured 1181–1230px local-only overflow range.
- Corrected three narrow-mobile font metric mismatches on Home, Contact Us, and Live Here without changing content or layout architecture.
- Added reusable five-width mobile visual and interaction certification runners covering all 14 canonical routes.
- Added the full-site crawler and expanded shared interaction/form QA so navigation state and non-delivery form states remain regression-tested.

No production deployment, DNS change, WordPress modification, CMS restructuring, redesign, or new feature was performed.
