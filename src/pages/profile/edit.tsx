import React, { ChangeEventHandler, useEffect, useRef, useState } from "react";
import Button from "~/components/UI/Button";
import InputBlock from "~/components/UI/InputBlock";
import ProfilePhotoUploader from "~/components/ProfilePhotoUploader";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import formChangeHandler from "~/helpers/formChangeHandler";
import { type UpdateProfileInfoType } from "~/server/models/user";
const Edit = ({}) => {
  const { data: profile } = useSession();
  const user = profile?.user;
  const { mutate: updateInfo, isLoading } =
    api.user.updateUserInfo.useMutation();
  type ProfileDataKeys =
    | "description"
    | "telegram"
    | "title"
    | "username"
    | "instagram";

  interface Input {
    title: string;
    placeholder: string;
    name: ProfileDataKeys;
    value?: string | null;
  }
  const accountInfoInputs: Input[] = [
    {
      title: "Username",
      placeholder: "The name ",
      name: "username",
      value: user?.username,
    },
    {
      title: "Accout title",
      placeholder: "e.g. OG shop",
      name: "title",
      value: user?.title,
    },
  ];
  const socialsInfoInputs: Input[] = [
    {
      title: "Instagram",
      placeholder: "Your instagram",
      value: user?.instagram,
      name: "instagram",
    },
    {
      title: "Telegram",
      placeholder: "Your telegram",
      name: "telegram",
      value: user?.telegram,
    },
  ];
  const defaultProfileData = {
    username: "",
    title: "",
    description: "",
    telegram: "",
    instagram: "",
  };

  const [profileData, setProfileData] =
    useState<UpdateProfileInfoType>(defaultProfileData);

  useEffect(() => {
    if (user) {
      setProfileData({
        description: user?.description,
        telegram: user?.telegram,
        title: user?.title,
        username: user?.username,
        instagram: user?.instagram,
      });
    }
  }, [profile?.user]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    formChangeHandler(event, profileData, setProfileData);
  };
  const callUpdate = () => {
    updateInfo(profileData);
  };
  const clearAll = () => {
    setProfileData({ ...defaultProfileData, username: profileData.username });
  };
  return (
    user && (
      <div className="wrapper flex flex-col gap-[76px]">
        <div className="">
          <h1
            onClick={() => {
              console.log(user);
            }}
            className="text-giant font-bold"
          >
            Edit profile
          </h1>
          <p className="max-w-[376px] text-reg text-gray">
            You can set preferred display name, create your profile URL and
            manage other personal settings.
          </p>
        </div>
        <ProfilePhotoUploader></ProfilePhotoUploader>
        <div className="mb-8 grid grid-cols-2 border-b-2 border-lightGray pb-8">
          <div className="max-w-[412px]">
            <p className="mb-4">Account info</p>
            <div className="flex flex-col gap-4">
              {accountInfoInputs.map((obj) => (
                <InputBlock
                  onChange={handleChange}
                  key={obj.title}
                  value={profileData[obj.name]}
                  placeholder={obj.placeholder}
                  title={obj.title}
                  name={obj.name}
                ></InputBlock>
              ))}
              <p className=" z text-small font-bold uppercase text-gray ">
                Bio
              </p>
              <textarea
                onChange={handleChange}
                value={profileData?.description || ""}
                onResize={() => null}
                placeholder="Write something about yourself in 100 characters."
                className="input-profile resize-none"
                maxLength={100}
                cols={30}
                rows={4}
                name="description"
              ></textarea>
            </div>
          </div>

          <div>
            <p className="mb-4">Social</p>
            <div className="flex flex-col gap-4">
              {socialsInfoInputs.map((obj) => (
                <InputBlock
                  onChange={handleChange}
                  key={obj.title}
                  value={profileData[obj.name] || ""}
                  placeholder={obj.placeholder}
                  name={obj.name}
                  title={obj.title}
                ></InputBlock>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-[-70px] flex gap-4">
          <Button actionIsLoading={isLoading} onClick={callUpdate} primary>
            Update Profile
          </Button>
          <Button onClick={clearAll}>Clear all</Button>
        </div>
      </div>
    )
  );
};

export default Edit;
