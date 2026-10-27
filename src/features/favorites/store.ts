"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types";

export type FavoriteItem = Pick<Product, "id" | "slug" | "name" | "priceTTC" | "categorySlug" | "stock"> & { vehicleLabel?: string };

interface FavoritesState {
  items: FavoriteItem[];
  toggle: (item: FavoriteItem) => void;
  remove: (id: string) => void;
}

/** "Ma liste" (wishlist). Client-side for now — sync with the customer account later. */
export const useFavorites = create<FavoritesState>()(
  persist(
    (set) => ({
      items: [],
      toggle: (item) =>
        set((s) => ({
          items: s.items.some((i) => i.id === item.id) ? s.items.filter((i) => i.id !== item.id) : [item, ...s.items],
        })),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
    }),
    { name: "bmk-favorites" },
  ),
);
