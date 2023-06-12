import React from "react";
import SearchBar from "../widgets/SearchBar";
import Notifications from "./Notifications";
import { useSession, signIn, signOut } from "next-auth/react";
import { HeaderProvider } from "src/context/HeaderContext";
import { useRouter } from "next/router";
import Button from "../UI/Button";
import Link from "next/link";
const Menu = () => {
  const router = useRouter();

  const { data: session } = useSession();
  const handleSignOut = () => {
    return void signOut();
  };
  const handleSignIn = () => {
    if (session) {
      void router.push("/profile/you");
    }
    if (!session) {
      return void signIn();
    }
  };
  return (
    <>
      <div className=" hidden  xs:block"></div>
      <div className=" hidden items-center gap-8 mob:flex">
        <Notifications></Notifications>

        <Link href={"/upload"}>
          <Button primary>Upload</Button>
        </Link>

        <Button className="text-white" onClick={handleSignIn}>
          {session ? session?.user.username || "Profile" : "Log in"}
        </Button>

        {session && <button onClick={handleSignOut}>Log out</button>}
      </div>
    </>
  );
};

export default Menu;
