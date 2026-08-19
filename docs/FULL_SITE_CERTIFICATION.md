# Full Site Certification and Launch Readiness

Certification date: 2026-08-11

Local production target: Next.js 16.3 optimized build served with `next start`

Production comparison source: <https://www.findfeedrestore.com/>

Current certified cutover baseline: native Instagram commit `441e86ccfd57bff2e54a6e377c148a4e892c681a` (`441e86c`)

## Summary

- Canonical routes certified: **14 of 14**
- Routes returning HTTP 200 with one correct canonical, one H1, unique title, header/footer, no site-code runtime error, no missing local asset, and no unclassified overflow: **14 of 14**
- Required production/local visual captures completed: **56 of 56**
- Dedicated production/local mobile visual captures completed: **70 of 70** at 430, 390, 375, 360, and 320px
- Route interaction assertions passed: **203 of 203**
- Dedicated mobile route-width interaction assertions passed: **70 of 70**
- Dedicated Resend/form, native Instagram, and legal assertions passed; native feed adds **8 of 8** provider tests and **8 of 8** browser checks
- Routes with minor documented differences: **3** — We Need Trailers' approved functional form enhancement, Hope In Action's changing live feed, and Board & Staff's source-matched intermediate fixed-grid clipping
- Blocked routes: **0**
- Overall migration certification: **PASS — READY FOR CUTOVER**
- Production cutover preparation: **HOLD — OWNER VERCEL VERIFICATION AND ANALYTICS DECISION REMAIN**; neither item is an application-certification failure

The focused native-Instagram refresh started clean on `main` with `HEAD` and `origin/main` aligned at accepted commit `441e86c`. The original full-site and dedicated mobile evidence remains valid for unchanged routes; this refresh reran only Hope In Action plus representative Home and News & Media regressions.

### Post-certification Volunteer enhancement — 2026-08-12

`/volunteer/` is an approved post-migration enhancement beyond the original 14-route WordPress inventory. The route uses the accepted global shell, unique illustrative imagery, and three safe new-tab calls to the existing Typeform volunteer intake at `https://greatthings.typeform.com/to/V1SK6LFX`. The approved Living Message Church video `T3XRcY1_nG4` appears in a dedicated feature card using the established local-thumbnail, click-to-load YouTube contract; no YouTube iframe loads until keyboard or pointer activation. It adds no local form backend.

Focused certification passes at 1440, 1024, 768, 440, 430, 390, 375, 360, and 320px. The dedicated mobile interaction sweep passes 5/5 widths with the accepted sticky header, keyboard-operable menu, contained imagery, stacked cards/footer, and no clipped text or horizontal overflow. The 15-route crawler confirms HTTP 200, the production-domain canonical, unique metadata, one H1, complete local assets, no site-code console error, no broken/redirecting internal link, and unchanged redirect/404 behavior. Homepage, Contact, Board & Staff, Hope In Action, and News & Media interaction regressions pass after their Volunteer links were routed through the new page.

### Post-certification Privacy Policy enhancement — 2026-08-17

`/privacy-policy/` is a second approved post-migration enhancement, bringing the canonical sitemap to **16 routes**. It uses the accepted legal-page shell and adds semantic website privacy disclosures plus the organization-provided Meta Instagram API policy, server-side credential treatment, cache/retention language, deletion-request instructions, and the existing public mailing address, email, and Contact page. The route is linked directly from the global footer and has unique metadata and a production-domain canonical.

Focused local certification passes at 1440, 1024, 768, 430, 390, 375, 360, and 320px. The route returns 200 with one H1, logical H2 sections, complete links, visible keyboard focus, zero console/page errors, and zero horizontal overflow. The dedicated five-width mobile interaction sweep confirms the accepted header/menu and footer behavior. The optimized build prerenders the page and includes it in `/sitemap.xml`. Because WordPress has no corresponding source page, this is validated against the accepted Terms legal shell rather than represented as a production/local content-parity capture.

## Native Instagram certification refresh

