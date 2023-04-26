import React from "react";
import Loader from "~/components/widgets/SearchBar/SearchWindow/Loader";
import Image from "next/image";
import Label from "~/components/UI/Label";
import Link from "next/link";
import { useHeader } from "~/context/HeaderContext";
import { getImageUrl } from "~/helpers/getImageUrl";
const ProductsBlock = () => {
  const { productsFound, totalProducts, isLoading } = useHeader();

  if (isLoading) {
    return <Loader></Loader>;
  }
  if (!isLoading && totalProducts === 0) {
    return <p>Unfortunately, there is nothing found.</p>;
  }
  if (productsFound) {
    return (
      <div className="flex flex-col  gap-3 ">
        {productsFound.map(({ title, photosKeys, id, price }) => (
          <Link key={id} href={`/product/${id}`}>
            <div
              className="flex h-[90px] w-[290px] cursor-pointer items-center justify-between
           gap-4 rounded-xl border-2 border-lightGray  bg-white px-4 py-4 hover:bg-lightGray"
            >
              <div className=" relative">
                <Image
                  className="aspect-square rounded-full"
                  height={50}
                  width={50}
                  alt="profile"
                  src={getImageUrl(photosKeys[0]) || "/svg/no-photo.svg"}
                ></Image>
              </div>
              <div className="flex flex-col justify-between">
                <p className="font-[500]  ">{title}</p>
              </div>
              <Label>{price.toString() + " UAH"}</Label>
            </div>
          </Link>
        ))}{" "}
        {totalProducts && totalProducts > 3 && (
          <div
            className="flex w-[290px] cursor-pointer justify-center gap-4
             rounded-xl border-2 border-lightGray bg-white px-4 py-4 hover:bg-lightGray"
          >
            <p className="text-lable">Find more</p>
          </div>
        )}
      </div>
    );
  }
  return null;
};

export default ProductsBlock;
