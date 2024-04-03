import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SelectButton from "../../components/userFlow/form/SelectButton";
import InputFields from "../../components/userFlow/form/InputField";
import TextArea from "../../components/userFlow/form/TextArea";
import Button from "../../components/userFlow/form/Button";
import ArrowIcon from "../../assets/images/Arrow.svg";
import { EntityDetailschema } from "../../formValidationSchema/deposit_taker/EntityValidation.schema";

const EntityDetails: React.FC = () => {
  const [selectedOption1, setSelectedOption1] = useState<string | null>(null);
  const [searchInputValue1, setSearchInputValue1] = useState<string>("");

  const [selectedOption2, setSelectedOption2] = useState<string | null>(null);
  const [searchInputValue2, setSearchInputValue2] = useState<string>("");

  const [selectedOption3, setSelectedOption3] = useState<string | null>(null);
  const [searchInputValue3, setSearchInputValue3] = useState<string>("");

  const options1 = [
    { value: "Pvt Ltd", label: "Pvt Ltd" },
    { value: "LLP", label: "LLP" },
    { value: "Sole PArtnership", label: "Sole PArtnership" },
  ];

  const options3 = [
    { value: "kashmir", label: "kashmir" },
    { value: "Jammu", label: "Jammu" },
    { value: "Doda", label: "Doda" },
  ];

  const options2 = [
    { value: "Andhra Pradesh", label: "Andhra Pradesh" },
    { value: "Bihar", label: "Bihar" },
    { value: "Chhattisgarh", label: "Chhattisgarh" },
    { value: "Gujarat", label: "Gujarat" },
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
    <div className="flex flex-col p-6 w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between h-full">
        <div>
          <h1 className="text-2xl font-bold mb-6">Entity Details</h1>
          <div className="grid grid-cols-3 gap-5">
            <div>
              <label htmlFor="Typeofentity" className="text-base font-normal">
                Type of Entity <span className="text-red-500">*</span>
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
              <label htmlFor="uniqueId" className="text-base font-normal">
                Unique Id <span className="text-red-500">*</span>
              </label>
              <InputFields
                placeholder="Enter Unique Id"
                {...register("uniqueId")}
              />
              {errors.uniqueId && (
                <p className="text-red-500">{errors.uniqueId.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="addressLine1" className="text-base font-normal">
                Address line <span className="text-red-500">*</span>1
              </label>
              <TextArea
                placeholder="Enter address"
                {...register("addressLine1")}
                width="315px"
              />
              {errors.addressLine1 && (
                <p className="text-red-500">{errors.addressLine1.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="addressLine2" className="text-base font-normal">
                Address line <span className="text-red-500">*</span>2
              </label>
              <TextArea
                placeholder="Enter address"
                {...register("addressLine2")}
                width="315px"
              />

              {errors.addressLine2 && (
                <p className="text-red-500">{errors.addressLine2.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="pinCode" className="text-base font-normal">
                Pine code <span className="text-red-500">*</span>
              </label>
              <InputFields placeholder="Type Here" {...register("pinCode")} />
              {errors?.pinCode && (
                <p className="text-red-500">{errors?.pinCode?.message}</p>
              )}
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
            <div>
              <label htmlFor="gstNumber" className="text-base font-normal">
                GST Number <span className="text-red-500">*</span>
              </label>
              <InputFields placeholder="Type here" {...register("gstNumber")} />
              {errors?.gstNumber && (
                <p className="text-red-500">{errors?.gstNumber?.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center ">
          <div className="flex cursor-pointer ">
            <img src={ArrowIcon} alt="" />
            <h1 className="text-sm font-normal text-black">Back</h1>
          </div>
          <div>
            <Button type="submit" label="Save & Continue" />
          </div>
        </div>

      </form>
    </div>
  );
};

export default EntityDetails;
