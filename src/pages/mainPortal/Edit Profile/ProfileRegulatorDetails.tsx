import React, { useContext, useEffect, useState } from "react";
import InputFields from "../../../components/userFlow/form/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import RegulatorsDetailsSchema from "../../../formValidationSchema/deposit_taker/RegulatorsDetails.schema";
import DatePicker from "../../../components/userFlow/form/DatePicker";
import { useScreenWidth } from "../../../utils/screenSize";
import Footer from "../../../components/userFlow/userProfile/Footer";
import DynamicFields from "../../../components/userFlow/depositeTaker/DynamicFields";
import { useDepositTakerRegistrationStore } from "../../../zust/deposit-taker-registration/registrationStore";
import { FormHandlerContext } from "../../../contextAPI/useFormFieldHandlers";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { axiosTokenInstance } from "../../../utils/axios";
import LoaderSpin from "../../../components/LoaderSpin";
import useProfileRegulatorStore from "../../../zust/useProfileRegulatorStore";
import { stat } from "fs";
import FooterDT from "./FooterDT";
import { useBranchStore as useManagementStore } from "../../../store/upate-profile/managementStore";

type Props = {};

const ProfileRegulatorDetails = (props: Props) => {
  const [loader, setLoader] = useState(false);
  const [loader1, setLoader1] = useState(false);
  const Navigate = useNavigate();

  const setFormData = useProfileRegulatorStore((state) => state.setFormData);
  const status = sessionStorage.getItem("user_status");

  const screenWidth = useScreenWidth();
  const { allFormData, documentData } = useDepositTakerRegistrationStore(
    (state) => state
  );
  const {
    removedBranches: removedBranchesData,
    clearRemovedBranches,
    branches: managementData,
  } = useManagementStore((state) => ({
    removedBranches: state.removedBranches,
    clearRemovedBranches: state.clearRemovedBranches,
    branches: state.branches,
  }));
  const { onChange, handleValidationChecks } = useContext(FormHandlerContext);

  const sectionId = allFormData?.entitySections?.find(
    (s: any) => s?.sectionName === "Regulators Details"
  );

  // const formFields = Array.isArray(allFormData?.formFields?.form_fields)
  //   ? allFormData?.formFields?.form_fields?.filter(
  //       (f: any) => f?.sectionId === sectionId?.id
  //     )
  //   : [];
  const formFields = Array.isArray(allFormData?.formFields?.form_fields)
    ? allFormData?.formFields?.form_fields
        .filter((f: any) => f?.sectionId === sectionId?.id)
        .map((field: any) => {
          // Setting the 'disabled' property based on the 'canEditable' property
          const isDisabled = field.required === true ? true : false;

          return {
            ...field,
            disabled: isDisabled,
          };
        })
    : [];
  const formData =
    formFields &&
    formFields?.map((field: any) => ({
      fieldId: field.id,
      sectionCode: field.entityRegSection?.sectionName,
      label: field.label,
      value: field.userInput,
    }));
  console.log({ formData });

  // const onSubmit = async (event: any) => {
  //   event?.preventDefault();
  //   setLoader(true);
  //   const noError = await handleValidationChecks(formFields);
  //   if (noError) {
  //     axiosTokenInstance
  //       .patch(`/deposit-taker/${sessionStorage.getItem("entityUniqueId")}`, {
  //         formData: formData,
  //       })
  //       .then((response) => {
  //         Swal.fire({
  //           icon: "success",
  //           text:
  //             response?.data?.message ||
  //             "Regulator Details updated successfully",
  //           confirmButtonText: "Ok",
  //         });
  //         Navigate("/dt/profile?current=management");
  //       })
  //       .catch((err) => {
  //         Swal.fire({
  //           icon: "error",
  //           text: "Failed to Regulator Nodal Details",
  //           confirmButtonText: "Ok",
  //         });
  //       });
  //   }
  //   // if (noError) {
  //   //   Swal.fire({
  //   //     icon: "success",
  //   //     text: "Regulator Detail  update  successfully ",
  //   //     confirmButtonText: "Ok",
  //   //   }).then((confirm: any) => {
  //   //     Navigate("/dt/profile?current=documents");
  //   //   });
  //   // }
  //   setLoader(false);
  // };
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
  const onSubmit = async (event: any) => {
    event?.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update the Regulator Details?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoader(true);
        const noError = await handleValidationChecks(formFields);
        if (noError) {
          try {
            const hasOnlyId = managementData?.some(
              (member: any) => member.id && Object.keys(member).length === 1
            );

            // If any member contains only id, set membersToSubmit to null; otherwise, map the data
            const membersToSubmit = hasOnlyId
              ? null
              : managementData?.map((member: any) => {
                  const { id, ...memberData } = member;
                  return member.id ? { id, ...memberData } : memberData;
                });
            // axiosTokenInstance.patch(
            //   `/deposit-taker/${sessionStorage.getItem("entityUniqueId")}`,
            //   {
            //     formData: combinedFormData,
            //   }
            // );
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
            await axiosTokenInstance
              .patch(
                `/deposit-taker/${sessionStorage?.getItem("entityUniqueId")}`,
                { formData: combinedFormData }
              )

              .then((response) => {
                Swal.fire({
                  icon: "success",
                  text:
                    response?.data?.message ||
                    "Profile Details updated successfully",
                  confirmButtonText: "Ok",
                });

                sessionStorage.setItem("user_status", "PENDING");
                Navigate("/dt/profile?current=management");
              })
              .catch((err) => {
                Swal.fire({
                  icon: "error",
                  text: "Failed to update Regulator Details",
                  confirmButtonText: "Ok",
                });
              })
              .finally(() => {
                setLoader(false);
              });
          } catch (error) {
            Swal.fire({
              icon: "error",
              text: "Failed to update Regulator Details",
              confirmButtonText: "Ok",
            });
          }
        } else {
          setLoader(false);
        }
      }
    });
  };

  const onClick = async (event: any) => {
    setLoader1(true);
    event?.preventDefault();
    const noError = await handleValidationChecks(formFields);
    if (noError) {
      setFormData(formData);
      Navigate("/dt/profile?current=management");
    }

    setLoader1(false);
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <form
          // onSubmit={onSubmitClick}
          className="p-4 flex flex-col w-full max-w-[100%] justify-between h-screen"
          style={{
            height: `${screenWidth > 1024 ? "calc(100vh - 155px)" : "100%"}`,
          }}
        >
          {formFields.length > 0 ? (
            <>
              <DynamicFields
                allFormData={allFormData}
                formFields={formFields}
                onChange={onChange}
              />

              {/* <div>
                <Footer
                  onSubmit={onSubmit}
                  loader={loader}
                  loader1={loader1}
                  onClick={onClick}
                  showbackbtn={true}
                  path={"/dt/profile?current=nodal"}
                />
              </div> */}
              {status === "INCOMPLETE" ? (
                <div>
                  <FooterDT
                    onSubmit={onClick}
                    loader={loader}
                    showbackbtn={true}
                  />
                </div>
              ) : (
                <div>
                  <Footer
                    onSubmit={onSubmit}
                    loader={loader}
                    loader1={loader1}
                    onClick={onClick}
                    showbackbtn={true}
                    path={"/dt/profile?current=nodal"}
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex justify-center items-center">
                <LoaderSpin />
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default ProfileRegulatorDetails;
