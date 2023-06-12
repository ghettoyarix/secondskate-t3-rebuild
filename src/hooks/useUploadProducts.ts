import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "src/utils/uploadFile";
import { api } from "src/utils/api";
import { type UploadProductInput } from "src/server/models/products";
export const useUploadProducts = () => {
  const { mutateAsync: getPresignedLink } =
    api.file.getPresignedLink.useMutation();
  const { mutateAsync: createProduct } =
    api.product.createProduct.useMutation();
  const { mutateAsync: asignPhotoKeys } =
    api.product.asignPhotoKeys.useMutation();
  type uploadProductArgs = { files: File[]; data: UploadProductInput };
  type UploadFileArgs = { file: File; unitId: string };
  const uploadFileWithPresignedLink = async (data: UploadFileArgs) => {
    const { file, unitId } = data;
    const presignedLink = await getPresignedLink({
      fileType: file.type,
      folderName: "productPhotos",
      unitId: unitId,
    });

    await uploadFile({
      file: file,
      url: presignedLink.URL,
    });
    return presignedLink.key;
  };

  const uploadProduct = async ({ files, data }: uploadProductArgs) => {
    try {
      const photoKeys: string[] = [];

      const newProduct = await createProduct({ ...data });

      await Promise.all(
        files.map(async (file) => {
          const newFileKey = await uploadFileWithPresignedLink({
            file,
            unitId: newProduct.id,
          });
          photoKeys.push(newFileKey);
        })
      ).then(async () => {
        await asignPhotoKeys({ photoKeys, productId: newProduct.id });
      });
    } catch (error) {
      console.log(error);
    }
  };
  const uploadProductMutation = useMutation(["uploadProduct"], uploadProduct);
  const uploadFileMutation = useMutation(
    ["uploadFile"],
    uploadFileWithPresignedLink
  );
  return { uploadProductMutation, uploadFileMutation };
};
