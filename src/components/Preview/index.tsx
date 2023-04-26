import React from "react";
import Bid from "../UI/Bid";
import { useUpload } from "~/context/UploadContext";

const Preview = () => {
  const {
    chosenType,
    chosenCategory,
    chosenBrand,
    chosenCondition,
    mainPhoto,
    formData,
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
        previewImage={mainPhoto}
        title={formData.title}
        still
        photosKeys={[...mainPhoto]}
        isActive={false}
        createdAt={new Date()}
        updatedAt={new Date()}
      ></Bid>

      <input type="text" />
    </div>
  );
};

export default Preview;
