import { Suspense } from "react";
import { useTranslations } from "next-intl";
import type { SearchResult } from "@/types";
import { EmptyState } from "@/components/shared";
import { buttonClasses } from "@/components/ui/button";
import { ProductGrid } from "@/features/product/product-card";
import { Link } from "@/i18n/navigation";
import { Filters, Pagination, SortSelect } from "./filters";

/**
 * Shared layout for search, category and vehicle result pages:
 * title + result count on the left, sort on the right, then filters | grid.
 */
export function ResultsLayout({ result, title, summary }: { result: SearchResult; title?: string; summary: string }) {
  const t = useTranslations("results");
  return (
    <>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          {title && <h1 className="font-display text-xl font-extrabold tracking-tight text-ink sm:text-2xl">{title}</h1>}
          <p className="mt-0.5 text-xs text-muted sm:text-sm">{summary}</p>
        </div>
        <Suspense><SortSelect /></Suspense>
      </div>
      <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:gap-8">
        <Suspense>
          <Filters result={result} />
        </Suspense>
        <div className="min-w-0">
          {result.items.length === 0 ? (
            <EmptyState
              title={t("noResults")}
              text={t("noResultsText")}
              action={<Link href="/recherche" className={buttonClasses("primary")}>{t("seeAllParts")}</Link>}
            />
          ) : (
            <ProductGrid products={result.items} columns={3} />
          )}
          <Suspense><Pagination page={result.page} totalPages={result.totalPages} /></Suspense>
        </div>
      </div>
    </>
  );
}
