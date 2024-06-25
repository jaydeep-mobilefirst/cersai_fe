import React, { useEffect, useRef, useState } from "react";
import "./select_button.css";

interface Option {
  value: string;
  label: string;
}

type Props = {
  onSelect?: (data: any) => void;
  setOption?: (value: string) => void;
  options: Option[];
  selectedOption?: string | null;
  placeholder: string;
  searchInputOnchange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchInputValue?: string;
  showSearchInput?: boolean;
  disabled?: boolean;
  backgroundColor?: string;
};

const SelectButton = ({
  setOption,
  options,
  placeholder,
  searchInputOnchange,
  searchInputValue,
  selectedOption,
  showSearchInput,
  onSelect,
  disabled,
  backgroundColor,
}: Props) => {
  const [arrowDirectionToggle, setArrowDirectionToggle] = useState(false);
  const [optionsToShow, setOptionsToShow] = useState<any[]>(options);
  useEffect(() => {
    setArrowDirectionToggle(false);
  }, [selectedOption]);

  // Find the label of the currently selected option
  const selectedLabel =
    options?.find((option: any) => option?.value === selectedOption)?.label ||
    placeholder;

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = (event: any) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
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

  return (
    <div className="w-full relative">
      <button
        ref={buttonRef}
        style={{ backgroundColor }}
        disabled={disabled}
        className="h-[56px] px-2 md:px-8 py-[16px] flex justify-between items-center bg-white border border-gray-300 rounded-md shadow-sm text-gray-700 hover:bg-gray-50 focus:ring-1 focus:ring-gray-300 text-left w-full"
        type="button"
        onClick={() => setArrowDirectionToggle(!arrowDirectionToggle)}
      >
        {selectedLabel}
        <div>
          {!arrowDirectionToggle ? (
            <svg
              className="w-4 h-4 ml-2 -mr-1"
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
              className="w-4 h-4 ml-2 -mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              ></path>
            </svg>
          )}
        </div>
      </button>
      {arrowDirectionToggle && (
        <div
          className="absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          style={{ padding: "8px 16px" }}
        >
          {showSearchInput && searchInputOnchange && (
            <div className="relative p-2">
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
            className="overflow-auto max-h-40 custom-scrollbar"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
            ref={dropdownRef}
          >
            {options?.map((option, index) => (
              <a
                key={index}
                onClick={() => {
                  if (setOption) {
                    setOption(option.value);
                  }
                  setArrowDirectionToggle(false);
                  if (onSelect) {
                    onSelect(option);
                  }
                }}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-gray-900 cursor-pointer"
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

export default SelectButton;
