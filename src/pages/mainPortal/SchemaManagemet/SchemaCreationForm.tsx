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
  const [submitted, setSubmitted] = useState(false);
  const [popupData, setPopData] = useState({
    para1: "",
    para2: "",
    show: false,
  });
  const entityType = sessionStorage.getItem("entityUniqueId");

  const navigate = useNavigate();
  const { collapsed } = useSidebarStore();
  const { setAllFormData, setAllDocumentData, allFormData } =
    useDepositTakerRegistrationStore((state) => state);
  const { onChange, handleValidationChecks, handleSchemeValidations } =
    useContext(FormHandlerContext);

  const handleBackButtonClick = () => {
    navigate("/dt/scheme");
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  useEffect(() => {
    fetchSchema();
  }, []);
  const fetchSchema = async () => {
    try {
      const response = await axiosTokenInstance.get(`/scheme/field-data/1`);
      // console.log(response, "response");
      if (response.data.success) {
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
                let branches = data?.data?.branches?.map((b: any) => {
                  return {
                    name: b?.pinCode + " " + b?.district + " " + b?.state,
                    id: b?.id,
                  };
                });

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
      console.error("Error fetching schema data:", error);
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
          para2: response.data?.message,
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

  return (
    <div
      className="relative xl:ml-[40px]"
      style={{ minHeight: "calc(100vh - 110px)" }}
    >
      <div className="mt-6">
        <TaskTabs />
      </div>
      <div className="-ml-7">
        {allFormData?.formFields?.form_fields?.length > 0 ? (
          <>
            <div className="flex items-center justify-between flex-col h-full mx-10 my-0  ">
              <div className="w-full mb-40">
                <div className="mt-10">
                  <DynamicFields
                    formFields={allFormData?.formFields?.form_fields}
                    allFormData={allFormData}
                    onChange={onChange}
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
                  <div className="border-[#E6E6E6] border-[1px] lg:mt-4 "></div>

                  <p className="mb-[24px] text-gilroy-light text-center text-[#24222B] text-xs cursor-pointer mt-4">
                    © 2024 Protean BUDs, All Rights Reserved.
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center items-center h-[calc(100vh-300px)]">
              <LoaderSpin />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SchemaCreationForm;
