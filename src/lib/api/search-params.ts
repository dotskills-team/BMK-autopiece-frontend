import type { Availability, Condition, SearchFilters, SortOption } from "@/types";

type RawParams = Record<string, string | string[] | undefined>;

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
const num = (v: string | undefined) => {
  if (v === undefined || v === "") return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
};

/** Parse URL search params into typed filters (used by server pages). */
export function parseSearchParams(params: RawParams): SearchFilters {
  const sort = first(params.sort);
  return {
    q: first(params.q) || undefined,
    category: first(params.categorie) || undefined,
    subCategory: first(params.sous) || undefined,
    make: first(params.marque) || undefined,
    model: first(params.modele) || undefined,
    year: num(first(params.annee)),
    minPrice: num(first(params.prixMin)),
    maxPrice: num(first(params.prixMax)),
    condition: ({ neuf: "new", occasion: "used" } as Record<string, Condition>)[first(params.etat) ?? ""],
    availability: ({ stock: "in_stock", commande: "on_order" } as Record<string, Availability>)[first(params.dispo) ?? ""],
    sort: (["relevance", "price_asc", "price_desc"].includes(sort ?? "") ? sort : "relevance") as SortOption,
    page: num(first(params.page)) ?? 1,
  };
}
