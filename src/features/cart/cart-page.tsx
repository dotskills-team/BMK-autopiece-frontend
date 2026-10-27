"use client";

import { useLocale, useTranslations } from "next-intl";
import { Headset, Lock, Truck } from "lucide-react";
import { Commitments, EmptyState } from "@/components/shared";
import { buttonClasses } from "@/components/ui/button";
import { useHydrated } from "@/hooks/use-hydrated";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/constants/site";
import { formatPrice } from "@/lib/utils";
import { CartTableRow } from "./cart-line";
import { cartCount, cartSubtotal, useCart } from "./store";

export function getShipping(subtotal: number) {
  // Placeholder rule — real shipping costs depend on the supplier (bulky parts!).
  return subtotal >= siteConfig.delivery.freeShippingThreshold || subtotal === 0 ? 0 : 9.9;
}

/** Totals block: sous-total, livraison, total TTC (+ optional CTA). */
export function OrderSummary({ cta, title = true, className }: { cta?: React.ReactNode; title?: boolean; className?: string }) {
  const items = useCart((s) => s.items);
  const subtotal = cartSubtotal(items);
  const shipping = getShipping(subtotal);
  const t = useTranslations("cart");
  const locale = useLocale();
  return (
    <aside className={className ?? "rounded-lg border border-line bg-white p-5 lg:sticky lg:top-40 lg:self-start"}>
      {title && <h2 className="mb-4 font-display text-lg font-extrabold">{t("summary")}</h2>}
      <dl className="space-y-2.5 text-sm">
        <div className="flex justify-between"><dt className="text-muted">{t("subtotal")}</dt><dd>{formatPrice(subtotal, locale)}</dd></div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted">
            {t("shipping")} <span className="text-xs">{t("shippingFreeFrom", { amount: formatPrice(siteConfig.delivery.freeShippingThreshold, locale) })}</span>
          </dt>
          <dd className="shrink-0">{formatPrice(shipping, locale)}</dd>
        </div>
        <div className="flex items-baseline justify-between border-t border-line pt-3">
          <dt className="font-bold">{t("total")}</dt>
          <dd className="font-display text-xl font-extrabold">{formatPrice(subtotal + shipping, locale)}</dd>
        </div>
      </dl>
      {cta && <div className="mt-4">{cta}</div>}
    </aside>
  );
}

export function CartPageContent() {
  const t = useTranslations("cart");
  const tc = useTranslations("commitments");
  const hydrated = useHydrated();
  const items = useCart((s) => s.items);

  const heading = (
    <h1 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
      {t("title")} {hydrated && items.length > 0 && <span className="text-base font-semibold text-muted sm:text-lg">{t("count", { count: cartCount(items) })}</span>}
    </h1>
  );

  if (!hydrated) return <>{heading}<div className="mt-6 h-64 animate-pulse rounded-lg bg-surface" /></>;

  if (items.length === 0)
    return (
      <>
        {heading}
        <div className="mt-6">
          <EmptyState title={t("emptyTitle")} text={t("emptyText")} action={<Link href="/recherche" className={buttonClasses("primary")}>{t("discover")}</Link>} />
        </div>
      </>
    );

  return (
    <>
      {heading}
      <div className="mt-6">
        <div className="hidden grid-cols-[minmax(0,2.4fr)_1fr_1fr_1fr_32px] gap-4 border-b border-line pb-2 text-xs font-semibold text-ink sm:grid">
          <span>{t("colProduct")}</span>
          <span>{t("colUnitPrice")}</span>
          <span>{t("colQuantity")}</span>
          <span>{t("colTotal")}</span>
          <span />
        </div>
        <ul className="divide-y divide-line border-b border-line">
          {items.map((item) => <CartTableRow key={item.productId} item={item} />)}
        </ul>
        <div className="mt-5 flex justify-end">
          <OrderSummary
            title={false}
            className="w-full sm:w-96"
            cta={<Link href="/commande" className={buttonClasses("primary", "md", "w-full")}>{t("checkout")}</Link>}
          />
        </div>
      </div>
      <Commitments
        className="mt-10 border-t border-line pt-8"
        items={[
          { icon: Truck, title: tc("delivery"), text: "24/48h" },
          { icon: Lock, title: tc("payment"), text: tc("paymentText") },
          { icon: Headset, title: tc("service"), text: tc("serviceText") },
        ]}
      />
    </>
  );
}
