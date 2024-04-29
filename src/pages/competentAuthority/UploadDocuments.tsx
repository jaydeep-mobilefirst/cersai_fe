import React, { useState } from "react";
import folderOpen from "../../assets/images/folder-open.svg";
import directboxsend from "../../assets/images/directboxSend.svg";
import trashIcon from "../../assets/images/trash.svg";
import add from "../../assets/images/add.svg";

import { useScreenWidth } from "../../utils/screenSize";
import DeleteUpload from "./DeleteUpload";
import UploadFile from "./UploadFile";
import UploadIcon from "../../assets/images/UploadIcon.png";
type Props = {};

const UploadDocumentsRegulator = (props: Props) => {
  const screenWidth = useScreenWidth();

  const [file, setFile] = useState<File | null>(null);
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      toggleUploadPopup();
      closePopup();
    }
  };

  const toggleUploadPopup = () => {
    setShowUploadPopup(true);
  };

  const closePopup = () => {
    setShowUploadPopup(false);
  };

  const toggleDeletePopup = () => {
    setShowDeletePopup(!showDeletePopup);
  };

  const handleDeleteFile = () => {
    setFile(null);
    toggleDeletePopup();
  };

  return (
    <>
      <div>
        <div className="border-[#E6E6E6] border-[1px] -mt-[6px]"></div>

        <form className="flex items-center justify-between flex-col h-full lg:h-[100vh] ">
          {showUploadPopup && (
            <UploadFile
              showUploadPopup={showUploadPopup}
              closePopup={closePopup}
              file={file}
              handleFileChange={handleFileChange}
              toggleUploadPopup={toggleUploadPopup}
            />
          )}
          {showDeletePopup && (
            <DeleteUpload
              file={file}
              handleDeleteFile={handleDeleteFile}
              toggleDeletePopup={toggleDeletePopup}
              showDeletePopup={showDeletePopup}
            />
          )}
          <div
            style={{
              width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
            }}
          >
            <div className="border-[#E6E6E6] border-[1px] lg:mt-20 w-full"></div>
            <div className=" p-4 lg:p-[48px]">
              {/* <div className="rounded-t-lg bg-[#EEF7EB] flex justify-between h-[57px] text-gilroy-bold mb-4 ">
                <p className="lg:w-[152px] ml-[16px] mt-[16px] text-xl lg:text-[20px] pb-2 text-nowrap">
                  Upload Documents
                </p>
              </div> */}
              <h1 className="text-2xl font-bold mb-6">Upload Documents</h1>
              {/* <div className="rounded-xl bg-[#EEF7EB] flex justify-between items-center h-16 text-gilroy-bold mb-4">
                <div className="flex p-7 space-x-2 ">
                  <div className="mt-2">
                    <img
                      src={folderOpen}
                      alt={folderOpen}
                      className="bg-[#52AE3226] rounded p-1 text-white cursor-pointer"
                      onClick={toggleUploadPopup}
                    />
                  </div>
                  <div>
                    <h1 className="text-sm font-normal text-gilroy-medium text-[#1D1D1B]">
                      Office Order / Any other supporting document for
                      appointment of Nodal Officer
                      <span className="text-red-500">*</span>
                    </h1>
                    <p className="text-base font-normal text-gilroy-medium text-gray-400">
                      {file ? file.name : "No Document uploaded"}
                    </p>
                  </div>
                </div>
                <div className="mr-1 mt-1 flex">
                  {file && (
                    <div className="bg-white mt-1 mr-1 flex justify-center items-center  h-10 w-10 rounded">
                      <img
                        src={trashIcon}
                        alt="Delete"
                        className=" rounded h-5 cursor-pointer"
                        onClick={toggleDeletePopup}
                      />
                    </div>
                  )}
                  <div className="mt-1 ">
                    <button
                      type="button"
                      className="bg-[#385723] rounded-lg p-3 text-white flex justify-center items-center cursor-pointer mr-2 h-10"
                      onClick={toggleUploadPopup}
                    >
                      {file && file ? (
                        // <img src={UploadIcon} alt="Upload" className=" w-5" />
                        "View"
                      ) : (
                        <img src={UploadIcon} alt="Upload" className=" w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div> */}
              {/* <div className="rounded-xl bg-green-50 flex flex-col md:flex-row justify-between items-center p-4 md:p-7 text-gilroy-bold mb-4">
                <div className="flex flex-row items-center space-x-2 w-full">
                  <div className="mt-2">
                    <img
                      src={folderOpen}
                      alt="Folder Open Icon"
                      className="bg-green-200 rounded p-1 text-white cursor-pointer"
                      onClick={toggleUploadPopup}
                    />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-xs md:text-sm font-normal text-gilroy-medium text-gray-900">
                      Office Order / Any other supporting document for
                      appointment of Nodal Officer
                      <span className="text-red-500">*</span>
                    </h1>
                    <p className="text-xs md:text-base font-normal text-gilroy-medium text-gray-400">
                      {file ? file.name : "No Document uploaded"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row mt-1 justify-end w-full md:w-auto">
                  {file && (
                    <div className="bg-white mt-1 mr-1 flex justify-center items-center h-10 w-10 rounded">
                      <img
                        src={trashIcon}
                        alt="Delete"
                        className="rounded h-5 cursor-pointer"
                        onClick={toggleDeletePopup}
                      />
                    </div>
                  )}
                  <div className="mt-1">
                    <button
                      type="button"
                      className="bg-green-800 rounded-lg p-3 text-white flex justify-center items-center cursor-pointer mr-2 h-10"
                      onClick={toggleUploadPopup}
                    >
                      {file ? (
                        "View"
                      ) : (
                        <img src={UploadIcon} alt="Upload" className="w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div> */}
              <div className="rounded-xl bg-[#9696961A] flex flex-col md:flex-row justify-between items-center p-4  text-gilroy-bold mb-4">
                <div className="flex flex-row items-center space-x-2 w-full">
                  <div className="mt-2">
                    <img
                      src={folderOpen}
                      alt="Folder Open Icon"
                      className="bg-[#EEF7EB] rounded p-1 text-white cursor-pointer"
                      onClick={toggleUploadPopup}
                    />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-xs md:text-sm font-normal text-gilroy-medium text-gray-900">
                      Office Order / Any other supporting document for
                      appointment of Nodal Officer
                      <span className="text-red-500">*</span>
                    </h1>
                    <p className="text-xs md:text-base font-normal text-gilroy-medium text-gray-400">
                      {file ? file.name : "No Document uploaded"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row mt-1 justify-end w-full md:w-auto">
                  {file && (
                    <div className="bg-white mt-1 mr-1 flex justify-center items-center h-10 w-10 rounded">
                      <img
                        src={trashIcon}
                        alt="Delete"
                        className="rounded h-5 cursor-pointer"
                        onClick={toggleDeletePopup}
                      />
                    </div>
                  )}
                  <div className="mt-1">
                    <button
                      type="button"
                      className="bg-green-800 rounded-lg p-3 text-white flex justify-center items-center cursor-pointer mr-2 h-10"
                      onClick={toggleUploadPopup}
                    >
                      {file ? (
                        "View"
                      ) : (
                        <img src={UploadIcon} alt="Upload" className="w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
              <div className="flex flex-row items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="shrink-0"
                >
                  <path
                    d="M15 6L9 12L15 18"
                    stroke="#1D1D1B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <button className="text-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#385723]">
                  Back
                </button>
              </div>
              <div className="flex items-center">
                <button
                  type="submit"
                  className="bg-[#385723] rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs"
                >
                  Save and continue
                </button>
              </div>
            </div>
            <div>
              <div className="border-[#E6E6E6] border-[1px] lg:mt-4"></div>

              <p className="mb-[24px] text-gilroy-light text-center text-[#24222B] text-xs cursor-pointer mt-4">
                © 2024 Protean BUDs, All Rights Reserved.
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UploadDocumentsRegulator;
