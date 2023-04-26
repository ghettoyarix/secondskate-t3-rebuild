import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "~/utils/uploadFile";
import { api } from "~/utils/api";
import { type UploadProductInput } from "~/server/models/products";
export const useUploadProducts = () => {
  const { mutateAsync: getPresignedLink } =
    api.file.getPresignedLink.useMutation();
  const { mutateAsync: createProduct } =
    api.product.createProduct.useMutation();
  const { mutateAsync: asignPhotoKeys } =
    api.product.asignPhotoKeys.useMutation();
  type uploadProductArgs = { files: File[]; data: UploadProductInput };
  const uploadProduct = async ({ files, data }: uploadProductArgs) => {
    try {
      const photoKeys: string[] = [];

      const newProduct = await createProduct({ ...data });

      await Promise.all(
        files.map(async (file) => {
          const presignedLink = await getPresignedLink({
            fileType: file.type,
            folderName: "productPhotos",
            unitId: newProduct.id,
          });
          photoKeys.push(presignedLink.key);
          await uploadFile({
            file: file,
            url: presignedLink.URL,
          });
        })
      ).then(async () => {
        await asignPhotoKeys({ photoKeys, productId: newProduct.id });
      });
    } catch (error) {
      console.log(error);
    }
  };
  const uploadProductMutation = useMutation(["uploadFile"], uploadProduct);

  return { uploadProductMutation };
};
