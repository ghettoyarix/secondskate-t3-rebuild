import React from "react";
import { useState, useRef, useEffect } from "react";

import { useUpload } from "~/context/UploadContext";
import { UploadCategory } from "~/models/Upload";
const Uploader = () => {
  const isFirstRender = useRef(true);

  const {
    chosenCategory,
    setChosenCategory,
    chosenType,
    setChosenType,
    categories,
  } = useUpload();

  useEffect(() => {
    setChosenType(() => chosenCategory.types[0]!);
  }, [chosenCategory]);

  const pickCategory = (obj: UploadCategory) => {
    setChosenCategory(() => obj);
    setChosenType(() => chosenCategory.types[0]!);
  };

  return (
    <div className="flex max-w-[700px] flex-col  justify-center gap-5">
      <div className="main flex select-none items-center overflow-hidden rounded-xl border-2 border-gray">
        <div className="title text-sm mr-3 h-full   bg-primary  px-3 py-2 font-semibold text-white">
          Категорія
        </div>

        <div className="jusify-around flex">
          {categories?.map((obj, index) => (
            <label
              key={obj.title}
              className="radio flex cursor-pointer items-center justify-around p-2"
            >
              <input
                id={obj.title}
                checked={obj.value === chosenCategory?.value}
                onChange={() => pickCategory(obj)}
                className="my-auto   scale-125 transform"
                type="radio"
                name="categoriesds"
              />
              <div className="title px-2">{obj.title}</div>
            </label>
          ))}
        </div>
      </div>
      <div className="main flex select-none overflow-hidden rounded-xl border-2 border-gray">
        <div className="title text-sm my-auto mr-3 bg-primary  px-5 py-3 font-semibold text-white">
          Тип
        </div>

        {chosenCategory?.types.map((obj, index) => (
          <label
            key={obj.title}
            className="radio flex cursor-pointer   items-center p-2"
          >
            <input
              onChange={() => setChosenType(obj)}
              checked={obj.value === chosenType?.value}
              id={"type" + index.toString()}
              className="my-auto scale-125 transform"
              type="radio"
              name="types"
            />
            <div className="title px-2">{obj.title}</div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Uploader;
