import React from "react";
import DropDown from "src/components/UI/DropDown";
import RangeSlider from "src/components/UI/RangeSlider";
import DropDownBlock from "./DropDownBlock";
import { DISCOVER_CONDITIONS, SORT_OPTIONS } from "src/constants/index";
import { useDiscoverStore } from "src/zustand";
import type { DiscoverCondition } from "src/zustand/discover";
import type { SortOption, Option } from "src/models/FilterOptions";
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
      className="my-8 grid h-fit grid-cols-1 place-items-center gap-y-4 
     text-[12px]  font-bold text-gray transition-all xs:grid-cols-2 tab:grid-cols-3"
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
