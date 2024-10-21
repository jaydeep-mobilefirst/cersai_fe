import React, { createContext } from "react";
import { useDepositTakerRegistrationStore } from "../zust/deposit-taker-registration/registrationStore";
import { pincodeValidationUrl } from "../utils/api";
import { convertFileToBase64Async } from "../utils/fileConversion";
import Swal from "sweetalert2";
import { emailRegex, panRegex } from "../utils/commonFunction";
import { boolean } from "yup";
import { axiosTraceIdInstance } from "../utils/axios";

type Props = {
  children: React.ReactElement;
};

interface IContextProps {
  onFileChange: (
    event: any | undefined | File,
    field: any,
    fieldType: string,
    entityId?: string
  ) => Promise<void>;
  onChange: (
    event: any | undefined,
    fieldData: any,
    fieldType: string
  ) => Promise<void>;
  updatePanFormField: (
    responseData: any,
    panFormField: any
  ) => Promise<boolean>;
  handleValidationChecks: (
    formFields: any[],
    isAdding?: boolean,
    reVerifyForDedup?:boolean
  ) => Promise<boolean>;
  handleDocumentValidations: (sectionId: number | number[]) => Promise<boolean>;
  handleSectionCompletionTrack: (
    sectionId: number,
    flag: boolean
  ) => Promise<void>;
  handleSchemeValidations: () => Promise<boolean>;
}

// declare function handleValidations(errors: any): void;

export const FormHandlerContext = createContext({} as IContextProps);

