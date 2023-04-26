import React, { useEffect, useRef } from "react";
import { useHeader } from "~/context/HeaderContext";

import useOutsideHandler from "~/helpers/useOutsideHandler";
import ProductsBlock from "./ProductsBlock";
const SearchWindow = ({ searched }: { searched: string | null }) => {
  const { setOpenFlag, setSearchedValue, openFlag, searchedValue } =
    useHeader();
  const searchRef = useRef(null);

  useOutsideHandler(searchRef, () => setOpenFlag(false));

  return searched && openFlag ? (
    <div
      ref={searchRef}
      className=" absolute left-0 right-0 top-[15%] z-20 mx-auto max-w-[375px] 
        rounded-xl  border-2 border-gray bg-white py-4 text-center     "
    >
      <div className="flex flex-col items-center justify-center">
        <p className="w-[80%] break-words  text-mid">
          Searching for a &quot;{searched}&quot;
        </p>

        <div className="flex flex-col gap-3">
          <ProductsBlock />
        </div>
      </div>
    </div>
  ) : null;
};

export default SearchWindow;
