import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

import type {
  SortOption,
  DiscoverOption,
  Option,
} from "src/models/FilterOptions";
import { SORT_OPTIONS, DISCOVER_CONDITIONS } from "src/constants/index";
import { discoverCategories } from "src/constants/options";
import { type ConditionValues } from "src/server/models/products";
export type PriceRange = {
  min: number | null;
  max: number | null;
};
export interface DiscoverCondition extends Option {
  value: ConditionValues;
}
type State = {
  chosenSorter: SortOption;
  chosenCondition: DiscoverCondition;
  chosenCategory: DiscoverOption;
  isFilterShown: boolean;
  priceRange: PriceRange;
  uploadedBy?: string | null;
  title?: string | null;
};

const initialState: State = {
  chosenSorter: SORT_OPTIONS[0] as SortOption,
  chosenCondition: DISCOVER_CONDITIONS[0] as DiscoverCondition,
  chosenCategory: discoverCategories[0] as DiscoverOption,
  isFilterShown: false,
  priceRange: { max: null, min: null },
  uploadedBy: null,
  title: null,
};

type Actions = {
  setChosenCondition: (option: DiscoverCondition) => void;
  setChosenCategory: (category: DiscoverOption) => void;
  toggleFilter: () => void;
  setChosenSorter: (sortOption: SortOption) => void;
  setPriceRange: (priceRange: PriceRange) => void;
  setUploader: (id: string) => void;
  reset: () => void;
  setTitle: (id: string) => void;
};

export const useDiscoverStore = create(
  devtools(
    immer<State & Actions>((set) => ({
      ...initialState,
      setChosenCondition: (condition: DiscoverCondition) =>
        set((state) => {
          state.chosenCondition = condition;
        }),

      setChosenCategory: (category: DiscoverOption) =>
        set((state) => {
          state.chosenCategory = category;
        }),

      toggleFilter: () =>
        set((state) => {
          state.isFilterShown = !state.isFilterShown;
        }),

      setChosenSorter: (sorter: SortOption) =>
        set((state) => {
          state.chosenSorter = sorter;
        }),

      setPriceRange: (range: PriceRange) =>
        set((state) => {
          state.priceRange = range;
        }),
      setUploader: (id: string) =>
        set((state) => {
          state.uploadedBy = id;
        }),
      setTitle: (title: string) =>
        set((state) => {
          state.title = title;
        }),
      reset: () => {
        // Do something with the state before resetting it
        set({
          chosenSorter: SORT_OPTIONS[0] as SortOption,
          chosenCondition: DISCOVER_CONDITIONS[0] as DiscoverCondition,
          chosenCategory: discoverCategories[0] as DiscoverOption,
          isFilterShown: false,
          priceRange: { max: null, min: null },
        }); /// FIND SOMETHING FORE ELEGANT) main purpuse is not to reset the uploader
      },
    }))
  )
);
