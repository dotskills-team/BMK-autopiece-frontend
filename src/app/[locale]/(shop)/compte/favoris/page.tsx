import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FavoritesList } from "@/features/favorites/favorites-list";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "account" });
  return { title: t("favorites"), robots: { index: false } };
}

export default async function FavoritesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("account");
  return (
    <div className="container-page py-8 sm:py-10">
      <h1 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">{t("favorites")}</h1>
      <p className="mt-1 mb-6 text-sm text-muted">{t("favoritesText")}</p>
      <FavoritesList />
    </div>
  );
}
