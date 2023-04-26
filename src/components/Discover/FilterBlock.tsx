import React from "react";
import DropDown from "~/components/UI/DropDown";
import RangeSlider from "~/components/UI/RangeSlider";
import DropDownBlock from "./DropDownBlock";
import { DISCOVER_CONDITIONS, SORT_OPTIONS } from "~/constants/index";
import { useDiscoverStore } from "~/zustand";
import type { DiscoverCondition } from "~/zustand/discover";
import type { SortOption, Option } from "~/models/FilterOptions";
const FilterBlock = () => {
  const {
    chosenSorter,
    chosenCondition,
    isFilterShown,
    setChosenSorter,
    setChosenCondition,
  } = useDiscoverStore();

  return isFilterShown ? (
    <div
      className="x my-8 grid h-fit grid-cols-1 place-items-center 
    gap-y-4 text-[12px]  font-bold text-gray transition-all xs:grid-cols-2 tab:grid-cols-3"
    >
      <DropDownBlock title="sort by :">
        <DropDown
          chosenOption={chosenSorter}
          options={SORT_OPTIONS}
          pickOption={(obj: Option) =>
            setChosenSorter(obj as unknown as SortOption)
          }
        ></DropDown>
      </DropDownBlock>
      <DropDownBlock title="condition">
        <DropDown
          chosenOption={chosenCondition}
          options={DISCOVER_CONDITIONS}
          pickOption={(obj: Option) =>
            setChosenCondition(obj as DiscoverCondition)
          }
        ></DropDown>
      </DropDownBlock>
      <div className="max-w-[192px] ">
        <RangeSlider />
      </div>
    </div>
  ) : null;
};

export default FilterBlock;
