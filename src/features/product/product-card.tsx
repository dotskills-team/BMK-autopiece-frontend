import type { Product } from "@/types";
import { PriceTag, ProductVisual, StockBadge } from "@/components/shared";
import { Link } from "@/i18n/navigation";
import { AddToCartIconButton } from "./add-to-cart";

export function ProductCard({ product }: { product: Product }) {
  const vehicle = product.compatibilities[0];
  // The design shows the part name, then the vehicle on its own line
  const partName = vehicle ? product.name.replace(` ${vehicle.make} ${vehicle.model}`, "") : product.name;
  return (
    <article className="group flex min-w-0 flex-col rounded-lg border border-line bg-white p-3 transition duration-200 hover:border-ink/20 hover:shadow-[var(--shadow-card-hover)]">
      <Link href={`/produit/${product.slug}`} className="block" aria-label={product.name}>
        <ProductVisual categorySlug={product.categorySlug} subCategorySlug={product.subCategorySlug} side={product.side} className="aspect-[4/3] transition duration-300 group-hover:scale-[1.03]" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col pt-3">
        <h3 className="line-clamp-2 text-xs font-semibold text-ink sm:text-[13px]">
          <Link href={`/produit/${product.slug}`} className="hover:text-brand">{partName}</Link>
        </h3>
        {vehicle && (
          <p className="mt-0.5 truncate text-[11px] text-muted sm:text-xs">
            {vehicle.make} {vehicle.model}
          </p>
        )}
        <PriceTag value={product.priceTTC} size="sm" className="mt-2" />
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <StockBadge status={product.stock} />
          <AddToCartIconButton product={product} />
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ products, columns = 4 }: { products: Product[]; columns?: 3 | 4 }) {
  return (
    <div className={columns === 4 ? "grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4" : "grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4"}>
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
