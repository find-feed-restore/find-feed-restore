# Site Migration Matrix

Inventory date: 2026-08-11

Production source: <https://www.findfeedrestore.com/>

Scope: Milestone 2 discovery plus migrated routes through Milestone 16 full-site certification. The migration implementation phase is complete; production cutover remains gated by the documented Vercel Preview Resend delivery test.

## Discovery method and canonical scope

The inventory combines the production Yoast sitemap index, WordPress core sitemap, `page-sitemap.xml`, public WordPress REST responses, desktop and mobile rendered captures, desktop/mobile navigation, footer navigation, and internal-link discovery.

- The Yoast and WordPress sitemaps agree on one page sitemap containing **14 canonical public pages**.
- The REST API returns the same **14 published pages**, all top-level and all using the `elementor_header_footer` page template.
- The public REST posts collection contains **0 published posts**. There is no post sitemap.
- No public domain-specific custom post type, custom taxonomy, or ACF field payload was exposed. Public REST types beyond WordPress core are Elementor/ElementsKit template types.
- All 14 canonical pages returned HTTP 200 in the rendered crawl and declared the expected canonical URL.
- Rendered full-page captures were inspected at 1440px and 390px. The later implementation phase must still run route-by-route production/local QA at 1440, 1024, 768, and 390px.

### Status meanings

- `COMPLETE`: migrated and accepted against the production baseline.
- `READY`: sufficiently audited to migrate using static representative content and the recorded architecture.
- `NEEDS AUDIT`: additional source inspection is required before implementation.
- `DYNAMIC`: the visual layout is audited, but a live feed, form, embed, or content-source decision must be preserved or explicitly resolved.
- `SPECIAL CASE`: a largely unique page whose migration should follow the shared foundation it can reuse.
- `EXCLUDE`: not a canonical local page to rebuild.

## Canonical public URL matrix

| URL | Page title | Content type | Navigation location | Apparent page family | Unique vs shared layout | Major sections | Dynamic content / forms | Elementor widgets | Third-party dependencies / interactions | Complexity | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | Find Feed Restore - Home | WordPress page; Elementor/custom HTML | Header Home; logo; multiple internal links | Homepage | Unique composition; supplies global chrome and primitives | Header, vision hero, mission grid, impact counters, causes, giving CTA, footer, floating donate | Animated counters; no form | Image, container, nav menu, button, text, HTML, heading, icon list, social icons | Kindful, Typeform, YouTube, Candid, social profiles; sticky header, dropdowns, hover/entrance/shimmer motion | High | **COMPLETE** |
| `/affordable-housing/` | Affordable Housing | WordPress page; program detail | Header Programs; footer Our Programs; homepage program cards | Program detail | Shared program-family template | Program hero, split intro with program logo, application card, story gallery, image CTA, Other Programs cards | External needs-assistance application; no local form | Body is primarily HTML; global image/nav/button/heading/icon/social widgets | PlanStreet public form, Kindful; card/button hover | Medium | **COMPLETE** |
| `/housing-first/` | Housing First | WordPress page; program detail | Header Programs; footer Our Programs; homepage program cards | Program detail | Same family structure as Affordable Housing | Program hero, split intro/logo, application card, story gallery, image CTA, Other Programs cards | External needs-assistance application; no local form | Primarily HTML plus global widgets | PlanStreet public form, Kindful; card/button hover | Medium | **COMPLETE** |
| `/homelessness-avoidance/` | Homelessness Avoidance | WordPress page; program detail | Header Programs; footer Our Programs; homepage program cards | Program detail | Same family structure as Affordable Housing | Program hero, split intro/logo, application card, story gallery, image CTA, Other Programs cards | External needs-assistance application; no local form | Primarily HTML plus global widgets | PlanStreet public form, Kindful; card/button hover | Medium | **COMPLETE** |
| `/care-coach-mobile-unit/` | Care Coach | WordPress page; program detail | Header Programs; footer Our Programs; homepage program cards | Program detail | Program-family variant with an embedded video and different gallery proportions | Program hero, split intro/logo, application card, story gallery, YouTube video, image CTA, Other Programs cards | YouTube iframe; external application | Primarily HTML plus global widgets | YouTube embed, Typeform application, Kindful | Medium-high | **COMPLETE** |
| `/news-media/` | News & Media | WordPress page; editorial/media | Header Hope In Action; footer News redirects here | Editorial/media | Shares hero, intro, section heading, and closing CTA with Testimonials; unique news-card body | Editorial hero, split intro, featured press card, press-card grid, image CTA | Press items are manually embedded in page HTML, not WordPress posts | Primarily HTML plus global widgets | Eleven external publisher links; mailto media inquiry; Kindful; responsive card reflow | Medium | **COMPLETE** |
| `/testimonials/` | Testimonials | WordPress page; editorial/media | Header Hope In Action | Editorial/media | Shares editorial hero, intro, heading, container, and CTA shell with News; unique video-card body | Editorial hero, split intro, three featured video cards, image CTA | Client interaction replaces clicked thumbnail with autoplay YouTube iframe | Primarily HTML plus global widgets | Three YouTube embeds; local preserved thumbnails; Kindful | Medium-high | **COMPLETE** |
| `/hope-in-action/` | Social Media (display hero: Hope In Action) | WordPress page; live social feed | Header Hope In Action; footer Quick Links | Social feed | Unique feed page; reuses global hero/CTA language only | Image hero, social profile buttons, live feed, image CTA | Live Juicer feed and Load More behavior | Primarily HTML plus global widgets | `juicer.io` embed, Instagram post links, social profiles, Kindful | High | **COMPLETE** |
| `/sponsors/` | Partners & Sponsors | WordPress page; partner directory | Header Get Involved | Sponsor directory | Unique page shell with reusable sponsor-tile/grid primitives | Image hero, split purpose intro, flat 18-logo sponsor wall | Sponsor roster/logos/links are manually embedded | Primarily HTML plus global widgets | Eighteen external sponsor sites; grayscale-to-color logo hover/click | Medium | **COMPLETE** |
| `/live-here-love-here-lake/` | Live Here Love Here Lake | WordPress page; partnership campaign | Header Get Involved; footer Corporate Partnership | Membership/partnership campaign | Unique branded layout; its tiered directory is not interchangeable with Sponsors | Branded hero, price banner, benefits intro/cards, tiered business directory, closing split story | Native hosted MP4; frequently changing tiered business roster | HTML, heading, text editor, video plus global widgets | Typeform partnership intake, hosted MP4, YouTube story link, 27 linked business destinations | Very high | **COMPLETE** |
| `/we-need-trailers/` | We Need Trailers | WordPress page; campaign/lead form | Header Get Involved; footer Donate Trailer; `/trailer-ministry/` now redirects here | Trailer campaign | Unique campaign layout; reuses only the accepted global shell | Campaign hero and fact pills, split intro/impact card, three-step process, trailer lead form, gallery, final image CTA | Next.js Server Action validates/spam-checks the five-field source contract and delivers through Resend; production action remains nonfunctional | Primarily HTML plus global widgets | Resend, Kindful, accessible form states, standard hover states | Very high | **COMPLETE** |
| `/contact-us/` | Contact Us | WordPress page; contact/conversion | Header Contact Us; footer Contact | Contact | Unique arrangement with reusable gallery/CTA/card primitives | Contact hero, phone/email/location split with PlanStreet application card, three action cards, impact gallery, image CTA | No contact form or map; every conversion is a semantic link to an external service or internal route | Primarily custom HTML plus global widgets | PlanStreet public form, Typeform, Kindful; telephone and email URI actions | Medium | **COMPLETE** |
| Production `/about-us/` → Next `/board-staff/` | Board & Staff | WordPress page; people directory | Header Board & Staff; footer Quick Links | People directory | Unique people grids; reuses global image hero and closing CTA conventions | Image hero, founders, staff grid, board grid, image CTA | Staff/board roster is manually maintained in Elementor HTML | Primarily HTML plus global widgets | Typeform volunteer, Kindful; static person cards | Medium-high | **COMPLETE** |
| `/terms-conditions/` | Terms & Conditions | WordPress page; legal/standard content | Footer lower legal link now points directly to the canonical route; `/terms` remains a redirect alias | Legal content | Unique legacy Elementor layout | Breadcrumb title hero, long-form legal copy, footer | Static page content | Heading, icon list, text editor plus global widgets | No page-specific service; breadcrumb is present | Low | **COMPLETE** |

## Excluded and non-canonical discoveries

| Discovered URL or class | Finding | Disposition |
| --- | --- | --- |
| `/news` | One redirect to `/news-media/` | **EXCLUDE** as a page; preserve a redirect for legacy/footer compatibility. |
| `/terms` | One redirect to `/terms-conditions/` | **EXCLUDE** as a page; preserve a redirect for legacy/footer compatibility. |
| `/trailer-ministry/` | HTTP 404, but the homepage giving CTA still points here | **EXCLUDE** as content; repair through an explicit redirect to `/we-need-trailers/` during route migration without changing the accepted homepage markup prematurely. |
| `/feed/` and feed variants | Technical RSS output; no published posts currently exist | **EXCLUDE** from page migration. Reassess only if headless posts are later enabled. |
| `/wp-admin/`, `/wp-login.php` | WordPress administration/authentication | **EXCLUDE**; WordPress remains the CMS and these are not Next.js public pages. |
| `/wp-json/`, sitemap XML, robots, Elementor/WordPress technical endpoints | Machine-readable discovery/runtime endpoints | **EXCLUDE** from the page matrix; retain WordPress access as needed for the later headless design. |
| `#content`, `#trailer-form`, query strings, slash/no-slash duplicates | Fragment or duplicate variants of canonical pages | **EXCLUDE** as separate pages; retain meaningful anchors. |
| WordPress attachment URLs | None appeared as meaningful canonical pages in either sitemap | **EXCLUDE** unless a later content audit finds a deliberately public attachment page. |

External flows are dependencies, not local migration pages: Kindful/Bloom donations, Typeform volunteer/partnership/application flows, PlanStreet public assistance intake, Juicer, YouTube, Candid, publisher articles, social profiles, and partner websites.

## Render-derived page families

