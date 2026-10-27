import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Inter, Montserrat } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/i18n/metadata";
import { localeTags, routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/constants/site";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", weight: ["600", "700", "800", "900"], display: "swap" });

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t("defaultTitle", { name: siteConfig.name }),
      template: `%s | ${siteConfig.name}`,
    },
    description: t("description"),
    openGraph: {
      type: "website",
      locale: localeTags[locale].og,
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => localeTags[l].og),
      siteName: siteConfig.name,
      url: siteConfig.url,
    },
    alternates: alternatesFor("/", locale),
  };
}

export const viewport: Viewport = {
  themeColor: "#0b0b0d",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.contact.email,
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("common");

  return (
    <html lang={locale} className={`${inter.variable} ${montserrat.variable}`}>
      <body>
        <NextIntlClientProvider>
          <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">
            {t("skipToContent")}
          </a>
          {children}
        </NextIntlClientProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      </body>
    </html>
  );
}
