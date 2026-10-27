"use client";

import { useLocale, useTranslations } from "next-intl";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem } from "@/types";
import { ProductVisual } from "@/components/shared";
import { Link } from "@/i18n/navigation";
import { cn, formatPrice } from "@/lib/utils";
import { useCart } from "./store";

function QuantityStepper({ item, className }: { item: CartItem; className?: string }) {
  const setQuantity = useCart((s) => s.setQuantity);
  const t = useTranslations("cart");
  return (
    <div className={cn("inline-flex h-8 items-center", className)}>
      <button aria-label={t("decrease")} className="px-2 text-ink hover:text-brand" onClick={() => setQuantity(item.productId, item.quantity - 1)}>
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="w-8 text-center text-sm font-semibold" aria-live="polite">{item.quantity}</span>
      <button aria-label={t("increase")} className="px-2 text-ink hover:text-brand" onClick={() => setQuantity(item.productId, item.quantity + 1)}>
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function RemoveButton({ item }: { item: CartItem }) {
  const remove = useCart((s) => s.remove);
  const t = useTranslations("cart");
  return (
    <button aria-label={t("remove")} onClick={() => remove(item.productId)} className="-m-1.5 p-1.5 text-ink hover:text-brand">
      <Trash2 className="h-4 w-4" />
    </button>
  );
}

/** Compact line used in the cart drawer. */
export function CartLine({ item }: { item: CartItem }) {
  const locale = useLocale();
  return (
    <li className="flex gap-3 py-4">
      <Link href={`/produit/${item.slug}`} className="w-20 shrink-0">
        <ProductVisual categorySlug={item.categorySlug} size="sm" className="border border-line" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <Link href={`/produit/${item.slug}`} className="line-clamp-2 text-sm font-semibold text-ink hover:text-brand">{item.name}</Link>
        {item.vehicleLabel && <p className="mt-0.5 text-xs text-muted">{item.vehicleLabel}</p>}
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <QuantityStepper item={item} className="-ml-2" />
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold">{formatPrice(item.priceTTC * item.quantity, locale)}</span>
            <RemoveButton item={item} />
          </div>
        </div>
      </div>
    </li>
  );
}

/** Table row used on the cart page (stacks on mobile). */
export function CartTableRow({ item }: { item: CartItem }) {
  const locale = useLocale();
  return (
    <li className="grid grid-cols-[64px_1fr_auto] items-center gap-x-3 gap-y-2 py-3 sm:grid-cols-[minmax(0,2.4fr)_1fr_1fr_1fr_32px] sm:gap-4">
      <div className="contents sm:flex sm:items-center sm:gap-4">
        <Link href={`/produit/${item.slug}`} className="row-span-2 w-16 shrink-0 sm:row-span-1">
          <ProductVisual categorySlug={item.categorySlug} size="sm" />
        </Link>
        <div className="min-w-0">
          <Link href={`/produit/${item.slug}`} className="line-clamp-2 text-sm font-semibold text-ink hover:text-brand">{item.name.replace(item.vehicleLabel ? ` ${item.vehicleLabel}` : "", "")}</Link>
          {item.vehicleLabel && <p className="text-xs text-muted">{item.vehicleLabel}</p>}
        </div>
      </div>
      <p className="hidden text-sm sm:block">{formatPrice(item.priceTTC, locale)}</p>
      <QuantityStepper item={item} className="col-start-2 -ml-2 sm:col-start-auto sm:ml-0" />
      <p className="col-start-3 row-start-1 text-sm font-bold sm:col-start-auto sm:row-start-auto">{formatPrice(item.priceTTC * item.quantity, locale)}</p>
      <div className="col-start-3 row-start-2 justify-self-end sm:col-start-auto sm:row-start-auto">
        <RemoveButton item={item} />
      </div>
    </li>
  );
}