There are **10 structural page families** across the 14 canonical URLs. Only the program and editorial families contain multiple pages; the remaining single-page families are kept separate because their rendered section order, proportions, and behavior are materially different.

| Family | URLs | Shared evidence | Architecture recommendation |
| --- | --- | --- | --- |
| Homepage | `/` | Accepted baseline only | Preserve existing implementation. Reuse its global chrome and only proven primitives. |
| Program detail | Four program URLs | Exact `ffr-pillar-*` structure: hero, split intro/application card, story media, support band, and related-program cards | Build one family composition with page data and an explicit optional video/media slot; do not flatten Care Coach differences. |
| Editorial/media | `/news-media/`, `/testimonials/` | Same `ffr-news-media-*` hero, split intro, section-heading, and closing CTA shell | Share the shell; keep news cards and video cards as separate family components. |
| Social feed | `/hope-in-action/` | Juicer-backed feed and unique social layout | Page-specific implementation around shared hero/CTA primitives. |
| Sponsor directory | `/sponsors/` | Flat sponsor wall | Dedicated directory composition using a reusable logo-tile primitive. |
| Membership/partnership campaign | `/live-here-love-here-lake/` | Unique brand palette, video, benefits, three sponsorship tiers, and story close | Route-scoped `LiveHereHero`, `LiveHereImpact`, `LiveHereSponsors`, `SponsorLogo`, `LiveHereStory`, and `LiveHereStoryVideo`; the accepted global header/footer are the only shared components. |
| Trailer campaign | `/we-need-trailers/` | Unique campaign facts, process, and lead form | Page-specific composition; require form decision before completion. |
| Contact | `/contact-us/` | Unique contact/action-card arrangement | Page-specific composition using shared cards, gallery, and CTA band where measurements match. |
| People directory | Production `/about-us/`; Next `/board-staff/` | Founder/staff/board grids | Dedicated people-grid family components and CMS-ready data shape. |
| Legal content | `/terms-conditions/` | Legacy breadcrumb hero and long-form prose | Small legal layout; do not force it into the newer custom hero system. |

## Section-pattern inventory

Classification:

- **A — Existing shared component**: already present in the accepted homepage architecture.
- **B — New shared component**: visually repeated across otherwise different families.
- **C — Page-family component**: reuse only within a proven family.
- **D — Page-specific implementation**: materially unique or service-coupled.

| Pattern | Where it recurs | Class | Recommended boundary |
| --- | --- | --- | --- |
| Responsive header/navigation | Every page | **A** | Reuse `SiteHeader` and navigation data unchanged unless a route genuinely exposes a shared need. |
| Site footer | Every page | **A** | Reuse `SiteFooter`; preserve legacy redirect targets until route redirects are added. |
| Floating donation control | Every page | **A** | Reuse `FloatingDonate`. |
| Red primary and translucent secondary pills | Nearly every custom interior page | **A** | Reuse existing button primitives only where dimensions/typography match; allow narrow variants. |
| Eyebrow plus large serif section heading | All modern custom HTML pages | **B** | Small `SectionHeading` primitive with alignment/tone options, not a universal section wrapper. |
| Dark image-overlay CTA band | Program pages, editorial pages, Contact, About, Hope, Trailer | **B** | `ImageCtaBand` with explicit background, overlay, copy, and actions. Preserve per-page height/crop options. |
| Responsive image gallery with rounded crops | Program pages, Contact, Trailer | **B** | Shared gallery/crop primitives; family compositions own exact grid geometry. |
| Logo tile | Sponsors and Live Here | **B** | Reusable accessible logo/link tile only. The flat wall and tiered directory remain separate. |
| Elevated content/action card | Program application cards, Contact action cards, Trailer impact/process/form cards | **B** | Share visual card primitives sparingly; do not merge their semantic content APIs. |
| Program hero | Four program pages | **C** | `ProgramHero` driven by exact image, eyebrow, title, description, and object position. |
| Program split intro/application card | Four program pages | **C** | One program-family section with program logo/copy plus application-card data. |
| Program story media | Four program pages | **C** | Program gallery section with an optional Care Coach video slot. |
| Other Programs cross-link grid | Four program pages | **C** | Data-driven `OtherPrograms` component. |
| Editorial hero/intro/closing CTA shell | News and Testimonials | **C** | One editorial layout shell; body slot stays explicit. |
| News/press card grid | News only | **C** | News family component with featured and standard card variants; later CMS-ready. |
| Click-to-load video cards | Testimonials only | **C** | Accessible video-card component that preserves thumbnail-to-iframe behavior. |
| Staff and board person cards | About only | **C** | People-directory family components with founder/staff/board variants. |
| Tiered business directory and benefits | Live Here only | **D** | Preserve as page-specific branded sections. |
| Juicer social feed | Hope In Action only | **D** | Isolate the external embed behind a page-specific boundary and fallback. |
| Trailer process and lead form | We Need Trailers only | **D** | Page-specific form/process; do not supply a new backend without approval. |
| Legacy breadcrumb title hero | Terms only | **D** | Legal-page implementation; intentionally separate from modern image heroes. |

The useful shared inventory is therefore **14 recurring patterns** (the first fourteen rows), followed by seven family-specific or page-specific patterns. Similar white cards and image heroes are not treated as interchangeable merely because they share colors or rounded corners.

## Global design findings added by the interior audit

### Typography and color

- Modern interior custom HTML sections consistently use Georgia/Times for large display headings and Noto Sans for labels, controls, and body copy, matching the homepage custom sections.
- Program/editorial/contact/about/sponsor pages reuse the accepted tokens `#071b2a`, `#8b0000`, `#c40000`, `#667085`, `#faf8f5`, `#fcfcfc`, and white.
- The legacy Terms page remains Noto Serif/Noto Sans and should not be visually normalized to the newer Georgia treatment.
- Live Here Love Here Lake is a genuine branded exception, including `#c11d35`, `#8e1f2f`, `#b51d34`, and warm/gold accents. These should remain page-scoped rather than becoming global brand tokens.

### Containers, spacing, and responsive behavior

- Modern interior hero copy is commonly capped around 900–980px; section copy commonly uses 680–920px caps.
- Repeated modern interior wrappers use 1280–1480px maximum widths, wider than the 1140px Elementor footer container.
- Program pages share a 1280px family wrapper and transition through page-specific rules near 1100/980/700px in addition to Elementor's 1024/767 header templates.
- Editorial pages use a 1480px content width for their card/video grids, with narrower 760–980px header/intro measures.
- Mobile custom pages become a single column with roughly 18–20px gutters. Headings, media order, and section heights are deliberately page-specific.
- The header continues to use distinct desktop, tablet, and mobile Elementor templates on every page. Interior implementation must not weaken the accepted homepage breakpoint behavior.

### Motion and interaction

- Repeated interactions are restrained: button/card lift, logo-card hover, image zoom, sticky desktop header, dropdown navigation, and the global floating-donation shimmer.
- Testimonials replaces a selected thumbnail with an autoplay YouTube iframe; this is an actual client interaction, not a static link.
- Hope In Action delegates rendering and Load More behavior to Juicer.
- Live Here contains a native hosted video; Care Coach contains a YouTube iframe.
- No rendered interior page contains an accordion, tabs, carousel/slider, `<details>` disclosure, search interface, or popup.

## WordPress, plugin, and external dependency audit

| Dependency | Current responsibility | Migration implication |
| --- | --- | --- |
| WordPress pages | All 14 canonical pages and SEO-facing content | Remains the likely source of editable page content; integration is intentionally deferred. |
| Elementor / Elementor Pro | Header/footer templates, responsive visibility, nav/dropdowns, sticky behavior, native widgets, page template | Recreate semantics and behavior in React; do not copy generated nesting. |
| Custom Elementor HTML widgets | Most modern interior body layouts, including embedded CSS and occasional JavaScript | High maintenance risk: content and presentation are currently coupled. Extract structured data and clean components page by page. |
| Hello Elementor | Base theme/reset and template frame | No direct Next.js runtime dependency. |
| ElementsKit Lite / Jeg Elementor Kit | Assets load globally; public REST template types exist | No audited interior body feature was found that requires porting these plugins. Verify per page during implementation, then omit their runtime payload. |
| Yoast SEO | Titles, canonicals, schema, sitemap | Preserve metadata/canonicals and later define whether SEO fields come through REST or WPGraphQL. |
| ACF | No fields or public ACF REST payload found | Do not assume ACF-backed content. Recheck authenticated CMS configuration before headless modeling. |
| Posts/CPTs/taxonomies | No published posts; no public domain CPT or custom taxonomy found | News, people, sponsors, testimonials, and programs are currently hardcoded page content even though they are strong future structured-content candidates. |
| Juicer | Live Hope In Action social feed | Dynamic external dependency; define loading/error/privacy fallback before migration completion. |
| YouTube | Homepage link, Testimonials lazy embeds, Care Coach iframe, Live Here story link | Preserve consent/performance/accessibility behavior and video IDs. |
| Hosted WordPress MP4 | Live Here volunteer-day video | Preserve the original file locally or establish a durable media origin before cutover. |
| Typeform | Volunteer, Live Here partnership, and some program/staff application actions | Keep as external flows initially; do not build replacement forms in this milestone. |
| PlanStreet | Needs-assistance public form from Contact and three program pages | Keep external until product/CMS ownership is decided. |
| Kindful/Bloom | Donation actions sitewide | Preserve external donation destinations. |
| Trailer inline form | Trailer donor lead capture | Source form posts to `#`; the approved Next implementation now uses a server-only Server Action and Resend delivery while preserving the five source fields and email-only required contract. |
| Candid/GuideStar | Transparency seal and profile | Preserve badge/link or confirm a current supported embed during implementation. |
| Analytics | Google Analytics and Gauges injected globally | Requires an explicit later analytics/privacy decision; do not silently duplicate WordPress injection code. |

## Asset preservation audit

Already local from the homepage migration:

- Exact self-hosted Noto Serif, Noto Sans, and Heebo variable font files.
- Main/light logos, footer hands overlay, Candid seal, homepage hero/giving imagery, and the four homepage program thumbnails.

Additional interior preservation scope:

