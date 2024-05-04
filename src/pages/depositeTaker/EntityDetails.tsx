import React, { useContext, useState } from "react";
import SelectButton from "../../components/userFlow/form/SelectButton";
import InputFields from "../../components/userFlow/form/InputField";
import TextArea from "../../components/userFlow/form/TextArea";
import { useScreenWidth } from "../../utils/screenSize";
import { useDepositTakerRegistrationStore } from "../../zust/deposit-taker-registration/registrationStore";
import { FormHandlerContext } from "../../contextAPI/useFormFieldHandlers";
import LoaderSpin from "../../components/LoaderSpin";
import { useNavigate } from "react-router-dom";
import DatePicker from "../../components/userFlow/form/DatePicker";

const EntityDetails: React.FC = () => {
  const screenWidth = useScreenWidth();
  const {onChange, handleValidationChecks} = useContext(FormHandlerContext)
  const [loader, setLoader] = useState(false);
  const Navigate = useNavigate();

  const {allFormData} = useDepositTakerRegistrationStore(state => state)

  const sectionId = allFormData?.entitySections?.find((s : any) => s?.sectionName === "Entity Details");
  const formFields = allFormData?.formFields?.form_fields?.filter((f : any) => f?.sectionId === sectionId?.id);


  const onSubmit = async (event : any) => {
    event?.preventDefault();
    setLoader(true)
    const noError = await handleValidationChecks(formFields)    
    setLoader(false)
    
    if (noError) {
      Navigate('/depositetaker/signup/regulatordetails')
    }
  };

  return (
    <>
      <div className="border-[#E6E6E6] border-[1px] -mt-[3px]"></div>
      {/* <div className="flex flex-col p-6 w-full"> */}
      <form
        // className="flex flex-col justify-between h-full"
        className="flex items-center justify-between flex-col h-full lg:h-[100vh]"
      >
        <div
          style={{
            width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
          }}
        >
          <div className="border-[#E6E6E6] border-[1px] lg:mt-[76px] w-full"></div>
          <div className="bg-white p-6 w-full">
            <h1 className="text-2xl font-bold mb-6">Entity Details</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {
                  formFields && formFields?.length > 0 && formFields?.map((field : any) => {
                    const fieldType = allFormData?.fieldTypes?.find((type : any) => type?.id === field?.typeId)?.name;
                    console.log({fieldType});

                    switch (fieldType) {
                      case 'text':
                      case 'number':
                      case 'password':
                      case "phone_number":
                        return <div>
                          <label
                            htmlFor={field?.label}
                            className="block text-gray-700 text-sm font-bold mb-2"
                          >
                            {field?.label}
                            {field?.regFormFieldsValidations && 
                              field?.regFormFieldsValidations?.some((v : any) => v?.id === allFormData?.validations?.find((d : any) => d?.vld_type_name === "Required")?.id)
                              &&
                              <span className="text-[#ff0000]">*</span>}
                          </label>
                          <InputFields
                            value={field?.userInput}
                            onChange={(e) => onChange(e, field, fieldType)}
                            type={fieldType}
                            id={field?.label}
                            placeholder={field?.placeholder}
                            disabled={field?.disabled || false}
                          />
                          <span className="text-red-500">
                            {field?.error}
                          </span>
                        </div>
                      case 'textarea':
                         return  <div className="">
                         <label
                           htmlFor={field?.label}
                           className="text-base font-normal text-text-gilroy-medium"
                         >
                           {field?.label}
                            {field?.regFormFieldsValidations && 
                              field?.regFormFieldsValidations?.some((v : any) => v?.id === allFormData?.validations?.find((d : any) => d?.vld_type_name === "Required")?.id)
                              &&
                              <span className="text-[#ff0000]">*</span>}
                         </label>
                         <TextArea
                           value={field?.userInput}
                           onChange={(e) => onChange(e, field, fieldType)}
                           id={field?.label}
                           placeholder={field?.placeholder}
                         />
                         <span className="text-red-500">
                            {field?.error}
                          </span>
                       </div>
                      case 'select':
                        return                <div>
                        <label
                          htmlFor="district"
                          className="text-base font-normal text-gilroy-medium"
                        >
                          {field?.label} <span className="text-red-500">*</span>
                        </label>
                        <SelectButton
                          onSelect={(data) => onChange(data, field, fieldType)}
                          options={field?.dropdown_options?.options?.map((d : any) => ({value : d?.name, label : d?.name, id : d?.id}))}
                          selectedOption={field?.userInput}
                          placeholder={field?.placeholder}
                         //  searchInputOnchange={handleSearchInputChange3}
                         //  searchInputValue={searchInputValue3}
                          showSearchInput={true}
                        />
                        <span className="text-red-500">
                            {field?.error}
                          </span>
                      </div>  
                      
                      case 'pincode':
                        return <div>
                          <label
                            htmlFor={field?.label}
                            className="block text-gray-700 text-sm font-bold mb-2"
                          >
                            {field?.label}
                            {field?.regFormFieldsValidations && 
                              field?.regFormFieldsValidations?.some((v : any) => v?.id === allFormData?.validations?.find((d : any) => d?.vld_type_name === "Required")?.id)
                              &&
                              <span className="text-[#ff0000]">*</span>}
                          </label>
                          <InputFields
                            max={6}
                            min={6}
                            value={field?.userInput}
                            onChange={(e) => onChange(e, field, fieldType)}
                            type={"number"}
                            id={field?.label}
                            placeholder={field?.placeholder}
                          />
                          <span className="text-red-500">
                            {field?.error}
                          </span>
                        </div>
                      case 'date_picker':
                        return <div>
                        <label
                          htmlFor="district"
                          className="text-base font-normal text-gilroy-medium"
                        >
                          {field?.label} <span className="text-red-500">*</span>
                        </label>
                        <DatePicker onChange={(e) => onChange(e, field, fieldType) } userValue={field?.userInput}/>
                        <span className="text-red-500">
                            {field?.error}
                          </span>
                      </div>
                      default:
                        return <></>;
                    }
                  })
                }
            </div>
          </div>
        </div>

        <div>
          <div
            className="flex w-full p-4 lg:px-[29px] flex-row justify-between items-center"
            style={{
              width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
            }}
          >
            <div className="flex flex-row items-center space-x-2"
            onClick={() => Navigate('/depositetaker/signup/verification')}

            >
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
              <button 
              className="text-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#385723]">
                Back
              </button>
            </div>
            <div className="flex items-center">
            <button
                  type="submit"
                  disabled={loader}
                  onClick={onSubmit}
                  className="bg-[#385723] rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs"
                >
                  {loader ? <LoaderSpin/> : "Save And Continue"}
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
      {/* </div> */}
    </>
  );
};

