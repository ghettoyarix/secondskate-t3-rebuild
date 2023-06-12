/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Label from "src/components/UI/Label";
import cn from "classnames";
import HyperLink from "src/components/widgets/HyperLink";
import { parseBidTitle } from "src/helpers/parseTittle";
import { useRouter } from "next/router";
import moveToStart from "src/helpers/moveToStart";
import { api } from "src/utils/api";
import { type ProductWithOwner } from "src/server/models/products";
import { getImageUrl } from "src/helpers/getImageUrl";

const productPage = () => {
  const router = useRouter();
  const { productId } = router.query;
  const [photos, setPhotos] = useState<string[]>([]);

  const { data, isFetched } = api.product.getProducts.useQuery({
    id: productId as string,
    limit: 1,
    page: 1,
  });

  const product = data?.products[0];
  useEffect(() => {
    if (!product && isFetched) {
      void router.push("/404");
    } else if (product && product?.photosKeys.length > 0) {
      setPhotos(product.photosKeys);
    }
  }, [product, isFetched]);

  const {
    price,
    description,
    condition,
    title,
    size,
    brand,
    photosKeys,
    owner,
  } = product ?? {};
  const { username, image } = owner ?? {};

  const shareItem = () => {
    null;
  };
  const addToFav = () => null;
  const exit = () => {
    null;
  };

  const pickPhoto = (elem: string) => {
    const newArray = moveToStart(photosKeys!, elem);
    console.log(elem);
    setPhotos(newArray);
  };
  const actions = [
    { action: exit, icon: "exit.svg" },
    { action: shareItem, icon: "share.svg" },
    { action: addToFav, icon: "love.svg" },
    { action: null, icon: "others.svg" },
  ];

  const menu = ["Info", "Owners", "History", "Bids"];
  const [chosenMenu, setChosenMenu] = useState(menu[0]);

  if (isFetched && product) {
    return (
      <div className="flex justify-center gap-3">
        <div className="product:wrapper flex w-[1120px] flex-col items-center justify-start py-24 tab:flex-row tab:items-start   tab:justify-between">
          <div className="z-1 relative aspect-auto h-[478px]  w-[311px] xs:h-[568px] xs:w-[496px] tab:mr-4 tab:w-[640px]">
            <Image
              className=" rounded-xl object-cover"
              fill
              alt="1"
              src={getImageUrl(photos[0]) || "/svg/no-photo.svg"}
            ></Image>
          </div>
          <div className="flex  h-fit w-[375px]	flex-col items-stretch justify-between tab:h-full  ">
            <div>
              <p className=" mb-6 text-center text-[40px]  font-bold">
                {title}
              </p>
              <div className="mx-3  mb-12 flex justify-between">
                <Label>{price} UAH</Label>

                <p className="text-lable font-bold text-gray">
                  {parseBidTitle(condition || "--")}
                </p>
              </div>
              <div className="mx-3  mb-12 flex justify-between">
                <p className="text-mid text-gray">Size: {size}</p>

                <p className="text-lable font-bold text-gray">{brand}</p>
              </div>
              <p
                onClick={() => console.log(photosKeys)}
                className="my-2 text-gray"
              >
                {description}
              </p>
              <div className="flex">
                {photos.map((photo) => (
                  <div
                    onClick={() => {
                      pickPhoto(photo);
                    }}
                    key={photo}
                    className=" relative h-20 w-20 cursor-pointer object-fill"
                  >
                    <Image
                      className="rounded-xl"
                      fill
                      alt="creator"
                      src={getImageUrl(photo) || "/svg.oz"}
                    ></Image>
                  </div>
                ))}
              </div>
              <div className=" my-8 flex hidden justify-center gap-3 rounded-full border-2 border-lightGray p-1">
                {menu.map((obj) => (
                  <p
                    key={obj}
                    onClick={() => setChosenMenu(obj)}
                    className={cn(
                      "cursor-pointer rounded-full px-3 py-[6px] text-reg font-bold text-gray",
                      {
                        " bg-dark text-white": obj === chosenMenu,
                      }
                    )}
                  >
                    {obj}
                  </p>
                ))}
              </div>
              <div>
                <div className="mt-2 flex gap-4 border-y-2  border-lightGray py-4">
                  <div className=" relative">
                    <Image
                      className="aspect-square rounded-full "
                      height={50}
                      width={50}
                      alt="creator"
                      src={getImageUrl(image) || "/svg/no-profile-picture.svg"}
                    ></Image>
                  </div>
                  <div className="flex flex-col justify-between">
                    <p className="text-gray">Owner</p>
                    <HyperLink path={`/profile/${username || "404"}`}>
                      {username}
                    </HyperLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" hidden flex-col gap-3 pr-12 pt-24 product:flex  ">
          {actions.map((obj) => (
            <div
              key={obj.icon}
              className="h-12 w-12 cursor-pointer hover:scale-90"
            >
              <Image
                className="object-fill"
                width={48}
                height={48}
                alt={obj.icon}
                key={obj.icon}
                src={`/svg/${obj.icon}`}
              ></Image>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default productPage;
