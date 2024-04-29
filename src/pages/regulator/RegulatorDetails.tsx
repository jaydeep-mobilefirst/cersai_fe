import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SelectButton from "../../components/userFlow/form/SelectButton";
import TextArea from "../../components/userFlow/form/TextArea";
import Button from "../../components/userFlow/form/Button";
import ArrowIcon from "../../assets/images/Arrow.svg";
import { EntityDetailschema } from "../../formValidationSchema/deposit_taker/EntityValidation.schema";
import { useScreenWidth } from "../../utils/screenSize";

const RegulatorDetails: React.FC = () => {
  const [selectedOption1, setSelectedOption1] = useState<string | null>(null);
  const [searchInputValue1, setSearchInputValue1] = useState<string>("");

  const [selectedOption2, setSelectedOption2] = useState<string | null>(null);
  const [searchInputValue2, setSearchInputValue2] = useState<string>("");

  const [selectedOption3, setSelectedOption3] = useState<string | null>(null);
  const [searchInputValue3, setSearchInputValue3] = useState<string>("");

  const [selectedOption4, setSelectedOption4] = useState<string | null>(null);
  const [searchInputValue4, setSearchInputValue4] = useState<string>("");
  const screenWidth = useScreenWidth();

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

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center justify-between flex-col h-full lg:h-[100vh]"
      >
        <div
          style={{
            width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
          }}
        >
          <div className="border-[#E6E6E6] border-[1px] lg:mt-[76px] w-full"></div>
          <div className="flex flex-col p-6 w-full ">
            <h1 className="text-2xl font-bold mb-6">Regulator Details</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="mt-1">
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
              </div>

              <div className="">
                <label
                  htmlFor="addressLine1"
                  className="text-base font-normal text-gilroy-medium"
                >
                  Address Line 1<span className="text-red-500">*</span>
                </label>
                <TextArea
                  placeholder="Type Here"
                  {...register("addressLine1")}
                  // width="315px"
                />
                {errors.addressLine1 && (
                  <p className="text-red-500">{errors.addressLine1.message}</p>
                )}
              </div>
              <div>
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
              </div>
              <div>
                <label
                  htmlFor="pinCode"
                  className="text-base font-normal text-gilroy-medium"
                >
                  Pin Code <span className="text-red-500">*</span>
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
                  State <span className="text-red-500">*</span>
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
                  District <span className="text-red-500">*</span>
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

        <div>
          <div
            className="flex w-full p-4 lg:px-[30px] flex-row justify-between items-center"
            style={{
              width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
            }}
          >
            <div className="flex flex-row items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0"
              >
                <path
                  d="M15 6L9 12L15 18"
                  stroke="#1D1D1B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <button className="text-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#385723]">
                Back
              </button>
            </div>
            <div className="flex items-center">
              <button
                type="submit"
                className="bg-[#385723] rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs text-gilroy-semibold "
              >
                Save and Continue
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
    </>
  );
};

export default RegulatorDetails;
