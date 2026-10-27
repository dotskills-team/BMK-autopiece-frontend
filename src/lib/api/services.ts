// Data access layer.
// Every page/component gets data ONLY through these functions.
// To connect the real backend (Medusa v2 or custom Node API), replace the
// bodies of these functions with fetch() calls — the signatures stay the same.
// Content functions take the current locale (send it to the API as ?lang=...).

import type { Availability, Category, Product, SearchFilters, SearchResult, Vehicle } from "@/types";
import { routing, type Locale } from "@/i18n/routing";
import { categories as sourceCategories } from "@/lib/mock/categories";
import { productSources, products as sourceProducts } from "@/lib/mock/products";
import { tr } from "@/lib/mock/translations";
import { vehicles } from "@/lib/mock/vehicles";
import { normalizeReference } from "@/lib/utils";

export const PAGE_SIZE = 12;

// ---------- Localization of the mock catalog ----------
function localizeCategory(c: Category, locale: Locale): Category {
  return {
    ...c,
    name: tr(c.name, locale),
    description: tr(c.description, locale),
    subCategories: c.subCategories.map((s) => ({ ...s, name: tr(s.name, locale) })),
  };
}

function localizeProduct(p: Product, locale: Locale): Product {
  const src = productSources.get(p.id);
  if (locale === routing.defaultLocale || !src) return p;
  const name = `${tr(src.part, locale)} ${src.vehicle}`;
  return {
    ...p,
    name,
    options: p.options.map((o) => tr(o, locale)),
    images: p.images.map((img) => ({ ...img, alt: name })),
    description: `New ${tr(src.part, locale).toLowerCase()}, fits ${src.vehicle} (${src.yearFrom} – ${src.yearTo}). OE-equivalent quality part, compliant with European standards. Please check compatibility with your vehicle's OEM reference before ordering.`,
  };
}

const cache = new Map<Locale, { categories: Category[]; products: Product[] }>();
function catalog(locale: Locale) {
  let c = cache.get(locale);
  if (!c) {
    c = {
      categories: sourceCategories.map((x) => localizeCategory(x, locale)),
      products: sourceProducts.map((x) => localizeProduct(x, locale)),
    };
    cache.set(locale, c);
  }
  return c;
}

// ---------- Categories ----------
export async function getCategories(locale: Locale): Promise<Category[]> {
  return catalog(locale).categories;
}

export async function getCategory(slug: string, locale: Locale): Promise<Category | undefined> {
  return catalog(locale).categories.find((c) => c.slug === slug);
}

// ---------- Products ----------
export async function getProduct(slug: string, locale: Locale): Promise<Product | undefined> {
  return catalog(locale).products.find((p) => p.slug === slug);
}

export async function getFeaturedProducts(locale: Locale, limit = 8): Promise<Product[]> {
  return catalog(locale).products.filter((p) => p.isFeatured && p.stock !== "out_of_stock").slice(0, limit);
}

export async function getRelatedProducts(product: Product, locale: Locale, limit = 4): Promise<Product[]> {
  return catalog(locale)
    .products.filter((p) => p.id !== product.id && p.categorySlug === product.categorySlug)
    .slice(0, limit);
}

/** Best sellers of a category (mock: first in-stock products). */
export async function getPopularProducts(categorySlug: string, locale: Locale, limit = 4): Promise<Product[]> {
  return catalog(locale)
    .products.filter((p) => p.categorySlug === categorySlug && p.stock !== "out_of_stock")
    .slice(0, limit);
}

export async function getAllProductSlugs(): Promise<string[]> {
  return sourceProducts.map((p) => p.slug);
}

// ---------- Vehicles ----------
export async function getMakes(): Promise<string[]> {
  return Array.from(new Set(vehicles.map((v) => v.make))).sort();
}

export async function getModels(make: string): Promise<Vehicle[]> {
  return vehicles.filter((v) => v.make === make);
}

