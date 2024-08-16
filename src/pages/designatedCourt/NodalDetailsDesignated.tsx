import { useContext, useEffect, useState } from "react";
import { useScreenWidth } from "../../utils/screenSize";
import { useDepositTakerRegistrationStore } from "../../zust/deposit-taker-registration/registrationStore";
import { FormHandlerContext } from "../../contextAPI/useFormFieldHandlers";
import { useNavigate, useSearchParams } from "react-router-dom";
import DynamicFields from "../../components/userFlow/depositeTaker/DynamicFields";
import LoaderSpin from "../../components/LoaderSpin";
import OtpPage from "../depositeTaker/OtpPage";
import Swal from "sweetalert2";
import { axiosTraceIdInstance } from "../../utils/axios";

const NodalDetailsDesignated = () => {
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

  const onSubmit = async (event: any) => {
    event?.preventDefault();
    setLoader(true);
    // False means validation fail
    const noError = await handleValidationChecks(formFields);

    setLoader(false);
    let needVerification = sessionStorage.getItem("needToVerify");
    if (noError && (needVerification ? needVerification === "yes" : true)) {
      const response = await axiosTraceIdInstance.post(`/dual-otp/sendotp`, {
        email: email,
        mobile: mobile,
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
        Navigate("/designated/court/reviewdetails");
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
      <form
        onSubmit={onSubmit}
        onKeyDown={handleKeyPress}
        className='flex items-center justify-between flex-col h-full lg:h-[100vh]'
      >
        <div
          style={{
            width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
          }}
        >
          <div className='border-[#E6E6E6] border-[1px] lg:mt-[76px] w-full'></div>
          <div className='bg-white p-6 w-full'>
            <h1 className='text-2xl font-bold mb-6 text-gilroy-medium'>
              Nodal Officer Details
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
        {showOTPModel && (
          <OtpPage
            redirectLink='/designated/court/reviewdetails'
            closeShowOtpModel={() => setShowOTPModel(false)}
          />
        )}

        <div>
          {formFields?.length>0 &&
          <div
            className='flex w-full p-4 lg:px-[30px] flex-row justify-between items-center'
            style={{
              width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
            }}
          >
            <div
              className='flex flex-row items-center space-x-2'
              onClick={() => Navigate("/designated/court/uploaddocuments")}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                className='shrink-0'
              >
                <path
                  d='M15 6L9 12L15 18'
                  stroke='#1D1D1B'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <button
                role='button'
                className='text-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#385723] text-gilroy-regular'
              >
                Back
              </button>
            </div>
            {/* <div className="flex items-center">
              <button
                type="submit"
                className="bg-[#1c468e] rounded-xl p-3 text-white text-sm w-full sm:w-auto sm:max-w-xs text-gilroy-semibold"
              >
                {loader ? <LoaderSpin /> : "Save & Review"}
              </button>
            </div> */}
            <div className='flex items-center ml-auto'>
              <button
                type='submit'
                disabled={loader}
                onClick={onSubmit}
                className='bg-[#1C468E] rounded-xl p-3 w-[160px] text-white text-gilroy-semibold text-sm '
              >
                {loader ? <LoaderSpin /> : "Save & Continue"}
              </button>
            </div>
          </div>}
          <div>
            <div className='border-[#E6E6E6] border-[1px] lg:mt-4'></div>

            <p className='mb-[24px] text-gilroy-light text-center text-[#24222B] text-xs cursor-pointer mt-4'>
              © 2024 Protean BUDs, All Rights Reserved.
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default NodalDetailsDesignated;
