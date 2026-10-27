"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function SearchBar({ className }: { className?: string }) {
  const t = useTranslations("search");
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        router.push(q.trim() ? `/recherche?q=${encodeURIComponent(q.trim())}` : "/recherche");
      }}
      className={cn("flex h-10 w-full overflow-hidden rounded-md bg-white ring-1 ring-white/10 focus-within:ring-2 focus-within:ring-brand", className)}
    >
      <label htmlFor="global-search" className="sr-only">{t("label")}</label>
      <input
        id="global-search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t("placeholder")}
        className="min-w-0 flex-1 px-4 text-sm text-ink placeholder:text-muted focus:outline-none"
      />
      <button type="submit" aria-label={t("submit")} className="flex w-12 items-center justify-center bg-brand text-white transition hover:bg-brand-600">
        <Search className="h-5 w-5" />
      </button>
    </form>
  );
}
