import React, { useState } from "react";
import TaskTabs from "../../../components/ScehmaManagement/TaskTabs";
import { useScreenWidth } from "../../../utils/screenSize";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import SelectButton from "../../../components/userFlow/form/SelectButton";
import TextArea from "../../../components/userFlow/form/TextArea";
import DatePicker from "../../../components/userFlow/form/DatePicker";
import InputFields from "../../../components/userFlow/common/InputField";
import { useNavigate } from "react-router-dom";
import SchemeCreationSuccess from "../../../components/ScehmaManagement/SchemeCrationSucess";
import { SchemaFormValidation } from "../../../components/ScehmaManagement/SchemaMangementValidation";
import useSidebarStore from "../../../store/SidebarStore";

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
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const navigate = useNavigate();
  const { collapsed } = useSidebarStore();

  const closePopup = () => {
    setShowPopup(false);
  };
  const SuccessPopup = () => {
    setShowPopup(true);
  };
  const handleBackButtonClick = () => {
    navigate("/dt/mytask");
  };
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

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
    setValue,
    clearErrors,
    getValues,
  } = useForm({
    resolver: yupResolver(SchemaFormValidation),
  });
  const onSubmit = (data: any) => {
    console.log(data, "data");
    alert("Form submitted successfully!");
    console.log({ data });
    setShowPopup(true);

    reset();
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };
  // const handleDateChange = (event: any) => {
  //   const { value } = event.target;
  //   const today = new Date();
  //   const selected = new Date(value);
  //   today.setHours(0, 0, 0, 0);

  //   if (!(selected <= today)) {
  //     setError("registrationDate", { message: "Date should not be in future" });
  //   } else {
  //     clearErrors("registrationDate");
  //   }
  //   setValue("registrationDate", value);
  // };
  // const handleDateChange1 = (event: any) => {
  //   const { value } = event.target;
  //   const today = new Date();
  //   const selected = new Date(value);
  //   today.setHours(0, 0, 0, 0);

  //   if (!(selected <= today)) {
  //     setError("registrationDate", { message: "Date should not be in future" });
  //   } else {
  //     clearErrors("registrationDate");
  //   }
  //   setValue("registrationDate", value);
  // };
  const handleDateChange = (event: any) => {
    const { value } = event.target;
    setValue("startSchemaDate", value, { shouldValidate: true });
  };

  const handleDateChangeEnd = (event: any) => {
    const { value } = event.target;
    const startValue = getValues("startSchemaDate");
    const startDate = startValue ? new Date(startValue) : null; // Handle undefined values

    if (!startDate || isNaN(startDate.getTime())) {
      setError("endSchemaDate", { message: "Invalid start date" });
      return; // Exit if no valid start date
    }

    const selectedDate = new Date(value);
    if (selectedDate <= startDate) {
      setError("endSchemaDate", {
        message: "End date must be after the start date",
      });
    } else {
      clearErrors("endSchemaDate");
      setValue("endSchemaDate", value, { shouldValidate: true });
    }
  };
  return (
    <div className="relative xl:ml-[40px]">
      <div className="mt-6">
        <TaskTabs />
      </div>
      <div className="-ml-7">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-between flex-col h-full lg:h-[100vh]"
        >
          <div
            className="w-full"
            // style={{
            //   // width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
            //   width: `${
            //     screenWidth > 1024
            //       ? `calc(100vw - ${collapsed ? "110px" : "349px"})`
            //       : "100vw"
            //   }`,
            // }}
          >
            <div className="flex flex-col p-6 w-full ">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="">
                  <label
                    htmlFor="SchemeName"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Scheme Name
                  </label>
                  <TextArea
                    placeholder="ABCD Scheme"
                    {...register("SchemeName")}
                  />
                  {errors.SchemeName && (
                    <p className="text-red-500">{errors.SchemeName.message}</p>
                  )}
                </div>

                <div className="">
                  <label
                    htmlFor="Scheme  Description"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Scheme Description
                  </label>
                  <TextArea
                    placeholder="Scheme Description"
                    {...register("schemeDescription")}
                  />
                  {errors.schemeDescription && (
                    <p className="text-red-500">
                      {errors.schemeDescription.message}
                    </p>
                  )}
                </div>
                <div className="mt-[2px]">
                  <label
                    htmlFor="startSchemaDate"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Scheme Start Date
                  </label>

                  <DatePicker onChange={handleDateChange} />
                </div>
                <div className="-mt-2">
                  <label
                    htmlFor="endSchemaDate"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Last day to enter scheme
                  </label>

                  <DatePicker onChange={handleDateChangeEnd} />
                </div>

                <div>
                  <label
                    htmlFor="minInvestment"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Minimum Investment amount
                  </label>
                  <InputFields
                    placeholder="Type here"
                    {...register("minInvestment")}
                  />
                  {errors?.minInvestment && (
                    <p className="text-red-500">
                      {errors?.minInvestment?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="numberOfInvestors"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Maximum Investment amount
                  </label>
                  <InputFields
                    placeholder="Type here"
                    {...register("maxInvestment")}
                  />
                  {errors?.maxInvestment && (
                    <p className="text-red-500">
                      {errors?.maxInvestment?.message}
                    </p>
                  )}
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
                <div>
                  <label
                    htmlFor="minInvestment"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Number of investers
                  </label>
                  <InputFields
                    placeholder="Type here"
                    {...register("numberOfInvestors")}
                  />
                  {errors?.numberOfInvestors && (
                    <p className="text-red-500">
                      {errors?.numberOfInvestors?.message}
                    </p>
                  )}
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
          </div>
          {showPopup && (
            <SchemeCreationSuccess
              closePopup={closePopup}
              SuccessPopup={SuccessPopup}
            />
          )}

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
                <p
                  onClick={handleBackButtonClick}
                  className="text-[#1c468e] text-gilroy-medium cursor-pointer"
                >
                  Discord
                </p>
                <button
                  onClick={SuccessPopup}
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default SchemaCreationForm;
