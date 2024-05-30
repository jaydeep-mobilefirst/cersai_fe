import InputFields from "../common/InputField";
import TextArea from "../form/TextArea";
import SelectButton from "../form/SelectButton";
import DatePicker from "../form/DatePicker";
import DscButton from "../form/Dscbutton";
import RequiredStar from "./RequiredStar";
import folderOpen from "../../../assets/images/folder-open.svg";
import UploadIcon from "../../../assets/images/UploadIcon.png";
import ViewFile from "./ViewFile";
import DeleteFileButton from "../common/DeleteFileButton";

type Props = {
  toggleUploadPopup?: () => void;
  setFieldData ?: (data: any) => void;
  allFormData ?: any;
  formFields ?: any[];
  onChange ?: (
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
  sectionId ?: number

};

const DynamicFields = ({
  formFields,
  onChange,
  allFormData,
  documentFields,
  onFileChange,
  setFieldData,
  toggleUploadPopup,
  sectionId
}: Props) => {

  console.log({sectionId, documentFields});


  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                <div>
                  <label
                    htmlFor={field?.label}
                    className="block text-[#000000] text-base font-normal text-gilroy-medium"
                  >
                    {field?.label}
                    <RequiredStar allFormData={allFormData} field={field} />
                  </label>
                  <InputFields
                    disabled={field?.disabled ? field?.disabled : false}
                    value={field?.userInput}
                    onChange={(e) => onChange && onChange && onChange(e, field, fieldType)}
                    type={fieldType}
                    id={field?.label}
                    placeholder={field?.placeholder}
                  />
                  <span className="text-red-500">{field?.error}</span>
                </div>
              );
            case "textarea":
              return (
                <div className="">
                  <label
                    htmlFor={field?.label}
                    className="text-base font-normal text-text-gilroy-medium"
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
                    onChange={(e) => onChange && onChange(e, field, fieldType)}
                    id={field?.label}
                    placeholder={field?.placeholder}
                  />
                  <span className="text-red-500">{field?.error}</span>
                </div>
              );
            case "select":
              return (
                <div>
                  <label
                    htmlFor="district"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    {field?.label}{" "}
                    <RequiredStar allFormData={allFormData} field={field} />
                  </label>
                  <SelectButton
                    onSelect={(data) => onChange && onChange(data, field, fieldType)}
                    options={field?.dropdown_options?.options?.map(
                      (d: any) => ({
                        value: d?.name,
                        label: d?.name,
                        id: d?.id,
                      })
                    )}
                    selectedOption={field?.userInput}
                    placeholder={field?.placeholder}
                    //  searchInputOnchange={handleSearchInputChange3}
                    //  searchInputValue={searchInputValue3}
                    showSearchInput={true}
                  />
                  <span className="text-red-500">{field?.error}</span>
                </div>
              );
            case "date_picker":
              return (
                <div>
                  <label
                    htmlFor="district"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    {field?.label}{" "}
                    <RequiredStar allFormData={allFormData} field={field} />
                  </label>
                  <DatePicker
                    onChange={(e) => onChange && onChange(e, field, fieldType)}
                    userValue={field?.userInput}
                  />
                  <span className="text-red-500">{field?.error}</span>
                </div>
              );
            case "pincode":
              return (
                <div>
                  <label
                    htmlFor={field?.label}
                    className="block text-[#000000] text-base font-normal text-gilroy-medium"
                  >
                    {field?.label}
                    <RequiredStar allFormData={allFormData} field={field} />
                  </label>
                  <InputFields
                    max={6}
                    min={6}
                    value={field?.userInput}
                    onChange={(e) => onChange && onChange(e, field, fieldType)}
                    type={"number"}
                    id={field?.label}
                    placeholder={field?.placeholder}
                  // disabled={field?.disabled ? field?.disabled : false}
                  />
                  <span className="text-red-500">{field?.error}</span>
                </div>
              );

            case "DSC":
              return (
                <div className="flex flex-col">
                  <label
                    htmlFor={field?.label}
                    className="block text-[#000000] text-base font-normal text-gilroy-medium"
                  >
                    {field?.label}
                    <RequiredStar allFormData={allFormData} field={field} />
                  </label>
                  <DscButton
                    onFileUpload={(file) =>onChange && onChange(file, field, fieldType)}
                    fname={field?.dscFileNAme}
                    disabled={field?.disabled ? field?.disabled : false}
                  />
                  <span className="text-red-500">{field?.error}</span>
                </div>
              );
            default:
              return <></>;
          }
        })}
          </div>

      {documentFields &&
        documentFields
          ?.filter((f: any) => f.sectionId === sectionId)
          ?.map((data: any, idx: number) => {   
            const fieldType = allFormData?.fileTypes?.find(
              (type: any) => type?.id === data?.fileType
            )?.name;  
            return <div key={idx}>
              <div className="rounded-xl bg-[#E7F0FF] flex flex-col md:flex-row justify-between items-center p-4  text-gilroy-bold mb-4">
                <div className="flex flex-row items-center space-x-2 w-full">
                  <div className="mt-2">
                    <img
                      src={folderOpen}
                      alt="Folder Open Icon"
                      className="bg-white rounded p-1 text-white cursor-pointer"
                      onClick={() => {
                        if (toggleUploadPopup) {
                          toggleUploadPopup()
                        }
                        if (setFieldData) {
                          setFieldData(data)
                        }
                      }
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                  <h1 className="text-xs md:text-sm font-normal text-gilroy-medium text-gray-900">
                      {data?.documentName}
                      {data?.required && <span className="text-red-500">*</span>}
                    </h1>
                    <p className="text-xs md:text-base font-normal text-gilroy-medium text-gray-400">
                      {data?.fileName !== "" && data?.fileName !== undefined ? data?.fileName : "No Document uploaded"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row mt-1 justify-end w-full md:w-auto">
                  {data?.uploadFileId && (
                    <DeleteFileButton 
                      fieldData={data}
                      fieldType={fieldType}
                      onFileChange={onFileChange}
                    />
                  )}
                  <div className="mt-1">
                    <button
                      type="button"
                      className="bg-[#1C468E] rounded-lg p-3 text-white flex justify-center items-center cursor-pointer ml-2 h-10 w-[70px]"
                      onClick={() => { 
                        if (toggleUploadPopup && !data?.uploadFileId) {
                        toggleUploadPopup()
                        }
                        if (setFieldData && !data?.uploadFileId) {
                          setFieldData(data)
                        }
                      }}
                    >
                      {data?.uploadFileId ? (
                        <ViewFile uploadFileId={data?.uploadFileId}/>
                      ) : (
                        <img
                          src={UploadIcon}
                          alt="Upload"
                          className="w-5"
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <span className="text-red-500">{data?.error}</span>
            </div>
          })}

          </>
  );
};

export default DynamicFields;