const FormHandlerProviders = ({ children }: Props) => {
  const {
    allFormData,
    setAllFormData,
    documentData,
    setAllDocumentData,
    sections,
    setSections,
    masterEntityId,
    setMasterEntityId,
  } = useDepositTakerRegistrationStore((state) => state);
  console.log("all-data",allFormData)
  const updateValue = (
    value: string | any[],
    fieldId: number,
    dscFileNAme: string = ""
  ) => {
    let modifiedFormFields = allFormData?.formFields?.form_fields?.map(
      (o: any) => {
        if (o?.id === fieldId) {
          return {
            ...o,
            userInput: value,
            error: value !== "" ? "" : o?.error,
            dscFileNAme,
          };
        } else {
          return o;
        }
      }
    );
    let obj = {
      ...allFormData,
      formFields: { form_fields: modifiedFormFields },
    };
    setAllFormData(obj);
  };
  const updateDocumentValue = (
    value: string | File | File[],
    fieldData: any,
    fileName: string,
    uploadFileId: string = ""
  ) => {
    let modifiedFileFields = documentData?.map((o: any) => {
      if (o?.id === fieldData?.id) {
        return {
          ...o,
          file: value,
          error: "",
          fileName: fileName,
          uploadFileId,
        };
      } else {
        return o;
      }
    });

    setAllDocumentData(modifiedFileFields);
  };

  const onFileChange = async (
    event: any,
    field: any,
    fieldType: string,
    entityID?: string
  ): Promise<void> => {
    switch (fieldType) {
      case "DSC":
        const file = event;
        const base64String: string = await convertFileToBase64Async(file);
        updateDocumentValue(base64String, field, file?.name);
        break;
      case "pdf":
      case "jpg/png/jpeg":
        let uploadFileId = "";
        if (event?.name && event?.type) {
          try {
            var formData = new FormData();
            formData.append("file", event);

            if (entityID && entityID !== "") {
              formData.append("unique_id", entityID);
            }

            const fileUpload = await axiosTraceIdInstance.post(
              `/openkm/save/temp/file`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            const data = await fileUpload?.data;
            uploadFileId = data?.data[0]?.fileId;
            let fileName = event?.name ? event?.name : "";
            updateDocumentValue(event, field, fileName, uploadFileId);
          } catch (error) {
            Swal.fire({
              icon: "error",
              text: "Error Upload File, Please try later",
              title: "Error",
            });
          }
        } else {
          if (
            (event === "" || event === undefined || event === null) &&
            field?.uploadFileId &&
            field?.uploadFileId !== ""
          ) {
            try {
              await axiosTraceIdInstance.delete(
                `/openkm/file/delete/${field?.uploadFileId}`
              );
              let fileName = event?.name ? event?.name : "";
              updateDocumentValue(event, field, fileName, uploadFileId);
            } catch (error) {
              Swal.fire({
                icon: "error",
                text: "Error deleting File, Please try later",
                title: "Error",
              });
            }
          }
        }
        break;
      default:
        break;
    }
  };

  const onChange = async (
    event: any = undefined,
    fieldData: any,
    fieldType: string
  ) => {
    const inputFieldTypes = [
      "text",
      "textarea",
      "password",
      "number",
      "email",
      "phone_number",
    ];
    if (inputFieldTypes.includes(fieldType) && event) {
      const { value } = event?.target;
      let inputValue: string = value;

      const regex = /\bpan\b/i;
      if (regex.test(fieldData.label)) {
        inputValue = inputValue.toUpperCase();
      }
      updateValue(inputValue, fieldData?.id);
    } else if (fieldType === "date_picker") {
      const { value } = event.target;
      updateValue(value, fieldData?.id);
    } else if (fieldType === "multi_select") {
      const selectedValues = event?.map((option: any) => option.value);
      updateValue(selectedValues, fieldData.id);
    } else if (fieldType === "select" || fieldType === "select_with_search") {
      console.log(event, "event");
      updateValue(event?.value, fieldData?.id);

      let sectionName = fieldData?.entityRegSection?.sectionName;

      switch (sectionName) {
        case "Regulators Details":
        case "Competent Authority Details":
        case "Designated Court Details":
          let fieldName = fieldData?.key;
          switch (fieldName) {
            case "regulatorName":
            case "regulatorNameRG":
            case "competentAuthorityName":
            case "designatedCourtName":
              let data = fieldData?.dropdown_options?.options?.find(
                (d: any) => d?.id === event?.id
              );
              let allFields = allFormData?.formFields?.form_fields?.filter(
                (f: any) => f?.sectionId === fieldData?.sectionId
              );
              let updated = allFields?.map((field: any) => {
                if (
                  /\baddress line 1\b/i.test(field?.label) ||
                  /\baddress 1\b/i.test(field?.label)
                ) {
                  return {
                    ...field,
                    userInput: "",
                    disabled: true,
                  };
                } else if (
                  /\bpin code\b/i.test(field?.label) ||
                  /\bpincode\b/i.test(field?.label)
                ) {
                  return { ...field, userInput: "", disabled: true };
                } else if (
                  /\baddress line 2\b/i.test(field?.label) ||
                  /\baddress 2\b/i.test(field?.label)
                ) {
                  return {
                    ...field,
                    userInput: "",
                    disabled: true,
                  };
                } else if (/\bDistrict\b/i.test(field?.label)) {
                  return {
                    ...field,
                    userInput: "",
                    disabled: true,
                  };
                } else if (/\bState\b/i.test(field?.label)) {
                  return { ...field, userInput: "", disabled: true };
                } else if (/\bJurisdiction\b/i.test(field?.label)) {
                  return { ...field, userInput: "", disabled: true };
                } else if (fieldData?.id === field?.id) {
                  return { ...field, userInput: event?.value, disabled: false };
                } else {
                  return field;
                }
              });

              let allFieldsExceptCurrentSections =
                allFormData?.formFields?.form_fields?.filter(
                  (f: any) => f?.sectionId !== fieldData?.sectionId
                );
              let obj = {
                ...allFormData,
                formFields: {
                  form_fields: [...allFieldsExceptCurrentSections, ...updated],
                },
              };
              setAllFormData(obj);
              setMasterEntityId(data?.masterEntityId);
              break;

            default:
              break;
          }

          break;

        default:
          break;
      }
    } else if (fieldType === "pincode") {
      const { value } = event.target;
      if (value?.length <= 6) {
        updateValue(value, fieldData?.id);
      }

      // Clear state and district fields when pincode is removed (value.length < 6)
      if (value.length < 6) {
        let stateFormField = allFormData?.formFields?.form_fields?.find(
          (o: any) =>
            o?.label?.toLowerCase() === "state" &&
            fieldData?.sectionId === o?.sectionId
        );
        let districtFormField = allFormData?.formFields?.form_fields?.find(
          (o: any) =>
            o?.label?.toLowerCase() === "district" &&
            fieldData?.sectionId === o?.sectionId
        );
        
        handlePincodeSucess(
          {
            districtField: districtFormField,
            stateField: stateFormField,
            stateValue: "",
            districtValue: "",
            pinCodeField: fieldData,
            pinCodeValue: value,
          },
          false
        );
      }

      if (value.length === 6) {
        try {
          const response = await axiosTraceIdInstance.get(
            `${pincodeValidationUrl}/${value}`
          );
          const data = response?.data;
          let stateFormField = allFormData?.formFields?.form_fields?.find(
            (o: any) =>
              o?.label?.toLowerCase() === "state" &&
              fieldData?.sectionId === o?.sectionId
          );
          let districtFormField = allFormData?.formFields?.form_fields?.find(
            (o: any) =>
              o?.label?.toLowerCase() === "district" &&
              fieldData?.sectionId === o?.sectionId
          );
          if (data[0]?.Status === "Success") {
            let locationData = data[0]?.PostOffice[0];
            handlePincodeSucess(
              {
                districtField: districtFormField,
                stateField: stateFormField,
                stateValue: locationData?.State,
                districtValue: locationData?.District,
                pinCodeField: fieldData,
                pinCodeValue: value,
              },
              true
            );
          } else {
            // Handling the error or no records found
            Swal.fire({
              icon: "error",
              title: "Invalid Pincode",
              text:
                data[0]?.Message ||
                "No records found for the provided pincode.",
            });
            handlePincodeSucess(
              {
                districtField: districtFormField,
                stateField: stateFormField,
                stateValue: "",
                districtValue: "",
                pinCodeField: fieldData,
                pinCodeValue: value,
              },
              false
            );
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to validate pincode, please try again later.",
          });
        }
      }

      // if (value.length === 6) {
      //   const response = await axiosTraceIdInstance.get(
      //     `${pincodeValidationUrl}/${value}`
      //   );
      //   const data = response?.data;
      //   let stateFormField = allFormData?.formFields?.form_fields?.find(
      //     (o: any) =>
      //       o?.label?.toLowerCase() === "state" &&
      //       fieldData?.sectionId === o?.sectionId
      //   );
      //   let districtFormField = allFormData?.formFields?.form_fields?.find(
      //     (o: any) =>
      //       o?.label?.toLowerCase() === "district" &&
      //       fieldData?.sectionId === o?.sectionId
      //   );
      //   if (data[0]?.Status === "Success") {
      //     let locationData = data[0]?.PostOffice[0];
      //     handlePincodeSucess(
      //       {
      //         districtField: districtFormField,
      //         stateField: stateFormField,
      //         stateValue: locationData?.State,
      //         districtValue: locationData?.District,
      //         pinCodeField: fieldData,
      //         pinCodeValue: value,
      //       },
      //       true
      //     );
      //   } else {
      //     handlePincodeSucess(
      //       {
      //         districtField: districtFormField,
      //         stateField: stateFormField,
      //         stateValue: "",
      //         districtValue: "",
      //         pinCodeField: fieldData,
      //         pinCodeValue: value,
      //       },
      //       false
      //     );
      //   }
      // }
    } else if (fieldType === "DSC") {
      const file = event;
      const isDscKeyAvbl = process.env.REACT_APP_IS_DSC_KEY_AVBL;

      if (isDscKeyAvbl === "true") {
        updateValue(file, fieldData?.id, "dsc");
      } else {
        const base64String: string = await convertFileToBase64Async(file);
        updateValue(base64String, fieldData?.id, file?.name);
      }
    }
  };

  const handlePincodeSucess = (
    data: {
      stateField: any;
      stateValue: string;
      districtField: any;
      districtValue: string;
      pinCodeField: any;
      pinCodeValue: string;
    },
    disabled: boolean
  ) => {
    let modifiedFormFields = allFormData?.formFields?.form_fields?.map(
      (o: any) => {
        if (o?.id === data?.stateField?.id) {
          return {
            ...o,
            userInput: data?.stateValue,
            error: "",
            disabled: disabled,
          };
        } else if (o?.id === data?.districtField?.id) {
          return {
            ...o,
            userInput: data?.districtValue,
            error: "",
            disabled: disabled,
          };
        } else if (o?.id === data?.pinCodeField?.id) {
          return { ...o, userInput: data?.pinCodeValue, error: "" };
        } else {
          return o;
        }
      }
    );
    let obj = {
      ...allFormData,
      formFields: { form_fields: modifiedFormFields },
    };

    setAllFormData(obj);
  };

  const handleValidations = async (errorData: any): Promise<void> => {
    let modifiedFormFields = allFormData?.formFields?.form_fields?.map(
      (o: any) => {
        if (errorData === true) {
          return { ...o, error: "" };
        } else if (typeof o?.id === "number") {
          const errorField = errorData?.find(
            (eData: any) => parseInt(eData?.formId) === o?.id
          );
          if (o?.id === parseInt(errorField?.formId)) {
            return { ...o, error: errorField?.validationErrors[0]?.error };
          } else {
            return { ...o, error: "" };
          }
        } else if (typeof o?.id === "string") {
          const errorField = errorData?.find(
            (eData: any) => eData?.formId === o?.id
          );
          if (o?.id === errorField?.formId) {
            return { ...o, error: errorField?.validationErrors[0]?.error };
          } else {
            return { ...o, error: "" };
          }
        }
      }
    );
    let obj = {
      ...allFormData,
      formFields: { form_fields: modifiedFormFields },
    };
    setAllFormData(obj);
    return;
  };

  const ValidationSubmitAPI = async (
    formFieldsForValidations: any[]
  ): Promise<boolean> => {
    try {
      const response = await axiosTraceIdInstance?.post(
        `/validator/submit`,
        formFieldsForValidations
      );
      const data = await response?.data?.data;
      const success = await response?.data?.success;

      if (!success) {
        handleValidations(data?.errors);
      } else {
        handleValidations(true);
      }

      return success;
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "",
        text: error?.response?.data?.message,
      });
      return false;
    }
  };

  const handleValidationChecks = async (
    formFields: any[],
    isAdding: boolean = true,
    reVerifyForDedup : boolean = true
  ): Promise<boolean> => {
    const formFieldsForValidations = formFields?.map((field: any) => {
      let validations = field?.regFormFieldsValidations
        ? field?.regFormFieldsValidations
        : field?.schemeFormValidations
        ? field?.schemeFormValidations
        : [];
      return {
        formId: field?.id?.toString(),
        fieldValue: field?.userInput,
        validations: validations?.map((v: any) => {
          return {
            validationName: allFormData?.validations?.find(
              (vd: any) => vd?.id === v?.validationId
            )?.vld_type_name,
            value: field?.userInput !== ""?v?.patternValue:"",
          };
        }),
      };
    });
    // Check for form validations
    let formValidations = await ValidationSubmitAPI(formFieldsForValidations);
    // Check for document fields on that particular sections if any
    let documentValidations =
      documentData?.filter(
        (doc: any) => doc?.sectionId === formFields[0]?.sectionId
      )?.length > 0
        ? await handleDocumentValidations(formFields[0]?.sectionId)
        : true;
    // Dedup check for form fields like mobile, email, isAdding flag is set to true by default
    // So that we can toggle de dup check on one flag, if u don't want to check then set it false
    let deDupCheck = !isAdding
      ? true
      : !formValidations
      ? true
      : await ValidateDeDup(
          formFields?.filter(
            (field: any) =>
              emailRegex.test(field?.userInput) ||
              panRegex.test(field?.userInput) ||
              /^-?\d+$/.test(field?.userInput)
          ),
          reVerifyForDedup
        );

    if (formValidations && documentValidations && deDupCheck) {
      await handleSectionCompletionTrack(formFields[0]?.sectionId, true);
    } else {
      await handleSectionCompletionTrack(formFields[0]?.sectionId, false);
    }

    return formValidations && documentValidations && deDupCheck;
  };

  const handleSectionCompletionTrack = async (
    sectionId: number,
    flag: boolean
  ): Promise<void> => {
    let updated = sections?.map((s) => {
      if (s?.id === sectionId) {
        return { ...s, completed: flag };
      } else {
        return s;
      }
    });
    setSections(updated);
  };
  const ValidateDeDup = async (formFields: any[], reVerifyForDedup : boolean): Promise<boolean> => {   
    const errors: any[] = [];
    const deDupURLs: any = {
      DT: "deposit-taker/dedupcheck",
      DC: "designated-court/dedupcheck",
      CA: "competent-authority/dedupcheck",
      RG: "regulator/dedupcheck",
      nodal: "user/dedup",
    };
    
    // Section is nodal then use nodal url else use usual url for that entity
    const isNodalSection = formFields?.some((field: any) =>
      /nodal/i.test(field?.label)
  );
  let URL = isNodalSection
  ? deDupURLs["nodal"]
  : deDupURLs[allFormData?.currentEntity?.entityCode];

  let filteredFields = formFields?.filter(
      (f: any) =>
        /mobile/i.test(f?.label) ||
        /email/i.test(f?.label) ||
        /Pan Number/i.test(f?.label) ||
        /emailid/i.test(f?.label) ||
        f?.key === "nodalMobile" ||
        f?.key === "panNumber" ||
        f?.key === "nodalEmail"
    );
    let dataFromServer = JSON.parse(sessionStorage.getItem("original") ?? "{}");
    let keys = Object.keys(dataFromServer);

    let dedupCheckFormFields = filteredFields?.filter((e: any) => {
      let userInput = e?.userInput;
      if (keys?.includes(e?.key) && dataFromServer[e?.key] !== userInput) {
        return e;
      }
    });

    if (reVerifyForDedup) {
      if (dedupCheckFormFields?.length === 0) {
        sessionStorage.setItem("needToVerify", "no");
        return true;
      } else {
        sessionStorage.setItem("needToVerify", "yes");
        filteredFields = dedupCheckFormFields;
      }
    }

    const promises = filteredFields.map(async (field: any) => {
      try {
        const checkDeDup = await axiosTraceIdInstance.post(`/${URL}`, {
          value: field?.userInput,
        });

        const data = checkDeDup.data;

        if (data?.data?.duplicate) {
          errors.push({
            formId: field?.id,
            validationErrors: [
              {
                error: data?.message,
              },
            ],
          });
        }
      } catch (error: any) {
        const data = error?.response?.data;
        if (data?.data?.duplicate) {
          errors.push({
            formId: field?.id,
            validationErrors: [
              {
                error: data?.message,
              },
            ],
          });
        }
      }
    });

    await Promise.allSettled(promises);
    await handleValidations(errors);
    return errors.length === 0;
  };

  //  If false means validation failed
  const handleDocumentValidations = async (
    sectionId: number | number[]
  ): Promise<boolean> => {
    let errorCount = 0;
    let modifiedFileFields = documentData?.map((o: any) => {
      if (
        (typeof sectionId === "number" && o?.sectionId === sectionId) ||
        (Array.isArray(sectionId) && sectionId.includes(o?.sectionId))
      ) {
        let error = "";
        if (
          o?.required &&
          (o?.file === "" || o?.file === undefined || o?.file === null)
        ) {
          error = "File Required";
          errorCount += 1;
          return { ...o, error: error };
        } else {
          return o;
        }
      } else {
        return o;
      }
    });
    setAllDocumentData(modifiedFileFields);
    if (typeof sectionId === "number" && errorCount === 0) {
      await handleSectionCompletionTrack(sectionId, true);
    } else if (typeof sectionId === "number" && errorCount !== 0) {
      await handleSectionCompletionTrack(sectionId, false);
    }
    return errorCount === 0;
  };

  const updatePanFormField = async (
    responseData: any,
    panFormField: any
  ): Promise<boolean> => {
    if (responseData?.status !== "success") {
      let modifiedFormFields = allFormData?.formFields?.form_fields?.map(
        (o: any) => {
          if (o?.id === panFormField?.id) {
            return { ...o, error: responseData?.message };
          } else {
            return o;
          }
        }
      );
      let obj = {
        ...allFormData,
        formFields: { form_fields: modifiedFormFields },
      };
      setAllFormData(obj);

      return false;
    }
    return true;
  };
  const handleSchemeValidations = async (): Promise<boolean> => {
    let errorCount = 0;
    const updatedFormFields = allFormData?.formFields?.form_fields?.map(
      (field: any) => {
        const key = field?.key;

        switch (key) {
          case "startDate":
          case "startDateByCARG":
          case "startDateByDT":
          case "lastDate":
          case "lastDateCARG":
          case "lastDateDT":
            // Fetch the input for the start date and end date
            let startDateInput = allFormData?.formFields?.form_fields?.find(
              (f: any) =>
                f?.key === "startDate" ||
                f?.key === "startDateByCARG" ||
                f?.key === "startDateByDT"
            )?.userInput;
            let endDateInput = allFormData?.formFields?.form_fields?.find(
              (f: any) => f?.key === "lastDate" || f?.key === "lastDateCARG" || f?.key === "lastDateDT"
            )?.userInput;

            if (!startDateInput || !endDateInput) {
              return field; // If either date is missing, return the field as is.
            }

            // Convert the input to timestamps for comparison
            const startDate = new Date(startDateInput).getTime();
            const endDate = new Date(endDateInput).getTime();

            if (startDate > endDate) {
              errorCount += 1;
              field.error = "Start date should be before the last date";
            } else if (startDate === endDate) {
              errorCount += 1;
              field.error = "Start date and last date should not be the same";
            } else {
              field.error = ""; // No error
            }
            return { ...field };

          case "minInvestment":
          case "maxInvestment":
            let minInvestment =
              key === "minInvestment"
                ? field?.userInput
                : allFormData?.formFields?.form_fields?.find(
                    (f: any) => f?.key === "minInvestment"
                  )?.userInput;

            let maxInvestment =
              key === "maxInvestment"
                ? field?.userInput
                : allFormData?.formFields?.form_fields?.find(
                    (f: any) => f?.key === "maxInvestment"
                  )?.userInput;

            // Strip commas before parsing as integers
            minInvestment = minInvestment?.replace(/,/g, "");
            maxInvestment = maxInvestment?.replace(/,/g, "");

            // Skip validation if the field is not required and the value is empty
            if (!field?.required && (!minInvestment || !maxInvestment)) {
              field.error = ""; // Ensure no error is displayed
              return { ...field }; // Return the field without validation
            }

            if (!minInvestment || !maxInvestment) {
              return field; // Return field if either value is missing
            }
            console.log("abc",field)
            const minInvestmentValue = parseInt(minInvestment);
            const maxInvestmentValue = parseInt(maxInvestment);

            if (isNaN(minInvestmentValue) || isNaN(maxInvestmentValue)) {
              errorCount += 1;
              field.error = `${
                key === "minInvestment" ? "Minimum" : "Maximum"
              } investment value should be a number`;
              return { ...field };
            }

            if (minInvestmentValue > maxInvestmentValue) {
              errorCount += 1;
              field.error =
                "Minimum investment should be less than maximum investment";
            } else if (minInvestmentValue === maxInvestmentValue) {
              errorCount += 1;
              field.error =
                "Minimum and maximum investment values should not be the same";
            } else {
              field.error = ""; // No error
            }
            return { ...field };

          default:

            return field; // Return field as is for all other cases
        }
      }
    );

    // Update the form data with the validated fields
    setAllFormData({
      ...allFormData,
      formFields: {
        form_fields: updatedFormFields,
      },
    });

    return errorCount === 0;
  };

  // const handleSchemeValidations = async (): Promise<boolean> => {
  //   let errorCount = 0;

  //   const updatedFormFields = allFormData?.formFields?.form_fields?.map(
  //     (field: any) => {
  //       const key = field?.key;

  //       switch (key) {
  //         case "startDate":
  //         case "lastDate":
  //           let startDate =
  //             key === "startDate"
  //               ? field?.userInput
  //               : allFormData?.formFields?.form_fields?.find(
  //                   (f: any) => f?.key === "startDate"
  //                 )?.userInput;
  //           let endDate =
  //             key === "lastDate"
  //               ? field?.userInput
  //               : allFormData?.formFields?.form_fields?.find(
  //                   (f: any) => f?.key === "lastDate"
  //                 )?.userInput;

  //           if (!startDate || !endDate) {
  //             return field;
  //           }

  //           startDate = new Date(startDate).getTime();
  //           endDate = new Date(endDate).getTime();

  //           if (startDate > endDate && key === "startDate") {
  //             errorCount += 1;
  //             return {
  //               ...field,
  //               error: "Start date should be before the last date",
  //             };
  //           } else {
  //             return { ...field, error: "" };
  //           }

  //         case "minInvestment":
  //         case "maxInvestment":
  //           let minInvestment =
  //             key === "minInvestment"
  //               ? field?.userInput
  //               : allFormData?.formFields?.form_fields?.find(
  //                   (f: any) => f?.key === "minInvestment"
  //                 )?.userInput;

  //           let maxInvestment =
  //             key === "maxInvestment"
  //               ? field?.userInput
  //               : allFormData?.formFields?.form_fields?.find(
  //                   (f: any) => f?.key === "maxInvestment"
  //                 )?.userInput;

  //           // Remove commas before parsing the numbers
  //           minInvestment = minInvestment?.replace(/,/g, "");
  //           maxInvestment = maxInvestment?.replace(/,/g, "");

  //           if (!minInvestment || !maxInvestment) {
  //             return field;
  //           }

  //           // Validate the values are integers
  //           const minInvestmentParsed = parseInt(minInvestment);
  //           const maxInvestmentParsed = parseInt(maxInvestment);

  //           if (isNaN(minInvestmentParsed) || isNaN(maxInvestmentParsed)) {
  //             if (isNaN(minInvestmentParsed) && key === "minInvestment") {
  //               errorCount += 1;
  //               return {
  //                 ...field,
  //                 error: "Minimum investment value should be a number",
  //               };
  //             }
  //             if (isNaN(maxInvestmentParsed) && key === "maxInvestment") {
  //               errorCount += 1;
  //               return {
  //                 ...field,
  //                 error: "Maximum investment value should be a number",
  //               };
  //             }
  //           }

  //           // Check if minInvestment is greater than maxInvestment
  //           if (minInvestmentParsed > maxInvestmentParsed) {
  //             errorCount += 1;
  //             return {
  //               ...field,
  //               error:
  //                 "Minimum investment should be less than maximum investment",
  //             };
  //           }

  //           // Check if minInvestment is equal to maxInvestment
  //           if (minInvestmentParsed === maxInvestmentParsed) {
  //             errorCount += 1;
  //             return {
  //               ...field,
  //               error:
  //                 "Minimum and maximum investment values should not be the same",
  //             };
  //           }

  //           return { ...field, error: "" };

  //         default:
  //           return field;
  //       }
  //     }
  //   );

  //   // Update the form data with the validated fields
  //   setAllFormData({
  //     ...allFormData,
  //     formFields: {
  //       form_fields: updatedFormFields,
  //     },
  //   });

  //   return errorCount === 0; // Return true if there are no errors, otherwise false
  // };

  return (
    <FormHandlerContext.Provider
      value={{
        handleSectionCompletionTrack,
        onChange,
        handleValidationChecks,
        updatePanFormField,
        onFileChange,
        handleDocumentValidations,
        handleSchemeValidations,
      }}
    >
      {children}
    </FormHandlerContext.Provider>
  );
};

export default FormHandlerProviders;
