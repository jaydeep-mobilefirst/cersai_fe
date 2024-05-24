import NodalDetailsSchema from "../../formValidationSchema/deposit_taker/NodalDetails.schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputFields from "../../components/userFlow/form/InputField";
import UploadButton from "../../components/userFlow/form/UploadButton";
import { useScreenWidth } from "../../utils/screenSize";
import { useDepositTakerRegistrationStore } from "../../zust/deposit-taker-registration/registrationStore";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useState } from "react";
import { FormHandlerContext } from "../../contextAPI/useFormFieldHandlers";
import LoaderSpin from "../../components/LoaderSpin";
import axios from "axios";
import Swal from "sweetalert2";
import DynamicFields from "../../components/userFlow/depositeTaker/DynamicFields";
import OtpPage from "../depositeTaker/OtpPage";
import { bffUrl } from "../../utils/api";

const NodalDetailsRegulator = () => {
  const [params, setParams] = useSearchParams();
  const [showOTPModel, setShowOTPModel] = useState<boolean>(false);
  const [loader, setLoader] = useState(false);
  const { onChange, handleValidationChecks, updatePanFormField } =
    useContext(FormHandlerContext);
  const Navigate = useNavigate();
  const { allFormData, setAllFormData } = useDepositTakerRegistrationStore(
    (state) => state
  );
  const sectionId = allFormData?.entitySections?.find(
    (s: any) => s?.sectionName === "Nodal Details"
  );
  const formFields = allFormData?.formFields?.form_fields?.filter(
    (f: any) => f?.sectionId === sectionId?.id
  );
  const screenWidth = useScreenWidth();

  // console.log(formFields, "allFormData");
  const mobile = allFormData?.formFields?.form_fields?.find(
    (field: any) => field?.label === "Nodal Officer Mobile Number"
  )?.userInput;
  const email = allFormData?.formFields?.form_fields?.find(
    (field: any) => field?.label === "Nodal Officer Email"
  )?.userInput;

  const onSubmit = async (event: any) => {
    event?.preventDefault();
    setLoader(true);
    // False means validation fail
    const noError = await handleValidationChecks(formFields);

    setLoader(false);

    if (noError) {
      const response = await axios.post(`${bffUrl}/dual-otp/sendotp`, {
        email: email,
        mobile: mobile,
      });
      // console.log(response.data.statusCode, "deposite taker otp ");
      if (response.data.statusCode === 201) {
        setShowOTPModel(true);
      }
      else{
        Swal.fire({
          icon : "error",
          title : "Error",
          text : "Error sending OTP, Please try later"
        })
      }
    }
  };

  return (
    <>
      <form className="flex items-center justify-between flex-col h-full lg:h-[100vh]">
        <div
          style={{
            width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
          }}
        >
          <div className="border-[#E6E6E6] border-[1px] lg:mt-[76px] w-full"></div>
          <div className="bg-white p-0 w-full">
            <h1 className="text-xl md:text-2xl font-bold mx-10">
              Nodal Details
            </h1>

            <div className="bg-white p-4 lg:p-[48px]">
              <DynamicFields
                allFormData={allFormData}
                formFields={formFields}
                onChange={onChange}
              />

              {showOTPModel && (
                <OtpPage
                  redirectLink="/regulator/court/reviewdetails"
                  closeShowOtpModel={() => setShowOTPModel(false)}
                />
              )}
            </div>
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
                className="text-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#385723] text-gilroy-regular"
                onClick={() => Navigate("/regulator/court/uploaddocuments")}
              >
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
                {loader ? <LoaderSpin /> : "Save & Review"}
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

export default NodalDetailsRegulator;
