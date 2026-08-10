# Site Migration Matrix

Inventory date: 2026-08-10

Production source: <https://www.findfeedrestore.com/>

Scope: Milestone 2 discovery plus Milestone 3 implementation of the representative Affordable Housing program page. No other interior route has been migrated.

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
| `/housing-first/` | Housing First | WordPress page; program detail | Header Programs; footer Our Programs; homepage program cards | Program detail | Same family structure as Affordable Housing | Program hero, split intro/logo, application card, story gallery, image CTA, Other Programs cards | External needs-assistance application; no local form | Primarily HTML plus global widgets | PlanStreet public form, Kindful; card/button hover | Medium | **READY** |
| `/homelessness-avoidance/` | Homelessness Avoidance | WordPress page; program detail | Header Programs; footer Our Programs; homepage program cards | Program detail | Same family structure as Affordable Housing | Program hero, split intro/logo, application card, story gallery, image CTA, Other Programs cards | External needs-assistance application; no local form | Primarily HTML plus global widgets | PlanStreet public form, Kindful; card/button hover | Medium | **READY** |
| `/care-coach-mobile-unit/` | Care Coach | WordPress page; program detail | Header Programs; footer Our Programs; homepage program cards | Program detail | Program-family variant with an embedded video and different gallery proportions | Program hero, split intro/logo, application card, story gallery, YouTube video, image CTA, Other Programs cards | YouTube iframe; external application | Primarily HTML plus global widgets | YouTube embed, Typeform application, Kindful | Medium-high | **DYNAMIC** |
| `/news-media/` | News & Media | WordPress page; editorial/media | Header Hope In Action; footer News redirects here | Editorial/media | Shares hero, intro, and closing CTA shell with Testimonials; unique news-card body | Editorial hero, split intro, featured press card, press-card grid, image CTA | Press items are manually embedded in page HTML, not WordPress posts | Primarily HTML plus global widgets | Eleven external publisher links; Kindful; responsive card reflow | Medium | **READY** |
| `/testimonials/` | Testimonials | WordPress page; editorial/media | Header Hope In Action | Editorial/media | Shares editorial shell with News; unique video-card body | Editorial hero, split intro, three featured video cards, image CTA | Client script replaces clicked thumbnail with autoplay YouTube iframe | Primarily HTML plus global widgets | YouTube thumbnail/CDN and lazy embeds; Kindful | Medium-high | **DYNAMIC** |
| `/hope-in-action/` | Social Media (display hero: Hope In Action) | WordPress page; live social feed | Header Hope In Action; footer Quick Links | Social feed | Unique feed page; reuses global hero/CTA language only | Image hero, social profile buttons, live feed, image CTA | Live Juicer feed and Load More behavior | Primarily HTML plus global widgets | `juicer.io` embed, Instagram post links, social profiles, Kindful | High | **DYNAMIC** |
| `/sponsors/` | Partners & Sponsors | WordPress page; partner directory | Header Get Involved | Sponsor directory | Unique page shell; logo-tile primitive may be reusable | Image hero, split purpose intro, sponsor logo wall | Sponsor roster/logos/links are manually embedded | Primarily HTML plus global widgets | Eighteen external sponsor sites; logo hover/click | Medium | **READY** |
| `/live-here-love-here-lake/` | Live Here Love Here Lake | WordPress page; partnership campaign | Header Get Involved; footer Corporate Partnership | Membership/partnership campaign | Unique branded layout; its tiered directory is not interchangeable with Sponsors | Branded hero, price banner, benefits intro/cards, tiered business directory, closing split story | Native hosted MP4; frequently changing tiered business roster | HTML, heading, text editor, video plus global widgets | Typeform partnership intake, hosted MP4, YouTube story link, 25+ business destinations | Very high | **SPECIAL CASE** |
| `/we-need-trailers/` | We Need Trailers | WordPress page; campaign/lead form | Header Get Involved; footer Donate Trailer; homepage giving CTA currently has a broken legacy alias | Trailer campaign | Unique campaign layout; can reuse general CTA/card/gallery primitives | Campaign hero and fact pills, split intro/impact card, three-step process, trailer lead form, gallery, final image CTA | One inline POST form with name/phone/email/type/message; production action is `#` and no submission handler is present | Primarily HTML plus global widgets | Form implementation decision required; Kindful; standard hover states | Very high | **DYNAMIC** |
| `/contact-us/` | Contact Us | WordPress page; contact/conversion | Header Contact Us; footer Contact | Contact | Unique arrangement with reusable gallery/CTA/card primitives | Contact hero, address/contact split with application card, three action cards, impact gallery, image CTA | No local form; needs-assistance and volunteer actions leave the site | Primarily HTML plus global widgets | PlanStreet public form, Typeform, Kindful | Medium | **READY** |
| `/about-us/` | Board & Staff | WordPress page; people directory | Header Board & Staff; footer Quick Links | People directory | Unique people grids; reuses global image hero and closing CTA conventions | Image hero, founders, staff grid, board grid, image CTA | Staff/board roster is manually maintained in Elementor HTML | Primarily HTML plus global widgets | Typeform volunteer, Kindful; person-card hover only | Medium-high | **READY** |
| `/terms-conditions/` | Terms & Conditions | WordPress page; legal/standard content | Footer lower legal link redirects through `/terms` | Legal content | Unique legacy Elementor layout | Breadcrumb title hero, long-form legal copy, footer | Static page content | Heading, icon list, text editor plus global widgets | No page-specific service; breadcrumb is present | Low | **READY** |

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
| Membership/partnership campaign | `/live-here-love-here-lake/` | Unique brand palette, video, benefits, three sponsorship tiers, and story close | Page-specific composition; logo tiles may share only a primitive with Sponsors. |
| Trailer campaign | `/we-need-trailers/` | Unique campaign facts, process, and lead form | Page-specific composition; require form decision before completion. |
| Contact | `/contact-us/` | Unique contact/action-card arrangement | Page-specific composition using shared cards, gallery, and CTA band where measurements match. |
| People directory | `/about-us/` | Founder/staff/board grids | Dedicated people-grid family components and CMS-ready data shape. |
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
| Trailer inline form | Trailer donor lead capture | Source form posts to `#` with no detected handler. This is a production functionality gap and a required decision, not permission to invent infrastructure. |
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
- Highest-volume groups are Live Here business logos (about 30 rendered assets), About staff/board portraits (about 19), and Sponsors logos (18). Program pages share several family/story images and should deduplicate against the existing homepage program imagery.
- Additional unique assets include program logos (SVG), Care Coach media, trailer render/gallery photos, editorial background images, YouTube thumbnails, the Live Here brand logo, and the hosted volunteer-day MP4.
- Preserve originals—not Elementor thumbnail derivatives—where the original is available, while retaining the exact rendered crop through `object-position`, aspect ratio, and responsive CSS.
- Suggested future local organization: `public/images/programs/`, `public/images/people/`, `public/images/partners/`, `public/images/campaigns/`, and `public/media/`. Do not move accepted homepage assets solely for organizational cleanup.

