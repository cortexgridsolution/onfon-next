# Verification Notes — initial rendered pass

- Landing route renders with the intended mineral-white canvas, Onfon Blue CTA, split hero composition, asymmetric copy, and generated dashboard visual.
- Login route renders as a two-column auth stage at desktop width with focused form on the left and a generated signal panel on the right.
- Catalogue route renders with persistent operator navigation, KPI cards, filters, sortable rows, and six seeded Tier 1 inventory items.
- Browser extraction confirms the catalogue rows expose product detail buttons and the expected controls: search, category, merchant, in-stock toggle, sort, more filters, and export.
- The explicit `@source "./"` directive was required for Tailwind v4 to emit arbitrary utility classes used by the page-level components.
- Production build passes after the CSS source-scan fix; only the expected chunk-size advisory remains.

## Drawer interaction check

The first catalog row opens a right-side product-details drawer while the underlying table remains visible and de-emphasized. The drawer exposes the generated product visual, SKU, tier, price, daily add-on, stock, description, headroom impact, combined cap usage, merchant details, stock recency, fulfilment timing, and a clear action button. Escape and both close controls are wired, and the browser extraction confirms the dialog content is present.

## Authentication interaction check

The signup route renders the shared auth split stage with a focused operator form, password visibility toggle, explicit UI-only consent, navigation back to the landing page, and a clear path to login. Browser extraction confirms the generated signal visual and all form controls are present.

## Customer and merchant module extension — initial checks

The Customers route renders with the persistent operator shell, active navigation state, KPI summary cards, search, status/segment/sort filters, empty state, export affordance, and seeded customer records. A customer profile opens in a right-side 360 drawer with identity, repayment score, financial capacity, headroom bar, decision pipeline, offer explanation, purchase history, engagement preference, and suppression-aware next-best-action treatment.

The Merchants route renders with the same station chrome and a parallel dealer directory pattern. It exposes health/county/sort filters, performance metrics, inventory counts, routed orders, and profile affordances. Both modules have import actions that open the reusable four-step intake wizard.

The customer import wizard opens from the module header and renders the four-step progress rail, drag/drop CSV or XLSX upload area, template download action, sample-file preview action, and a clear commit-safety note. No data is committed at the upload stage.

A sample customer file advanced from column mapping into validation. The wizard auto-mapped all expected fields, surfaced 2 accepted rows and 1 rejected row with the explicit error “Full name is required,” and only enabled “Commit 2 records.” This verifies row-level validation and commit gating.

The Merchants route opens the same import wizard shell with merchant-specific copy, expected dealer fields, template download, sample-file entry, and the same explicit “nothing is committed until the final step” safeguard.

A sample merchant file advanced through automatic mapping and validation. The preview showed 2 accepted merchant rows and 1 rejected row with the explicit error “Merchant name is required,” while the commit control was gated to 2 records.
