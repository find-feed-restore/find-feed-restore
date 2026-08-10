# Elementor to Next.js Migration Audit

Audit date: 2026-08-09

Interior inventory update: 2026-08-10

Production source: <https://www.findfeedrestore.com/>

Homepage WordPress page ID: `134`

Status: **Homepage visual-parity milestone complete with minor documented icon/rasterization differences**

The production Elementor site is the visual source of truth. Findings below come from the rendered homepage at desktop, tablet, and mobile widths; production HTML; Elementor-generated CSS; public WordPress REST data; and the Yoast XML sitemap. Values are recorded as rendered rather than normalized into a new design.

## Visual fidelity rules

1. Do not redesign, modernize, simplify, or reinterpret the source.
2. Preserve measured typography, spacing, colors, radii, imagery, and decorative details.
3. Preserve responsive behavior and validate near 1440, 1024, 768, and 390 pixels.
4. Treat visible differences from production as defects.
5. Reuse components only where the visible structure is genuinely shared.
6. Use semantic React instead of copying Elementor's generated nesting.
7. Preserve SEO-relevant structure and keep WordPress in the long-term architecture.
8. Avoid new dependencies unless a source interaction demonstrably requires one.

## 1. Current Next.js project architecture

- Next.js `16.3.0`, React/React DOM `19.2.8`.
- App Router under `src/app`; only `/` exists.
- Strict TypeScript 5 with bundler module resolution, `@/* -> ./src/*`, and generated `LayoutProps` support.
- React Compiler is enabled in `next.config.ts`.
- Tailwind CSS 4 is configured through `@tailwindcss/postcss`; `globals.css` imports Tailwind.
- No CSS Modules or other styling libraries existed at audit time.
- Starter typography used Geist and Geist Mono through `next/font/google`; these do not match production and are being replaced with the source fonts.
- Starter imagery used local assets through `next/image`; production assets are being copied locally to preserve exact originals and avoid depending on WordPress delivery for the static fidelity pass.
- No reusable application components, CMS client, data layer, tests, analytics integration, or environment variables existed at audit time.
- No `.openai/hosting.json` exists. Deployment target remains Vercel through the standard Next.js build.
- No dependency removal or architectural replacement is required.

## 2. Existing site design system

### Core visual character

The page combines an older Elementor global system with newer custom HTML-widget sections:

- Global/legacy headings: Noto Serif.
- Global body/navigation: Noto Sans.
- Footer body: Heebo.
- New mission/impact/cause/giving display headings: Georgia/Times New Roman fallback stack.
- Warm off-white content backgrounds, deep blue-black text, dark navy overlays, and dark red donation accents.
- Pills are used for primary actions and small category labels.
- Cause cards are unusually rounded (`38px` desktop, `30px` mobile); impact cards use a much smaller `6px` radius; giving cards use `28px`.
- Subtle elevation, dark translucent overlays, glass-style giving/impact cards, and hover lift are intentional source details.

## 3. Homepage section inventory

### 1. Responsive site header

- Desktop (`>1024px`): light gray `#ececec` header; 1350px content container; left logo, center navigation, right red “Support Our Mission” pill.
- Initial desktop header uses 20px vertical padding and a minimum height of 100px. The sticky state begins after an 80px scroll offset, shrinks to 4px vertical padding/minimum 72px, and reduces logo maximum height from 86px to 72px over 450ms.
- Desktop navigation: Home; Programs dropdown; Get Involved dropdown; Hope In Action dropdown; Board & Staff; Contact Us. Text is Noto Sans 14px, deep blue `#00283f`, with an underline-grow hover treatment.
- Tablet (`768–1024px`): dedicated dark `#1a1a1a` header, centered logo above a white horizontal navigation row. Rendered production keeps the horizontal menu at this width.
- Mobile (`<=767px`): dedicated warm `#fbf9f5` header, centered 50%-width logo and a hamburger toggle. The dropdown retains the complete nested menu.
- External donation target: `https://findfeedrestore-bloom.kindful.com/`.

### 2. Hero / “Our Vision”

