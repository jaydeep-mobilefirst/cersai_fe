import React, { useEffect, useState } from "react";
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
};

const SelectButton = ({
  setOption,
  options,
  placeholder,
  searchInputOnchange,
  searchInputValue,
  selectedOption,
  showSearchInput,
}: Props) => {
  const [arrowDirectionToggle, setArrowDirectionToggle] = useState(false);

  useEffect(() => {
    setArrowDirectionToggle(false);
  }, [selectedOption]);

  return (
    <>
      <button
        className="w-full flex justify-between items-center bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700 hover:bg-gray-50 focus:ring-1 focus:ring-gray-300 text-left"
        type="button"
        onClick={() => setArrowDirectionToggle(!arrowDirectionToggle)}
        style={{
          height: "56px",
          width: "317px",
          padding: "8px 16px",
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
          className="absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          style={{
            width: "317px",
            padding: "8px 16px",
          }}
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
            className="overflow-auto max-h-40 custom-scrollbar"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option, index) => (
              <a
                key={index}
                onClick={() => setOption(option.value)}
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-gray-900"
                role="menuitem"
              >
                {option.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SelectButton;
