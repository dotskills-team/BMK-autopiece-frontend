import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MyGarage } from "@/features/account/my-garage";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "account" });
  return { title: t("garage"), robots: { index: false } };
}

export default async function GaragePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("account");
  return (
    <div className="container-page py-8 sm:py-10">
      <h1 className="font-display text-2xl font-black tracking-tight uppercase sm:text-3xl">{t("garage")}</h1>
      <p className="mt-2 mb-6 text-sm text-muted sm:mb-8 sm:text-base">{t("garageText")}</p>
      <MyGarage />
    </div>
  );
}
