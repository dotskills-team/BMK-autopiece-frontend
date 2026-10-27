"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/form-controls";

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(1) });
const registerSchema = z.object({ email: z.string().email(), password: z.string().min(8) });

function AuthForm({ mode }: { mode: "login" | "register" }) {
  const t = useTranslations("account");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const schema = mode === "login" ? loginSchema : registerSchema;

  return (
    <form
      noValidate
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (!schema.safeParse({ email, password }).success) {
          setError(mode === "login" ? t("loginError") : t("registerError"));
          return;
        }
        setError("");
        // TODO: call the auth endpoint of the backend (e.g. Medusa customer auth).
      }}
    >
      <div>
        <Label htmlFor={`${mode}-email`}>{t("email")}</Label>
        <Input id={`${mode}-email`} type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <Label htmlFor={`${mode}-password`}>{t("password")}</Label>
        <Input id={`${mode}-password`} type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {error && <p className="text-xs text-brand" role="alert">{error}</p>}
      <Button type="submit" variant={mode === "login" ? "primary" : "dark"} className="w-full">
        {mode === "login" ? t("login") : t("createAccount")}
      </Button>
    </form>
  );
}

export function AuthForms() {
  const t = useTranslations("account");
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <section className="rounded-2xl border border-line bg-white p-6">
        <h2 className="mb-5 font-display text-lg font-extrabold">{t("existingCustomer")}</h2>
        <AuthForm mode="login" />
      </section>
      <section className="rounded-2xl border border-line bg-surface/60 p-6">
        <h2 className="mb-5 font-display text-lg font-extrabold">{t("newCustomer")}</h2>
        <AuthForm mode="register" />
      </section>
    </div>
  );
}
