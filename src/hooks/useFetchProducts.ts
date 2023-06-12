import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "src/utils/api";

import { useDiscoverStore } from "src/zustand";
const useFetchProducts = () => {
  const router = useRouter();
  const {
    chosenCategory,
    chosenCondition,
    chosenSorter,
    uploadedBy,
    priceRange,
    reset,
    setUploader,
    title,
  } = useDiscoverStore();
  const {
    data,
    fetchNextPage,
    isFetching: isLoading,
    refetch,
  } = api.product.getInfiniteProducts.useInfiniteQuery(
    {
      limit: 8,
      page: 1,
      sortBy: chosenSorter.prop,
      sortDirection: chosenSorter.direction,
      category: chosenCategory.category,
      type: chosenCategory.type,
      condition: chosenCondition.value,
      maxPrice: priceRange.max || 9999,
      minPrice: priceRange.min || 0,
      uploadedBy,
      title,
    },
    {
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    reset();
    if (router.asPath === "/") {
      setUploader("");
    }
  }, [reset, router]);

  return { data, fetchNextPage, isLoading, refetch };
};

export default useFetchProducts;
