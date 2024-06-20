import React, { createContext } from "react";
import { useDepositTakerRegistrationStore } from "../zust/deposit-taker-registration/registrationStore";
import {
  backendBaseUrl,
  backendBudsPortalBFFUrl,
  bffUrl,
  pincodeValidationUrl,
} from "../utils/api";
import axios from "axios";
import { convertFileToBase64Async } from "../utils/fileConversion";
import Swal from "sweetalert2";
import { emailRegex, panRegex } from "../utils/commonFunction";

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
    isAdding?: boolean
  ) => Promise<boolean>;
  handleDocumentValidations: (sectionId: number | number[]) => Promise<boolean>;
  handleSectionCompletionTrack: (
    sectionId: number,
    flag: boolean
  ) => Promise<void>;
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
  } = useDepositTakerRegistrationStore((state) => state);
  const updateValue = (
    value: string | any[],
    fieldId: number,
    dscFileNAme: string = ""
  ) => {
    console.log({ value, fieldId, allFormData });
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
    // console.log(modifiedFormFields, "modifiedFormField");
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
    console.log({ event, field, fieldType });

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

            const fileUpload = await axios.post(
              `${bffUrl}/openkm/save/temp/file`,
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
              await axios.delete(
                `${bffUrl}/openkm/file/delete/${field?.uploadFileId}`
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
      console.log({ value, fieldData });
      let inputValue: string = value;

      const regex = /\bpan\b/i;
      if (regex.test(fieldData.label)) {
        inputValue = inputValue.toUpperCase();
      }

      updateValue(inputValue, fieldData?.id);
    } else if (fieldType === "date_picker") {
      const { value } = event.target;
      updateValue(value, fieldData?.id);
    } else if (fieldType === "select") {
      updateValue(event?.value, fieldData?.id);
    } else if (fieldType === "pincode") {
      const { value } = event.target;
      if (value?.length <= 6) {
        updateValue(value, fieldData?.id);
      }

      if (value.length === 6) {
        const response = await axios.get(`${pincodeValidationUrl}/${value}`);
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
      }
    } else if (fieldType === "DSC") {
      const file = event;
      const base64String: string = await convertFileToBase64Async(file);
      updateValue(base64String, fieldData?.id, file?.name);
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
        } else {
          const errorField = errorData?.find(
            (eData: any) => parseInt(eData?.formId) === o?.id
          );
          if (o?.id === parseInt(errorField?.formId)) {
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
      const response = await axios?.post(
        `${backendBudsPortalBFFUrl}/validator/submit`,
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
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server Error : Code 500",
        text: "Error while validating fields, Please try later!",
      });
      return false;
    }
  };

  const handleValidationChecks = async (
    formFields: any[],
    isAdding: boolean = true
  ): Promise<boolean> => {
    const formFieldsForValidations = formFields?.map((field: any) => {
      return {
        formId: field?.id?.toString(),
        fieldValue: field?.userInput,
        validations: field?.regFormFieldsValidations?.map((v: any) => {
          return {
            validationName: allFormData?.validations?.find(
              (vd: any) => vd?.id === v?.validationId
            )?.vld_type_name,
            value: v?.patternValue,
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
          )
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
  const ValidateDeDup = async (formFields: any[]): Promise<boolean> => {
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
      /nodal officer/i.test(field?.label)
    );
    let URL = isNodalSection
      ? deDupURLs["nodal"]
      : deDupURLs[allFormData?.currentEntity?.entityCode];
    let filteredFields = formFields?.filter(
      (f: any) =>
        /mobile/i.test(f?.label) ||
        /email/i.test(f?.label) ||
        /Pan Number/i.test(f?.label) ||
        /emailid/i.test(f?.label)
    );
    const promises = filteredFields.map(async (field: any) => {
      try {
        const checkDeDup = await axios.post(`${bffUrl}/${URL}`, {
          value: field?.userInput,
        });

        const data = checkDeDup.data;
        console.log({ data });

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

    await Promise.all(promises);
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

  return (
    <FormHandlerContext.Provider
      value={{
        handleSectionCompletionTrack,
        onChange,
        handleValidationChecks,
        updatePanFormField,
        onFileChange,
        handleDocumentValidations,
      }}
    >
      {children}
    </FormHandlerContext.Provider>
  );
};

export default FormHandlerProviders;
