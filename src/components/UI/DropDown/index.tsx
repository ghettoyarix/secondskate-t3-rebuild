import React, {
  useState,
  useRef,
  type FC,
  type SetStateAction,
  type Dispatch,
} from "react";
import type { DiscoverCondition } from "src/zustand/discover";
import type { Option, SortOption } from "src/models/FilterOptions";
import { chosenLanguage } from "src/helpers/parseTittle";
import getTitle from "src/helpers/getTitle";
import useOutsideHandler from "src/helpers/useOutsideHandler";
type DropDownOption = Option[] | SortOption[];

type DropDownProps = {
  options: DropDownOption;
  chosenOption: Option | SortOption | DiscoverCondition;
  pickOption: (obj: Option) => void | Dispatch<SetStateAction<Option>>;
  searchable?: boolean;
};
const DropDown: FC<DropDownProps> = ({
  options,
  pickOption,
  chosenOption,
  searchable,
}) => {
  const [openFlag, setOpenFlag] = useState(false);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const [searchedValue, setSearchedValue] = useState<Option | string>();

  const onOptionClick = (obj: Option) => {
    pickOption(obj);
    setOpenFlag(false);
  };
  useOutsideHandler(wrapperRef, () => setOpenFlag(false));

  return (
    <div
      ref={wrapperRef}
      className="relative inline-block h-full w-full min-w-[160px] text-left"
    >
      <div className="inline-flex  w-full justify-center">
        <button
          onClick={(e) => {
            if (e.target !== inputRef.current) {
              setOpenFlag(!openFlag);
            } else if (!openFlag) {
              setOpenFlag(true);
            }
          }}
          type="button"
          className="bg-whie text-sm  text-gray-700  hover:bg-gray-50 focus:ring-offset-gray-100 inline-flex 
          h-12 w-full  items-center justify-center rounded-xl  border border-2 border-gray px-4 
          font-medium shadow-sm 
          focus:border-none focus:ring-2     focus:ring-indigo-500 focus:ring-offset-2"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <p
            defaultValue={getTitle(chosenOption as Option, chosenLanguage)}
            className="max-w-[140px] bg-white focus:border-none"
          >
            {getTitle(chosenOption as Option, chosenLanguage) || ""}
          </p>
          <div className="ml-auto h-5 min-w-[20px] rounded-full border ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </button>
      </div>

      {openFlag && (
        <div
          className="absolute right-0 z-10 max-h-[200px] w-full	   origin-top-right overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:border-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          {searchable && (
            <input
              placeholder="Seaching for..."
              value={searchedValue as string}
              onChange={(e) => {
                console.log(e.target.value);
                setSearchedValue(e.target.value);
              }}
              className="w-full  overflow-hidden py-2   text-center text-reg text-black hover:bg-lightGray"
            ></input>
          )}
          <div className=" " role="none">
            {((options as Option[]) || (options as SortOption[]))
              .filter((obj: Option) =>
                searchable && searchedValue
                  ? obj.title
                      .toString()
                      .toLowerCase()
                      .includes(searchedValue?.toString().toLowerCase())
                  : obj
              )
              .map((obj: Option, i: number) => (
                <p
                  key={i}
                  onClick={() => onOptionClick(obj)}
                  className="w-full  overflow-hidden py-2   text-center text-reg text-black hover:bg-lightGray"
                >
                  {getTitle(obj, chosenLanguage)}
                </p>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;
