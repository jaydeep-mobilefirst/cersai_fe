import React, { useContext, useEffect, useState } from "react";
import Accordion from "../../../../components/customAccordin/CustomAccordin";
import AuditTrail from "../../../../components/ScehmaManagement/AuditTrail";
import { useLocation, useNavigate } from "react-router-dom";
import { useScreenWidth } from "../../../../utils/screenSize";
import TaskTabsCa from "../../../../components/ScehmaManagement/TaskTabsCa";
import InfoIcon from "../../../../assets/images/info-circle.svg";
import { useDepositTakerRegistrationStore } from "../../../../zust/deposit-taker-registration/registrationStore";
import { FormHandlerContext } from "../../../../contextAPI/useFormFieldHandlers";
import DynamicFields from "../../../../components/userFlow/depositeTaker/DynamicFields";
import LoaderSpin from "../../../../components/LoaderSpin";
import Swal from "sweetalert2";
import SelectButton from "../../../../components/userFlow/form/SelectButton";
import SelectButtonMultiselect from "../../../../components/UserManagement/SelectButtonMultiselect";
import { axiosTokenInstance } from "../../../../utils/axios";
import MangementDetails from "./ManagementDetails";
import BranchDetails from "./BranchDetails";
interface AccordionItem {
  header: React.ReactNode;
  content: React.ReactNode;
}

