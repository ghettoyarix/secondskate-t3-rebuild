import { type } from "os";
import React, { memo } from "react";
import CircleLoader from "~/components/widgets/CircleLoader";

import Image from "next/image";
import Validator from "./Validator";
type LoginInputProps = {
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  isValidated?: boolean | null;
  title: string;
  type?: "password" | "email" | "text";
  isChecking?: boolean | null;
  errors?: string[];
};

const LoginInput = ({
  onChange,
  isChecking,
  title,
  isValidated,
  name,
  value,
  type,
  errors,
}: LoginInputProps) => {
  return (
    <div className="mt-4">
      <div className="flex items-center gap-2">
        <label
          htmlFor={name}
          className="undefined block text-sm font-medium text-gray-700"
        >
          {title}
        </label>
        <Validator isChecking={isChecking} isValidated={isValidated} />
      </div>
      <div className="flex flex-col items-start">
        <input
          value={value}
          onChange={onChange}
          type={type}
          name={name}
          className="outline-gray border-lightGray mt-1 block w-full rounded-md shadow-sm outline outline-2 focus:border-indigo-300 focus:outline-primary focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <p className="text-error">{errors?.join(" ")}</p>
      </div>
    </div>
  );
};
const MemoLoginInput = memo(LoginInput);
export default MemoLoginInput;
