import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/shared";
import { useTranslations } from "next-intl";
import { buttonClasses } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("errors");
  return (
    <main className="bg-hero flex min-h-screen flex-col items-center justify-center px-4 text-center text-white">
      <Logo />
      <p className="mt-12 font-display text-8xl font-black text-brand">404</p>
      <h1 className="mt-4 font-display text-2xl font-extrabold uppercase">{t("notFoundTitle")}</h1>
      <p className="mt-2 max-w-md text-white/70">{t("notFoundText")}</p>
      <div className="mt-8 flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:w-auto sm:flex-row">
        <Link href="/" className={buttonClasses("primary")}>{t("backHome")}</Link>
        <Link href="/recherche" className={buttonClasses("outline", "md", "border-white/20 bg-transparent text-white")}>{t("searchPart")}</Link>
      </div>
    </main>
  );
}
