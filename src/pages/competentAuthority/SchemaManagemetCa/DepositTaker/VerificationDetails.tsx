import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputFields from "../../../../components/userFlow/common/InputField";
import { useScreenWidth } from "../../../../utils/screenSize";
import { SchemaFormValidation } from "../../../../../src/components/ScehmaManagement/SchemaMangementValidation";
const VerificationDetails = () => {
  const screenWidth = useScreenWidth();
  const [selectedOption1, setSelectedOption1] = useState<string | null>(null);
  const [searchInputValue1, setSearchInputValue1] = useState<string>("");

  const handleSetOption1 = (value: string) => {
    setSelectedOption1(value);
  };

  const handleSearchInputChange1 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInputValue1(event.target.value);
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
  const options1 = [
    { value: "Pvt Ltd", label: "Pvt Ltd" },
    { value: "LLP", label: "LLP" },
    { value: "Sole PArtnership", label: "Sole PArtnership" },
  ];

  return (
    <div>
      <div className="">
        <div className="container mx-auto">
          <div className="flex flex-wrap md:flex-nowrap gap-4">
            <div className="w-full md:w-1/2 lg:w-[317px]">
              <label
                htmlFor="companyName"
                className="text-base font-normal text-gilroy-medium"
              >
                Company Name <span className="text-red-500">*</span>
              </label>
              <InputFields
                placeholder="Type here"
                {...register("CompanyName")}
                {...(errors?.CompanyName && (
                  <p className="text-red-500">{errors?.CompanyName?.message}</p>
                ))}
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-[317px]">
              <label
                htmlFor="panNumber"
                className="text-base font-normal text-gilroy-medium"
              >
                Pan Number <span className="text-red-500">*</span>
              </label>
              <InputFields
                {...register("PAN")}
                {...(errors?.PAN && (
                  <p className="text-red-500">{errors?.PAN?.message}</p>
                ))}
                placeholder="Type here"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationDetails;