- Full-height background section using `hero-family.jpg` (source 2000×1333, 3:2), centered and cover-cropped with a 40% black overlay.
- Desktop hero content container: 950px. Padding: 320px top/280px bottom.
- Tablet: `margin-top: -143px`; padding `243px 10px 143px`, producing an intentional header/hero overlap.
- Mobile: padding `160px 0 140px`.
- H1: “Housing For Homeless / Families With Children,” centered, Noto Serif 600, 56px/1.3 desktop, 38px tablet, 24px mobile.
- “Our Vision” uses Noto Sans 300 at 19px desktop, 14px mobile despite being an H2 in source markup.
- Description uses Noto Sans 500 at 19px desktop, 14px mobile; desktop inner horizontal padding is 20%.
- Actions: red gradient donation pill and translucent white video pill. Each is at least 210×56px, 30px horizontal padding, 999px radius, 13px/800 uppercase text with `0.14em` tracking.
- Video target is a normal external YouTube link, not an embedded player: `https://www.youtube.com/watch?v=69VFG8OXVAs`.
- Animations: slow fade-in on heading/subheading, fade-in-up on body/actions, hover lift, and a 4.5s repeating shimmer across the video button.

### 3. “Our Mission / Homeless to Hopeful” grid

- Warm background `#faf8f5`; padding `78px 24px`; 1280px inner container.
- Centered label and Georgia heading, followed by four equal columns: Affordable Housing, Housing First, Mobile Help, Homelessness Avoidance.
- Heading max width 780px, 46px bottom gap; title `clamp(36px, 4vw, 58px)`, 0.95 line height, `-0.055em` tracking.
- Grid gap 34px. Circular 68px icons use a pale red background and become solid red on hover. Cards lift 4px.
- At 1100px the grid becomes two columns; at 700px it becomes one column with `64px 18px` section padding and a 40px title.

### 4. “Our Impact / Housing Families. Restoring Hope.” counters

- Dark navy `rgba(5,24,39,.88)` treatment with a subtle top-center radial highlight; current source references a placeholder background URL, so the rendered section is effectively gradient/color only.
- Padding `110px 24px`; 1180px container; header width 760px and 52px bottom gap.
- Georgia title `clamp(38px, 5vw, 66px)` at 1.04 line height.
- Three glass cards: 3-column grid with 22px gap, minimum 230px height, 38px×28px padding, 6px radius, 1px translucent border, blur, shadow, and a 4px dark-red top rule inset 28px.
- Final values: 191 Families Housed; 349 Children Housed; 498 People Housed.
- Numbers animate once on 35% intersection over 1800ms with cubic ease-out. A screenshot may capture intermediate values; the final targets above are canonical.
- At 900px the cards become one column, section padding becomes `80px 20px`, and card minimum height becomes 190px.

### 5. “Our Causes / What We Do” cards

- Warm background `#faf8f5`; padding `120px 24px`; unusually wide 1680px container.
- Header width 760px with a 70px bottom gap. Georgia title `clamp(52px, 5vw, 82px)`, 0.92 line height, `-0.055em` tracking.
- Four cards: Affordable Housing, Housing First, Homelessness Avoidance, Care Coach Mobile Unit.
- Card grid gap 28px. Cards use a white gradient, 38px radius, thin blue-black border, and two-layer shadow. Hover lifts 8px and deepens shadow.
- Image sources are copied exactly from production. Desktop crop height is 255px; mobile 220px; all use `object-fit: cover` and scale to 1.05 on hover.
- Content padding is `28px 28px 30px`. Category pill is 9px/900 uppercase. Card title is 25px/900, 1.02 line height. Body is 14px/500 at 1.45.
- At 1300px the grid becomes two columns; at 700px it becomes one column with `80px 18px` section padding and 30px card radius.

### 6. “Help A Family In Need / How You Can Give” CTA

- Background image `give-banner.jpg` (2000×667, approximately 3:1), center/cover with `rgba(7,27,42,.78)` overlay.
- Padding `110px 24px`; 1380px content container.
- Georgia title `clamp(48px, 6vw, 88px)`, 0.95 line height, `-0.055em` tracking.
- Three glass cards: Sponsor A Family, Support FFR, Donate A Trailer. Grid gap 28px; cards use 44px×38px padding, 28px radius, blur, translucent border, and hover lift.
- Body introduction max width 760px; 21px/1.6; 28px top and 64px bottom margin.
- At 1100px the cards stack and center their text. At 700px the section becomes `80px 18px`, the title 44px, intro 17px, and cards `34px 28px`.
- The first two actions link to Kindful. The third source URL is `/trailer-ministry/`, which is not present in the current sitemap and is a migration risk.

### 7. Site footer and floating donation control

