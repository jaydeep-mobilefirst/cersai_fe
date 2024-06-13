import { createColumnHelper } from "@tanstack/table-core";

import { useState } from "react";
// import InputFields from "../../../userFlow/common/InputField";
import InputFields from "../../../../components/userFlow/common/InputField";
import TextArea from "../../../../components/userFlow/form/TextArea";
import DatePicker from "../../../../components/userFlow/form/DatePicker";
import SelectButton from "../../../../components/userFlow/form/SelectButton";
import { SchemaFormValidation } from "../../../../../src/components/ScehmaManagement/SchemaMangementValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useScreenWidth } from "../../../../utils/screenSize";
import useSidebarStore from "../../../../store/SidebarStore";
import TaskTabsRg from "../../../../components/ScehmaManagement/TaskTabsRg";
import SchemeSuccessPopUp from "./SchemeSuccessPopUp";
import { useNavigate } from "react-router-dom";
const SchemeDetails = () => {
  const [selectedOption2, setSelectedOption2] = useState<string | null>(null);
  const [searchInputValue2, setSearchInputValue2] = useState<string>("");

  const [selectedOption3, setSelectedOption3] = useState<string | null>(null);
  const [searchInputValue3, setSearchInputValue3] = useState<string>("");

  const [selectedOption4, setSelectedOption4] = useState<string | null>(null);
  const [searchInputValue4, setSearchInputValue4] = useState<string>("");
  const screenWidth = useScreenWidth();

  const { collapsed } = useSidebarStore();
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const handleNewSchemaClick = () => {
    setIsSuccessOpen(true);
  };

  const closePopup = () => {
    setIsSuccessOpen(false);
  };

  const options2 = [
    { value: "Andhra Pradesh", label: "Andhra Pradesh" },
    { value: "Bihar", label: "Bihar" },
    { value: "Chhattisgarh", label: "Chhattisgarh" },
    { value: "Gujarat", label: "Gujarat" },
  ];

  const options3 = [
    { value: "Anantapur", label: "Anantapur" },
    { value: "Kurnool", label: "Kurnool" },
    { value: "Chittoor", label: "Chittoor" },
  ];

  const options4 = [
    { value: "515661", label: "515661" },
    { value: "515672", label: "515672" },
    { value: "515662", label: "515662" },
  ];

  const handleSetOption2 = (value: string) => {
    setSelectedOption2(value);
  };

  const handleSearchInputChange2 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInputValue2(event.target.value);
  };

  const handleSetOption3 = (value: string) => {
    setSelectedOption3(value);
  };

  const handleSearchInputChange3 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInputValue3(event.target.value);
  };
  const handleSetOption4 = (value: string) => {
    setSelectedOption4(value);
  };

  const handleSearchInputChange4 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInputValue4(event.target.value);
  };
  const handleDateChange = (event: any) => {
    const { value } = event.target;
    const today = new Date();
    const selected = new Date(value);
    today.setHours(0, 0, 0, 0);

    // if (!(selected <= today)) {
    //   setError("registrationDate", { message: "Date should not be in future" });
    // } else {
    //   clearErrors("registrationDate");
    // }
    // setValue("registrationDate", value);
  };
  const navigate = useNavigate();

  const handleDiscordClick = () => {
    navigate("/rg/my-task");
  };
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(SchemaFormValidation),
  });
  const onSubmit = (data: any) => {
    alert("Form submitted successfully!");
    console.log({ data });

    reset();
  };

  return (
    <div className="mt-6 mx-8">
      <div className="mt-2 ">
        <TaskTabsRg />
      </div>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-between flex-col h-full "
        >
          <div
            style={{
              // width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
              width: `${
                screenWidth > 1024
                  ? `calc(100vw - ${collapsed ? "110px" : "349px"})`
                  : "100vw"
              }`,
            }}
          >
            <div className="flex flex-col p-6 w-full ">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div>
                  <label
                    htmlFor="EntityName"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Entity Name <span className="text-red-500">*</span>
                  </label>
                  <SelectButton
                    setOption={handleSetOption4}
                    options={options4}
                    selectedOption={selectedOption4}
                    placeholder="Select"
                    searchInputOnchange={handleSearchInputChange4}
                    searchInputValue={searchInputValue4}
                    showSearchInput={true}
                    {...register("EntityName")}
                    {...(errors?.EntityName && (
                      <p className="text-red-500">
                        {errors?.EntityName?.message}
                      </p>
                    ))}
                  />
                </div>
                <div>
                  <label
                    htmlFor="EntityUniqueID"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Entity Unique ID
                  </label>
                  <InputFields
                    backgroundColor="#f2f2f2"
                    placeholder="Type here"
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="Scheme Name"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Scheme Name <span className="text-red-500">*</span>
                  </label>
                  <TextArea
                    placeholder="ABCD Scheme"
                    {...register("SchemeName")}
                    // width="315px"
                  />

                  {errors?.SchemeName && (
                    <p className="text-red-500">
                      {errors?.SchemeName?.message}
                    </p>
                  )}
                  <span className="text-[#00000066] text-xs text-gilroy-medium flex justify-end items-end">
                    0 / 50
                  </span>
                </div>
                <div className="">
                  <label
                    htmlFor="Scheme  Description"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Scheme Description
                  </label>
                  <TextArea placeholder="Scheme  Description" />

                  <span className="text-[#00000066] text-xs text-gilroy-medium flex justify-end items-end">
                    0 / 50
                  </span>
                </div>
                <div className="mt-[2px]">
                  <label
                    htmlFor="Scheme Start Date"
                    className="block font-normal text-gilroy-medium text-sm  mb-2"
                  >
                    Scheme Start Date
                  </label>

                  <DatePicker onChange={handleDateChange} />
                </div>
                <div className="">
                  <label
                    htmlFor="Last day to enter scheme"
                    className="block text-sm font-normal text-gilroy-medium mb-2"
                  >
                    Last day to enter scheme
                  </label>

                  <DatePicker onChange={handleDateChange} />
                </div>

                <div>
                  <label
                    htmlFor=" Minimum Investment amount"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Minimum Investment amount
                  </label>
                  <InputFields placeholder="Type here" />
                </div>
                <div>
                  <label
                    htmlFor="Maximum Investment amount"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Maximum Investment amount
                  </label>
                  <InputFields placeholder="Type here" />
                </div>
                <div>
                  <label
                    htmlFor="Regulator Name"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Regulator Name
                  </label>
                  <SelectButton
                    setOption={handleSetOption4}
                    options={options4}
                    selectedOption={selectedOption4}
                    placeholder="Select"
                    searchInputOnchange={handleSearchInputChange4}
                    searchInputValue={searchInputValue4}
                    showSearchInput={true}
                  />
                </div>

                <div>
                  <label
                    htmlFor="Branch"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Branch
                  </label>
                  <SelectButton
                    setOption={handleSetOption2}
                    options={options2}
                    selectedOption={selectedOption2}
                    placeholder="Select"
                    searchInputOnchange={handleSearchInputChange2}
                    searchInputValue={searchInputValue2}
                    showSearchInput={true}
                  />
                </div>
                <div>
                  <label
                    htmlFor=" Number of investers"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Number of investers
                  </label>
                  <InputFields placeholder="Type here" />
                </div>
                <div>
                  <label
                    htmlFor=" Scheme Act"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Scheme Act
                  </label>
                  <SelectButton
                    setOption={handleSetOption3}
                    options={options3}
                    selectedOption={selectedOption3}
                    placeholder="Select"
                    searchInputOnchange={handleSearchInputChange3}
                    searchInputValue={searchInputValue3}
                    showSearchInput={true}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <div>
            <div
              className="flex w-full p-4  flex-row justify-end items-center"
              style={{
                width: `${
                  screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"
                }`,
              }}
            >
              <div className="flex items-center space-x-6">
                <p className="text-[#1c468e]  rounded-xl p-3  text-gilroy-medium cursor-pointer text-sm w-full sm:w-auto sm:max-w-xs ">
                  Discard
                </p>

                <button
                  onClick={handleNewSchemaClick}
                  type="submit"
                  className="bg-[#1c468e] rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs text-gilroy-semibold "
                >
                  Create Scheme
                </button>
              </div>
            </div>
            <div>
              <div className="border-[#E6E6E6] border-[1px] lg:mt-4"></div>

              <p className="mb-[24px] text-gilroy-light text-center text-[#24222B] text-xs cursor-pointer mt-4">
                © 2024 Protean BUDs, All Rights Reserved.
              </p>
            </div>
          </div> */}
          <div>
            <div
              className="flex w-full p-4 flex-row justify-end items-center"
              style={{
                width: screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw",
              }}
            >
              <div className="flex items-center space-x-4 sm:space-x-6">
                <p
                  onClick={handleDiscordClick}
                  className="text-[#1c468e] rounded-xl p-3 text-gilroy-medium cursor-pointer text-sm sm:text-base w-full sm:w-auto sm:max-w-xs"
                >
                  Discard
                </p>

                <button
                  onClick={handleNewSchemaClick}
                  type="submit"
                  className="bg-[#1c468e] rounded-xl p-3 text-white font-semibold text-sm sm:text-base w-full sm:w-auto sm:max-w-xs text-gilroy-semibold"
                  style={{ minWidth: "150px" }}
                >
                  Create Scheme
                </button>
              </div>
            </div>
            <div>
              <div className="border-[#E6E6E6] border-[1px] lg:mt-4 mt-2"></div>
              <p className="mb-[24px] text-gilroy-light text-center text-[#24222B] text-xs sm:text-sm cursor-pointer mt-4">
                © 2024 Protean BUDs, All Rights Reserved.
              </p>
            </div>
          </div>

          {isSuccessOpen && (
            <SchemeSuccessPopUp
              closePopup={closePopup}
              SuccessPopup={() => {}}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default SchemeDetails;
