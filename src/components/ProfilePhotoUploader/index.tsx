import React, { useState, useEffect } from "react";
import Image from "next/image";
import Dropzone from "react-dropzone";
import Button from "../UI/Button";
import { useSession } from "next-auth/react";
import { useUpdateProfilePhoto } from "~/hooks/useUpdateProfilePhoto";
import { getImageUrl } from "~/helpers/getImageUrl";
import Router from "next/router";
const ProfilePhotoUploader = () => {
  const { updateProfilePhotoMutation } = useUpdateProfilePhoto();
  const { data: profile } = useSession();

  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
  const [actionRequired, setActionRequired] = useState(false);
  const {
    mutate: updatePhoto,
    isSuccess,
    isLoading: profileUploading,
  } = updateProfilePhotoMutation;
  const handleChange = (acceptedFiles: File[]) => {
    setDroppedFiles(acceptedFiles);
  };
  const handleUpload = () => {
    if (droppedFiles[0]) {
      updatePhoto(
        { file: droppedFiles[0] },
        {
          onSuccess: () => {
            setActionRequired(false);
          },
        }
      );
    }
  };

  useEffect(() => {
    if (droppedFiles.length > 0) {
      setActionRequired(true);
    }
  }, [droppedFiles]);

  return (
    <div className="flex gap-12">
      <Image
        onClick={() => console.log(profile?.user.image)}
        alt="profilepic"
        objectPosition="center"
        height={128}
        width={128}
        className="aspect-square   rounded-full"
        src={
          (droppedFiles[0] && URL.createObjectURL(droppedFiles[0])) ||
          getImageUrl(profile?.user.image) ||
          "/svg/no-photo.svg"
        }
      ></Image>
      <div className="flex max-w-[256px] flex-col justify-between text-lable  ">
        <p>Profile photo</p>
        <p className="text-small  text-gray">
          We recommend an image of at least 400x400. Gifs work too 🙌
        </p>

        <Dropzone
          maxFiles={1}
          onDrop={(acceptedFiles) => handleChange(acceptedFiles)}
        >
          {({ getRootProps, getInputProps }) => (
            <section className="flex gap-6">
              <div {...getRootProps()}>
                <input
                  onSelect={(e: React.ChangeEvent<HTMLInputElement>) =>
                    e.target.value
                  }
                  {...getInputProps()}
                />
                <Button>Upload</Button>
              </div>{" "}
              <Button
                onClick={handleUpload}
                actionIsLoading={profileUploading}
                actionRequired={actionRequired}
              >
                Update
              </Button>
            </section>
          )}
        </Dropzone>
      </div>
    </div>
  );
};

export default ProfilePhotoUploader;
