# Elementor to Next.js Migration Audit

Status: **Blocked pending source inputs**  
Audit date: 2026-08-09  
Workspace: `/Users/geofftracy/Projects/find-feed-restore`

This is a living migration document. It records only verified facts. Design values and page details must be measured from the production site rather than inferred.

## Visual fidelity rules

1. The production Elementor site is the visual source of truth.
2. Do not redesign, modernize, simplify, or reinterpret the source design.
3. Preserve measured spacing, font sizes, colors, radii, imagery, and decorative details.
4. Preserve responsive behavior and validate at approximately 1440, 1024, 768, and 390 pixels wide.
5. Reuse components only where the rendered structure is genuinely shared.
6. Do not reproduce Elementor's generated nesting; use semantic, accessible React components.
7. Preserve SEO-relevant structure where practical.
8. Do not introduce dependencies without a demonstrated requirement.
9. Keep WordPress in the long-term architecture as the likely content source through REST or WPGraphQL.
10. Treat visible differences from the production site as defects.

## 1. Current Next.js project architecture

### Verified repository state

The supplied workspace is empty. The audit found none of the following:

- `package.json` or lockfile
- `next.config.*`
- `app/` or `pages/`
- TypeScript configuration
- styling files or configuration
- source components
- public assets
- environment example files
- Git metadata
- `.openai/hosting.json`

Consequently, the Next.js version, router type, TypeScript settings, styling approach, dependencies, routes, reusable components, fonts, image handling, and environment variables cannot yet be determined.

No neighboring project was adopted because doing so without confirmation could modify unrelated user work. The correct Next.js project must be placed in this workspace, or the intended project path must be confirmed before implementation.

## 2. Existing site design system

Not yet measurable. The production URL was supplied as the literal placeholder `[PASTE EXISTING WEBSITE URL HERE]`, not as a navigable address. The audit must capture exact computed values and rendered behavior once the real URL is available.

Required measurements include:

- maximum and fluid container widths
- desktop, tablet, and mobile gutters
- section padding and vertical rhythm
- breakpoint transitions
- typefaces, weights, sizes, line heights, and letter spacing
- foreground, background, border, and interactive colors
- radii, borders, shadows, overlays, and gradients
- image dimensions, aspect ratios, focal points, and object-fit behavior
- control dimensions, hover/focus/active states, and motion timing

## 3. Homepage section inventory

Blocked until the production homepage URL is available. The inventory will record every section from top to bottom, including announcement bars, header variants, hero, content sections, calls to action, forms, footer, and any overlays or sticky elements.

For each section, record:

- DOM/landmark purpose and heading hierarchy
- visible content and assets
- desktop/tablet/mobile composition
- measured container and spacing values
- background and foreground treatments
- interactions, animation, and scroll behavior
- WordPress source and Elementor/plugin dependency
- reusable component boundary, if warranted

## 4. Reusable component candidates

The source design has not yet been inspected, so these are categories to evaluate, not approved component names or abstractions:

- site announcement bar
- site header and desktop navigation
- mobile navigation drawer/menu
- constrained content container
- section wrapper variants
- shared heading/eyebrow treatment
- button/link variants
- responsive media treatment
- repeated card or listing patterns
- shared form controls
- carousel/slider controls
- accordion item/group
- call-to-action treatment
- site footer and footer navigation

Components will be created only after repeated rendered patterns are verified.

## 5. Typography system

Pending production inspection and repository/font-asset audit. For each type style, capture family, source, fallback stack, weight, style, size, line height, letter spacing, casing, decoration, and responsive changes. Confirm whether fonts are self-hosted, loaded by WordPress/Elementor, or served by a third party before implementing `next/font` or local `@font-face` rules.

## 6. Color system

Pending production inspection. Repeated measured colors will become narrowly scoped CSS custom properties. Elementor global colors, CSS output, gradients, alpha overlays, hover states, and form states must be checked before tokens are finalized.

## 7. Spacing and container system

Pending production inspection. Capture content maximum widths, nested widths, viewport gutters, section padding, grid gaps, header height, and breakpoint-specific overrides. Do not normalize irregular values merely because a cleaner scale is possible.

