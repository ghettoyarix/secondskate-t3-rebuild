import React from "react";
import Image from "next/image";
import SearchBar from "~/components/widgets/SearchBar";
import Button from "../UI/Button";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { HeaderProvider } from "~/context/HeaderContext";
import { useRouter } from "next/router";
const Header = () => {
  const router = useRouter();
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
  const { data: session } = useSession();
  return (
    <HeaderProvider>
      <div className=" wrapper    ">
        <div className="   z-20 flex  items-center  justify-between px-4 text-reg font-bold  ">
          <div className="flex items-center gap-8  py-6">
            <Link href="/">
              <div className="items-centerpb-1 flex  gap-2  border-0 border-lightGray  tab:border-r-2">
                <Image
                  alt="logo"
                  height={32}
                  width={32}
                  src="/svg/secondskate.svg"
                ></Image>

                <p className=" mr-8 text-mid ">secondskate </p>
              </div>
            </Link>
            <div className="  hidden gap-8 tab:flex   "></div>
          </div>
          <div className=" hidden  xs:block">
            <SearchBar></SearchBar>
          </div>
          <div className=" hidden items-center gap-8 mob:flex">
            <div className="relative">
              <svg
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill=""
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 15.0233C18 15.5113 17.6043 15.907 17.1163 15.907H0.88372C0.395655 15.907 0 15.5113 0 15.0233C0 14.5352 0.395656 14.1395 0.883721 14.1395H0.9V7.98088C0.9 3.57288 4.527 0 9 0C13.473 0 17.1 3.57288 17.1 7.98088V14.1395H17.1163C17.6043 14.1395 18 14.5352 18 15.0233ZM2.7 14.1395H15.3V7.98088C15.3 4.5494 12.4794 1.76744 9 1.76744C5.5206 1.76744 2.7 4.5494 2.7 7.98088V14.1395ZM6.97604 17.7558C6.73121 17.2608 7.19772 16.7907 7.75 16.7907H10.25C10.8023 16.7907 11.2688 17.2608 11.024 17.7558C10.9155 17.9751 10.7699 18.1773 10.591 18.3529C10.169 18.7672 9.59674 19 9 19C8.40326 19 7.83097 18.7672 7.40901 18.3529C7.23013 18.1773 7.08449 17.9751 6.97604 17.7558Z"
                  fill="#777E91"
                />
              </svg>
              {true && (
                <svg
                  className="absolute left-4 top-[-10px]"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="12" height="12" rx="6" fill="#45B36B" />
                </svg>
              )}
            </div>

            <Link href={"/upload"}>
              <Button primary>Upload</Button>
            </Link>

            <Button onClick={handleSignIn}>
              {session ? session?.user.username || "Profile" : "Log in"}
            </Button>

            {session && <button onClick={handleSignOut}>Log out</button>}
          </div>
          <svg
            className="block mob:hidden"
            width="22"
            height="12"
            viewBox="0 0 22 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.66634 0.666992C0.929961 0.666992 0.333008 1.26395 0.333008 2.00033C0.333008 2.73671 0.929961 3.33366 1.66634 3.33366H20.333C21.0694 3.33366 21.6663 2.73671 21.6663 2.00033C21.6663 1.26395 21.0694 0.666992 20.333 0.666992H1.66634Z"
              fill="#777E91"
            />
            <path
              d="M1.66634 8.66699C0.929961 8.66699 0.333008 9.26395 0.333008 10.0003C0.333008 10.7367 0.929961 11.3337 1.66634 11.3337H20.333C21.0694 11.3337 21.6663 10.7367 21.6663 10.0003C21.6663 9.26395 21.0694 8.66699 20.333 8.66699H1.66634Z"
              fill="#777E91"
            />
          </svg>
        </div>
      </div>
    </HeaderProvider>
  );
};

export default Header;
