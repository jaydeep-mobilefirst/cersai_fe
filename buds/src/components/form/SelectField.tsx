import React, { useEffect, useState, useRef } from "react";
export interface Option {
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
  height: string;
};

const SelectField = ({
  setOption,
  options,
  placeholder,
  searchInputOnchange,
  searchInputValue,
  selectedOption,
  height,
}: Props) => {
  const [arrowDirectionToggle, setArrowDirectionToggle] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setArrowDirectionToggle(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setArrowDirectionToggle(false);
    return () => {};
  }, [selectedOption]);
  return (
    <div className="w-full relative" ref={dropdownRef}>
      <button
        className=" w-full  flex justify-between items-center bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700 hover:bg-gray-50 focus:ring-1 focus:ring-gray-300 text-left"
        type="button"
        onClick={() => setArrowDirectionToggle(!arrowDirectionToggle)}
        style={{
          height: height,
          padding: "8px 16px",
          marginTop: "8px",
          border: "1px solid #E6E6E6",
          borderRadius: "8px",
        }}
      >
        {selectedOption ? selectedOption : placeholder}
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 15l7-7 7 7"
              ></path>
            </svg>
          )}
        </div>
      </button>
      {arrowDirectionToggle && (
        <div
          className="absolute w-full rounded-md bg-white shadow-lg z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div
            className="overflow-auto max-h-40 custom-scrollbars"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option, index) => (
              <a
                key={index}
                onClick={() => setOption(option.value)}
                // href=""
                className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-gray-900 cursor-pointer"
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

export default SelectField;
