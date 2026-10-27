import type { Metadata } from "next";
import { Car, Heart, MapPin, Package, User } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { EmptyState } from "@/components/shared";
import { buttonClasses } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "account" });
  return { title: t("title"), robots: { index: false } };
}

export default async function AccountPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("account");

  const menu = [
    { icon: Package, label: t("orders"), href: "/compte" },
    { icon: Car, label: t("garage"), href: "/compte/garage" },
    { icon: MapPin, label: t("addresses"), href: "/compte" },
    { icon: Heart, label: t("favorites"), href: "/compte/favoris" },
    { icon: User, label: t("loginRegister"), href: "/compte/connexion" },
  ];

  return (
    <div className="container-page py-8 sm:py-10">
      <h1 className="font-display text-2xl font-black tracking-tight uppercase sm:text-3xl">{t("title")}</h1>
      <div className="mt-6 grid gap-6 sm:mt-8 lg:grid-cols-[260px_1fr] lg:gap-8">
        <nav aria-label={t("navLabel")} className="space-y-1">
          {menu.map((m) => (
            <Link key={m.label} href={m.href} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-ink hover:bg-surface">
              <m.icon className="h-4 w-4 text-brand" /> {m.label}
            </Link>
          ))}
        </nav>
        <section>
          <h2 className="mb-4 font-display text-lg font-extrabold">{t("orders")}</h2>
          <EmptyState
            title={t("loginToSee")}
            text={t("loginToSeeText")}
            action={<Link href="/compte/connexion" className={buttonClasses("primary")}>{t("login")}</Link>}
          />
        </section>
      </div>
    </div>
  );
}