- Rendered interior pages reference **84 unique WordPress-hosted `<img>` URLs**.
- Parsing all 14 REST page bodies yields **88 unique image references plus one hosted MP4** after normalizing responsive `-WIDTHxHEIGHT` suffixes.
- Direct filename comparison is intentionally not treated as a download plan: Elementor thumbnails, resized variants, and homepage files renamed during the first migration can represent the same source asset. Hash/source-dimension comparison must precede any download.
- Live Here's exact campaign logo, 29 business logos, video poster, and 90,101,823-byte hosted MP4 were SHA-256 checked against every accepted local image. None was byte-identical to an existing asset, so all 32 source files are preserved under `public/images/campaigns/live-here-love-here/` without conversion, regeneration, recoloring, or recompression.
- Additional unique assets include program logos (SVG), Care Coach media, trailer render/gallery photos, editorial background images, YouTube thumbnails, the Live Here brand logo, and the hosted volunteer-day MP4.
- Preserve originals—not Elementor thumbnail derivatives—where the original is available, while retaining the exact rendered crop through `object-position`, aspect ratio, and responsive CSS.
- Suggested future local organization: `public/images/programs/`, `public/images/people/`, `public/images/partners/`, `public/images/campaigns/`, and `public/media/`. Do not move accepted homepage assets solely for organizational cleanup.

## Migration risks

1. Modern interior pages are mostly large Elementor HTML widgets with page-scoped CSS; careless reuse would either copy Elementor markup or over-generalize distinct layouts.
2. WordPress currently has no structured published posts/CPT data for editorial, people, sponsors, testimonials, or programs. A later headless model will require an explicit content-modeling decision and migration of hardcoded page data.
3. Production's trailer lead form remains nonfunctional; the approved Next route intentionally differs by adding validated, spam-checked Resend delivery. Delivery still depends on correct server-side environment configuration.
4. Juicer is the only live social-feed dependency and can change markup, height, network timing, and content independently of WordPress.
5. Partner/staff directories are image-heavy and mutable; source originals and current outbound links need preservation without duplicate responsive derivatives.
6. Care Coach, Testimonials, and Live Here use three different video patterns: immediate YouTube iframe, click-to-load YouTube iframe, and native hosted MP4.
7. Legacy aliases `/news` and `/terms` must remain redirects; `/trailer-ministry/` is a broken internal destination that needs an explicit redirect when its target route exists.
8. External Typeform, PlanStreet, Kindful, Candid, Juicer, social, and publisher links need availability/privacy/ownership review but should not be replaced without approval.
9. The Terms page uses an older breadcrumb hero and typography system; normalizing it to the modern interior hero would be a redesign.
10. Some production assets use Elementor-generated thumbnail URLs or future-dated upload directories. Originals should be captured before WordPress/staging media changes.

## Exact recommended migration sequence

The order maximizes verified component coverage while postponing service-coupled pages until their dependencies can be handled deliberately.

1. **Affordable Housing — COMPLETE** — established the program family (`ProgramHero`, split intro/application card, story gallery, image CTA, Other Programs) with no video variant.
2. **Housing First — COMPLETE** — validated the family composition while preserving its larger logo, taller application image, route-owned imagery, and different copy lengths.
3. **Homelessness Avoidance — COMPLETE** — completed the static program trio and validated both natural long-title wrap transitions without a route-specific heading implementation.
4. **Care Coach — COMPLETE** — validated the explicit YouTube/media variant without creating a separate page system.
5. **News & Media — COMPLETE** — established the editorial primitives and CMS-ready external press-card data shape.
6. **Testimonials — COMPLETE** — validated the editorial shell and added accessible click-to-load video cards without merging them with press cards.
7. **Contact Us — COMPLETE** — established the link-based contact/action architecture and documented that production has no contact-message form backend.
8. **Board & Staff — COMPLETE** — established the people-directory cards and a future WordPress-managed data shape while mapping the production `/about-us/` source to the approved Next `/board-staff/` route.
9. **Partners & Sponsors — COMPLETE** — established exact-asset sponsor tiles and the flat responsive logo wall without introducing unsupported tiers.
10. **Live Here Love Here Lake — COMPLETE** — established the route-scoped branded tier system and exact native hosted-video contract without changing a shared page family.
11. **We Need Trailers — COMPLETE** — preserved the campaign/process/gallery and added the explicitly approved server-only Resend submission flow without redesigning the source form.
12. **Hope In Action** — integrate or deliberately replace only the Juicer presentation contract after dynamic-loading behavior is agreed.
13. **Terms & Conditions** — migrate the low-risk legacy legal layout without forcing it into modern components.

All four program-family pages and the approved routes through We Need Trailers are complete. Hope In Action has not been started.

## Milestone 3 — Affordable Housing implementation and parity QA

`/affordable-housing/` is implemented in the existing App Router architecture with the accepted `SiteHeader`, `SiteFooter`, global fonts, tokens, focus treatment, and floating donation control. The route preserves the production copy, Kindful donation destination, PlanStreet assistance application, related-program destinations, and exact production media. Seven page assets were hash-checked against the existing local library before being added under `public/images/programs/affordable-housing/`; no matching local original was found and no substitute imagery was used.

The program-family architecture is deliberately composable rather than a single generic page component:

- `ProgramHero` — expected reuse on all four program routes with route-owned image, copy, and crop class.
- `ProgramIntro` — expected reuse on all four routes for the program logo/copy and application-card composition.
- `ProgramStoryGallery` — expected reuse by the three static-gallery programs; Care Coach may add a separate, explicit video/media section rather than overloading this component.
- `ProgramSupportCta` — expected reuse where the measured image-band composition matches, with route-owned background and copy.
- `OtherPrograms` — expected reuse on all four routes with page-owned cross-link data.

The route-aware QA command is `npm run visual:qa -- /affordable-housing/`. It retains the same production/local capture, side-by-side, overlay, amplified pixel-difference, page-height, and section-metric workflow and writes ignored artifacts to `.visual-qa/routes/affordable-housing/`.

| Viewport | Status | Production / local height | Rendered comparison | Remaining difference |
| --- | --- | --- | --- | --- |
| 1440px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 4096 / 4096px | 2.082% amplified changed-pixel rate; section boundaries, columns, typography, image crops, CTA, and footer align. | Localized browser/font antialiasing and the already accepted code-native global icon shapes. |
| 1024px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 4487 / 4487px | 2.870% changed-pixel rate; tablet header, two-column gallery/cards, wrapping, and vertical rhythm align. | Localized antialiasing/global-icon differences only. |
| 768px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 5004 / 5004px | 3.069% changed-pixel rate; stacked intro, gallery, CTA, related cards, and footer align. | Localized antialiasing/global-icon differences only. |
| 390px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 6166 / 6164px | 4.270% changed-pixel rate; mobile header, 18px gutters, heading wraps, media crops, cards, CTA, and footer align. | Two-pixel aggregate page-height difference plus localized antialiasing/global-icon differences. No section-level geometry discrepancy was found. |

Breakpoint-adjacent captures at 1101, 1099, 981, 979, 701, and 699px verified the source transitions around the program section rules. Side-by-side inspection found no broken intermediate layout. The largest aggregate height difference was 2px.

Interaction QA passes for sticky desktop header behavior, Programs dropdown, keyboard focus, single-row desktop navigation at 1440/1181/1025px, mobile navigation open/close, the floating donation control, all route links, both external CTAs, related-program links, and one semantic page-level heading. The page has no unique widget requiring new client-side interaction.

Homepage regression capture reproduces the accepted baseline: 4712/4712px at 1440, 5828/5829px at 1024, 6108/6108px at 768, and 8176/8175px at 390, with the same documented rasterization/icon differences. Homepage interaction checks also pass. No accepted homepage component or global header/footer geometry was changed for this route.

## Milestone 4 — Housing First implementation and parity QA

The rendered source re-audit confirmed that Housing First follows the same five-section order, content ordering, and 1100/980/700px program breakpoints as Affordable Housing. `ProgramHero`, `ProgramIntro`, `ProgramStoryGallery`, `ProgramSupportCta`, and `OtherPrograms` were all reused. Housing First has no unique section or interaction.

The production evidence required only three narrowly scoped variants:

- `ProgramIntro` now accepts optional logo and application-image classes. Housing First uses the source's 165px desktop/140px mobile logo and 350px desktop application-image height; Affordable Housing retains its existing 145/125px logo and 290px image without new route data.
- `ProgramSupportCta` now accepts an optional route-owned background class. Its default remains the accepted Affordable Housing background.
- Housing First supplies route-owned hero and support background classes. No global/header/footer styling changed.

The exact production `housing-first.jpg` already existed locally from the homepage migration and is reused for the hero and application card. The four story images are byte-identical source URLs already preserved for Affordable Housing and are reused without duplicate downloads. Only the exact Housing First SVG logo and distinct support-band image were added under `public/images/programs/housing-first/`.

| Viewport | Status | Production / local height | Rendered comparison | Remaining difference |
| --- | --- | --- | --- | --- |
| 1440px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 3898 / 3898px | 2.125% amplified changed-pixel rate; header, hero, split intro, 350px application crop, gallery, CTA, cards, and footer align. | Localized browser/font antialiasing and the already accepted code-native global icon shapes. |
| 1024px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 4443 / 4443px | 2.847% changed-pixel rate; tablet header, two-column gallery/cards, wrapping, and vertical rhythm align. | Localized antialiasing/global-icon differences only. |
| 768px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 5017 / 5018px | 2.999% changed-pixel rate; stacked intro, source crop, gallery, CTA, related cards, and footer align. | One-pixel aggregate height difference plus localized antialiasing/global-icon differences. |
| 390px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 6170 / 6169px | 4.102% changed-pixel rate; mobile logo sizing, heading wraps, media crops, 18px gutters, cards, CTA, and footer align. | One-pixel aggregate height difference plus localized antialiasing/global-icon differences. |

Breakpoint-adjacent rendered comparisons at 1101, 1099, 981, 979, 701, and 699px pass. Side-by-side inspection found no broken intermediate state; aggregate page-height differences remain between zero and two pixels.

