import React, { useContext, useState } from "react";
import NodalDetailsSchema from "../../formValidationSchema/deposit_taker/NodalDetails.schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputFields from "../../components/userFlow/form/InputField";
import UploadButton from "../../components/userFlow/form/UploadButton";
import { useScreenWidth } from "../../utils/screenSize";
import { useDepositTakerRegistrationStore } from "../../zust/deposit-taker-registration/registrationStore";
import { FormHandlerContext } from "../../contextAPI/useFormFieldHandlers";
import { useNavigate, useSearchParams } from "react-router-dom";
import DynamicFields from "../../components/userFlow/depositeTaker/DynamicFields";
import LoaderSpin from "../../components/LoaderSpin";

const NodalDetailsDesignated = () => {
  const screenWidth = useScreenWidth();
  const [params, setParams] = useSearchParams();
  const { onChange, handleValidationChecks } = useContext(FormHandlerContext)
  const [loader, setLoader] = useState(false);
  const Navigate = useNavigate();

  const { allFormData } = useDepositTakerRegistrationStore(state => state)

  const sectionId = allFormData?.entitySections?.find((s: any) => s?.sectionName === "Nodal Details");
  const formFields = allFormData?.formFields?.form_fields?.filter((f: any) => f?.sectionId === sectionId?.id);


  const onSubmit = async (event: any) => {
    event?.preventDefault();
    setLoader(true)
    const noError = await handleValidationChecks(formFields)
    setLoader(false)

    if (noError) {
      Navigate('/designated/court/reviewdetails')
    };
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex items-center justify-between flex-col h-full lg:h-[100vh]"
      >
        <div
          style={{
            width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
          }}
        >
          <div className="border-[#E6E6E6] border-[1px] lg:mt-[76px] w-full"></div>
          <div className="bg-white p-6 w-full">
            <h1 className="text-2xl font-bold mb-6 text-gilroy-medium">
              Nodal Details
            </h1>
            <DynamicFields allFormData={allFormData} formFields={formFields} onChange={onChange} />
          </div>
        </div>

        <div>
          <div
            className="flex w-full p-4 lg:px-[30px] flex-row justify-between items-center"
            style={{
              width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
            }}
          >
            <div className="flex flex-row items-center space-x-2">
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
                role="button"
                onClick={() => Navigate('/designated/court/uploaddocuments')}
                className="text-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#385723]">
                Back
              </button>
            </div>
            <div className="flex items-center">
              <button
                type="submit"
                className="bg-[#385723] rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs text-gilroy-semibold"
              >
                {loader ? <LoaderSpin /> : "Save And Continue"}
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

export default NodalDetailsDesignated;
