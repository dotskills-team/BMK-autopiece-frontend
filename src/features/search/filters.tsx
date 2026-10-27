"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import type { FacetCount, SearchResult, SortOption } from "@/types";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/form-controls";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn, formatPrice } from "@/lib/utils";

/** Small helper to update one or more URL params and reset pagination. */
function useUpdateParams() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  return (updates: Record<string, string | undefined>) => {
    const next = new URLSearchParams(params.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === undefined || value === "") next.delete(key);
      else next.set(key, value);
    }
    if (!("page" in updates)) next.delete("page");
    router.push(`${pathname}?${next.toString()}`, { scroll: false });
  };
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-b border-line pb-4">
      <legend className="mb-2.5 text-sm font-bold text-ink">{title}</legend>
      {children}
    </fieldset>
  );
}

/** Checkbox list bound to one URL param (single value, like the search engine). */
function FacetList({ param, facets, labels, limit = 5 }: { param: string; facets: FacetCount[]; labels?: Record<string, string>; limit?: number }) {
  const params = useSearchParams();
  const update = useUpdateParams();
  const t = useTranslations("results");
  const active = params.get(param);
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? facets : facets.slice(0, limit);

  return (
    <>
      <ul className="space-y-2">
        {visible.map((f) => (
          <li key={f.value}>
            <label className="flex cursor-pointer items-center gap-2.5 text-[13px] text-ink-700 hover:text-ink">
              <input
                type="checkbox"
                checked={active === f.value}
                onChange={() => update({ [param]: active === f.value ? undefined : f.value })}
                className="h-4 w-4 rounded border-line accent-brand"
              />
              <span>
                {labels?.[f.value] ?? f.label} <span className="text-muted">({f.count})</span>
              </span>
            </label>
          </li>
        ))}
      </ul>
      {facets.length > limit && (
        <button type="button" onClick={() => setShowAll((v) => !v)} className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-brand">
          {showAll ? t("seeLess") : t("seeMore")} <ChevronDown className={cn("h-3.5 w-3.5 transition", showAll && "rotate-180")} />
        </button>
      )}
    </>
  );
}

/** Dual-handle price slider; applies on release. */
function PriceRange({ max }: { max: number }) {
  const params = useSearchParams();
  const update = useUpdateParams();
  const t = useTranslations("results");
  const locale = useLocale();
  const urlMin = Number(params.get("prixMin") ?? 0);
  const urlMax = Number(params.get("prixMax") ?? max);
  const [range, setRange] = useState<[number, number]>([urlMin, Math.min(urlMax, max)]);
  useEffect(() => setRange([urlMin, Math.min(urlMax, max)]), [urlMin, urlMax, max]);

  const commit = () => update({ prixMin: range[0] > 0 ? String(range[0]) : undefined, prixMax: range[1] < max ? String(range[1]) : undefined });
  const pct = (v: number) => (max ? (v / max) * 100 : 0);

  return (
    <div>
      <div className="mb-2 flex justify-between text-xs text-ink-700">
        <span>{formatPrice(range[0], locale).replace(/[.,]00/, "")}</span>
        <span>{formatPrice(range[1], locale).replace(/[.,]00/, "")}</span>
      </div>
      <div className="range-dual relative h-5">
        <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-line" />
        <div className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-brand" style={{ left: `${pct(range[0])}%`, right: `${100 - pct(range[1])}%` }} />
        <input
          type="range"
          aria-label={t("priceMin")}
          min={0}
          max={max}
          step={5}
          value={range[0]}
          onChange={(e) => setRange([Math.min(Number(e.target.value), range[1] - 5), range[1]])}
          onPointerUp={commit}
          onKeyUp={commit}
        />
        <input
          type="range"
          aria-label={t("priceMax")}
          min={0}
          max={max}
          step={5}
          value={range[1]}
          onChange={(e) => setRange([range[0], Math.max(Number(e.target.value), range[0] + 5)])}
          onPointerUp={commit}
          onKeyUp={commit}
        />
      </div>
    </div>
  );
}

