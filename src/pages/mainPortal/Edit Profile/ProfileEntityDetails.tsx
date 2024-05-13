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
import axios from "axios";
import { bffUrl } from "../../../utils/api";

type Props = {};

const ProfileEntityDetails = (props: Props) => {
  const Navigate = useNavigate();
  const screenWidth = useScreenWidth();
  const [loader, setLoader] = useState(false);
  const { allFormData } = useDepositTakerRegistrationStore((state) => state);
  const { onChange, handleValidationChecks, updatePanFormField } =
    useContext(FormHandlerContext);

  // console.log(allFormData, "allform data ");

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
          // Adding a 'disabled' property based on specific field labels
          return {
            ...field,
            disabled: [
              "Pin Code",
              "Pan Number",
              "Company Name (As per Pan)",
            ].includes(field.label),
          };
        })
    : [];
  // console.log(formFields, "formfield entitydetail");

  const formData =
    formFields &&
    formFields?.map((field: any) => ({
      fieldId: field.id,
      sectionCode: field.entityRegSection?.sectionName,
      label: field.label,
      value: field.userInput,
    }));
  // console.log(formData, "formData");

  const onSubmit = async (event: any) => {
    event?.preventDefault();
    setLoader(true);
    const noError = await handleValidationChecks(formFields);
    if (noError) {
      if (noError) {
        axios
          .patch(`${bffUrl}/deposit-taker/DT1714567103716`, {
            formData: formData,
          })
          .then((response) => {
            console.log(response, "response");
            Swal.fire({
              icon: "success",
              text: "Entity Detail  update  successfully ",
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
          });
      }
    }
    setLoader(false);
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
          <DynamicFields
            allFormData={allFormData}
            formFields={formFields}
            onChange={onChange}
          />

          <div>
            <Footer onSubmit={onSubmit} loader={loader} />
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileEntityDetails;
