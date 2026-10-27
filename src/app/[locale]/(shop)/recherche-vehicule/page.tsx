import type { Metadata } from "next";
import { BadgeCheck, BadgeEuro, Headset, Truck } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Commitments, PhotoSlot } from "@/components/shared";
import { VehicleSelector } from "@/features/vehicle-search/vehicle-selector";
import { alternatesFor } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";
import { getVehicles } from "@/lib/api/services";
import { images } from "@/lib/constants/images";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "vehicleSearchPage" });
  return { title: t("metaTitle"), description: t("metaDescription"), alternates: alternatesFor("/recherche-vehicule", locale) };
}

export default async function VehicleSearchPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, tc, vehicles] = await Promise.all([getTranslations("vehicleSearchPage"), getTranslations("commitments"), getVehicles()]);

  return (
    <div className="container-page pt-4 pb-10">
      <section className="relative overflow-hidden rounded-lg bg-ink text-white">
        <PhotoSlot src={images.vehicleSearch} alt="" priority className="absolute inset-0 sm:left-1/3" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-transparent" aria-hidden />
        <div className="relative max-w-lg px-5 py-8 sm:px-8 sm:py-10">
          <h1 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">{t("title")}</h1>
          <p className="mt-2 text-sm text-white/80 sm:text-base">{t("text")}</p>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-4 max-w-[96%] rounded-lg border border-line bg-white p-4 shadow-[var(--shadow-card-hover)] sm:-mt-6 sm:p-6">
        <VehicleSelector vehicles={vehicles} variant="stepper" />
      </div>

      <section className="mt-10">
        <h2 className="mb-5 font-display text-lg font-extrabold sm:text-xl">{tc("title")}</h2>
        <Commitments
          items={[
            { icon: BadgeCheck, title: tc("quality"), text: tc("qualityText") },
            { icon: BadgeEuro, title: tc("price"), text: tc("priceText") },
            { icon: Truck, title: tc("delivery"), text: tc("deliveryText") },
            { icon: Headset, title: tc("service"), text: tc("serviceText") },
          ]}
        />
      </section>
    </div>
  );
}
