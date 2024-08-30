import React, { useContext, useState } from "react";
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

type Props = {};

const ProfileRegulatorDetails = (props: Props) => {
  const [loader, setLoader] = useState(false);
  const Navigate = useNavigate();

  const screenWidth = useScreenWidth();
  const { allFormData } = useDepositTakerRegistrationStore((state) => state);
  const { onChange, handleValidationChecks } = useContext(FormHandlerContext);

  const sectionId = allFormData?.entitySections?.find(
    (s: any) => s?.sectionName === "Regulators Details"
  );

  const formFields = Array.isArray(allFormData?.formFields?.form_fields)
    ? allFormData?.formFields?.form_fields
        ?.filter((f: any) => f?.sectionId === sectionId?.id)
        .map((field: any) => {
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
  console.log({ formData }, "formData");

  const onSubmit = async (event: any) => {
    event?.preventDefault();
    setLoader(true);
    const noError = await handleValidationChecks(formFields);
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
              response?.data?.message ||
              "Regulator Details updated successfully",
            confirmButtonText: "Ok",
          });
          Navigate("/rg/profile?current=nodal");
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            text: "Failed to Update Regulator Details",
            confirmButtonText: "Ok",
          });
        });
    }
    // if (noError) {
    //   Swal.fire({
    //     icon: "success",
    //     text: "Regulator Detail  update  successfully ",
    //     confirmButtonText: "Ok",
    //   }).then((confirm: any) => {
    //     Navigate("/dt/profile?current=documents");
    //   });
    // }
    setLoader(false);
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

export default ProfileRegulatorDetails;
