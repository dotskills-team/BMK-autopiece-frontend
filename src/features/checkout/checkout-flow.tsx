"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { CreditCard, Lock } from "lucide-react";
import { z } from "zod";
import { EmptyState } from "@/components/shared";
import { Button, buttonClasses } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/form-controls";
import { OrderSummary } from "@/features/cart/cart-page";
import { useCart } from "@/features/cart/store";
import { useHydrated } from "@/hooks/use-hydrated";
import { cn } from "@/lib/utils";

// Error messages are message keys (namespace "checkout"), translated when displayed.
const addressSchema = z.object({
  email: z.string().email("errorEmail"),
  firstName: z.string().min(1, "errorRequired"),
  lastName: z.string().min(1, "errorRequired"),
  address: z.string().min(3, "errorRequired"),
  postalCode: z.string().regex(/^\d{5}$/, "errorPostalCode"),
  city: z.string().min(1, "errorRequired"),
  phone: z.string().regex(/^(\+33|0)[1-9](\s?\d{2}){4}$/, "errorPhone"),
});
type Address = z.infer<typeof addressSchema>;
type ErrorKey = "errorEmail" | "errorRequired" | "errorPostalCode" | "errorPhone";
type Errors = Partial<Record<keyof Address, ErrorKey>>;

const steps = ["stepDelivery", "stepPayment", "stepConfirmation"] as const;

function Steps({ current }: { current: number }) {
  const t = useTranslations("checkout");
  return (
    <ol className="mb-6 flex items-center gap-2 text-xs sm:mb-8 sm:gap-3 sm:text-sm">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-2 sm:gap-3">
          <span className={cn("flex h-7 w-7 shrink-0 items-center sm:h-8 sm:w-8 justify-center rounded-full font-bold", i <= current ? "bg-brand text-white" : "bg-surface text-muted")}>{i + 1}</span>
          <span className={cn(i <= current ? "font-semibold text-ink" : "text-muted", i !== current && "hidden sm:inline")}>{t(s)}</span>
          {i < steps.length - 1 && <span className="h-px w-5 bg-line sm:w-16" />}
        </li>
      ))}
    </ol>
  );
}

// Field labels use the field name as message key (namespace "checkout").
const fields: { name: keyof Address; type?: string; autoComplete: string; full?: boolean }[] = [
  { name: "email", type: "email", autoComplete: "email", full: true },
  { name: "firstName", autoComplete: "given-name" },
  { name: "lastName", autoComplete: "family-name" },
  { name: "address", autoComplete: "street-address", full: true },
  { name: "postalCode", autoComplete: "postal-code" },
  { name: "city", autoComplete: "address-level2" },
  { name: "phone", type: "tel", autoComplete: "tel", full: true },
];

export function CheckoutFlow() {
  const t = useTranslations("checkout");
  const tCart = useTranslations("cart");
  const hydrated = useHydrated();
  const router = useRouter();
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Record<keyof Address, string>>({ email: "", firstName: "", lastName: "", address: "", postalCode: "", city: "", phone: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  if (!hydrated) return <div className="h-64 animate-pulse rounded-2xl bg-surface" />;
  if (items.length === 0)
    return <EmptyState title={tCart("emptyTitle")} text={t("emptyText")} action={<Link href="/recherche" className={buttonClasses("primary")}>{tCart("discover")}</Link>} />;

  function submitAddress(e: React.FormEvent) {
    e.preventDefault();
    const parsed = addressSchema.safeParse(form);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) next[issue.path[0] as keyof Address] ??= issue.message as ErrorKey;
      setErrors(next);
      return;
    }
    setErrors({});
    setStep(1);
  }

  function pay() {
    // TODO: create the order + Stripe PaymentIntent on the backend, then confirm
    // with Stripe Payment Element. The order is marked "paid" ONLY by the webhook.
    clear();
    router.push("/commande/confirmation");
  }

  return (
    <>
      <Steps current={step} />
      <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:gap-8">
        <div className="rounded-2xl border border-line bg-white p-4 sm:p-6">
          {step === 0 ? (
            <form onSubmit={submitAddress} noValidate className="grid gap-4 sm:grid-cols-2">
              <h2 className="font-display text-lg font-extrabold sm:col-span-2">{t("shippingAddress")}</h2>
              {fields.map((f) => (
                <div key={f.name} className={f.full ? "sm:col-span-2" : undefined}>
                  <Label htmlFor={f.name}>{t(f.name)}</Label>
                  <Input
                    id={f.name}
                    type={f.type ?? "text"}
                    autoComplete={f.autoComplete}
                    value={form[f.name]}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    aria-invalid={!!errors[f.name]}
                    aria-describedby={errors[f.name] ? `${f.name}-error` : undefined}
                    className={errors[f.name] ? "border-brand" : undefined}
                  />
                  {errors[f.name] && <p id={`${f.name}-error`} className="mt-1 text-xs text-brand">{t(errors[f.name]!)}</p>}
                </div>
              ))}
              <Button type="submit" size="lg" className="sm:col-span-2">{t("continue")}</Button>
            </form>
          ) : (
            <div className="space-y-5">
              <h2 className="font-display text-lg font-extrabold">{t("payment")}</h2>
              <div className="rounded-xl border-2 border-dashed border-line p-6 text-center text-sm text-muted">
                <CreditCard className="mx-auto mb-3 h-8 w-8" />
                {t("paymentPlaceholder")}
                <br />{t("toConnect")}
              </div>
              <label className="flex items-start gap-3 text-sm">
                <input type="checkbox" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} className="mt-0.5 h-4 w-4 accent-brand" />
                <span>
                  {t.rich("acceptTerms", { link: (c) => <Link href="/cgv" className="font-semibold underline">{c}</Link> })}
                </span>
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button variant="outline" onClick={() => setStep(0)}>{t("back")}</Button>
                {/* French law: the button must clearly state the obligation to pay */}
                <Button size="lg" className="h-auto min-h-13 flex-1 py-3 text-center text-sm sm:text-base" disabled={!acceptedTerms} onClick={pay}>
                  <Lock className="h-4 w-4 shrink-0" /> {t("pay")}
                </Button>
              </div>
            </div>
          )}
        </div>
        <OrderSummary />
      </div>
    </>
  );
}
