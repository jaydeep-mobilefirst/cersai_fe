import React, { useContext, useEffect, useState, useRef } from "react";
import Accordion from "../../../../components/customAccordin/CustomAccordin";
import VerificationDetails from "./VerificationDetails";
import EntityDetails from "./EntityDetails";
import NodalDetails from "./NodalDetails";
import RegulatorDetails from "./RegulatorDetails";
import TaskTabsCa from "../../../../components/ScehmaManagement/TaskTabsCa";
import InfoIcon from "../../../../assets/images/info-circle.svg";
import UploadIcon from "../../../../assets/images/directbox-send-White.svg";
import UploadPopUp from "./UploadPopUp";
import { useScreenWidth } from "../../../../utils/screenSize";
import SuccessUploadPopUp from "./SuccessUploadPopUp";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DynamicFields from "../../../../components/userFlow/depositeTaker/DynamicFields";
import { FormHandlerContext } from "../../../../contextAPI/useFormFieldHandlers";
import { useDepositTakerRegistrationStore } from "../../../../zust/deposit-taker-registration/registrationStore";
import LoaderSpin from "../../../../components/LoaderSpin";
import SuccessPopup from "../../../../components/userFlow/depositeTaker/SuccessPopUp";
import { dateFormattor, formatDate } from "../../../../utils/commonFunction";
import Swal from "sweetalert2";
import ReactTable from "../../../../components/userFlow/common/ReactTable";
import { createColumnHelper } from "@tanstack/table-core";
import { axiosTokenInstance } from "../../../../utils/axios";
import TaskTabsRg from "../../../../components/ScehmaManagement/TaskTabsRg";
import { encryptPayload } from "../../../../utils/encryptionHelper";

interface AccordionItem {
  header: React.ReactNode;
  content: React.ReactNode;
}

