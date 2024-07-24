import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SelectButton from "../../components/userFlow/form/SelectButton";
import TextArea from "../../components/userFlow/form/TextArea";
import { EntityDetailschema } from "../../formValidationSchema/deposit_taker/EntityValidation.schema";
import { useScreenWidth } from "../../utils/screenSize";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FormHandlerContext } from "../../contextAPI/useFormFieldHandlers";
import { useDepositTakerRegistrationStore } from "../../zust/deposit-taker-registration/registrationStore";
import DynamicFields from "../../components/userFlow/depositeTaker/DynamicFields";
import LoaderSpin from "../../components/LoaderSpin";

const ComponentDetails: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const Navigate = useNavigate();
  const screenWidth = useScreenWidth();
  const [showOTPModel, setShowOTPModel] = useState<boolean>(false);
  const {
    onChange,
    handleValidationChecks,
    onFileChange,
    handleDocumentValidations,
  } = useContext(FormHandlerContext);
  const [loader, setLoader] = useState(false);

  const { allFormData, documentData } = useDepositTakerRegistrationStore(
    (state) => state
  ); 

  const sectionId = allFormData?.entitySections?.find(
    (s: any) => s?.sectionName === "Competent Authority Details"
  );
  const formFields = Array.isArray(allFormData?.formFields?.form_fields)
    ? allFormData?.formFields?.form_fields?.filter(
        (f: any) => f?.sectionId === sectionId?.id
      )
    : [];

  const onSubmit = async (event: any) => {
    event?.preventDefault();
    setLoader(true);
    // False means validation fail
    const noError = await handleValidationChecks(formFields);

    setLoader(false);

    if (noError) {
      const edit = params.get("edit");
      console.log({ edit });
      if (edit !== undefined && edit !== null && edit !== "") {
        Navigate("/competent/authority/reviewdetails");
      } else {
        Navigate("/competent/authority/uploaddocuments");
      }
    }
  };

  return (
    <>
      {/* <div className="border-[#E6E6E6] border-[1px] -mt-[3px]"></div> */}
      {/* <div className="flex flex-col h-[90vh] p-4 md:p-6"> */}
      <form
        // className="flex flex-col justify-between flex-1"
        className="flex items-center justify-between flex-col h-full lg:h-[100vh]"
      >
        <div
          style={{
            width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
          }}
        >
          <div className="border-[#E6E6E6] border-[1px] lg:mt-[76px] w-full"></div>
          <div className="flex flex-col p-6 w-full">
            <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
              Competent Details
            </h1>
            <DynamicFields
              allFormData={allFormData}
              formFields={formFields}
              onChange={onChange}
              documentFields={documentData}
              onFileChange={onFileChange}
            />
          </div>
        </div>

        {/* <div className="mt-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex cursor-pointer ">
              <img src={ArrowIcon} alt="" />
              <h1 className="text-sm font-normal text-black ml-2">Back</h1>
            </div>
            <div>
              <Button type="submit" label="Save & Continue" />
            </div>
          </div>
          <div className="border-[#E6E6E6] border-[1px] mt-2"></div>

          <p className="text-gilroy-light text-center text-[#24222B] text-xs cursor-pointer mt-4">
            © 2024 Protean BUDs, All Rights Reserved.
          </p>
        </div> */}
        <div>
          <div
            className="flex w-full p-4 lg:px-[30px] flex-row justify-between items-center"
            style={{
              width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
            }}
          >
            {/* <div className="flex flex-row items-center space-x-2">
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
              <button className="text-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#385723] text-gilroy-regular">
                Back
              </button>
            </div> */}
            {/* <div className="flex items-center ml-auto">
              <button
                type="submit"
                disabled={loader}
                onClick={onSubmit}
                className="bg-[#1c468e] rounded-xl p-3 text-white text-gilroy-semibold text-sm w-full sm:w-auto sm:max-w-xs"
              >
                {loader ? <LoaderSpin /> : "Save & Continue"}
              </button>
            </div> */}
            <div className="flex items-center ml-auto">
              <button
                type="submit"
                disabled={loader}
                onClick={onSubmit}
                className="bg-[#1C468E] rounded-xl p-3 w-[160px] text-white text-gilroy-semibold text-sm "
              >
                {loader ? <LoaderSpin /> : "Save & Continue"}
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

export default ComponentDetails;
