// @ts-nocheck
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Arrow from "../../assets/images/Arrow.svg";
import download from "../../assets/images/arrow-down.svg";
import html2pdf from "html2pdf.js";
import { sections } from "../../utils/hardText/landingpageText";

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

const ReviewMain = () => {
  const Navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const { downloadPDF, isDownloading } = useDownloadPDF();

  const navigateToLandingPage = () => {
    Navigate("/Landing");
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <>
      <div className="border-[#E6E6E6] border-[1px] -mt-[3px]"></div>
      <div>
        <div className="container mx-auto p-6 w-full  h-[90vh] overflow-auto">
          <div id="reviewContent">
            <h1 className="text-2xl font-bold mb-6">Review Details</h1>
            {sections.map((section, index) => (
              <div className="mb-[16px]">
                <div className="rounded-t-lg bg-[#EEF7EB] flex justify-between h-[57px;] text-gilroy-bold">
                  <p className="lg:w-[152px] ml-[16px] mt-[16px] text-[16px] lg:text-[20px] pb-2 text-nowrap">
                    {section.title}
                  </p>
                  <button
                    onClick={
                      section.buttonText === "Edit"
                        ? navigateToLandingPage
                        : undefined
                    }
                    className="text-[#385723] text-[16px] lg:text-[20px] mr-[13px] font-normal "
                  >
                    {section.buttonText}
                  </button>
                </div>

                <div className="ml-[16px] mt-[24px] mr-[16px] mb-[24px] ">
                  <div className="flex flex-col justify-between w-full sm:flex-row gap-y-[16px]">
                    <div className="  w-full sm:border-r-[0.5px] border-r-[#385723] border-opacity-20 grid gap-y-[16px]">
                      {section.fieldsLeft.map((field, idx) => (
                        <div className="sm:mr-[48px] flex justify-between ">
                          <div className="opacity-60">
                            {field.label}
                            <span className="text-[#ff0000]">*</span>
                          </div>
                          <div>{field.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="w-full grid gap-y-[16px]">
                      {section.fieldsRight.map((field, idx) => (
                        <div className="sm:ml-[48px] flex justify-between">
                          <div className="opacity-60">
                            {field.label}
                            <span className="text-[#ff0000]">*</span>
                          </div>
                          <div>{field.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-shrink-0 mt-[20px]">
            <div className="opacity-30 w-[24px] h-[24px] justify-center align-center">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                placeholder="ischecked"
              />
            </div>
            <div className="leading-[24px]">
              I here by declare that all information provided is best of my
              knowledge
            </div>
          </div>
          <div>
            <div className="flex text-nowrap justify-between mt-[52px] sm:flex-row">
              <button className="flex text-gilroy-regulartext-[14px]">
                <div>
                  <img src={Arrow} alt="back Arrow" />
                </div>
                <div>Back</div>
              </button>
              <div className="flex text-gilroy-semibold">
                <div>
                  <button
                    onClick={downloadPDF}
                    disabled={!isChecked}
                    className="w-auto md:w-[208px] gap-[8px] flex rounded-[12px] text-[#52AE32] border border-[#52AE32] p-3 md:pt-[12px] md:pr-[22px] md:pb-[12px] md:pl-[22px]"
                  >
                    <img src={download} alt="download" />{" "}
                    {isDownloading ? "Downloading..." : "Download pdf"}
                  </button>
                </div>
                <div className="ml-[16px]">
                  <button
                    disabled={!isChecked}
                    className="w-auto md:w-[208px] rounded-[12px] bg-[#385723] text-[#ffffff] border p-3 md:pt-[12px] md:pr-[22px] md:pb-[12px] md:pl-[22px]"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <div className="border-[#E6E6E6] border-[1px] mt-2"></div>
            <p className="text-gilroy-light text-center text-[#24222B] text-xs cursor-pointer mt-4">
              © 2024 Protean BUDs, All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewMain;
