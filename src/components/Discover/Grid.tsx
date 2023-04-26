import { useRouter } from "next/router";
import React, { type ReactNode, type FC, useLayoutEffect, useRef } from "react";

interface GridProps {
  children: ReactNode[];
}

const Grid: FC<GridProps> = ({ children }) => {
  const router = useRouter();

  const route = router.asPath;

  return (
    <div className="flex justify-center">
      <div
        className={` mt-6  grid grid-cols-1 place-items-center gap-8   xs:grid-cols-2
        mob:grid-cols-3 tab:grid-cols-4`}
      >
        {children}
      </div>
    </div>
  );
};

export default Grid;
