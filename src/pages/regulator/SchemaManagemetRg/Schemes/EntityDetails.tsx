import { useState } from "react";
import InputFields from "../../../../components/userFlow/common/InputField";
import SelectButton from "../../../../components/userFlow/form/SelectButton";

import { SchemaFormValidation } from "../../../../../src/components/ScehmaManagement/SchemaMangementValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import InfoIcon from "../../../../assets/images/info-circle.svg";

const EntityDetails = () => {
  const [selectedOption2, setSelectedOption2] = useState<string | null>(null);
  const [searchInputValue2, setSearchInputValue2] = useState<string>("");

  const [selectedOption4, setSelectedOption4] = useState<string | null>(null);
  const [searchInputValue4, setSearchInputValue4] = useState<string>("");

  const options2 = [
    { value: "Andhra Pradesh", label: "Andhra Pradesh" },
    { value: "Bihar", label: "Bihar" },
    { value: "Chhattisgarh", label: "Chhattisgarh" },
    { value: "Gujarat", label: "Gujarat" },
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
  } = useForm({
    resolver: yupResolver(SchemaFormValidation),
  });
  const onSubmit = (data: any) => {
    alert("Form submitted successfully!");
    console.log({ data });

    reset();
  };

  return (
    <div className="mt-6">
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-between flex-col h-full "
        >
          <div className="flex flex-col  w-full ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div>
                <label
                  htmlFor="Entity Name"
                  className="text-base font-normal text-gilroy-medium"
                >
                  Entity Name <span className="text-red-500">*</span>
                </label>
                <InputFields
                  backgroundColor="#F2F2F2"
                  placeholder="Type here"
                  {...register("EntityName")}
                />
                {errors?.EntityName && (
                  <p className="text-red-500">{errors?.EntityName?.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="PAN"
                  className="text-base font-normal text-gilroy-medium"
                >
                  PAN <span className="text-red-500">*</span>
                </label>
                <InputFields
                  backgroundColor="#F2F2F2"
                  placeholder="Type here"
                  {...register("PAN")}
                />
                {errors?.PAN && (
                  <p className="text-red-500">{errors?.PAN?.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="Type of Entity"
                  className="text-base font-normal text-gilroy-medium"
                >
                  Type of Entity <span className="text-red-500">*</span>
                </label>
                <SelectButton
                  backgroundColor="#F2F2F2"
                  setOption={handleSetOption4}
                  options={options4}
                  selectedOption={selectedOption4}
                  placeholder="Select"
                  searchInputOnchange={handleSearchInputChange4}
                  searchInputValue={searchInputValue4}
                  showSearchInput={true}
                  {...register("TypeOfEntity")}
                  {...(errors?.TypeOfEntity && (
                    <p className="text-red-500">
                      {errors?.TypeOfEntity?.message}
                    </p>
                  ))}
                />
              </div>

              <div>
                <div className="flex flex-row">
                  <label
                    htmlFor="Unique ID Number"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Unique ID Number <span className="text-red-500">*</span>
                  </label>
                  <img
                    src={InfoIcon}
                    alt="InfoIcon"
                    className="h-[24px] w-[24px] mr-2"
                  />
                </div>
                <InputFields
                  backgroundColor="#F2F2F2"
                  placeholder="Type here"
                  {...register("uniqueIdNumber")}
                />
                {errors?.uniqueIdNumber && (
                  <p className="text-red-500">
                    {errors?.uniqueIdNumber?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="Address Line 1"
                  className="text-base font-normal text-gilroy-medium"
                >
                  Address Line 1
                </label>
                <InputFields
                  backgroundColor="#F2F2F2"
                  placeholder="Type here"
                />
              </div>

              <div>
                <label
                  htmlFor="Address Line 2"
                  className="text-base font-normal text-gilroy-medium"
                >
                  Address Line 2
                </label>
                <InputFields
                  backgroundColor="#F2F2F2"
                  placeholder="Type here"
                />
              </div>

              <div>
                <label
                  htmlFor="PIN Code"
                  className="text-base font-normal text-gilroy-medium"
                >
                  PIN Code
                </label>
                <InputFields
                  backgroundColor="#F2F2F2"
                  placeholder="Type here"
                />
              </div>
              <div>
                <label
                  htmlFor="State"
                  className="text-base font-normal text-gilroy-medium"
                >
                  State
                </label>
                <SelectButton
                  backgroundColor="#F2F2F2"
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
                  htmlFor="District"
                  className="text-base font-normal text-gilroy-medium"
                >
                  District
                </label>
                <SelectButton
                  backgroundColor="#F2F2F2"
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
                  htmlFor="gstNumber"
                  className="text-base font-normal text-gilroy-medium"
                >
                  GST Number
                </label>
                <InputFields
                  backgroundColor="#F2F2F2"
                  placeholder="Type here"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EntityDetails;
