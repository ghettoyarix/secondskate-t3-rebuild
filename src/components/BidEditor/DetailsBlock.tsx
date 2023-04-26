import React, { useRef } from "react";
import DropDown from "~/components/UI/DropDown/";
import { CONDITIONS } from "~/constants";

import InputBlock from "~/components/UI/InputBlock";

import CategoryPicker from "~/components/UI/CategoryPicker";

import { BRANDS } from "../../constants";
import { useUpload } from "~/context/UploadContext";
import useDisableScrollOnInput from "~/helpers/useDisableInputScroll";
const DetailsBlock = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  useDisableScrollOnInput(inputRef);

  const {
    chosenCondition,
    setChosenCondition,
    chosenBrand,
    setChosenBrand,
    handleChange,
    formData,
  } = useUpload();

  return (
    <div className="mb-10 flex flex-col gap-6 border-b-2 border-lightGray pb-10">
      <p className="text-lable font-bold ">Item Details</p>
      <p className="text-small text-gray">
        The obligatory fields are marked with a
        <span className="text-lable">*</span>
      </p>
      <p className="text-mid text-error">{}</p>
      <div className="flex justify-between">
        <div>
          <p className="text-grays mb-3 text-small font-bold uppercase text-gray">
            Item name*
          </p>
          <input
            onChange={handleChange}
            value={formData?.title}
            name="title"
            className=" h-12 w-[520px] rounded-xl px-2 outline outline-2 outline-gray focus:outline-primary"
            placeholder='e. g. "Redeemable Bitcoin Card with logo"'
          />
        </div>
        <div>
          <p className="text-grays  mb-3 text-small font-bold uppercase text-gray">
            Price*
          </p>
          <input
            ref={inputRef}
            onChange={handleChange}
            type="number"
            name="price"
            value={formData?.price || ""}
            className="  h-12 w-[100px] rounded-xl px-2 outline outline-2 outline-gray focus:outline-primary"
            placeholder="40 UAH"
          />
        </div>
      </div>
      <div>
        <p className="text-grays mb-3 text-small font-bold uppercase text-gray">
          Description
        </p>

        <textarea
          name="description"
          maxLength={200}
          value={formData?.description || ""}
          onChange={handleChange}
          className=" h-12 w-[640px] rounded-xl px-2 outline outline-2 outline-gray focus:outline-primary"
          placeholder="e. g. “After purchasing you will able to recived the logo"
        />
      </div>{" "}
      <CategoryPicker></CategoryPicker>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-grays mb-3 text-small font-bold uppercase text-gray">
            Brands
          </p>
          <DropDown
            searchable
            pickOption={setChosenBrand}
            options={BRANDS.sort()}
            chosenOption={chosenBrand}
          />
        </div>
        <InputBlock
          value={formData?.size || ""}
          name="size"
          onChange={handleChange}
          title={"Size"}
        ></InputBlock>
        <div>
          <p className="text-grays mb-3 text-small font-bold uppercase text-gray">
            Condition
          </p>
          <DropDown
            pickOption={setChosenCondition}
            options={CONDITIONS}
            chosenOption={chosenCondition}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsBlock;
