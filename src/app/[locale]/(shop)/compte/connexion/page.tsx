import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AuthForms } from "@/features/account/auth-forms";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "account" });
  return { title: t("loginTitle"), robots: { index: false } };
}

export default async function LoginPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("account");
  return (
    <div className="container-page max-w-4xl py-8 sm:py-10">
      <h1 className="mb-6 font-display text-2xl font-black tracking-tight uppercase sm:mb-8 sm:text-3xl">{t("loginTitle")}</h1>
      <AuthForms />
    </div>
  );
}
