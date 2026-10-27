# MAPIECEAUTO – Storefront (Next.js)

Premium storefront for **MAPIECEAUTO**, a French online store for car body parts
(lighting, mirrors, bumpers, grilles, bonnets, wings, glazing, doors, mechanical parts).

> Status: **frontend prototype with mock data.** The backend (Node.js — Medusa v2 or a custom API)
> is plugged in later by replacing the functions in `src/lib/api/services.ts` only.

## Stack

- Next.js 15 (App Router, Server Components) · React 19 · TypeScript (strict)
- Tailwind CSS v4 (design tokens in `src/app/globals.css`)
- Zustand (cart, "Mon garage") · Zod (form validation) · lucide-react (icons)

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck
```

Requires Node.js 18.18+ (Node 20+ recommended).

## Folder structure

```
src/
  app/                         # Routes (App Router)
    layout.tsx                 # Root layout: fonts, metadata, JSON-LD
    globals.css                # Tailwind + design tokens (colours, fonts, shadows)
    sitemap.ts / robots.ts     # SEO
    not-found.tsx
    (shop)/                    # Storefront group (shared header/footer)
      page.tsx                 # Home
      categories/              # All categories
      categorie/[slug]/        # Category listing (+ ?sous= sub-category)
      recherche/               # Search results (text, reference, OEM)
      vehicule/[make]/[model]/[year]/   # Parts for a vehicle
      produit/[slug]/          # Product page (+ Product JSON-LD)
      panier/                  # Cart
      commande/                # Checkout + confirmation
      compte/                  # Account, login, "Mon garage"
      (info)/[page]/           # About, contact, FAQ, delivery, legal pages
  components/
    ui/                        # Base UI: Button, Input, Select, Badge
    layout/                    # Header, Footer, cookie banner, newsletter
    shared/                    # Logo, PriceTag, StockBadge, Breadcrumbs, illustrations
  features/                    # Feature modules (UI + state per domain)
    vehicle-search/            # Vehicle selector (Marque → Modèle → Année → Carrosserie), garage store
    search/                    # Search bar, filters, sort, pagination, results layout
    catalog/                   # Category tiles/directory, page banner
    product/                   # Product card/grid, tabs, add-to-cart
    cart/                      # Cart store, drawer, cart page, order summary
    checkout/                  # Checkout flow (address → payment)
    account/                   # Auth forms, my garage
  lib/
    api/services.ts            # ★ Data access layer (replace mock with real API here)
    api/search-params.ts       # URL ↔ filters
    mock/                      # Sample categories, vehicles, products
    constants/                 # Site config, menus, info/legal page content
    utils/                     # cn, formatPrice (fr-FR), normalizeReference (OEM), slugify
  types/                       # Domain types (Product, Vehicle, Compatibility, Cart…)
  hooks/                       # useHydrated
```

## Connecting the real backend

1. Keep the function signatures in `src/lib/api/services.ts`.
2. Replace each body with a `fetch()` to the backend (Medusa Store API or custom API).
3. Move search/filters to the search engine (e.g. Meilisearch) — `searchProducts()` already
   returns the facet structure the UI expects (`categories`, `makes`, `priceRange`).
4. Cart: sync `features/cart/store.ts` actions with the server cart.
5. Checkout: in `features/checkout/checkout-flow.tsx → pay()`, create the order + Stripe
   PaymentIntent on the backend and mount Stripe Payment Element. Mark orders as paid
   **only from the Stripe webhook**.
6. Stock: comes from the supplier API (server-side sync); the UI reads `product.stock`.

## Business notes / TODO before launch

- **Logo**: text logo for now (`components/shared/index.tsx → Logo`). Replace with the real logo.
- **Images**: products show category illustrations with the "Image d'illustration" badge
  (`isIllustration: true`). Set it to `false` when real, licensed photos exist.
- **Delivery & contact**: edit `src/lib/constants/site.ts` (no delivery promise is hard-coded).
- **Shipping costs**: placeholder rule in `features/cart/cart-page.tsx → getShipping()`.
- **Legal pages** (CGV, mentions légales, confidentialité, cookies): content must be provided
  or validated by the client's legal advisor (`src/lib/constants/info-pages.ts`).
- **Cookie banner**: load analytics only after consent "accepted".
- **Sitemap**: for 30,000+ products, split with `generateSitemaps()`.
- Vehicle search uses "Carrosserie" (body type) as the 4th level, which is what matters for body
  parts. Add "Motorisation" later if mechanical parts / TecDoc are introduced.