- Footer background `#252425`; desktop padding `80px 0 40px`; tablet/mobile `40px 10px 40px`. The near-invisible (`opacity: .01`) hands background is decorative but should be retained if the original is available.
- Global 1140px boxed container.
- Four desktop columns with source widths 18% / 22% / 25% / 35%: Quick Links, Our Programs, Contact Info plus social links, and Support Our Mission plus donation button and Candid/GuideStar seal.
- Footer headings are Noto Sans 18px/500 in `#ccc`; link/body text is predominantly Noto Sans 300 or Heebo 300 in white.
- Lower row contains the light logo on the left and right-aligned copyright/Terms text. Mobile centers and stacks all columns and the lower row.
- Floating donation widget is fixed bottom-left at 24px desktop/18px mobile. The 56px (50px mobile) red heart circle shimmers every 7s; its translucent label appears only on desktop hover.

## 4. Reusable component candidates

- `SiteHeader` with shared navigation data and distinct desktop/tablet/mobile renderings.
- `DesktopNav`, `MobileNav`, and reusable dropdown groups.
- `SiteFooter` driven by reusable footer-link arrays.
- `Container` only for genuinely shared 1140px/1350px boxed patterns; the large custom homepage sections retain their measured widths.
- `PillButton` with red-gradient and translucent-video variants.
- `SectionHeading` with warm, dark, and light variants where typography actually matches.
- `MissionGrid`/`MissionItem`.
- `ImpactSection` with a small client-only `AnimatedCounter` island.
- `CauseGrid`/`CauseCard`.
- `GivingSection`/`GivingCard`.
- `FloatingDonate`.
- Shared production navigation/content data module, ready to move to WordPress later.

## 5. Typography system

| Role | Family | Source values |
| --- | --- | --- |
| Primary/hero heading | Noto Serif | 56px/600/1.3 desktop; 38px tablet; 24px mobile |
| Global secondary heading | Noto Serif | 38px/600; 26px tablet; 22px mobile |
| Global body | Noto Sans | 16px/300; 14px mobile |
| Navigation | Noto Sans | 14px desktop/tablet; source dropdown weight 600 |
| Custom section display | Georgia, Times New Roman, serif | section-specific clamps recorded above |
| Footer body/copyright | Heebo | 14–16px/300 |
| Uppercase labels/buttons | Noto Sans | 9–14px, weight 600–900, tracking 0.08–0.22em |

Production self-hosts variable WOFF2 files. The exact Latin Noto Serif, Noto Sans, and Heebo assets have been copied for local loading; no Google runtime request is required.

## 6. Color system

Recommended narrowly scoped tokens, preserving exact source values:

```css
--color-navy: #00283f;
--color-ink: #071b2a;
--color-charcoal: #252425;
--color-text: #6f747e;
--color-text-soft: #667085;
--color-text-muted: #6b7280;
--color-red: #8b0000;
--color-red-bright: #c40000;
--color-red-elementor: #ad0000;
--color-warm: #faf8f5;
--color-warm-elementor: #fbf9f5;
--color-header: #ececec;
--color-rule: #f0f0f0;
--color-gray: #c8c8c8;
--color-footer-heading: #cccccc;
--color-white: #ffffff;
```

## 7. Spacing and container system

- Elementor boxed container: 1140px desktop, 1024px tablet, 767px mobile.
- Header: 1350px desktop; tablet template max 1200px; mobile template max 557px.
- Hero content: 950px; action row: 728px.
- Mission: 1280px; impact: 1180px; causes: 1680px; giving: 1380px.
- Repeated horizontal section gutters are 24px desktop and 18–20px mobile.
- Repeated section vertical bands are 78–120px desktop and 64–80px mobile, but each exact section value must remain distinct.

## 8. Responsive behavior

- Elementor breakpoints: mobile `<=767px`, tablet `<=1024px`; base runtime also reports `sm 480`, `md 768`, `lg 1025`, `xl 1440`, `xxl 1600`.
- Custom breakpoints used by homepage widgets: 600px for hero action stacking; 700px for mission/cause/giving mobile layouts; 900px for impact stacking; 1100px for mission/giving; 1300px for causes.
- 1440/desktop: light sticky header, 4-column mission/causes, 3-column impact/giving.
- 1024/tablet: dedicated header template; mission 2 columns, impact 1, causes 2, giving 1.
- 768/tablet boundary: dark tablet header, centered logo and horizontal navigation; body grids follow tablet rules.
- 390/mobile: warm header with hamburger; all content grids stack; floating donation label is hidden; hero actions stack to a maximum 290px width.

## 9. Interaction and animation inventory

