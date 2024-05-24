import React, { useContext, useState } from "react";
import folderOpen from "../../assets/images/new_images/FolderOpen.png";
import directboxsend from "../../assets/images/directboxSend.svg";
import trashIcon from "../../assets/images/trash.svg";
import add from "../../assets/images/add.svg";

import { useScreenWidth } from "../../utils/screenSize";
import DeleteUpload from "./DeleteUpload";
import UploadFile from "./UploadFile";
import UploadIcon from "../../assets/images/UploadIcon.png";
import LoaderSpin from "../../components/LoaderSpin";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDepositTakerRegistrationStore } from "../../zust/deposit-taker-registration/registrationStore";
import { FormHandlerContext } from "../../contextAPI/useFormFieldHandlers";
import DynamicFields from "../../components/userFlow/depositeTaker/DynamicFields";
type Props = {};

const UploadDocumentsRegulator = (props: Props) => {
  
  const [params, setParams] = useSearchParams();
  const { documentData, allFormData} = useDepositTakerRegistrationStore(
    (state) => state
  );
  const sectionId = allFormData?.entitySections?.find(
    (s: any) => s?.sectionName === "Upload Documents"
  )?.id
  const { onFileChange, handleDocumentValidations, } = useContext(FormHandlerContext);
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
    setLoader(true)
    const goodToGo = await handleDocumentValidations(documentData[0]?.sectionId);
    if (goodToGo) {
      const edit = params.get('edit');
      if (edit !== undefined && edit !== null && edit !== "") {
    setLoader(false)
        Navigate('/designated/court/reviewdetails');
      }
      else{
    setLoader(false)
        Navigate('/designated/court/nodaldetails')
      }
    }  
    setLoader(false)

  }

  return (
    <>
      <div>
        <div className="border-[#E6E6E6] border-[1px] -mt-[6px]"></div>

        <form className="flex items-center justify-between flex-col h-full lg:h-[100vh]" onSubmit={() => Navigate('/designated/court/nodaldetails')}>
          {showUploadPopup && (
            <UploadFile
              showUploadPopup={showUploadPopup}
              closePopup={closePopup}
              file={file}
              handleFileChange={handleFileChange}
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
              <DynamicFields
              allFormData={allFormData}
              documentFields={documentData}
              toggleUploadPopup={toggleUploadPopup}
              setFieldData={setFieldData}
              sectionId={sectionId}
              onFileChange={onFileChange}
            />

              <h1 className="text-[14px] md:text-sm font-normal text-gilroy-medium text-[#666666]">
                <span className="text-red-500">*</span>Office Order / any other
                supporting document for appointment of Nodal Officer
              </h1>
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
                role="button"
                onClick={() => Navigate('/designated/court/designateddetails')}
                className="text-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#385723] text-gilroy-regular">
                  Back
                </button>
              </div>
              <div className="flex items-center">
                <button
                  type="submit"
                  onClick={submit}
                  className="bg-[#1c468e] rounded-xl p-3 text-white text-gilroy-semibold text-sm w-full sm:w-auto sm:max-w-xs"
                >
                   {loader ? <LoaderSpin /> : "Save & Continue"}
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
