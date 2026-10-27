"use client";

import { useTranslations } from "next-intl";
import { Trash2 } from "lucide-react";
import { EmptyState, PriceTag, ProductVisual, StockBadge } from "@/components/shared";
import { buttonClasses } from "@/components/ui/button";
import { useHydrated } from "@/hooks/use-hydrated";
import { Link } from "@/i18n/navigation";
import { useFavorites } from "./store";

export function FavoritesList() {
  const t = useTranslations("account");
  const tCart = useTranslations("cart");
  const hydrated = useHydrated();
  const { items, remove } = useFavorites();

  if (!hydrated) return <div className="h-40 animate-pulse rounded-lg bg-surface" />;
  if (items.length === 0)
    return (
      <EmptyState
        title={t("favoritesEmptyTitle")}
        text={t("favoritesEmptyText")}
        action={<Link href="/recherche" className={buttonClasses("primary")}>{tCart("discover")}</Link>}
      />
    );

  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <li key={item.id} className="relative flex flex-col rounded-lg border border-line bg-white p-3">
          <button onClick={() => remove(item.id)} aria-label={t("removeFavorite")} className="absolute top-2 right-2 z-10 rounded-md bg-white p-1.5 text-ink hover:text-brand">
            <Trash2 className="h-4 w-4" />
          </button>
          <Link href={`/produit/${item.slug}`}>
            <ProductVisual categorySlug={item.categorySlug} className="aspect-[4/3]" />
          </Link>
          <Link href={`/produit/${item.slug}`} className="mt-3 line-clamp-2 text-[13px] font-semibold text-ink hover:text-brand">{item.name}</Link>
          <PriceTag value={item.priceTTC} size="sm" className="mt-2" />
          <div className="mt-1"><StockBadge status={item.stock} /></div>
        </li>
      ))}
    </ul>
  );
}
