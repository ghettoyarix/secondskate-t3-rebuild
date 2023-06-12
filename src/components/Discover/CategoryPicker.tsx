import React from "react";
import { discoverCategories } from "src/constants/options";
import cn from "classnames";
import { useDiscoverStore } from "src/zustand/discover";
import type { DiscoverOption } from "src/models/FilterOptions";

const CategoryPicker = () => {
  const CATEGORIES = discoverCategories.map((opt: DiscoverOption) => {
    return { ...opt, pic: opt.category || opt.type };
  });
  const { setChosenCategory, chosenCategory } = useDiscoverStore();
  return (
    <div className="  min-w-[300px flex w-full justify-between gap-4 ">
      {CATEGORIES.map((obj, i) => (
        <div
          key={i}
          onClick={() => setChosenCategory(obj)}
          className={cn(
            "my-auto  flex h-[200px]  w-full cursor-pointer flex-col items-center   justify-center gap-6 whitespace-nowrap rounded-xl     text-reg font-bold ",
            {
              "bg-primary text-white": obj.title === chosenCategory.title,
              "hover:bg-lightGray	": obj.title !== chosenCategory.title,
            }
          )}
        >
          <div className="h-20 w-20 rounded-full bg-black"></div>
          <p className="text-mid">{obj.title as string}</p>
        </div>
      ))}
      <br />
    </div>
  );
};

export default CategoryPicker;