The focused refresh reconfirms `/hope-in-action/` at HTTP 200 on the optimized local build. The live account verifier returned 24 valid recent image posts with media, captions, and direct Instagram permalinks without printing identifiers, content, or credentials. The page renders 16 initially, reveals the remaining eight through Load More, keeps all post links at `_blank` with `noopener noreferrer`, and retains the exact 15-minute Next.js revalidation shown by the optimized build. Eight provider tests, eight dedicated feed browser checks, and eleven shared route interactions pass.

Missing-environment and non-secret invalid-token browser runs were repeated at 390px. Both preserve the complete page shell, remain free of horizontal overflow, expose no raw Meta error, and show only the understated unavailable message plus direct organization Instagram link. The post-build scan found zero access-token matches and zero active Juicer runtime/script matches in `.next/static`.

Hope In Action was recaptured at 1440, 1024, 768, 430, 390, 375, 360, and 320px. Native local heights remain exactly equal to accepted `441e86c` evidence: 4897, 6172, 7450, 13669, 13086, 13099, 13159, and 13210px respectively. Card media remains square and contained; the certified one/two/three/four-column transitions remain at 758/1018/1218px; all five mobile widths remain single-column without overflow. During this refresh the legacy WordPress source's client-side social provider did not populate, so current production captures contain the matching static hero, headings, wrapper, CTA styling, and footer but an empty feed wrapper. Those transient source captures are not used to overturn the accepted native-feed geometry. The QA image normalizer now uses canvas compositing so very tall dynamic-source differences can still produce side-by-side, overlay, and amplified-difference artifacts without Sharp's 10,000px edge-padding limit.

Home visual regression remains 4712/4712, 5828/5829, 6108/6108, and 8176/8175px with 12/12 interactions. News & Media remains 4672/4672, 5189/5189, 5488/5488, and 8398/8397px with 15/15 interactions. No shared application or accepted page code changed during the refresh.

## Certification method

`scripts/full-site-certification.mjs` is the repository-local crawl harness. It uses Playwright Core and system Chrome against an optimized local production server. It records detailed ignored evidence at `.visual-qa/certification/crawl.json` and checks every route for HTTP/runtime health, local resource failures, canonical/title/description/Open Graph state, noindex, heading order, image alt attributes, control labels, fragments, header/footer presence, internal destinations, desktop/mobile overflow, shared breakpoint behavior, redirects, external origins, and 404 responses.

The existing visual harness generated production/local screenshots, side-by-sides, overlays, amplified differences, element metrics, and page heights at 1440, 1024, 768, and 390px for every route. Board & Staff correctly used production `/about-us/` as its visual source. The existing interaction harness ran across all canonical routes. Dedicated form, native Instagram, and legal harnesses supplied service-specific evidence. All `.visual-qa` output remains ignored.

`scripts/mobile-visual-certification.mjs` runs the established visual harness for every canonical route at 430, 390, 375, 360, and 320px, preserving the `/about-us/` production source mapping for Board & Staff. `scripts/mobile-certification.mjs` separately checks each of the 70 route-width combinations for the mobile header/logo/toggle, keyboard menu geometry and close behavior, body-lock restoration, scroll behavior, footer stacking, floating control, clipped text, horizontal overflow, media/images/controls, card stacking, and route-specific form/feed/video/logo/people/legal containment. Evidence is written only under ignored `.visual-qa` paths.

## Dedicated mobile visual-parity certification

All 70 identical-width production/local captures include full-page screenshots, side-by-side images, overlays, amplified differences, and height measurements. Shared mobile geometry is stable across routes: the header is 175/167/164/161/153px high at 430/390/375/360/320px, the centered logo is 215/195/188/180/160px wide, and the 28px menu toggle remains centered and contained. The header begins full-size at page top and scrolls away on mobile, matching production; it does not shrink on navigation or become incorrectly sticky.

Every mobile interaction run confirms the hamburger opens and closes from the keyboard, `aria-expanded` tracks state, menu rows remain at least 47px high, navigation stays within the viewport, and body overflow state is restored after closing. All routes have zero document-level horizontal overflow and zero clipped visible text. CTAs, cards, images, iframes/video, footer sections/logo, and the floating donation control remain contained. People cards and testimonial cards stack in DOM order; the 18-logo sponsor wall and 29-logo campaign directory collapse without overflow; legal text remains contained; and native Instagram media stays within its feed wrapper.

