"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { z } from "zod";

const emailSchema = z.string().email();

export function NewsletterForm() {
  const t = useTranslations("footer");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  return (
    <form
      className="flex w-full flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (!emailSchema.safeParse(email).success) return setStatus("error");
        // TODO: connect to the email service (e.g. Brevo) via the API layer.
        setStatus("done");
        setEmail("");
      }}
    >
      <div className="flex h-10 overflow-hidden rounded-md bg-white">
        <label htmlFor="newsletter" className="sr-only">{t("emailLabel")}</label>
        <input id="newsletter" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("emailPlaceholder")} className="min-w-0 flex-1 px-4 text-sm text-ink focus:outline-none" />
        <button className="shrink-0 bg-brand px-4 text-sm sm:px-5 font-semibold text-white hover:bg-brand-600">{t("subscribe")}</button>
      </div>
      {status === "error" && <p className="text-xs text-red-300">{t("emailError")}</p>}
      {status === "done" && <p className="text-xs text-green-300">{t("emailDone")}</p>}
    </form>
  );
}
