import React, { useContext, useState } from "react";
import ProfileUploadDocument from "../../../components/userFlow/form/ProfileUploadDocument";
import Footer from "../../../components/userFlow/userProfile/Footer";
import { useScreenWidth } from "../../../utils/screenSize";
import { useDepositTakerRegistrationStore } from "../../../zust/deposit-taker-registration/registrationStore";
import { FormHandlerContext } from "../../../contextAPI/useFormFieldHandlers";
import LoaderSpin from "../../../components/LoaderSpin";
import axios from "axios";
import { bffUrl } from "../../../utils/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

type Props = {};

const ProfileUploadDocuments = (props: Props) => {
  const Navigate = useNavigate();
  const screenWidth = useScreenWidth();
  const [loader, setLoader] = useState<boolean>(false);
  const [fileLoader, setFileLoader] = useState<number>(0);
  const { allFormData, documentData } = useDepositTakerRegistrationStore(
    (state) => state
  );
  const { onFileChange, handleDocumentValidations } =
    useContext(FormHandlerContext);

  const handleFileChange = (file: File | null, field: any) => {
    setFileLoader(field?.id);
    const entityUniqueId = sessionStorage.getItem("entityUniqueId");
    const fieldType = allFormData?.fileTypes?.find(
      (type: any) => type?.id === field?.fileType
    )?.name;
    onFileChange(file, field, fieldType, entityUniqueId ?? "");
    setFileLoader(0);
  };

  const deleteFile = (field: any) => {
    const fieldType = allFormData?.fileTypes?.find(
      (type: any) => type?.id === field?.fileType
    )?.name;
    onFileChange("", field, fieldType);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const goodToGo = await handleDocumentValidations(
      documentData.map((d: { sectionId: number }) => d?.sectionId)
    );
    if (!goodToGo) {
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

    setLoader(true);
    axios
      .patch(
        `${bffUrl}/regulator/${sessionStorage?.getItem("entityUniqueId")}`,
        {
          formData: formData,
        }
      )
      .then((response) => {
        // console.log(response, "response");
        Swal.fire({
          icon: "success",
          text: "Documents uploaded successfully",
          confirmButtonText: "Ok",
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          text: err?.response?.data?.detail?.message,
          confirmButtonText: "Ok",
        });
      });
    setLoader(false);
  };

  console.log({ documentData });

  return (
    <>
      <div
        className="bg-white w-full flex flex-col justify-between"
        style={{
          height: `${screenWidth > 1024 ? "calc(100vh - 155px)" : "100%"}`,
        }}
      >
        <div className="p-6 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-5 space-y-0">
          {documentData &&
            documentData?.map((item: any) => {
              return (
                <>
                  <div key={item.id}>
                    <ProfileUploadDocument
                      required={item?.required}
                      documentName={item.documentName}
                      id="Dsc"
                      type="button"
                      deleteFile={() => deleteFile(item)}
                      onFileUpload={(file) => handleFileChange(file, item)}
                      fileSelected={item?.fileName !== ""}
                      fileName={item?.fileName}
                    />
                  </div>
                  <span className="text-red-500">{item?.error}</span>
                </>
              );
            })}
        </div>
        <div className="p-4">
          <div>
            {" "}
            <div className="flex flex-col sm:flex-row justify-end sm:justify-end items-center space-y-4 sm:space-y-0 pt-4 pb-4">
              <div className="flex items-center">
                <button
                  disabled={loader}
                  onClick={onSubmit}
                  type="submit"
                  className={`${
                    loader ? "bg-gray-500" : "bg-[#1C468E]"
                  } rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs`}
                >
                  {loader ? <LoaderSpin /> : " Save and Continue"}
                </button>
              </div>
            </div>
            <div>
              <div className="border-[#E6E6E6] border-[1px] w-full"></div>
              <div className="text-gilroy-light text-[#24222B] text-xs cursor-pointer h-16 flex items justify-center items-center">
                <div>© 2024 Protean BUDs, All Rights Reserved.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileUploadDocuments;