const DepositeTakerSearchDetailsSM: React.FC = () => {
  const isDscKeyAvbl = process.env.REACT_APP_IS_DSC_KEY_AVBL;
  const navigate = useNavigate();
  const [uploadPopupOpen, setUploadPopupOpen] = useState(false);
  const [successUploadPopupOpen, setSuccessUploadPopupOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [panSuccessModal, setPanSuccessModal] = useState(false);
  const [submitModal, setSubmitModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [para1, setPara1] = useState("");
  const [para2, setPara2] = useState("");
  const [uploadInputKey, setUploadKey] = useState<number>(0);
  const uploadButtonRef = useRef<HTMLInputElement>(null);
  const [accordionLoading, setAccordionLoading] = useState(true);

  const screenWidth = useScreenWidth();

  const { onChange, handleValidationChecks, updatePanFormField } =
    useContext(FormHandlerContext);

  const { setAllFormData, setAllDocumentData, allFormData, masterEntityId } =
    useDepositTakerRegistrationStore((state) => state);
  console.log({ allFormData }, "allFormData");

  useEffect(() => {
    fetchFormFields();
  }, []);

  const handleCancelClick = () => {
    navigate("/ca/deposit-taker");
  };

  const handleUploadClick = () => {
    setUploadPopupOpen(true);
  };

  const handleClosePopup = () => {
    setUploadPopupOpen(false);
  };

  const handleSuccessUploadClick = () => {
    setSuccessUploadPopupOpen(true);
  };

  const handleSuccessClosePopup = () => {
    setSuccessUploadPopupOpen(false);
  };

  const fetchFormFields = async () => {
    try {
      const response = await axiosTokenInstance.get(
        `/registration/field-data/${1}?status=addToRegistration`
      );
      const dropdownOptionsRes = await axiosTokenInstance.get(
        `/registration/dropdown-components`
      );
      if (response?.data?.success) {
        const dropdownData = dropdownOptionsRes?.data?.data;
        const modifiedFormFields = response?.data?.data?.formFields
          ?.sort((a: any, b: any) => a.sortOrder - b.sortOrder)
          .map((o: any) => ({
            ...o,
            userInput: "",
            error: "",
            disabled: o.label === "State" || o.label === "District",
          }));
        const modifiedFileFields =
          response?.data?.data?.registrationDocumentFields?.map((o: any) => ({
            ...o,
            file: "",
            error: "",
            fileName: "",
          }));
        setAllFormData({
          ...response.data.data,
          formFields: { form_fields: modifiedFormFields },
          dropdownData,
        });
        setAllDocumentData(modifiedFileFields);
        setAccordionLoading(false);
      }
    } catch (error) {
      console.error("Error fetching form data:", error);
      setAccordionLoading(false);
    }
  };

  const excludedSectionNames = ["Upload Documents"];

  const accordionItems =
    allFormData?.entitySections
      ?.filter(
        (section: any) => !excludedSectionNames.includes(section.sectionName)
      )
      .map((section: any) => {
        const formFields = allFormData?.formFields?.form_fields?.filter(
          (f: any) => f.sectionId === section.id
        );
        const hasError = formFields.some((field: any) => field.error);

        return {
          header: section?.sectionName,
          content: (
            <div key={section.id}>
              <DynamicFields
                allFormData={allFormData}
                formFields={formFields}
                onChange={onChange}
              />
            </div>
          ),
          hasError: hasError,
        };
      }) || [];

  const verifyPan = async () => {
    try {
      const company = allFormData?.formFields?.form_fields?.find((field: any) =>
        /Company Name/i.test(field?.label)
      );
      const pan = allFormData?.formFields?.form_fields?.find((field: any) =>
        /PAN Number/i.test(field?.label)
      );
      const dob = allFormData?.formFields?.form_fields?.find((field: any) =>
        /Date of In-corporation/i.test(field?.label)
      );
      const formattedDob = formatDate(dob?.userInput);
      const payload = {
        name: company?.userInput?.toUpperCase(),
        pan_no: pan?.userInput,
        dob: formattedDob,
      };
      const encryptedPayload = encryptPayload(payload);

      // const response = await axiosTokenInstance.post("/pandirectory/api", {
      //   name: company?.userInput?.toUpperCase(),
      //   pan_no: pan?.userInput,
      //   dob: formattedDob,
      // });
      const response = await axiosTokenInstance.post("/pandirectory/api", {
        encryptedPayload,
      });
      const data = response.data;
      if (data?.status !== "success") {
        setPara1("Verification Failed");
        setPara2(data?.message);
        setSubmitted(false);
        setPanSuccessModal(true);
        return false;
      }
      updatePanFormField(data, pan);
      return true;
    } catch (error: any) {
      console.log("Error while verifying PAN:", error);
      setPara1("Verification Error");
      setPara2(
        error?.response?.data?.message ||
          "There was an error verifying the PAN. Please try again later."
      );
      setPanSuccessModal(true);
      return false;
    }
  };
  const verifyDscWithNodalOfficer = (data: any) => {
    // Extract names from the data array
    const firstNameObj = data.find(
      (item: { key: string }) => item.key === "nodalFirstname"
    );
    const middleNameObj = data.find(
      (item: { key: string }) => item.key === "nodalMiddlename"
    );
    const lastNameObj = data.find(
      (item: { key: string }) => item.key === "nodalLastname"
    );
    const firstName = firstNameObj
      ? firstNameObj.userInput
          .toUpperCase()
          .split(" ")
          .filter((part: string | any[]) => part.length > 0)
      : [];
    const middleName = middleNameObj
      ? middleNameObj.userInput
          .toUpperCase()
          .split(" ")
          .filter((part: string | any[]) => part.length > 0)
      : [];
    const lastName = lastNameObj
      ? lastNameObj.userInput
          .toUpperCase()
          .split(" ")
          .filter((part: string | any[]) => part.length > 0)
      : [];

    // Check if required names are provided
    if (firstName.length === 0 || lastName.length === 0) {
      return false;
    }

    const dscObj = data.find(
      (item: { label: string }) => item.label === "DSC3 Certificate"
    );

    const dscCertName =
      dscObj?.userInput?.SelCertSubject?.split(",")[0]?.toUpperCase();

    // Extract and normalize names from the certificate name
    const certNameParts = dscCertName
      .replace("CN=", "")
      .toUpperCase()
      .split(" ")
      .filter(Boolean);

    // Combine names into a single array
    const combinedNames = [...firstName, ...middleName, ...lastName].sort();
    const certNameSorted = certNameParts.sort();
    // Check if all parts of combined names are present in the certificate name
    const isMatch =
      combinedNames.length === certNameSorted.length &&
      combinedNames.every((part, index) => part === certNameSorted[index]);
    return isMatch;
  };
  const verifyPanWithGST = () => {
    const details = allFormData?.formFields?.form_fields;

    const panObj = details.find(
      (item: { label: string }) => item.label === "PAN Number"
    );
    const gstObj = details.find(
      (item: { label: string }) => item.label === "GST Number"
    );

    const panNum = panObj?.userInput?.toUpperCase();
    const gstNum = gstObj?.userInput?.toUpperCase();

    const isMatch = gstNum.slice(2, 12) === panNum;
    return isMatch;
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setLoader(true);
    const isFormValid = await handleValidationChecks(
      allFormData?.formFields?.form_fields
    );
    if (!isFormValid) {
      setLoader(false);
      return;
    }
    if (!verifyPanWithGST()) {
      setLoader(false);
      Swal.fire({
        icon: "error",
        title: "Invalid GST",
        text: "GST Number should be aligned with PAN ",
      });
      return;
    }
    if (isDscKeyAvbl === "true" && !isFormValid) {
      if (verifyDscWithNodalOfficer(allFormData?.formFields?.form_fields)) {
        console.log("name checked");
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid Name",
          text: "Nodal Officer name should match with DSC3",
        });
        setLoader(false);
        return;
      }
    }
    const panVerified = await verifyPan();
    if (panVerified) {
      // Process submission if PAN is verified
      try {
        let formData = allFormData.formFields.form_fields.map((field: any) => ({
          fieldId: field.id,
          label: field.label,
          sectionCode: allFormData.entitySections.find(
            (section: any) => section.id === field.sectionId
          )?.sectionName,
          value: field.userInput,
          key: field.key,
        }));
        const response = await axiosTokenInstance.post(
          "/deposit-taker/add-form-fields",
          { formData, regulatorId: masterEntityId }
        );
        if (response.data.success) {
          setPara1(
            "Your registration request has been submitted successfully."
          );
          setPara2(
            `Your registration acknowledgement ID is ${response.data.data.newDepositTaker.uniqueId}`
          );
          setSubmitted(true);
        } else {
          throw new Error("Submission failed");
        }
      } catch (error: any) {
        console.error("Error during form submission:", error);
        setPara1("Submission Error");
        setPara2(
          error?.response?.data?.message ||
            "There was an error during the submission process. Please try again later."
        );
      } finally {
        setSubmitModal(true);
        setLoader(false);
      }
    } else {
      console.log("PAN verification failed");
      setLoader(false);
    }
  };

  const handleClosePopupPan = () => {
    setPanSuccessModal(false);
  };

  const handleDownloadTemplate = () => {
    axiosTokenInstance
      .get(`/deposit-taker/bulk-upload/sample-download`, {
        method: "GET",
        responseType: "blob", // important
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${Date.now()}.xlsx`);
        document.body.appendChild(link);
        link.click();
      });
  };

  const handleFileUpload = (event: any) => {
    setLoader(true);
    const file = event.target.files[0];
    const formData = new FormData();
    formData.set("file", file);
    const entityId = sessionStorage.getItem("entityUniqueId");
    axiosTokenInstance
      .post(`/deposit-taker/bulk-upload`, formData)
      .then((res) => {
        let data = res.data;
        const total = data?.data?.created?.count + data?.data?.failed?.count;
        if (data.success) {
          Swal.fire({
            icon: "success",
            text: `Successfully uploaded ${data?.data?.created?.count}/${total} Failed to upload ${data?.data?.failed?.count}/${total}`,
            title: "Successful",
          }).then(() => {
            if (data?.data?.failed?.count > 0) {
              navigate("/rg/deposit-taker/failed-records", { state: { data } });
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            text: data?.message,
            title: "Error",
          });
        }
      })
      .catch((e) => {
        Swal.fire({
          title: "Unable upload file",
          text: e?.response?.data?.detail?.message,
          icon: "error",
        });
      })
      .finally(() => {
        setLoader(false);
        setUploadKey(uploadInputKey + 1);
      });
  };

  return (
    <div
      className="flex flex-col justify-between"
      style={{ minHeight: "calc(100vh - 110px)" }}
    >
      <div>
        <div className="mt-6 mx-2">
          {/* <TaskTabsCa /> */}
          <TaskTabsRg />
        </div>
        {accordionLoading ? (
          <>
            <div className="flex justify-center items-center">
              <LoaderSpin />
            </div>
          </>
        ) : (
          <>
            <div className="mx-8 mt-4 mb-1">
              <div className="flex flex-col xl:flex-row md:flex-row lg:flex-row items-center justify-between">
                <div className="flex flex-row">
                  <img
                    src={InfoIcon}
                    alt="InfoIcon"
                    className="h-6 w-6 sm:h-8 sm:w-8 mr-2"
                  />
                  <p className="text-[#808080]">
                    You can Upload Deposit Takers data in bulk. Please use this
                    given
                    <span
                      onClick={handleDownloadTemplate}
                      className="text-blue-400 hover:cursor-pointer"
                    >
                      &nbsp;Template.
                    </span>
                  </p>
                </div>
                <div
                  onClick={() => {
                    uploadButtonRef.current?.click();
                  }}
                  className="w-[133px] h-10 px-6 py-2 bg-blue-900 rounded-lg flex-col justify-start items-start gap-2 inline-flex cursor-pointer"
                >
                  <input
                    onChange={handleFileUpload}
                    type="file"
                    name=""
                    id=""
                    className="hidden"
                    accept=".xls, .xlsx"
                    ref={uploadButtonRef}
                    key={uploadInputKey}
                    disabled={loader}
                  />
                  <div className="justify-start items-center gap-1.5 inline-flex">
                    <div className="w-6 h-6 justify-center items-center flex">
                      <div className="w-6 h-6 relative">
                        <img src={UploadIcon} alt="" />
                      </div>
                    </div>
                    <div className="text-white text-base font-normal">
                      {" "}
                      {loader ? <LoaderSpin /> : "Upload"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="m-2 lg:m-4">
              <Accordion items={accordionItems} />
            </div>
          </>
        )}
      </div>
      <div className="mt-8 mb-8 mx-8">
        {accordionLoading ? (
          <>
            <div className="flex justify-center items-center">
              <LoaderSpin />
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between ">
              <div>
                <div
                  className="flex w-full flex-row justify-end items-center"
                  style={{
                    width: `${
                      screenWidth > 1024 ? "calc(100vw - 400px)" : "100vw"
                    }`,
                  }}
                >
                  <div className="flex items-center space-x-6 mb-4 pr-4">
                    <p
                      onClick={handleCancelClick}
                      className="text-[#1c468e]  rounded-xl p-3 border border-[#1c468e] text-gilroy-medium cursor-pointer text-sm w-full sm:w-auto sm:max-w-xs "
                    >
                      Cancel
                    </p>

                    <button
                      onClick={onSubmit}
                      type="submit"
                      className="bg-[#1c468e] rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs text-gilroy-semibold "
                    >
                      {loader ? <LoaderSpin /> : " Submit"}
                    </button>
                  </div>
                </div>
                <div className="mt-auto">
                  <div className="border-[#E6E6E6] border-[1px]"></div>

                  <p className="text-gilroy-light text-center text-[#24222B] text-xs cursor-pointer py-4">
                    © 2024 Protean BUDs, All Rights Reserved.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {uploadPopupOpen && (
        <UploadPopUp closePopup={handleClosePopup} SuccessPopup={() => {}} />
      )}
      {successUploadPopupOpen && (
        <SuccessUploadPopUp
          closePopup={handleSuccessClosePopup}
          SuccessPopup={() => {}}
        />
      )}
      <SuccessPopup
        closePopup={() => {
          setPanSuccessModal(false);
        }}
        showPopup={() => setPanSuccessModal(true)}
        toggle={panSuccessModal}
        para1={para1}
        para2={para2}
        success={submitted}
      />
      <SuccessPopup
        // closePopup={() => {
        //   setSubmitModal(false);
        //   navigate("/rg/deposit-taker");
        // }}
        closePopup={() => {
          setSubmitModal(false);
          if (submitted) {
            navigate("/rg/deposit-taker");
          }
        }}
        showPopup={() => setSubmitModal(true)}
        toggle={submitModal}
        para1={para1}
        para2={para2}
        success={submitted}
      />
    </div>
  );
};

export default DepositeTakerSearchDetailsSM;
