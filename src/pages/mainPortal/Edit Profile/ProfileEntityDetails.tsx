import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EntityDetailschema } from "../../../formValidationSchema/deposit_taker/EntityValidation.schema";
import SelectButton from "../../../components/userFlow/form/SelectButton";
import TextArea from "../../../components/userFlow/form/TextArea";
import InputFields from "../../../components/userFlow/form/InputField";


type Props = {}

const ProfileEntityDetails = (props: Props) => {
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
    <>
    <div className="flex flex-col w-full h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between p-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label htmlFor="Typeofentity" className="text-base font-normal">
              Name of Entity <span className="text-red-500">*</span>
            </label>

            <InputFields
                value={"Name Of Entity"}
                bgColor="bg-gray-200"
                disabled
            />
          </div>
          <div>
            <label htmlFor="pan" className="text-base font-normal">
              PAN No. <span className="text-red-500">*</span>
            </label>

            <InputFields
            name="pan"
                value={"FLKKH6789R"}
                bgColor="bg-gray-200"
                disabled
            />
          </div>
          <div className="w-full">
            <label htmlFor="entity" className="text-base font-normal">
              Type of Entity <span className="text-red-500">*</span>
            </label>

            <InputFields
                name="entity"
                value={"Type Of Entity"}
            />
          </div>
          <div>
            <label htmlFor="uniqueId" className="text-base font-normal">
              Unique ID Number <span className="text-red-500">*</span>
            </label>
            <InputFields
                name="entity"
                value={"Unique Id"}
                bgColor="bg-gray-200"
                disabled
            />
            {errors.uniqueId && (
              <p className="text-red-500">{errors.uniqueId.message}</p>
            )}
          </div>
          <h1 className="text-2xl font-semibold">Registered Address of DT</h1><br/>
          <div>
            <label htmlFor="addressLine1" className="text-base font-normal">
              Address line 1 <span className="text-red-500">*</span>1
            </label>
            <TextArea
              placeholder="Enter address"
              {...register("addressLine1")}
            />
            {errors.addressLine1 && (
              <p className="text-red-500">{errors.addressLine1.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="addressLine2" className="text-base font-normal">
              Address line 2<span className="text-red-500">*</span>2
            </label>
            <TextArea
              placeholder="Enter address"
              {...register("addressLine2")}
            />

            {errors.addressLine2 && (
              <p className="text-red-500">{errors.addressLine2.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="pinCode" className="text-base font-normal">
              Pin code <span className="text-red-500">*</span>
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
        <div className="flex flex-col sm:flex-row justify-end sm:justify-end items-center space-y-4 sm:space-y-0 pt-4">
          <div className="flex items-center">
            <button
              type="submit"
              className="bg-[#385723] rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs"
            >
              Save and Continue
            </button>
          </div>
        </div>
      </form>
    <div className="border-[#E6E6E6] border-[1px] w-full"></div>
      <div className="text-gilroy-light text-[#24222B] text-xs cursor-pointer flex items justify-center items-center py-4">
        <div>
            © 2024 Protean BUDs, All Rights Reserved.
        </div>
      </div>
    </div>
  </>
  )
}

export default ProfileEntityDetails