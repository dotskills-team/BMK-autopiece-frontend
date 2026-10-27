"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MessageSquare } from "lucide-react";
import type { Product } from "@/types";
import { cn, formatYearRange } from "@/lib/utils";

type TabId = "description" | "caracteristiques" | "compatibilites" | "avis";

export function ProductTabs({ product }: { product: Product }) {
  const t = useTranslations("product");
  const tBody = useTranslations("bodyTypes");
  const tSide = useTranslations("sides");
  const [tab, setTab] = useState<TabId>("description");
  const tabs: { id: TabId; label: string }[] = [
    { id: "description", label: t("tabDescription") },
    { id: "caracteristiques", label: t("tabSpecs") },
    { id: "compatibilites", label: t("tabCompat") },
    { id: "avis", label: t("tabReviews") },
  ];

  return (
    <section className="rounded-lg border border-line bg-white">
      <div role="tablist" className="flex overflow-x-auto border-b border-line">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "-mb-px shrink-0 border-b-2 px-4 py-3 text-sm font-semibold whitespace-nowrap transition sm:px-6",
              tab === t.id ? "border-brand text-brand" : "border-transparent text-ink hover:text-brand",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="p-4 text-sm leading-relaxed text-ink-700 sm:p-6">
        {tab === "description" && (
          <div className="space-y-4">
            <p>{product.description}</p>
            {product.options.length > 0 && (
              <ul className="list-inside list-disc space-y-1 text-ink-700">
                {product.options.map((o) => <li key={o}>{o}</li>)}
              </ul>
            )}
          </div>
        )}
        {tab === "caracteristiques" && (
          <dl className="grid gap-x-8 sm:grid-cols-2">
            {[
              [t("specReference"), product.reference],
              [t("specBrand"), product.brand],
              [t("specSide"), product.side ? tSide(product.side) : "—"],
              [t("specOem"), product.oemNumbers.join(", ")],
              [t("specOptions"), product.options.join(", ") || "—"],
              [t("specCondition"), t("new")],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-line py-3">
                <dt className="shrink-0 text-muted">{k}</dt>
                <dd className="min-w-0 text-right font-semibold break-words text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        )}
        {tab === "compatibilites" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface text-xs tracking-wide text-muted uppercase">
                <tr>
                  <th className="px-4 py-3">{t("colMake")}</th>
                  <th className="px-4 py-3">{t("colModel")}</th>
                  <th className="px-4 py-3">{t("colYears")}</th>
                  <th className="px-4 py-3">{t("colBody")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {product.compatibilities.map((c, i) => (
                  <tr key={i}>
                    <td className="px-4 py-3 font-semibold">{c.make}</td>
                    <td className="px-4 py-3">{c.model}</td>
                    <td className="px-4 py-3">{formatYearRange(c.yearFrom, c.yearTo)}</td>
                    <td className="px-4 py-3">{c.bodyType ? tBody(c.bodyType) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-xs text-muted">{t("compatNote")}</p>
          </div>
        )}
        {tab === "avis" && (
          <div className="flex flex-col items-center py-6 text-center">
            <MessageSquare className="h-8 w-8 text-line" aria-hidden />
            <p className="mt-3 font-semibold text-ink">{t("noReviews")}</p>
            <p className="mt-1 max-w-sm text-muted">{t("noReviewsText")}</p>
          </div>
        )}
      </div>
    </section>
  );
}
