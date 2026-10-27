import type { Metadata } from "next";
import { getPathname } from "./navigation";
import { routing, type Locale } from "./routing";

/**
 * Canonical URL + hreflang alternates for a page, e.g. alternatesFor("/categories", "en")
 * -> canonical "/en/categories", languages { fr: "/categories", en: "/en/categories", x-default: "/categories" }.
 */
export function alternatesFor(href: string, locale: Locale): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = getPathname({ href, locale: l });
  languages["x-default"] = getPathname({ href, locale: routing.defaultLocale });
  return { canonical: getPathname({ href, locale }), languages };
}
