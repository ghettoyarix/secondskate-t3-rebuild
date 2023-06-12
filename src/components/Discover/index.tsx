import React from "react";
import Button from "../UI/Button";
import FilterBlock from "./FilterBlock";
import SearchBar from "../widgets/SearchBar";
import BidsGrid from "src/components/Discover/BidsGrid";
import CategoryPicker from "./CategoryPicker";
import { useDiscoverStore } from "src/zustand/discover";
const Discover = () => {
  const { isFilterShown, toggleFilter } = useDiscoverStore();

  return (
    <div className="wrapper flex flex-col justify-center py-12 ">
      <div className="flex items-center  justify-between border-b-2 border-lightGray px-4 pb-8">
        <CategoryPicker></CategoryPicker>
      </div>
      <div className="flex items-center justify-between py-4">
        <Button onClick={toggleFilter} primary className="w-22  text-mid">
          Filter {isFilterShown && <span className="font-thin">X</span>}
        </Button>
        <SearchBar></SearchBar>
      </div>
      <FilterBlock></FilterBlock>
      <BidsGrid />
    </div>
  );
};

export default Discover;
