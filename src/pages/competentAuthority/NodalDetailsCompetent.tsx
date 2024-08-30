import React, { useContext, useEffect, useState } from "react";
import NodalDetailsSchema from "../../formValidationSchema/deposit_taker/NodalDetails.schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputFields from "../../components/userFlow/form/InputField";
import UploadButton from "../../components/userFlow/form/UploadButton";
import { useScreenWidth } from "../../utils/screenSize";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FormHandlerContext } from "../../contextAPI/useFormFieldHandlers";
import { useDepositTakerRegistrationStore } from "../../zust/deposit-taker-registration/registrationStore";
import LoaderSpin from "../../components/LoaderSpin";
import DynamicFields from "../../components/userFlow/depositeTaker/DynamicFields";
import OtpPage from "../depositeTaker/OtpPage";
import Swal from "sweetalert2";
import { axiosTraceIdInstance } from "../../utils/axios";

type Props = {};

const NodalDetails = (props: Props) => {
  const isDscKeyAvbl = process.env.REACT_APP_IS_DSC_KEY_AVBL;

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
    (s: any) => s?.sectionName === "Nodal Details"
  );
  const formFields = Array.isArray(allFormData?.formFields?.form_fields)
    ? allFormData?.formFields?.form_fields?.filter(
        (f: any) => f?.sectionId === sectionId?.id
      )
    : [];
  const mobile = allFormData?.formFields?.form_fields?.find(
    (field: any) => field?.label === "Nodal Officer Mobile Number"
  )?.userInput;
  const email = allFormData?.formFields?.form_fields?.find(
    (field: any) => field?.label === "Nodal Officer Email"
  )?.userInput;
  useEffect(() => {
    if (showOTPModel) {
      const timeout = setTimeout(() => {
        setShowOTPModel(false);
      }, 5 * 60 * 1000); // 5 minutes

      // Cleanup timeout on unmount or when showOTPModel changes
      return () => clearTimeout(timeout);
    }
  }, [showOTPModel]);

  // const verifyDscWithNodalOfficer = (data: any) => {
  //   const firstNameObj = data.find(
  //     (item: { label: string }) => item.label === "Nodal Officer First Name"
  //   );
  //   const lastNameObj = data.find(
  //     (item: { label: string }) => item.label === "Nodal Officer Last Name"
  //   );

  //   const dscObj = data.find(
  //     (item: { label: string }) => item.label === "DSC3 Certificate"
  //   );

  //   const firstName = firstNameObj?.userInput?.toUpperCase();
  //   const lastName = lastNameObj?.userInput?.toUpperCase();
  //   const dscCertName =
  //     dscObj?.userInput?.SelCertSubject?.split(",")[0]?.toUpperCase();

  //   const certNameParts = dscCertName.replace("CN=", "").split(" ");

  //   const isMatch =
  //     (certNameParts[0] === lastName && certNameParts[1] === firstName) ||
  //     (certNameParts[0] === firstName && certNameParts[1] === lastName);
  //   return isMatch;

  //   // if (dscCertName.includes(firstName) && dscCertName.includes(lastName)) {
  //   //   return true;
  //   // } else {
  //   //   return false;
  //   // }
  // };

  const verifyDscWithNodalOfficer = (data: any) => {
    // Extract names from the data array
    const firstNameObj = data.find(
      (item: { key: string }) => item.key === "nodalFirstname"
    );
    const middleNameObj = data.find(
      (item: { key: string }) => item.key === "nodalMiddlename"
    );
    const lastNameObj = data.find(
      (item: { key: string }) => item.key === "nodalLastname"
    );
    const firstName = firstNameObj
      ? firstNameObj.userInput
          .toUpperCase()
          .split(" ")
          .filter((part: string | any[]) => part.length > 0)
      : [];
    const middleName = middleNameObj
      ? middleNameObj.userInput
          .toUpperCase()
          .split(" ")
          .filter((part: string | any[]) => part.length > 0)
      : [];
    const lastName = lastNameObj
      ? lastNameObj.userInput
          .toUpperCase()
          .split(" ")
          .filter((part: string | any[]) => part.length > 0)
      : [];

    // Check if required names are provided
    if (firstName.length === 0 || lastName.length === 0) {
      return false;
    }

    const dscObj = data.find(
      (item: { label: string }) => item.label === "DSC3 Certificate"
    );

    const dscCertName =
      dscObj?.userInput?.SelCertSubject?.split(",")[0]?.toUpperCase();

    // Extract and normalize names from the certificate name
    const certNameParts = dscCertName
      .replace("CN=", "")
      .toUpperCase()
      .split(" ")
      .filter(Boolean);

    // Combine names into a single array
    const combinedNames = [...firstName, ...middleName, ...lastName].sort();
    const certNameSorted = certNameParts.sort();
    // Check if all parts of combined names are present in the certificate name
    const isMatch =
      combinedNames.length === certNameSorted.length &&
      combinedNames.every((part, index) => part === certNameSorted[index]);
    return isMatch;
  };

  const onSubmit = async (event: any) => {
    event?.preventDefault();
    setLoader(true);
    // False means validation fail
    const noError = await handleValidationChecks(formFields);

    setLoader(false);
    if (isDscKeyAvbl === "true" && noError) {
      if (verifyDscWithNodalOfficer(formFields)) {
        console.log("name checked");
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid Name",
          text: "Nodal Officer name should match with DSC3",
        });
        return;
      }
    }

    let needVerification = sessionStorage.getItem("needToVerify");
    if (noError && (needVerification ? needVerification === "yes" : true)) {
      const response = await axiosTraceIdInstance.post(`/dual-otp/sendotp`, {
        email: email,
        mobile: mobile,
        verificationType: "nodal_officer",
        entityName: "",
      });
      if (response.data.statusCode === 201) {
        setShowOTPModel(true);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error sending OTP, Please try later",
        });
      }
    } else {
      if (noError) {
        Navigate("/competent/authority/reviewdetails");
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
      {/* <div className="border-[#E6E6E6] border-[1px] -mt-[3px]"></div> */}
      <form
        // className="p-4 flex flex-col w-full max-w-[100%] justify-between space-y-40"
        className="flex items-center justify-between flex-col h-full lg:h-[100vh]"
        onKeyDown={handleKeyPress}
      >
        <div
          style={{
            width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
          }}
        >
          <div className="border-[#E6E6E6] border-[1px] lg:mt-[76px] w-full"></div>
          {formFields?.length > 0 ? (
            <div className="bg-white p-6 w-full">
              <h1 className="text-2xl font-bold mb-6">Nodal Officer Details</h1>
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
        {showOTPModel && (
          <OtpPage
            redirectLink="/competent/authority/reviewdetails"
            closeShowOtpModel={() => setShowOTPModel(false)}
          />
        )}

        {/* <div>
          <div className="flex justify-between items-center">
            <div className="flex flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M15 6L9 12L15 18"
                  stroke="#1D1D1B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <button className="text-black transition duration-300">
                Back
              </button>
            </div>
            <button
              type={"submit"}
              className="bg-[#385723] rounded-xl p-3 text-white font-semibold text-sm w-full lg:w-auto"
            >
              Save and Continue
            </button>
          </div>
          <div className="border-[#E6E6E6] border-[1px] mt-2"></div>

          <p className="text-gilroy-light text-center text-[#24222B] text-xs cursor-pointer mt-4">
            © 2024 Protean BUDs, All Rights Reserved.
          </p>
        </div> */}
        <div>
          {formFields?.length > 0 && (
            <div
              className="flex w-full p-4 lg:px-[30px] flex-row justify-between items-center"
              style={{
                width: `${
                  screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"
                }`,
              }}
            >
              <div
                className="flex flex-row items-center space-x-2"
                onClick={() => Navigate("/competent/authority/uploaddocuments")}
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
                className="bg-[#1c468e] rounded-xl p-3 text-white text-gilroy-semibold text-sm w-full sm:w-auto sm:max-w-xs"
              >
                {loader ? <LoaderSpin /> : "Save & Review"}
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
