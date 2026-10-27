import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/constants/site";

const privatePaths = ["/panier", "/commande", "/compte"];

export default function robots(): MetadataRoute.Robots {
  // Block private pages in every locale ("/panier", "/en/panier", ...)
  const prefixes = ["", ...routing.locales.filter((l) => l !== routing.defaultLocale).map((l) => `/${l}`)];
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: prefixes.flatMap((p) => privatePaths.map((path) => `${p}${path}`)) }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
