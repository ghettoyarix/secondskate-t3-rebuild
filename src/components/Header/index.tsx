import React from "react";
import Image from "next/image";

import Link from "next/link";
import { HeaderProvider } from "src/context/HeaderContext";
import BurgerButton from "./BurgerButton";
import SearchBar from "../widgets/SearchBar";
import Menu from "./Menu";
const Header = () => {
  return (
    <HeaderProvider>
      <div className="   z-20  flex items-center  justify-between  bg-[#111827] px-4 text-reg font-bold  ">
        <div className="flex items-center gap-8  py-6">
          <Link href="/">
            <div className="flex items-center gap-2 border-0 border-lightGray  pb-1 pr-2  tab:border-r-2">
              <Image
                alt="logo"
                height={32}
                width={32}
                src="/svg/secondskate.svg"
              ></Image>

              <p className=" mr-8 text-mid text-white ">secondskate</p>
            </div>
          </Link>
          <div className="flex h-[20px]    w-full justify-center bg-primary"></div>
        </div>
        <Menu></Menu>
      </div>
    </HeaderProvider>
  );
};

export default Header;