## 8. Responsive behavior

Pending production inspection at minimum widths of approximately 1440, 1024, 768, and 390 pixels, with additional checks at actual layout breakpoints. Document element visibility, navigation changes, stacking order, alignment, text wrapping, image crop, overflow, sticky behavior, and breakpoint-specific spacing.

## 9. Interaction and animation inventory

Pending production inspection. Audit hover/focus/active states, mobile navigation, accordions, tabs, sliders, forms, video, entrance animations, scroll effects, sticky elements, anchors, modals, and reduced-motion behavior. Preserve meaningful source behavior where practical without importing Elementor runtime code.

## 10. WordPress and plugin dependencies

Pending production inspection and, if available, WordPress/plugin inventory. Identify which elements are provided by Elementor widgets, theme templates, shortcodes, form plugins, slider plugins, event systems, SEO plugins, or other runtime dependencies.

Candidate content for eventual WordPress management includes pages, posts, staff, events, testimonials, services, ministries, locations, media, calls to action, navigation, and sitewide settings. Static representative homepage data is acceptable only for the visual-parity pass and must be marked for later CMS integration.

## 11. Potential migration risks

1. **Missing project checkout:** There is currently no application to audit or extend.
2. **Missing production URL:** No visual or behavioral source can be measured.
3. **Asset availability:** Original-resolution media, SVGs, and font files may not be directly retrievable from rendered pages.
4. **Font licensing and delivery:** Production typography may depend on licensed or plugin-hosted files.
5. **Elementor breakpoint behavior:** Widget-specific CSS can differ from theme/global breakpoint settings and must be verified visually.
6. **Plugin-owned behavior:** Forms, sliders, search, events, popups, and tracking may require separate replacement strategies.
7. **Dynamic content ambiguity:** Rendered content alone may not reveal WordPress models or editorial ownership.
8. **Animation parity:** Elementor and add-on effects may rely on libraries that should not be copied wholesale.
9. **SEO parity:** Titles, metadata, canonical URLs, schema, heading order, redirects, and indexability can regress during migration.
10. **Visual regression risk:** Small font, crop, and spacing differences can compound without screenshot comparison at fixed viewports.

## 12. Recommended migration order

Once the missing inputs are supplied, use this exact order:

1. Restore/open the intended Next.js project and repeat the architecture audit.
2. Capture the production homepage and computed styles at 1440, 1024, 768, and 390 pixels.
3. Inventory homepage sections, assets, interactions, dynamic content, and plugin dependencies in this document.
4. Crawl only the public navigation/sitemap needed to create and verify the primary-URL checklist.
5. Preserve the existing project architecture and establish the smallest necessary tokens: typography, colors, containers, section spacing, buttons, and image treatment.
6. Rebuild the announcement bar and header, including desktop and mobile navigation.
7. Rebuild the hero and validate all four target viewports.
8. Rebuild each body section in source order, validating each before continuing.
9. Rebuild the footer and shared sitewide elements.
10. Run full-page side-by-side or overlay visual QA at all target viewports and fix visible discrepancies.
11. Verify accessibility basics, semantic structure, metadata, image behavior, build output, and Vercel compatibility.
12. Annotate static homepage data with its intended future WordPress source; do not implement the full CMS integration in this pass.

## Page migration checklist

The primary public URLs cannot be enumerated until a real production URL is supplied. Do not infer routes from page titles alone; verify each URL and layout individually.

- [ ] Production homepage — URL required
- [ ] Header navigation destinations — pending production navigation audit
- [ ] Footer navigation destinations — pending production footer audit
- [ ] XML sitemap URLs — pending discovery and verification
- [ ] Other indexable primary URLs — pending sitemap/navigation audit

For every discovered URL, record its canonical production URL, template/layout characteristics, dynamic content source, special interaction/plugin dependencies, and migration status.

## Current blockers and resumption criteria

Implementation and visual QA must not begin until both conditions are met:

1. The intended Next.js project is present in `/Users/geofftracy/Projects/find-feed-restore`, or another project path is explicitly confirmed.
2. The actual production website URL is provided.

Once available, update this document by replacing every pending section with measured findings before making broad architectural changes.
