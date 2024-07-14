import React, { useEffect, useRef, useState } from "react";
import "./select_button.css";
import { useDepositTakerRegistrationStore } from "../../../zust/deposit-taker-registration/registrationStore";
import axios from "axios";
import { bffUrl } from "../../../utils/api";

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
  enableSearch ?: boolean;
  data ?: any;
};

const SelectButton = ({
  setOption,
  options,
  placeholder,
  selectedOption,
  showSearchInput,
  onSelect,
  disabled,
  backgroundColor,
  enableSearch = false,
  data
}: Props) => {
  
  const [loader, setLoader] = useState<boolean>(false);
  const {allFormData} = useDepositTakerRegistrationStore(state => state)
  const [searchInputValue, setSearchInputValue] = useState("");
  const [arrowDirectionToggle, setArrowDirectionToggle] = useState(false);
  const [optionsToShow, setOptionsToShow] = useState<any[]>(options);
  useEffect(() => {
    setArrowDirectionToggle(false);
  }, [selectedOption]);
  
  useEffect(() => {
    setOptionsToShow(options)
  }, [options])
  console.log({options, optionsToShow});
  // Find the label of the currently selected option
  const selectedLabel =
    options?.find((option: any) => option?.value === selectedOption)?.label ||
    placeholder;

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

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

  const handleSearch = (event : any) => {
    event.preventDefault();
    const {value} = event?.target;
    setSearchInputValue(value)
    let key = data?.key;
    let url = data?.dropdown_options?.api_link;
    if (key === 'branch') {
      setLoader(true)
      let currentLoggedinEntity = sessionStorage.getItem('entityUniqueId')
      let dtId = currentLoggedinEntity?.substring(0,2) === "DT" ? currentLoggedinEntity : 
      allFormData?.formFields?.form_fields?.find((f : any) => f?.key === 'depositTakerId')?.userInput
      url = url + currentLoggedinEntity + `?page=1&limit=100000Y`
      setLoader(false)
    }
    else if(key === 'regulator'){
      setLoader(true)
      axios.get(`${bffUrl}${url}?status=APPROVED&page=1&limit=100000&searchText=${value}`)
      .then((res : any) => {
        if (res.data.success) {
          let regulators = res?.data?.data?.regulators?.map((r : any) => {
            return {
              value : r?.id,
              id : r?.id,
              label : r?.regulatorName,
            }
          })

          setOptionsToShow(regulators);
        }
        
      })
      .finally(() => setLoader(false))
    }     
  }


  return (
    <div className="w-full relative" ref={buttonRef}
>
      <button
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
          { enableSearch && (
            <div className="relative p-2">
              <input
                type="search"
                value={searchInputValue}
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:border-gray-300 focus:ring-1 focus:ring-gray-100 focus:outline-none"
                placeholder="Search"
                style={{ paddingLeft: "2.5rem" }}
                onChange={handleSearch}
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
            {optionsToShow?.map((option, index) => (
              <a
                key={index}
                onClick={(e) => {
                  if (setOption) {
                    setOption(option.value);
                    e.preventDefault()
                  }
                  setArrowDirectionToggle(false);
                  if (onSelect) {
                    onSelect(option);
                    e.preventDefault()
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
