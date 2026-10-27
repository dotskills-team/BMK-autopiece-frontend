"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

const KEY = "mapieceauto-cookie-consent";

/**
 * GDPR cookie consent. Analytics must only load after "accepted".
 * "Refuser" must be as easy as "Accepter" (CNIL guidance).
 */
export function CookieBanner() {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(!localStorage.getItem(KEY));
    } catch {
      setVisible(true);
    }
  }, []);

  const choose = (value: "accepted" | "refused") => {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* storage unavailable */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div role="dialog" aria-label={t("label")} className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-2xl bg-ink p-4 sm:inset-x-4 sm:bottom-4 sm:p-5 text-white shadow-2xl sm:flex sm:items-center sm:gap-6">
      <p className="text-sm text-white/80">
        {t("text")}{" "}
        <Link href="/cookies" className="underline hover:text-white">{t("more")}</Link>
      </p>
      <div className="mt-4 flex shrink-0 gap-2 sm:mt-0">
        <Button variant="outline" size="sm" className="flex-1 border-white/20 sm:flex-none bg-transparent text-white hover:border-white" onClick={() => choose("refused")}>
          {t("refuse")}
        </Button>
        <Button size="sm" className="flex-1 sm:flex-none" onClick={() => choose("accepted")}>{t("accept")}</Button>
      </div>
    </div>
  );
}
