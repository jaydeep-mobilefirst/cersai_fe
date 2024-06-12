// @ts-nocheck
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Arrow from "../../assets/images/Arrow.svg";
import download from "../../assets/images/new_images/arrowDown.png";
import html2pdf from "html2pdf.js";
import { useDepositTakerRegistrationStore } from "../../zust/deposit-taker-registration/registrationStore";
import { signupSideBarDesignated } from "../../utils/hardText/signUpDesignatedText";
import SuccessPopup from "../../components/userFlow/depositeTaker/SuccessPopUp";
import LoaderSpin from "../../components/LoaderSpin";
import axios from "axios";
import { bffUrl } from "../../utils/api";
import ReviewMainListing from "../../components/userFlow/common/ReviewMainListing";

const useDownloadPDF = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const downloadPDF = () => {
    setIsDownloading(true);
    const element = document.getElementById("reviewContent");
    html2pdf().from(element).save();
    setIsDownloading(false);
  };

  return { downloadPDF, isDownloading };
};

const ReviewDetailsDesignated = () => {
  const [para1, setPara1] = useState("");
  const [para2, setPara2] = useState("");
  const [submitModal, setSubmitModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { allFormData, documentData } = useDepositTakerRegistrationStore((state) => state);
  const Navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const { downloadPDF, isDownloading } = useDownloadPDF();
  const [loader, setLoader] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const submit = async (e: any) => {
    e.preventDefault();
    setLoader(true);
    let finalResult = allFormData?.formFields?.form_fields?.map((field: any) => {
      let sectionCode = allFormData.entitySections?.find((section: any) => section?.id === field?.sectionId)?.sectionName;
      if (sectionCode === 'Nodal Details') {
        sectionCode = 'Nodal Officer'
      }

      console.log({ sectionCode });

      return {
        fieldId: field?.id,
        label: field?.label,
        sectionCode: sectionCode,
        value: field?.userInput,
        key : field?.key
      };
    });

    let docs = documentData?.length > 0 && documentData?.map((doc: any) => {
      return {
        fieldId: doc?.id,
        label: doc?.documentName,
        sectionCode: "Upload Documents",
        value: doc?.uploadFileId,
      };
    })

    finalResult = [...finalResult, ...docs]

    axios.post(
      bffUrl + "/designated-court/add-form-fields",
      { formData: finalResult }
    )
      .then((response: any) => {
        const data = response.data;
        if (data?.success) {
          // setSubmitModal( true)
          setPara1(`Your registration request has been sent successfully and
            approval/rejection of your registration will be informed to you
            via email.`)
          setPara2(`Your registration acknowledgement ID is ${data?.data?.newDesignatedCourt?.uniqueId}`)
          setSubmitted(true)
          setSubmitModal(true)
        } else {
          setPara1(`Something went wrong`);
          setPara2(`Please try again later`);
          setSubmitted(false);
          setSubmitModal(true);
        }
      })
      .catch((e: any) => {
        setLoader(false);
        setPara1(e?.response?.data?.detail?.message)
        setPara2(`Please try again later`);
        setSubmitted(false);
        setSubmitModal(true);
        setLoader(false);
      });
  };
  

  return (
    <>
      <div className="flex flex-col justify-between h-screen">
        <header className="lg:p-[38px] border-b border-gray-200"></header>
        <main className="flex-grow p-6 overflow-auto custom-scrollbar">
          <div id="reviewContent">
            <h1 className="text-2xl font-bold mb-6">Review</h1>
            <ReviewMainListing allFormData={allFormData} documentData={documentData} urlList={signupSideBarDesignated}/>
            {/* {allFormData &&
              allFormData?.entitySections?.map(
                (section: any, index: number) => (
                  <div className="mb-[16px]" key={index}>
                    <div className="rounded-t-lg bg-[#E7F0FF] flex justify-between h-[57px]">
                      <p className="lg:w-[152px] ml-[16px] mt-[16px] text-[20px] lg:text-[20px] pb-2 text-nowrap font-bold text-2xl">
                        {section?.sectionName}
                      </p>
                      <button className="text-[#1c468e] text-[16px] lg:text-[20px] mr-[13px] font-bold ">
                        {section?.sectionName !== "Verification" ? (
                          <Link
                            to={
                              signupSideBarDesignated.find(
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
                                  className={`sm:mr-[48px] flex justify-between ${idx % 2 === 0
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
                          {
                            section?.sectionName === "Upload Documents" &&
                            documentData?.map((doc: any, idx: number) => {
                              return <div
                                className={`sm:mr-[48px] flex justify-between ${idx % 2 === 0
                                    ? "sm:border-r-[0.5px] border-r-[#385723] border-opacity-20"
                                    : ""
                                  } `}
                                key={idx}
                              >
                                <div className="text-gray-500">
                                  {doc?.documentName}
                                  <span className="text-[#ff0000]">*</span>
                                </div>
                                <div>
                                  {
                                    doc?.fileName
                                  }
                                </div>
                              </div>
                            })
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )} */}
          </div>
          <div className="flex flex-shrink-0 mt-[20px]">
            <div className="w-[24px] h-[24px] justify-center align-center">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                placeholder="ischecked"
                className="h-4 w-4 accent-[#1c468e]"
              />
            </div>
            <div className="leading-[24px]">
              I provide my consent to &nbsp;
              <span className="text-[#1c468e] underline">BUDs act 2019</span>
            </div>
          </div>
        </main>

        <div className="flex justify-between items-center my-3 flex-col sm:flex-row">
          <div className=" ml-5">
            <button className="text-gilroy-regular flex items-center p-4 sm:p-0 ">
              <img src={Arrow} alt="back Arrow" className="mr-2" />
              Back
            </button>
          </div>
          <div className="flex mr-7">
            <div>
              <button
                onClick={downloadPDF}
                disabled={!isChecked}
                className="w-auto md:w-[208px] md:h-[48px] gap-[8px] flex rounded-[12px] text-[#1c468e] text-gilroy-semibold border border-[#1c468e] p-3 md:pt-[12px] md:pr-[22px] md:pb-[12px] md:pl-[22px]"
              >
                <img src={download} alt="download" className="mr-2" />
                {isDownloading ? "Downloading..." : "Download PDF"}
              </button>
            </div>
            <div>
              <button
                onClick={submit} // Assuming this action should be tied to the Submit button
                disabled={!isChecked || loader}
                className={`ml-[16px] w-auto md:w-[130px] cursor-pointer rounded-[12px] md:w-[109px] md:h-[48px] text-gilroy-semibold ${
                  isChecked ? "bg-[#1c468e]" : "bg-[#1c468e] opacity-50"
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
              Navigate('/')
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

export default ReviewDetailsDesignated;
