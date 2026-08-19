'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  material?: string;
  finish?: string;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (productId: string, material?: string, finish?: string) => void;
  updateQuantity: (productId: string, quantity: number, material?: string, finish?: string) => void;
  clearCart: () => void;
};

function sameVariant(
  item: CartItem,
  productId: string,
  material?: string,
  finish?: string,
): boolean {
  return item.productId === productId && item.material === material && item.finish === finish;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const quantity = item.quantity ?? 1;
          const existingItem = state.items.find((currentItem) =>
            sameVariant(currentItem, item.productId, item.material, item.finish),
          );

          if (existingItem) {
            return {
              items: state.items.map((currentItem) =>
                sameVariant(currentItem, item.productId, item.material, item.finish)
                  ? { ...currentItem, quantity: currentItem.quantity + quantity }
                  : currentItem,
              ),
            };
          }

          return { items: [...state.items, { ...item, quantity }] };
        }),

      removeItem: (productId, material, finish) =>
        set((state) => ({
          items: state.items.filter((item) => !sameVariant(item, productId, material, finish)),
        })),

      updateQuantity: (productId, quantity, material, finish) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((item) => !sameVariant(item, productId, material, finish))
              : state.items.map((item) =>
                  sameVariant(item, productId, material, finish) ? { ...item, quantity } : item,
                ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'taksh-studios-cart',
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

export const selectCartTotal = (state: CartState): number =>
  state.items.reduce((total, item) => total + item.price * item.quantity, 0);

export const selectCartItemCount = (state: CartState): number =>
  state.items.reduce((count, item) => count + item.quantity, 0);

export function useCartTotal(): number {
  return useCartStore(selectCartTotal);
}

export function useCartItemCount(): number {
  return useCartStore(selectCartItemCount);
}
