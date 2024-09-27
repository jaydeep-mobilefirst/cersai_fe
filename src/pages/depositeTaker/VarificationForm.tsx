import { useScreenWidth } from "../../utils/screenSize";
import { useDepositTakerRegistrationStore } from "../../zust/deposit-taker-registration/registrationStore";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FormHandlerContext } from "../../contextAPI/useFormFieldHandlers";
import LoaderSpin from "../../components/LoaderSpin";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";
import DynamicFields from "../../components/userFlow/depositeTaker/DynamicFields";
import SuccessPopup from "../../components/userFlow/depositeTaker/SuccessPopUp";
import moment from "moment";
import { axiosTraceIdInstance } from "../../utils/axios";

type Props = {};

const VerificationForm = (props: Props) => {
  const [loader, setLoader] = useState(false);
  const location = useLocation();
  console.log({ location }, "location");

  const panverified = location.state?.panverified;
  const {
    onChange,
    handleValidationChecks,
    updatePanFormField,
    onFileChange,
    handleSectionCompletionTrack,
  } = useContext(FormHandlerContext);
  const Navigate = useNavigate();
  const { allFormData, documentData } = useDepositTakerRegistrationStore(
    (state) => state
  );
  const sectionId = allFormData?.entitySections?.find(
    (s: any) => s?.sectionName === "Verification"
  );
  const formFields = allFormData?.formFields?.form_fields?.filter(
    (f: any) => f?.sectionId === sectionId?.id
  );
  const screenWidth = useScreenWidth();

  // Pan modal data
  const [para1, setPara1] = useState("");
  const [para2, setPara2] = useState("");
  const [panSuccessModal, setPanSuccessModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [allVerified, setAllVerified] = useState(false);

  const onSubmit = async (event: any) => {
    event?.preventDefault();

    const verifyPan = async (): Promise<boolean> => {
      try {
        let company = formFields?.find(
          (field: any, i: number) => field?.key === "companyName"
        );
        let pan = formFields?.find(
          (field: any, i: number) => field?.key === "panNumber"
        );
        let dob = formFields?.find(
          (field: any, i: number) => field?.key === "dateOfIncorporation"
        );

        let response = await axiosTraceIdInstance.post("/pandirectory/api", {
          name: company?.userInput?.toUpperCase(),
          pan_no: pan?.userInput,
          // dob : dob[2]+"/"+dob[1]+"/"+dob[0]
          dob: moment(dob?.userInput).format("DD/MM/YYYY"),
        });
        const data = response.data;
        if (data?.status !== "success") {
          setPara1(`Verification Failed`);
          setPara2(`${data?.message}`);
          setSubmitted(false);
          setPanSuccessModal(true);
          return false;
        }

        const panUpdate = updatePanFormField(data, pan);
        return panUpdate;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          Swal.fire({
            text: error.response?.data?.message,
            title: "Error",
            icon: "error",
          });
          return false;
        }
        return false;
      }
    };

    setLoader(true);
    const noError = await handleValidationChecks(formFields);
    let panVerified = undefined;
    if (noError) {
      panVerified = await verifyPan();
    }
    setLoader(false);
    console.log({ panVerified });

    if (noError && panVerified) {
      setAllVerified(true);
      setPara1(`Verification Successful`);
      setPara2(`Your PAN Details have been successfully verified.`);
      setSubmitted(true);
      if (!panverified) {
        setPanSuccessModal(true);
      } else {
        Navigate("/depositetaker/signup/entitydetails");
      }
    } else {
      setTimeout(async () => {
        await handleSectionCompletionTrack(sectionId?.id, false);
      }, 2000);
    }
  };

  const handleClosePopup = () => {
    setPanSuccessModal(false);
    if (allVerified) {
      Navigate("/depositetaker/signup/entitydetails");
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
            {formFields?.length > 0 ? (
              <>
                <h1 className="text-xl md:text-2xl font-bold mx-10 ">
                  Verification
                </h1>

                <div className="bg-white p-4 lg:p-[48px] text-gilroy-medium">
                  <DynamicFields
                    allFormData={allFormData}
                    formFields={formFields}
                    onChange={onChange}
                    documentFields={documentData}
                    onFileChange={onFileChange}
                  />
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center h-[calc(100vh-300px)]">
                <LoaderSpin />
              </div>
            )}
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
              {formFields?.length > 0 && (
                <div className="flex items-center ml-auto">
                  <button
                    type="submit"
                    disabled={loader}
                    onClick={onSubmit}
                    className="bg-[#1C468E] rounded-xl p-3 w-[160px] text-white text-gilroy-semibold text-sm "
                  >
                    {loader ? <LoaderSpin /> : "Verify details"}
                  </button>
                </div>
              )}
            </div>
            <SuccessPopup
              closePopup={handleClosePopup}
              showPopup={() => setPanSuccessModal(true)}
              toggle={panSuccessModal}
              para1={para1}
              para2={para2}
              success={submitted}
            />
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
      </div>
    </>
  );
};

export default VerificationForm;
