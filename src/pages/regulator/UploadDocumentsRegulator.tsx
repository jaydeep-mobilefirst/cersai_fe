import React, { useState } from "react";
import folderOpen from "../../assets/images/folder-open.svg";
import directboxsend from "../../assets/images/directboxSend.svg";
import trashIcon from "../../assets/images/trash.svg";
import add from "../../assets/images/add.svg";
import { useScreenWidth } from "../../utils/screenSize";

type Props = {};

const UploadDocumentsRegulator = (props: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const screenWidth = useScreenWidth();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      toggleUploadPopup();
    }
  };

  const toggleUploadPopup = () => {
    setShowUploadPopup(!showUploadPopup);
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
      <div className="border-[#E6E6E6] border-[1px] -mt-[3px]"></div>
      <form className="p-4 flex flex-col w-full max-w-[100%] justify-between">
        {showUploadPopup && (
          <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div
              className="bg-white rounded-lg p-8 w-[500px] relative"
              style={{ margin: "auto" }}
            >
              <h2 className="text-2xl mb-4 absolute top-1 left-2">
                Upload Documents
              </h2>
              <div className="text-right">
                <img
                  src={add}
                  onClick={toggleUploadPopup}
                  className=" absolute top-1 right-2"
                  alt="cross"
                />
              </div>
              <div className="bg-[#52AE3226] rounded-lg text-center p-4 mt-10 mb-10">
                <img
                  src={directboxsend}
                  alt="Sendbox"
                  className="w-12 h-12 mx-auto mb-4"
                />
                <p className="text-gray-700 mb-2 text-sm">
                  Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word,
                  PPT
                </p>
                <p className="text-gray-700 mb-4 text-sm">
                  File size: Less than 500kb
                </p>
              </div>
              <div className="text-center">
                <label
                  htmlFor="file-upload"
                  className="bg-[#385723] rounded-xl p-3 text-white font-semibold text-sm cursor-pointer"
                >
                  Browse Files
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.jpg,.png,.svg"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </div>
        )}
        {showDeletePopup && (
          <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div
              className="bg-white rounded-lg p-8 w-[500px] relative"
              style={{ margin: "auto" }}
            >
              <div className="text-right">
                <img
                  src={add}
                  onClick={toggleDeletePopup}
                  className="absolute top-1 right-2"
                  alt="cross"
                />
              </div>
              <div className="text-center mb-4">
                <img
                  src={trashIcon}
                  alt="Delete"
                  className="w-12 h-12 mx-auto mb-2"
                />
                <p className="text-gray-700 mb-2 text-lg">
                  Are You Sure To Delete
                </p>
                <p className="text-green-700 mb-4 text-lg">
                  {file ? file.name : "No Document uploaded"} ?
                </p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-center">
                <button
                  onClick={toggleDeletePopup}
                  className="bg-transparent border-green-700 border rounded-xl px-10 py-3 text-[#385723] font-semibold text-sm mr-4"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteFile}
                  className="bg-green-900 rounded-xl px-10 py-3 text-white font-semibold text-sm"
                >
                  Okay
                </button>
              </div>
            </div>
          </div>
        )}
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
                  className="bg-[#52AE3226] rounded p-1 text-white cursor-pointer"
                  onClick={toggleUploadPopup}
                />
              </div>
              <div>
                <h1 className="text-sm font-normal text-gilroy-medium text-[#1D1D1B]">
                  Office Order / Any other supporting document for appointment
                  of Nodal Officer<span className="text-red-500">*</span>
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
                  className="bg-[#385723] rounded p-3 text-white flex justify-center items-center cursor-pointer mr-2 h-10"
                  onClick={toggleUploadPopup}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center lg:mt-80 md:72">
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <button className="text-black transition duration-300">
                Back
              </button>
            </div>
            <button
              type={"submit"}
              className="bg-[#385723] rounded-xl p-3 text-white font-semibold text-sm  w-[224px]"
            >
              Save & Continue
            </button>
          </div>
          <div className="border-[#E6E6E6] border-[1px] mt-2"></div>
          <p className="text-gilroy-light text-center text-[#24222B] text-xs cursor-pointer mt-4">
            © 2024 Protean BUDs, All Rights Reserved.
          </p>
        </div>
      </form>
    </>
  );
};

export default UploadDocumentsRegulator;
