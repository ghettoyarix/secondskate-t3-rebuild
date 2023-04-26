import React from "react";
import { discoverCategories } from "~/constants/options";
import cn from "classnames";
import { useDiscoverStore } from "~/zustand/discover";
import type { DiscoverOption } from "~/models/FilterOptions";
const CategoryPicker = () => {
  const { setChosenCategory, chosenCategory } = useDiscoverStore();
  return (
    <div className="flex min-w-[300px] flex-wrap gap-3 ">
      {discoverCategories.map((obj: DiscoverOption, i) => (
        <p
          key={i}
          onClick={() => setChosenCategory(obj)}
          className={cn(
            "  my-auto cursor-pointer  whitespace-nowrap  	 rounded-2xl px-3  py-[6px]   text-reg font-bold ",
            {
              "bg-black text-white": obj.title === chosenCategory.title,
              "hover:bg-lightGray	": obj.title !== chosenCategory.title,
            }
          )}
        >
          {obj.title as string}
        </p>
      ))}
      <br />
    </div>
  );
};

export default CategoryPicker;
