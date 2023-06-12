import React, { useEffect } from "react";
import Bid from "src/components/UI/Bid";
import BidLoader from "src/components/UI/loaders/BidLoader";
import NothingFound from "./NothingFound";
import Grid from "./Grid";

import { useInView } from "react-intersection-observer";

import useClock from "src/helpers/useClock";

import { PAGE_LIMIT } from "src/constants/products";
import { useRouter } from "next/router";
import { useProductsStore } from "src/zustand";
import useFetchProducts from "src/hooks/useFetchProducts";

const BidsGrid = () => {
  const { products } = useProductsStore();

  const router = useRouter();

  const { data, isLoading, fetchNextPage } = useFetchProducts();
  const { ref, inView } = useInView();
  const intervalPassed = useClock();

  useEffect(() => {
    if (inView) {
      void fetchNextPage();
    }
  }, [inView, intervalPassed, fetchNextPage]);

  const productList =
    data?.pages &&
    data.pages.map((page, i) => {
      return (
        <React.Fragment key={i}>
          {page.products.map((product, i) => (
            <Bid
              ref={
                product === page.products[page.products.length - 1] ? ref : null
              }
              {...product}
              key={product.id}
            ></Bid>
          ))}
        </React.Fragment>
      );
    });

  const countLoaders = (productsFetched: number) => {
    if (productsFetched < PAGE_LIMIT) {
      return PAGE_LIMIT - productsFetched;
    }
    return PAGE_LIMIT - (productsFetched % PAGE_LIMIT);
  };
  const loaderAmount = countLoaders(products.length);

  if (data?.pages[0]!.totalProducts === 0) {
    return <NothingFound />;
  }
  return (
    <>
      <Grid>
        {productList}
        {isLoading &&
          Array.from({ length: loaderAmount }).map((_, i) => (
            <BidLoader key={i} />
          ))}
      </Grid>
      {}
    </>
  );
};

export default BidsGrid;
