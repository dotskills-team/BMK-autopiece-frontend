import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageBanner } from "@/features/catalog/page-banner";
import { ResultsLayout } from "@/features/search/results-layout";
import { VehicleSelector } from "@/features/vehicle-search/vehicle-selector";
import { alternatesFor } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";
import { getVehicles, searchProducts } from "@/lib/api/services";
import { parseSearchParams } from "@/lib/api/search-params";
import { images } from "@/lib/constants/images";
import { slugify } from "@/lib/utils";

type Params = { locale: Locale; make: string; model: string; year: string };
type Props = {
  params: Promise<Params>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function resolveVehicle({ make, model, year }: Params) {
  const vehicles = await getVehicles();
  const vehicle = vehicles.find((v) => slugify(v.make) === make && slugify(v.model) === model);
  const y = Number(year);
  if (!vehicle || !Number.isInteger(y) || y < vehicle.yearFrom || y > vehicle.yearTo) return null;
  return { vehicle, year: y, vehicles };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const resolved = await resolveVehicle(p);
  if (!resolved) return {};
  const t = await getTranslations({ locale: p.locale, namespace: "vehiclePage" });
  const label = `${resolved.vehicle.make} ${resolved.vehicle.model} ${resolved.year}`;
  return {
    title: t("metaTitle", { label }),
    description: t("metaDescription", { label }),
    alternates: alternatesFor(`/vehicule/${p.make}/${p.model}/${p.year}`, p.locale),
  };
}

export default async function VehiclePage({ params, searchParams }: Props) {
  const p = await params;
  setRequestLocale(p.locale);
  const resolved = await resolveVehicle(p);
  if (!resolved) notFound();
  const { vehicle, year, vehicles } = resolved;

  const [t, tSearch] = await Promise.all([getTranslations("vehiclePage"), getTranslations("searchPage")]);
  const filters = { ...parseSearchParams(await searchParams), make: vehicle.make, model: vehicle.model, year };
  const result = await searchProducts(filters, p.locale);
  const label = `${vehicle.make} ${vehicle.model}`;

  return (
    <>
      <PageBanner
        title={t("title", { label })}
        text={t("text", { year })}
        image={images.vehicleSearch}
        breadcrumbs={[{ label: t("breadcrumb"), href: "/recherche-vehicule" }, { label: `${label} (${year})` }]}
      />
      <div className="container-page py-6 sm:py-8">
        <details className="mb-6 rounded-lg border border-line p-4">
          <summary className="cursor-pointer text-sm font-semibold">{t("change")}</summary>
          <div className="mt-4"><VehicleSelector vehicles={vehicles} variant="stepper" /></div>
        </details>
        <ResultsLayout result={result} summary={`${tSearch("summaryAll", { count: result.total })} ${t("summary", { label, year })}`} />
      </div>
    </>
  );
}
