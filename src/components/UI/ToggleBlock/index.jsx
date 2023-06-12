import React from "react";

const ToggleBlock = ({ title, description, isToggleg, onToggle }) => {
  return (
    <div className="flex w-full justify-between">
      <div>
        <p className=" mb-1 text-lable font-bold">{title}</p>
        <p className=" text-lable  text-gray">{description}</p>
      </div>
      <div className="py-3">
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            onChange={onToggle}
            type="checkbox"
            checked={isToggleg}
            value=""
            className="peer sr-only"
          />
          <div
            className="dark:bg-gray-700 after:border-gray-300 dark:border-gray-600  peer h-6 w-11 rounded-full bg-lightGray after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:bg-white after:transition-all 
          after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:border-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800"
          ></div>
        </label>
      </div>
    </div>
  );
};
ToggleBlock.defaultProps = {
  isToggleg: false,
};
export default ToggleBlock;
