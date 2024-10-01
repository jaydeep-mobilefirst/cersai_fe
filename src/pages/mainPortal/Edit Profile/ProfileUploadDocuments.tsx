import React, { useContext, useState } from "react";
import ProfileUploadDocument from "../../../components/userFlow/form/ProfileUploadDocument";
import { useScreenWidth } from "../../../utils/screenSize";
import { useDepositTakerRegistrationStore } from "../../../zust/deposit-taker-registration/registrationStore";
import { FormHandlerContext } from "../../../contextAPI/useFormFieldHandlers";
import LoaderSpin from "../../../components/LoaderSpin";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import UploadFile from "../../designatedCourt/UploadFile";
import DeleteUpload from "../../designatedCourt/DeleteUpload";
import DynamicFields from "../../../components/userFlow/depositeTaker/DynamicFields";
import { axiosTokenInstance } from "../../../utils/axios";
import Footer from "../../../components/userFlow/userProfile/Footer";
import userProfileUploadStore from "../../../zust/userProfileUploadStore";
import FooterDT from "./FooterDT";
import useStore from "../../../store/statusStore";
import { useBranchStore as useManagementStore } from "../../../store/upate-profile/managementStore";
import FooterText from "../../../components/userFlow/common/FooterText";

type Props = {};

const ProfileUploadDocuments = (props: Props) => {
  const Navigate = useNavigate();
  const location = useLocation();
  const screenWidth = useScreenWidth();
  const [loader, setLoader] = useState<boolean>(false);
  const [loader1, setLoader1] = useState(false);
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fieldData, setFieldData] = useState<any>(null);
  const { allFormData, documentData } = useDepositTakerRegistrationStore(
    (state) => state
  );

  const {
    removedBranches: removedBranchesData,
    clearRemovedBranches,
    branches: managementData1,
  } = useManagementStore((state) => ({
    removedBranches: state.removedBranches,
    clearRemovedBranches: state.clearRemovedBranches,
    branches: state.branches,
  }));
  const status = sessionStorage.getItem("user_status");

  const setFormData = userProfileUploadStore((state) => state.setFormData);

  const sectionId = allFormData?.entitySections?.find(
    (s: any) => s?.sectionName === "Upload Documents"
  )?.id;

  const { onFileChange, handleDocumentValidations } =
    useContext(FormHandlerContext);
  const managementData = location.state?.managementData;

  const { pathname } = location;

  const { data, loading, error, fetchData } = useStore();

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
  const formData =
    documentData &&
    documentData?.map((field: any) => ({
      fieldId: field.id,
      sectionCode: "Upload Documents",
      label: field.documentName,
      value: field.uploadFileId,
    }));
  const formData1 = Array.isArray(allFormData?.formFields?.form_fields) // Ensure it's an array
    ? allFormData?.formFields?.form_fields.map((field: any) => ({
        fieldId: field.id,
        sectionCode: field.entityRegSection?.sectionName,
        label: field.label,
        value: field.userInput,
        key: field?.key,
      }))
    : []; // Fallback to an empty array if not iterable

  const formDataDocument1 = Array.isArray(documentData) // Ensure documentData is an array
    ? documentData.map((field: any) => ({
        fieldId: field.id,
        sectionCode: "Upload Documents",
        label: field.documentName,
        value: field.uploadFileId,
      }))
    : []; // Fallback to an empty array if not iterable

  // Combine both arrays safely
  const combinedFormData = [...formData1, ...formDataDocument1];
  const onSubmit = async (e: any) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Updated the Documents?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, upload!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoader(true);
        const goodToGo = await handleDocumentValidations(
          documentData.map((d: { sectionId: number }) => d?.sectionId)
        );
        if (!goodToGo) {
          setLoader(false);
          return;
        }
        const hasOnlyId = managementData1?.some(
          (member: any) => member.id && Object.keys(member).length === 1
        );

        // If any member contains only id, set membersToSubmit to null; otherwise, map the data
        const membersToSubmit = hasOnlyId
          ? null
          : managementData1?.map((member: any) => {
              const { id, ...memberData } = member;
              return member.id ? { id, ...memberData } : memberData;
            });
        if (membersToSubmit !== null) {
          await axiosTokenInstance.post(
            `/deposit-taker/management-team/${sessionStorage?.getItem(
              "entityUniqueId"
            )}`,
            {
              members: membersToSubmit, // Changed from branches to members
            }
          );
        }
        // await axiosTokenInstance.patch(
        //   `/deposit-taker/${sessionStorage?.getItem("entityUniqueId")}`,
        //   { formData: combinedFormData }
        // );

        await axiosTokenInstance
          .patch(
            `/deposit-taker/${sessionStorage?.getItem("entityUniqueId")}`,
            {
              formData: combinedFormData,
            }
          )
          .then((response) => {
            Swal.fire({
              icon: "success",
              text:
                response?.data?.message || "Documents uploaded successfully",
              confirmButtonText: "Ok",
            });
            setLoader(false);
            sessionStorage.setItem("user_status", "PENDING");
            Navigate("/dt/profile?current=branches");
          })
          .catch((err) => {
            setLoader(false);
            Swal.fire({
              icon: "error",
              text:
                err?.response?.data?.detail?.message ||
                "Failed to upload documents",
              confirmButtonText: "Ok",
            });
          });
        setLoader(false);
      }
    });
  };

  // const onSubmit = async (e: any) => {
  //   e.preventDefault();
  //   setLoader(true);
  //   const goodToGo = await handleDocumentValidations(
  //     documentData.map((d: { sectionId: number }) => d?.sectionId)
  //   );
  //   if (!goodToGo) {
  //     setLoader(false);
  //     return;
  //   }

  //   axiosTokenInstance
  //     .patch(`/deposit-taker/${sessionStorage?.getItem("entityUniqueId")}`, {
  //       formData: formData,
  //     })
  //     .then((response) => {
  //       Swal.fire({
  //         icon: "success",
  //         text: response?.data?.message || "Documents uploaded successfully",
  //         confirmButtonText: "Ok",
  //       });
  //       setLoader(false);
  //       Navigate("/dt/profile?current=branches");
  //     })
  //     .catch((err) => {
  //       setLoader(false);
  //       Swal.fire({
  //         icon: "error",
  //         text: err?.response?.data?.detail?.message,
  //         confirmButtonText: "Ok",
  //       });
  //     });
  //   setLoader(false);
  // };

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

  const checkPathName = (status: any): any => {
    switch (pathname) {
      case "/dt/profile":
        return true;
      case "/rg/profile":
        return true;
      case "/dc/profile":
        return true;
      case "/ca/profile":
        return true;
      default:
        return false;
    }
  };

  if (pathname == "/dt/profile") {
    var disableFieldStatus = checkPathName(pathname)
      ? disabledField == "RETURNED"
        ? false
        : !data?.profileUpdate
      : !data?.profileUpdate;
  } else {
    disableFieldStatus = checkPathName(pathname)
      ? checkStatus(disabledField)
      : false;
  }

  const onClick = async (event: any) => {
    setLoader1(true);
    const goodToGo = await handleDocumentValidations(
      documentData.map((d: { sectionId: number }) => d?.sectionId)
    );
    if (goodToGo) {
      setFormData(formData);
      Navigate("/dt/profile?current=branches", {
        state: {
          callSaveandcontinue: true,
          managementData: managementData,
        },
      });
    }
    setLoader1(false);
  };
  const backNavigation = async (event: any) => {
    const goodToGo = await handleDocumentValidations(
      documentData.map((d: { sectionId: number }) => d?.sectionId)
    );
    if (goodToGo) {
      Navigate("/dt/profile?current=management");
    }
  };

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
                {disableFieldStatus ? (
                  <></>
                ) : (
                  <>
                    {/* <div className="flex flex-col sm:flex-row justify-end sm:justify-end items-center space-y-4 sm:space-y-0 pt-4 pb-4">
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
                    </div> */}
                    {status === "INCOMPLETE" ? (
                      <div>
                        <FooterDT
                          onSubmit={onClick}
                          loader={loader}
                          showbackbtn={true}
                          path={"/dt/profile?current=management"}
                          backNavigation={backNavigation}
                        />
                      </div>
                    ) : (
                      <div>
                        <Footer
                          onSubmit={onSubmit}
                          loader={loader}
                          onClick={onClick}
                          loader1={loader1}
                          showbackbtn={true}
                          path={"/dt/profile?current=management"}
                          backNavigation={backNavigation}
                        />
                      </div>
                    )}
                  </>
                )}
                {/* <div>
                  <div className="border-[#E6E6E6] border-[1px] w-full"></div>
                  <div className="text-gilroy-light text-[#24222B] text-xs cursor-pointer h-16 flex items justify-center items-center">
                    <div>© 2024 Protean BUDs, All Rights Reserved.</div>
                  </div>
                </div> */}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center items-center">
              <LoaderSpin />
            </div>
          </>
        )}
      </div>
      <div></div>
    </>
  );
};

export default ProfileUploadDocuments;
