import React, { useEffect, useState } from "react";
import InputFields from "../../components/userFlow/common/InputField";
import Footer from "../../components/userFlow/userProfile/Footer";
import { useScreenWidth } from "../../utils/screenSize";
import TaskTabs from "../../components/userFlow/mainPortal/TaskTabs";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import DscKeyLogin from "../../components/userFlow/form/DscKeyLogin";
import { axiosTokenInstance } from "../../utils/axios";
import { useDepositTakerRegistrationStore } from "../../zust/deposit-taker-registration/registrationStore";

const UploadDSC3Designated = () => {
  const [isDscSelected, setDscSelected] = useState<boolean>(false);
  const [dscCertificate, setDscCertificate] = useState<any>();
  const [isError, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  const screenWidth = useScreenWidth();
  const customClass = "flex flex-col w-full mt-4 justify-between w-full";
  const { allFormData } = useDepositTakerRegistrationStore((state) => state);

  const navigate = useNavigate();
  const sectionId = allFormData?.entitySections?.find(
    (s: any) => s?.sectionName === "Nodal Details"
  );
  const formFields = Array.isArray(allFormData?.formFields?.form_fields)
    ? allFormData?.formFields?.form_fields.filter((field: any) => {
        // Filtering fields based on sectionId
        return field?.sectionId === sectionId?.id;
      })
    : [];

  const dsc3UserInput = formFields.find(
    (field: any) => field.key === "dsc3"
  )?.userInput;

  useEffect(() => {
    console.log(isError);
    if (isDscSelected) {
      setError(false);
    }
  }, [isDscSelected]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!isDscSelected) {
      setError(true);
      return;
    }

    const userId = sessionStorage.getItem("userId");

    try {
      setLoader(true);
      const response = await axiosTokenInstance.put(`/user/updatedsc`, {
        id: Number(userId),
        dscCertificate: dscCertificate,
        // dscCertificate: btoa(dscCertificate?.Cert),
      });
      Swal.fire({
        icon: "success",
        title: response?.data?.message || "DSC3 Updated Successfully",
        text: "",
        customClass: {
          container: "my-swal",
        },
      });
      setLoader(false);
    } catch (error: any) {
      console.error("Error updating DSC:", error);
      setLoader(false);
      Swal.fire({
        icon: "error",

        title: error?.response?.data?.message || "Failed to Update DSC",
        text: "",
        customClass: {
          container: "my-swal",
        },
      });
    }
  };

  return (
    <>
      <div className="mt-6 mx-6">
        <TaskTabs />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between p-6"
        style={{
          height: `${screenWidth > 1024 ? "calc(100vh - 170px)" : "100%"}`,
        }}
      >
        <div className="w-[100%] md:w-[35%]">
          <DscKeyLogin
            isDscSelected={isDscSelected}
            setDscSelected={setDscSelected}
            setDscCertificate={setDscCertificate}
            dsc3UserInput={dsc3UserInput}
          />
          {isError && <p className="text-red-500">select DSC3 certificate</p>}
        </div>
        <div>
          <Footer loader={loader} />
        </div>
      </form>
    </>
  );
};

export default UploadDSC3Designated;
