// @ts-nocheck
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Arrow from "../../assets/images/Arrow.svg";
import download from "../../assets/images/arrow-down.svg";
import html2pdf from "html2pdf.js";
import Button from "../../components/userFlow/form/Button";
import  folderOpen from   "../../assets/images/folder-open.svg";


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

const ReviewDetails = () => {
  const Navigate = useNavigate();
  const [isChecked] = useState(false);
  const { downloadPDF, isDownloading } = useDownloadPDF();

  const navigateToLandingPage = () => {
    Navigate("/Landing");
  };

  const sections = [
    {
      title: "Competent Authority",
      buttonText: "Edit",
      fieldsLeft: [
        { label: "Name of Competent Authority", value: "Lorem ipsum" },
        { label: "Address Line 1", value: "Lorem ipsum" },
        { label: "Address Line 2", value: "Lorem ipsum" },
      ],
      fieldsRight: [
        { label: "PIN code", value: "Lorem ipsum" },
        { label: "State", value: "Lorem ipsum" },
        { label: "Jurisdiction", value: "Lorem ipsum" },
      ],
    },
  ];
  const sections1 = [
    {
      title: "Nodal Details",
      buttonText: "Edit",
      fieldsLeft: [
        { label: "Nodal Officer Name", value: "Lorem ipsum" },
        { label: "Nodal Officer Email", value: "Lorem ipsum" },
      ],
      fieldsRight: [
        { label: "Nodal Officer Name", value: "Lorem ipsum" },
        { label: "Nodal Officer Designation", value: "Lorem ipsum" },
      ],
    },
  ];

  return (
    <>
     <div className="border-[#E6E6E6] border-[1px] -mt-[3px]"></div>
      <div className="container mx-auto p-6 w-full  h-[90vh] overflow-auto">
        <div id="reviewContent">
        <h1 className="text-2xl font-bold mb-6">Review</h1>
        {sections.map((section, index) => (
                      <div className="mb-[16px]" key={index}>
                        <div className="rounded-t-lg bg-[#EEF7EB] flex justify-between h-[57px] text-gilroy-bold">
                          <p className="lg:w-[152px] ml-[16px] mt-[16px] text-[16px] lg:text-[20px] pb-2 text-nowrap">
                            {section.title}
                          </p>
                          <button className="text-[#385723] text-[16px] lg:text-[20px] mr-[13px] font-normal ">
                            {section.buttonText}
                          </button>
                        </div>

                        <div className="shadow-sm p-5 rounded-md ">
                          <div className="flex flex-col justify-between w-full sm:flex-row gap-y-[16px]">
                            <div className="  w-full sm:border-r-[0.5px] border-r-[#385723] border-opacity-20 grid gap-y-[16px]">
                              {section.fieldsLeft.map((field, idx) => (
                                <div
                                  className="sm:mr-[48px] flex justify-between "
                                  key={idx}
                                >
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
                                <div
                                  className="sm:ml-[48px] flex justify-between"
                                  key={idx}
                                >
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

                  <div>
                    <div className="rounded-t-lg bg-[#EEF7EB] flex justify-between h-[57px] text-gilroy-bold mb-4">
                      <p className="lg:w-[152px] ml-[16px] mt-[16px] text-xl lg:text-[20px] pb-2 text-nowrap">
                        Upload Documents
                      </p>
                    </div>
                    <div className="rounded-t-lg bg-[#EEF7EB] flex justify-between items-center h-16 text-gilroy-bold mb-4">
                      <div className="flex p-7 space-x-2 ">
                        <div className="mt-1">
                          <img
                            src={folderOpen}
                            alt={folderOpen}
                            className=" bg-[#52AE3226] rounded p-3 h-10 "
                          />
                        </div>
                        <div className="">
                          <h1 className="text-sm font-normal text-gilroy-medium text-[#1D1D1B]">
                            Document Uploaded
                          </h1>
                          <p className="text-base font-normal text-gilroy-medium text-gray-400">
                            Document.pdf
                          </p>
                        </div>
                      </div>
                      <div className="mr-3">
                        <Button
                          label="View"
                          type="button"
                          width="100px"
                         
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    {sections1.map((section, index) => (
                      <div className="mb-[16px]" key={index}>
                        <div className="rounded-t-lg bg-[#EEF7EB] flex justify-between h-[57px] text-gilroy-bold">
                          <p className="lg:w-[152px] ml-[16px] mt-[16px] text-[16px] lg:text-[20px] pb-2 text-nowrap">
                            {section.title}
                          </p>
                          <button className="text-[#385723] text-[16px] lg:text-[20px] mr-[13px] font-normal ">
                            {section.buttonText}
                          </button>
                        </div>

                        <div className="shadow-sm p-5 rounded-md ">
                          <div className="flex flex-col justify-between w-full sm:flex-row gap-y-[16px]">
                            <div className="  w-full sm:border-r-[0.5px] border-r-[#385723] border-opacity-20 grid gap-y-[16px]">
                              {section.fieldsLeft.map((field, idx) => (
                                <div
                                  className="sm:mr-[48px] flex justify-between "
                                  key={idx}
                                >
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
                                <div
                                  className="sm:ml-[48px] flex justify-between"
                                  key={idx}
                                >
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
<div className="mt-18">
        <div className="flex justify-between mt-[52px] items-center">
                 <button className="text-gilroy-regular text-[14px] flex items-center">
                  <img src={Arrow} alt="back Arrow" className="mr-2" />
                    Back
                  </button>
  <div className="flex items-center">
    <button
      onClick={downloadPDF}
      disabled={!isChecked}
      className="w-auto md:w-[208px] gap-[8px] flex rounded-[12px] text-[#52AE32] border border-[#52AE32] p-3 md:pt-[12px] md:pr-[22px] md:pb-[12px] md:pl-[22px]"
    >
      <img src={download} alt="download" className="mr-2" />
      {isDownloading ? "Downloading..." : "Download PDF"}
    </button>
    <button
      onClick={navigateToLandingPage}  // Assuming this action should be tied to the Submit button
      disabled={!isChecked}
      className="ml-[16px] w-auto md:w-[208px] rounded-[12px] bg-[#385723] text-[#ffffff] border p-3 md:pt-[12px] md:pr-[22px] md:pb-[12px] md:pl-[22px]"
    >
      Submit
    </button>
  </div>
</div>
</div>

                </div>
               
       

       

        
      
    </>
  );
};

export default ReviewDetails;
