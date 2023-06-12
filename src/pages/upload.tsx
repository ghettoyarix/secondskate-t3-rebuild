import { type NextPage } from "next";
import { UploadProvider } from "src/context/UploadContext";
import BidEditor from "src/components/BidEditor";
import Preview from "src/components/Preview";
import ActionBlock from "src/components/BidEditor/ActionBlock";
type UploadPageProps = {
  product?: ProductWithOwner;
};
import { type ProductWithOwner } from "src/server/models/products";
const UploadPage: NextPage<UploadPageProps> = ({ product }) => {
  return (
    <>
      <UploadProvider product={product}>
        <div className="wrapper ">
          <div className="flex flex-wrap justify-around">
            <BidEditor></BidEditor>
            <Preview></Preview>
          </div>
          <ActionBlock></ActionBlock>
        </div>
      </UploadProvider>
    </>
  );
};

export default UploadPage;
