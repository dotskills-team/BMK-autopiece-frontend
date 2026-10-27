import type { Category } from "@/types";
import { slugify } from "@/lib/utils";

const sub = (...names: string[]) => names.map((name) => ({ name, slug: slugify(name) }));

// Category tree provided by the client.
export const categories: Category[] = [
  {
    slug: "eclairage",
    name: "Éclairage",
    icon: "eclairage",
    description: "Phares avant, feux arrière, antibrouillards, clignotants et feux de jour.",
    subCategories: sub(
      "Phare avant",
      "Feu arrière",
      "Feu antibrouillard",
      "Feu clignotant",
      "Feu éclaireur de plaque",
      "Feu diurne",
    ),
  },
  {
    slug: "retroviseur",
    name: "Rétroviseurs",
    icon: "retroviseur",
    description: "Rétroviseurs manuels et électriques, coques et verres de rétroviseur.",
    subCategories: sub("Rétroviseur manuel", "Rétroviseur électrique", "Rétroviseur intérieur", "Coque", "Verre"),
  },
  {
    slug: "pare-choc",
    name: "Pare-chocs",
    icon: "pare-choc",
    description: "Pare-chocs avant et arrière, spoilers, moulures et caches crochet.",
    subCategories: sub("Pare-choc avant", "Pare-choc arrière", "Spoiler", "Moulure", "Baguette", "Cache crochet"),
  },
  {
    slug: "grille-calandre",
    name: "Grille / Calandre",
    icon: "grille",
    description: "Calandres, grilles de pare-choc et enjoliveurs de feu.",
    subCategories: sub("Grille de pare-choc", "Calandre", "Enjoliveur de feu"),
  },
  {
    slug: "capot",
    name: "Capot",
    icon: "capot",
    description: "Capots moteur, compas de capot et insonorisants.",
    subCategories: sub("Capot", "Compas capot moteur", "Insonorisant"),
  },
  {
    slug: "aile",
    name: "Aile",
    icon: "aile",
    description: "Ailes avant, élargisseurs d'aile, pare-boue et bas de caisse.",
    subCategories: sub("Aile", "Élargisseur d'aile", "Pare-boue", "Bas de caisse"),
  },
  {
    slug: "vitrage",
    name: "Vitrage",
    icon: "vitrage",
    description: "Pare-brise, vitres latérales et lunettes arrière.",
    subCategories: sub("Pare-brise", "Vitre latérale", "Lunette arrière"),
  },
  {
    slug: "cache-sous-moteur",
    name: "Cache sous moteur",
    icon: "cache-moteur",
    description: "Caches et protections sous moteur.",
    subCategories: sub("Cache sous moteur"),
  },
  {
    slug: "armature",
    name: "Armature",
    icon: "armature",
    description: "Renforts de pare-choc, faces avant, supports et berceaux moteur.",
    subCategories: sub("Renfort de pare-choc", "Face avant", "Support", "Berceau moteur"),
  },
  {
    slug: "hayon-porte",
    name: "Hayon / Porte",
    icon: "porte",
    description: "Portières et hayons.",
    subCategories: sub("Hayon", "Porte"),
  },
  {
    slug: "mecanique",
    name: "Mécanique",
    icon: "mecanique",
    description: "Radiateurs, condenseurs, intercoolers, ventilateurs et compresseurs de climatisation.",
    subCategories: sub(
      "Compresseur de climatisation",
      "Condenseur",
      "Intercooler",
      "Radiateur",
      "Ventilateur",
    ),
  },
  {
    slug: "accessoire",
    name: "Accessoires",
    icon: "accessoire",
    description: "Capteurs de stationnement, lève-vitres, poignées, serrures et kits de montage.",
    subCategories: sub(
      "Capteur de stationnement",
      "Interrupteur",
      "Lève-vitre",
      "Poignée / Serrure",
      "Kit de montage",
    ),
  },
];
