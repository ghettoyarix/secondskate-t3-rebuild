import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "~/utils/uploadFile";
import { api } from "~/utils/api";
export const useUpdateProfilePhoto = () => {
  const { mutateAsync: getPresignedLink } =
    api.file.getPresignedLink.useMutation();
  const { mutateAsync: updatePhotoRecord } =
    api.user.updateProfilePhoto.useMutation();
  type uploadProductArgs = { file: File };
  const updatePhoto = async ({ file }: uploadProductArgs) => {
    try {
      const link = await getPresignedLink({
        fileType: file.type,
        unitId: "_",
        folderName: "profilePhotos",
      });
      await uploadFile({
        file: file,
        url: link.URL,
      });
      await updatePhotoRecord({ photoKey: link.key });
    } catch (error) {
      console.log(error);
    }
  };
  const updateProfilePhotoMutation = useMutation(["updatePhoto"], updatePhoto);

  return { updateProfilePhotoMutation };
};
