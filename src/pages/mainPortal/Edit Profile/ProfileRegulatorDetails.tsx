import React, { useContext } from "react";
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

type Props = {};

const ProfileRegulatorDetails = (props: Props) => {
  const screenWidth = useScreenWidth();
  const { allFormData } = useDepositTakerRegistrationStore((state) => state);
  const { onChange, handleValidationChecks, updatePanFormField } =
    useContext(FormHandlerContext);

  const sectionId = allFormData?.entitySections?.find(
    (s: any) => s?.sectionName === "Regulators Details"
  );

  const formFields = Array.isArray(allFormData?.formFields?.form_fields)
    ? allFormData?.formFields?.form_fields?.filter(
        (f: any) => f?.sectionId === sectionId?.id
      )
    : [];
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  //   setValue,
  //   setError,
  //   clearErrors,
  // } = useForm({
  //   resolver: yupResolver(RegulatorsDetailsSchema),
  // });

  // const handleDateChange = (event: any) => {
  //   const { value } = event.target;
  //   const today = new Date();
  //   const selected = new Date(value);
  //   today.setHours(0, 0, 0, 0);

  //   if (!(selected <= today)) {
  //     setError("registrationDate", { message: "Date should not be in future" });
  //   } else {
  //     clearErrors("registrationDate");
  //   }
  //   setValue("registrationDate", value);
  // };

  const onSubmitClick = (event: any) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <form
          onSubmit={onSubmitClick}
          className="p-4 flex flex-col w-full max-w-[100%] justify-between h-screen"
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
            <Footer />
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileRegulatorDetails;