export async function getVehicles(): Promise<Vehicle[]> {
  return vehicles;
}

// ---------- Search ----------
const availabilityOf = (p: Product): Availability => (p.stock === "out_of_stock" ? "on_order" : "in_stock");

function matchesQuery(p: Product, q: string) {
  const query = q.trim().toLowerCase();
  if (!query) return true;
  const normalized = normalizeReference(q);
  if (normalized.length >= 4) {
    if (normalizeReference(p.reference).includes(normalized)) return true;
    if (p.oemNumbers.some((oem) => normalizeReference(oem).includes(normalized))) return true;
  }
  const haystack = `${p.name} ${p.brand} ${p.compatibilities.map((c) => `${c.make} ${c.model}`).join(" ")}`.toLowerCase();
  return query.split(/\s+/).every((word) => haystack.includes(word));
}

function matchesVehicle(p: Product, f: SearchFilters) {
  if (!f.make) return true;
  return p.compatibilities.some(
    (c) =>
      c.make === f.make &&
      (!f.model || c.model === f.model) &&
      (!f.year || (f.year >= c.yearFrom && f.year <= c.yearTo)),
  );
}

export async function searchProducts(filters: SearchFilters, locale: Locale): Promise<SearchResult> {
  const { categories, products } = catalog(locale);
  const base = products.filter((p) => matchesQuery(p, filters.q ?? "") && matchesVehicle(p, filters));

  const prices = base.map((p) => p.priceTTC);
  const priceRange = {
    min: prices.length ? Math.floor(Math.min(...prices)) : 0,
    max: prices.length ? Math.ceil(Math.max(...prices)) : 0,
  };

  let filtered = base.filter(
    (p) =>
      (!filters.category || p.categorySlug === filters.category) &&
      (!filters.subCategory || p.subCategorySlug === filters.subCategory) &&
      (filters.minPrice === undefined || p.priceTTC >= filters.minPrice) &&
      (filters.maxPrice === undefined || p.priceTTC <= filters.maxPrice) &&
      (!filters.condition || p.condition === filters.condition) &&
      (!filters.availability || availabilityOf(p) === filters.availability),
  );

  if (filters.sort === "price_asc") filtered = [...filtered].sort((a, b) => a.priceTTC - b.priceTTC);
  if (filters.sort === "price_desc") filtered = [...filtered].sort((a, b) => b.priceTTC - a.priceTTC);

  // facet counts (computed on the query/vehicle result, like a search engine would)
  const categoryCounts = new Map<string, number>();
  const makeCounts = new Map<string, number>();
  const conditionCounts = new Map<string, number>();
  const availabilityCounts = new Map<string, number>();
  for (const p of base) {
    conditionCounts.set(p.condition, (conditionCounts.get(p.condition) ?? 0) + 1);
    availabilityCounts.set(availabilityOf(p), (availabilityCounts.get(availabilityOf(p)) ?? 0) + 1);
    categoryCounts.set(p.categorySlug, (categoryCounts.get(p.categorySlug) ?? 0) + 1);
    for (const make of new Set(p.compatibilities.map((c) => c.make))) {
      makeCounts.set(make, (makeCounts.get(make) ?? 0) + 1);
    }
  }

  const page = Math.max(1, filters.page ?? 1);
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return {
    items: filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    total,
    page,
    pageSize: PAGE_SIZE,
    totalPages,
    facets: {
      categories: categories
        .filter((c) => categoryCounts.has(c.slug))
        .map((c) => ({ value: c.slug, label: c.name, count: categoryCounts.get(c.slug) ?? 0 })),
      makes: Array.from(makeCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([value, count]) => ({ value, label: value, count })),
      conditions: (["new", "used"] as const).map((value) => ({ value, label: value, count: conditionCounts.get(value) ?? 0 })),
      availability: (["in_stock", "on_order"] as const).map((value) => ({ value, label: value, count: availabilityCounts.get(value) ?? 0 })),
      priceRange,
    },
  };
}
