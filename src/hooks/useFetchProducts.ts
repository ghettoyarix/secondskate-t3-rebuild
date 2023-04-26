import { api } from "~/utils/api";

import { useDiscoverStore } from "~/zustand";
const useFetchProducts = () => {
  const {
    chosenCategory,
    chosenCondition,
    chosenSorter,
    uploadedBy,
    priceRange,
  } = useDiscoverStore();
  const {
    data,
    fetchNextPage,
    isFetching: isLoading,
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
    },
    {
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
    }
  );

  return { data, fetchNextPage, isLoading };
};

export default useFetchProducts;