const options2 = [
  // { label: "Select Status", value: "" },
  { label: "Ban", value: "BANNED" },
  { label: "Active", value: "ACTIVE" },
  // { label: "Under Legislation", value: "UNDER_LETIGATION" },
];
const SchemesSearchDetailsSM: React.FC = () => {
  const [errors, setErrors] = useState({
    statusError: "",
  });
  const [selectedOption2, setSelectedOption2] = useState<string | null>(null);

  const [rawSchemes, setRawSchemes] = useState([]);

  const [schemes, setSchemes] = useState<any[]>([]);

  const [selectedSchemes, setSelectedSchems] = useState<any[]>([]);

  const [loader, setLoader] = useState(true);
  const screenWidth = useScreenWidth();
  const { onChange } = useContext(FormHandlerContext);
  const { setAllFormData, setAllDocumentData, allFormData } =
    useDepositTakerRegistrationStore((state) => state);
  const navigate = useNavigate();
  const location = useLocation();
  const createdBy = location.state?.createdBy?.substring(0, 2);
  const uniqueId = location.state?.uniqueId;
  const Status = location.state?.Status;
  const depositTakerId = location.state?.depositTakerId;
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(2);

  const [entityDetailsFields, setEntityDetailsFields] = useState<any[]>([]);
  console.log("entitydetailsssss", entityDetailsFields);
  const filteredOptions =
    Status === "ACTIVE"
      ? options2.filter((option) => option.value === "BANNED")
      : Status === "BANNED"
      ? options2.filter((option) => option.value === "ACTIVE")
      : options2;

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
              // First, sort by sectionId (numeric sorting)
              if (a?.sectionId !== b?.sectionId) {
                return a?.sectionId - b?.sectionId;
              }
  
              // Then, sort by sortOrder (numeric sorting)
              return a?.sortOrder - b?.sortOrder;
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
    if (allFormData?.other?.depositTakerId) {
      axiosTokenInstance
        .get(
          `/scheme-portal/scheme-by/${
            allFormData?.other?.depositTakerId
          }?page=1&limit=10000&status=${
            Status === "ACTIVE" ||
            (Status === "UNDER_LETIGATION" && selectedOption2 === "BANNED")
              ? "ACTIVE"
              : "ACTIVE"
          }`
        )
        .then((res) => {
          let data = res?.data?.data;
          setRawSchemes(data);

          // Update the schemes list to exclude the selected scheme
          const filteredSchemes = data?.filter(
            (d: any) =>
              d?.name !==
              allFormData?.formFields?.form_fields?.find(
                (field: any) => field.key === "schemeName"
              )?.userInput
          );
          setSchemes(
            filteredSchemes?.map((d: any) => {
              return {
                label: d?.name,
                value: d?.uniqueId,
                status: d?.status,
              };
            })
          );
        })
        .catch((e) => {
          alert("Error fetching Schemes");
          setSchemes([]);
        });
    }
  }, [allFormData, Status, selectedOption2]);

  useEffect(() => {
    fetchFormFields();
  }, [depositTakerId]);

  const handleBackButtonClick = () => {
    navigate("/ca/my-task");
  };

  const handleStatusChange = (e: any) => {
    e?.preventDefault();
    if (!selectedOption2) {
      setErrors({ ...errors, statusError: "Please select status" });
      return;
    } else {
      setErrors({ ...errors, statusError: "" });
    }

    let schemesToChangeStatus = selectedSchemes
      ?.filter((s: any) => s?.status !== selectedOption2)
      ?.map((d: any) => d?.value);
    if (allFormData?.other?.status !== selectedOption2) {
      schemesToChangeStatus = [...schemesToChangeStatus, uniqueId];
    }
    let payload = {
      status: selectedOption2,
      schemeIds: schemesToChangeStatus,
    };

    setLoader(true);
    axiosTokenInstance
      .patch("/scheme-portal/status", payload)
      .then((res) => {
        let data = res.data;
        if (data?.success) {
          Swal.fire({
            title: "Success",
            text: data?.message,
            icon: "success",
          });
          fetchSchema();
          navigate("/ca/my-task");
        } else {
          Swal.fire({
            title: "Something went wrong",
            text: data?.message,
            icon: "error",
          });
        }
      })
      .catch((e) => {
        Swal.fire({
          title: "Something went wrong",
          text: e?.message,
          icon: "error",
        });
      })
      .finally(() => setLoader(false));
  };

  const handleSetOption2 = (value: string) => {
    if (value !== "") {
      setErrors({ statusError: "" });
    }
    setSelectedOption2(value);
    if (value === "ACTIVE") {
      setSelectedSchems([]);
    }
  };

  const remove = (data: any) => {
    const filtered = selectedSchemes.filter((f) => f.value !== data.value);
    setSelectedSchems(filtered);
  };

  const handleSetOption1 = (value: any) => {
    if (
      schemes.length > 0 &&
      !selectedSchemes.find((f) => f.value === value.value)
    ) {
      const selected = schemes.find((f) => f.value === value.value);
      setSelectedSchems((prev) => [...prev, selected]);
    }
  };

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
                htmlFor="Select Other Schemes"
                className="text-base font-normal text-gilroy-medium"
              >
                Status
              </label>
              <SelectButton
                // backgroundColor="#F2F2F2"
                setOption={handleSetOption2}
                options={filteredOptions}
                selectedOption={selectedOption2}
                placeholder="Select"
                showSearchInput={true}
                disabled={Status === "BANNED" ? true : false}
              />
              <span className="text-red-400">{errors?.statusError}</span>
            </div>

            <div>
              <label
                htmlFor="Select Other Schemes"
                className="text-base font-normal text-gilroy-medium"
              >
                Select Other Schemes
              </label>
              <SelectButtonMultiselect
                setOption={handleSetOption1}
                options={schemes}
                placeholder="Select"
                multiselect={true}
                allSelectedOptions={selectedSchemes}
                remove={remove}
                className="relative"
                disabled={
                  Status === "BANNED" ||
                  (Status === "UNDER_LETIGATION" &&
                    selectedOption2 === "ACTIVE")
                    ? true
                    : false
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

  return (
    <div
      className="min-h-screen flex flex-col justify-between"
      style={{ minHeight: "calc(100vh - 110px)" }}
    >
      <div>
        <div className="mt-6 mx-8">
          <TaskTabsCa />
        </div>
        <div className="flex flex-row mt-3 mx-8">
          {/* <img
          src={InfoIcon}
          alt="InfoIcon"
          className="h-6 w-6 sm:h-8 sm:w-8 mr-2"
        /> */}
          {/* <p className="text-[#808080]">
          You can Upload Deposit Takers data in bulk. Please use this given
          <span className="underline line-through:text-blue text-[#BFCFFF]">
            Template
          </span>
        </p> */}
        </div>
        <div className="mt-8 mb-8 mx-8">
          {loader ? (
            <LoaderSpin />
          ) : (
            <Accordion items={accordionItems} showAccordion={true} />
          )}
          {/* <div className="grid grid-cols-2 space-x-3">
          <div>
            <label
              htmlFor="Select Other Schemes"
              className="text-base font-normal text-gilroy-medium"
            >
              Status
            </label>
            <SelectButton
              // backgroundColor="#F2F2F2"
              setOption={handleSetOption2}
              options={filteredOptions}
              selectedOption={selectedOption2}
              placeholder="Select"
              showSearchInput={true}
              disabled={Status === "BANNED" ? true : false}
            />
            <span className="text-red-400">{errors?.statusError}</span>
          </div>

          <div>
            <label
              htmlFor="Select Other Schemes"
              className="text-base font-normal text-gilroy-medium"
            >
              Select Other Schemes
            </label>
            <SelectButtonMultiselect
              setOption={handleSetOption1}
              options={schemes}
              placeholder="Select"
              multiselect={true}
              allSelectedOptions={selectedSchemes}
              remove={remove}
              className="relative"
              disabled={
                Status === "BANNED" ||
                (Status === "UNDER_LETIGATION" && selectedOption2 === "ACTIVE")
                  ? true
                  : false
              }
            />
          </div>
        </div> */}
        </div>
      </div>
      <div className="2xl:mt-32">
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
          <div className="flex items-center">
            <button
              type="submit"
              onClick={handleStatusChange}
              className="bg-[#1C468E] rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs text-gilroy-semibold "
            >
              {loader ? <LoaderSpin /> : "Submit"}
            </button>
          </div>
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
      {/* {showPopup && (
        <StatusSuccessPopUp
          closePopup={() => setShowPopup(false)}
          SuccessPopup={() => setShowPopup(false)}
        />
      )} */}
    </div>
  );
};

export default SchemesSearchDetailsSM;
