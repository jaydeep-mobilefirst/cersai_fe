import React, { useContext, useEffect, useState } from "react";
import Accordion from "../../../../components/customAccordin/CustomAccordin";
import AuditTrail from "../../../../components/ScehmaManagement/AuditTrail";
import { useLocation, useNavigate } from "react-router-dom";
import { useScreenWidth } from "../../../../utils/screenSize";
import TaskTabsDc from "../../../../components/ScehmaManagement/TaskTabsDc";
import InfoIcon from "../../../../assets/images/info-circle.svg";
import DynamicFields from "../../../../components/userFlow/depositeTaker/DynamicFields";
import { FormHandlerContext } from "../../../../contextAPI/useFormFieldHandlers";
import { useDepositTakerRegistrationStore } from "../../../../zust/deposit-taker-registration/registrationStore";
import LoaderSpin from "../../../../components/LoaderSpin";
import TextArea from "../../../../components/userFlow/form/TextArea";
import FileUploadOpenKm from "../../../../components/buttons/FileUploadOpenKM";
import InputField from "../../../../components/form/InputField";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { axiosTokenInstance } from "../../../../utils/axios";
import MangementDetails from "./ManagementDetails";
import BranchDetails from "./BranchDetails";

interface AccordionItem {
  header: React.ReactNode;
  content: React.ReactNode;
}
const SchemesSearchDetailsSM: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [fileData, setFileData] = useState<string | null>(null);
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const screenWidth = useScreenWidth();
  const { onChange } = useContext(FormHandlerContext);
  const { setAllFormData, setAllDocumentData, allFormData } =
    useDepositTakerRegistrationStore((state) => state);
  const navigate = useNavigate();
  const location = useLocation();
  const createdBy = location.state?.createdBy?.substring(0, 2);
  const uniqueId = location.state?.uniqueId;
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(2);
  const depositTakerId = location.state?.depositTakerId;
  const [entityDetailsFields, setEntityDetailsFields] = useState<any[]>([]);

  const handleChangeComment = (e: any) => {
    const { value } = e?.target;
    setComment(value);
    setLoader2(false);
    if (comment == "") {
      setError("Comment should not be empty");
      return;
    } else {
      setError("");
    }
  };
  const fetchSchema = async () => {
    try {
      setLoader(true);
      const portalResponse = await axiosTokenInstance.get(
        `/scheme-portal/${uniqueId}`
      );
      const userData = portalResponse.data?.data?.schemes[0];
      const createdById = portalResponse.data?.data?.schemes[0]?.createdBy;
      const response = await axiosTokenInstance.get(
        `/scheme/field-data/${createdById?.substring(0, 2) === "DT" ? 1 : 2}`
      );

      if (response.data.success) {
        let formFields = response?.data?.data?.formFields?.allFormFields.map(
          async (field: any) => {
            if (field?.key === "depositTakerId") {
              return {
                ...field,
                userInput: userData?.schemeFormData?.find(
                  (f: any) => f?.fieldId === field?.id
                )?.value,
                error: "",
                disabled: true,
                typeId: field?.fieldTypeId,
                dropdown_options: {
                  ...field?.dropdown_options,
                  options: field?.dropdown_options?.options?.map((o: any) => ({
                    name: o?.uniqueId,
                    id: o?.companyName,
                  })),
                },
              };
            } else if (field?.key === "branch") {
              try {
                const res = await axiosTokenInstance.get(
                  "/deposit-taker/branch/" + location.state.depositTakerId
                );
                let data = res.data;
                let branches = data?.data?.branches?.map((b: any) => {
                  return {
                    name: b?.pinCode + " " + b?.district + " " + b?.state,
                    id: b?.id,
                  };
                });

                return {
                  ...field,
                  userInput: userData?.schemeFormData?.find(
                    (f: any) => f?.fieldId === field?.id
                  )?.value,
                  disabled: true,
                  error: "",
                  typeId: field?.fieldTypeId,
                  dropdown_options: {
                    ...field?.dropdown_options,
                    options: branches,
                  },
                };
              } catch (error) {
                return {
                  ...field,
                  disabled: true,
                  userInput: userData?.schemeFormData?.find(
                    (f: any) => f?.fieldId === field?.id
                  )?.value,
                  error: "",
                  typeId: field?.fieldTypeId,
                };
              }
            } else {
              return {
                ...field,
                disabled: true,
                userInput: userData?.schemeFormData?.find(
                  (f: any) => f?.fieldId === field?.id
                )?.value,
                error: "",
                typeId: field?.fieldTypeId,
              };
            }
          }
        );

        formFields = await Promise.all(formFields);

        // Sort form fields based on the sortOrder
        formFields.sort((a: any, b: any) => a.sortOrder - b.sortOrder);

        setAllFormData({
          ...response?.data?.data,
          formFields: { form_fields: formFields },
          fieldTypes: response?.data?.data?.fieldTypes,
          validations: response?.data?.data?.validations,
          fileTypes: response?.data?.data?.fileTypes,
          other: userData,
        });
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.error("Error fetching schema data:", error);
    }
  };

  useEffect(() => {
    if (uniqueId) {
      fetchSchema();
    }
  }, [uniqueId, page, pageSize]);
  const fetchFormFields = () => {
    axiosTokenInstance
      .get(`/registration/field-data/1?status=addToProfile`)
      .then(async (response) => {
        if (response?.data?.success) {
          let dtData: any = [];
          try {
            let depositTakerData = await axiosTokenInstance.get(
              `/deposit-taker/${depositTakerId}`
            );
            dtData =
              depositTakerData?.data?.data?.depositTaker?.depositTakerFormData;
          } catch (error) {
            console.log("Error");
          }
          let modifiedFormFields = response.data.data?.formFields
            ?.map((o: any) => ({
              ...o,
              userInput: dtData
                ? dtData?.find((data: any) => data?.fieldId === o?.id)?.value
                : "",
              error: "",
              disabled: true,
            }))
            ?.sort((a: any, b: any) => {
              // Sort by companyName, panNumber, and dateOfIncorporation
              const sortOrder = [
                "companyName",
                "panNumber",
                "dateOfIncorporation",
                "Type of Entity",
                "Unique ID Number",
                "GST Number",
                "Registered Address Line 1",
                "Registered Address Line 2",
                "pincode",
                "State",
                "District",
                "regulatorName",
                "Regulator Number (Provided by Regulator)",
                "Regulator approval Date",
                "User Email",
                "nodalFirstname",
                "nodalMiddlename",
                "nodalLastname",
                "nodalMobile",
                "nodalEmail",
              ];
              const aIndex = sortOrder.indexOf(a.key || a.label);
              const bIndex = sortOrder.indexOf(b.key || b.label);

              if (aIndex === -1 && bIndex === -1) return 0; // No sorting for non-prioritized fields
              if (aIndex === -1) return 1; // a comes after b
              if (bIndex === -1) return -1; // a comes before b
              return aIndex - bIndex; // Sort based on index in sortOrder
            });

          let modifiedFileFields =
            response?.data?.data?.registrationDocumentFields?.map((o: any) => ({
              ...o,
              file: dtData
                ? dtData?.find((data: any) => data?.fieldId === o?.id)?.value
                : "",
              error: "",
              fileName: dtData
                ? dtData?.find((data: any) => data?.fieldId === o?.id)?.value
                : "",
              uploadFileId: dtData
                ? dtData?.find((data: any) => data?.fieldId === o?.id)?.value
                : "",
              disabled: true,
            }));

          let obj = {
            ...response?.data?.data,
            formFields: { form_fields: modifiedFormFields },
          };
          setEntityDetailsFields(modifiedFormFields);
          // setAllDocumentData(modifiedFileFields);
        } else {
          throw new Error("Error getting data, Please try later!");
        }
        setLoader(false);
      })
      .catch((error: any) => {
        console.log(error);
        setLoader(false);
      });
  };
  useEffect(() => {
    fetchFormFields();
  }, [depositTakerId]);

  const accordionItems: AccordionItem[] = [
    {
      header: "Scheme Details",
      content: (
        <>
          <DynamicFields
            formFields={allFormData?.formFields?.form_fields?.filter(
              (field: any) => field.key !== "branch"
            )}
            allFormData={allFormData}
            onChange={onChange}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label
                htmlFor="Status"
                className="text-base font-normal text-gilroy-medium"
              >
                Status <span className="text-red-500">*</span>
              </label>
              <InputField value={allFormData?.other?.status==="UNDER_LETIGATION"?"UNDER LITIGATION":allFormData?.other?.status?.replace(/_/g," ")} disabled />
            </div>
            <div>
              <label
                htmlFor="Select Other Schemes"
                className="text-base font-normal text-gilroy-medium"
              >
                Comment <span className="text-red-500">*</span>
              </label>
              <TextArea
                id="Select Other Schemes"
                placeholder="type comment "
                onChange={handleChangeComment}
                disabled={
                  allFormData?.other?.status === "BANNED" ? false : true
                }
              />
              <span className="text-red-400">{error}</span>
            </div>

            <div>
              <label
                htmlFor=""
                className="text-base font-normal text-gilroy-medium mb-1"
              >
                Upload File
              </label>
              <FileUploadOpenKm
                setFileData={setFileData}
                fileData={fileData}
                setDisable={
                  allFormData?.other?.status === "BANNED" ? false : true
                }
              />
            </div>
          </div>

          <BranchDetails />
        </>
      ),
    },
    {
      header: "Entity Details",
      content: (
        <DynamicFields
          formFields={entityDetailsFields}
          allFormData={entityDetailsFields}
          onChange={onChange}
        />
      ),
    },
    {
      header: "Audit Trail",
      content: <AuditTrail />,
    },
    {
      header: "Management Details",
      content: <MangementDetails />,
    },
  ];
  const handleBackButtonClick = () => {
    setAllFormData(null);
    navigate("/dc/my-task");
  };

  const handleAddCommnent = async () => {
    try {
      setLoader2(true);
      if (comment == "") {
        setError("Comment should not be empty");
        return;
      } else {
        setError("");
      }

      let user: any = jwtDecode(sessionStorage.getItem("access_token") ?? "");
      let payload = {
        // user: user?.name ?? "user not found",
        // from: allFormData?.other?.status,
        // to: allFormData?.other?.status,
        remark: comment,
        documentId: fileData,
      };

      try {
        const response = await axiosTokenInstance.patch(
          `/scheme-portal/${uniqueId}/audit`,
          payload
        );
        const data = response.data;
        if (data?.success) {
          Swal.fire({
            text: data?.message,
            icon: "success",
            title: "Success",
          });
          fetchSchema();
        } else {
          Swal.fire({
            text: data?.message,
            icon: "error",
            title: "Something went wrong",
          });
        }
        setLoader2(false);
      } catch (error: any) {
        Swal.fire({
          text: error?.message,
          icon: "error",
          title: "Something went wrong",
        });
        setLoader2(false);
      }
    } catch (error: any) {
      setLoader2(false);
    }
  };
  return (
    <div className="flex flex-col min-h-screen justify-between" style={{ minHeight: "calc(100vh - 110px)" }}>
      <div>
      <div className="mt-6 mx-8">
        <TaskTabsDc />
      </div>
      <div className="flex flex-row mt-3 mx-8">
        <img
          src={InfoIcon}
          alt="InfoIcon"
          className="h-6 w-6 sm:h-8 sm:w-8 mr-2"
        />
        <p className="text-[#808080]">
          Please update the comments under scheme details
        </p>
      </div>
      <div className="mt-8 mb-8 mx-8">
        {loader ? (
          <LoaderSpin />
        ) : (
          <Accordion items={accordionItems} showAccordion={true} />
        )}
      </div>
      </div>
      <div>
        <div
          className="flex w-full p-8 lg:px-[30px] flex-row justify-between items-center "
          style={{
            width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
          }}
        >
          <div className="flex flex-row items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="shrink-0"
            >
              <path
                d="M15 6L9 12L15 18"
                stroke="#1D1D1B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <button
              onClick={handleBackButtonClick}
              className="text-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#385723]"
            >
              Back
            </button>
          </div>
          {allFormData?.other?.status === "BANNED" ? (
            <div className="flex items-center">
              <button
                onClick={handleAddCommnent}
                disabled={loader2}
                type="submit"
                className="bg-[#1C468E] rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs text-gilroy-semibold "
              >
                {loader2 ? <LoaderSpin /> : "Submit"}
              </button>
            </div>
          ) : null}
          {/* 
          <div className="flex items-center">
            <button
              onClick={handleAddCommnent}
              disabled={loader2}
              type="submit"
              className="bg-[#1C468E] rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs text-gilroy-semibold "
            >
              {loader2 ? <LoaderSpin /> : "Submit"}
            </button>
          </div> */}
        </div>
        <div>
          <div className="border-[#E6E6E6] border-[1px] lg:mt-4"></div>

          <div className="text-center mt-auto">
            <h1 className="text-[#24222B] text-xs text-wrap text-gilroy-light mt-3 font-normal">
              COPYRIGHT © 2024 CERSAI. ALL RIGHTS RESERVED.
            </h1>
            <p className="text-[#24222B] text-xs text-wrap text-gilroy-light font-normal">
              Powered and managed by{" "}
              <a
                href="https://www.proteantech.in/"
                className="underline text-gilroy-regular font-bold"
                target="_blank"
              >
                Protean eGov Technologies
              </a>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemesSearchDetailsSM;
