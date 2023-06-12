import React from "react";
import Image from "next/image";
const NavArrows = ({ leftArrowClick, rightArrowClick }) => {
  return (
    <div className="flex  max-h-[40px]  gap-4">
      <div
        onClick={leftArrowClick}
        className=" cursor-pointer rounded-full border-lightGray px-3 py-4 hover:border  hover:border-2"
      >
        <Image
          alt="leftArrow"
          className="  "
          width={14}
          height={9}
          src="/svg/leftArrow.svg"
        ></Image>
      </div>
      <div
        onClick={rightArrowClick}
        className=" cursor-pointer rounded-full  border-lightGray px-3 py-4 hover:border  hover:border-2"
      >
        <Image
          alt="rightArrow"
          className="  "
          width={14}
          height={9}
          src="/svg/rightArrow.svg"
        ></Image>
      </div>
    </div>
  );
};

export default NavArrows;
