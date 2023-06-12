import React from "react";
import Bid from "../UI/Bid";
import { useUpload } from "src/context/UploadContext";

const Preview = () => {
  const {
    chosenType,
    chosenCategory,
    chosenBrand,
    chosenCondition,
    mainPhoto,
    formData,
    mergedArray,
  } = useUpload();

  return (
    <div className="max-w-[304px]">
      <p className="mb-8 text-mid font-bold">Preview</p>
      <Bid
        owner={{ username: "you", image: "" }}
        ownerId="ss"
        id={"2"} // reconsider it
        photoURLs={[]}
        brand={chosenBrand.title as string}
        description={formData.description}
        size={formData.size!}
        condition={chosenCondition.value}
        price={formData.price}
        category={chosenCategory?.value}
        type={chosenType?.value}
        title={formData.title}
        still
        photosKeys={mergedArray as string[]}
        isActive={false}
        createdAt={new Date()}
        updatedAt={new Date()}
      ></Bid>

      <input type="text" />
    </div>
  );
};

export default Preview;
