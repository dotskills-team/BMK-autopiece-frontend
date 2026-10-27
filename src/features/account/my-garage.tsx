"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Car, Trash2 } from "lucide-react";
import { EmptyState } from "@/components/shared";
import { buttonClasses } from "@/components/ui/button";
import { useGarage, vehicleLabel } from "@/features/vehicle-search/store";
import { vehicleHref } from "@/features/vehicle-search/vehicle-selector";
import { useHydrated } from "@/hooks/use-hydrated";

export function MyGarage() {
  const t = useTranslations("account");
  const tBody = useTranslations("bodyTypes");
  const hydrated = useHydrated();
  const { saved, removeSaved, select } = useGarage();

  if (!hydrated) return <div className="h-40 animate-pulse rounded-2xl bg-surface" />;
  if (saved.length === 0)
    return (
      <EmptyState
        title={t("garageEmptyTitle")}
        text={t("garageEmptyText")}
        action={<Link href="/" className={buttonClasses("primary")}>{t("searchByVehicle")}</Link>}
      />
    );

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {saved.map((v, i) => (
        <li key={vehicleLabel(v)} className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4 sm:gap-4 sm:p-5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand"><Car className="h-6 w-6" /></span>
          <div className="min-w-0 flex-1">
            <p className="font-semibold">{vehicleLabel(v, (b) => tBody(b))}</p>
            <Link href={vehicleHref(v.make, v.model, v.year)} onClick={() => select(v)} className="text-sm font-semibold text-brand hover:underline">
              {t("seeParts")}
            </Link>
          </div>
          <button aria-label={t("removeVehicle")} onClick={() => removeSaved(i)} className="text-muted hover:text-brand"><Trash2 className="h-4 w-4" /></button>
        </li>
      ))}
    </ul>
  );
}
