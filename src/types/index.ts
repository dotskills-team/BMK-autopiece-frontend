// Domain types shared across the storefront.
// They mirror what the backend (Medusa v2 or custom Node API) will return,
// so swapping mock data for the real API does not require UI changes.

export type CategoryIconKey =
  | "eclairage"
  | "retroviseur"
  | "pare-choc"
  | "grille"
  | "capot"
  | "aile"
  | "vitrage"
  | "cache-moteur"
  | "armature"
  | "porte"
  | "mecanique"
  | "accessoire";

export interface SubCategory {
  slug: string;
  name: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: CategoryIconKey;
  subCategories: SubCategory[];
}

export type BodyType = "3 portes" | "5 portes" | "Break" | "Berline" | "SUV" | "Coupé";

export interface Vehicle {
  make: string; // Marque
  model: string; // Modèle
  yearFrom: number;
  yearTo: number;
  bodyTypes: BodyType[];
  engines: string[]; // Motorisation, e.g. "1.6 TDI 110ch"
}

export interface Compatibility {
  make: string;
  model: string;
  yearFrom: number;
  yearTo: number;
  bodyType?: BodyType;
}

export type Side = "Gauche" | "Droite" | "Centre";
export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";
export type Condition = "new" | "used";
/** Filter groups: in stock (incl. low stock) vs. available on order. */
export type Availability = "in_stock" | "on_order";

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  reference: string; // supplier reference
  oemNumbers: string[];
  brand: string; // part manufacturer
  categorySlug: string;
  subCategorySlug: string;
  side?: Side;
  options: string[];
  condition: Condition;
  priceTTC: number; // EUR, VAT included
  stock: StockStatus;
  images: ProductImage[];
  isIllustration: boolean; // true = generic category illustration, not a real photo
  description: string;
  compatibilities: Compatibility[];
  isFeatured?: boolean;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  reference: string;
  priceTTC: number;
  quantity: number;
  categorySlug: string;
  vehicleLabel?: string;
}

export interface SelectedVehicle {
  make: string;
  model: string;
  year: number;
  bodyType?: BodyType;
  engine?: string;
}

export type SortOption = "relevance" | "price_asc" | "price_desc";

export interface SearchFilters {
  q?: string;
  category?: string;
  subCategory?: string;
  make?: string;
  model?: string;
  year?: number;
  minPrice?: number;
  maxPrice?: number;
  condition?: Condition;
  availability?: Availability;
  sort?: SortOption;
  page?: number;
}

export interface FacetCount {
  value: string;
  label: string;
  count: number;
}

export interface SearchResult {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  facets: {
    categories: FacetCount[];
    makes: FacetCount[];
    conditions: FacetCount[];
    availability: FacetCount[];
    priceRange: { min: number; max: number };
  };
}