We Need Trailers retains all five semantic labels, six visible form controls including submit, full-width field containment, and stable submitting/success/error status geometry at every mobile width. The state checks mutate the local status region only and never invoke the Server Action or send email. Hope In Action is evaluated using static wrapper/section geometry plus live-provider containment; changing Instagram media and captions remain dynamic variance rather than frozen visual data.

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
| `/hope-in-action/` | **PASS WITH MINOR DIFFERENCES** 13177/13669 | **PASS WITH MINOR DIFFERENCES** 12994/13086 | **PASS WITH MINOR DIFFERENCES** 12930/13099 | **PASS WITH MINOR DIFFERENCES** 12890/13159 | **PASS WITH MINOR DIFFERENCES** 13013/13210 | **PASS** | **PASS** | Native one-column feed, CTA, footer, and containment pass; changing live content and native caption flow create documented cumulative height variance. |
| `/terms-conditions/` | **PASS** 3304/3303 | **PASS** 3415/3414 | **PASS** 3481/3477 | **PASS** 3517/3514 | **PASS** 3644/3641 | **PASS** | **PASS** | 1–4px cumulative legal typography variance; no clipped copy. |
| `/privacy-policy/` | **PASS** local | **PASS** local | **PASS** local | **PASS** local | **PASS** local | **PASS** | **PASS** | New legal enhancement; no WordPress source equivalent. |

Heights are production/local pixels. The dedicated sweep found and corrected three source mismatches: homepage mission copy now uses production's 500 weight with the matching desktop section padding, Contact values inherit production's Arial 500 treatment instead of Noto Sans 900, and Live Here consistently resolves the loaded Next Noto Sans face while removing a non-source story letter-spacing override. Standard 1440/1024/768/390 visual regressions and full interaction suites were rerun for all three affected routes.

## Route matrix

All metadata checks below include one canonical matching `https://www.findfeedrestore.com` plus the listed route, one unique non-empty title and description, matching Open Graph metadata, and no `noindex`.

| Route | HTTP | Visual heights: production/local at 1440 · 1024 · 768 · 390 | Interaction | Metadata | Links/runtime/accessibility | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | 200 | 4712/4712 · 5828/5829 · 6108/6108 · 8176/8175 | 12/12 | Complete; Organization JSON-LD valid | Clean | **PASS** |
| `/affordable-housing/` | 200 | 4096/4096 · 4487/4487 · 5004/5004 · 6166/6164 | 13/13 | Complete | Clean | **PASS** |
| `/housing-first/` | 200 | 3898/3898 · 4443/4443 · 5017/5018 · 6170/6169 | 13/13 | Complete | Clean | **PASS** |
| `/homelessness-avoidance/` | 200 | 3981/3980 · 4509/4509 · 4958/4958 · 6171/6169 | 13/13 | Complete | Clean | **PASS** |
| `/care-coach-mobile-unit/` | 200 | 4557/4557 · 4482/4482 · 5883/5883 · 6184/6182 | 18/18 | Complete | YouTube source, geometry, focus, play/pause pass | **PASS** |
| `/news-media/` | 200 | 4672/4672 · 5189/5189 · 5488/5488 · 8398/8397 | 16/16 | Complete | Eighteen newest-first publisher links and CTA contracts pass | **PASS** |
| `/testimonials/` | 200 | 3116/3115 · 3460/3460 · 3433/3434 · 4614/4613 | 19/19 | Complete | Three click-to-load YouTube contracts pass | **PASS** |
| `/contact-us/` | 200 | 4477/4477 · 5554/5554 · 5594/5594 · 6810/6809 | 17/17 | Complete | Phone, email, PlanStreet, Typeform, Kindful pass | **PASS** |
| `/board-staff/` | 200 | 4601/4601 · 5460/5460 · 5485/5485 · 9198/9197 | 16/16 | Complete | Identity assets/cards pass; source-matched intermediate warning below | **PASS WITH WARNING** |
| `/sponsors/` | 200 | 3167/3166 · 3641/3642 · 3708/3708 · 5993/5992 | 16/16 | Complete | All 18 identities, secure external contracts, hover/focus pass | **PASS** |
| `/live-here-love-here-lake/` | 200 | 6686/6685 · 8364/8364 · 8896/8896 · 12460/12458 | 18/18 | Complete | 29-logo directory and native video pass | **PASS** |
| `/we-need-trailers/` | 200 | 5123/5251 · 7059/7019 · 7017/7099 · 7936/7863 | 11/11 shared + 22/22 form/server | Complete | Functional form difference; all field geometry and states pass | **PASS WITH APPROVED DIFFERENCE** |
| `/hope-in-action/` | 200 | 4917/4897 · 6147/6172 · 7455/7450 · 12994/13086 | 11/11 shared + 8/8 browser + 8/8 provider | Complete | Native Instagram links, Load More, media, cache, and fallback pass | **PASS WITH DYNAMIC TREATMENT** |
| `/terms-conditions/` | 200 | 2474/2474 · 2496/2496 · 2562/2562 · 3415/3414 | 11/11 shared + 7/7 legal | Complete | Exact legal copy, hierarchy, canonical and alias pass | **PASS** |
| `/privacy-policy/` | 200 | Focused local checks at 1440 · 1024 · 768 · 390 | Shared shell + five-width mobile | Complete | Semantic policy, footer/contact links, canonical, sitemap, and overflow pass | **PASS** |

