"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Side } from "@/types";
import { ProductVisual } from "@/components/shared";
import { cn } from "@/lib/utils";

const VIEWS = 5;

/**
 * Main image + thumbnails. With real photos, map product.images instead of the
 * placeholder "views" (each view = a slightly different angle of the illustration).
 */
export function ProductGallery({ categorySlug, subCategorySlug, side }: { categorySlug: string; subCategorySlug?: string; side?: Side }) {
  const t = useTranslations("product");
  const [active, setActive] = useState(0);
  return (
    <div>
      <ProductVisual categorySlug={categorySlug} subCategorySlug={subCategorySlug} side={side} size="lg" angle={active} className="aspect-[4/3] border border-line" />
      <div className="mt-3 grid grid-cols-5 gap-2">
        {Array.from({ length: VIEWS }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={t("thumbnail", { index: i + 1 })}
            aria-pressed={active === i}
            className={cn("rounded-md border transition", active === i ? "border-brand" : "border-line hover:border-ink/30")}
          >
            <ProductVisual categorySlug={categorySlug} subCategorySlug={subCategorySlug} side={side} size="sm" angle={i} className="aspect-[4/3]" />
          </button>
        ))}
      </div>
    </div>
  );
}
