import React, { useEffect } from "react";

import PhotoBlock from "./PhotoBlock";
import DetailsBlock from "./DetailsBlock";

import { useUpload } from "~/context/UploadContext";

import ActionBlock from "./ActionBlock";

const BidEditor = () => {
  const { formData, product, setFormData } = useUpload();
  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        size: product.size!,
        price: product.price,
        description: product.description,
      });
    }
  }, [product]);

  return (
    <div className="   flex justify-between">
      <div className="max-w-[640px]">
        <h1
          onClick={() => {
            console.log(product);
          }}
          className="text-giant font-bold"
        >
          Upload your stuff!
        </h1>
        <PhotoBlock></PhotoBlock>
        <DetailsBlock></DetailsBlock>
        <ActionBlock></ActionBlock>
      </div>
    </div>
  );
};

export default BidEditor;
