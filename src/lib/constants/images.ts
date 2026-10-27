// Photo slots of the design. Files live in /public/images.
// While a slot is null, a styled placeholder is shown instead, so the layout never breaks.
//
// Current photos (Unsplash License — free for commercial use, no attribution required):
// - hero-car.jpg   https://unsplash.com/photos/vou-HfglNww  (Genesis GV70, dark studio)
// - banner-car.jpg https://unsplash.com/photos/x9LvaGe6fBM  (black car, headlights on)
// Replace them with the client's own photos when available.

export const images = {
  /** Home hero, right side (dark car, headlights on). */
  hero: "/images/hero-car.jpg" as string | null,
  /** "Une pièce à trouver ?" banner, right side. */
  cta: "/images/banner-car.jpg" as string | null,
  /** "Recherche par véhicule" banner. */
  vehicleSearch: "/images/hero-car.jpg" as string | null,
  /** Category banners, by category slug. Falls back to `defaultBanner`. */
  categoryBanners: {} as Record<string, string>,
  defaultBanner: "/images/banner-car.jpg" as string | null,
} as const;
