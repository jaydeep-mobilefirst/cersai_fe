import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EntityDetailschema } from "../../../formValidationSchema/deposit_taker/EntityValidation.schema";
import SelectButton from "../../../components/userFlow/form/SelectButton";
import TextArea from "../../../components/userFlow/form/TextArea";
import InputFields from "../../../components/userFlow/form/InputField";
import { useScreenWidth } from "../../../utils/screenSize";
import Footer from "../../../components/userFlow/userProfile/Footer";
import DynamicFields from "../../../components/userFlow/depositeTaker/DynamicFields";
import { useDepositTakerRegistrationStore } from "../../../zust/deposit-taker-registration/registrationStore";
import { FormHandlerContext } from "../../../contextAPI/useFormFieldHandlers";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { axiosTokenInstance } from "../../../utils/axios";
import LoaderSpin from "../../../components/LoaderSpin";
import useProfileRegulatorStore from "../../../zust/useProfileRegulatorStore";
import useProfileEntityStore from "../../../zust/useProfileEntityStore";

type Props = {};

const ProfileEntityDetails = (props: Props) => {
  const Navigate = useNavigate();
  const status = sessionStorage.getItem("user_status");
  const screenWidth = useScreenWidth();
  const [loader, setLoader] = useState(false);
  const { allFormData } = useDepositTakerRegistrationStore((state) => state);
  const { onChange, handleValidationChecks, updatePanFormField } =
    useContext(FormHandlerContext);
  const navigate = useNavigate();
  const setFormData = useProfileEntityStore((state) => state.setFormData);
  const [loader1, setLoader1] = useState(false);

  const entityDetailsSectionId = allFormData?.entitySections?.find(
    (s: any) => s?.sectionName === "Entity Details"
  );
  const verificationSectionId = allFormData?.entitySections?.find(
    (s: any) => s?.sectionName === "Verification"
  );
  // const formFields = Array.isArray(allFormData?.formFields?.form_fields)
  //   ? allFormData?.formFields?.form_fields?.filter(
  //       (f: any) =>
  //         f?.sectionId === entityDetailsSectionId?.id ||
  //         f?.sectionId === verificationSectionId?.id
  //     )
  //   : [];
  // const formFields = Array.isArray(allFormData?.formFields?.form_fields)
  //   ? allFormData?.formFields?.form_fields
  //       .filter((field: any) => {
  //         // Filtering fields based on sectionId
  //         return (
  //           field?.sectionId === entityDetailsSectionId?.id ||
  //           field?.sectionId === verificationSectionId?.id
  //         );
  //       })
  //       .map((field: any) => {
  //         // Adding a 'disabled' property based on specific field labels
  //         return {
  //           ...field,
  //           disabled: [
  //             "companyName",
  //             "panNumber",
  //           ].includes(field.key),
  //         };
  //       })
  //   : [];
  // const formFields = Array.isArray(allFormData?.formFields?.form_fields)
  //   ? allFormData?.formFields?.form_fields
  //       .filter((field: any) => {
  //         // Filtering fields based on sectionId
  //         return (
  //           field?.sectionId === entityDetailsSectionId?.id ||
  //           field?.sectionId === verificationSectionId?.id
  //         );
  //       })
  //       .map((field: any) => {
  //         // Setting the 'disabled' property based on the 'canEditable' property
  //         const isDisabled =
  //           field.required === true
  //             ? status === "RETURNED"
  //               ? ["companyName", "panNumber", "dateOfIncorporation"].includes(
  //                   field.key
  //                 )
  //                 ? true
  //                 : false
  //               : true
  //             : ["companyName", "panNumber", "dateOfIncorporation"].includes(
  //                 field.key
  //               )
  //             ? true
  //             : false;

  //         return {
  //           ...field,
  //           disabled: isDisabled,
  //         };
  //       })
  //   : [];
  const formFields = Array.isArray(allFormData?.formFields?.form_fields)
    ? allFormData?.formFields?.form_fields
        .filter((field: any) => {
          // Filtering fields based on sectionId
          return (
            field?.sectionId === entityDetailsSectionId?.id ||
            field?.sectionId === verificationSectionId?.id
          );
        })
        .map((field: any) => {
          // Setting the 'disabled' property based on the 'canEditable' property
          const isDisabled =
            field.required === true
              ? status === "RETURNED"
                ? ["companyName", "panNumber", "dateOfIncorporation"].includes(
                    field.key
                  )
                  ? true
                  : false
                : true
              : ["companyName", "panNumber", "dateOfIncorporation"].includes(
                  field.key
                )
              ? true
              : false;

          return {
            ...field,
            disabled: isDisabled,
          };
        })
        .sort((a: any, b: any) => {
          // Sort by companyName, panNumber, and dateOfIncorporation
          const sortOrder = ["companyName", "panNumber", "dateOfIncorporation"];
          const aIndex = sortOrder.indexOf(a.key);
          const bIndex = sortOrder.indexOf(b.key);

          if (aIndex === -1 && bIndex === -1) return 0; // No sorting for non-prioritized fields
          if (aIndex === -1) return 1; // a comes after b
          if (bIndex === -1) return -1; // a comes before b
          return aIndex - bIndex; // Sort based on index in sortOrder
        })
    : [];
  console.log({ formFields });

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
  //   const noError = await handleValidationChecks(
  //     formFields?.filter((field: any) => field?.disabled === false)
  //   );

  //   if (noError) {
  //     if (noError) {
  //       axiosTokenInstance
  //         .patch(`/deposit-taker/${sessionStorage.getItem("entityUniqueId")}`, {
  //           formData: formData,
  //         })
  //         .then((response) => {
  //           console.log(response?.data?.message, "response");
  //           Swal.fire({
  //             icon: "success",
  //             text:
  //               response?.data?.message ||
  //               "Entity Details updated successfully",
  //             confirmButtonText: "Ok",
  //           });

  //           Navigate("/dt/profile?current=nodal");
  //         })
  //         .catch((err) => {
  //           Swal.fire({
  //             icon: "error",
  //             text: "Failed to update Entity Details",
  //             confirmButtonText: "Ok",
  //           });
  //         });
  //     }
  //   }
  //   setLoader(false);
  // };
  const onSubmit = async (event: any) => {
    event?.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update the Entity Details?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoader(true);
        const noError = await handleValidationChecks(
          formFields?.filter((field: any) => field?.disabled === false)
        );

        if (noError) {
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
                text:
                  response?.data?.message ||
                  "Entity Details updated successfully",
                confirmButtonText: "Ok",
              });

              Navigate("/dt/profile?current=nodal");
            })
            .catch((err) => {
              Swal.fire({
                icon: "error",
                text: "Failed to update Entity Details",
                confirmButtonText: "Ok",
              });
            })
            .finally(() => {
              setLoader(false);
            });
        } else {
          setLoader(false);
        }
      }
    });
  };
  const onClick = async (event: any) => {
    setLoader1(true);
    event?.preventDefault();
    const noError = await handleValidationChecks(
      formFields?.filter((field: any) => field?.disabled === false)
    );
    if (noError) {
      setFormData(formData);
      navigate("/dt/profile?current=nodal");
    }
    setLoader1(false);
  };
  return (
    <>
      <div className="flex flex-col w-full h-full">
        <form
          // onSubmit={onSubmit}
          className="flex flex-col justify-between px-6 py-4"
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
              <div>
                <Footer
                  onSubmit={onSubmit}
                  loader={loader}
                  loader1={loader1}
                  onClick={onClick}
                  showbackbtn={false}
                />
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center">
              <LoaderSpin />
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default ProfileEntityDetails;
