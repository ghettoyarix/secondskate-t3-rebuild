import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { User } from "@prisma/client";
import Button from "../UI/Button";
import { getImageUrl } from "~/helpers/getImageUrl";
const ProfileBar = ({
  info,
  isYourOwnAccount,
}: {
  info?: Partial<User | null>;
  isYourOwnAccount: boolean;
}) => {
  return (
    <>
      <div
        className="  w-full   justify-between rounded-2xl  border border-lightGray
   px-9  py-8 shadow-xl xs:mr-10"
      >
        <div className="mb-4 flex flex-wrap   items-center justify-center gap-6 border-b-2 border-lightGray pb-4 xs:justify-between">
          <Image
            className="aspect-square rounded-full"
            width={100}
            height={100}
            alt="profilePic"
            src={getImageUrl(info?.image) || "/svg/no-photo.svg"}
          ></Image>

          <p className="text-mid font-semibold">@{info?.username}</p>

          <p className=" max-w-[300px]	   break-words  	 text-center text-small text-gray">
            {info?.description}
          </p>

          <div className="flex flex-col justify-start gap-2">
            <div className="flex gap-2">
              <Image
                className="rounded-full"
                alt="insta"
                width={20}
                height={20}
                src="/svg/insta.svg"
              ></Image>
              <p>{info?.instagram || "not specified"}</p>
            </div>
            <div className="flex gap-2">
              <Image
                className="rounded-full"
                alt="tg"
                width={20}
                height={20}
                src="/svg/telegram.svg"
              ></Image>
              <p>{info?.telegram || "not specified"}</p>
            </div>
          </div>

          {isYourOwnAccount && (
            <Link href="/profile/edit">
              <div>
                <Button className="mb-4">Edit profile</Button>
              </div>
            </Link>
          )}
        </div>
        {/* <p
          onClick={() => console.log(info)}
          className="mt-4 text-center text-small text-gray"
        >
          Member since -- --
        </p> */}
      </div>
    </>
  );
};

export default ProfileBar;
