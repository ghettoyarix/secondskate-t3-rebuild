import React from "react";
import Button from "../UI/Button";
import FilterBlock from "./FilterBlock";

import BidsGrid from "~/components/Discover/BidsGrid";
import CategoryPicker from "./CategoryPicker";
import { useDiscoverStore } from "~/zustand/discover";
const Discover = () => {
  const { isFilterShown, toggleFilter } = useDiscoverStore();

  return (
    <div className="wrapper flex flex-col justify-center py-12 ">
      <div className="flex items-center  justify-between border-b-2 border-lightGray pb-8">
        <CategoryPicker></CategoryPicker>
        <div className="max-w-[180px]"></div>

        <Button onClick={toggleFilter} primary className="w-20  text-mid">
          Filter {isFilterShown && <span className="font-thin">X</span>}
        </Button>
      </div>
      <FilterBlock></FilterBlock>
      <BidsGrid />
    </div>
  );
};

export default Discover;
