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
    const isMobile = window.innerWidth <= 768;
    const options = {
      margin: 0.4,
      // filename: "Reviewdetails.pdf",
      filename: "DesignatedCourt.pdf",
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
// const useDownloadPDF = () => {
//   const [isDownloading, setIsDownloading] = useState(false);
//   const [isPdfMode, setIsPdfMode] = useState(false);

//   const downloadPDF = () => {
//     setIsDownloading(true);
//     setIsPdfMode(true);
//     const element = document.getElementById("reviewContent");

//     // Ensure the content does not overflow
//     element.style.overflow = "hidden";
//     element.style.maxHeight = "auto";

//     const isMobile = window.innerWidth <= 768;
//     const options = {
//       margin: 0.2, // Reduce margin to fit more content
//       filename: "details.pdf",
//       image: { type: "jpeg", quality: 0.98 },
//       html2canvas: { scale: isMobile ? 2 : 3 }, // Adjust scale
//       jsPDF: {
//         unit: "in",
//         format: isMobile ? "a4" : "letter",
//         orientation: "portrait",
//       },
//       pagebreak: { mode: ["avoid-all", "css", "legacy"] },
//     };

//     html2pdf()
//       .set(options)
//       .from(element)
//       .toPdf()
//       .get("pdf")
//       .then(function (pdf) {
//         const totalPages = pdf.internal.getNumberOfPages();
//         // Delete empty pages
//         for (let i = totalPages; i >= 2; i--) {
//           if (pdf.internal.pages[i].length === 1) {
//             pdf.deletePage(i);
//           }
//         }
//       })
//       .save()
//       .finally(() => {
//         setIsDownloading(false);
//         setIsPdfMode(false);
//       });
//   };

//   return { downloadPDF, isDownloading, isPdfMode };
// };

const ReviewDetailsDesignated = () => {
  const [para1, setPara1] = useState("");
  const [para2, setPara2] = useState("");
  const [submitModal, setSubmitModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { allFormData, documentData, masterEntityId } =
    useDepositTakerRegistrationStore((state) => state);
  const Navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const { downloadPDF, isDownloading, isPdfMode } = useDownloadPDF();
  const [loader, setLoader] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoader(true);
    let finalResult = allFormData?.formFields?.form_fields?.map((field) => {
      let sectionCode = allFormData.entitySections?.find(
        (section) => section?.id === field?.sectionId
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
      documentData?.map((doc) => {
        return {
          fieldId: doc?.id,
          label: doc?.documentName,
          sectionCode: "Upload Documents",
          value: doc?.uploadFileId,
        };
      });

    finalResult = [...finalResult, ...docs];

    axiosTraceIdInstance[allFormData?.returnJourney ? "put" : "post"](
      `/designated-court/${
        allFormData?.returnJourney ? "return-journey" : "add-form-fields"
      }`,
      {
        identity: allFormData?.uniqueId,
        formData: finalResult,
        masterId: masterEntityId,
      }
    )
      .then((response) => {
        const data = response.data;
        if (data?.success) {
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
              `Your registration acknowledgement ID is ${data?.data?.newDesignatedCourt?.uniqueId}`
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
      .catch((e) => {
        setLoader(false);
        setPara1(e?.response?.data?.detail?.message);
        setPara2(e?.response?.data?.message);
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
            {/* {isPdfMode && (
              <div>
                <img
                  src={Logo}
                  alt="logo"
                  className="rounded-full h-[52px] w-[52px]"
                />
              </div>
            )}
            <h1 className="text-2xl font-bold mb-6">Review Details</h1> */}
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
            <ReviewMainListing
              allFormData={allFormData}
              documentData={documentData}
              urlList={signupSideBarDesignated}
              isPdfMode={isPdfMode}
            />
          </div>
          {!isPdfMode && (
            <div className="flex flex-shrink-0 mt-5">
              <div className="justify-center align-center">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  placeholder="ischecked"
                  className="h-4 w-4 accent-[#1c468e]"
                />
              </div>
              <div className="leading-6 ml-4 text-gilroy-medium">
                I hereby declare that all information provided is best of my
                knowledge&nbsp;
                <Link
                  className="text-[#1c468e] underline cursor-pointer"
                  target={"_blank"}
                  to="https://storage.googleapis.com/cersai-buds/files/termsandcondition.pdf"
                >
                  {" "}
                  Terms and Conditions
                </Link>
              </div>
            </div>
          )}
        </main>

        <div className="flex justify-between items-center my-3 flex-col sm:flex-row">
          <div className="ml-5">
            <button
              className="text-gilroy-regular text-sm flex items-center p-4 sm:p-0"
              role="button"
              onClick={() => Navigate("/depositetaker/signup/nodaldetails")}
            >
              <img src={Arrow} alt="back Arrow" className="mr-2" />
              Back
            </button>
          </div>
          <div className="flex mr-9">
            <div>
              <button
                onClick={downloadPDF}
                disabled={!isChecked}
                className={`w-auto md:w-[208px] md:h-[48px] gap-2 text-gilroy-semibold flex rounded-xl text-blue-700 border border-blue-700 p-3 md:pt-3 md:pr-6 md:pb-3 md:pl-6  ${
                  isChecked ? "" : "opacity-50"
                }`}
              >
                <img src={download} alt="download" className="mr-2" />
                {isDownloading ? "Downloading..." : "Download PDF"}
              </button>
            </div>
            <div>
              <button
                onClick={submit}
                disabled={!isChecked || loader}
                className={`ml-4 w-auto md:w-28 md:h-12 rounded-xl text-gilroy-semibold ${
                  isChecked ? "bg-blue-700" : "bg-blue-700 opacity-50"
                } text-white border p-3 md:pt-3 md:pr-6 md:pb-3 md:pl-6`}
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
        <footer className="p-4 border-gray-200 border">
          <p className="text-gilroy-light text-center text-gray-700 text-xs cursor-pointer mt-4">
            © 2024 Protean BUDs, All Rights Reserved.
          </p>
        </footer>
      </div>
    </>
  );
};

export default ReviewDetailsDesignated;
