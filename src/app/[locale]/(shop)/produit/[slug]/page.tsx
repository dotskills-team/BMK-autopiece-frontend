import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BadgeCheck, Lock, RotateCcw, Truck } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs, Commitments, PriceTag, SectionTitle, StockBadge } from "@/components/shared";
import { AddToCartPanel, ProductActions } from "@/features/product/add-to-cart";
import { ProductGallery } from "@/features/product/product-gallery";
import { ProductGrid } from "@/features/product/product-card";
import { ProductTabs } from "@/features/product/product-tabs";
import { alternatesFor } from "@/i18n/metadata";
import { getPathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getCategory, getProduct, getRelatedProducts } from "@/lib/api/services";
import { siteConfig } from "@/lib/constants/site";
import { formatYearRange } from "@/lib/utils";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProduct(slug, locale);
  if (!product) return {};
  const t = await getTranslations({ locale, namespace: "product" });
  return {
    title: t("metaTitle", { name: product.name, reference: product.reference }),
    description: t("metaDescription", { name: product.name, reference: product.reference, oem: product.oemNumbers.join(", ") }),
    alternates: alternatesFor(`/produit/${product.slug}`, locale),
  };
}

export default async function ProductPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const product = await getProduct(slug, locale);
  if (!product) notFound();

  const [t, tSite, category, related] = await Promise.all([
    getTranslations("product"),
    getTranslations("site"),
    getCategory(product.categorySlug, locale),
    getRelatedProducts(product, locale),
  ]);
  const main = product.compatibilities[0];
  const vehicle = main ? `${main.make} ${main.model}` : "";
  const partName = vehicle ? product.name.replace(` ${vehicle}`, "") : product.name;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.reference,
    mpn: product.oemNumbers[0],
    brand: { "@type": "Brand", name: product.brand },
    description: product.description,
    itemCondition: product.condition === "used" ? "https://schema.org/UsedCondition" : "https://schema.org/NewCondition",
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: product.priceTTC.toFixed(2),
      availability: product.stock === "out_of_stock" ? "https://schema.org/BackOrder" : "https://schema.org/InStock",
      url: `${siteConfig.url}${getPathname({ href: `/produit/${product.slug}`, locale })}`,
    },
  };

  return (
    <div className="container-page pt-4 pb-10">
      <Breadcrumbs
        items={[
          ...(category ? [{ label: category.name, href: `/categorie/${category.slug}` }] : []),
          { label: product.name },
        ]}
      />

      <div className="mt-4 grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <ProductGallery categorySlug={product.categorySlug} subCategorySlug={product.subCategorySlug} side={product.side} />

        {/* Buy box */}
        <div>
          <h1 className="font-display text-xl leading-tight font-extrabold tracking-tight text-ink sm:text-2xl">
            {partName}
            {vehicle && <span className="block">{vehicle}</span>}
          </h1>
          <dl className="mt-3 space-y-0.5 text-sm text-ink-700">
            <div className="flex gap-1.5"><dt>{t("reference")}</dt><dd className="min-w-0 break-words">{product.reference}</dd></div>
            <div className="flex gap-1.5"><dt>{t("brand")}</dt><dd>{product.brand}</dd></div>
            {main && (
              <div className="flex gap-1.5">
                <dt className="shrink-0">{t("compatibility")}</dt>
                <dd className="min-w-0">{vehicle} ({formatYearRange(main.yearFrom, main.yearTo)})</dd>
              </div>
            )}
          </dl>

          <PriceTag value={product.priceTTC} size="lg" className="mt-4" />
          <div className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-1">
            <StockBadge status={product.stock} />
            <span className="inline-flex items-center gap-1.5 text-xs text-ink-700">
              <Truck className="h-4 w-4" aria-hidden /> {t("deliveryTime", { time: tSite("deliveryTime") })}
            </span>
          </div>
          <AddToCartPanel product={product} className="mt-4" />
          <ProductActions product={product} />
          {product.isIllustration && <p className="mt-4 text-[11px] text-muted">{t("illustrationNote")}</p>}
        </div>
      </div>

      <div className="mt-8">
        <ProductTabs product={product} />
      </div>

      <Commitments
        className="mt-8 rounded-lg border border-line px-5 py-5"
        items={[
          { icon: BadgeCheck, title: t("qualityGuaranteed") },
          { icon: RotateCcw, title: t("returnWithin", { days: siteConfig.returns.days }) },
          { icon: Lock, title: t("securePayment") },
        ]}
      />

      {related.length > 0 && (
        <section className="mt-10">
          <SectionTitle title={t("related")} />
          <ProductGrid products={related} />
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
    </div>
  );
}
