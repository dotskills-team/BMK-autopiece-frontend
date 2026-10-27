"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations("errors");
  return (
    <div className="container-page flex flex-col items-center py-24 text-center">
      <h1 className="font-display text-2xl font-extrabold uppercase">{t("title")}</h1>
      <p className="mt-2 text-muted">{t("text")}</p>
      <Button className="mt-6" onClick={reset}>{t("retry")}</Button>
    </div>
  );
}