Housing First interaction QA passes for sticky header, Programs dropdown, keyboard focus, non-wrapping desktop navigation at 1440/1181/1025px, mobile navigation open/close, floating donation control, all link destinations, Kindful and PlanStreet CTAs, related-program links, and one semantic page-level heading.

Affordable Housing regression QA reproduces its accepted four-width results: 4096/4096px, 4487/4487px, 5004/5004px, and 6166/6164px. Its complete interaction suite also passes. Homepage regression QA likewise reproduces 4712/4712px, 5828/5829px, 6108/6108px, and 8176/8175px with passing interactions. No accepted page shows a geometry or behavior regression.

Two completed pages now provide strong evidence that the five-section composition and narrow route-owned visual hooks are stable for the three static program pages. The family is not yet fully validated: Homelessness Avoidance must prove long-title wrapping, and Care Coach still has a documented video/media structural variant.

## Milestone 5 — Homelessness Avoidance implementation and parity QA

The rendered source re-audit confirms that Homelessness Avoidance preserves the same five-section order, 540/430px hero heights, 920px hero title measure, gallery geometry, CTA structure, related-program grid, and 1100/980/700px responsive section rules as the two completed static program pages. All five existing primitives—`ProgramHero`, `ProgramIntro`, `ProgramStoryGallery`, `ProgramSupportCta`, and `OtherPrograms`—were reused unchanged. No new component or hero API variant was required.

The production page applies the common hero typography unchanged: Georgia at `clamp(54px, 7vw, 104px)`, `0.92` line height, and `-0.055em` tracking. It contains no manual line break. The title's two natural wrap transitions were measured and added to the QA metrics as DOM line counts:

- 1116px: one line; 1117px: two lines.
- 530px: two lines; 531px: one line.
- Canonical behavior is two lines at 1440px, one line at 1024 and 768px, and two lines at 390px.

Local and production line counts, title heights, font sizes, line heights, and 920px/viewport-constrained title widths match on both sides of each transition. No clipping, overflow, navigation collision, or unintended vertical shift was observed.

The only page-scoped CSS is directly evidenced by production: a 175px desktop/145px mobile program logo, centered desktop application-image crop, and route-owned hero/support backgrounds. The exact application/support image already existed locally as `public/images/homelessness-avoidance.jpg`; the exact hero image is byte-identical to the existing Affordable Housing support asset; and all story images are already shared. Only the deduplicated program-logo SVG was added.

| Viewport | Status | Production / local height | Rendered comparison | Remaining difference |
| --- | --- | --- | --- | --- |
| 1440px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 3981 / 3980px | 2.319% amplified changed-pixel rate; two-line hero, split intro, centered application crop, gallery, CTA, related cards, and footer align. | One-pixel aggregate height difference, localized browser/font antialiasing, and accepted code-native global icon shapes. |
| 1024px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 4509 / 4509px | 2.955% changed-pixel rate; one-line hero title, tablet header, gallery/cards, wrapping, and vertical rhythm align. | Localized antialiasing/global-icon differences only. |
| 768px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 4958 / 4958px | 3.217% changed-pixel rate; one-line title, stacked intro, media, CTA, related cards, and footer align. | Localized antialiasing/global-icon differences only. |
| 390px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 6171 / 6169px | 4.409% changed-pixel rate; two-line title, mobile logo, copy wraps, imagery, cards, CTA, and footer align. | Two-pixel aggregate height difference plus localized antialiasing/global-icon differences. |

Shared-breakpoint captures at 1101, 1099, 981, 979, 701, and 699px pass with zero-to-two-pixel aggregate height differences and no broken intermediate layout. Additional local-vs-production captures at 1116/1117px and 530/531px prove exact title-wrap parity.

Interaction QA passes for sticky header, Programs dropdown, keyboard focus, non-wrapping desktop navigation at 1440/1181/1025px, mobile navigation open/close, floating donation control, every link destination, Kindful and PlanStreet CTAs, related-program links, and one semantic page-level heading.

Regression QA reproduces the accepted measurements for Affordable Housing (4096/4096, 4487/4487, 5004/5004, 6166/6164px), Housing First (3898/3898, 4443/4443, 5017/5018, 6170/6169px), and the homepage (4712/4712, 5828/5829, 6108/6108, 8176/8175px). No accepted page shows a visual regression.

The three static program pages now validate the five-section architecture and generic long-title behavior. The complete four-page family is not yet validated because Care Coach still has a documented embedded-video/media variant.

## Milestone 6 — Care Coach implementation and parity QA

The rendered source re-audit confirms that Care Coach retains the established five-section composition and section order. `ProgramHero` and `ProgramSupportCta` are reused unchanged. `ProgramIntro` received one narrow data variant for the production Typeform application destination, while preserving PlanStreet as the default for the other three routes. `ProgramStoryGallery` received an optional iframe slot inside the existing story-media section plus a route-owned gallery class. `OtherPrograms` received only a route-owned grid class to reproduce Care Coach's three-column-to-one-column transition. No new media framework or separate Care Coach page system was introduced.

Production uses an immediate YouTube iframe at `https://www.youtube.com/embed/SonlnoRUCQg` after the three-image gallery. The local iframe matches the source contract: title `Care Coach Video`, `allowfullscreen`, no autoplay query, no custom `allow`, no `loading` override, no replacement poster, and provider-native controls. It has fixed stable rendered dimensions of 1280×620px at 1440, 976×620px at 1024, 720×420px at 768, and 354×260px at 390. Both sides render the same deterministic initial provider frame for screenshot capture. The control remains keyboard-focusable, plays without unexpected audio in QA, pauses correctly, and does not overflow at mobile widths.

Asset preservation was deduplicated before download. The exact Care Coach hero/application image, SVG logo, and 1000×330 framing image were added under `public/images/programs/care-coach/`. The first gallery image is byte-identical to the accepted Affordable Housing family-support image, and the third gallery/support image is byte-identical to the existing global giving banner, so both are reused rather than duplicated.

| Viewport | Status | Production / local height | Rendered comparison | Remaining difference |
| --- | --- | --- | --- | --- |
| 1440px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 4557 / 4557px | 1.778% amplified changed-pixel rate; hero, split intro, three-column gallery, 1280×620 media, CTA, cards, and footer align. | Localized browser/font antialiasing and accepted code-native global icon shapes. |
| 1024px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 4482 / 4482px | 2.765% changed-pixel rate; tablet header, three-column gallery/cards, 976×620 media, and vertical rhythm align. | Localized antialiasing/global-icon differences only. |
| 768px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 5883 / 5883px | 2.511% changed-pixel rate; stacked intro/gallery/cards, 720×420 media, CTA, and footer align. | Localized antialiasing/global-icon differences only. |
| 390px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 6184 / 6182px | 4.121% changed-pixel rate; mobile copy wraps, imagery, 354×260 media, cards, CTA, and footer align. | Two-pixel aggregate height difference plus localized antialiasing/global-icon differences. |

Breakpoint-adjacent captures at 981/979px and 701/699px reproduce the source transitions: gallery and related cards change from three columns to one below 980px, and the media height changes from 420px to 260px below 700px. No overflow or broken intermediate layout was found.

Interaction QA passes all 17 checks: sticky header, Programs dropdown, keyboard focus treatment, non-wrapping desktop navigation at 1440/1181/1025px, mobile navigation open/close, floating donation control, every route/CTA/related-program destination, semantic page heading, exact YouTube source contract, iframe focus, stable desktop/mobile media geometry, and muted provider play/pause behavior.

Full regression QA reproduces all accepted measurements: Affordable Housing (4096/4096, 4487/4487, 5004/5004, 6166/6164px), Housing First (3898/3898, 4443/4443, 5017/5018, 6170/6169px), Homelessness Avoidance (3981/3980, 4509/4509, 4958/4958, 6171/6169px), and the homepage (4712/4712, 5828/5829, 6108/6108, 8176/8175px). No accepted route shows a geometry regression.

The four-page program family is now fully validated. Care Coach is a narrow media/data/grid variant within the same five-section architecture, not a structurally separate page family. The optional APIs remain composable and preserve unchanged defaults for the three static routes.

## Milestone 7 — News & Media implementation and parity QA

`/news-media/` is implemented in the existing App Router architecture with the accepted `SiteHeader`, `SiteFooter`, floating donation control, and global focus treatment. The rendered source contains four page-body sections in order: editorial hero, split editorial intro, News-specific press-card section, and media-inquiry image CTA. The accepted site footer follows unchanged and remains the single footer implementation for every route.

The composable editorial primitives are:

- `EditorialHero` — shared background-image hero geometry, eyebrow, display title, and description.
- `EditorialIntro` — shared split heading/copy introduction and responsive single-column transition.
- `EditorialHeading` — shared centered eyebrow/title/description treatment used above family-specific media grids.
- `EditorialCta` — shared media-inquiry image CTA with mailto and Kindful actions.
- `NewsGrid`/`NewsCard` — News-specific featured-card and press-card composition backed by route-owned structured data.

Rendered comparison with `/testimonials/` confirms that Testimonials can later reuse the first four primitives. Its thumbnail-to-YouTube interaction and video-card content remain a separate family component; no Testimonials route, video component, or interaction was implemented in this milestone.

No new image was added or substituted. The production hero file `new-home-banner.jpg` is byte-identical to the accepted local `public/images/give-banner.jpg`, and the production CTA file `find-feed-restore-care-coach-header.jpg` is byte-identical to `public/images/programs/care-coach/care-coach.jpg`. Both exact assets are reused. The hero reuse is intentional source behavior across News and Testimonials, so it was preserved rather than replaced. All eleven article titles, dates, publisher labels, descriptions, and external destinations match the rendered WordPress source.

The press entries are currently hardcoded inside the production Elementor HTML rather than WordPress posts, a CPT, or a taxonomy. The local route models them as typed static data for this parity pass; a later CMS milestone should decide whether they become WordPress-managed press items. Runtime dependencies are limited to the eleven external publisher destinations, the `mailto:info@findfeedrestore.com` media inquiry, and Kindful/Bloom. The page has no video, iframe, form, or plugin-driven body interaction.

