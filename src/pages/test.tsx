import React from "react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import CategoryPicker from "~/components/Discover/CategoryPicker";
import { useDiscoverStore } from "~/zustand";
import useFetchProducts from "~/hooks/useFetchProducts";
import { getImageUrl } from "~/helpers/getImageUrl";
const Test = () => {
  const { mutate } = api.product.deleteProduct.useMutation();
  const { chosenCategory } = useDiscoverStore();
  const { data, fetchNextPage } = useFetchProducts();
  return (
    <>
      <CategoryPicker></CategoryPicker>
      <p
        onClick={() => {
          mutate({ productId: "1" });
        }}
      >
        next
      </p>
      <p onClick={() => console.log(data)}>
        {chosenCategory.type || chosenCategory.category}{" "}
      </p>
      <div>
        {data?.pages.map((page) => (
          <>
            {page.products.map((product) => {
              return <p key={product.id}>{product.title}</p>;
            })}
          </>
        ))}
      </div>
    </>
  );
};

export default Test;
