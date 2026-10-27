import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CategoryDirectory } from "@/features/catalog/category-grid";
import { PageBanner } from "@/features/catalog/page-banner";
import { alternatesFor } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";
import { getCategories } from "@/lib/api/services";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "categoriesPage" });
  return { title: t("metaTitle"), description: t("metaDescription"), alternates: alternatesFor("/categories", locale) };
}

export default async function CategoriesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, categories] = await Promise.all([getTranslations("categoriesPage"), getCategories(locale)]);
  return (
    <>
      <PageBanner title={t("title")} text={t("text")} breadcrumbs={[{ label: t("breadcrumb") }]} />
      <div className="container-page py-8 sm:py-12">
        <CategoryDirectory categories={categories} />
      </div>
    </>
  );
}
