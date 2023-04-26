import React, { useRef } from "react";
import { debounce } from "lodash";

import { useDiscoverStore, type PriceRange } from "~/zustand/discover";
import useDisableScrollOnInput from "~/helpers/useDisableInputScroll";
const PriceRangeInput = () => {
  const maxRef = useRef<HTMLInputElement>(null);
  const minRef = useRef<HTMLInputElement>(null);
  useDisableScrollOnInput([maxRef, minRef]);
  const { setPriceRange, priceRange } = useDiscoverStore();

  const setPriceRangeHandler = React.useCallback(
    debounce((priceRange: PriceRange) => {
      setPriceRange(priceRange);
    }, 1000),
    [setPriceRange]
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const priceRangeUnit = { [e.target.name]: parseInt(e.target.value) };
    console.log(priceRangeUnit);
    setPriceRangeHandler({ ...priceRange, ...priceRangeUnit });
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      <div className="flex h-full flex-col justify-between">
        <label className="text-gray-600 mb-3 uppercase">Min Price:</label>
        <input
          ref={minRef}
          type="number"
          name="min"
          onChange={handleChange}
          placeholder={"0"}
          className="bg-whie text-sm  hover:bg-gray-50  focus:ring-offset-gray-100 inline-flex h-12 
          w-full items-center  justify-center rounded-xl px-4  font-medium text-indigo-500 shadow-sm outline 
          outline-2 outline-gray 
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        />
      </div>
      <div className="flex h-full flex-col justify-between">
        <label className="text-gray-600 mb-3 uppercase">Max Price:</label>
        <input
          ref={maxRef}
          type="number"
          name="max"
          onChange={handleChange}
          placeholder={"99999"}
          className="bg-whie text-sm  hover:bg-gray-50  focus:ring-offset-gray-100 inline-flex h-12 
          w-full items-center  justify-center rounded-xl px-4  font-medium text-indigo-500 shadow-sm  outline 
          outline-2 outline-gray 
          focus:outline-none focus:ring-2     focus:ring-indigo-500 focus:ring-offset-2"
        />
      </div>
    </div>
  );
};

export default PriceRangeInput;