| Viewport | Status | Production / local height | Rendered comparison | Remaining difference |
| --- | --- | --- | --- | --- |
| 1440px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 4672 / 4672px | 3.081% amplified changed-pixel rate; header, 520px hero, three-line intro heading, featured card, three-column grid, CTA, and footer align. | Localized browser/font antialiasing and accepted code-native global icon shapes. |
| 1024px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 5189 / 5189px | 3.891% changed-pixel rate; tablet header, stacked intro, two-column grid, card wrapping, CTA, and footer align. | Localized antialiasing/global-icon differences only. |
| 768px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 5488 / 5488px | 4.824% changed-pixel rate; tablet header, two-column cards, source typography, and cumulative vertical rhythm align. | Localized antialiasing/global-icon differences only. |
| 390px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 8398 / 8397px | 5.976% changed-pixel rate; mobile hero, single-column intro/cards, full-width buttons, CTA, and footer align. | One-pixel aggregate height difference plus localized antialiasing/global-icon differences. |

Breakpoint-adjacent comparisons pass at 1101/1099px and 701/699px. Production and local both transition from three press columns to two below 1100px, then to one column with mobile spacing and button geometry below 700px. Aggregate page-height differences are one pixel at each adjacent width, with no clipped cards, unexpected wrapping, overflow, or broken intermediate state.

Interaction QA passes all 14 checks: sticky desktop header, Programs dropdown, keyboard focus, non-wrapping desktop navigation at 1440/1181/1025px, mobile navigation open/close, floating donation control, complete link destinations, eleven `_blank`/`noopener` publisher contracts, mailto and Kindful CTA destinations, semantic page heading, and the production `translateY(-8px)` card hover lift. Reduced-motion CSS disables transitions without removing the source layout or content.

Regression QA reproduces the accepted homepage results (4712/4712, 5828/5829, 6108/6108, 8176/8175px) and Care Coach representative program-family results (4557/4557, 4482/4482, 5883/5883, 6184/6182px). Homepage interaction QA also passes. No global component or global runtime style changed, and the accepted header/footer geometry remains intact.

## Milestone 8 — Testimonials implementation and parity QA

`/testimonials/` is implemented as the second editorial/media-family page. It reuses `EditorialHero`, `EditorialIntro`, `EditorialHeading`, `EditorialContainer`, and `EditorialCta` from News & Media. The shared hero background, 980px title measure, split intro, 1480px content container, section-heading typography, media-inquiry CTA, header, and sitewide footer remain the accepted implementations.

The only shared-shell extension is a narrowly scoped optional `contactHref` on `EditorialCta`. Its default remains `mailto:info@findfeedrestore.com`, so News & Media is unchanged; Testimonials supplies the production `/contact-us/` destination. `EditorialContainer` was exposed as the existing 1480px wrapper so the testimonial section reuses rather than duplicates family container geometry.

The testimonial body remains structurally distinct:

- `TestimonialVideos` owns the family-specific featured-video section and three/two/one-column responsive grid.
- `TestimonialVideoCard` owns the 16:9 thumbnail, overlay, play affordance, caption content, and client-side thumbnail-to-iframe replacement.
- News `NewsGrid`/`NewsCard` and testimonial cards do not share a generalized card component.

Production uses three YouTube videos: `69VFG8OXVAs`, `3OEgOEgOsSA`, and `C4Gta9eC0Ho`; the third starts at 95 seconds. Initial rendering contains no iframe. Keyboard or pointer activation replaces only the selected thumbnail in its existing card with `https://www.youtube.com/embed/{id}?autoplay=1&rel=0`, adding `&start=95` where required. The iframe preserves the production provider permission list, native controls, fullscreen permission, and 16:9 dimensions. There is no modal, lightbox, external card link, or separate caption destination.

The three factual production YouTube `hqdefault.jpg` thumbnails were downloaded and hash-checked. They are unique and do not duplicate any accepted local image, so the exact 480×360 files are preserved under `public/images/editorial/testimonials/`. CSS reproduces production's centered `cover` crop into the 16:9 card viewport. The shared hero and CTA reuse the exact already-local production files documented in Milestone 7; no image was generated or substituted.

| Viewport | Status | Production / local height | Rendered comparison | Remaining difference |
| --- | --- | --- | --- | --- |
| 1440px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 3116 / 3115px | 2.638% amplified changed-pixel rate; header, hero, intro, three-card row, 16:9 thumbnails, captions, CTA, and footer align. | One-pixel aggregate height difference, localized antialiasing, and accepted code-native global icon shapes. |
| 1024px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 3460 / 3460px | 3.525% changed-pixel rate; tablet header, stacked intro, two-column video grid, orphan third card, CTA, and footer align. | Localized antialiasing/global-icon differences only. |
| 768px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 3433 / 3434px | 4.138% changed-pixel rate; tablet header, two-column cards, caption wrapping, and cumulative rhythm align. | One-pixel aggregate height difference plus localized antialiasing/global-icon differences. |
| 390px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 4614 / 4613px | 4.956% changed-pixel rate; mobile hero, intro, single-column video cards, CTA, and footer align. | One-pixel aggregate height difference plus localized antialiasing/global-icon differences. |

Breakpoint-adjacent comparisons pass at 1101/1099px and 701/699px. Production and local both transition from three video cards to two below 1100px, then from two to one with mobile section/card geometry below 700px. Aggregate differences remain one to two pixels, with matching thumbnail crops, caption wraps, card gaps, CTA position, and no overflow.

All 18 interaction checks pass: sticky desktop header, Programs dropdown, global keyboard focus, non-wrapping navigation at 1440/1181/1025px, mobile navigation open/close, mobile card containment, floating donation control, card hover lift, exact thumbnail IDs/labels/start offset, keyboard activation, same-card iframe replacement, preserved media dimensions, autoplay/`rel=0` source contract, provider permissions/fullscreen, provider play/pause, CTA destinations, and one semantic page heading. Reduced-motion mode removes transitions while retaining accessible controls and content.

News & Media regression reproduces its accepted results exactly: 4672/4672, 5189/5189, 5488/5488, and 8398/8397px, with all 14 News interactions passing and its default mailto CTA unchanged. Homepage regression also reproduces 4712/4712, 5828/5829, 6108/6108, and 8176/8175px. No global component, accepted header/footer geometry, or other accepted route changed.

The editorial/media family is now validated at the shared-shell level. Hero, intro, heading, container, and CTA are genuinely shared; the press-card grid and click-to-load testimonial video grid remain intentional page-specific compositions. A single generic editorial-page or media-card template is neither necessary nor supported by the production evidence.

## Milestone 9 — Contact Us implementation and parity QA

`/contact-us/` is implemented in the existing App Router architecture with the accepted `SiteHeader`, `SiteFooter`, floating donation control, and global focus treatment. Its five source sections are preserved in order: Contact hero, contact-details/application split, Ways to Connect cards, impact gallery, and closing housing-support CTA.

The production backend audit found **no contact form**. The rendered page and its WordPress REST HTML contain no `<form>`, `<input>`, `<textarea>`, `<select>`, submit control, map iframe, validation messages, success/error state, spam protection, form action, or form-provider widget. The source comment `CONTACT INTRO + FORM` and unused `.ffr-contact-form-*` CSS do not represent rendered functionality; the right column is a static application card linking to PlanStreet. Therefore, the local page deliberately contains no invented submission backend, server action, email delivery, database, CRM, CAPTCHA, or success claim.

The exact production action contract is:

- `tel:18662362983` for `(866) 236-2983`.
- `mailto:info@findfeedrestore.com` for the published email address.
- PlanStreet `https://app.planstreetinc.com/findfeedrestore/PublicForm` for family assistance, preserving the same-tab source behavior.
- Typeform `https://greatthings.typeform.com/to/V1SK6LFX` for volunteering, opening with `_blank`/`noopener`.
- Kindful/Bloom `https://findfeedrestore-bloom.kindful.com/` for donation, opening with `_blank`/`noopener`.
- `/live-here-love-here-lake/` for corporate partnership.

The source-supported contact primitives are `ContactHero`, `ContactDetails`, its small `AssistanceCard`, `ContactWays`, `ContactGallery`, and `ContactCta`. They are composable section components rather than a generalized forms framework. Phone and email use semantic, keyboard-focusable anchors; decorative symbol glyphs are hidden from assistive technology; gallery backgrounds expose concise image labels. There are no field labels, required states, or validation semantics to migrate because no production controls exist.

Asset handling was hash-based. The exact hero is already local as `public/images/programs/affordable-housing/hero.jpg`; the application photograph is byte-identical to `public/images/programs/affordable-housing/support-family.jpg`; and the Care Coach gallery tile/CTA is byte-identical to `public/images/programs/care-coach/care-coach.jpg`. These are reused without duplicate files. Four unique factual gallery photographs were preserved under `public/images/contact/`. No image was generated or substituted; production's repeated hero/application/CTA imagery is preserved because those are documentary/source-defining placements rather than redundant downloads.

| Viewport | Status | Production / local height | Rendered comparison | Remaining difference |
| --- | --- | --- | --- | --- |
| 1440px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 4477 / 4477px | 1.823% amplified changed-pixel rate; header, 520px hero, contact split, application crop, three cards, gallery mosaic, CTA, and footer align. | Localized browser/font antialiasing and accepted code-native global icon shapes. |
| 1024px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 5554 / 5554px | 2.157% changed-pixel rate; tablet header, stacked details/card/actions, two-column gallery, CTA, and footer align. | Localized antialiasing/global-icon differences only. |
| 768px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 5594 / 5594px | 2.516% changed-pixel rate; tablet header, stacked content, gallery crops, factual links, CTA, and footer align. | Localized antialiasing/global-icon differences only. |
| 390px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 6810 / 6809px | 3.508% changed-pixel rate; mobile hero, contact rows, application card, single-column actions/gallery, CTA, and footer align. | One-pixel aggregate height difference plus localized antialiasing/global-icon differences. |

Breakpoint-adjacent comparisons pass at 1101/1099px and 701/699px. Production and local both change the contact split/action cards and gallery mosaic at 1100px, then adopt mobile heading, padding, contact-row, card, gallery, and full-width-button geometry below 700px. Aggregate differences remain one to two pixels with no clipped email address, card, gallery tile, CTA, or horizontal overflow.

