import React from "react";
import folderOpen from "../../assets/images/folder-open.svg";
import exportTestHigh from "../../assets/images/exportTestHigh.svg";

type Props = {};

const UploadDocumentsDesignated = (props: Props) => {
  return (
    <>
      <div className="border-[#E6E6E6] border-[1px] -mt-[3px]"></div>
      <form className="p-4 flex flex-col w-full max-w-[100%] justify-between">
        <div>
          <div className="rounded-t-lg bg-[#EEF7EB] flex justify-between h-[57px] text-gilroy-bold mb-4">
            <p className="lg:w-[152px] ml-[16px] mt-[16px] text-xl lg:text-[20px] pb-2 text-nowrap">
              Upload Documents
            </p>
          </div>
          <div className="rounded-t-lg bg-[#EEF7EB] flex justify-between items-center h-16 text-gilroy-bold mb-4">
            <div className="flex p-7 space-x-2 ">
              <div className="mt-2">
                <img
                  src={folderOpen}
                  alt={folderOpen}
                  className=" bg-[#52AE3226]  rounded p-1 text-white"
                />
              </div>
              <div>
                <h1 className="text-sm font-normal text-gilroy-medium text-[#1D1D1B]">
                  Upload Document{" "}
                </h1>
                <p className="text-base font-normal text-gilroy-medium text-gray-400">
                  No Document uploaded
                </p>
              </div>
            </div>
            <div className="mr-3">
              <img
                src={exportTestHigh}
                alt={exportTestHigh}
                className="bg-[#385723] rounded p-3 text-white"
              />
            </div>
          </div>
          <h1 className="text-sm font-normal text-gilroy-medium text-[#1D1D1B]">
            <span className="text-red-500">*</span>Office Order / Any other
            supporting document for appointment of Nodal Officer.
          </h1>
        </div>
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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <button className="text-black transition duration-300">Back</button>
          </div>
          <button
            type={"submit"}
            className="bg-[#385723] rounded-xl p-3 text-white font-semibold text-sm  w-[224px]"
          >
            Save & Continue
          </button>
        </div>
      </form>
    </>
  );
};

export default UploadDocumentsDesignated;
