import React, { useState } from "react";
import Image from "next/image";
import NoPhoto from "../NoPhoto";
import { getImageUrl } from "src/helpers/getImageUrl";
import Link from "next/link";
import RemoveBid from "src/components/UI/Bid/RemoveBid";
import { type ProductWithOwner } from "src/server/models/products";
import { useBidContext } from "src/context/BidContext";
import { useRouter } from "next/router";
const PictureBlock = () => {
  const router = useRouter();
  const route = router.asPath;

  const {
    product,
    previewImage,
    deletionInitiated,
    setDeletionInitiated,
    still,
    editable,
  } = useBidContext();
  const { id, photosKeys } = product!;

  const editCall = () => {
    if (product) {
      void router.push(`/edit/${product.id}`);
    }
  };
  const removeCall = () => {
    setDeletionInitiated(true);
  };
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    console.log(previewImage);
    if (
      route.includes("edit") ||
      route.includes("upload") ||
      route.includes("you")
    ) {
      e.preventDefault();
    }
  };

  return (
    <div>
      {still}
      {deletionInitiated ? (
        <RemoveBid></RemoveBid>
      ) : (
        <Link onClick={handleClick} href={`/product/${id}`}>
          <div
            className={`relative  mb-3	 flex h-[256px] w-[256px]    items-center justify-center `}
          >
            {previewImage || photosKeys[0] ? (
              <Image
                className={` 0 rounded-[12px] object-cover ${
                  !editable ? "cursor-pointer" : "cursor-default"
                } `}
                alt="mainpic"
                fill
                sizes="(max-width: 256px) 100vw,50vw,33vw"
                src={
                  (photosKeys[0] && getImageUrl(photosKeys[0])) ||
                  (photosKeys[0] instanceof File &&
                    URL.createObjectURL(photosKeys[0])) ||
                  "/no-photo.svg"
                }
              ></Image>
            ) : (
              <NoPhoto still={!still}></NoPhoto>
            )}
            {editable && (
              <Image
                onClick={editCall}
                className="absolute left-3 top-3 cursor-pointer rounded-full border-2 border-white bg-white"
                width={34}
                height={34}
                alt={"pencil"}
                src={"/svg/pencil.svg"}
              ></Image>
            )}
            {editable && (
              <Image
                onClick={removeCall}
                className="absolute left-[210px] top-3 cursor-pointer rounded-full 
            border-2 border-white bg-white  "
                width={34}
                height={34}
                alt={"trash"}
                src={"/svg/trash.svg"}
              ></Image>
            )}
          </div>
        </Link>
      )}
    </div>
  );
};
PictureBlock.displayName = "Bid";
export default PictureBlock;