- Sticky shrinking desktop header after 80px scroll.
- Desktop dropdown navigation and underline-grow hover treatment.
- Mobile hamburger with nested submenu disclosure.
- Elementor hero entrance animations: fade-in and fade-in-up.
- Button/card hover lifts and image zoom.
- Hero video-button shimmer (4.5s) and floating-donate shimmer (7s).
- Impact counters animate once at 35% intersection for 1800ms.
- No homepage carousel, accordion, form, embedded video, modal, or popup is present.
- Implementation should add a reduced-motion fallback while leaving the default motion visually consistent.

## 10. WordPress and plugin dependencies

- WordPress 7.0.3, REST API, page ID 134.
- Hello Elementor theme 3.4.9.
- Elementor 4.1.5 and Elementor Pro 4.1.3: theme-builder header/footer, responsive visibility, navigation, sticky header, entrance/hover animations.
- ElementsKit Lite 3.10.02 and Jeg Elementor Kit 3.1.0 assets are loaded, although the audited homepage body is mostly Elementor plus custom HTML widgets.
- Yoast SEO 28.0: title, canonical, Open Graph metadata, organization schema, and XML sitemap.
- Header Footer Code Manager injects Google Analytics (`G-C884BBPZ88`). A separate Gauges tracker is also present.
- Kindful/Bloom provides donation flows; Typeform provides volunteer intake.
- YouTube provides the hero video destination.
- Candid/GuideStar provides the transparency seal.
- Facebook, Instagram, LinkedIn, and YouTube provide footer social destinations.
- No homepage WordPress form submission, search UI, or plugin-owned carousel needs replacing in this phase.

Future WordPress-managed candidates: navigation, sitewide header/footer settings, hero, section copy, program/cause cards, impact statistics, giving cards, media, social links, donation URLs, and SEO metadata. Static representative data is acceptable for this first visual pass.

## 11. Potential migration risks

1. Production CSS references the hero and footer overlay on a staging hostname; assets must be preserved locally before that host changes.
2. The giving section links to `/trailer-ministry/`, while navigation/sitemap use `/we-need-trailers/`.
3. Footer links include `/news` and `/terms`, but canonical sitemap paths are `/news-media/` and `/terms-conditions/`.
4. Desktop, tablet, and mobile headers are separate Elementor templates, not a single layout that merely collapses.
5. Custom body sections embed raw CSS/JavaScript in Elementor HTML widgets; migration should reproduce behavior without carrying that markup forward.
6. Exact background cover crops vary strongly with viewport height and require screenshot comparison, not width-only testing.
7. Impact screenshots can show in-progress counter values; implementation must use final data targets.
8. Noto and Heebo font metrics must use the copied production files to prevent line-wrap drift.
9. Current footer copyright says 2025 even though the production audit is in 2026; visual fidelity requires preserving it unless content owners request correction.
10. Analytics, donation, volunteer, and social services need an explicit later product/privacy decision; they should not be silently dropped or expanded during homepage fidelity work.

## 12. Recommended homepage rebuild order

1. Preserve exact source assets and font files locally.
2. Establish only repeated global tokens, reset, typography, focus treatment, and measured button primitives.
3. Rebuild responsive header/navigation and validate its three source variants.
4. Rebuild hero and validate background crop, wrapping, and actions at all four target widths.
5. Rebuild mission grid.
6. Rebuild impact counters with a small client component.
7. Rebuild causes cards.
8. Rebuild giving CTA.
9. Rebuild footer and floating donation widget.
10. Run full-page visual QA at 1440, 1024, 768, and 390px; fix differences before interior-page work.
11. Verify build, semantic landmarks, keyboard navigation, reduced motion, metadata, and Vercel compatibility.
12. Annotate static content for later REST/WPGraphQL integration without implementing the full CMS in this pass.

## Page migration checklist

These are verified public URLs from the production Yoast sitemap. Similar titles do not imply shared layouts; audit each individually before migration.

- [x] `/` — homepage audit and migration in progress
- [ ] `/terms-conditions/`
- [ ] `/news-media/`
- [ ] `/live-here-love-here-lake/`
- [ ] `/sponsors/`
- [ ] `/testimonials/`
- [ ] `/hope-in-action/`
- [ ] `/we-need-trailers/`
- [ ] `/contact-us/`
- [ ] `/care-coach-mobile-unit/`
- [ ] `/affordable-housing/`
- [ ] `/housing-first/`
- [ ] `/homelessness-avoidance/`
- [ ] `/about-us/`

External flows to preserve but not migrate as local pages:

