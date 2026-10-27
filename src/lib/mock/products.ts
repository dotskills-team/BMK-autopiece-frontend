import type { Product, Side, StockStatus } from "@/types";
import { slugify } from "@/lib/utils";
import { vehicles } from "./vehicles";

// Deterministic sample catalog generated from part templates × vehicles.
// Replace with the real supplier import (≈30,000 parts) via the API layer.

interface PartTemplate {
  name: string;
  categorySlug: string;
  subCategorySlug: string;
  side?: Side;
  options: string[];
  basePrice: number;
  brand: string;
}

const templates: PartTemplate[] = [
  { name: "Phare avant gauche", categorySlug: "eclairage", subCategorySlug: "phare-avant", side: "Gauche", options: ["H7/H7", "Réglage électrique"], basePrice: 129.9, brand: "Valeo" },
  { name: "Phare avant droit", categorySlug: "eclairage", subCategorySlug: "phare-avant", side: "Droite", options: ["H7/H7", "Réglage électrique"], basePrice: 129.9, brand: "Valeo" },
  { name: "Feu arrière droit", categorySlug: "eclairage", subCategorySlug: "feu-arriere", side: "Droite", options: ["LED"], basePrice: 89.9, brand: "Depo" },
  { name: "Feu antibrouillard avant", categorySlug: "eclairage", subCategorySlug: "feu-antibrouillard", side: "Gauche", options: ["H11"], basePrice: 34.9, brand: "TYC" },
  { name: "Rétroviseur électrique gauche", categorySlug: "retroviseur", subCategorySlug: "retroviseur-electrique", side: "Gauche", options: ["Électrique", "Chauffant", "À peindre"], basePrice: 99.9, brand: "Blic" },
  { name: "Verre de rétroviseur droit", categorySlug: "retroviseur", subCategorySlug: "verre", side: "Droite", options: ["Chauffant"], basePrice: 19.9, brand: "Blic" },
  { name: "Pare-choc avant", categorySlug: "pare-choc", subCategorySlug: "pare-choc-avant", side: "Centre", options: ["À peindre", "Avec trous capteurs"], basePrice: 149.9, brand: "Prasco" },
  { name: "Pare-choc arrière", categorySlug: "pare-choc", subCategorySlug: "pare-choc-arriere", side: "Centre", options: ["À peindre"], basePrice: 139.9, brand: "Prasco" },
  { name: "Calandre", categorySlug: "grille-calandre", subCategorySlug: "calandre", side: "Centre", options: ["Noir brillant"], basePrice: 59.9, brand: "Van Wezel" },
  { name: "Capot moteur", categorySlug: "capot", subCategorySlug: "capot", side: "Centre", options: ["Acier", "À peindre"], basePrice: 249.9, brand: "Van Wezel" },
  { name: "Aile avant gauche", categorySlug: "aile", subCategorySlug: "aile", side: "Gauche", options: ["À peindre"], basePrice: 79.9, brand: "Blic" },
  { name: "Radiateur moteur", categorySlug: "mecanique", subCategorySlug: "radiateur", options: ["Boîte manuelle"], basePrice: 119.9, brand: "NRF" },
];

const stockCycle: StockStatus[] = ["in_stock", "in_stock", "low_stock", "in_stock", "out_of_stock", "in_stock"];

// Pseudo OEM generator (deterministic)
function fakeOem(seed: number) {
  const base = (seed * 7919 + 104729).toString(36).toUpperCase().padStart(9, "0").slice(0, 9);
  return `${base.slice(0, 3)} ${base.slice(3, 6)} ${base.slice(6, 9)}`;
}

/** Untranslated source of each generated product, used to localize names/descriptions. */
export const productSources = new Map<string, { part: string; vehicle: string; yearFrom: number; yearTo: number }>();

function build(): Product[] {
  const products: Product[] = [];
  let i = 0;
  for (const vehicle of vehicles) {
    for (const t of templates) {
      // keep the sample catalog small but varied
      if ((i + vehicle.model.length) % 3 === 0) {
        i++;
        continue;
      }
      const vehicleLabel = `${vehicle.make} ${vehicle.model}`;
      const name = `${t.name} ${vehicleLabel}`;
      const reference = `RA${(53000 + i * 37).toString()}`;
      const priceTTC = Math.round((t.basePrice + (i % 5) * 4.5) * 100) / 100;
      productSources.set(`p_${i}`, { part: t.name, vehicle: vehicleLabel, yearFrom: vehicle.yearFrom, yearTo: vehicle.yearTo });
      products.push({
        id: `p_${i}`,
        slug: slugify(`${name}-${reference}`),
        name,
        reference,
        oemNumbers: [fakeOem(i), fakeOem(i + 1000)],
        brand: t.brand,
        categorySlug: t.categorySlug,
        subCategorySlug: t.subCategorySlug,
        side: t.side,
        options: t.options,
        condition: i % 7 === 3 ? "used" : "new",
        priceTTC,
        stock: stockCycle[i % stockCycle.length],
        images: [{ src: "", alt: name }],
        isIllustration: true,
        description: `${t.name} neuf, adaptable sur ${vehicleLabel} (${vehicle.yearFrom} – ${vehicle.yearTo}). Pièce de qualité équivalente à l'origine, conforme aux normes européennes. Vérifiez la compatibilité avec la référence OEM de votre véhicule avant commande.`,
        compatibilities: vehicle.bodyTypes.map((bodyType) => ({
          make: vehicle.make,
          model: vehicle.model,
          yearFrom: vehicle.yearFrom,
          yearTo: vehicle.yearTo,
          bodyType,
        })),
        isFeatured: i % 9 === 1,
      });
      i++;
    }
  }
  return products;
}

export const products: Product[] = build();
