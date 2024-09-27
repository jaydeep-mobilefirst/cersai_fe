import axios from "axios";
import BackArrow from "../../../assets/images/BackArrow.svg";
import Accordion from "../../../components/customAccordin/CustomAccordin";
import AuditTrail from "../../../components/ScehmaManagement/AuditTrail";
import TaskTabs from "../../../components/ScehmaManagement/TaskTabs";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useDepositTakerRegistrationStore } from "../../../zust/deposit-taker-registration/registrationStore";
import DynamicFields from "../../../components/userFlow/depositeTaker/DynamicFields";
import { FormHandlerContext } from "../../../contextAPI/useFormFieldHandlers";
import LoaderSpin from "../../../components/LoaderSpin";
import { axiosTokenInstance } from "../../../utils/axios";
import BranchDetails from "./BranchDetails";
import MangementDetails from "./ManagementDetails";
import Button from "../../../components/form/Button";
import Swal from "sweetalert2";

interface AccordionItem {
  header: React.ReactNode;
  content: React.ReactNode;
}

const SchemeMasterForm = () => {
  const entityType = sessionStorage.getItem("entityUniqueId");
  const [loader, setLoader] = useState(true);
  const { onChange, handleValidationChecks, handleSchemeValidations } =
    useContext(FormHandlerContext);
  const { setAllFormData, setAllDocumentData, allFormData } =
    useDepositTakerRegistrationStore((state) => state);
  const navigate = useNavigate();
  const location = useLocation();
  const uniqueId = location.state?.uniqueId;
  const createdBy = location.state?.createdBy;

  console.log({ uniqueId, createdBy }, "uniqueId");
  console.log("location", entityType);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(2);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const branchDetails = allFormData?.formFields?.form_fields?.find(
    (item: any) => item.key === "branch"
  )?.userInput;
  console.log("aaaalllllffff", allFormData);

  const fetchSchema = async () => {
    try {
      setLoader(true);
      const response = await axiosTokenInstance.get(
        `/scheme/field-data/${createdBy.substring(0, 2) === "DT" ? 1 : 2}`
      );
      if (response.data.success) {
        const portalResponse = await axiosTokenInstance.get(
          `/scheme-portal/${uniqueId}`
        );

        const userData = portalResponse.data?.data?.schemes[0];

        let formFields = response?.data?.data?.formFields?.allFormFields.map(
          async (field: any) => {
            let userInput = userData?.schemeFormData?.find(
              (f: any) => f?.fieldId === field?.id
            )?.value;

            console.log({ userInput }, "userInput");
            let isDisabled = userInput ? true : false;

            if (field?.key === "depositTakerId") {
              return {
                ...field,
                userInput: userData?.schemeFormData?.find(
                  (f: any) => f?.fieldId === field?.id
                )?.value,
                error: "",
                disabled: isDisabled,
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
                  userInput: userData?.schemeFormData?.find(
                    (f: any) => f?.fieldId === field?.id
                  )?.value,
                  disabled: isDisabled,
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
                  disabled: isDisabled,
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
                disabled: isDisabled,
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
        console.log({ userData, formFields });

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

  const checkForEmptyFields = () => {
    // Check if there are empty fields
    const hasEmptyFields = allFormData?.formFields?.form_fields.some(
      (field: any) =>
        field.userInput === null ||
        field.userInput === undefined ||
        field.userInput === ""
    );

    // Show the submit button if there are empty fields
    if (hasEmptyFields) {
      setShowSubmitButton(true);
    }
  };

  // Call checkForEmptyFields whenever form data changes
  useEffect(() => {
    checkForEmptyFields();
  }, [allFormData]);

  // useEffect(() => {
  //   if (branchDetails) {

  //     setAllFormData({
  //       ...allFormData,
  //       formFields: {
  //         form_fields: allFormData?.formFields?.form_fields?.filter((f: any) => f.key !== "branch"),
  //       },
  //     });
  //   }
  // }, [branchDetails]);

  const EntityName = allFormData?.formFields?.form_fields?.find(
    (item: any) => item.key === "depositTakerId"
  )?.userInput;

  console.log(EntityName, "EntityName");

  const handleSubmit = async (event: any) => {
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
      if (
        field.key === "depositTakerId" ||
        field.label === "Entity Unique ID"
      ) {
        fieldData.value = EntityName;
      }

      return fieldData;
    });
    console.log("payload", formData);

    const payload = {
      depositTakerId: entityType, // Use depositTakerId from session storage
      formData: formData,
    };

    try {
      // Send the payload to the specified endpoint
      const response = await axiosTokenInstance.put(
        `/scheme-portal/${uniqueId}`, // Use uniqueId from the location state
        payload
      );

      if (response.data.success) {
        fetchSchema();
        setShowSubmitButton(false);
        Swal.fire({
          title: "Success!",
          text: "Data submitted successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Failed!",
          text: "Submission failed, please check the inputs",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while submitting the form",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    fetchSchema();
  };

  const accordionItems: AccordionItem[] = [
    {
      header: "Scheme Details",
      content: (
        <>
          <form onSubmit={handleSubmit}>
            <DynamicFields
              formFields={allFormData?.formFields?.form_fields}
              allFormData={allFormData}
              onChange={onChange}
            />
            {showSubmitButton && (
              <div className="flex justify-end items-center mt-4">
                <Button
                  label="Submit"
                  type="submit"
                  width="250px"
                  textColor="white"
                  borderColor="#1C468E"
                  backgroundColor="#1C468E"
                  loader={loader}
                />
              </div>
            )}
          </form>
          <BranchDetails />
        </>
      ),
    },
    {
      header: "Audit Trail",
      content: <AuditTrail />,
    },
    // {
    //   header: "Management Details",
    //   content: <MangementDetails />,
    // },
  ];
  const handleBackButtonClick = () => {
    navigate("/dt/scheme");
  };

  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      <div className="relative mx-2 xl:ml-[40px] mt-4 flex-grow">
        <div className="mt-6">
          <TaskTabs />
        </div>
        <div className="mt-8">
          {loader ? (
            <LoaderSpin />
          ) : (
            <Accordion items={accordionItems} showAccordion={true} />
          )}
        </div>
      </div>

      {/* Footer and Back button at the bottom */}
      <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center cursor-pointer mb-3 md:mb-0 xl:ml-[40px] mx-2">
          <img src={BackArrow} alt={BackArrow} />
          <p
            onClick={handleBackButtonClick}
            className="text-sm font-normal text-gilroy-regular"
          >
            Back
          </p>
        </div>
      </div>

      <div className="border-b-2 border-[#E6E6E6]"></div>

      <div className="text-center mt-auto">
        <h1 className="text-[#24222B] text-xs text-wrap text-gilroy-light mt-3 font-normal">
          © 2024 Protean BUDs, All Rights Reserved.
        </h1>
      </div>
    </div>
  );
};

export default SchemeMasterForm;
