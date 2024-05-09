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

type Props = {};

const ProfileEntityDetails = (props: Props) => {
  const Navigate = useNavigate();
  const screenWidth = useScreenWidth();
  const [loader, setLoader] = useState(false);
  const { allFormData } = useDepositTakerRegistrationStore((state) => state);
  const { onChange, handleValidationChecks, updatePanFormField } =
    useContext(FormHandlerContext);

  const entityDetailsSectionId = allFormData?.entitySections?.find(
    (s: any) => s?.sectionName === "Entity Details"
  );
  const verificationSectionId = allFormData?.entitySections?.find(
    (s: any) => s?.sectionName === "Verification"
  );
  const formFields = Array.isArray(allFormData?.formFields?.form_fields)
    ? allFormData?.formFields?.form_fields?.filter(
        (f: any) =>
          f?.sectionId === entityDetailsSectionId?.id ||
          f?.sectionId === verificationSectionId?.id
      )
    : [];

  const onSubmit = async (event: any) => {
    event?.preventDefault();
    setLoader(true);
    const noError = await handleValidationChecks(formFields);
    if (noError) {
      Swal.fire({
        icon: "success",
        text: "Entity Detail  update  successfully ",
        confirmButtonText: "Ok",
      }).then((confirm: any) => {
        Navigate("/dt/profile?current=nodal");
      });
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
