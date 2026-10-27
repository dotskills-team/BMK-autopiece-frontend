"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ShoppingBag, X } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { PriceTag } from "@/components/shared";
import { useHydrated } from "@/hooks/use-hydrated";
import { cartSubtotal, useCart } from "./store";
import { CartLine } from "./cart-line";

export function CartDrawer() {
  const t = useTranslations("cart");
  const hydrated = useHydrated();
  const { items, isOpen, close } = useCart();
  if (!hydrated || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={t("title")}>
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={close} />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex h-16 items-center justify-between border-b border-line px-5">
          <h2 className="font-display text-lg font-extrabold">{t("title")}</h2>
          <button onClick={close} aria-label={t("close")} className="rounded-lg p-2 hover:bg-surface">
            <X className="h-5 w-5" />
          </button>
        </div>
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <ShoppingBag className="h-12 w-12 text-line" />
            <p className="text-sm text-muted">{t("empty")}</p>
            <Link href="/recherche" onClick={close} className={buttonClasses("primary")}>{t("discover")}</Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
              {items.map((item) => <CartLine key={item.productId} item={item} />)}
            </ul>
            <div className="space-y-4 border-t border-line p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">{t("subtotal")}</span>
                <PriceTag value={cartSubtotal(items)} size="md" />
              </div>
              <Link href="/panier" onClick={close} className={buttonClasses("dark", "md", "w-full")}>{t("viewCart")}</Link>
              <Link href="/commande" onClick={close} className={buttonClasses("primary", "md", "w-full")}>{t("checkout")}</Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
