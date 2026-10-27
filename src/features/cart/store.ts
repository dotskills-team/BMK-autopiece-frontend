"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  add: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
}

// Client-side cart for the prototype. With the real backend, sync with the
// server cart (e.g. Medusa cart id) inside these actions.
export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      add: (item, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === item.productId);
          const items = existing
            ? state.items.map((i) => (i.productId === item.productId ? { ...i, quantity: Math.min(99, i.quantity + quantity) } : i))
            : [...state.items, { ...item, quantity }];
          return { items, isOpen: true };
        }),
      remove: (productId) => set((s) => ({ items: s.items.filter((i) => i.productId !== productId) })),
      setQuantity: (productId, quantity) =>
        set((s) => ({
          items: s.items.map((i) => (i.productId === productId ? { ...i, quantity: Math.max(1, Math.min(99, quantity)) } : i)),
        })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
    }),
    { name: "bmk-cart", partialize: (s) => ({ items: s.items }) },
  ),
);

export const cartCount = (items: CartItem[]) => items.reduce((n, i) => n + i.quantity, 0);
export const cartSubtotal = (items: CartItem[]) => items.reduce((n, i) => n + i.priceTTC * i.quantity, 0);
