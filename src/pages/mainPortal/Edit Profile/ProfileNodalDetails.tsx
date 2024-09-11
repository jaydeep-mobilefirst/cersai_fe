import React, { useContext, useState } from "react";
import NodalDetailsSchema from "../../../formValidationSchema/deposit_taker/NodalDetails.schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputFields from "../../../components/userFlow/form/InputField";
import UploadButton from "../../../components/userFlow/form/UploadButton";
import { useScreenWidth } from "../../../utils/screenSize";
import Footer from "../../../components/userFlow/userProfile/Footer";
import { useDepositTakerRegistrationStore } from "../../../zust/deposit-taker-registration/registrationStore";
import { FormHandlerContext } from "../../../contextAPI/useFormFieldHandlers";
import DynamicFields from "../../../components/userFlow/depositeTaker/DynamicFields";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { axiosTokenInstance } from "../../../utils/axios";
import LoaderSpin from "../../../components/LoaderSpin";
import useProfileNodalStore from "../../../zust/useProfileNodalStore";
import FooterDT from "./FooterDT";
import { useBranchStore as useManagementStore } from "../../../store/upate-profile/managementStore";

type Props = {};

const ProfileNodalDetails = (props: Props) => {
  const isDscKeyAvbl = process.env.REACT_APP_IS_DSC_KEY_AVBL;

  const Navigate = useNavigate();
  const screenWidth = useScreenWidth();
  const status = sessionStorage.getItem("user_status");
  const [loader, setLoader] = useState(false);
  const [loader1, setLoader1] = useState(false);
  const { allFormData, documentData } = useDepositTakerRegistrationStore(
    (state) => state
  );
  const { onChange, handleValidationChecks, updatePanFormField } =
    useContext(FormHandlerContext);
  const navigate = useNavigate();
  const setFormData = useProfileNodalStore((state) => state.setFormData);
  const {
    removedBranches: removedBranchesData,
    clearRemovedBranches,
    branches: managementData,
  } = useManagementStore((state) => ({
    removedBranches: state.removedBranches,
    clearRemovedBranches: state.clearRemovedBranches,
    branches: state.branches,
  }));

  const sectionId = allFormData?.entitySections?.find(
    (s: any) => s?.sectionName === "Nodal Details"
  );
  // const formFields = Array.isArray(allFormData?.formFields?.form_fields)
  //   ? allFormData?.formFields?.form_fields?.filter(
  //       (f: any) => f?.sectionId === sectionId?.id
  //     )
  //   : [];
  // const formFields = Array.isArray(allFormData?.formFields?.form_fields)
  //   ? allFormData?.formFields?.form_fields
  //       .filter((field: any) => {
  //         // Filtering fields based on sectionId
  //         return field?.sectionId === sectionId?.id;
  //       })
  //       .map((field: any) => {
  //         // Adding a 'disabled' property based on specific field labels
  //         return {
  //           ...field,
  //           disabled: ["nodalMobile", "nodalEmail"].includes(field.key),
  //         };
  //       })
  //   : [];
  const formFields = Array.isArray(allFormData?.formFields?.form_fields)
    ? allFormData?.formFields?.form_fields
        .filter((field: any) => {
          // Filtering fields based on sectionId
          return field?.sectionId === sectionId?.id;
        })
        .map((field: any) => {
          // Adding a 'disabled' property based on specific field labels
          const isDisabled =
            field.required === true
              ? status === "RETURNED"
                ? ["companyName", "panNumber"].includes(field.key)
                  ? true
                  : false
                : true
              : ["nodalMobile", "nodalEmail"].includes(field.key)
              ? true
              : false;
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

  // const onSubmit = async (event: any) => {
  //   event?.preventDefault();
  //   setLoader(true);
  //   const noError = await handleValidationChecks(formFields, false);

  //   if (noError) {
  //     axiosTokenInstance
  //       .patch(`/deposit-taker/${sessionStorage.getItem("entityUniqueId")}`, {
  //         formData: formData,
  //       })
  //       .then((response) => {
  //         Swal.fire({
  //           icon: "success",
  //           text: "Nodal Officer details updated successfully",
  //           confirmButtonText: "Ok",
  //         });
  //         Navigate("/dt/profile?current=regulator");
  //       })
  //       .catch((err) => {
  //         Swal.fire({
  //           icon: "error",
  //           text: "Failed to update Nodal Details",
  //           confirmButtonText: "Ok",
  //         });
  //       });
  //   }
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
      text: "Do you want to update the Nodal Officer details?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoader(true);
        const noError = await handleValidationChecks(formFields, false);

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
            axiosTokenInstance
              .patch(
                `/deposit-taker/${sessionStorage.getItem("entityUniqueId")}`,
                {
                  formData: formData,
                }
              )
              .then((response) => {
                Swal.fire({
                  icon: "success",
                  text: "Nodal Officer details updated successfully",
                  confirmButtonText: "Ok",
                });

                sessionStorage.setItem("user_status", "PENDING");
                Navigate("/dt/profile?current=regulator");
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

            await axiosTokenInstance
              .patch(
                `/deposit-taker/${sessionStorage?.getItem("entityUniqueId")}`,
                { formData: combinedFormData }
              )

              .catch((err) => {
                Swal.fire({
                  icon: "error",
                  text: "Failed to update Nodal Details",
                  confirmButtonText: "Ok",
                });
              })
              .finally(() => {
                setLoader(false);
              });
          } catch (error) {
            Swal.fire({
              icon: "error",
              text: "Failed to update Nodal Details",
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
    const noError = await handleValidationChecks(formFields, false);
    if (noError) {
      setFormData(formData);
      navigate("/dt/profile?current=regulator");
    }

    setLoader1(false);
  };

  return (
    <>
      <div className="flex flex-col justify-between w-full">
        <form
          // onSubmit={handleOnSubmit}
          className="p-4 flex flex-col w-full  justify-between"
          style={{
            height: `${screenWidth > 1024 ? "calc(100vh - 155px)" : "100%"}`,
          }}
        >
          {/* <div className="bg-white p-6 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <label
                  htmlFor="nodalOfficerName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Nodal Officer Name<span className="text-red-500">*</span>
                </label>
                <InputFields
                  bgColor="bg-gray-200"
                  value={"Rohan Gaikwad"}
                  type="text"
                  id="nodalOfficerName"
                  placeholder="Type here"
                  {...register("nodalOfficerName")}
                  //   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <span className="text-red-500">
                  {errors.nodalOfficerName?.message}
                </span>
              </div>
              <div>
                <label
                  htmlFor="nodalOfficerEmail"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Nodal Officer Email <span className="text-red-500">*</span>
                </label>
                <InputFields
                  bgColor="bg-gray-200"
                  value={"Rohan Gaikwad"}
                  type="email"
                  id="nodalOfficerEmail"
                  placeholder="Type here"
                  {...register("nodalOfficerEmail")}
                  //   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <span className="text-red-500">
                  {errors.nodalOfficerEmail?.message}
                </span>
              </div>
              <div>
                <label
                  htmlFor="nodalMobileNumber"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Nodal Officer Mobile Number
                  <span className="text-red-500">*</span>
                </label>
                <InputFields
                  bgColor="bg-gray-200"
                  value={"Rohan Gaikwad"}
                  type="text"
                  id="nodalMobileNumber"
                  {...register("nodalOfficerMobileNumber")}
                  //   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <span className="text-red-500">
                  {errors.nodalOfficerMobileNumber?.message}
                </span>
              </div>
              <div>
                <label
                  htmlFor="nodalOfficerDesgnation"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Nodal Officer Designation
                  <span className="text-red-500">*</span>
                </label>
                <InputFields
                  bgColor="bg-gray-200"
                  value={"Rohan Gaikwad"}
                  type="text"
                  id="nodalOfficerDesgnation"
                  placeholder="Type here"
                  {...register("nodalOfficerDesignation")}
                  //   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <span className="text-red-500">
                  {errors.nodalOfficerDesignation?.message}
                </span>
              </div>
              <div>
                <label
                  htmlFor="Dsc"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  DSC
                </label>
                <UploadButton id="Dsc" type="button" disabled />
              </div>
            </div>
          </div> */}

          {formFields.length > 0 ? (
            <>
              <DynamicFields
                allFormData={allFormData}
                formFields={formFields}
                onChange={onChange}
                disable={true}
              />

              {/* <div>
                <Footer
                  onSubmit={onSubmit}
                  loader={loader}
                  loader1={loader1}
                  onClick={onClick}
                  showbackbtn={true}
                  path={"/dt/profile?current=entity"}
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
                    path={"/dt/profile?current=entity"}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="flex justify-center items-center mt-5">
              <LoaderSpin />
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default ProfileNodalDetails;
