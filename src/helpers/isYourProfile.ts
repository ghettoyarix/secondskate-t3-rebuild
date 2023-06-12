import { profile } from "console";
import Router from "next/router";

export const isYourProfile = () => {
  return Router.asPath.includes("profile/you");
};
