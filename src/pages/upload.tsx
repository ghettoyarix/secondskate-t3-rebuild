import { type NextPage } from "next";
import { UploadProvider } from "~/context/UploadContext";
import BidEditor from "~/components/BidEditor";
import Preview from "~/components/Preview";
type UploadPageProps = {
  product?: ProductWithOwner;
};
import { type ProductWithOwner } from "~/server/models/products";
const UploadPage: NextPage<UploadPageProps> = ({ product }) => {
  return (
    <>
      <UploadProvider product={product}>
        <div className="flex justify-around">
          <BidEditor></BidEditor>
          <Preview></Preview>
        </div>
      </UploadProvider>
    </>
  );
};

export default UploadPage;
