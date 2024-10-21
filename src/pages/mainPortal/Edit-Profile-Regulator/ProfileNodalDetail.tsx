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

type Props = {};

const ProfileNodalDetails = (props: Props) => {
  const isDscKeyAvbl = process.env.REACT_APP_IS_DSC_KEY_AVBL;
  const Navigate = useNavigate();
  const screenWidth = useScreenWidth();
  const [loader, setLoader] = useState(false);
  const { allFormData } = useDepositTakerRegistrationStore((state) => state);
  const { onChange, handleValidationChecks, updatePanFormField } =
    useContext(FormHandlerContext);

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
  //           disabled: [
  //             "Nodal Officer FirstName",
  //             "Nodal Officer MiddleName",
  //             "Nodal Officer LastName",
  //             "Nodal Officer Mobile Number",
  //             "Nodal Officer Email",
  //             "DSC3 Certificate",
  //           ].includes(field.label),
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

  console.log(formFields, "form dataa owais");

  const onSubmit = async (event: any) => {
    event?.preventDefault();
    setLoader(true);

    const noError = await handleValidationChecks(formFields, false);

    if (noError) {
      axiosTokenInstance
        .patch(`/regulator/${sessionStorage.getItem("entityUniqueId")}`, {
          formData: formData,
        })
        .then((response) => {
          console.log(response?.data?.message, "response");
          Swal.fire({
            icon: "success",
            text:
              // response?.data?.message ||
              "Nodal details updated successfully. Please log in again when you receive a confirmation email regarding the approved changes.",
            confirmButtonText: "Ok",
          });
          sessionStorage.setItem("user_status", "PENDING");
          Navigate("/rg/profile?current=document");
          setTimeout(() => {
            sessionStorage.clear()
            Navigate("/");
          },3000)
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            text: "Failed to update Nodal Details",
            confirmButtonText: "Ok",
          });
        });
    }
    setLoader(false);
  };

  return (
    <>
      <div className="flex flex-col justify-between w-full">
        <form
          // onSubmit={handleOnSubmit}
          className="p-4 flex flex-col w-full  justify-between"
          style={{
            height: `${screenWidth > 1024 ? "calc(100vh - 190px)" : "100%"}`,
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

              <div>
                <Footer
                  onSubmit={onSubmit}
                  loader={loader}
                  hidecontiuebtn={true}
                />
              </div>
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

export default ProfileNodalDetails;