We Need Trailers reproduces the exact Milestone 13 accepted measurements. The larger raster difference is caused by the intentional accessible functional status region replacing production's obsolete form note, not a new regression; the dedicated harness confirms production-equivalent field geometry at all four widths. Hope In Action retains the certified static shell and exact feed breakpoints. Its remaining page-height/raster variance is changing Instagram content plus the native caption flow, not section, wrapper, CTA, footer, or overflow drift.

## Shared breakpoint certification

Every route was inspected at 1231, 1230, 1181, 1180, 1025, 1024, 901, 900, 768, and 767px. Header variants switch once and correctly: desktop at 1025px and above, tablet from 768–1024px, and mobile at 767px and below. Footer sections remain contained and change to the mobile stack at 767px. The desktop navigation remains one row and all sticky, dropdown, mobile-menu, focus, and route-navigation-to-page-top checks pass.

Certification found a local-only 31px header overflow beginning at 1181px and continuing through 1230px. Production avoids overflow there by wrapping its last two menu entries; the accepted Next.js system deliberately keeps a single row. The existing compact-desktop rule was narrowly extended through 1230px, eliminating overflow while preserving the accepted single-row composition. Adjacent 1231/1230 captures and the shared interaction suite pass.

Board & Staff's fixed 240px people cards produce a 1312px grid width in the 1101–1311px range and a 788px grid width in part of the 701–787px range. Production `/about-us/` reproduces the same scroll widths at 1230 and 768px. The global body suppresses a horizontal scrollbar, but edge cards can be clipped at those intermediate widths. Because this is a source-matched legacy behavior and route redesign was prohibited, it is documented as a pre-cutover improvement rather than changed during certification.

## Internal-link audit

Every anchor in the header, footer, and page body on all 16 canonical routes was collected. After deduplication, every internal destination returns 200 directly; there are no internal 404s, localhost/127.0.0.1 URLs, broken fragments, or links through aliases. The footer's legacy `/news` link was corrected to `/news-media/`; the Testimonials Contact CTA and Contact corporate-partnership CTA were corrected to direct 200 forms without trailing-slash normalization hops. The footer's production-preserved HTTP LinkedIn URL was corrected to its verified HTTPS canonical profile. All external route-specific contracts continue to pass their interaction checks.

An external-link maintenance sweep on August 17, 2026 checked 88 unique destinations. Four confirmed 404s were corrected: three deleted South Lake Tablet stories now link to verified Internet Archive snapshots, and the Key Food sponsor tile now links to its current official Clermont store page. Ten additional provider URLs rejected or rate-limited automated probes; those responses were recorded as provider-side automation restrictions rather than incorrectly classified as confirmed broken links.

## Redirect matrix

Next.js permanent redirects return 308. Each audited no-slash alias takes one redirect hop and ends in a 200 canonical route without a loop or duplicate indexable page.

