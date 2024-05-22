import React, { useState, useContext } from "react";
import folderOpen from "../../assets/images/new_images/FolderOpen.png";
import trashIcon from "../../assets/images/trash.svg";

import { useScreenWidth } from "../../utils/screenSize";
import DeleteUpload from "./DeleteUpload";
import UploadFile from "./UploadFile";
import UploadIcon from "../../assets/images/UploadIcon.png";
import { useDepositTakerRegistrationStore } from "../../zust/deposit-taker-registration/registrationStore";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FormHandlerContext } from "../../contextAPI/useFormFieldHandlers";

type Props = {};

const UploadDocumentsRegulator = (props: Props) => {
  const { documentData, allFormData} = useDepositTakerRegistrationStore(
    (state) => state
  );
  const [params, setParams] = useSearchParams();
  const { onFileChange, handleDocumentValidations } = useContext(FormHandlerContext);
  const screenWidth = useScreenWidth();
  const Navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [fieldData, setFieldData] = useState<any>(null);
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   const fieldType = allFormData?.fileTypes?.find((type: any) => type?.id === fieldData?.fileType)?.name;
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      onFileChange(event.target.files[0], fieldData, fieldType);
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
    const fieldType = allFormData?.fileTypes?.find((type: any) => type?.id === fieldData?.fileType)?.name;
    onFileChange("", fieldData, fieldType);
    setFile(null);
    toggleDeletePopup();
  };

  const submit = async (e : any) => {
    e.preventDefault();
    const goodToGo = await handleDocumentValidations(documentData[0]?.sectionId);
    if (goodToGo) {
      const edit = params.get('edit');
      if (edit !== undefined && edit !== null && edit !== "") {
        Navigate('/regulator/court/reviewdetails');
      }
      else{
        Navigate('/regulator/court/nodaldetails')
      }
    }  
}    
  
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
              <h1 className="text-2xl font-bold mb-6">Upload Documents</h1>
              {documentData && documentData?.map(
                (data: any, idx: number) => {
                  return (
                    <div key={idx}>
                      <div className="rounded-xl bg-[#E7F0FF] flex flex-col md:flex-row justify-between items-center p-4  text-gilroy-bold mb-4">
                        <div className="flex flex-row items-center space-x-2 w-full">
                          <div className="mt-2">
                            <img
                              src={folderOpen}
                              alt="Folder Open Icon"
                              className="bg-[#ffffff] rounded p-1 text-white cursor-pointer"
                              onClick={() =>{toggleUploadPopup(); setFieldData(data)}}
                            />
                          </div>
                          <div className="flex flex-col">
                            <h1 className="text-xs md:text-sm font-normal text-gilroy-medium text-gray-900">
                              {data?.documentName}
                              {data?.required && <span className="text-red-500">*</span>}
                            </h1>
                            <p className="text-xs md:text-base font-normal text-gilroy-medium text-gray-400">
                              {data?.fileName !== "" && data?.fileName !== undefined ? data?.fileName : "No Document uploaded"}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-row mt-1 justify-end w-full md:w-auto">
                          {data?.file && (
                            <div className="bg-white mt-1 mr-1 flex justify-center items-center h-10 w-10 rounded">
                              <img
                                src={trashIcon}
                                alt="Delete"
                                className="rounded h-5 cursor-pointer"
                                onClick={() => { toggleDeletePopup(); setFieldData(data)}}
                              />
                            </div>
                          )}
                          <div className="mt-1">
                            <button
                              type="button"
                              className="bg-[#1C468E] rounded-lg p-3 text-white flex justify-center items-center cursor-pointer mr-2 h-10"
                              onClick={() =>{toggleUploadPopup(); setFieldData(data)}}
                            >
                              {data?.file ? (
                                "View"
                              ) : (
                                <img
                                  src={UploadIcon}
                                  alt="Upload"
                                  className="w-5"
                                />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    <span className="text-red-500">{data?.error}</span>
                    </div>
                  );
                }
              )}

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
                <button 
                className="text-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#385723]"
                onClick={() => Navigate('/regulator/court/regulatordetails')}
                >
                  Back
                </button>
              </div>
              <div className="flex items-center">
                <button
                  type="submit"
                  onClick={submit}
                  className="bg-[#1c468e] rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs"
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
