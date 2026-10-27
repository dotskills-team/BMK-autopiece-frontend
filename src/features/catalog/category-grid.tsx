import { ArrowRight } from "lucide-react";
import type { Category } from "@/types";
import { CategoryIllustration } from "@/components/shared/category-illustration";
import { ProductArt, artKindFor } from "@/components/shared/product-art";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/** Light icon tiles ("Nos catégories" on the homepage). */
export function CategoryTiles({ categories }: { categories: Category[] }) {
  return (
    <ul className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 sm:gap-3 lg:grid-cols-6">
      {categories.map((c) => (
        <li key={c.slug}>
          <Link
            href={`/categorie/${c.slug}`}
            className="group flex h-full flex-col items-center justify-center gap-2 rounded-lg border border-line bg-white px-2 py-4 text-center transition hover:border-brand hover:shadow-[var(--shadow-card)]"
          >
            <CategoryIllustration icon={c.icon} className="h-9 w-9 text-ink transition group-hover:text-brand sm:h-10 sm:w-10" strokeWidth={1.8} />
            <span className="text-[11px] leading-tight font-medium text-ink sm:text-xs">{c.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Light cards with sub-categories (all categories page). */
export function CategoryDirectory({ categories }: { categories: Category[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((c) => (
        <li key={c.slug} className="rounded-lg border border-line bg-white p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
            <Link href={`/categorie/${c.slug}`} className="font-display font-bold text-ink hover:text-brand">{c.name}</Link>
            <CategoryIllustration icon={c.icon} className="h-9 w-9 text-ink-600" strokeWidth={1.8} />
          </div>
          <ul className="space-y-2 text-sm">
            {c.subCategories.map((s) => (
              <li key={s.slug}>
                <Link href={`/categorie/${c.slug}?sous=${s.slug}`} className="group flex items-center gap-2 text-ink-700 hover:text-brand">
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-brand transition group-hover:translate-x-0.5" /> {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

/** Left sidebar list of sub-categories (category page). */
export function SubCategoryList({ category, title, active }: { category: Category; title: string; active?: string }) {
  return (
    <nav aria-label={title}>
      <h2 className="mb-3 text-sm font-bold text-ink">{title}</h2>
      <ul className="space-y-2.5 text-sm">
        {category.subCategories.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/categorie/${category.slug}?sous=${s.slug}`}
              className={cn("group flex items-center gap-2 hover:text-brand", active === s.slug ? "font-semibold text-brand" : "text-ink-700")}
            >
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-brand transition group-hover:translate-x-0.5" /> {s.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Sub-category cards with a visual (category page overview). */
export function SubCategoryCards({ category }: { category: Category }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
      {category.subCategories.map((s) => (
        <li key={s.slug}>
          <Link
            href={`/categorie/${category.slug}?sous=${s.slug}`}
            className="group flex h-full flex-col rounded-lg border border-line bg-white p-3 transition hover:border-brand hover:shadow-[var(--shadow-card)]"
          >
            <div className="flex aspect-[16/10] items-center justify-center rounded-md bg-[radial-gradient(ellipse_at_50%_40%,#ffffff_0%,#f3f4f6_75%)] p-2">
              <ProductArt kind={artKindFor(category.icon, s.slug)} className="h-full w-full transition duration-300 group-hover:scale-105" />
            </div>
            <span className="mt-2 text-xs font-semibold text-ink sm:text-sm">{s.name}</span>
            <ArrowRight className="mt-1 h-4 w-4 text-ink transition group-hover:translate-x-1 group-hover:text-brand" aria-hidden />
          </Link>
        </li>
      ))}
    </ul>
  );
}
