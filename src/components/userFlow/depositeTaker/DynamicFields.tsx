import React, { useEffect } from "react";
import InputFields from "../common/InputField";
import TextArea from "../form/TextArea";
import SelectButton from "../form/SelectButton";
import DatePicker from "../form/DatePicker";
import DscButton from "../form/Dscbutton";
import RequiredStar from "./RequiredStar";
import DynamicFileUpload from "./DynamicFileUpload";
import { useDepositTakerRegistrationStore } from "../../../zust/deposit-taker-registration/registrationStore";
import DscKeyRegister from "../form/DscKeyRegister";
import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import { useLocation } from "react-router-dom";
import useStore from "../../../store/statusStore";

type Props = {
  toggleUploadPopup?: () => void;
  setFieldData?: (data: any) => void;
  allFormData?: any;
  formFields?: any[];
  onChange?: (
    event: any | undefined,
    fieldData: any,
    fieldType: string
  ) => Promise<void>;
  documentFields?: any[];
  onFileChange?: (
    event: any | undefined,
    field: any,
    fieldType: string
  ) => Promise<void>;
  sectionId?: number;
  disable?: boolean;
};

const DynamicFields = ({ formFields, onChange, sectionId, disable }: Props) => {
  const isDscKeyAvbl = process.env.REACT_APP_IS_DSC_KEY_AVBL;
  const [isDscSelected, setDscSelected] = useState<boolean>(false);

  const location = useLocation();
  const { pathname } = location;

  const { allFormData, documentData } = useDepositTakerRegistrationStore(
    (state) => state
  );
  const today = new Date();

  const popperModifiers = [
    {
      name: "offset",
      options: {
        offset: [0, -15], // Adjust the vertical offset value (second value) to 0 or a negative number
      },
    },
  ];

  const { data, loading, error, fetchData } = useStore();

  useEffect(() => {
    if(checkPathName(pathname)){
    fetchData(); // Trigger the API call when the component mounts
    }
  }, [fetchData]);

  const disabledField = sessionStorage.getItem("user_status");

  const checkStatus = (status: any): any => {
    switch (disabledField) {
      case "TRANSIT":
        return true;
      case "MOD_REFER_TO_REGULATOR":
        return true;
      case "REFER_TO_REGULATOR":
        return true;
      case "MOD_TRANSIT":
        return true;
      case "PENDING":
        return true;
      case "MOD_PENDING":
        return true;
      default:
        return false;
    }
  };

  const checkPathName = (status: any): any => {
    switch (pathname) {
      case "/dt/profile":
        return true;
      case "/rg/profile":
        return true;
      case "/dc/profile":
        return true;
      case "/ca/profile":
        return true;
      default:
        return false;
    }
  };

  if (pathname == "/dt/profile") {
    var disableFieldStatus = checkPathName(pathname)
      ? disabledField == "RETURNED"
        ? false
        : !data?.profileUpdate
      : !data?.profileUpdate;
  } else {
    disableFieldStatus = checkPathName(pathname)
      ? checkStatus(disabledField)
      : false;
  }

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
        {formFields &&
          formFields?.length > 0 &&
          formFields?.map((field: any) => {
            const fieldType = allFormData?.fieldTypes?.find(
              (type: any) => type?.id === field?.typeId
            )?.name;

            switch (fieldType) {
              case "text":
              case "number":
              case "password":
              case "phone_number":
              case "email":
                return (
                  <Tooltip
                    title={field?.label}
                    arrow
                    PopperProps={{
                      modifiers: popperModifiers,
                    }}
                  >
                    <div>
                      <label
                        htmlFor={field?.label}
                        className='block text-[#000000] text-base font-normal text-gilroy-medium whitespace-nowrap overflow-x-auto custom-scrollbar1'
                      >
                        {field?.label}
                        <RequiredStar allFormData={allFormData} field={field} />
                      </label>

                      <InputFields
                        disabled={
                          disableFieldStatus
                            ? disableFieldStatus
                            : field?.disabled
                            ? field?.disabled
                            : false
                        }
                        // disabled={(field?.label === "PAN NUMBER" || field?.label ==="Company Name (As per Pan)")}
                        value={field?.userInput}
                        onChange={(e) =>
                          onChange && onChange && onChange(e, field, fieldType)
                        }
                        type={fieldType}
                        id={field?.label}
                        placeholder={field?.placeholder}
                      />
                      <span className='text-red-500'>{field?.error}</span>
                    </div>
                  </Tooltip>
                );
              case "textarea":
                return (
                  <Tooltip
                    title={field?.label}
                    arrow
                    PopperProps={{
                      modifiers: popperModifiers,
                    }}
                  >
                    <div className=''>
                      <label
                        htmlFor={field?.label}
                        className='text-base font-normal text-text-gilroy-medium whitespace-nowrap overflow-x-auto custom-scrollbar1'
                      >
                        {field?.label}{" "}
                        <RequiredStar allFormData={allFormData} field={field} />
                        {/* {field?.regFormFieldsValidations && 
                      field?.regFormFieldsValidations?.some((v : any) => v?.validationId === allFormData?.validations?.find((d : any) => d?.vld_type_name === "Required")?.id)
                      &&
                      <span className="text-[#ff0000]">*</span>} */}
                      </label>

                      <TextArea
                        value={field?.userInput}
                        disabled={
                          disableFieldStatus
                            ? disableFieldStatus
                            : field?.disabled
                            ? field?.disabled
                            : false
                        }
                        onChange={(e) =>
                          onChange && onChange(e, field, fieldType)
                        }
                        id={field?.label}
                        placeholder={field?.placeholder}
                      />
                      <span className='text-red-500'>{field?.error}</span>
                    </div>
                  </Tooltip>
                );
              case "select":
              case "select_with_search":
                return (
                  <Tooltip
                    title={field?.label}
                    arrow
                    PopperProps={{
                      modifiers: popperModifiers,
                    }}
                  >
                    <div>
                      <label
                        htmlFor='district'
                        className='text-base font-normal text-gilroy-medium whitespace-nowrap overflow-x-auto custom-scrollbar1'
                      >
                        {field?.label}{" "}
                        <RequiredStar allFormData={allFormData} field={field} />
                      </label>
                      <SelectButton
                        data={field}
                        onSelect={(data) =>
                          onChange && onChange(data, field, fieldType)
                        }
                        options={field?.dropdown_options?.options?.map(
                          (d: any) => ({
                            value: d?.name,
                            label: d?.name,
                            id: d?.id,
                          })
                        )}
                        selectedOption={field?.userInput}
                        placeholder={field?.placeholder}
                        disabled={
                          disableFieldStatus
                            ? disableFieldStatus
                            : field?.disabled
                        }
                        //  searchInputOnchange={handleSearchInputChange3}
                        //  searchInputValue={searchInputValue3}
                        showSearchInput={true}
                        enableSearch={fieldType === "select_with_search"}
                      />
                      <span className='text-red-500'>{field?.error}</span>
                    </div>
                  </Tooltip>
                );
              case "date_picker":
                return (
                  <Tooltip
                    title={field?.label}
                    arrow
                    PopperProps={{
                      modifiers: popperModifiers,
                    }}
                  >
                    <div>
                      <label
                        htmlFor='district'
                        className='text-base font-normal text-gilroy-medium whitespace-nowrap overflow-x-auto custom-scrollbar1'
                      >
                        {field?.label}{" "}
                        <RequiredStar allFormData={allFormData} field={field} />
                      </label>
                      <DatePicker
                        maxDate={field?.key || field?.label}
                        disabled={
                          disableFieldStatus
                            ? disableFieldStatus
                            : field?.disabled
                            ? field?.disabled
                            : false
                        }
                        onChange={(e) =>
                          onChange && onChange(e, field, fieldType)
                        }
                        userValue={field?.userInput}
                      />
                      <span className='text-red-500'>{field?.error}</span>
                    </div>
                  </Tooltip>
                );
              case "pincode":
                return (
                  <Tooltip
                    title={field?.label}
                    arrow
                    PopperProps={{
                      modifiers: popperModifiers,
                    }}
                  >
                    <div>
                      <label
                        htmlFor={field?.label}
                        className='block text-[#000000] text-base font-normal text-gilroy-medium whitespace-nowrap overflow-x-auto custom-scrollbar1'
                      >
                        {field?.label}
                        <RequiredStar allFormData={allFormData} field={field} />
                      </label>
                      <InputFields
                        // max={6}
                        // min={6}
                        value={field?.userInput}
                        onChange={(e) =>
                          onChange && onChange(e, field, fieldType)
                        }
                        type={"number"}
                        id={field?.label}
                        placeholder={field?.placeholder}
                        disabled={
                          disableFieldStatus
                            ? disableFieldStatus
                            : field?.disabled
                            ? field?.disabled
                            : false
                        }
                      />
                      <span className='text-red-500'>{field?.error}</span>
                    </div>
                  </Tooltip>
                );

              case "DSC":
                return (
                  <Tooltip
                    title={field?.label}
                    arrow
                    PopperProps={{
                      modifiers: popperModifiers,
                    }}
                  >
                    <div className='flex flex-col'>
                      <label
                        htmlFor={field?.label}
                        className='block text-[#000000] text-base font-normal text-gilroy-medium whitespace-nowrap overflow-x-auto custom-scrollbar1'
                      >
                        {field?.label}
                        <RequiredStar allFormData={allFormData} field={field} />
                      </label>

                      {isDscKeyAvbl === "true" ? (
                        <DscKeyRegister
                          disable={
                            disableFieldStatus
                              ? disableFieldStatus
                              : field?.disabled
                              ? field?.disabled
                              : false
                          }
                          onFileUpload={(file: any) =>
                            onChange && onChange(file, field, fieldType)
                          }
                          fieldData={field}
                          setDscSelected={setDscSelected}
                          isDscSelected={isDscSelected}
                        />
                      ) : (
                        <DscButton
                          onFileUpload={(file) =>
                            onChange && onChange(file, field, fieldType)
                          }
                          fname={field?.dscFileNAme}
                          disabled={
                            disableFieldStatus
                              ? disableFieldStatus
                              : field?.disabled
                              ? field?.disabled
                              : false
                          }
                        />
                      )}
                      <span className='text-red-500'>{field?.error}</span>
                    </div>
                  </Tooltip>
                );
              default:
                return <></>;
            }
          })}
      </div>

      {documentData &&
        documentData
          ?.filter((f: any) => f.sectionId === sectionId)
          ?.map((data: any, idx: number) => {
            return <DynamicFileUpload data={data} key={data?.id} />;
          })}
    </>
  );
};

export default DynamicFields;
