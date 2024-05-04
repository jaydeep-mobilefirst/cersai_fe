import InputFields from "../../components/userFlow/form/InputField";
import { useScreenWidth } from "../../utils/screenSize";
import { useDepositTakerRegistrationStore } from "../../zust/deposit-taker-registration/registrationStore";
import { useNavigate } from "react-router-dom";
import TextArea from "../../components/userFlow/form/TextArea";
import SelectButton from "../../components/userFlow/form/SelectButton";
import { useContext, useState } from "react";
import { FormHandlerContext } from "../../contextAPI/useFormFieldHandlers";
import LoaderSpin from "../../components/LoaderSpin";
import axios from "axios";

type Props = {};

const VerificationForm = (props: Props) => {
  const [loader, setLoader] = useState(false);
  const {onChange, handleValidationChecks, updatePanFormField} = useContext(FormHandlerContext)
  const Navigate = useNavigate();
  const {allFormData, setAllFormData} = useDepositTakerRegistrationStore(state => state)
  const sectionId = allFormData?.entitySections?.find((s : any) => s?.sectionName === "Verification");
  const formFields = allFormData?.formFields?.form_fields?.filter((f : any) => f?.sectionId === sectionId?.id);
  const screenWidth = useScreenWidth();

 
  const onSubmit = async (event : any) => {
    event?.preventDefault();

    // Verify Pan

    const verifyPan = async () : Promise<boolean> => {
      try {
        let company = formFields?.find((field : any, i : number) => field?.label === "Company Name (As per Pan)");
        let pan = formFields?.find((field : any, i : number) =>  field?.label === "Pan Number");
        
        let response = await axios.post("http://34.149.91.231/cms/pandirectory/api", {
          name:company?.userInput?.toUpperCase(),
          pan_no: pan?.userInput
        })
        const data = response.data;
        
        const panUpdate = updatePanFormField(data, pan);

        return panUpdate;
        
      } catch (error) {
        alert("Error while verifying pan, Please try later!")
        return false
      }

    }

    setLoader(true)
    const noError = await handleValidationChecks(formFields)
    let panVerified = undefined;
    if (noError) {
     panVerified = await verifyPan();  
    } 
    setLoader(false)
    
    if (noError && panVerified) {
      Navigate('/depositetaker/signup/entitydetails')
    }
  };  
  
  return (
    <>
      <div className="">
        <form
          className="flex items-center justify-between flex-col h-full lg:h-[100vh]"
        >
          <div
            style={{
              width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
            }}
          >
            <div className="border-[#E6E6E6] border-[1px] lg:mt-[76px] w-full"></div>
            <h1 className="text-xl md:text-2xl font-bold mx-10 ">
              Verification
            </h1>
            <div className="bg-white p-4 lg:p-[48px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {
                  formFields && formFields?.length > 0 && formFields?.map((field : any, idx : number) => {
                    const fieldType = allFormData?.fieldTypes?.find((type : any) => type?.id === field?.typeId)?.name;
                    // console.log({fieldType});

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

                      default:
                        return <></>;
                    }
                  })
                }
                {/* <div>
                  <label
                    htmlFor="companyName"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Company Name<span className="text-[#ff0000]">*</span>
                  </label>
                  <InputFields
                    placeholder="Type here"
                    {...register("companyName")}
                  />
                  {errors.companyName?.message && (
                    <span className="text-red-500">
                      {errors.companyName.message}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="panNumber"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Pan Number<span className="text-[#ff0000]">*</span>
                  </label>
                  <InputFields
                    placeholder="Type here"
                    {...register("panNumber")}
                  />
                  {errors.panNumber?.message && (
                    <span className="text-red-500">
                      {errors.panNumber?.message}
                    </span>
                  )}
                </div> */}
              </div>
            </div>
          </div>
          <div>
            <div
              className="flex w-full p-4 lg:px-[48px] flex-row justify-between items-center"
              style={{
                width: `${
                  screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"
                }`,
              }}
            > 
              <div className="flex items-center ml-auto">
                <button
                  type="submit"
                  disabled={loader}
                  onClick={onSubmit}
                  className="bg-[#385723] rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs"
                >
                  {loader ? <LoaderSpin/> : "Verify details"}
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
    </>
  );
};

export default VerificationForm;
