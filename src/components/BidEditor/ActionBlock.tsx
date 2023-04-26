import React, { useEffect, useRef } from "react";

import Button from "~/components/UI/Button/";

import { useUploadProducts } from "~/hooks/useUploadProducts";
import { useUpload } from "~/context/UploadContext";
import { api } from "~/utils/api";
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
  } = useUpload();

  const { uploadProductMutation } = useUploadProducts();
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
  const uploadCall = () => {
    uploadProducsAsync({
      data: {
        ...formData,
        ...dropDownPicks,
      },
      files,
    });
  };

  const updateCall = () => {
    if (product) {
      updateInfo({
        ...formData,
        id: product.id,
        ...dropDownPicks,
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
