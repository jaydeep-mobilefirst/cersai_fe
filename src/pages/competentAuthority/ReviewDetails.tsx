// @ts-nocheck
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Arrow from "../../assets/images/Arrow.svg";
import download from "../../assets/images/new_images/arrowDown.png";
import html2pdf from "html2pdf.js";
import Button from "../../components/userFlow/form/Button";
import folderOpen from "../../assets/images/folder-open.svg";
import { useDepositTakerRegistrationStore } from "../../zust/deposit-taker-registration/registrationStore";
import SuccessPopup from "../../components/userFlow/depositeTaker/SuccessPopUp";
import { signupSideBarCompetent } from "../../utils/hardText/signUpCompetentText";
import LoaderSpin from "../../components/LoaderSpin";
import ReviewMainListing from "../../components/userFlow/common/ReviewMainListing";
import Logo from "../../assets/images/logo.svg";
import { axiosTraceIdInstance } from "../../utils/axios";

const useDownloadPDF = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPdfMode, setIsPdfMode] = useState(false);

  const downloadPDF = () => {
    setIsDownloading(true);
    setIsPdfMode(true);
    const element = document.getElementById("reviewContent");
    // const isMobile = window.innerWidth <= 768;
    // const options = {
    //   margin: 0.4,
    //   filename: "details.pdf",
    //   image: { type: "jpeg", quality: 0.98 },
    //   html2canvas: { scale: isMobile ? 1 : 2 },
    //   jsPDF: {
    //     unit: "in",
    //     format: isMobile ? "a4" : "letter",
    //     orientation: "portrait",
    //   },
    // };
    const getCurrentDateTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const milliseconds = String(now.getMilliseconds()).padStart(3, "0");

      return `${day}-${month}-${year}-${hours}-${minutes}-${seconds}-${milliseconds}`;
    };
    const isMobile = window.innerWidth <= 768;
    const options = {
      margin: 0.4,
      // filename: "Reviewdetails.pdf",
      filename: `CompetentAuthority_${getCurrentDateTime()}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: isMobile ? 2 : 4 },
      jsPDF: {
        unit: "in",
        format: isMobile ? "a4" : "letter",
        orientation: "portrait",
      },
    };
    html2pdf()
      .set(options)
      .from(element)
      .save()
      .finally(() => {
        setIsDownloading(false);
        setIsPdfMode(false);
      });
  };

  return { downloadPDF, isDownloading, isPdfMode };
};

const ReviewDetails = () => {
  const Navigate = useNavigate();
  const { downloadPDF, isDownloading, isPdfMode } = useDownloadPDF();

  const [loader, setLoader] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [para1, setPara1] = useState("");
  const [para2, setPara2] = useState("");
  const [submitModal, setSubmitModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { allFormData, documentData, masterEntityId } =
    useDepositTakerRegistrationStore((state) => state);

  const submit = async (e: any) => {
    e.preventDefault();
    setLoader(true);
    let finalResult =
      allFormData &&
      allFormData?.formFields?.form_fields?.map((field: any) => {
        let sectionCode = allFormData.entitySections?.find(
          (section: any) => section?.id === field?.sectionId
        )?.sectionName;
        if (sectionCode === "Nodal Details") {
          sectionCode = "Nodal Officer";
        }
        return {
          fieldId: field?.id,
          label: field?.label,
          sectionCode: sectionCode,
          value: field?.userInput,
          key: field?.key,
        };
      });

    let docs =
      documentData?.length > 0 &&
      documentData?.map((doc: any) => {
        return {
          fieldId: doc?.id,
          label: doc?.documentName,
          sectionCode: "Upload Documents",
          value: doc?.uploadFileId,
        };
      });

    finalResult = [...finalResult, ...docs];

    axiosTraceIdInstance[allFormData?.returnJourney ? "put" : "post"](
      `/competent-authority/${
        allFormData?.returnJourney ? "return-journey" : "add-form-fields"
      }`,
      {
        identity: allFormData?.uniqueId,
        formData: finalResult,
        masterId: masterEntityId,
      }
    )
      .then((response: any) => {
        const data = response.data;
        if (data?.success) {
          // setSubmitModal( true)
          if (allFormData?.returnJourney) {
            setPara1(`Your resumption journey has been sent successfully and
              approval/rejection of your resumption will be informed to you
              via email.`);
            setPara2(``);
          } else {
            setPara1(`Your registration request has been sent successfully and
              approval/rejection of your registration will be informed to you
              via email.`);
            setPara2(
              `Your registration acknowledgement ID is ${data?.data?.newCompetentAuthority?.uniqueId}`
            );
          }

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
      <div className="flex flex-col justify-between h-screen">
        <header className="lg:p-[38px] border-b border-gray-200"></header>
        <main className="flex-grow p-6 overflow-auto custom-scrollbar">
          <div id="reviewContent">
            {isPdfMode && (
              <div className="flex items-center">
                <img src={Logo} alt="logo" className="rounded-full h-28 w-28" />
                <div className=" w-auto  mx-auto">
                  <p className="text-xl text-gilroy-bold font-bold">
                    Central Registry of Securitization Asset
                  </p>
                  <p className="text-xl text-gilroy-bold font-bold">
                    Reconstruction and Security Interest of India
                  </p>
                </div>
              </div>
            )}

            <h1
              className={`text-2xl font-bold mb-6 ${
                isPdfMode ? "flex justify-center items-center" : ""
              }`}
            >
              Review Details
            </h1>
            {/* {allFormData &&
              allFormData?.entitySections?.map(
                (section: any, index: number) => (
                  <div className="mb-[16px]" key={index}>
                    <div className="rounded-t-lg bg-[#E7F0FF] flex justify-between h-[57px] ">
                      <p className="lg:w-[152px] ml-[16px] mt-[16px] lg:text-[20px] text-[20px] pb-2 text-nowrap font-bold text-2xl">
                        {section?.sectionName}
                      </p>
                      <button className="text-[#1c468e] text-[16px] lg:text-[20px] mr-[13px] font-bold">
                        {section?.sectionName !== "Verification" ? (
                          <Link
                            to={
                              signupSideBarCompetent.find(
                                (sec) =>
                                  sec?.description === section?.sectionName
                              )?.path + "?edit=true"
                            }
                          >
                            Edit
                          </Link>
                        ) : (
                          "Success"
                        )}
                      </button>
                    </div>

                    <div className="shadow-sm p-5 rounded-md ">
                      <div className="flex flex-col justify-between w-full sm:flex-row gap-y-[16px]">
                        <div className="w-full grid gap-y-[16px] grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          {allFormData?.formFields?.form_fields
                            ?.filter((f: any) => f?.sectionId === section?.id)
                            ?.map((field: any, idx: number) => {
                              return (
                                <div
                                  className={`sm:mr-[48px] flex justify-between ${
                                    idx % 2 === 0
                                      ? "sm:border-r-[0.5px] border-r-[#385723] border-opacity-20"
                                      : ""
                                  } `}
                                  key={idx}
                                >
                                  <div className="text-gray-500">
                                    {field.label}
                                    <span className="text-[#ff0000]">*</span>
                                  </div>
                                  <div>
                                    {field?.dscFileNAme !== "" &&
                                    field?.dscFileNAme !== undefined
                                      ? field?.dscFileNAme
                                      : field.userInput}
                                  </div>
                                </div>
                              );
                            })}
                          {section?.sectionName === "Upload Documents" &&
                            documentData?.map((doc: any, idx: number) => {
                              return (
                                <div
                                  className={`sm:mr-[48px] flex justify-between ${
                                    idx % 2 === 0
                                      ? "sm:border-r-[0.5px] border-r-[#385723] border-opacity-20"
                                      : ""
                                  } `}
                                  key={idx}
                                >
                                  <div className="text-gray-500">
                                    {doc?.documentName}
                                    <span className="text-[#ff0000]">*</span>
                                  </div>
                                  <div>{doc?.fileName}</div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )} */}
            <ReviewMainListing
              allFormData={allFormData}
              documentData={documentData}
              urlList={signupSideBarCompetent}
              isPdfMode={isPdfMode}
            />

            {!isPdfMode && (
              <div className="flex flex-shrink-0 mt-[20px] items-start">
                <div className="mt-0.5">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[#1c648e] "
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    placeholder="ischecked"
                  />
                </div>
                <div className="leading-[24px] ml-4 text-gilroy-medium text-[14px]">
                  I hereby declare that all information provided by me is
                  correct and I agree to the &nbsp;
                  <Link
                    className="text-[#1c468e] underline cursor-pointer"
                    target={"_blank"}
                    to="https://storage.googleapis.com/cersai-buds/files/termsandcondition.pdf"
                  >
                    Terms and Conditions
                  </Link>
                </div>
              </div>
            )}
          </div>
        </main>

        <div className="flex justify-between items-center my-3 flex-col sm:flex-row">
          <div className=" ml-5">
            <button
              className="text-gilroy-regular text-sm flex items-center p-4 sm:p-0"
              onClick={() => Navigate(-1)}
            >
              <img src={Arrow} alt="back Arrow" className="mr-2" />
              Back
            </button>
          </div>
          <div className="flex mr-7">
            <div>
              <button
                onClick={downloadPDF}
                className={`w-auto md:w-[208px] md:h-[48px] text-gilroy-semibold gap-[8px] flex rounded-[12px] text-[#1c468e] border border-[#1c468e] p-3 md:pt-[12px] md:pr-[22px] md:pb-[12px] md:pl-[22px]   ${
                  isChecked ? "" : "opacity-50"
                }`}
              >
                <img src={download} alt="download" className="mr-2" />
                {isDownloading ? "Downloading..." : "Download PDF"}
              </button>
            </div>
            <div>
              <button
                type="submit"
                onClick={submit} // Assuming this action should be tied to the Submit button
                className={`ml-[16px] w-auto md:w-[109px] md:h-[48px] text-gilroy-semibold rounded-[12px] bg-[#1c468e] text-[#ffffff] border p-3 md:pt-[12px] md:pr-[22px] md:pb-[12px] md:pl-[22px] ${
                  isChecked ? "bg-[#1C468E]" : "bg-[#1C468E] opacity-50"
                }`}
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
        <footer className="p-4 border-[#E6E6E6] border-[1px] ">
          <p className="text-gilroy-light text-center text-[#24222B] text-xs cursor-pointer mt-4">
            © 2024 Protean BUDs, All Rights Reserved.
          </p>
        </footer>
      </div>
    </>
  );
};

export default ReviewDetails;
