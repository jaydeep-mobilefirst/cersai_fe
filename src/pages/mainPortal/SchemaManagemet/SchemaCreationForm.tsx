import React, { useState } from "react";
import TaskTabs from "../../../components/ScehmaManagement/TaskTabs";
import { useScreenWidth } from "../../../utils/screenSize";
import { EntityDetailschema } from "../../../formValidationSchema/deposit_taker/EntityValidation.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import SelectButton from "../../../components/userFlow/form/SelectButton";
import TextArea from "../../../components/userFlow/form/TextArea";
import DatePicker from "../../../components/userFlow/form/DatePicker";
import InputFields from "../../../components/userFlow/common/InputField";

const SchemaCreationForm = () => {
  const [selectedOption1, setSelectedOption1] = useState<string | null>(null);
  const [searchInputValue1, setSearchInputValue1] = useState<string>("");

  const [selectedOption2, setSelectedOption2] = useState<string | null>(null);
  const [searchInputValue2, setSearchInputValue2] = useState<string>("");

  const [selectedOption3, setSelectedOption3] = useState<string | null>(null);
  const [searchInputValue3, setSearchInputValue3] = useState<string>("");

  const [selectedOption4, setSelectedOption4] = useState<string | null>(null);
  const [searchInputValue4, setSearchInputValue4] = useState<string>("");
  const screenWidth = useScreenWidth();
  const [isChecked, setIsChecked] = useState(false);
  const options1 = [
    { value: "Pvt Ltd", label: "Pvt Ltd" },
    { value: "LLP", label: "LLP" },
    { value: "Sole PArtnership", label: "Sole PArtnership" },
  ];

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
  const handleSetOption1 = (value: string) => {
    setSelectedOption1(value);
  };

  const handleSearchInputChange1 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInputValue1(event.target.value);
  };

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

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(EntityDetailschema),
  });
  const onSubmit = (data: any) => {
    alert("Form submitted successfully!");
    console.log({ data });

    reset();
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };
  return (
    <div className="relative xl:ml-[40px]">
      <div className="mt-6">
        <TaskTabs />
      </div>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-between flex-col h-full lg:h-[100vh]"
        >
          <div
            style={{
              width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
            }}
          >
            <div className="flex flex-col p-6 w-full ">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* <div className="mt-1">
                  <label
                    htmlFor="Typeofentity"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Regulator Name<span className="text-red-500">*</span>
                  </label>

                  <SelectButton
                    setOption={handleSetOption1}
                    options={options1}
                    selectedOption={selectedOption1}
                    placeholder="Select"
                    searchInputOnchange={handleSearchInputChange1}
                    searchInputValue={searchInputValue1}
                    showSearchInput={false}
                  />
                </div> */}

                <div className="">
                  <label
                    htmlFor="ABCD Scheme"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Scheme Name
                  </label>
                  <TextArea
                    placeholder="ABCD Scheme"
                    {...register("addressLine1")}
                    // width="315px"
                  />
                  {errors.addressLine1 && (
                    <p className="text-red-500">
                      {errors.addressLine1.message}
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
                  <TextArea
                    placeholder="Scheme  Description"
                    {...register("addressLine1")}
                    // width="315px"
                  />
                  {errors.addressLine1 && (
                    <p className="text-red-500">
                      {errors.addressLine1.message}
                    </p>
                  )}
                  <span className="text-[#00000066] text-xs text-gilroy-medium flex justify-end items-end">
                    0 / 50
                  </span>
                </div>
                <div className="mt-[2px]">
                  <label
                    htmlFor="registrationDate"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Scheme Start Date
                    <span className="text-red-500">*</span>
                  </label>

                  <DatePicker onChange={handleDateChange} />
                  <span className="text-red-500">
                    {/* {errors.registrationDate?.message} */}
                  </span>
                </div>
                <div className="mt-[2px]">
                  <label
                    htmlFor="registrationDate"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Last day to enter scheme
                    <span className="text-red-500">*</span>
                  </label>

                  <DatePicker onChange={handleDateChange} />
                  <span className="text-red-500">
                    {/* {errors.registrationDate?.message} */}
                  </span>
                </div>
                {/* <div>
                  <label
                    htmlFor="addressLine2"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Address Line 2
                  </label>
                  <TextArea
                    placeholder="Type Here"
                    {...register("addressLine2")}
                    // width="315px"
                  />
                </div> */}
                <div>
                  <label
                    htmlFor="gstNumber"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Minimum Investment amount
                  </label>
                  <InputFields
                    placeholder="Type here"
                    {...register("gstNumber")}
                  />
                  {/* {errors?.gstNumber && (
                    <p className="text-red-500">{errors?.gstNumber?.message}</p>
                  )} */}
                </div>
                <div>
                  <label
                    htmlFor="gstNumber"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Maximum Investment amount
                  </label>
                  <InputFields
                    placeholder="Type here"
                    {...register("gstNumber")}
                  />
                  {/* {errors?.gstNumber && (
                    <p className="text-red-500">{errors?.gstNumber?.message}</p>
                  )} */}
                </div>
                <div>
                  <label
                    htmlFor="pinCode"
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
                    htmlFor="state"
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
                    htmlFor="district"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Scheme Act <span className="text-red-500">*</span>
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
                <div>
                  <label
                    htmlFor="gstNumber"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Number of investers
                  </label>
                  <InputFields
                    placeholder="Type here"
                    {...register("gstNumber")}
                  />
                  {/* {errors?.gstNumber && (
                    <p className="text-red-500">{errors?.gstNumber?.message}</p>
                  )} */}
                </div>
              </div>
            </div>
            <div className="flex flex-shrink-0 mt-[20px]">
              <div className="opacity-30 w-[24px] h-[24px] justify-center align-center">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  placeholder="ischecked"
                />
              </div>
              <div className="leading-[24px]">
                I declare all the Information provided is correct as per my
                knowledge.
              </div>
            </div>
          </div>

          <div>
            <div
              className="flex w-full p-4 lg:px-[30px] flex-row justify-end items-center"
              style={{
                width: `${
                  screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"
                }`,
              }}
            >
              <div className="flex items-center space-x-6">
                <p className="text-[#52AE32] text-gilroy-medium cursor-pointer">
                  Discord
                </p>
                <button
                  type="submit"
                  className="bg-[#385723] rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs text-gilroy-semibold "
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default SchemaCreationForm;
