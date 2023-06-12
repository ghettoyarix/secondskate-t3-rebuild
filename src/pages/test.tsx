import React from "react";
import { useSession } from "next-auth/react";
import { api } from "src/utils/api";
import CategoryPicker from "src/components/Discover/CategoryPicker";
import { useDiscoverStore } from "src/zustand";
import useFetchProducts from "src/hooks/useFetchProducts";
import { CATEGORIES } from "src/constants/index";
import useIsMobile from "src/helpers/isMobile";
const Test = () => {
  const { mutate } = api.product.deleteProduct.useMutation();
  const { chosenCategory } = useDiscoverStore();
  const { data, fetchNextPage } = useFetchProducts();
  const { isMobile } = useIsMobile();
  return (
    <>
      <CategoryPicker></CategoryPicker>

      <div className="h-[400px] w-[500px] bg-lightGray">
        <div className="grid h-full grid-cols-2">
          {CATEGORIES.map((category) => (
            <div
              className="item w- flex items-center justify-center bg-red-500"
              key={category.value}
            >
              <h1 className="text-xl font-bold">{category.title}</h1>
            </div>
          ))}
        </div>
      </div>
      {isMobile && "tr"}
    </>
  );
};

export default Test;
