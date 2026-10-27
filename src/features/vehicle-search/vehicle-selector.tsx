"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Car, Hash, Search } from "lucide-react";
import type { Vehicle } from "@/types";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/form-controls";
import { useRouter } from "@/i18n/navigation";
import { cn, slugify } from "@/lib/utils";
import { useGarage } from "./store";

type Tab = "vehicle" | "reference";

export function vehicleHref(make: string, model: string, year: number) {
  return `/vehicule/${slugify(make)}/${slugify(model)}/${year}`;
}

/**
 * Vehicle search (marque → modèle → année → motorisation).
 * - "inline": home page block with "par véhicule / par référence" tabs
 * - "stepper": vehicle search page with numbered steps
 */
export function VehicleSelector({ vehicles, variant = "inline" }: { vehicles: Vehicle[]; variant?: "inline" | "stepper" }) {
  const t = useTranslations("vehicleSelector");
  const router = useRouter();
  const select = useGarage((s) => s.select);
  const [tab, setTab] = useState<Tab>("vehicle");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [engine, setEngine] = useState("");
  const [reference, setReference] = useState("");

  const makes = useMemo(() => Array.from(new Set(vehicles.map((v) => v.make))).sort(), [vehicles]);
  const models = useMemo(() => vehicles.filter((v) => v.make === make), [vehicles, make]);
  const vehicle = models.find((v) => v.model === model);
  const years = useMemo(() => {
    if (!vehicle) return [];
    const list: number[] = [];
    for (let y = vehicle.yearTo; y >= vehicle.yearFrom; y--) list.push(y);
    return list;
  }, [vehicle]);

  const canSearch = make && model && year;
  const step = !make ? 0 : !model ? 1 : !year ? 2 : 3;

  function onVehicleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSearch) return;
    select({ make, model, year: Number(year), engine: engine || undefined });
    router.push(vehicleHref(make, model, Number(year)));
  }

  function onReferenceSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!reference.trim()) return;
    router.push(`/recherche?q=${encodeURIComponent(reference.trim())}`);
  }

  const showLabels = variant === "stepper";
  const fields = [
    {
      id: "vs-make",
      label: t("make"),
      value: make,
      disabled: false,
      onChange: (v: string) => { setMake(v); setModel(""); setYear(""); setEngine(""); },
      options: makes.map((m) => ({ value: m, label: m })),
    },
    {
      id: "vs-model",
      label: t("model"),
      value: model,
      disabled: !make,
      onChange: (v: string) => { setModel(v); setYear(""); setEngine(""); },
      options: models.map((v) => ({ value: v.model, label: v.model })),
    },
    {
      id: "vs-year",
      label: t("year"),
      value: year,
      disabled: !model,
      onChange: (v: string) => setYear(v),
      options: years.map((y) => ({ value: String(y), label: String(y) })),
    },
    {
      id: "vs-engine",
      label: t("engine"),
      value: engine,
      disabled: !vehicle,
      onChange: (v: string) => setEngine(v),
      options: (vehicle?.engines ?? []).map((e) => ({ value: e, label: e })),
    },
  ];

  const vehicleForm = (
    <form onSubmit={onVehicleSubmit} className="space-y-3">
      {variant === "stepper" && (
        <ol className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {fields.map((f, i) => (
            <li
              key={f.id}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold",
                i === step ? "bg-brand-50 text-brand" : i < step ? "text-ink" : "text-muted",
              )}
            >
              <span className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs", i <= step ? "bg-brand text-white" : "bg-surface text-muted")}>{i + 1}</span>
              {f.label}
            </li>
          ))}
        </ol>
      )}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {fields.map((f) => (
          <div key={f.id}>
            <Label htmlFor={f.id} className={showLabels ? undefined : "sr-only"}>{f.label}</Label>
            <Select id={f.id} value={f.value} disabled={f.disabled} onChange={(e) => f.onChange(e.target.value)}>
              <option value="">{showLabels ? t("choose") : f.label}</option>
              {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </Select>
          </div>
        ))}
      </div>
      <div className={cn(variant === "stepper" && "flex justify-end")}>
        <Button type="submit" disabled={!canSearch} className={cn(variant === "stepper" ? "w-full sm:w-auto sm:min-w-64" : "w-full")}>
          <Search className="h-4 w-4" aria-hidden /> {t("search")}
        </Button>
      </div>
    </form>
  );

  if (variant === "stepper") return vehicleForm;

  return (
    <div>
      <div role="tablist" aria-label={t("searchType")} className="mb-3 grid grid-cols-2 gap-3">
        {([
          { id: "vehicle", label: t("byVehicle"), icon: Car },
          { id: "reference", label: t("byReference"), icon: Hash },
        ] as const).map((tb) => (
          <button
            key={tb.id}
            type="button"
            role="tab"
            aria-selected={tab === tb.id}
            onClick={() => setTab(tb.id)}
            className={cn(
              "flex items-center justify-center gap-2 rounded-md px-3 py-2.5 text-xs font-semibold transition sm:justify-start sm:text-sm",
              tab === tb.id ? "bg-brand text-white shadow-sm shadow-brand/30" : "bg-surface text-ink hover:bg-line",
            )}
          >
            <tb.icon className="h-4 w-4 shrink-0" aria-hidden /> <span className="truncate">{tb.label}</span>
          </button>
        ))}
      </div>

      {tab === "vehicle" ? (
        vehicleForm
      ) : (
        <form onSubmit={onReferenceSubmit} className="space-y-3">
          <div>
            <Label htmlFor="vs-ref" className="sr-only">{t("referenceLabel")}</Label>
            <Input id="vs-ref" value={reference} onChange={(e) => setReference(e.target.value)} placeholder={t("referencePlaceholder")} />
          </div>
          <Button type="submit" disabled={!reference.trim()} className="w-full">
            <Search className="h-4 w-4" aria-hidden /> {t("search")}
          </Button>
        </form>
      )}
    </div>
  );
}
