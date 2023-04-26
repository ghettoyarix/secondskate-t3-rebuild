import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { type Product } from "@prisma/client";
import { ProductWithOwner } from "~/server/models/products";

interface State {
  products: ProductWithOwner[];
  error: string;

  page: number;
}

type Actions = {
  setProducts: (products: ProductWithOwner[]) => void;
  nextPage: () => void;
  clearProducts: () => void;
  setFirstPage: () => void;
};

export const useProductsStore = create(
  devtools(
    immer<State & Actions>((set) => ({
      products: [],
      error: "",

      page: 1,
      setProducts: (products: ProductWithOwner[]) =>
        set((state) => {
          state.products = [...state.products, ...products];
        }),
      nextPage: () =>
        set((state) => {
          state.page += 1;
        }),
      clearProducts: () =>
        set((state) => {
          state.products = [];
          console.log("cleared");
        }),
      setFirstPage: () =>
        set((state) => {
          state.page = 1;
        }),
    }))
  )
);
