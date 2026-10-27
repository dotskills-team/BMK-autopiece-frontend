import type { Locale } from "@/i18n/routing";

// Catalog translations for the mock data (French is the source language).
// With the real backend, the API returns localized content for the requested
// locale and this file can be deleted.

type Dictionary = Record<string, string>;

const en: Dictionary = {
  // Categories
  "Éclairage": "Lighting",
  "Rétroviseurs": "Mirrors",
  "Pare-chocs": "Bumpers",
  "Grille / Calandre": "Grilles",
  "Capot": "Bonnet",
  "Aile": "Wing",
  "Vitrage": "Glazing",
  "Cache sous moteur": "Engine undertray",
  "Armature": "Body structure",
  "Hayon / Porte": "Tailgate / Door",
  "Mécanique": "Mechanical",
  "Accessoires": "Accessories",
  // Category descriptions
  "Phares avant, feux arrière, antibrouillards, clignotants et feux de jour.": "Headlights, rear lights, fog lights, indicators and daytime running lights.",
  "Rétroviseurs manuels et électriques, coques et verres de rétroviseur.": "Manual and electric mirrors, mirror covers and mirror glass.",
  "Pare-chocs avant et arrière, spoilers, moulures et caches crochet.": "Front and rear bumpers, spoilers, mouldings and tow hook covers.",
  "Calandres, grilles de pare-choc et enjoliveurs de feu.": "Radiator grilles, bumper grilles and light surrounds.",
  "Capots moteur, compas de capot et insonorisants.": "Bonnets, bonnet struts and sound insulation.",
  "Ailes avant, élargisseurs d'aile, pare-boue et bas de caisse.": "Front wings, wheel arch extensions, mudguards and sill panels.",
  "Pare-brise, vitres latérales et lunettes arrière.": "Windscreens, side windows and rear windows.",
  "Caches et protections sous moteur.": "Engine undertrays and protection plates.",
  "Renforts de pare-choc, faces avant, supports et berceaux moteur.": "Bumper reinforcements, front panels, brackets and engine subframes.",
  "Portières et hayons.": "Doors and tailgates.",
  "Radiateurs, condenseurs, intercoolers, ventilateurs et compresseurs de climatisation.": "Radiators, condensers, intercoolers, fans and air-conditioning compressors.",
  "Capteurs de stationnement, lève-vitres, poignées, serrures et kits de montage.": "Parking sensors, window regulators, handles, locks and fitting kits.",
  // Sub-categories
  "Phare avant": "Headlight",
  "Feu arrière": "Rear light",
  "Feu antibrouillard": "Fog light",
  "Feu clignotant": "Indicator",
  "Feu éclaireur de plaque": "Number plate light",
  "Feu diurne": "Daytime running light",
  "Rétroviseur manuel": "Manual mirror",
  "Rétroviseur électrique": "Electric mirror",
  "Rétroviseur intérieur": "Interior mirror",
  "Coque": "Mirror cover",
  "Verre": "Mirror glass",
  "Pare-choc avant": "Front bumper",
  "Pare-choc arrière": "Rear bumper",
  "Spoiler": "Spoiler",
  "Moulure": "Moulding",
  "Baguette": "Trim strip",
  "Cache crochet": "Tow hook cover",
  "Grille de pare-choc": "Bumper grille",
  "Calandre": "Radiator grille",
  "Enjoliveur de feu": "Light surround",
  "Compas capot moteur": "Bonnet strut",
  "Insonorisant": "Sound insulation",
  "Élargisseur d'aile": "Wheel arch extension",
  "Pare-boue": "Mudguard",
  "Bas de caisse": "Sill panel",
  "Pare-brise": "Windscreen",
  "Vitre latérale": "Side window",
  "Lunette arrière": "Rear window",
  "Renfort de pare-choc": "Bumper reinforcement",
  "Face avant": "Front panel",
  "Support": "Bracket",
  "Berceau moteur": "Engine subframe",
  "Hayon": "Tailgate",
  "Porte": "Door",
  "Compresseur de climatisation": "Air-conditioning compressor",
  "Condenseur": "Condenser",
  "Intercooler": "Intercooler",
  "Radiateur": "Radiator",
  "Ventilateur": "Fan",
  "Capteur de stationnement": "Parking sensor",
  "Interrupteur": "Switch",
  "Lève-vitre": "Window regulator",
  "Poignée / Serrure": "Handle / Lock",
  "Kit de montage": "Fitting kit",
  // Part names
  "Phare avant gauche": "Left headlight",
  "Phare avant droit": "Right headlight",
  "Feu arrière droit": "Right rear light",
  "Feu antibrouillard avant": "Front fog light",
  "Rétroviseur électrique gauche": "Left electric mirror",
  "Verre de rétroviseur droit": "Right mirror glass",
  "Capot moteur": "Bonnet",
  "Aile avant gauche": "Left front wing",
  "Radiateur moteur": "Engine radiator",
  // Options
  "Réglage électrique": "Electric adjustment",
  "Électrique": "Electric",
  "Chauffant": "Heated",
  "À peindre": "Primed (to be painted)",
  "Avec trous capteurs": "With sensor holes",
  "Noir brillant": "Gloss black",
  "Acier": "Steel",
  "Boîte manuelle": "Manual gearbox",
};

const dictionaries: Partial<Record<Locale, Dictionary>> = { en };

/** Translate a French catalog string; falls back to the French source. */
export function tr(value: string, locale: Locale) {
  return dictionaries[locale]?.[value] ?? value;
}
