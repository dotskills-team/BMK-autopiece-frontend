import { ArrowRight, BadgeCheck, CreditCard, Headset, Truck } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PhotoSlot } from "@/components/shared";
import { buttonClasses } from "@/components/ui/button";
import { CategoryTiles } from "@/features/catalog/category-grid";
import { VehicleSelector } from "@/features/vehicle-search/vehicle-selector";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getCategories, getVehicles } from "@/lib/api/services";
import { images } from "@/lib/constants/images";
import { siteConfig } from "@/lib/constants/site";

type Props = { params: Promise<{ locale: Locale }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, tSite, categories, vehicles] = await Promise.all([getTranslations("home"), getTranslations("site"), getCategories(locale), getVehicles()]);
  const [brandFirst, ...brandRest] = siteConfig.name.split(" ");

  const features = [
    { icon: BadgeCheck, title: t("featureQuality"), text: t("featureQualityText") },
    { icon: Truck, title: tSite("deliveryLabel"), text: t("featureDeliveryText") },
    { icon: CreditCard, title: t("featurePayment"), text: t("featurePaymentText") },
    { icon: Headset, title: t("featureService"), text: t("featureServiceText") },
  ];

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden bg-ink text-white">
        <PhotoSlot src={images.hero} alt="" priority className="absolute inset-0 md:left-[35%]" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-transparent md:via-ink/50" aria-hidden />
        <div className="container-page relative py-10 sm:py-14 lg:py-16">
          <div className="max-w-xl">
            <p className="font-display leading-none font-black tracking-tight">
              <span className="text-4xl text-brand italic sm:text-5xl">{brandFirst}</span>
              <span className="ml-2 text-2xl sm:text-4xl">{brandRest.join(" ")}</span>
            </p>
            <h1 className="mt-4 font-display text-3xl leading-[1.05] font-black tracking-tight uppercase sm:text-4xl lg:text-5xl">
              {t("heroLine1")}
              <span className="block text-brand">{t("heroLine2")}</span>
              {t("heroLine3")}
            </h1>
            <p className="mt-4 max-w-sm text-sm text-white/85 sm:text-base">{t("heroText")}</p>
          </div>
        </div>
        <div className="relative border-t border-white/10 bg-ink/80 backdrop-blur">
          <ul className="container-page grid grid-cols-2 gap-4 py-4 sm:py-5 lg:grid-cols-4">
            {features.map((f) => (
              <li key={f.title} className="flex items-center gap-3">
                <f.icon className="h-7 w-7 shrink-0 text-white sm:h-8 sm:w-8" aria-hidden />
                <div className="min-w-0">
                  <p className="text-xs font-bold sm:text-sm">{f.title}</p>
                  <p className="text-[11px] text-white/65 sm:text-xs">{f.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- VEHICLE SEARCH ---------- */}
      <section aria-labelledby="vehicle-search-title" className="container-page pt-8 sm:pt-10">
        <h2 id="vehicle-search-title" className="mb-4 font-display text-base font-extrabold uppercase sm:text-lg">{t("vehicleSearchTitle")}</h2>
        <VehicleSelector vehicles={vehicles} />
      </section>

      {/* ---------- CATEGORIES ---------- */}
      <section className="container-page pt-8 sm:pt-10">
        <h2 className="mb-4 font-display text-base font-extrabold sm:text-lg">{t("ourCategories")}</h2>
        <CategoryTiles categories={categories} />
      </section>

      {/* ---------- CTA BANNER ---------- */}
      <section className="container-page py-8 sm:py-10">
        <div className="relative overflow-hidden rounded-lg bg-ink text-white">
          <PhotoSlot src={images.cta} alt="" className="absolute inset-0 sm:left-[40%]" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-transparent" aria-hidden />
          <div className="relative max-w-md px-5 py-7 sm:px-8 sm:py-9">
            <h2 className="font-display text-lg font-extrabold uppercase sm:text-xl">{t("ctaTitle")}</h2>
            <p className="mt-2 text-xs text-white/80 sm:text-sm">{t("ctaText")}</p>
            <Link href="/recherche" className={buttonClasses("primary", "sm", "mt-4")}>
              {t("ctaButton")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