All 16 applicable interaction checks pass: sticky header, Programs dropdown, keyboard focus, non-wrapping desktop navigation at 1440/1181/1025px, action-card hover lift, mobile navigation open/close, mobile section containment, floating donation control, complete link destinations, no-form/no-map contract, focusable phone/email links, exact PlanStreet/Typeform/Kindful/internal-link contracts, and one semantic page heading. Required-field validation, submission, success, failure, and spam checks are correctly marked not applicable; no message delivery was attempted or claimed.

Regression QA reproduces the accepted homepage results (4712/4712, 5828/5829, 6108/6108, 8176/8175px), News & Media results (4672/4672, 5189/5189, 5488/5488, 8398/8397px), and Testimonials results (3116/3115, 3460/3460, 3433/3434, 4614/4613px). No accepted route, shared component, global style, header, or footer changed.

## Milestone 10 — Board & Staff implementation and parity QA

`/board-staff/` is implemented in the existing App Router architecture with the accepted `SiteHeader`, `SiteFooter`, floating donation control, and global focus treatment. WordPress canonically serves this content at `/about-us/`; production `/board-staff/` returns 404. The approved Next route is `/board-staff/`, so the route-aware visual utility now accepts `VISUAL_QA_PRODUCTION_ROUTE=/about-us/` to compare the correct rendered source without falsifying the production URL. The local header and footer Board & Staff destinations now point to the implemented Next route; their geometry and styling are unchanged.

The people architecture is intentionally small and composable:

- `PeopleHero` preserves the production Care Coach image hero, overlay, 390px desktop/340px mobile geometry, eyebrow, title, and intro.
- `PersonCard` is shared because founders, staff, and board members use the same portrait/content shell. Layout containers own the narrow production variants instead of a condition-heavy card API.
- `StaffSection` owns the centered two-founder row followed by the four-person staff grid.
- `BoardSection` owns the separate board background, five/three/one-column grid, and optional organization line.
- `PeopleCta` preserves the production support/volunteer CTA and reuses the accepted sitewide footer after it.

Staff and board cards are not completely identical in content. Founders use 260px desktop cards, larger name/role type, and a centered row that stacks below 900px. Staff uses fixed 240px cards in four, two, then one column. Board uses the common 240px card in five, three, then one column and may add a red uppercase organization line; emeritus members have no organization line. Production cards are static, with no profile, biography, email, social, modal, or card-link behavior, so none was invented.

All 17 exact production portrait thumbnails were preserved under `public/images/people/` with their original 200×300 files, `unoptimized` image delivery, top-center focal treatment, and factual name alt text. The exact 768×576 production hero was also preserved. Hash-based deduplication found that the production `new-home-banner.jpg` CTA is byte-identical to accepted `public/images/give-banner.jpg`, so the existing asset is reused rather than duplicated. No portrait was substituted, generated, recompressed, or silently reassigned.

| Viewport | Status | Production / local height | Rendered comparison | Remaining difference |
| --- | --- | --- | --- | --- |
| 1440px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 4601 / 4601px | 1.505% amplified changed-pixel rate; 126px header, hero, founders, four-person staff row, five-column board grid, portrait crops, CTA, and footer align. | Localized browser/font antialiasing and accepted code-native global icon shapes. |
| 1024px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 5460 / 5460px | 2.010% changed-pixel rate; tablet header, two-column staff, three-column board, title wrapping, CTA, and footer align. | Localized antialiasing/global-icon differences only. |
| 768px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 5485 / 5485px | 2.220% changed-pixel rate; tablet header, stacked founders, two-column staff, three-column board, exact crops, and cumulative rhythm align. | Localized antialiasing/global-icon differences only. |
| 390px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 9198 / 9197px | 2.208% changed-pixel rate; mobile hero/title, 17 single-column cards, copy wrapping, CTA, and footer align. | One-pixel aggregate height difference plus localized antialiasing/global-icon differences. |

Breakpoint-adjacent comparison passes at 1101/1100px, 901/900px, and 701/700px, matching the source's three distinct grid transitions. The 1100px boundary changes staff from four to two columns and board from five to three; 900px stacks founders; 700px changes staff and board to one column and applies the 260px mobile portrait crop. The source's later 900px Elementor style block intentionally overrides its earlier 700px founder gap, and the local cascade mirrors that order. No intermediate clipping, overflow, card collision, or unintended name/title wrap was found. At 900px all page-body section geometry is exact; the small aggregate height difference is confined to the accepted responsive footer baseline.

All 15 applicable interaction/accessibility checks pass: sticky header, Programs dropdown, visible keyboard focus, non-wrapping desktop navigation at 1440/1181/1025px, static person-card behavior, 17-card mobile containment, mobile menu open/close, floating donation control, complete link destinations, 17 factual portraits with non-empty alt text, no invented profile links, exact Kindful/Typeform CTA destinations, and semantic page/section headings.

Regression QA reproduces the accepted homepage results (4712/4712, 5828/5829, 6108/6108, 8176/8175px) and Contact Us results (4477/4477, 5554/5554, 5594/5594, 6810/6809px). Only the Board & Staff header/footer destination changed from the unmigrated WordPress path to the completed Next route; no accepted visual measurement, global style, header geometry, or footer geometry regressed.

## Milestone 11 — Partners & Sponsors implementation and parity QA

`/sponsors/` is implemented in the existing App Router architecture with the accepted `SiteHeader`, `SiteFooter`, floating donation control, and global focus treatment. The production page has exactly three page-body sections: a large image hero with one Kindful CTA, a split purpose introduction, and one flat 18-logo sponsor wall. There are no sponsor tiers, categories, filtering controls, CMS feed, closing CTA band, or page-specific form. The sponsor wall flows through its white bottom spacing directly into the universal footer.

The route introduces only the source-supported sponsor primitives:

- `SponsorsHero` preserves the 660px minimum hero, source overlay/fade, title measure, copy, and support action.
- `SponsorsIntro` preserves the two-column purpose/copy composition and its 1100px single-column transition.
- `SponsorTile` owns one identity-critical logo link, intrinsic image dimensions, grayscale/opacity rest state, color/scale hover state, and accessible label.
- `SponsorWall` owns the centered section heading and five/four/three/two/one-column responsive grid.
- `SponsorsPageBody` preserves Elementor's visible 10px outer inset above, beside, and below the page body rather than normalizing it away.

All 18 exact production logo files were downloaded and SHA-256 compared against each other and every accepted local asset. They are unique. The original 15 PNG, two JPEG, and one WebP files are preserved byte-for-byte under `public/images/sponsors/`, retaining source transparency, intrinsic dimensions, and aspect ratios. Images use `unoptimized` local delivery and `object-fit: contain`; none was converted, cropped, recolored, redrawn, recompressed, generated, or substituted. The hero's production `new-home-banner.jpg` is byte-identical to accepted `public/images/give-banner.jpg`, so it is reused without a duplicate download.

| Viewport | Status | Production / local height | Rendered comparison | Remaining difference |
| --- | --- | --- | --- | --- |
| 1440px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 3167 / 3166px | 2.248% amplified changed-pixel rate; 5-column grid, 210px tiles, intrinsic logo scale/whitespace, hero, intro, and footer align. | One-pixel aggregate height difference, localized browser/font antialiasing, and accepted code-native global icon shapes. |
| 1024px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 3641 / 3642px | 3.042% changed-pixel rate; tablet header, source three-line hero wrap, stacked intro, 3-column wall, logos, and footer align. | One-pixel aggregate height difference plus localized antialiasing/global-icon differences. |
| 768px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 3708 / 3708px | 3.394% changed-pixel rate; mobile typography/padding threshold, 2-column 170px tiles, 82px logo cap, and footer align. | Localized antialiasing/global-icon differences only. |
| 390px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 5993 / 5992px | 3.733% changed-pixel rate; single-column 155px tiles, exact logo whitespace, full-width hero button, section spacing, and footer align. | One-pixel aggregate height difference plus localized antialiasing/global-icon differences. |

Breakpoint-adjacent comparisons pass at 1281/1280px, 1101/1100px, 769/768px, and 521/520px. Production and local both transition from five to four columns at 1280px, four to three at 1100px, three to two at 768px, and two to one at 520px. Aggregate page-height variance remains 0–2px at every boundary. No tile collision, row misalignment, logo distortion, altered crop, unexpected wrap, or horizontal overflow appears between canonical widths.

All 15 applicable interaction/accessibility checks pass: sticky header, Programs dropdown, visible keyboard focus, non-wrapping desktop navigation at 1440/1181/1025px, sponsor-tile 8px hover lift, grayscale-to-color/opacity/scale transition, explicit tile focus outline, 18-card mobile containment, mobile navigation open/close, floating donation control, complete link destinations, all 18 external `_blank`/`noopener` sponsor contracts, matching `Visit …` labels and non-empty logo alt text, Kindful CTA destination, and one semantic page heading. Reduced-motion mode removes transitions while preserving the source's final hover presentation and layout.

Regression QA reproduces the accepted homepage results (4712/4712, 5828/5829, 6108/6108, 8176/8175px) and Board & Staff results (4601/4601, 5460/5460, 5485/5485, 9198/9197px). No global component, shared style, accepted route, header geometry, or footer geometry changed.

## Visual QA requirement for implementation milestones

For every migrated route, extend the existing repository Playwright/system-Chrome workflow carefully rather than creating per-page scripts. Compare production and local at 1440, 1024, 768, and 390px, plus widths adjacent to the accepted 1024/767 header transitions. Generated artifacts must stay under `.visual-qa/`; the accepted homepage screenshots and interaction results remain the regression baseline.

## Milestone 12 — Live Here Love Here Lake implementation and parity QA

`/live-here-love-here-lake/` is implemented as a bespoke, route-scoped campaign composition. It reuses the accepted `SiteHeader`, `SiteFooter`, global focus treatment, and floating donation control without changing their geometry or styling. It does not reuse or modify the program, editorial, people, or Sponsors page systems.

The source-supported campaign primitives are:

