// @ts-nocheck
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Arrow from "../../assets/images/Arrow.svg";
import download from "../../assets/images/new_images/arrowDown.png";
import { useDepositTakerRegistrationStore } from "../../zust/deposit-taker-registration/registrationStore";
import LoaderSpin from "../../components/LoaderSpin";
import html2pdf from "html2pdf.js";
import { signupSideBar } from "../../utils/hardText/signuppageText";
import SuccessPopup from "../../components/userFlow/depositeTaker/SuccessPopUp";
import ReviewMainListing from "../../components/userFlow/common/ReviewMainListing";
import { axiosTraceIdInstance } from "../../utils/axios";

import Logo from "../../assets/images/logo.svg";
const useDownloadPDF = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPdfMode, setIsPdfMode] = useState(false);
  const downloadPDF = () => {
    setIsDownloading(true);
    setIsPdfMode(true);
    const element = document.getElementById("reviewContent");

    const isMobile = window.innerWidth <= 768;
    const options = {
      margin: [0.4, 0.4, 0.4, 0.4], // Adjusting the margins
      filename: "Reviewdetails.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: isMobile ? 3 : 5 }, // Increasing the scale
      jsPDF: {
        unit: "in",
        format: isMobile ? "a4" : "letter",
        orientation: "portrait",
      },
    };
    html2pdf()
      .set(options)
      .from(element)
      .toContainer()
      .toCanvas()
      .toImg()
      .toPdf()
      .save()
      .finally(() => {
        setIsDownloading(false);
        setIsPdfMode(false);
      });
  };

  return { downloadPDF, isDownloading, isPdfMode };
};

const ReviewMain = () => {
  const [para1, setPara1] = useState("");
  const [para2, setPara2] = useState("");
  const [submitModal, setSubmitModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { allFormData, documentData, masterEntityId } =
    useDepositTakerRegistrationStore((state) => state);
  const Navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const { downloadPDF, isDownloading, isPdfMode } = useDownloadPDF();

  const sectionCodes: any = {
    1: "de_verification",
    2: "de_entity_details",
    3: "de_regulations_details",
    4: "Nodal Officer",
  };

  const handleFinalSubmit = async (e: any) => {
    e.preventDefault();
    setLoader(true);
    let finalResult =
      allFormData &&
      allFormData?.formFields?.form_fields?.map((field: any) => {
        let sectionCode = allFormData?.entitySections?.find(
          (section: any) => section?.id === field?.sectionId
        )?.sectionName;
        return {
          fieldId: field?.id,
          label: field?.label,
          sectionCode: sectionCode,
          value: field?.userInput,
          key: field?.key,
        };
      });

    let docs =
      documentData?.length > 0
        ? documentData?.map((doc: any) => {
            return {
              fieldId: doc?.id,
              label: doc?.documentName,
              sectionCode: "Upload Documents",
              value: doc?.uploadFileId,
            };
          })
        : [];

    finalResult = [...finalResult, ...docs];
    axiosTraceIdInstance
      .post("/deposit-taker/add-form-fields", {
        formData: finalResult,
        regulatorId: masterEntityId,
      })
      .then((response: any) => {
        const data = response.data;
        if (data?.success) {
          // setSubmitModal( true)
          setPara1(
            `Thank you for signing up. We have sent account activation link on registered email ID. Please continue setting up account.`
          );
          setPara2(
            `Your registration acknowledgement ID is ${data?.data?.newDepositTaker?.uniqueId}`
          );
          setSubmitted(true);
          setSubmitModal(true);
        } else {
          setPara1(`Something went wrong`);
          setPara2(`Please try again later`);
          setSubmitted(false);
          setSubmitModal(true);
        }
      })
      .catch((e: any) => {
        setLoader(false);
        setPara1(e?.response?.data?.detail?.message);
        setPara2(e?.response?.data?.message);
        setSubmitted(false);
        setSubmitModal(true);
        setLoader(false);
      });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <>
      <div className='flex flex-col justify-between h-screen'>
        <header className='lg:p-[38px] border-b border-gray-200'></header>
        <main className='flex-grow p-8 overflow-auto custom-scrollbar'>
          <div id='reviewContent'>
            {isPdfMode && (
              <div>
                <img
                  src={Logo}
                  alt='logo'
                  className='rounded-full h-[52px] w-[52px]'
                />
              </div>
            )}

            <h1 className='text-2xl font-bold mb-6 font-bold'>
              Review Details
            </h1>

            <ReviewMainListing
              allFormData={allFormData}
              documentData={documentData}
              urlList={signupSideBar}
              isPdfMode={isPdfMode}
            />
            {!isPdfMode && (
              <div className='flex flex-shrink-0 mt-[20px] justify-start items-center'>
                <div className=''>
                  <input
                    type='checkbox'
                    className='h-4 w-4 accent-[#1c648e]'
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    placeholder='ischecked'
                  />
                </div>
                <div className='leading-[24px] ml-4 text-gilroy-medium text-[14px]'>
                  I here by declare that all information provided is best of my
                  knowledge
                </div>
              </div>
            )}
          </div>
        </main>

        <div className='flex justify-between items-center my-3 flex-col sm:flex-row'>
          <div className=' ml-5'>
            <button
              className='text-gilroy-regular text-sm flex items-center p-4 sm:p-0'
              role='button'
              onClick={() => Navigate("/depositetaker/signup/nodaldetails")}
            >
              <img src={Arrow} alt='back Arrow' className='mr-2' />
              Back
            </button>
          </div>
          <div className='flex mr-9'>
            <div>
              <button
                onClick={downloadPDF}
                disabled={!isChecked}
                className={`w-auto md:w-[208px] md:h-[48px] gap-[8px] text-gilroy-semibold flex rounded-[12px] text-[#1C468E] border border-[#1C468E] p-3 md:pt-[12px] md:pr-[22px] md:pb-[12px] md:pl-[22px] 
                  ${ isChecked ? "" : "opacity-50"}`}
              >
                <img src={download} alt='download' className='mr-2' />
                {isDownloading ? "Downloading..." : "Download PDF"}
              </button>
            </div>
            <div>
              <button
                onClick={handleFinalSubmit} // Assuming this action should be tied to the Submit button
                disabled={!isChecked || loader}
                className={`ml-[16px] w-auto md:w-[109px] md:h-[48px] rounded-[12px] text-gilroy-semibold ${
                  isChecked ? "bg-[#1C468E]" : "bg-[#1C468E] opacity-50"
                }  text-[#ffffff] border p-3 md:pt-[12px] md:pr-[22px] md:pb-[12px] md:pl-[22px]`}
              >
                {loader ? <LoaderSpin /> : "Submit"}
              </button>
            </div>
          </div>
        </div>
        <SuccessPopup
          closePopup={() => {
            setSubmitModal(false);
            if (submitted) {
              Navigate("/");
            }
          }}
          showPopup={() => setSubmitModal(true)}
          toggle={submitModal}
          para1={para1}
          para2={para2}
          success={submitted}
        />
        <footer className='p-4 border-[#E6E6E6] border-[1px] '>
          <p className='text-gilroy-light text-center text-[#24222B] text-xs cursor-pointer mt-4'>
            © 2024 Protean BUDs, All Rights Reserved.
          </p>
        </footer>
      </div>
    </>
  );
};

export default ReviewMain;
