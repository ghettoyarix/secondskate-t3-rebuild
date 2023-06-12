import React from "react";
import BidEditor from "src/components/BidEditor";
import UploadPage from "../upload";
import { useRouter } from "next/router";
import { api } from "src/utils/api";
const EditPage = () => {
  const router = useRouter();
  const { productId } = router.query;

  const { data } = api.product.getProducts.useQuery({
    page: 1,
    id: productId?.toString(),
  });
  return (
    <div>
      <UploadPage product={data?.products[0]}></UploadPage>
    </div>
  );
};

export default EditPage;