## Migration risks

1. Modern interior pages are mostly large Elementor HTML widgets with page-scoped CSS; careless reuse would either copy Elementor markup or over-generalize distinct layouts.
2. WordPress currently has no structured published posts/CPT data for editorial, people, sponsors, testimonials, or programs. A later headless model will require an explicit content-modeling decision and migration of hardcoded page data.
3. The trailer lead form appears visually complete but has no detected production submission handler.
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
2. **Housing First** — validate that the family is genuinely data-driven and correct differences in copy length, hero crop, logo, and CTA image.
3. **Homelessness Avoidance** — complete the static program trio and validate long-title wrapping across all target widths.
4. **Care Coach** — add the explicit YouTube/media variant without polluting the base program API.
5. **News & Media** — establish the editorial shell and CMS-ready external press-card data shape.
6. **Testimonials** — reuse the editorial shell and add accessible click-to-load video cards.
7. **Contact Us** — exercise the shared hero/card/gallery/CTA primitives in a different composition while preserving external intake flows.
8. **Board & Staff** — add people-directory cards and a future WordPress-managed data model.
9. **Partners & Sponsors** — add the reusable logo tile and flat sponsor wall after general card primitives are stable.
10. **Live Here Love Here Lake** — build the branded tiered directory and native-video special case using the proven logo/media primitives.
11. **We Need Trailers** — build the campaign/process/gallery and stop at the form boundary until submission ownership is approved.
12. **Hope In Action** — integrate or deliberately replace only the Juicer presentation contract after dynamic-loading behavior is agreed.
13. **Terms & Conditions** — migrate the low-risk legacy legal layout without forcing it into modern components.

The Milestone 2 recommendation to migrate `/affordable-housing/` first has now been fulfilled. The next page in the approved sequence would be `/housing-first/`, but it remains unimplemented pending review of this milestone.

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

## Visual QA requirement for implementation milestones

For every migrated route, extend the existing repository Playwright/system-Chrome workflow carefully rather than creating per-page scripts. Compare production and local at 1440, 1024, 768, and 390px, plus widths adjacent to the accepted 1024/767 header transitions. Generated artifacts must stay under `.visual-qa/`; the accepted homepage screenshots and interaction results remain the regression baseline.
