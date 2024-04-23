import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SelectButton from "../../components/userFlow/form/SelectButton";
import TextArea from "../../components/userFlow/form/TextArea";
import Button from "../../components/userFlow/form/Button";
import ArrowIcon from "../../assets/images/Arrow.svg";
import { EntityDetailschema } from "../../formValidationSchema/deposit_taker/EntityValidation.schema";

const ComponentDetails: React.FC = () => {
  const [selectedOption1, setSelectedOption1] = useState<string | null>(null);
  const [searchInputValue1, setSearchInputValue1] = useState<string>("");

  const [selectedOption2, setSelectedOption2] = useState<string | null>(null);
  const [searchInputValue2, setSearchInputValue2] = useState<string>("");

  const [selectedOption3, setSelectedOption3] = useState<string | null>(null);
  const [searchInputValue3, setSearchInputValue3] = useState<string>("");
   
  const [selectedOption4, setSelectedOption4] = useState<string | null>(null);
  const [searchInputValue4, setSearchInputValue4] = useState<string>("");

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
    { value: "Bathalapalle", label: "Bathalapalle" },
    { value: "Upparlapalle", label: "Upparlapalle" },
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
    <div className="flex flex-col h-screen p-4 md:p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between flex-1">
        <div>
          <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 mt-7 ">Competent Details</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            <div>
              <label htmlFor="Typeofentity" className="text-base font-normal">
                Name of Competent Authority <span className="text-red-500">*</span>
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
            
            <div>
              <label htmlFor="addressLine1" className="text-base font-normal">
                Address Line 1<span className="text-red-500">*</span>
              </label>
              <TextArea
                placeholder="Type Here"
                {...register("addressLine1")}
                width="full"
              />
              {errors.addressLine1 && (
                <p className="text-red-500">{errors.addressLine1.message}</p>
              )}
            </div>
  
            <div>
              <label htmlFor="addressLine2" className="text-base font-normal">
                Address Line 2
              </label>
              <TextArea
                placeholder="Type Here"
                {...register("addressLine2")}
                width="full"
              />
            </div>
  
            <div>
              <label htmlFor="pinCode" className="text-base font-normal">
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
              <label htmlFor="state" className="text-base font-normal">
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
              <label htmlFor="district" className="text-base font-normal">
                Jurisdiction <span className="text-red-500">*</span>
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
        <div className="mt-auto">
                  <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex cursor-pointer ">
            <img src={ArrowIcon} alt="" />
            <h1 className="text-sm font-normal text-black ml-2">Back</h1>
          </div>
          <div>
            <Button type="submit" label="Save & Continue" />
          </div>
        </div>
        </div>
      </form>
    </div>
  );
  
};

export default ComponentDetails;
