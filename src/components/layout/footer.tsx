import { useTranslations } from "next-intl";
import { Logo } from "@/components/shared";
import { Link } from "@/i18n/navigation";
import { footerLinks, siteConfig } from "@/lib/constants/site";
import { NewsletterForm } from "./newsletter-form";

/** Card brand marks (simplified, no external assets). */
function PaymentMarks() {
  const badge = "flex h-6 w-10 items-center justify-center rounded bg-white";
  return (
    <>
      <li className={badge}><span className="text-[10px] font-black text-[#1a1f71] italic">VISA</span></li>
      <li className={badge}>
        <span className="flex" aria-label="Mastercard">
          <span className="h-3.5 w-3.5 rounded-full bg-[#eb001b]" />
          <span className="-ml-1.5 h-3.5 w-3.5 rounded-full bg-[#f79e1b]/90" />
        </span>
      </li>
      <li className={badge}><span className="text-[9px] font-black text-[#003087] italic">Pay<span className="text-[#009cde]">Pal</span></span></li>
      <li className={badge}><span className="text-[9px] font-bold text-ink">CB</span></li>
    </>
  );
}

export function Footer() {
  const t = useTranslations();
  return (
    <footer className="bg-ink text-white">
      <div className="container-page grid grid-cols-2 gap-x-6 gap-y-8 py-10 sm:py-12 md:grid-cols-4 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1.6fr]">
        <div className="col-span-2 md:col-span-4 lg:col-span-1">
          <Logo />
        </div>
        {(
          [
            ["account", footerLinks.account],
            ["information", footerLinks.information],
            ["service", footerLinks.service],
          ] as const
        ).map(([title, links]) => (
          <div key={title}>
            <h3 className="mb-3 text-sm font-bold">{t(`footer.${title}`)}</h3>
            <ul className="space-y-1.5 text-xs text-white/65">
              {links.map((l) => (
                <li key={l.href + l.key}>
                  <Link href={l.href} className="transition hover:text-white">{t(`footer.links.${l.key}`)}</Link>
                </li>
              ))}
              {title === "service" && (
                <li>
                  <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="transition hover:text-white">{siteConfig.contact.phone}</a>
                </li>
              )}
            </ul>
          </div>
        ))}
        <div className="col-span-2 md:col-span-4 lg:col-span-1">
          <h3 className="text-sm font-bold">{t("footer.newsletterTitle")}</h3>
          <p className="mt-1 mb-3 text-xs text-white/65">{t("footer.newsletterText")}</p>
          <NewsletterForm />
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-4 py-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>{t("footer.rights", { year: new Date().getFullYear(), name: siteConfig.name })}</p>
          <ul className="flex flex-wrap items-center gap-2" aria-label={t("footer.paymentMethods")}>
            <PaymentMarks />
          </ul>
        </div>
      </div>
    </footer>
  );
}