- Kindful/Bloom donations
- Typeform volunteering
- YouTube hero video
- Candid/GuideStar profile
- Social network profiles

## Homepage Visual Parity QA

QA attempt date: 2026-08-09

Rendered QA is now established through the repository-local `scripts/visual-qa.mjs` utility. It uses development-only Playwright Core with the already-installed system Chrome; no browser binary is bundled and no production runtime dependency was added. The utility captures production and `http://localhost:3002/` in isolated contexts at the same width, 900px viewport height, 1× device scale, light color scheme, and reduced-motion preference. It waits for fonts, scrolls once to load lazy images and finish counters, waits for image/layout stabilization, returns to scroll position zero, and then takes a full-page screenshot with animations disabled. Port 3000 remains occupied by the unrelated `living-message-church` repository and was not modified.

Generated files are written beneath the Git-ignored `.visual-qa/` directory. Each width receives production and local screenshots, a side-by-side image, a 50% average overlay, an amplified absolute-difference image, and JSON measurements. Sharp performs normalization and image comparison. The numeric changed-pixel metric counts pixels with at least one color-channel delta greater than 16; it is a diagnostic, not a perceptual pass threshold.

| Viewport | Status | Verified | Remaining blocker or known difference |
| --- | --- | --- | --- |
| 1440px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | Production/local page heights both 4712px; 3.383% amplified changed-pixel rate. Header, hero crop and wrapping, all section boundaries, grids, cards, CTA, footer, and fixed donation placement align. | Tiny browser/font rasterization differences and the code-native footer/floating-control icon shapes remain visible at high magnification. |
| 1024px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | Production 5828px; local 5829px; 3.525% changed-pixel rate. Dedicated tablet header, 143px hero overlap, 2/1/2/1 grids, footer columns, imagery, and wrapping align. | One-pixel total-height difference plus minor icon/antialiasing differences. |
| 768px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | Production/local page heights both 6108px; 4.416% changed-pixel rate. Dark tablet template, horizontal navigation, hero crop, stacked impact/giving sections, cause cards, and footer align. | Minor icon/antialiasing differences only. |
| 390px | **PASS WITH MINOR DOCUMENTED DIFFERENCES** | Production 8176px; local 8175px; 7.114% changed-pixel rate. Mobile header, hero, every stacked section, card crops, 18px gutters, CTA, footer, and floating control align. | One-pixel total-height difference. Elementor/Font Awesome social and donation glyphs are approximated with code-native icons, producing the largest remaining localized diff. |

### Breakpoint and interaction review

- Breakpoint-adjacent rendered pairs were captured at 1025, 1023, 769, and 767px. Production/local page heights differ by at most two pixels at those widths; changed-pixel rates are 3.925%, 3.572%, 4.860%, and 4.104%, respectively. No broken intermediate header or grid state was found.
- Desktop dropdown hover and placement were exercised in headless Chrome and pass.
- Mobile navigation opens and closes from the hamburger, updates `aria-expanded`, and remains keyboard-operable; the automated check passes.
- Desktop sticky-header shrink after 80px and its restored top-of-page state pass. Tablet/mobile headers remain non-sticky, matching the source templates.
- Keyboard focus treatment passes with the measured 3px visible outline.
- Donation targets, source footer URLs, hero video target, and program links have been checked against the production markup. Interior Next.js destinations are intentionally not implemented in this homepage-only milestone.
- Impact counters use the source final values, animate once on intersection for 1800ms, and immediately show final values under reduced motion; the automated reduced-motion check passes.
- Entrance, shimmer, lift, and image-zoom transitions are disabled under `prefers-reduced-motion: reduce`; no source-only interaction was added.
- Every rendered homepage anchor has a nonempty destination, and the floating donation control resolves to the production Kindful URL.

### Completion-gate result

**PASS WITH MINOR DOCUMENTED DIFFERENCES.** Actual production/local rendered screenshots, side-by-side images, overlays, and amplified differences were inspected at all four canonical widths and around both header-template transitions. Major layout, typography, crop, spacing, wrapping, and alignment discrepancies have been corrected. Remaining differences are localized icon geometry and subpixel/browser rasterization; they do not change page structure or proportions. This completes the homepage visual-parity milestone without beginning interior-page migration.

### Regression verification

