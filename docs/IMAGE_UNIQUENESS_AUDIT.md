# Image Uniqueness Audit

## Scope

The canonical site routes were crawled as rendered pages, excluding the shared header/footer identity graphics and remote Instagram provider content. Repeated editorial photography was replaced with route- and placement-specific imagery without changing page layout.

Factual organization assets remain unchanged:

- Homepage campaign and program imagery
- Care Coach and its vehicle imagery on `/care-coach-mobile-unit/`
- Trailer, vehicle, and beneficiary imagery on `/we-need-trailers/`
- Staff and board portraits
- Sponsor and program logos
- Find Feed Restore identity graphics and Candid seal

Copies of Care Coach and trailer imagery that appeared on unrelated routes were replaced; the factual route imagery itself was not altered.

## Generated imagery

Replacement photography is stored in `public/images/unique/` as optimized WebP files. The images depict fictional people and are not representations of named Find Feed Restore beneficiaries. Art direction emphasizes natural, smiling faces together, varied family/community groups, and generous crop-safe space around every head.

## Crop safety

Changed routes were rendered at 1440px, 390px, and 320px. Hero, card, gallery, and CTA crops were inspected for complete heads/hairlines, readable faces, media containment, and horizontal overflow. Generated screenshots remain under the ignored `.visual-qa/image-crops/` directory.

## Repeatable checks

- `npm run qa:images` crawls every canonical route and reports repeated local content-image URLs, with only the documented factual-route exceptions.
- `npm run qa:image-crops` captures the changed routes at desktop and narrow mobile widths for crop review.
- `node scripts/optimize-generated-images.mjs` converts source PNGs staged in `public/images/unique/` to deployment-ready WebP files.

The rendered audit passed across all 14 canonical routes. Homepage, Care Coach, and We Need Trailers imagery remain the intentional source-specific exceptions.