function FiltersContent({ result }: { result: SearchResult }) {
  const update = useUpdateParams();
  const t = useTranslations("results");
  // Round the slider max up to a clean value (e.g. 287 -> 300)
  const max = Math.max(50, Math.ceil(result.facets.priceRange.max / 50) * 50);

  return (
    <div className="space-y-4">
      <FilterGroup title={t("price")}>
        <PriceRange max={max} />
      </FilterGroup>
      {result.facets.makes.length > 0 && (
        <FilterGroup title={t("brand")}>
          <FacetList param="marque" facets={result.facets.makes} />
        </FilterGroup>
      )}
      <FilterGroup title={t("condition")}>
        <FacetList
          param="etat"
          facets={result.facets.conditions.map((f) => ({ ...f, value: f.value === "new" ? "neuf" : "occasion" }))}
          labels={{ neuf: t("new"), occasion: t("used") }}
        />
      </FilterGroup>
      <fieldset className="pb-2">
        <legend className="mb-2.5 text-sm font-bold text-ink">{t("availability")}</legend>
        <FacetList
          param="dispo"
          facets={result.facets.availability.map((f) => ({ ...f, value: f.value === "in_stock" ? "stock" : "commande" }))}
          labels={{ stock: t("inStock"), commande: t("onOrder") }}
        />
      </fieldset>
      <Button size="sm" className="px-6" onClick={() => update({ prixMin: undefined, prixMax: undefined, marque: undefined, etat: undefined, dispo: undefined })}>
        {t("reset")}
      </Button>
    </div>
  );
}

export function Filters({ result }: { result: SearchResult }) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("results");
  return (
    <>
      <Button variant="outline" className="w-full lg:hidden" onClick={() => setOpen(true)}>
        <SlidersHorizontal className="h-4 w-4" /> {t("filters")}
      </Button>
      <aside className="hidden lg:block">
        <h2 className="mb-3 text-base font-bold">{t("filters")}</h2>
        <FiltersContent result={result} />
      </aside>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label={t("filters")}>
          <div className="absolute inset-0 bg-ink/60" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85%] overflow-y-auto bg-white p-5">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-lg font-extrabold">{t("filters")}</h2>
              <button onClick={() => setOpen(false)} aria-label={t("close")}><X className="h-5 w-5" /></button>
            </div>
            <FiltersContent result={result} />
          </div>
        </div>
      )}
    </>
  );
}

export function SortSelect() {
  const params = useSearchParams();
  const update = useUpdateParams();
  const t = useTranslations("results");
  return (
    <label className="flex items-center gap-2 text-sm text-ink">
      <span className="hidden whitespace-nowrap sm:inline">{t("sortBy")} :</span>
      <Select
        value={(params.get("sort") as SortOption) ?? "relevance"}
        onChange={(e) => update({ sort: e.target.value === "relevance" ? undefined : e.target.value })}
        className="h-9 w-40 sm:w-44"
      >
        <option value="relevance">{t("relevance")}</option>
        <option value="price_asc">{t("priceAsc")}</option>
        <option value="price_desc">{t("priceDesc")}</option>
      </Select>
    </label>
  );
}

export function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
  const update = useUpdateParams();
  const t = useTranslations("results");
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1 || (page <= 3 && p <= 5),
  );
  const btn = "flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-sm font-semibold transition";
  return (
    <nav aria-label={t("pagination")} className="mt-8 flex items-center justify-center gap-1.5">
      {page > 1 && (
        <button onClick={() => update({ page: String(page - 1) })} aria-label={t("previous")} className={cn(btn, "text-ink hover:text-brand")}>
          <ArrowLeft className="h-4 w-4" />
        </button>
      )}
      {pages.map((p, i) => (
        <span key={p} className="flex items-center gap-1.5">
          {i > 0 && p - pages[i - 1] > 1 && <span className="px-1 text-muted">…</span>}
          <button
            onClick={() => update({ page: String(p) })}
            aria-current={p === page ? "page" : undefined}
            className={cn(btn, p === page ? "bg-brand text-white" : "text-ink hover:bg-surface")}
          >
            {p}
          </button>
        </span>
      ))}
      {page < totalPages && (
        <button onClick={() => update({ page: String(page + 1) })} aria-label={t("next")} className={cn(btn, "text-ink hover:text-brand")}>
          <ArrowRight className="h-4 w-4" />
        </button>
      )}
    </nav>
  );
}