| Source | Destination | Status | Redirect hops | Final result |
| --- | --- | --- | --- | --- |
| `/terms` | `/terms-conditions` | 308 permanent | 1 | 200 |
| `/trailer-ministry` | `/we-need-trailers` | 308 permanent | 1 | 200 |
| `/news` | `/news-media` | 308 permanent | 1 | 200 |
| `/about-us` | `/board-staff` | 308 permanent | 1 | 200 |
| `/about` | `/board-staff` | 308 permanent | 1 | 200 |
| `/feed` | `/news-media` | 308 permanent | 1 | 200 |

`/news` was required by the original inventory, and `/about-us/` is the current production people-page URL. Search Console later confirmed the historical `/about/` and `/feed/` WordPress variants, which now redirect semantically to Board & Staff and News & Media. A homepage-only Proxy permanently removes the obsolete `trk`, `et_fb`, `PageSpeed`, and `et_core_page_resource` parameters in one hop; unrelated query parameters remain unchanged. Old WordPress runtime assets remain unavailable rather than redirecting JavaScript requests to HTML. Next.js performs its normal slash normalization before configured redirects when a slash variant is requested; canonical internal links do not use these aliases.

## Metadata and structured data

- All 16 current routes have exactly one correct production-domain canonical, a unique title and description, matching `og:description`, and no accidental `noindex`.
- Every route includes the currently implemented Open Graph title, URL, site name, locale, and type.
- The homepage's Organization JSON-LD is valid and is the only implemented structured-data block. No page schema was invented for certification.

## Mobile Lighthouse optimization refresh

An August 17, 2026 no-redesign optimization pass ran Google Lighthouse 13.4.1 in simulated 390px mobile mode against every canonical route. All 16 routes now score 100 for Lighthouse SEO and 100 for Lighthouse accessibility. Best Practices is 100 except Care Coach's existing third-party YouTube cookie notice, which remains 96 and does not represent a site runtime error.

- CSS hero images now emit route-specific `preload` resource hints with high fetch priority while preserving their existing CSS crop, overlay, geometry, and source imagery.
- The shared legal hero was recompressed in place at the same 2048×931 dimensions and path, reducing it from 1,519,993 to 488,846 bytes. Lighthouse's estimated delivery waste fell from 1,174 KiB to 167 KiB.
- Stable `/images/` assets use a one-day browser cache with a seven-day stale-while-revalidate window; optimized Next.js images use a one-day minimum cache TTL.
- Local factual images in program, people, sponsor, contact, and campaign cards now use responsive Next.js image delivery. Instagram's signed remote media remains provider-delivered and unmodified.
- Unique descriptions and matching Open Graph descriptions were added to Affordable Housing, Housing First, Homelessness Avoidance, Care Coach, Testimonials, and Contact Us.
- News links retain their visible “Read More” text while receiving article-specific accessible names. Instagram timestamps and the Live Here supporting-tier badge now pass contrast. Privacy Policy contact links now pass mobile touch-target sizing.
- Production/local screenshots at 1440, 1024, 768, and 390px confirm identical section geometry, hero crops, image focal points, card layout, forms, navigation, and footer placement. Privacy Policy gains only the small contact-link hit-area spacing required for touch accessibility.

## Resend form certification

The architecture remains Browser → Next.js Server Action → server normalization/validation and spam checks → Resend → configured inbox. `src/app/we-need-trailers/actions.ts` imports `server-only`; only `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL` are read, and the variable names do not occur in `.next/static` client output. No value is tracked, printed, documented, or exposed. `.env.local` is ignored.

Ten injected-seam Node tests pass: required and malformed email, malformed/overlong input, honeypot, 1.5-second/24-hour timing bounds, trimming/lowercasing/line-ending normalization, mocked successful delivery, duplicate lock acquisition, configured From/To mapping, visitor `reply_to`, HTML/text field content, Resend request success, safe provider failure, and server-only environment-name usage. Twelve browser checks pass for the exact five-field/only-email-required contract, semantic labels, live region, hidden honeypot/timing controls, native invalid/required email validation, keyboard order, production-equivalent geometry at all four widths, duplicate-disabled submitting preview, safe error preview, and success preview. Routine browser QA now previews states without invoking the Server Action.

