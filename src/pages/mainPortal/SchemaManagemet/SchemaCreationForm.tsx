import React, { useContext, useEffect, useState } from "react";
import TaskTabs from "../../../components/ScehmaManagement/TaskTabs";
import { useScreenWidth } from "../../../utils/screenSize";
import { useNavigate } from "react-router-dom";
import useSidebarStore from "../../../store/SidebarStore";
import DynamicFields from "../../../components/userFlow/depositeTaker/DynamicFields";
import { useDepositTakerRegistrationStore } from "../../../zust/deposit-taker-registration/registrationStore";
import { FormHandlerContext } from "../../../contextAPI/useFormFieldHandlers";
import LoaderSpin from "../../../components/LoaderSpin";
import SuccessPopup from "../../../components/userFlow/depositeTaker/SuccessPopUp";
import { axiosTokenInstance } from "../../../utils/axios";

const SchemaCreationForm = () => {
  const screenWidth = useScreenWidth();
  const [isChecked, setIsChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [fetchRegulatorData, setRegulatorData] = useState<any>();
  const [popupData, setPopData] = useState({
    para1: "",
    para2: "",
    show: false,
  });
  const entityType = sessionStorage.getItem("entityUniqueId");
  console.log("fetchRegulatorData", fetchRegulatorData);
  const navigate = useNavigate();
  const { collapsed } = useSidebarStore();
  const { setAllFormData, setAllDocumentData, allFormData } =
    useDepositTakerRegistrationStore((state) => state);

  console.log({ allFormData }, "allFormData in scheme");
  const { onChange, handleValidationChecks, handleSchemeValidations } =
    useContext(FormHandlerContext);

  const handleBackButtonClick = () => {
    navigate("/dt/scheme");
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };
  const fetchFormFields = () => {
    axiosTokenInstance
      .get(`/registration/field-data/1?status=addToProfile`)
      .then(async (response) => {
        if (response?.data?.success) {
          let dtData: any = [];
          try {
            let depositTakerData = await axiosTokenInstance.get(
              `/deposit-taker/${entityType}`
            );

            dtData =
              depositTakerData?.data?.data?.depositTaker?.depositTakerFormData;
          } catch (error) {
            console.log("Error");
          }
          console.log({ dtData, response });

          // console.log(dtData, "respnse--------------");
          let modifiedFormFields = response.data.data?.formFields?.map(
            (o: any) => ({
              ...o,
              userInput: dtData
                ? dtData?.find((data: any) => data?.fieldId === o?.id)?.value
                : "",
              error: "",
            })
          );

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
            }));

          let obj = {
            ...response?.data?.data,
            formFields: { form_fields: modifiedFormFields },
          };
          console.log(obj, "obj-----");
          setRegulatorData(
            obj?.formFields?.form_fields?.find(
              (item: any) => item.key === "regulatorName"
            )?.userInput
          );
          // setAllFormData(obj);
          // setAllDocumentData(modifiedFileFields);
        } else {
          throw new Error("Error getting data, Please try later!");
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchSchema();
  }, [fetchRegulatorData]);
  // const fetchSchema = async () => {
  //   try {
  //     const response = await axiosTokenInstance.get(`/scheme/field-data/1`);
  //     // console.log(response, "response");
  //     sessionStorage.setItem("entitiy_details_api", "true");
  //     if (response.data.success) {
  //       await fetchFormFields();

  //       let formFields = response?.data?.data?.formFields?.allFormFields.map(
  //         async (field: any) => {
  //           if (field?.key === "depositTakerId") {
  //             return {
  //               ...field,
  //               userInput: "",
  //               error: "",
  //               typeId: field?.fieldTypeId,
  //               dropdown_options: {
  //                 ...field?.dropdown_options,
  //                 options: field?.dropdown_options?.options?.map((o: any) => ({
  //                   name: o?.uniqueId,
  //                   id: o?.companyName,
  //                 })),
  //               },
  //             };
  //           } else if (field?.key === "branch") {
  //             try {
  //               const res = await axiosTokenInstance.get(
  //                 "/deposit-taker/branch/" + entityType
  //               );
  //               let data = res.data;
  //               let branches = data?.data?.branches?.map((b: any) => {
  //                 return {
  //                   name: b?.pinCode + " " + b?.district + " " + b?.state,
  //                   id: b?.id,
  //                 };
  //               });

  //               return {
  //                 ...field,
  //                 userInput: "",
  //                 error: "",
  //                 typeId: field?.fieldTypeId,
  //                 dropdown_options: {
  //                   ...field?.dropdown_options,
  //                   options: branches,
  //                 },
  //               };
  //             } catch (error) {
  //               return {
  //                 ...field,
  //                 userInput: "",
  //                 error: "",
  //                 typeId: field?.fieldTypeId,
  //               };
  //             }
  //           } else if (field?.key === "regulator") {
  //             const regulatorValue = fetchRegulatorData

  //             return {
  //               ...field,
  //               userInput: regulatorValue,
  //               disabled: true,
  //               error: "",
  //               typeId: field?.fieldTypeId,
  //             };
  //           }
  //           else {
  //             return {
  //               ...field,
  //               userInput: "",
  //               error: "",
  //               typeId: field?.fieldTypeId,
  //             };
  //           }
  //         }
  //       );

  //       formFields = await Promise.all(formFields);

  //       setAllFormData({
  //         ...response?.data?.data,
  //         formFields: {
  //           form_fields: formFields?.sort(
  //             (a: any, b: any) => a.sortOrder - b.sortOrder
  //           ),
  //         },
  //         fieldTypes: response?.data?.data?.fieldTypes,
  //         validations: response?.data?.data?.validations,
  //         fileTypes: response?.data?.data?.fileTypes,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error fetching schema data:", error);
  //   }
  // };
  const fetchSchema = async () => {
    setLoader(true);
    try {
      const response = await axiosTokenInstance.get(`/scheme/field-data/1`);
      sessionStorage.setItem("entitiy_details_api", "true");

      if (response.data.success) {
        // Fetch regulator data before processing form fields
        setLoader(false);
        setIsInitialLoad(false);
        await fetchFormFields();

        let formFields = response?.data?.data?.formFields?.allFormFields.map(
          async (field: any) => {
            if (field?.key === "depositTakerId") {
              return {
                ...field,
                userInput: "",
                error: "",
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
                  "/deposit-taker/branch/" + entityType
                );
                let data = res.data;
                let branches = data?.data?.branches?.map((b: any) => ({
                  name: b?.pinCode + " " + b?.district + " " + b?.state,
                  id: b?.id,
                }));

                return {
                  ...field,
                  userInput: "",
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
                  userInput: "",
                  error: "",
                  typeId: field?.fieldTypeId,
                };
              }
            } else if (field?.key === "regulator") {
              // Ensure fetchRegulatorData is available
              const regulatorValue = fetchRegulatorData; // Default to empty string if not fetched yet
              console.log("regulatorValueregulatorValue", regulatorValue);
              return {
                ...field,
                userInput: fetchRegulatorData,
                disabled: true,
                error: "",
                typeId: field?.fieldTypeId,
              };
            } else {
              return {
                ...field,
                userInput: "",
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
          formFields: {
            form_fields: formFields?.sort(
              (a: any, b: any) => a.sortOrder - b.sortOrder
            ),
          },
          fieldTypes: response?.data?.data?.fieldTypes,
          validations: response?.data?.data?.validations,
          fileTypes: response?.data?.data?.fileTypes,
        });
      }
    } catch (error) {
      setLoader(false);
      console.error("Error fetching schema data:", error);
      setIsInitialLoad(false);
    }
  };
  

  const formatNumber = (num: string): string => {
    if (!num) return "";

    const x = num.split(".");
    let lastThree = x[0].substring(x[0].length - 3);
    const otherNumbers = x[0].substring(0, x[0].length - 3);
    if (otherNumbers !== "") {
      lastThree = "," + lastThree;
    }
    const formatted =
      otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

    return x.length > 1 ? formatted + "." + x[1] : formatted;
  };

  const handleOnchange = async (
    event: any,
    fieldData: any,
    fieldType: string
  ) => {
     if (fieldData?.key === "minInvestment") {
      const inputValue = event?.target.value?.replace(/[^\d]/g, "");
      const formattedValue = formatNumber(inputValue);
      console.log(formattedValue, "jaydeep");
      setAllFormData({
        ...allFormData,
        formFields: {
          form_fields: allFormData?.formFields?.form_fields?.map((f: any) => {
            if (f?.key === "minInvestment") {
              return {
                ...f,
                userInput: formattedValue,
              };
            } else {
              return f;
            }
          }),
        },
      });
      console.log(allFormData, "jaydeep");
    } else if (fieldData?.key === "maxInvestment") {
      const inputValue = event?.target.value?.replace(/[^\d]/g, "");
      const formattedValue = formatNumber(inputValue);
      console.log(formattedValue, "jaydeep");
      setAllFormData({
        ...allFormData,
        formFields: {
          form_fields: allFormData?.formFields?.form_fields?.map((f: any) => {
            if (f?.key === "maxInvestment") {
              return {
                ...f,
                userInput: formattedValue,
              };
            } else {
              return f;
            }
          }),
        },
      });
      console.log(allFormData, "jaydeep");
    } else {
      onChange(event, fieldData, fieldType);
    }
  };

  console.log({ allFormData }, "scheme data ");

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setLoader(true);
    const isFormValid = await handleValidationChecks(
      allFormData?.formFields?.form_fields
    );
    if (!isFormValid) {
      setLoader(false);
      return;
    } else {
      // returns true if no error
      const schemeValidations = await handleSchemeValidations();
      if (schemeValidations === false) {
        setLoader(false);
        return;
      }
    }

    try {
      // Mapping over the form fields to prepare the formData
      // let formData = allFormData.formFields.form_fields.map((field: any) => ({
      //   fieldId: field.id,
      //   value: field.userInput,
      //   key: field.key,
      //   label: field?.label,
      // }));
      let formData = allFormData.formFields.form_fields.map((field: any) => {
        // Initialize the base object to be returned for each field
        let fieldData = {
          fieldId: field.id,
          value: field.userInput,
          key: field.key,
          label: field.label,
        };

        // Special handling for the "Branch" field to match userInput with options
        if (field.label === "Branch" && Array.isArray(field.userInput)) {
          // Map user inputs to their corresponding IDs from the options
          let branchIds = field.userInput
            .map((userInputValue: any) => {
              // Find the option that matches the userInputValue
              const matchingOption = field.dropdown_options.options.find(
                (option: any) => option.name === userInputValue
              );
              return matchingOption ? matchingOption.id : null; // Return the ID if found, otherwise return null
            })
            .filter((id: any) => id !== null); // Filter out any null values if no match was found

          fieldData.value = branchIds; // Set the value to the array of matched IDs
          fieldData.value = JSON.stringify(branchIds);
        }

        return fieldData;
      });
      console.log({ formData }, "form data");

      // Creating the payload object that includes both formData and depositTakerId
      const payload = {
        createdBy: entityType,
        formData: [
          ...formData,
          {
            fieldId: "55883089-b29c-4b73-ab17-45d6e062d6d4",
            key: "depositTakerId",
            value: entityType,
            label: "Deposit taker",
          },
        ],
      };

      // Making the POST request with axios
      const response = await axiosTokenInstance.post(
        `/scheme-portal/add-form-fields`, // Assuming bffUrl is defined elsewhere
        payload // Sending the payload with depositTakerId and formData
      );

      if (response.data?.success) {
        setSubmitted(true);
        setPopData({
          para1: "Addition Successful",
          para2: `${response.data?.message} ID: ${response.data?.data?.newScheme?.uniqueId}`,
          show: true,
        });
      } else {
        setSubmitted(false);
        setPopData({
          para1: "Something went wrong",
          para2: response.data?.message,
          show: true,
        });
      }
      setLoader(false);
      // SuccessPopup();
    } catch (error) {
      setLoader(false);
    }
  };
  console.log("alll----daaaa", allFormData);
  return (
    <div
      className="relative xl:ml-[40px]"
      style={{ minHeight: "calc(100vh - 140px)" }}
    >
      <div className="mt-6">
        <TaskTabs />
      </div>
      <div className="-ml-7">
        {isInitialLoad ? (
          <div className="flex justify-center items-center h-[calc(100vh-300px)]">
            <LoaderSpin />
          </div>
        ) : (
          <div className="flex items-center justify-between flex-col h-full mx-10 my-0  ">
            <div className="w-full mb-40">
              <div className="mt-10">
                <DynamicFields
                  formFields={allFormData?.formFields?.form_fields}
                  allFormData={allFormData}
                  onChange={handleOnchange}
                />
              </div>

              <div className="flex flex-shrink-0 mt-[20px] justify-start items-center">
                <div className="">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[#1c648e]"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    placeholder="ischecked"
                  />
                </div>
                <div className="leading-[24px] ml-4 text-gilroy-medium text-[14px]">
                  I declare all the Information provided is correct as per my
                  knowledge.
                </div>
              </div>
            </div>
            <SuccessPopup
              closePopup={() => {
                setPopData({ ...popupData, show: false });
                if (submitted) {
                  navigate("/dt/scheme");
                }
              }}
              showPopup={() => {}}
              toggle={popupData.show}
              para1={popupData.para1}
              para2={popupData.para2}
              success={submitted}
            />

            <div className="absolute bottom-0">
              <div
                className="flex w-full p-4 lg:px-[30px] flex-row justify-end items-center"
                style={{
                  width: `${
                    screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"
                  }`,
                }}
              >
                <div className="flex items-center space-x-6">
                  <p
                    onClick={handleBackButtonClick}
                    className="text-[#1c468e] text-gilroy-medium cursor-pointer"
                  >
                    Discard
                  </p>

                  <button
                    onClick={onSubmit}
                    type="submit"
                    className={`bg-[#1c468e] rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs text-gilroy-semibold ${
                      !isChecked
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-[#163a7a]"
                    }`}
                    disabled={!isChecked}
                  >
                    {loader ? <LoaderSpin /> : "Create Scheme"}
                  </button>
                </div>
              </div>
              <div>
                <div className="border-[#E6E6E6] border-[1px]"></div>

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
        )}
      </div>
    </div>
  );
};

export default SchemaCreationForm;
