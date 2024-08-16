import { useScreenWidth } from "../../utils/screenSize";
import { useDepositTakerRegistrationStore } from "../../zust/deposit-taker-registration/registrationStore";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useState } from "react";
import { FormHandlerContext } from "../../contextAPI/useFormFieldHandlers";
import LoaderSpin from "../../components/LoaderSpin";
import Swal from "sweetalert2";
import DynamicFields from "../../components/userFlow/depositeTaker/DynamicFields";

type Props = {};

const RegulatorDetails = (props: Props) => {
  const [loader, setLoader] = useState(false);
  const [params, setParams] = useSearchParams();
  const { onChange, handleValidationChecks, updatePanFormField } =
    useContext(FormHandlerContext);
  const Navigate = useNavigate();
  const { allFormData, setAllFormData } = useDepositTakerRegistrationStore(
    (state) => state
  );
  const sectionId = allFormData?.entitySections?.find(
    (s: any) => s?.sectionName === "Regulators Details"
  );
  // const formFields =
  //   allFormData?.formFields?.form_fields
  //     ?.filter((f: any) => f?.sectionId === sectionId?.id)
  //     .map((field: any) => {
  //       return {
  //         ...field,
  //         disabled: [
  //           "State",
  //           "District",
  //           "Address Line 1",
  //           "Address Line 2",
  //         ].includes(field.label),
  //       };
  //     }) || [];
  const formFields =
    allFormData?.formFields?.form_fields
      ?.filter((f: any) => f?.sectionId === sectionId?.id)
      .map((field: any) => {
        const disableLabels = [
          "State",
          "District",
          "Address Line 1",
          "Address Line 2",
          "Pin Code",
        ];

        const disableKeys = [
          "state",
          "district",
          "addressLine1",
          "addressLine2",
          "pincode",
        ];

        return {
          ...field,
          disabled:
            disableLabels.includes(field.label) ||
            disableKeys.includes(field.key),
        };
      }) || [];
  // console.log({ formFields }, "formfiled");

  const screenWidth = useScreenWidth();

  const onSubmit = async (event: any) => {
    event?.preventDefault();
    setLoader(true);
    const noError = await handleValidationChecks(formFields);
    setLoader(false);

    if (noError) {
      const edit = params.get("edit");
      if (edit !== undefined && edit !== null && edit !== "") {
        Navigate("/regulator/reviewdetails");
      } else {
        Navigate("/regulator/uploaddocuments");
      }
    }
  };

  return (
    <>
      <div className="">
        <form className="flex items-center justify-between flex-col h-full lg:h-[100vh]">
          <div
            style={{
              width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
            }}
          >
            <div className="border-[#E6E6E6] border-[1px] lg:mt-[76px] w-full"></div>
            <h1 className="text-xl md:text-2xl mx-10 font-bold ">
              Regulator Details
            </h1>
            <div className="bg-white p-4 lg:p-[48px]">
              <DynamicFields
                allFormData={allFormData}
                formFields={formFields}
                onChange={onChange}
              />
            </div>
          </div>
          <div>
            {formFields?.length>0 &&
            <div
              className="flex w-full p-4 lg:px-[48px] flex-row justify-between items-center"
              style={{
                width: `${
                  screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"
                }`,
              }}
            >
              {/* <div className="flex items-center ml-auto">
                <button
                  type="submit"
                  disabled={loader}
                  onClick={onSubmit}
                  className="bg-[#1C468E] rounded-xl p-3 text-white text-gilroy-semibold text-sm w-full sm:w-auto sm:max-w-xs"
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
            </div>}
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

export default RegulatorDetails;
