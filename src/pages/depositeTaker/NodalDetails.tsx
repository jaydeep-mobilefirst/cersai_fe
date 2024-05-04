import { useContext, useState } from "react";
import InputFields from "../../components/userFlow/form/InputField";
import { useScreenWidth } from "../../utils/screenSize";
import OtpPage from "./OtpPage";
import { useDepositTakerRegistrationStore } from "../../zust/deposit-taker-registration/registrationStore";
import TextArea from "../../components/userFlow/form/TextArea";
import SelectButton from "../../components/userFlow/form/SelectButton";
import { FormHandlerContext } from "../../contextAPI/useFormFieldHandlers";
import LoaderSpin from "../../components/LoaderSpin";
import { useNavigate } from "react-router-dom";
import DatePicker from "../../components/userFlow/form/DatePicker";

type Props = {};

const NodalDetails = (props: Props) => {
  const Navigate = useNavigate();
  const screenWidth = useScreenWidth();
  const [showOTPModel, setShowOTPModel] = useState<boolean>(false);
  const {onChange, handleValidationChecks} = useContext(FormHandlerContext)
  const [loader, setLoader] = useState(false);

  const {allFormData} = useDepositTakerRegistrationStore(state => state)

  const sectionId = allFormData?.entitySections?.find((s : any) => s?.sectionName === "Nodal Details");
  const formFields = allFormData?.formFields?.form_fields?.filter((f : any) => f?.sectionId === sectionId?.id);
  
  const onSubmit = async (event : any) => {
    event?.preventDefault();
    setLoader(true)
    const noError = await handleValidationChecks(formFields)    
    setLoader(false)

    if (noError) {
      setShowOTPModel(true)
    }

    // if (noError) {
    //   Navigate('/depositetaker/signup/reviewdetails')
    // }
  }; 


  return (
    <>
      <form
        className="flex items-center justify-between flex-col h-full lg:h-[100vh]"
      >
        <div
          style={{
            width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
          }}
        >
          <div className="border-[#E6E6E6] border-[1px] lg:mt-[76px] w-full"></div>
          <div className="bg-white p-6 w-full">
            <h1 className="text-2xl font-bold mb-6">Nodal Details</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
        {showOTPModel && <OtpPage closeShowOtpModel={() => setShowOTPModel(false)} />}

        <div>
          <div
            className="flex w-full p-4 lg:px-[30px] flex-row justify-between items-center"
            style={{
              width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
            }}
          >
            <div 
              className="flex flex-row items-center space-x-2"
              onClick={() => Navigate('/depositetaker/signup/regulatordetails')}
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
              <button className="text-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#385723]">
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
    </>
  );
};

export default NodalDetails;

/*
              <div>
                <label
                  htmlFor="nodalOfficerName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Nodal Officer Name<span className="text-red-500">*</span>
                </label>
                <InputFields
                  type="text"
                  id="nodalOfficerName"
                  placeholder="Type here"
                  {...register("nodalOfficerName")}
                  //   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <span className="text-red-500">
                  {errors.nodalOfficerName?.message}
                </span>
              </div>
              <div>
                <label
                  htmlFor="nodalOfficerEmail"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Nodal Officer Email <span className="text-red-500">*</span>
                </label>
                <InputFields
                  type="email"
                  id="nodalOfficerEmail"
                  placeholder="Type here"
                  {...register("nodalOfficerEmail")}
                  //   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <span className="text-red-500">
                  {errors.nodalOfficerEmail?.message}
                </span>
              </div>
              <div>
                <label
                  htmlFor="nodalMobileNumber"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Nodal Officer Mobile Number
                  <span className="text-red-500">*</span>
                </label>
                <InputFields
                  type="text"
                  id="nodalMobileNumber"
                  {...register("nodalOfficerMobileNumber")}
                  placeholder="Type "
                  //   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <span className="text-red-500">
                  {errors.nodalOfficerMobileNumber?.message}
                </span>
              </div>
              <div>
                <label
                  htmlFor="nodalOfficerDesgnation"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Nodal Officer Designation
                  <span className="text-red-500">*</span>
                </label>
                <InputFields
                  type="text"
                  id="nodalOfficerDesgnation"
                  placeholder="Type here"
                  {...register("nodalOfficerDesignation")}
                  //   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <span className="text-red-500">
                  {errors.nodalOfficerDesignation?.message}
                </span>
              </div>
              <div>
                <label
                  htmlFor="Dsc"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  DSC
                </label>
                <UploadButton id="Dsc" type="button" />
              </div>


*/