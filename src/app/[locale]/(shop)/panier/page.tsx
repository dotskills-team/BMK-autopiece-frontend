import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CartPageContent } from "@/features/cart/cart-page";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cart" });
  return { title: t("title"), robots: { index: false } };
}

export default async function CartPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="container-page py-6 sm:py-8">
      <CartPageContent />
    </div>
  );
}
