import type { routing } from "@/i18n/routing";
import type messages from "../messages/fr.json";

// Type-safe translations: a missing or misspelled key is a compile error.
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
