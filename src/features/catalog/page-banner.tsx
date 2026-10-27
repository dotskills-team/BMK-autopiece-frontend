import { Breadcrumbs, PhotoSlot } from "@/components/shared";
import { images } from "@/lib/constants/images";

/**
 * Page header of the design: breadcrumb on white, then a rounded dark banner
 * with the title on the left and a photo on the right.
 */
export function PageBanner({
  title,
  text,
  image,
  breadcrumbs,
}: {
  title: string;
  text?: string;
  /** Photo path (see lib/constants/images.ts). Placeholder when missing. */
  image?: string | null;
  breadcrumbs: { label: string; href?: string }[];
}) {
  return (
    <div className="container-page pt-4">
      <Breadcrumbs items={breadcrumbs} />
      <section className="relative mt-3 overflow-hidden rounded-lg bg-ink text-white">
        <PhotoSlot src={image ?? images.defaultBanner} className="absolute inset-0 sm:left-1/3" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/10 sm:via-ink/60" aria-hidden />
        <div className="relative max-w-xl px-5 py-8 sm:px-8 sm:py-10">
          <h1 className="font-display text-2xl font-extrabold tracking-tight break-words sm:text-4xl">{title}</h1>
          {text && <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">{text}</p>}
        </div>
      </section>
    </div>
  );
}
