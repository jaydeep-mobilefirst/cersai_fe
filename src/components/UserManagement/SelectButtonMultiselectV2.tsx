import React, { useEffect, useRef, useState } from "react";
import "./select_button.css";

interface Option {
  value: string;
  label: string;
}

type Props = {
  setOption: (selectedOptions: Option[]) => void;
  options: Option[];
  selectedOption?: string | null;
  placeholder: string;
  searchInputOnchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchInputValue?: string;
  showSearchInput?: boolean;
  variant?: "basic" | "outline";
  className?: string;
  multiselect?: boolean;
  allSelectedOptions?: Option[];
  remove?: (data: Option) => void;
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
  remove = (data: Option) => {},
}: Props) => {
  const [arrowDirectionToggle, setArrowDirectionToggle] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);

  const selectedOptionsArray = Array.isArray(allSelectedOptions)
    ? allSelectedOptions
    : [];
  console.log({ selectedOptionsArray }, "selectedOptionsArray");

  const variantOptions = {
    basic: `w-full h-[50px] px-[8px] py-[16px] flex justify-between items-center bg-white border border-gray-300 rounded-md shadow-sm text-gray-700 hover:bg-gray-50 focus:ring-1 focus:ring-gray-300 text-left`,
    outline: `w-full h-[36px] px-[8px] py-[16px] flex justify-between items-center bg-white border border-gray-300 rounded-md shadow-sm text-gray-700 hover:bg-gray-50 focus:ring-1 focus:ring-gray-300 text-left`,
    multiselect: `w-full px-[8px] py-[16px] pr-[17px] flex flex-wrap gap-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-700 hover:bg-gray-50 focus:ring-1 focus:ring-gray-300 text-left`,
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

  useEffect(() => {
    // Filter options based on search input
    setFilteredOptions(
      options.filter((option) =>
        option.label
          .toLowerCase()
          .includes(searchInputValue?.toLowerCase() || "")
      )
    );
  }, [options, searchInputValue]);

  const handleMultiselect = (
    e: React.MouseEvent<HTMLAnchorElement>,
    option: Option
  ) => {
    e.preventDefault();
    const exists = selectedOptionsArray.some(
      (sel) => sel.value === option.value
    );
    const updatedOptions = exists
      ? selectedOptionsArray.filter((sel) => sel.value !== option.value)
      : [...selectedOptionsArray, option];

    setOption(updatedOptions);
  };

  const handleRemoveOption = (option: Option) => {
    const updatedOptions = selectedOptionsArray.filter(
      (selected) => selected.value !== option.value
    );
    setOption(updatedOptions);
  };

  return (
    <div className={className}>
      <button
        className={
          multiselect
            ? variantOptions["multiselect"]
            : variantOptions[variant ?? "basic"]
        }
        type="button"
        ref={buttonRef}
        onClick={() => setArrowDirectionToggle(!arrowDirectionToggle)}
      >
        {!multiselect && selectedOption
          ? selectedOption
          : !multiselect && placeholder}
        {multiselect && selectedOptionsArray.length > 0
          ? selectedOptionsArray.map((s) => (
              <span className="bg-blue-100 py-1 px-1" key={s.value}>
                {s.label}
                <span
                  className="text-red-500 ml-1 hover:bg-red-100 p-1 cursor-pointer"
                  onClick={() => handleRemoveOption(s)}
                >
                  X
                </span>
              </span>
            ))
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
              />
            </svg>
          )}
        </div>
      </button>
      {arrowDirectionToggle && (
        <div
          ref={dropdownRef}
          className={variantDropdown[variant ?? "basic"]}
          role="menu"
        >
          {showSearchInput && searchInputOnchange && (
            <div className="relative p-2">
              <input
                type="search"
                value={searchInputValue}
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300"
                placeholder="Search"
                onChange={searchInputOnchange}
              />
            </div>
          )}
          <div className="overflow-auto max-h-40 custom-scrollbar flex flex-col absolute bg-white w-full rounded-md z-100">
            {filteredOptions.map((option, index) => (
              <a
                key={index}
                onClick={(e) => handleMultiselect(e, option)}
                href="#"
                className={`px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 ${
                  selectedOptionsArray.find((f) => f.value === option.value) &&
                  "bg-blue-50"
                }`}
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
