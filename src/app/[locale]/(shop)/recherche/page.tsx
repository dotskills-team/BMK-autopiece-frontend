import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/shared";
import { ResultsLayout } from "@/features/search/results-layout";
import { alternatesFor } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";
import { searchProducts } from "@/lib/api/services";
import { parseSearchParams } from "@/lib/api/search-params";

type Props = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { q } = parseSearchParams(await searchParams);
  const t = await getTranslations({ locale, namespace: "searchPage" });
  return {
    title: q ? t("metaResults", { q }) : t("metaAll"),
    robots: { index: !q, follow: true },
    alternates: alternatesFor("/recherche", locale),
  };
}

export default async function SearchPage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("searchPage");
  const filters = parseSearchParams(await searchParams);
  const result = await searchProducts(filters, locale);

  return (
    <div className="container-page pt-4 pb-10">
      <Breadcrumbs items={[{ label: filters.q ? t("titleResults") : t("titleAll") }]} />
      <div className="mt-4">
        <ResultsLayout
          result={result}
          title={filters.q ? t("titleResults") : t("titleAll")}
          summary={filters.q ? t("summaryCount", { count: result.total, q: filters.q }) : t("summaryAll", { count: result.total })}
        />
      </div>
    </div>
  );
}
