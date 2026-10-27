import { defineRouting } from "next-intl/routing";

// Supported languages. To add one: add it here, create messages/<locale>.json
// (same keys as fr.json) and add its translations in lib/mock/translations.ts.
export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  // French stays at "/", other languages are prefixed ("/en/...")
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

/** BCP-47 tags used for Intl formatting and OpenGraph. */
export const localeTags: Record<Locale, { intl: string; og: string; label: string }> = {
  fr: { intl: "fr-FR", og: "fr_FR", label: "Français" },
  en: { intl: "en-GB", og: "en_GB", label: "English" },
};
