import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buttonClasses } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "confirmation" });
  return { title: t("metaTitle"), robots: { index: false } };
}

export default async function ConfirmationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("confirmation");
  return (
    <div className="container-page flex flex-col items-center py-14 text-center sm:py-20">
      <CheckCircle2 className="h-12 w-12 text-success sm:h-14 sm:w-14" />
      <h1 className="mt-5 font-display text-xl font-black uppercase sm:text-2xl">{t("title")}</h1>
      <p className="mt-3 max-w-md text-sm text-muted sm:text-base">{t("text")}</p>
      <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <Link href="/compte" className={buttonClasses("dark")}>{t("track")}</Link>
        <Link href="/" className={buttonClasses("primary")}>{t("backHome")}</Link>
      </div>
    </div>
  );
}
