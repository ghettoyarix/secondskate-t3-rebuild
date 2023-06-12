import React, { forwardRef, type ForwardedRef, useState } from "react";
import cn from "classnames";

import { type ProductWithOwner } from "src/server/models/products";
import { BidContextProvider } from "src/context/BidContext";
import InfoBlock from "./InfoBlock";
import PictureBlock from "./PictureBlock";
import BidLayout from "./BidLayout";
interface BidsProps extends ProductWithOwner {
  still?: boolean;
  previewImage?: string;
}
const Bid = forwardRef(
  (props: BidsProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { still, previewImage } = props;

    return (
      <BidContextProvider
        still={still}
        product={props}
        previewImage={previewImage}
      >
        <BidLayout ref={ref}>
          <PictureBlock></PictureBlock>
          <InfoBlock></InfoBlock>
        </BidLayout>
      </BidContextProvider>
    );
  }
);
Bid.displayName = "Bid";
export default Bid;
