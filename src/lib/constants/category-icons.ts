import type { CategoryIconKey } from "@/types";

/** Maps a category slug to its illustration (used for product placeholders). */
export const categoryIcons: Record<string, CategoryIconKey> = {
  eclairage: "eclairage",
  retroviseur: "retroviseur",
  "pare-choc": "pare-choc",
  "grille-calandre": "grille",
  capot: "capot",
  aile: "aile",
  vitrage: "vitrage",
  "cache-sous-moteur": "cache-moteur",
  armature: "armature",
  "hayon-porte": "porte",
  mecanique: "mecanique",
  accessoire: "accessoire",
};