During the initial certification run, the older browser harness assumed local delivery was unconfigured. It attempted one submission using the clearly labeled address `website-test@example.com` before the audit established—by presence booleans only—that all three variables existed in `.env.local`. That request may have produced one local test delivery; no value was read or logged, no repeat was made, and delivery or Reply-To behavior cannot be verified from this environment. The harness was immediately changed to a non-delivery routine and subsequent local servers were started with all three variables explicitly empty.

Real end-to-end delivery verification remains a **USER ACCEPTANCE TEST / MANUAL POST-DEPLOYMENT CHECK**, owned by the project owner. After an authorized deployment, submit one clearly labeled trailer-form test and confirm receipt plus the visitor-email Reply-To header in the destination inbox or Resend delivery record. This manual acceptance check is not a launch blocker, and another Preview should not be created solely for Resend testing. No additional real email was sent during certification reclassification.

## Native Instagram certification

Hope In Action now uses the Instagram API with Instagram Login through `graph.instagram.com/v26.0`. The server-only provider reads `INSTAGRAM_ACCESS_TOKEN` and `INSTAGRAM_ACCOUNT_ID`, verifies the authorized profile through `/me`, requests at most 24 recent entries from `/me/media`, normalizes only `IMAGE`, `VIDEO`, and `CAROUSEL_ALBUM`, and caches successful Meta responses for 900 seconds. Sixteen cards render initially; Load More reveals the remaining cached eight without sending a cursor or credential to the browser. The authorized-account verification returned 24 valid current image posts. Mocked seams certify video/Reel thumbnails and carousel covers because neither type was present in that live result.

Eight provider tests and eight browser checks pass: current host/version/fields, bearer handling with no token query, account matching, bounded cache configuration, supported media normalization/presentation, safe malformed/error results, no client credential reference, 16-to-24 Load More, secure Instagram permalinks and keyboard focus, square contained media, exact 1/2/3/4-column transitions, five mobile widths without overflow, and singular App Router remount. Missing configuration and an invalid-token API response were separately exercised in a browser; both preserve the complete page shell and show only the direct-profile fallback. Juicer's adapter, script loader/runtime hooks, and route CSS are removed, and no dynamic Instagram media is committed as a static asset.

Meta documents the long-lived token lifetime as approximately 60 days. Operations must refresh an eligible unexpired token after it is 24 hours old through `graph.instagram.com/refresh_access_token` using `grant_type=ig_refresh_token`, update the controlled Vercel environment value, redeploy, and verify the provider. The application intentionally does not mutate immutable Vercel environment configuration or invent token storage.

## Video and media certification

| Route/media | Source and behavior | Result |
| --- | --- | --- |
| Care Coach YouTube | `https://www.youtube.com/embed/SonlnoRUCQg`; no autoplay parameter; fullscreen; desktop/mobile aspect geometry; iframe keyboard focus; play/pause verified | **PASS** |
| Testimonials YouTube | Seven approved videos: three client stories plus Housing First, Channel 6 News, Care Coach Back to School, and the Housing and Hunger Simulation; local thumbnails load an iframe only after keyboard/click activation; autoplay follows user action; `allowFullScreen` and provider play/pause verified | **PASS** |
| Live Here hosted MP4 | Local `/images/campaigns/live-here-love-here/keller-williams-volunteer-day.mp4`; controls, metadata preload, no autoplay, poster button, keyboard play/pause, contained geometry; byte-range request returns 206 `video/mp4` | **PASS** |

Production's native MP4 also omits `playsinline`; local preserves that source behavior and mobile keyboard/playback checks pass. There is no autoplay audio. No severe media layout shift appears in accepted screenshots.

## Asset and build-readiness audit