export default EntityDetails;



/**
<div>
                <label
                  htmlFor="Typeofentity"
                  className="text-base font-normal text-text-gilroy-medium"
                >
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
                <label
                  htmlFor="uniqueId"
                  className="text-base font-normal text-gilroy-medium"
                >
                  <div className="flex">
                    Unique ID Number <span className="text-red-500">*</span>
                    <img
                      src={InfoCircle}
                      alt=" InfoCircle "
                      className="w-5 mx-2"
                    />
                  </div>
                </label>
                <InputFields
                  placeholder="Enter Unique Id"
                  {...register("uniqueId")}
                />
                {errors.uniqueId && (
                  <p className="text-red-500">{errors.uniqueId.message}</p>
                )}
              </div>
              <div className="-mt-[6px]">
                <label
                  htmlFor="addressLine1"
                  className="text-base font-normal text-text-gilroy-medium"
                >
                  Registered Address Line 1
                  <span className="text-red-500">*</span>
                </label>
                <TextArea
                  placeholder="Enter address"
                  {...register("addressLine1")}
                />
                {errors.addressLine1 && (
                  <p className="text-red-500">{errors.addressLine1.message}</p>
                )}
              </div>
              <div className="-mt-[6px]">
                <label
                  htmlFor="addressLine2"
                  className="text-base font-normal text-gilroy-medium"
                >
                  Registered Address Line 2
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
                <label
                  htmlFor="pinCode"
                  className="text-base font-normal text-gilroy-medium"
                >
                  Pine code <span className="text-red-500">*</span>
                </label>
                <InputFields placeholder="Type Here" {...register("pinCode")} />
                {errors?.pinCode && (
                  <p className="text-red-500">{errors?.pinCode?.message}</p>
                )}
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
              <div>
                <label
                  htmlFor="gstNumber"
                  className="text-base font-normal text-gilroy-medium"
                >
                  GST Number <span className="text-red-500">*</span>
                </label>
                <InputFields
                  placeholder="Type here"
                  {...register("gstNumber")}
                />
                {errors?.gstNumber && (
                  <p className="text-red-500">{errors?.gstNumber?.message}</p>
                )}
              </div>
 */