- `LiveHereHero`, which preserves the production campaign mark, gray-blue gradient field, bottom fade, serif title, two-action layout, and shimmer/play treatment. Production literally references the invalid placeholder `PASTE-YOUR-HERO-IMAGE-URL-HERE`; the local route intentionally preserves the rendered gradient field instead of inventing a background photograph.
- `LiveHereImpact`, which owns the $.55 red band, benefit heading/action, and three heart-icon benefit cards.
- `LiveHereSponsors` and its local `SponsorLogo`, which own three materially different tiers: four Business Leaders, five Business Partners, and twenty Business Members. The source's two non-linked tiles remain static; the other 27 retain their exact external destinations and `_blank`/`noopener` contract.
- `LiveHereStory`, which owns the legacy 1140px two-column close and its 767px stacking behavior.
- `LiveHereStoryVideo`, a small client component preserving the production poster-gated native-video interaction. The semantic video retains `controls`, `preload="metadata"`, `controlsList="nodownload"`, no autoplay, no mute, no loop, and no synthetic media provider.

Campaign-only colors, typography, gradients, tiers, card geometry, logo treatments, and breakpoint rules remain in `live-here-sections.module.css`. None was promoted into global tokens. Production transitions are preserved at 1024px for tier grids, 900px for benefit stacking, 767px for hero/story stacking, and 640px for single-column sponsor tiers.

All factual assets are exact production files. SHA-256 comparison found no byte-identical accepted local asset. The preserved set contains one campaign mark, 29 tier logos, one 1000×584 poster, and the exact 90,101,823-byte hosted MP4 (`SHA-256 8dd0c506c5dd9b7d5cd3178dbf3bccb7ce0b8a3b4f009e4ec0858143bc5be2a3`). No asset was generated, redrawn, recolored, cropped, substituted, or recompressed.

Rendered comparison exercised production and local at all four canonical widths and every campaign transition. It verified header, hero, impact, tier, logo-card, story/video, and footer geometry. Source/local Noto Sans files have slightly different wrapping metrics in the legacy story and at the wide-mobile hero/benefit boundary; narrowly scoped letter-spacing values reproduce the measured source line breaks without changing global typography.

| Viewport | Status | Production / local height | Rendered comparison | Remaining difference |
| --- | --- | --- | --- | --- |
| 1440px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 6686 / 6685px | 2.017% amplified changed-pixel rate; header, full campaign composition, four-column Leaders/Members grids, story/video, and footer align. | One-pixel aggregate height difference, localized antialiasing, and accepted code-native global icons. |
| 1024px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 8364 / 8364px | 2.312% changed-pixel rate; tablet header, two-column tiers, content wrapping, media, and footer align. | Localized antialiasing/global-icon differences only. |
| 768px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 8896 / 8896px | 2.867% changed-pixel rate; tablet header, stacked benefits, two-column tiers, story geometry, and footer align. | Localized antialiasing/global-icon differences only. |
| 390px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | 12460 / 12458px | 3.462% changed-pixel rate; mobile logo/title/actions, single-column benefits and 29-logo directory, story/video, and footer align. | Two-pixel aggregate height difference plus localized antialiasing/global-icon differences. |

Breakpoint-adjacent comparison passes at 1025/1023px, 901/900px, 767px, and 641/640px. The campaign body changes at the exact production transitions: four-to-two tier columns at 1024px, three-to-one benefits at 900px, mobile hero/story stacking at 767px, and two-to-one tier columns at 640px. At 641 and 640px the full-page variance is one pixel. At 900px the campaign body varies by at most two pixels; the remaining 12px aggregate variance is confined to the accepted shared footer's intermediate-width wrapping and was not used to justify a global change.

All 17 campaign interaction/accessibility checks pass: sticky header, Programs dropdown, visible focus, non-wrapping desktop navigation at 1440/1181/1025px, logo-card hover/focus, 29-card mobile containment, mobile menu open/close, floating donation control, complete link destinations, 27 external sponsor contracts plus two static tiles, Typeform/YouTube CTA contracts, semantic page heading, exact hosted-video source/dimensions/controls, poster keyboard activation, play, and pause. The video does not autoplay, mute, loop, or add an unverified provider.

Homepage regression reproduces the accepted 4712/4712, 5828/5829, 6108/6108, and 8176/8175px results, with all 11 interactions passing. Sponsors regression reproduces 3167/3166, 3641/3642, 3708/3708, and 5993/5992px, with all 15 interactions passing. No shared component, global stylesheet, accepted header/footer implementation, or accepted route changed during Milestone 12.

## Milestone 13 — We Need Trailers implementation and Resend form QA

`/we-need-trailers/` is implemented as a page-specific campaign composition using the accepted `SiteHeader`, `SiteFooter`, global focus treatment, and floating donation control. It preserves the production hero, fact pills, split introduction/impact card, three-step process, trailer/form split, three-image gallery, final CTA, source breakpoints, and all factual copy. The broken legacy `/trailer-ministry/` destination now permanently redirects to the implemented route. No Hope In Action work was started.

The production form contract is preserved exactly: `name`, `phone`, `email`, `trailer_type`, and `message`, with only `email` required. Visually hidden semantic labels add accessible names without changing the default field geometry. The client form in `src/components/trailer-form.tsx` uses React `useActionState` for idle, submitting, success, and error states; disables the submit control while pending; uses an immediate client lock to reject duplicate submit events; resets only after success; and exposes a polite live status region. Provider details, stack traces, and raw errors never enter the returned state.

`src/app/we-need-trailers/actions.ts` is the server-only Next.js Server Action boundary. It passes untrusted `FormData` into `src/lib/trailer-submission.ts`, which trims text, lowercases email, normalizes message line endings, rejects non-string/malformed fields and control characters, validates email syntax, constrains trailer type to the three source options, and enforces maximum lengths of 100 characters for name, 40 for phone, 254 for email, and 2,000 for message. The action also rejects a populated hidden honeypot and submissions completed in under 1.5 seconds or more than 24 hours after the form timestamp.

After validation, the server posts to Resend. `CONTACT_FROM_EMAIL` supplies the authenticated sender under the display name `Find Feed Restore Website`; `CONTACT_TO_EMAIL` supplies the destination; and the visitor's validated email is mapped to `reply_to`, never `from`. `RESEND_API_KEY` is used only in the server request authorization header. The message subject is `New Trailer Ministry Website Submission`. Both escaped HTML and plain-text bodies include every form field, the UTC submission timestamp, and `/we-need-trailers/` as the originating page. These three environment-variable names are the complete delivery configuration; their values are not logged, rendered, documented, or committed.

The delivery helper accepts an injected fetch/delivery seam. Ten Node integration checks cover required email, malformed email, allowed trailer types, maximum lengths, honeypot/timing rejection, normalization, successful server delivery, duplicate locking, configured From/To and visitor Reply-To mapping, HTML/plain-text content, Resend request construction, safe provider failure, and absence of `NEXT_PUBLIC_` configuration. Routine QA makes no real provider call. The local runtime had none of the three delivery variables configured, so the controlled real-delivery test was **not performed**; the actual local submission instead verified the intended generic error state and safe server diagnostic. Production/server configuration was not read or changed.

Three unique production assets were SHA-256 verified and preserved byte-for-byte under `public/images/campaigns/we-need-trailers/`: the 900×600 transparent trailer render, 768×1025 family image, and 768×576 community image. The 2048×1536 campaign hero/gallery image is byte-identical to accepted `public/images/programs/care-coach/care-coach.jpg` and is reused without duplication. No asset was generated, substituted, converted, or recompressed.

| Viewport | Status | Production / local height | Rendered comparison | Remaining difference |
| --- | --- | --- | --- | --- |
| 1440px | **PASS WITH DOCUMENTED FUNCTIONAL DIFFERENCE** | 5123 / 5251px | Hero, split intro, three process cards, two-column trailer/form composition, exact 58px fields/150px textarea/50px button, gallery row, CTA, and footer transition align. | The functional status line replaces production's obsolete implementation note; source/local shell rasterization and cumulative section whitespace produce the documented 128px aggregate difference. |
| 1024px | **PASS WITH DOCUMENTED FUNCTIONAL DIFFERENCE** | 7059 / 7019px | Tablet header, stacked intro, two-column process grid, stacked trailer/form composition, single-column gallery, CTA, and footer align. | Forty-pixel aggregate variance plus the intentional form-note replacement and localized rasterization. |
| 768px | **PASS WITH DOCUMENTED FUNCTIONAL DIFFERENCE** | 7017 / 7099px | Tablet header, source heading weights/fonts, two-column process grid, stacked form/media, field geometry, gallery crops, CTA, and footer align. | Eighty-two-pixel aggregate variance plus the intentional form-note replacement and localized rasterization. |
| 390px | **PASS WITH DOCUMENTED FUNCTIONAL DIFFERENCE** | 7936 / 7863px | Mobile hero actions/fact pills, single-column content/cards, trailer render/callout, full-width fields/button, gallery, CTA, and footer align without overflow. | Seventy-three-pixel aggregate variance plus the intentional form-note replacement and accepted mobile shell/rasterization differences. |

Breakpoint-adjacent captures pass at 1101/1100px and 701/700px. Production and local both change the intro, process, form, and gallery compositions at the exact source thresholds. The dedicated form harness additionally compares every input, select, textarea, and submit control against production at 1440, 1024, 768, and 390px; all four geometry checks pass within a two-pixel height and sixteen-pixel width tolerance.

Route interaction QA passes all 10 shared-shell checks. Dedicated form QA passes all 12 checks: source field/required contract, labels/live region, hidden spam controls, invalid and missing email behavior, keyboard order, observed disabled/submitting state, safe unconfigured error state, stable success/error/submitting layouts, and all four production/local geometry comparisons. State previews remain within 20px of the default page height and preserve keyboard/focus behavior. Automated checks and visual QA did not send email.

Regression QA reproduces the accepted homepage results exactly (4712/4712, 5828/5829, 6108/6108, 8176/8175px) with all 11 interactions passing. Live Here Love Here Lake reproduces 6686/6685, 8364/8364, 8896/8896, and 12460/12458px with all 17 interactions passing. The only shared-tool change makes `scripts/interaction-qa.mjs` tolerate pages that do not reach network-idle within ten seconds after DOM readiness; it does not change application output. No accepted route or shared component changed.

