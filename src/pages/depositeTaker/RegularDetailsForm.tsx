import { useContext, useState } from "react";
import InputFields from "../../components/userFlow/form/InputField";
import DatePicker from "../../components/userFlow/form/DatePicker";
import { useScreenWidth } from "../../utils/screenSize";
import { useDepositTakerRegistrationStore } from "../../zust/deposit-taker-registration/registrationStore";
import TextArea from "../../components/userFlow/form/TextArea";
import SelectButton from "../../components/userFlow/form/SelectButton";
import { FormHandlerContext } from "../../contextAPI/useFormFieldHandlers";
import LoaderSpin from "../../components/LoaderSpin";
import { useNavigate, useSearchParams } from "react-router-dom";
import DynamicFields from "../../components/userFlow/depositeTaker/DynamicFields";

type Props = {};

const RegularDetailsForm = (props: Props) => {
  const screenWidth = useScreenWidth();
  const {onChange, handleValidationChecks, onFileChange, handleDocumentValidations} = useContext(FormHandlerContext)
  const [loader, setLoader] = useState(false);
  const {allFormData, documentData} = useDepositTakerRegistrationStore(state => state)
  const Navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const sectionId = allFormData?.entitySections?.find((s : any) => s?.sectionName === "Regulators Details");
  const formFields = Array.isArray(allFormData?.formFields?.form_fields)
  ? allFormData?.formFields?.form_fields?.filter(
      (f: any) => f?.sectionId === sectionId?.id
    )
  : [];  

  const onSubmit = async (event : any) => {
    event?.preventDefault();
    setLoader(true)
    const noError = await handleValidationChecks(formFields)    
    setLoader(false)
    
    if (noError) {
      const edit = params.get('edit');
      if (edit !== undefined && edit !== null && edit !== "") {
        Navigate('/depositetaker/signup/reviewdetails')
      }
      else{
        Navigate('/depositetaker/signup/nodaldetails')
      }
    }
  }; 


  return (
    <>
      <form
        // className="p-4 flex flex-col w-full max-w-[100%] justify-between"
        className="flex items-center justify-between flex-col h-full lg:h-[100vh]"
      >
        <div
          style={{
            width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
          }}
        >
          <div className="border-[#E6E6E6] border-[1px] lg:mt-[76px] w-full"></div>
          <div className="bg-white p-6 w-full">
            <h1 className="text-2xl font-bold mb-6">Regulator Details</h1>
            <DynamicFields allFormData={allFormData} formFields={formFields} onChange={onChange} documentFields={documentData} onFileChange={onFileChange}/>
          </div>
        </div>

        <div>
          <div
            className="flex w-full p-4 lg:px-[30px] flex-row justify-between items-center"
            style={{
              width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
            }}
          >
            <div className="flex flex-row items-center space-x-2 "               
            onClick={() => Navigate('/depositetaker/signup/entitydetails')}
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
              onClick={() => Navigate('/depositetaker/signup/entitydetails')}
              className="text-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#385723] text-gilroy-regular">
                Back
              </button>
            </div>
            <div className="flex items-center">
            <button
                  type="submit"
                  disabled={loader}
                  onClick={onSubmit}
                  className="bg-[#1C468E] rounded-xl p-3 text-white text-gilroy-semibold text-sm w-full sm:w-auto sm:max-w-xs"
                >
                  {loader ? <LoaderSpin/> : "Save & Continue"}
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

export default RegularDetailsForm;

/**
               <div className="mt-[2px]">
                <label
                  htmlFor="regulatorName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Regulator Name<span className="text-red-500">*</span>
                </label>
                <InputFields
                  type="text"
                  id="regulatorName"
                  placeholder="Type here"
                  {...register("regulatorName")}
                  //   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <span className="text-red-500">
                  {errors.regulatorName?.message}
                </span>
              </div>
              <div>
                <label
                  htmlFor="registrationNo"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Registration No.{" "}
                  <span style={{ fontSize: "10px" }}>
                    (Provided by Regulator)
                  </span>
                  <span className="text-red-500">*</span>
                </label>
                <InputFields
                  type="text"
                  id="registrationNo"
                  placeholder="Type here"
                  {...register("registrationNo")}
                  //   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <span className="text-red-500">
                  {errors.registrationNo?.message}
                </span>
              </div>
              <div className="mt-[2px]">
                <label
                  htmlFor="registrationDate"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Registration approval Date
                  <span className="text-red-500">*</span>
                </label>

                <DatePicker onChange={handleDateChange} />
                <span className="text-red-500">
                  {errors.registrationDate?.message}
                </span>
              </div>
 */