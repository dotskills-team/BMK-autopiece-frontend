"use client";

import { useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeTags, routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/** FR / EN toggle. Keeps the current page, query string and hash. */
export function LanguageSwitcher({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const t = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function change(next: Locale) {
    if (next === locale) return;
    const query = searchParams.toString();
    startTransition(() => {
      router.replace(`${pathname}${query ? `?${query}` : ""}${window.location.hash}`, { locale: next, scroll: false });
    });
  }

  return (
    <div
      role="group"
      aria-label={t("switchLanguage")}
      className={cn(
        "inline-flex items-center gap-0.5 rounded-lg p-0.5 text-xs font-bold",
        tone === "dark" ? "bg-white/5 ring-1 ring-white/10" : "bg-surface ring-1 ring-line",
        pending && "opacity-60",
        className,
      )}
    >
      <Globe className={cn("mx-1 h-3.5 w-3.5", tone === "dark" ? "text-white/60" : "text-muted")} aria-hidden />
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          onClick={() => change(l)}
          aria-pressed={l === locale}
          aria-label={localeTags[l].label}
          className={cn(
            "rounded-md px-2 py-1 uppercase transition",
            l === locale
              ? "bg-brand text-white"
              : tone === "dark"
                ? "text-white/70 hover:text-white"
                : "text-muted hover:text-ink",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