- ESLint: **PASS** (`npm run lint`)
- TypeScript: **PASS** (`npx tsc --noEmit`)
- Patch whitespace: **PASS** (`git diff --check`)
- Visual capture: **PASS** (`npm run visual:qa`)
- Interaction QA: **PASS** (`npm run visual:qa:interactions`)
- Production build: **PASS** (`next build --webpack` in an isolated copy so the active development server was not disturbed); `/` prerenders as static content.
- Local runtime: **PASS** at `http://localhost:3002`; the homepage returns HTTP 200 and emits all audited sections, source assets, and production link targets.

## Milestone 2: global interior-site findings

The complete URL-by-URL matrix, page families, section classifications, asset scope, exclusions, and exact migration order are recorded in [`SITE_MIGRATION_MATRIX.md`](./SITE_MIGRATION_MATRIX.md). The accepted homepage implementation and its visual-QA results remain unchanged.

### Canonical scope

- Yoast, the WordPress core sitemap, public REST pages, navigation, footer links, and rendered internal links resolve to **14 canonical public pages**, including the homepage.
- All 14 canonical pages returned HTTP 200 in rendered desktop/mobile inspection and declared the expected canonical URL.
- WordPress exposes the same 14 published pages, all top-level and using `elementor_header_footer`.
- The public posts collection contains zero published posts. No post sitemap, public domain-specific custom post type, custom taxonomy, or ACF REST payload was found.
- `/news` and `/terms` are legacy redirects to their canonical pages. `/trailer-ministry/` is a 404 still referenced by the homepage giving CTA. Feeds, admin/login, REST/sitemap endpoints, attachment pages, fragments, and duplicate URL variants are not migration pages.

### Interior design patterns

- The site has ten render-derived structural families. The strongest family is the four program pages: Affordable Housing, Housing First, Homelessness Avoidance, and a Care Coach video variant.
- News & Media and Testimonials share an editorial hero, split intro, section-heading, and closing CTA shell but require distinct press-card and click-to-load video bodies.
- Modern interior pages reinforce the homepage custom-section system: Georgia/Times display headings, Noto Sans body/control text, deep blue-black ink, dark red actions, warm off-white fields, rounded media, and restrained shadows/lift.
- Common modern interior content caps are approximately 680–980px; family/grid wrappers reach 1280–1480px. These are not replacements for the 1140px footer container.
- Reusable candidates newly proven across interior families are a measured image-overlay CTA band, eyebrow/display section heading, gallery/crop primitives, a logo tile, and narrowly scoped elevated-card primitives.
- The Terms page is a genuine legacy exception with a breadcrumb title hero and the older Noto typography. Live Here Love Here Lake is a branded exception with its own red/gold palette and tiered directory.
- No rendered interior page contains an accordion, tabs, carousel, slider, search interface, `<details>` disclosure, or popup.

### Dynamic and plugin-dependent areas

- Most modern interior bodies are large Elementor HTML widgets containing their own CSS and occasional JavaScript. They must be decomposed into semantic data and components rather than translated directly.
- Elementor Pro continues to own the three responsive header templates, nav/dropdowns, sticky behavior, footer, responsive visibility, and animation behavior. ElementsKit and Jeg assets load globally, but no audited interior body interaction requires their runtime.
- Hope In Action is a live Juicer social embed with Load More behavior.
- Testimonials replaces clicked thumbnails with autoplay YouTube iframes; Care Coach embeds YouTube immediately; Live Here uses a WordPress-hosted MP4. These are three distinct video contracts.
- Typeform supplies volunteer/partnership/application flows; PlanStreet supplies needs-assistance intake; Kindful/Bloom supplies donations; Candid supplies the transparency badge.
- The We Need Trailers inline form posts to `#` and has no detected handler. This is an existing production functionality gap requiring an explicit later decision, not authorization to introduce form infrastructure.
- News cards, people, sponsors, testimonials, programs, and social presentation are hardcoded in page content despite being strong future WordPress-managed candidates.

### Interior asset scope

- The rendered interior pages reference 84 unique WordPress-hosted image URLs.
- REST page-body extraction finds 88 normalized image references plus one hosted MP4 across the full published site.
- Many URLs are Elementor thumbnails or resized variants, and some accepted homepage files were renamed locally. Preserve originals and compare hashes/dimensions before downloading so the migration does not duplicate identical assets.
- The largest new sets are Live Here partner logos, About staff/board portraits, and Sponsors logos. Program pages also reuse several family/story images and must be checked against existing homepage assets.

### Migration decision

`/affordable-housing/` is the recommended first interior route. It is the cleanest program-family representative and establishes the hero, split intro/application card, story gallery, support CTA, and related-program grid without introducing the Care Coach video variant. No interior implementation begins until the migration matrix is reviewed.
