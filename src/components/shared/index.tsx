import Image from "next/image";
import { CheckCircle2, ChevronRight, Clock } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { CategoryIconKey, Side, StockStatus } from "@/types";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/constants/site";
import { cn, formatPrice } from "@/lib/utils";
import { CarScene } from "./car-scene";
import { ProductArt, artKindFor } from "./product-art";
import { categoryIcons } from "@/lib/constants/category-icons";

// ---------- Logo (text logo until the real one is delivered) ----------
export function Logo({ variant = "light", className }: { variant?: "light" | "dark"; className?: string }) {
  const t = useTranslations("common");
  const [first, ...rest] = siteConfig.name.split(" ");
  return (
    <Link href="/" aria-label={t("homeAria", { name: siteConfig.name })} className={cn("inline-flex shrink-0 items-baseline font-display leading-none font-black tracking-tight", className)}>
      <span className="text-2xl text-brand italic sm:text-3xl">{first}</span>
      <span className={cn("ml-1 text-base sm:text-xl", variant === "light" ? "text-white" : "text-ink")}>{rest.join(" ")}</span>
    </Link>
  );
}

// ---------- Price ----------
export function PriceTag({ value, size = "md", className }: { value: number; size?: "sm" | "md" | "lg"; className?: string }) {
  const t = useTranslations("common");
  const locale = useLocale();
  const sizes = { sm: "text-base", md: "text-xl", lg: "text-2xl sm:text-3xl" };
  return (
    <p className={cn("font-display font-extrabold whitespace-nowrap text-ink", sizes[size], className)}>
      {formatPrice(value, locale)} {size === "lg" && <span className="text-base font-bold text-ink">{t("ttc")}</span>}
    </p>
  );
}

// ---------- Stock ----------
export function StockBadge({ status }: { status: StockStatus }) {
  const t = useTranslations("common");
  if (status === "out_of_stock")
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-warning">
        <Clock className="h-3.5 w-3.5" aria-hidden /> {t("outOfStock")}
      </span>
    );
  return (
    <span className={cn("inline-flex items-center gap-1 text-xs font-semibold", status === "low_stock" ? "text-warning" : "text-success")}>
      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> {status === "low_stock" ? t("lowStock") : t("inStock")}
    </span>
  );
}

// ---------- Breadcrumbs ----------
export function Breadcrumbs({ items, tone = "dark" }: { items: { label: string; href?: string }[]; tone?: "dark" | "light" }) {
  const t = useTranslations("common");
  return (
    <nav aria-label={t("breadcrumb")} className="text-xs">
      <ol className={cn("flex flex-wrap items-center gap-1", tone === "light" ? "text-white/60" : "text-muted")}>
        <li>
          <Link href="/" className="hover:text-brand">{t("home")}</Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1">
            <ChevronRight className="h-3 w-3" aria-hidden />
            {item.href ? (
              <Link href={item.href} className="hover:text-brand">{item.label}</Link>
            ) : (
              <span className={tone === "light" ? "text-white" : "text-ink"} aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// ---------- Section title ----------
export function SectionTitle({ title, eyebrow, action, className }: { title: string; eyebrow?: string; action?: { label: string; href: string }; className?: string }) {
  const t = useTranslations("common");
  return (
    <div className={cn("mb-4 flex items-end justify-between gap-4 sm:mb-5", className)}>
      <div className="min-w-0">
        {eyebrow && <p className="mb-1 text-xs font-bold tracking-[0.2em] text-brand uppercase">{eyebrow}</p>}
        <h2 className="font-display text-lg font-extrabold tracking-tight text-ink sm:text-xl">{title}</h2>
      </div>
      {action && (
        <Link href={action.href} className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-ink hover:text-brand sm:text-sm">
          <span className="sm:hidden">{t("seeAll")}</span>
          <span className="hidden sm:inline">{action.label}</span> <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

// ---------- Product visual (realistic render until real photos) ----------
// Gallery views: zoom/rotation per thumbnail so the placeholder gallery feels like several shots
const views = ["", "scale(1.35) translate(6%, 4%)", "rotate(-7deg) scale(0.92)", "scale(1.6) translate(-12%, 0)", "rotate(6deg) scale(0.95)"];

export function ProductVisual({
  categorySlug,
  subCategorySlug,
  side,
  className,
  size = "md",
  angle = 0,
}: {
  categorySlug: string;
  subCategorySlug?: string;
  side?: Side;
  /** Kept for API compatibility with real product images. */
  isIllustration?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  /** Gallery view index (0 = main shot). */
  angle?: number;
}) {
  const icon: CategoryIconKey = categoryIcons[categorySlug] ?? "accessoire";
  const padding = { sm: "p-1", md: "p-3", lg: "p-8" }[size];
  return (
    <div className={cn("relative flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-[radial-gradient(ellipse_at_50%_40%,#ffffff_0%,#f3f4f6_70%,#e9eaed_100%)]", padding, className)}>
      <ProductArt
        kind={artKindFor(icon, subCategorySlug)}
        side={side}
        className="h-full w-full transition duration-300"
        style={views[angle % views.length] ? { transform: views[angle % views.length] } : undefined}
      />
    </div>
  );
}

// ---------- Photo slot (real photo when configured, styled placeholder otherwise) ----------
export function PhotoSlot({ src, alt = "", className, priority }: { src: string | null | undefined; alt?: string; className?: string; priority?: boolean }) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 60vw, 100vw"
          // soft fade on the left edge so the photo blends into the dark banner
          className="object-cover [mask-image:linear-gradient(to_right,transparent,black_30%)]"
        />
      ) : (
        <CarPlaceholder />
      )}
    </div>
  );
}

/** Dark car silhouette with lit headlights — stands in for the hero/banner photos. */
export function CarPlaceholder({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 bg-ink", className)} aria-hidden>
      <CarScene className="absolute inset-0 h-full w-full" />
    </div>
  );
}

// ---------- Commitments (reassurance row) ----------
export function Commitments({
  items,
  className,
  tone = "light",
}: {
  items: { icon: React.ComponentType<{ className?: string }>; title: string; text?: string }[];
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <ul className={cn("grid gap-4 sm:gap-6", items.length === 4 ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-1 sm:grid-cols-3", className)}>
      {items.map((item) => (
        <li key={item.title} className="flex items-center gap-3">
          <item.icon className={cn("h-7 w-7 shrink-0 sm:h-8 sm:w-8", tone === "dark" ? "text-white" : "text-ink")} />
          <div className="min-w-0">
            <p className={cn("text-sm font-bold", tone === "dark" ? "text-white" : "text-ink")}>{item.title}</p>
            {item.text && <p className={cn("text-xs", tone === "dark" ? "text-white/60" : "text-muted")}>{item.text}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}

export function EmptyState({ title, text, action }: { title: string; text: string; action?: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-line bg-surface/50 px-5 py-12 text-center sm:px-6 sm:py-16">
      <h3 className="font-display text-base font-bold text-ink sm:text-lg">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted">{text}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
