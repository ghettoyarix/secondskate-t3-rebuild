import React, { useEffect } from "react";

import PhotoBlock from "./PhotoBlock";
import DetailsBlock from "./DetailsBlock";
import { CONDITIONS, BRANDS } from "src/constants";
import { useUpload } from "src/context/UploadContext";

import ActionBlock from "./ActionBlock";
import { findByField } from "src/helpers/findByField";

const BidEditor = () => {
  const {
    formData,
    product,
    setFormData,
    updateMod,
    setChosenCategory,
    categories,
    setChosenCondition,
    setChosenBrand,
    chosenCondition,
  } = useUpload();
  useEffect(() => {
    if (product && updateMod) {
      setFormData({
        title: product.title,
        size: product.size!,
        price: product.price,
        description: product.description,
      });
      const x = findByField(CONDITIONS, "value", product.condition);
      const y = findByField(BRANDS, "value", product.brand);

      console.log(x);
      setChosenCondition(x!);
      setChosenBrand(y!);
    }
  }, [product, updateMod]);

  return (
    <div className="   flex justify-between">
      <div className="max-w-[640px]">
        <h1
          onClick={() => {
            console.log(chosenCondition);
          }}
          className="text-giant font-bold"
        >
          Upload your stuff!
        </h1>
        <PhotoBlock></PhotoBlock>
        <DetailsBlock></DetailsBlock>
      </div>
    </div>
  );
};

export default BidEditor;
