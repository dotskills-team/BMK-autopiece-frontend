"use client";

import { Suspense, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Car, ChevronDown, Headset, Lock, Menu, ShoppingCart, Truck, User, X } from "lucide-react";
import { Logo } from "@/components/shared";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Link, usePathname } from "@/i18n/navigation";
import { SearchBar } from "@/features/search/search-bar";
import { cartCount, useCart } from "@/features/cart/store";
import { useGarage, vehicleLabel } from "@/features/vehicle-search/store";
import { vehicleHref } from "@/features/vehicle-search/vehicle-selector";
import { useHydrated } from "@/hooks/use-hydrated";
import { mainNav } from "@/lib/constants/site";
import { cn } from "@/lib/utils";

function TopLinks() {
  const t = useTranslations();
  return (
    <div className="hidden items-center justify-end gap-5 text-[11px] text-white/75 md:flex">
      <span className="inline-flex items-center gap-1.5"><Headset className="h-3.5 w-3.5" /> {t("header.customerService")}</span>
      <span className="inline-flex items-center gap-1.5"><Truck className="h-3.5 w-3.5" /> {t("site.deliveryLabel")}</span>
      <span className="inline-flex items-center gap-1.5"><Lock className="h-3.5 w-3.5" /> {t("header.securePayment")}</span>
      <Suspense><LanguageSwitcher /></Suspense>
    </div>
  );
}

function GarageChip() {
  const t = useTranslations("header");
  const tBody = useTranslations("bodyTypes");
  const hydrated = useHydrated();
  const current = useGarage((s) => s.current);
  const clear = useGarage((s) => s.clear);
  if (!hydrated || !current) return null;
  return (
    <div className="border-b border-white/10 bg-ink-800">
      <div className="container-page flex h-10 items-center gap-2 text-xs text-white/80 sm:gap-3">
        <Car className="h-4 w-4 shrink-0 text-brand" aria-hidden />
        <span className="hidden shrink-0 sm:inline">{t("myVehicle")}</span>
        <Link href={vehicleHref(current.make, current.model, current.year)} className="min-w-0 truncate font-semibold text-white hover:text-brand">
          {vehicleLabel(current, (b) => tBody(b))}
        </Link>
        <button onClick={clear} className="ml-auto inline-flex shrink-0 items-center gap-1 text-white/60 hover:text-white">
          <X className="h-3.5 w-3.5" /> {t("change")}
        </button>
      </div>
    </div>
  );
}

export function Header() {
  const t = useTranslations("header");
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const hydrated = useHydrated();
  const items = useCart((s) => s.items);
  const openCart = useCart((s) => s.open);
  const count = hydrated ? cartCount(items) : 0;

  // Lock page scroll and close on Escape while the mobile menu is open
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const navLink = (href: string, active: boolean) =>
    cn(
      "relative block px-3 py-3 whitespace-nowrap transition hover:text-white",
      active ? "font-semibold text-white after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-brand" : "text-white/85",
    );

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-ink text-white">
        <div className="container-page pt-2 pb-3 md:pb-2">
          <TopLinks />
          <div className="flex h-12 items-center gap-2 sm:gap-4 md:h-14 lg:gap-8">
            <button className="-ml-2 p-2 lg:hidden" aria-label={t("openMenu")} onClick={() => setMobileOpen(true)}>
              <Menu className="h-6 w-6" />
            </button>
            <Logo />
            <div className="hidden max-w-2xl flex-1 md:block">
              <Suspense><SearchBar /></Suspense>
            </div>
            <nav className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1" aria-label={t("accountAndCart")}>
              <Link href="/compte" aria-label={t("account")} className="flex flex-col items-center gap-0.5 rounded-lg p-2 text-[11px] text-white/85 hover:text-white sm:px-3 sm:py-1">
                <User className="h-5 w-5" /> <span className="hidden sm:block">{t("account")}</span>
              </Link>
              <button onClick={openCart} className="relative flex flex-col items-center gap-0.5 rounded-lg p-2 text-[11px] text-white/85 hover:text-white sm:px-3 sm:py-1" aria-label={t("cartAria", { count })}>
                <ShoppingCart className="h-5 w-5" /> <span className="hidden sm:block">{t("cart")}</span>
                <span className="absolute top-0 right-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-white sm:right-2">{count}</span>
              </button>
            </nav>
          </div>
          <div className="mt-1 md:hidden">
            <Suspense><SearchBar /></Suspense>
          </div>
        </div>
        <nav aria-label={t("categoriesNav")} className="hidden border-t border-white/10 lg:block">
          <ul className="container-page flex items-center text-[13px]">
            <li className="-ml-3"><Link href="/" className={navLink("/", isActive("/"))}>{tCommon("home")}</Link></li>
            {mainNav.map((item) => (
              <li key={item.key}>
                <Link href={item.href} className={navLink(item.href, isActive(item.href))}>{tNav(item.key)}</Link>
              </li>
            ))}
            <li className="ml-auto -mr-3">
              <Link href="/categories" className="inline-flex items-center gap-1 px-3 py-3 text-white/85 hover:text-white">
                {t("more")} <ChevronDown className="h-4 w-4" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <GarageChip />

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label={t("menu")}>
          <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-80 max-w-[85%] flex-col bg-white shadow-2xl">
            <div className="flex h-16 items-center justify-between bg-ink px-4">
              <Logo />
              <button onClick={() => setMobileOpen(false)} aria-label={t("closeMenu")} className="p-2 text-white">
                <X className="h-6 w-6" />
              </button>
            </div>
            <ul className="flex-1 overflow-y-auto py-2">
              <li><Link onClick={() => setMobileOpen(false)} href="/" className="block px-5 py-3 font-semibold">{tCommon("home")}</Link></li>
              {mainNav.map((item) => (
                <li key={item.key}>
                  <Link onClick={() => setMobileOpen(false)} href={item.href} className="block border-t border-line px-5 py-3 text-ink hover:text-brand">{tNav(item.key)}</Link>
                </li>
              ))}
              <li><Link onClick={() => setMobileOpen(false)} href="/categories" className="block border-t border-line px-5 py-3 text-ink hover:text-brand">{t("allCategories")}</Link></li>
            </ul>
            <div className="flex items-center justify-between border-t border-line px-4 pt-4">
              <span className="text-xs font-semibold tracking-wide text-muted uppercase">{tCommon("language")}</span>
              <Suspense><LanguageSwitcher tone="light" /></Suspense>
            </div>
            <div className="grid grid-cols-2 gap-2 p-4">
              <Link onClick={() => setMobileOpen(false)} href="/compte" className="flex items-center justify-center gap-2 rounded-lg border border-line py-2.5 text-sm font-semibold text-ink">
                <User className="h-4 w-4" /> {t("account")}
              </Link>
              <button onClick={() => { setMobileOpen(false); openCart(); }} className="flex items-center justify-center gap-2 rounded-lg bg-brand py-2.5 text-sm font-semibold text-white">
                <ShoppingCart className="h-4 w-4" /> {t("cartWithCount", { count })}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
