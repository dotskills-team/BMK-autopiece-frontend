import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CheckoutFlow } from "@/features/checkout/checkout-flow";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "checkout" });
  return { title: t("title"), robots: { index: false } };
}

export default async function CheckoutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("checkout");
  return (
    <div className="container-page py-8 sm:py-10">
      <h1 className="mb-6 font-display text-2xl font-black tracking-tight uppercase sm:mb-8 sm:text-3xl">{t("title")}</h1>
      <CheckoutFlow />
    </div>
  );
}