## Milestone 14 — Hope In Action and Juicer feed QA

`/hope-in-action/` is implemented as a route-scoped social-feed page using the accepted `SiteHeader`, `SiteFooter`, global focus treatment, and floating donation control. It preserves the production image hero, source copy, four social-profile controls, 1480px feed section, elevated feed wrapper, final Kindful/Typeform CTA, shared campaign image crops, and responsive page spacing. Production's `new-home-banner.jpg` is byte-identical to accepted `public/images/give-banner.jpg`, so the local route reuses that file. No changing Juicer post image or video was copied into the repository, and no asset was generated or substituted.

Production uses Juicer's standard public client embed, not an iframe, WordPress shortcode renderer, private API client, or locally owned card presentation. The exact page contract is `<ul class="juicer-feed" data-feed-id="findfeedrestore">` plus `https://www.juicer.io/embed/findfeedrestore/embed-code.js`; the loader identifies the public provider feed internally as ID `454635`. It injects the current Juicer 2.0 stylesheet/runtime, fetches `/api/feeds/findfeedrestore.html`, supplies all card/media/caption markup, dispatches lifecycle DOM events, posts its own page-view signal, and owns Load More, modal/external-post, media, and responsive-grid behavior. No provider credential is present or required.

`src/components/hope-social-feed.tsx` is the provider adapter boundary used by `HopePageBody`. The client-only adapter loads the route-specific embed through Next.js `Script` with `lazyOnload`, gives Juicer one feed node, listens for the documented `juicer:feedLoaded` lifecycle event, and uses Juicer's `initialize`/`remove` hooks for App Router remount cleanup. Next.js deduplicates the loader by stable ID/source; the adapter reinitializes only when a newly mounted feed is unclaimed. A provider script error or a feed that does not become ready within twelve seconds exposes a polite status and direct Instagram fallback while leaving the hero, CTA, navigation, and footer intact. The initial page render is not blocked by the feed.

Juicer's returned feed HTML contains container-query transitions at 640, 900, and 1100px. With the production page wrapper these occur at 758, 1018, and 1218px viewport widths and produce one, two, three, and four columns respectively. Adjacent-width automation verifies 757/758, 1017/1018, and 1217/1218px. Juicer cards retain a 12px grid gap, contained provider media, captions, profile metadata, Load More, and external Instagram `Read More` links with `_blank` plus `noopener noreferrer`.

Live content is treated separately from static layout during visual QA. Production and local captures use the current public feed, but changing post order, media, captions, media availability, or resulting card height is not a static fidelity defect. Hero geometry, copy, section boundaries, wrapper width/padding/background, CTA, and footer transition are static targets. The captured 1440, 1024, and 768px static geometry is exact; at 390px the live-card stack creates only a documented 14px cumulative variance across a roughly 13,000px page.

| Viewport | Status | Production / local height | Rendered comparison | Remaining difference |
| --- | --- | --- | --- | --- |
| 1440px | **PASS WITH DYNAMIC-CONTENT TREATMENT** | 4917 / 4916px | Exact hero and heading geometry, 4-column feed, wrapper, CTA at the same boundary, and exact footer position. | One-pixel aggregate difference plus provider/live-media rasterization and accepted global icon differences. |
| 1024px | **PASS WITH DYNAMIC-CONTENT TREATMENT** | 6147 / 6147px | Exact tablet header, hero, 3-column feed geometry, CTA, and footer position. | Provider/live-media rasterization and accepted global icon differences only. |
| 768px | **PASS WITH DYNAMIC-CONTENT TREATMENT** | 7455 / 7455px | Exact tablet header, 2-column feed geometry, section rhythm, CTA, and footer position. | Provider/live-media rasterization and accepted global icon differences only. |
| 390px | **PASS WITH DYNAMIC-CONTENT TREATMENT** | 12994 / 12979px | Exact mobile hero/title, 1-column feed, wrapper width, CTA geometry, and footer structure with no overflow. | Fourteen-pixel cumulative live-card variance plus changing provider media/text rasterization. |

Dedicated `scripts/hope-feed-qa.mjs` automation passes all eight feed checks: one outer feed node, one loader and one runtime, loaded/claimed state, Load More, secure external post link and focus, media containment, all three exact container-query transitions, no 390px overflow, App Router away/back remount without duplicate initialization, and graceful behavior when the Juicer loader is network-blocked. The established route interaction suite passes all ten applicable sticky-header, dropdown, focus, desktop-navigation, mobile-menu, floating-donation, and destination checks. The generic destination check now recognizes Juicer's JavaScript-controlled `#` primary-card modal trigger instead of misclassifying it as an empty application link.

Regression QA reproduces the accepted homepage results (4712/4712, 5828/5829, 6108/6108, 8176/8175px) with all 11 interactions passing. News & Media reproduces 4672/4672, 5189/5189, 5488/5488, and 8398/8397px with all 14 interactions passing. No accepted component, global stylesheet, header/footer implementation, or accepted route changed. A future provider milestone may replace the adapter internals with the existing Juicer API plus native React presentation, or with authorized direct social-platform APIs; neither replacement is part of this fidelity migration.

## Milestone 15 — Terms & Conditions implementation and canonical QA

Production declares `https://www.findfeedrestore.com/terms-conditions/` as the WordPress canonical URL. The published WordPress page is ID 1941 with slug `terms-conditions`; `/terms` and `/terms/` are legacy aliases, while `/terms-conditions` normalizes to the canonical slash form in production. Similar-looking `/terms-and-conditions/` and `/termsconditions/` URLs return 404 and are not aliases. Next.js implements the legal page at `/terms-conditions/`, emits that production canonical in metadata, and permanently redirects `/terms` to `/terms-conditions`. The accepted footer link now points directly to `/terms-conditions/`, leaving no internal link to the alias and only one indexable legal route. Next.js may first normalize a slash-suffixed alias before applying the configured redirect, but QA confirms no loop and a final 200 canonical response. At launch, the hosting layer must retain the canonical host/HTTPS and slash normalization already represented by production; no additional content route is required.

The route uses the accepted global header, footer, focus treatment, and floating donation control with a deliberately small legal-page implementation: `src/app/terms-conditions/page.tsx`, `src/components/legal-sections.tsx`, and its route-scoped CSS module. The title hero, non-interactive breadcrumb labels, heading levels, paragraphs, unordered lists, punctuation, capitalization, source order, and plain-text contact email match the rendered production legal document exactly. No link or interaction was invented inside the legal copy. The preserved 2048×931 production hero is `public/images/legal/terms-hero.jpg` (SHA-256 `9b64ef7eda999ccf38d57d850a1f2434b4c344523217376422c230490fecddc8`); it was unique among local assets and was not generated or substituted.

Long-form visual QA checks typography metrics, text wrapping, list indentation, heading/paragraph spacing, container width, hero crop, cumulative page height, and footer start position. Adjacent-width captures at 1025/1023/767px confirm production's tablet and mobile layout transitions.

| Viewport | Status | Production / local height | Rendered comparison | Remaining difference |
| --- | --- | --- | --- | --- |
| 1440px | **PASS** | 2474 / 2474px | Matching desktop hero, 1140px legal container, wrapping, list geometry, section rhythm, and footer boundary. | Mean absolute pixel difference 1.813; font/icon antialiasing only. |
| 1024px | **PASS** | 2496 / 2496px | Matching tablet header, hero, content margins, wrapping, and footer boundary. | Mean absolute pixel difference 4.106; accepted local font/icon rasterization. |
| 768px | **PASS** | 2562 / 2562px | Matching tablet-to-mobile structure, legal width, wrapping, and footer boundary. | Mean absolute pixel difference 4.215; accepted local font/icon rasterization. |
| 390px | **PASS** | 3415 / 3414px | Matching mobile hero, 14/21px body typography, list wrapping, section spacing, footer structure, and no overflow. | One-pixel cumulative difference; mean absolute pixel difference 5.523. |

Dedicated `scripts/terms-qa.mjs` automation passes all seven legal/canonical checks: canonical route 200, one production canonical declaration, valid H1/H2 hierarchy, exact source copy and order, zero invented legal-content links, one direct canonical footer link with zero legacy internal links, alias redirect completion without a loop, and no 390px horizontal overflow. The established route interaction suite passes all ten applicable sticky-header, desktop-navigation, keyboard-focus, mobile-menu, floating-donation, and link-destination checks.

Regression QA reproduces the accepted homepage page heights at 1440/1024/768/390px (4712/4712, 5828/5829, 6108/6108, and 8176/8175px) with all 11 interactions passing; current dynamic hero/media rasterization accounts for the larger 1440px pixel variance. Contact Us reproduces 4477/4477, 5554/5554, 5594/5594, and 6810/6809px with all 16 interactions passing. The only accepted shared-component change is the nonvisual footer URL correction from the legacy alias to the canonical Terms route.

## Milestone 16 — Full-site certification and launch readiness

All 14 canonical routes pass the repository-local crawl, four-width visual certification, route interaction suite, canonical/title/noindex checks, internal-link audit, accessibility smoke audit, local-asset audit, and 404 verification. Dedicated Resend/form, Juicer, media, and legal checks pass. The complete evidence, per-route matrix, redirect matrix, dependency inventory, asset/build notes, certification fixes, and categorized launch items are maintained in `docs/FULL_SITE_CERTIFICATION.md`.

Certification added the inventory-required permanent `/news` → `/news-media` redirect and the production people-route `/about-us` → `/board-staff` cutover redirect, corrected internal links that unnecessarily used aliases/path-normalization hops, secured the footer LinkedIn destination, and removed a local-only shared-header overflow between 1181 and 1230px. Production's intermediate Board & Staff fixed-grid clipping is documented without redesigning the accepted route.

The migration implementation phase is **COMPLETE**. Production cutover is **BLOCKED** until one controlled, clearly labeled Vercel Preview trailer submission is received and its visitor-email Reply-To behavior is verified. The 90,101,823-byte hosted MP4 and intermediate Board & Staff clipping are classified as should-fix items rather than build blockers. No deployment, DNS, production WordPress, or CMS change occurred during certification.
