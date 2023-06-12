import React from "react";
import cn from "classnames";
interface InputBlockProps {
  value?: string | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  placeholder?: string;
  big?: boolean;
  name: string;
}

const InputBlock: React.FC<InputBlockProps> = ({
  value,
  onChange,
  title,
  placeholder,
  big,
  name,
}) => {
  return (
    <div>
      <p className="mb-3 text-small font-bold uppercase text-gray">{title}</p>
      <input
        name={name}
        value={value || ""}
        onChange={onChange}
        className={cn(
          "h-12 w-full rounded-xl   border-2 border-gray px-2 focus:border-primary",
          { "mt-0 h-20": big }
        )}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputBlock;
