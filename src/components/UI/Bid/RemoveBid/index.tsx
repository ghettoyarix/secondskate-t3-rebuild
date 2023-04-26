import React, { useState } from "react";
import Button from "~/components/UI/Button";
import CheckmarkLoader from "~/components/widgets/CheckmarkLoader";
import { useBidContext } from "~/context/BidContext";
import { api } from "~/utils/api";
const RemoveBid = () => {
  const { mutate: deleteProduct, error } =
    api.product.deleteProduct.useMutation();
  const { setDeletionInitiated, setIsDeleted, deletionInitiated, product } =
    useBidContext();

  const handleClose = () => {
    setDeletionInitiated(false);
  };
  const handleDelete = () => {
    if (product?.id) {
      deleteProduct(
        { productId: product.id },
        {
          onSuccess: () => {
            setIsDeleted(true);
          },
        }
      );
    }
  };

  return (
    <div
      className="    
          w-full   flex-col   items-center justify-center rounded-xl bg-white py-4  "
    >
      <p className="border-primary-2 mb-2 bg-white  px-8 py-8  text-lable font-bold text-primary">
        {!error
          ? "Are you sure that you would like to delete this product?"
          : error?.message}
      </p>

      <div className="   ">
        <div className="flex justify-between  px-8">
          <Button primary onClick={handleDelete}>
            Delete
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default RemoveBid;
