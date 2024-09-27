import React, { useContext, useState } from "react";
import { useScreenWidth } from "../../utils/screenSize";
import { useDepositTakerRegistrationStore } from "../../zust/deposit-taker-registration/registrationStore";
import { FormHandlerContext } from "../../contextAPI/useFormFieldHandlers";
import LoaderSpin from "../../components/LoaderSpin";
import { useNavigate, useSearchParams } from "react-router-dom";
import DynamicFields from "../../components/userFlow/depositeTaker/DynamicFields";
import Swal from "sweetalert2";

const EntityDetails: React.FC = () => {
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
    (state: any) => state
  );

  const sectionId = allFormData?.entitySections?.find(
    (s: any) => s?.sectionName === "Entity Details"
  );
  // const formFields = Array.isArray(allFormData?.formFields?.form_fields)
  //   ? allFormData?.formFields?.form_fields
  //       ?.filter((f: any) => f?.sectionId === sectionId?.id)
  //       .map((field: any) => {
  //         return {
  //           ...field,
  //           disabled: ["State", "District"].includes(field.label),
  //         };
  //       })
  //   : [];
  const formFields =
    allFormData?.formFields?.form_fields
      ?.filter((f: any) => f?.sectionId === sectionId?.id)
      .map((field: any) => {
        const disableLabels = ["State", "District"];

        const disableKeys = ["State", "District"];

        return {
          ...field,
          disabled:
            disableLabels.includes(field.label) ||
            disableKeys.includes(field.key),
        };
      }) || [];

  console.log({ formFields }, "form filed");

  const verifyPanWithGST = () => {
    const details = allFormData?.formFields?.form_fields;

    const panObj = details.find(
      (item: { label: string }) => item.label === "PAN Number"
    );
    const gstObj = details.find(
      (item: { label: string }) => item.label === "GST Number"
    );

    const panNum = panObj?.userInput?.toUpperCase();
    const gstNum = gstObj?.userInput?.toUpperCase();

    const isMatch = gstNum.slice(2, 12) === panNum;
    return isMatch;
  };

  const onSubmit = async (event: any) => {
    event?.preventDefault();
    setLoader(true);
    const noError = await handleValidationChecks(formFields);
    setLoader(false);

    if (!verifyPanWithGST() && noError) {
      Swal.fire({
        icon: "error",
        title: "Invalid GST",
        text: "GST Number should be aligned with PAN ",
      });
      return;
    }

    if (noError) {
      const edit = params.get("edit");
      if (edit !== undefined && edit !== null && edit !== "") {
        Navigate("/depositetaker/signup/reviewdetails");
      } else {
        Navigate("/depositetaker/signup/regulatordetails");
      }
    }
  };
  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <>
      <div className="border-[#E6E6E6] border-[1px] -mt-[2px]"></div>
      {/* <div className="flex flex-col p-6 w-full"> */}
      <form
        // className="flex flex-col justify-between h-full"
        className="flex items-center justify-between flex-col h-full lg:h-[100vh]"
        onKeyPress={handleKeyPress}
      >
        <div
          style={{
            width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
          }}
        >
          <div className="border-[#E6E6E6] border-[1px] lg:mt-[76px] w-full"></div>
          {formFields?.length > 0 ? (
            <div className="bg-white p-6 w-full">
              <h1 className="text-2xl font-bold mb-6">Entity Details</h1>
              <DynamicFields
                allFormData={allFormData}
                formFields={formFields}
                onChange={onChange}
                documentFields={documentData}
                onFileChange={onFileChange}
              />
            </div>
          ) : (
            <div className="flex justify-center items-center h-[calc(100vh-300px)]">
              <LoaderSpin />
            </div>
          )}
        </div>

        <div>
          {formFields?.length > 0 && (
            <div
              className="flex w-full p-4 lg:px-[29px] flex-row justify-between items-center"
              style={{
                width: `${
                  screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"
                }`,
              }}
            >
              <div
                className="flex flex-row items-center space-x-2"
                onClick={() =>
                  Navigate("/depositetaker/signup/verification", {
                    state: {
                      panverified: true,
                    },
                  })
                }
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
                <button className="text-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#385723] text-gilroy-regular">
                  Back
                </button>
              </div>
              {/* <div className="flex items-center">
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
            </div>
          )}
          <div>
            <div className="border-[#E6E6E6] border-[1px] lg:mt-4"></div>

            <div className="text-center mt-auto">
        <h1 className="text-[#24222B] text-xs text-wrap text-gilroy-light mt-3 font-normal">
          COPYRIGHT © 2024 CERSAI. ALL RIGHTS RESERVED.
        </h1>
        <p className="text-[#24222B] text-xs text-wrap text-gilroy-light font-normal">
          Powered and managed by{" "}
          <a
            href="https://www.proteantech.in/"
            className="underline text-gilroy-regular font-bold"
            target="_blank"
          >
            Protean eGov Technologies
          </a>{" "}
        </p>
      </div>
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
