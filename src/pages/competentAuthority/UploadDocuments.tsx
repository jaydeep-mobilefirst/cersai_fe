import React from "react";
import folderOpen from "../../assets/images/folder-open.svg";
import exportTestHigh from "../../assets/images/exportTestHigh.svg";

type Props = {};

const UploadDocuments = (props: Props) => {
  return (
    <form className="p-4 flex flex-col w-full max-w-[100%] justify-between space-y-60 ">
      <div className="mb-20">
        <div className="rounded-t-lg bg-[#EEF7EB] flex justify-between items-center h-[57px] text-gilroy-bold mb-4">
          <p className="ml-[16px] text-xl lg:text-[20px]">Upload Documents</p>
        </div>
        <div className="rounded-lg bg-[#EEF7EB] flex justify-between items-center p-4">
          <div className="flex space-x-4 items-center">
            <img
              src={folderOpen}
              alt="folder open"
              className="bg-[#52AE3226] rounded p-1 text-white"
            />
            <div>
              <h1 className="text-sm lg:text-base font-normal text-[#1D1D1B]">
                Office Order / Any other supporting document for appointment of
                Nodal Officer
                <span className="text-red-500">*</span>
              </h1>
              <p className="text-xs lg:text-sm font-normal text-gray-400">
                No Document uploaded
              </p>
            </div>
          </div>
          <div className="hidden lg:block">
            <img
              src={exportTestHigh}
              alt="export test high"
              className="bg-[#385723] rounded p-3 text-white"
            />
          </div>
        </div>
      </div>
      <div className='mt-10'>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="mr-2"
          >
            <path
              d="M15 6L9 12L15 18"
              stroke="#1D1D1B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <button className="text-black transition duration-300">Back</button>
        </div>
        <button
          type="submit"
          className="bg-[#385723] rounded-xl px-6 py-3 text-white font-semibold text-sm lg:text-base"
        >
          Save & Continue
        </button>
      </div>
      </div>
    </form>
  );
};

export default UploadDocuments;
