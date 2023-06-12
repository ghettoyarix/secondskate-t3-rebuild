import React, { ReactNode, ReactElement } from "react";
import cn from "classnames";

type LabelProps = {
  children: ReactNode;
  secondary?: boolean;
  classNames?: string;
};

const Label = ({
  children,
  secondary,
  classNames,
}: LabelProps): ReactElement => {
  return (
    <p
      className={cn(
        "my-auto content-center whitespace-nowrap rounded-[4px] border border-2	 bg-white  p-[2px] px-1 align-middle text-lable font-bold",
        {
          "border-gray text-gray": secondary,
        },
        { "border-green text-green": !secondary },
        classNames
      )}
    >
      <span>{children}</span>
    </p>
  );
};

export default Label;
