import React, { forwardRef } from "react";
import cn from "classnames";
import { useBidContext } from "src/context/BidContext";
type BidLayoutProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const BidLayout = forwardRef<HTMLDivElement, BidLayoutProps>(
  ({ children, className, ...rest }, ref) => {
    const { isDeleted } = useBidContext();
    return (
      <div
        ref={ref}
        className={cn(
          " border-1 mb-1 flex h-[433px] w-[256px] flex-col justify-between rounded-[12px] border   border-lightGray bg-white duration-150	",
          className,
          {
            "hover:scale-[1.07]": !true,
          },
          {
            hidden: isDeleted,
          }
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
BidLayout.displayName = "BidLayout";
export default BidLayout;
