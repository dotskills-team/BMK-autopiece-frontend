"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Heart, Minus, Plus, Share2, ShoppingCart } from "lucide-react";
import type { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/features/cart/store";
import { useFavorites } from "@/features/favorites/store";
import { useHydrated } from "@/hooks/use-hydrated";
import { cn } from "@/lib/utils";

type CartProduct = Pick<Product, "id" | "slug" | "name" | "reference" | "priceTTC" | "stock" | "categorySlug" | "compatibilities">;

const vehicleOf = (p: CartProduct) => {
  const c = p.compatibilities[0];
  return c ? `${c.make} ${c.model}` : undefined;
};

const toItem = (p: CartProduct) => ({
  productId: p.id,
  slug: p.slug,
  name: p.name,
  reference: p.reference,
  priceTTC: p.priceTTC,
  categorySlug: p.categorySlug,
  vehicleLabel: vehicleOf(p),
});

/** Small square button used on product cards. Out-of-stock parts can still be ordered ("sur commande"). */
export function AddToCartIconButton({ product }: { product: CartProduct }) {
  const add = useCart((s) => s.add);
  const t = useTranslations("product");
  return (
    <button
      onClick={() => add(toItem(product))}
      aria-label={t("addAria", { name: product.name })}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand text-white transition hover:bg-brand-600"
    >
      <ShoppingCart className="h-4 w-4" />
    </button>
  );
}

/** Quantity selector + main CTA used on the product page. */
export function AddToCartPanel({ product, className }: { product: CartProduct; className?: string }) {
  const add = useCart((s) => s.add);
  const t = useTranslations("product");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <div className={cn("flex gap-3", className)}>
      <div className="flex h-11 shrink-0 items-center rounded-md border border-line bg-white">
        <button aria-label={t("decrease")} className="px-3 text-muted hover:text-ink" onClick={() => setQty((q) => Math.max(1, q - 1))}>
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-8 text-center text-sm font-semibold">{qty}</span>
        <button aria-label={t("increase")} className="px-3 text-muted hover:text-ink" onClick={() => setQty((q) => Math.min(99, q + 1))}>
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <Button
        className="min-w-0 flex-1"
        onClick={() => {
          add(toItem(product), qty);
          setAdded(true);
          setTimeout(() => setAdded(false), 2000);
        }}
      >
        {added ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
        {added ? t("added") : t("addToCart")}
      </Button>
    </div>
  );
}

/** "Ajouter à ma liste" + "Partager" links under the buy button. */
export function ProductActions({ product }: { product: CartProduct & { stock: Product["stock"] } }) {
  const t = useTranslations("product");
  const hydrated = useHydrated();
  const toggle = useFavorites((s) => s.toggle);
  const inList = useFavorites((s) => s.items.some((i) => i.id === product.id)) && hydrated;
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* share dialog dismissed */
    }
  }

  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-2 text-sm">
      <button
        type="button"
        aria-pressed={inList}
        onClick={() =>
          toggle({ id: product.id, slug: product.slug, name: product.name, priceTTC: product.priceTTC, categorySlug: product.categorySlug, stock: product.stock, vehicleLabel: vehicleOf(product) })
        }
        className={cn("inline-flex items-center gap-2 font-medium transition hover:text-brand", inList ? "text-brand" : "text-ink")}
      >
        <Heart className={cn("h-4 w-4", inList && "fill-brand")} aria-hidden /> {inList ? t("inList") : t("addToList")}
      </button>
      <button type="button" onClick={share} className="inline-flex items-center gap-2 font-medium text-ink transition hover:text-brand">
        <Share2 className="h-4 w-4" aria-hidden /> {copied ? t("linkCopied") : t("share")}
      </button>
    </div>
  );
}
