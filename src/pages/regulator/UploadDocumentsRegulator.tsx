import React, { useState, useContext } from "react";
import { useScreenWidth } from "../../utils/screenSize";
import { useDepositTakerRegistrationStore } from "../../zust/deposit-taker-registration/registrationStore";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FormHandlerContext } from "../../contextAPI/useFormFieldHandlers";
import DynamicFields from "../../components/userFlow/depositeTaker/DynamicFields";

type Props = {};

const UploadDocumentsRegulator = (props: Props) => {
  const { documentData, allFormData } = useDepositTakerRegistrationStore(
    (state) => state
  );
  const sectionId = allFormData?.entitySections?.find(
    (s: any) => s?.sectionName === "Upload Documents"
  )?.id;
  const [params, setParams] = useSearchParams();
  const { onFileChange, handleDocumentValidations } =
    useContext(FormHandlerContext);
  const screenWidth = useScreenWidth();
  const Navigate = useNavigate();

  const submit = async (e: any) => {
    e.preventDefault();
    const goodToGo = await handleDocumentValidations(
      documentData[0]?.sectionId
    );
    if (goodToGo) {
      const edit = params.get("edit");
      if (edit !== undefined && edit !== null && edit !== "") {
        Navigate("/regulator/court/reviewdetails");
      } else {
        Navigate("/regulator/court/nodaldetails");
      }
    }
  };

  return (
    <>
      <div>
        <div className="border-[#E6E6E6] border-[1px] -mt-[6px]"></div>
        <form className="flex items-center justify-between flex-col h-full lg:h-[100vh] ">
          <div
            style={{
              width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
            }}
          >
            <div className="border-[#E6E6E6] border-[1px] lg:mt-20 w-full"></div>
            <div className=" p-4 lg:p-[48px]">
              <h1 className="text-2xl font-bold mb-6">Upload Documents</h1>
              <DynamicFields
                documentFields={documentData}
                sectionId={sectionId}
                onFileChange={onFileChange}
              />
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
                  className="text-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#385723] text-gilroy-regular"
                  onClick={() => Navigate("/regulator/court/regulatordetails")}
                >
                  Back
                </button>
              </div>
              <div className="flex items-center">
                <button
                  type="submit"
                  onClick={submit}
                  className="bg-[#1c468e] rounded-xl p-3 text-white text-gilroy-semibold text-sm w-full sm:w-auto sm:max-w-xs"
                >
                  Save & Continue
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

export default UploadDocumentsRegulator;
