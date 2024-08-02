import React, { useContext, useState } from "react";
import { useScreenWidth } from "../../utils/screenSize";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FormHandlerContext } from "../../contextAPI/useFormFieldHandlers";
import { useDepositTakerRegistrationStore } from "../../zust/deposit-taker-registration/registrationStore";
import DynamicFields from "../../components/userFlow/depositeTaker/DynamicFields";
import LoaderSpin from "../../components/LoaderSpin";

const DesignatedCourtDetails: React.FC = () => {
  const screenWidth = useScreenWidth();
  const [params, setParams] = useSearchParams();
  const {
    onChange,
    handleValidationChecks,
    onFileChange,
    handleDocumentValidations,
  } = useContext(FormHandlerContext);
  const [loader, setLoader] = useState(false);
  const Navigate = useNavigate();

  const { allFormData, documentData } = useDepositTakerRegistrationStore(
    (state) => state
  );

  const sectionId = allFormData?.entitySections?.find(
    (s: any) => s?.sectionName === "Designated Court Details"
  );
  const formFields =
    allFormData?.formFields?.form_fields
      ?.filter((f: any) => f?.sectionId === sectionId?.id)
      .map((field: any) => {
        return {
          ...field,
          disabled: ["State", "Jurisdiction"].includes(field.label),
        };
      }) || [];

  const onSubmit = async (event: any) => {
    event?.preventDefault();
    setLoader(true);
    const noError = await handleValidationChecks(formFields);
    setLoader(false);

    if (noError) {
      const edit = params.get("edit");
      if (edit !== undefined && edit !== null && edit !== "") {
        Navigate("/designated/court/reviewdetails");
      } else {
        Navigate("/designated/court/uploaddocuments ");
      }
    }
  };

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
          <div className="flex flex-col p-6 w-full">
            <h1 className="text-2xl font-bold mb-6 text-gilroy-medium">
              Court Details
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

        <div>
          <div
            className="flex w-full p-4 lg:px-[30px] flex-row justify-between items-center"
            style={{
              width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
            }}
          >
            {/* <div className="flex items-center ml-auto">
              <button
                type="submit"
                className="bg-[#1c468e] rounded-xl p-3 text-white text-sm w-full sm:w-auto sm:max-w-xs text-gilroy-semibold"
              >
                {loader ? <LoaderSpin /> : "Save & Continue"}
              </button>
            </div> */}
            <div className="flex items-center ml-auto">
              <button
                type="submit"
                className="bg-[#1c468e] rounded-xl p-3 text-white text-sm text-gilroy-semibold"
                style={{ width: "150px" }}
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
    </>
  );
};

export default DesignatedCourtDetails;