- `public` contains 110 files and is approximately 95 MB; `public/images` is approximately 94 MB.
- The hosted MP4 is 90,101,823 bytes (85.93 MiB), SHA-256 `8dd0c506c5dd9b7d5cd3178dbf3bccb7ce0b8a3b4f009e4ec0858143bc5be2a3`. It is tracked in Git and is the only asset over 2 MB. It does not prevent the build, route, range request, or playback checks, but dominates deployment weight.
- All 18 sponsor logos and 17 identity-critical staff/board portraits plus the people hero remain present and pass rendered identity checks.
- The three unique trailer assets remain present. No generated substitute or live social-feed media is committed.
- Runtime crawling found no missing image, stylesheet, script, font, poster, or other local asset on any canonical route.
- Hash audit found one existing duplicate pair: `public/images/programs/affordable-housing/hero.jpg` and `public/images/programs/housing-first/support-family.jpg`, SHA-256 `6ac72f949551120c67b281baafdd24672c7ec1f449711f0ba765befcd88f7935`. Both belong to accepted routes; cleanup is deferred rather than changing source paths during certification.
- Client islands remain limited to the shared header, homepage counter, testimonial video activation, native-video poster/control, trailer form, and native Instagram progressive reveal. Instagram credentials are absent from client output.

## Accessibility smoke audit

All 16 routes have one logical H1 and no heading-level skip, no image missing an `alt` attribute, no unlabeled visible form control, no broken fragment, visible three-pixel keyboard focus, keyboard-reachable navigation/dropdowns/forms/media, no keyboard trap found, and accessible form status messaging. Decorative images use empty alt text where appropriate. Route-specific interaction tests cover menus, CTA links, media, testimonial activation, sponsor focus, form order/states, native Instagram links, and legal structure. This is a smoke certification, not a complete WCAG conformance claim.

## 404 behavior

The clearly nonexistent certification route, `/terms-and-conditions/`, `/wp-admin/`, and `/wp-login.php` all finish with HTTP 404 rather than false 200 content. Next.js currently supplies its default “This page could not be found” presentation. A branded custom 404 is a post-certification enhancement, not a launch blocker.

## External dependencies

| Dependency | Routes/use | Certification treatment |
| --- | --- | --- |
| Resend | Trailer Server Action delivery | Server-only architecture and mocked delivery contract pass; real delivery is a user-owned manual post-deployment check, not a blocker |
| Instagram API with Instagram Login | Hope In Action live feed | Server-only auth, cache, normalization, links, media, load-more, and safe fallback pass |
| YouTube | Care Coach, Testimonials, Housing First, Affordable Housing, and Volunteer | Source, user activation, fullscreen, focus, play/pause pass |
| Typeform | Volunteer, partnership, application CTAs | Destinations and secure new-tab contracts pass where specified |
| PlanStreet | Assistance applications | Destination contracts pass |
| Kindful/Bloom | Donation CTAs and floating control | Destinations pass on every route |
| Candid | Footer transparency profile | Image/link contract loads without local asset error |
| Social, sponsors, publishers | Footer profiles, sponsor directories, News cards | Stored destinations, target/rel, identity and focus contracts pass; remote services remain third-party operational dependencies |
| Local MP4 | Live Here story video | Source, range response, controls and playback pass; large deployment asset |

## Outstanding launch items

### BLOCKER

- None.

### USER ACCEPTANCE TEST / MANUAL POST-DEPLOYMENT CHECK

- The project owner will perform one clearly labeled real trailer-form submission after an authorized deployment, then verify receipt, configured From/To behavior, and the submitted visitor email as Reply-To. Do not create another Preview solely for this check. This does not block cutover because the server-only architecture, validation, spam protection, delivery payload, configured-address mapping, HTML/text bodies, safe failures, and accessible browser states are already certified through code and injected integration testing.

### SHOULD FIX BEFORE CUTOVER

- Decide whether to correct the source-matched Board & Staff card clipping at intermediate 1101–1311px and 701–787px widths. No horizontal scrollbar appears because global overflow is suppressed, but edge cards can be clipped.
- Establish ownership of an Instagram token-expiry reminder or secure rotation workflow before cutover. Runtime token persistence remains prohibited.

### POST-LAUNCH OPTIMIZATION

- Consider route-appropriate structured data beyond the existing homepage Organization schema.
- Add a branded custom 404.
- Move the 90,101,823-byte MP4 to an appropriate media/CDN workflow after measuring launch behavior; the current deployment architecture works and is not a blocker.
- Hash-deduplicate the accepted 211,091-byte program image pair if route paths can be changed safely.
- Continue monitoring YouTube, Instagram, Typeform, PlanStreet, Kindful, Candid, publisher, social, and sponsor availability as external operational dependencies.

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
