import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionTitle } from "@/components/shared";
import { PageBanner } from "@/features/catalog/page-banner";
import { SubCategoryCards, SubCategoryList } from "@/features/catalog/category-grid";
import { ProductGrid } from "@/features/product/product-card";
import { ResultsLayout } from "@/features/search/results-layout";
import { alternatesFor } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";
import { getCategories, getCategory, getPopularProducts, searchProducts } from "@/lib/api/services";
import { parseSearchParams } from "@/lib/api/search-params";
import { images } from "@/lib/constants/images";

type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateStaticParams({ params }: { params: { locale: Locale } }) {
  return (await getCategories(params.locale)).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const category = await getCategory(slug, locale);
  if (!category) return {};
  const t = await getTranslations({ locale, namespace: "categoriesPage" });
  return {
    title: t("categoryMetaTitle", { name: category.name }),
    description: category.description,
    alternates: alternatesFor(`/categorie/${category.slug}`, locale),
  };
}

/**
 * Without "?sous=": category overview (sub-category list + cards + popular products).
 * With "?sous=": product listing of that sub-category with filters.
 */
export default async function CategoryPage({ params, searchParams }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const category = await getCategory(slug, locale);
  if (!category) notFound();

  const [t, tSearch] = await Promise.all([getTranslations("categoriesPage"), getTranslations("searchPage")]);
  const filters = { ...parseSearchParams(await searchParams), category: category.slug };
  const sub = category.subCategories.find((s) => s.slug === filters.subCategory);
  const banner = images.categoryBanners[category.slug];

  if (sub) {
    const result = await searchProducts(filters, locale);
    return (
      <>
        <PageBanner
          title={category.name}
          text={category.description}
          image={banner}
          breadcrumbs={[{ label: category.name, href: `/categorie/${category.slug}` }, { label: sub.name }]}
        />
        <div className="container-page py-6 sm:py-8">
          <ResultsLayout result={result} title={sub.name} summary={tSearch("summaryAll", { count: result.total })} />
        </div>
      </>
    );
  }

  const popular = await getPopularProducts(category.slug, locale);
  return (
    <>
      <PageBanner title={category.name} text={category.description} image={banner} breadcrumbs={[{ label: category.name }]} />
      <div className="container-page py-6 sm:py-8">
        <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:gap-8">
          <SubCategoryList category={category} title={t("subCategoriesTitle")} />
          <SubCategoryCards category={category} />
        </div>
        {popular.length > 0 && (
          <section className="mt-8 sm:mt-10">
            <SectionTitle title={t("popular")} />
            <ProductGrid products={popular} />
          </section>
        )}
      </div>
    </>
  );
}
