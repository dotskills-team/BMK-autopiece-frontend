"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BodyType, SelectedVehicle } from "@/types";

interface GarageState {
  current: SelectedVehicle | null;
  saved: SelectedVehicle[];
  select: (v: SelectedVehicle) => void;
  clear: () => void;
  removeSaved: (index: number) => void;
}

const same = (a: SelectedVehicle, b: SelectedVehicle) =>
  a.make === b.make && a.model === b.model && a.year === b.year && a.bodyType === b.bodyType;

/** "Mon garage": the selected vehicle + recently used vehicles. */
export const useGarage = create<GarageState>()(
  persist(
    (set) => ({
      current: null,
      saved: [],
      select: (v) =>
        set((s) => ({
          current: v,
          saved: [v, ...s.saved.filter((x) => !same(x, v))].slice(0, 5),
        })),
      clear: () => set({ current: null }),
      removeSaved: (index) => set((s) => ({ saved: s.saved.filter((_, i) => i !== index) })),
    }),
    { name: "mapieceauto-garage" },
  ),
);

/** "Peugeot 208 (2015) · 5 portes" — pass a translator to localize the body type. */
export const vehicleLabel = (v: SelectedVehicle, bodyTypeLabel: (b: BodyType) => string = (b) => b) =>
  `${v.make} ${v.model} (${v.year})${v.engine ? ` · ${v.engine}` : ""}${v.bodyType ? ` · ${bodyTypeLabel(v.bodyType)}` : ""}`;
