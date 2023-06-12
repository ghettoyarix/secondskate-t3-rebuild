import React, { memo } from "react";
import Label from "../Label";
import Image from "next/image";
import cn from "classnames";
import HyperLink from "../../widgets/HyperLink";
import { parseBidTitle } from "src/helpers/parseTittle";

import { useBidContext } from "src/context/BidContext";

const InfoBlock = () => {
  const { product } = useBidContext();

  const { id, title, category, type, price, size, condition, brand, owner } =
    product!;

  return (
    <div className="px-2">
      <div className="mb-3 flex w-full justify-between">
        <HyperLink path={`/product/${id}`}>{title}</HyperLink>
        <Label>{price || "--"} UAH</Label>
      </div>

      <div className="mt-3 flex justify-between">
        <div className="flex gap-2 text-[12px]">
          <p className="text-gray ">{parseBidTitle(category) || "--"}</p>
          <p className="font-semibold">{parseBidTitle(type) || "--"}</p>
        </div>
        <p className="text-reg font-medium">{parseBidTitle(condition)}</p>
      </div>
      <div className="mt-3 flex justify-between">
        <p className="text-gray ">{brand || "--"}</p>
        <p className="font-semibold">{size}</p>
      </div>
      <div className="my-3 flex  items-center justify-center  gap-2">
        <Image
          className={cn("rounded-full    border-4 border-white  ")}
          alt="1"
          height={24}
          width={24}
          src={`/svg/user.svg`}
        ></Image>

        <HyperLink path={`/profile/${owner?.username || "404"}`}>
          {owner?.username}
        </HyperLink>
      </div>
    </div>
  );
};
InfoBlock.displayName = "InfoBlock";
export default memo(InfoBlock);
