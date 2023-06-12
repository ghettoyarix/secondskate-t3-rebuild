import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../UI/Button";
import Router from "next/router";
import { signIn, useSession } from "next-auth/react";

const MobileNavigator = () => {
  const session = useSession();
  const homeAction = () => {
    void Router.push("/");
  };
  const uploadAction = () => {
    if (session) {
      void Router.push("/upload");
    } else {
    }
  };
  const profileAction = () => {
    if (session.data?.user) {
      void Router.push("/profile/you");
    } else {
      return void signIn();
    }
  };
  const BUTTONS = [
    {
      title: { eng: "Home", ua: "" },
      action: homeAction,
      pic: "navigator/home.svg",
    },
    { title: { eng: "Post", ua: "" }, action: uploadAction, pic: "plus.svg" },
    {
      title: { eng: "Profile", ua: "" },
      action: profileAction,
      pic: "user.svg",
    },
  ];
  return (
    <div className="fixed bottom-0 z-[25] flex h-16 w-full justify-between border-t border-primary  bg-white px-4 pt-1">
      {BUTTONS.map((button, i) => {
        return (
          <div
            className="flex w-full flex-col items-center  justify-center "
            key={button.pic}
            onClick={button.action}
          >
            <Image
              height={30}
              width={30}
              alt="pic"
              src={`/svg/${button.pic}`}
            ></Image>
            <p> {button.title.eng}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MobileNavigator;
