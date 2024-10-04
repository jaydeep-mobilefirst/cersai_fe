import React, { useEffect, useRef, useState } from "react";
import "./select_button.css";

interface Option {
  value: string;
  label: string;
}

type Props = {
  setOption: any;
  options: Option[];
  selectedOption?: string | null;
  placeholder: string;
  searchInputOnchange?: any;
  searchInputValue?: string;
  showSearchInput?: boolean;
  variant?: "basic" | "outline";
  className?: string;
  multiselect?: boolean;
  allSelectedOptions?: any[];
  remove?: (data: any) => void;
  disabled?: boolean;
};

const SelectButtonMultiselect = ({
  setOption,
  options,
  placeholder,
  searchInputOnchange,
  searchInputValue,
  selectedOption,
  showSearchInput,
  className,
  variant,
  allSelectedOptions = [],
  multiselect,
  disabled = false,
  remove = (data: any) => {},
}: Props) => {
  const selectedOptionsArray = Array.isArray(allSelectedOptions)
    ? allSelectedOptions
    : [];
  console.log(selectedOptionsArray, "selectedOptionsArray");
  const [arrowDirectionToggle, setArrowDirectionToggle] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const variantOptions = {
    basic: `w-full h-[50px] px-[8px] py-[16px] flex justify-between items-center bg-white border border-gray-300 rounded-md shadow-sm text-gray-700 hover:bg-gray-50 focus:ring-1 focus:ring-gray-300 text-left`,
    outline: `w-full h-[36px] px-[8px] py-[16px] flex justify-between items-center bg-white border border-blue-600 rounded-md shadow-sm text-gray-700 hover:bg-gray-50 focus:ring-1 focus:ring-gray-300 text-left`,
    multiselect: `w-full px-[8px] py-[16px] pr-[17px] flex flex-wrap gap-2 bg-white border border-blue-600 rounded-md shadow-sm text-gray-700 hover:bg-gray-50 focus:ring-1 focus:ring-gray-300 text-left`,
  };

  const variantDropdown = {
    basic: `block w-full rounded-md bg-white shadow-lg relative`,
    outline: `block w-full rounded-md bg-white shadow-lg relative`,
  };

  useEffect(() => {
    setArrowDirectionToggle(false);
  }, [selectedOption]);

  // Close the dropdown if the user clicks outside of it
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setArrowDirectionToggle(false);
    }
  };

  useEffect(() => {
    if (arrowDirectionToggle) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [arrowDirectionToggle]);

  const handleMultiselect = (e: any, option: any) => {
    e.preventDefault();
    setOption(option);
    setArrowDirectionToggle(false);
  };
  return (
    <div className={className}>
      <button
        className={
          multiselect
            ? variantOptions["multiselect"]
            : variantOptions[variant ?? "basic"]
        }
        disabled={disabled} // Apply the disabled prop here
        style={
          disabled
            ? {
                cursor: "not-allowed",
                opacity: 0.6,
                backgroundColor: "#E5E4E2",
              }
            : {}
        }
        type="button"
        ref={buttonRef}
        onClick={() => setArrowDirectionToggle(!arrowDirectionToggle)}
      >
        {!multiselect && selectedOption
          ? selectedOption
          : !multiselect && placeholder}
        {multiselect && allSelectedOptions && allSelectedOptions?.length > 0
          ? allSelectedOptions?.map((s) => {
              return (
                <span className="bg-blue-100 py-1 px-1" key={s.value}>
                  {s.label}
                  <span
                    className="text-red-500 ml-1 hover:bg-red-100 p-1"
                    onClick={() => remove(s)}
                  >
                    X
                  </span>
                </span>
              );
            })
          : "Select"}
        <div
          className={`p-2 rounded-md hover:bg-gray-200 absolute right-0 ${
            className === "relative" && "absolute right-2 top-[13px]"
          }`}
        >
          {!arrowDirectionToggle ? (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 15l7-7 7 7"
              ></path>
            </svg>
          )}
        </div>
      </button>
      {arrowDirectionToggle && (
        <div
          ref={dropdownRef}
          className={variantDropdown[variant ?? "basic"]}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          {showSearchInput && searchInputOnchange && (
            <div className="relative p-2">
              <svg
                className="absolute left-4 top-4 text-gray-400"
                width="24px"
                height="24px"
                viewBox="0 -0.5 25 25"
                fill="none"
                color="gray"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.5 10.7655C5.50003 8.01511 7.44296 5.64777 10.1405 5.1113C12.8381 4.57483 15.539 6.01866 16.5913 8.55977C17.6437 11.1009 16.7544 14.0315 14.4674 15.5593C12.1804 17.0871 9.13257 16.7866 7.188 14.8415C6.10716 13.7604 5.49998 12.2942 5.5 10.7655Z"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.029 16.5295L19.5 19.0005"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="search"
                value={searchInputValue}
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:border-gray-300 focus:ring-1 focus:ring-gray-100 focus:outline-none"
                placeholder="Search"
                style={{ paddingLeft: "2.5rem" }}
                onChange={searchInputOnchange}
              />
            </div>
          )}
          <div
            className="overflow-auto max-h-40 custom-scrollbar flex flex-col absolute bg-white w-full rounded-md"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {!multiselect &&
              options.map((option, index) => (
                <a
                  key={index}
                  onClick={(e) => {
                    setOption(option);
                    setArrowDirectionToggle(false);
                  }}
                  href="#"
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-gray-900 z-10"
                  role="menuitem"
                >
                  {option.label}
                </a>
              ))}
            {multiselect &&
              options.map((option, index) => (
                <a
                  key={index}
                  onClick={(e) => handleMultiselect(e, option)}
                  href="#"
                  className={`px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-gray-900 ${
                    allSelectedOptions?.find((f) => f.value === option.value) &&
                    "bg-blue-50"
                  }`}
                  role="menuitem"
                >
                  {option.label}
                </a>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectButtonMultiselect;
