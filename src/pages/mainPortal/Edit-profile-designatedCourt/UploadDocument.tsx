import React, { useContext, useState } from "react";
import { useScreenWidth } from "../../../utils/screenSize";
import { useDepositTakerRegistrationStore } from "../../../zust/deposit-taker-registration/registrationStore";
import { FormHandlerContext } from "../../../contextAPI/useFormFieldHandlers";
import LoaderSpin from "../../../components/LoaderSpin";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import UploadFile from "../../designatedCourt/UploadFile";
import DeleteUpload from "../../designatedCourt/DeleteUpload";
import DynamicFields from "../../../components/userFlow/depositeTaker/DynamicFields";
import { axiosTokenInstance } from "../../../utils/axios";

type Props = {};

const UploadDocument = (props: Props) => {
  const Navigate = useNavigate();
  const screenWidth = useScreenWidth();
  const [loader, setLoader] = useState<boolean>(false);
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fieldData, setFieldData] = useState<any>(null);
  const { allFormData, documentData } = useDepositTakerRegistrationStore(
    (state) => state
  );

  const sectionId = allFormData?.entitySections?.find(
    (s: any) => s?.sectionName === "Upload Documents"
  )?.id;

  const { onFileChange, handleDocumentValidations } =
    useContext(FormHandlerContext);

  // const handleFileChange = (file: File | null, field: any) => {
  //   setFileLoader(field?.id);
  //   const entityUniqueId = sessionStorage.getItem("entityUniqueId");
  //   const fieldType = allFormData?.fileTypes?.find(
  //     (type: any) => type?.id === field?.fileType
  //   )?.name;
  //   onFileChange(file, field, fieldType, entityUniqueId ?? "");
  //   setFileLoader(0);
  // };

  // const deleteFile = (field: any) => {
  //   const fieldType = allFormData?.fileTypes?.find(
  //     (type: any) => type?.id === field?.fileType
  //   )?.name;
  //   onFileChange("", field, fieldType);
  // };

  const onSubmit = async (e: any) => {
    setLoader(true);
    e.preventDefault();
    const goodToGo = await handleDocumentValidations(
      documentData.map((d: { sectionId: number }) => d?.sectionId)
    );
    if (!goodToGo) {
      setLoader(false);
      return;
    }

    const formData =
      documentData &&
      documentData?.map((field: any) => ({
        fieldId: field.id,
        sectionCode: "Upload Documents",
        label: field.documentName,
        value: field.uploadFileId,
      }));

    axiosTokenInstance
      .patch(
        `/competent-authority/${sessionStorage?.getItem("entityUniqueId")}`,
        {
          formData: formData,
        }
      )
      .then((response) => {
        Swal.fire({
          icon: "success",
          text: 
          // response?.data?.message || 
          "Documents uploaded successfully. Please log in again when you receive a confirmation email regarding the approved changes.",
          confirmButtonText: "Ok",
        });
        setLoader(false);
        sessionStorage.setItem("user_status", "PENDING");
        Navigate("/dt/profile?current=branches");
        setTimeout(() => {
          sessionStorage.clear()
          Navigate("/");
        },3000)
      })
      .catch((err) => {
        setLoader(false);
        Swal.fire({
          icon: "error",
          text: err?.response?.data?.detail?.message || err?.response?.data?.message[0],
          confirmButtonText: "Ok",
        });
      });
    setLoader(false);
  };

  // ---------------------------------------------------------------------------------------

  const closePopup = () => {
    setShowUploadPopup(false);
  };

  const toggleDeletePopup = () => {
    setShowDeletePopup(!showDeletePopup);
  };

  const toggleUploadPopup = () => {
    setShowUploadPopup(true);
  };

  const handleDeleteFile = () => {
    const fieldType = allFormData?.fileTypes?.find(
      (type: any) => type?.id === fieldData?.fileType
    )?.name;
    onFileChange("", fieldData, fieldType);
    setFile(null);
    toggleDeletePopup();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fieldType = allFormData?.fileTypes?.find(
      (type: any) => type?.id === fieldData?.fileType
    )?.name;
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      onFileChange(event.target.files[0], fieldData, fieldType);
      toggleUploadPopup();
      closePopup();
    }
  };

  const disabledField = sessionStorage.getItem("user_status");

  const checkStatus = (status: any): any => {
    switch (disabledField) {
      case "TRANSIT":
        return true;
      case "MOD_REFER_TO_REGULATOR":
        return true;
      case "REFER_TO_REGULATOR":
        return true;
      case "MOD_TRANSIT":
        return true;
      case "PENDING":
        return true;
      case "MOD_PENDING":
        return true;
      default:
        return false;
    }
  };

  const isConfigurable = sessionStorage.getItem("isConfigurable")

  const disableFieldStatus = isConfigurable === 'true' ? true : checkStatus(disabledField);

  return (
    <>
      <div
        className="bg-white w-full flex flex-col justify-between"
        style={{
          height: `${screenWidth > 1024 ? "calc(100vh - 190px)" : "100%"}`,
        }}
      >
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
        {documentData.length > 0 ? (
          <>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-5 space-y-0">
              <h1 className="text-xl text-gilroy-bold">Upload Documents</h1>
              <DynamicFields
                allFormData={allFormData}
                documentFields={documentData}
                toggleUploadPopup={toggleUploadPopup}
                setFieldData={setFieldData}
                sectionId={sectionId}
                onFileChange={onFileChange}
              />
            </div>
            <div className="p-4">
              <div>
                {" "}
                <div className="flex flex-col sm:flex-row justify-end sm:justify-end items-center space-y-4 sm:space-y-0 pt-4 pb-4">
                  <div className="flex items-center">
                    {!disableFieldStatus && (
                      <button
                        disabled={loader}
                        onClick={onSubmit}
                        type="submit"
                        className={`${
                          loader ? "bg-gray-500" : "bg-[#1C468E]"
                        } rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs`}
                      >
                        {loader ? <LoaderSpin /> : " Save and Submit"}
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <div className="border-[#E6E6E6] border-[1px] w-full"></div>
                  <div className="text-gilroy-light text-[#24222B] text-xs cursor-pointer h-16 flex items justify-center items-center">
                    <div className="text-center mt-auto">
                      <h1 className="text-[#24222B] text-xs text-wrap text-gilroy-light mt-3 font-normal">
                        COPYRIGHT © 2024 CERSAI. ALL RIGHTS RESERVED.
                      </h1>
                      <p className="text-[#24222B] text-xs text-wrap text-gilroy-light font-normal">
                        Powered and managed by{" "}
                        <a
                          href="https://www.proteantech.in/"
                          className="underline text-gilroy-regular font-bold"
                          target="_blank"
                        >
                          Protean eGov Technologies
                        </a>{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <LoaderSpin />
          </div>
        )}
      </div>
    </>
  );
};

export default UploadDocument;
