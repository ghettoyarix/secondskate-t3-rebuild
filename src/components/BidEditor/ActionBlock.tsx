import React, { useEffect, useRef } from "react";

import Button from "src/components/UI/Button";

import { useUploadProducts } from "src/hooks/useUploadProducts";
import { useUpload } from "src/context/UploadContext";
import { api } from "src/utils/api";
const ActionBlock = () => {
  const {
    chosenCondition,
    chosenBrand,
    files,
    chosenCategory,
    chosenType,
    formData,
    updateMod,
    product,
    mergedArray,
  } = useUpload();

  const { uploadProductMutation, uploadFileMutation } = useUploadProducts();
  const { mutate: uploadProducsAsync, isLoading: isUploading } =
    uploadProductMutation;
  const { mutate: updateInfo, isLoading: isUpdating } =
    api.product.updateInfo.useMutation();
  const dropDownPicks = {
    category: chosenCategory.value,
    condition: chosenCondition.value,
    brand: chosenBrand.value,
    type: chosenType.value,
  };
  const { mutate: assignPhotos } = api.product.asignPhotoKeys.useMutation();
  const { mutateAsync: uploadFile } = uploadFileMutation;
  const uploadCall = () => {
    uploadProducsAsync({
      data: {
        ...formData,
        ...dropDownPicks,
      },
      files,
    });
  };

  const updateCall = async () => {
    if (product) {
      updateInfo({
        ...formData,
        id: product.id,
        ...dropDownPicks,
      });
      const photoUpdateArray: string[] = [];

      for (let i = 0; i < mergedArray.length; i++) {
        const item = mergedArray[i];
        if (item instanceof File) {
          const newPhotoKey = await uploadFile({
            file: item,
            unitId: product.id,
          });
          photoUpdateArray[i] = newPhotoKey;
        } else if (typeof item === "string") {
          photoUpdateArray[i] = item;
        }
      }

      assignPhotos({
        productId: product.id,
        photoKeys: photoUpdateArray,
      });
    }
  };
  return (
    <Button
      onClick={!updateMod ? uploadCall : updateCall}
      actionIsLoading={isUploading || isUpdating}
      className="mt-8 w-[168px]"
      primary
    >
      {updateMod ? "Update" : "Create"} item
    </Button>
  );
};

export default ActionBlock;
