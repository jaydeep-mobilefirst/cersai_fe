import React from 'react'
import InputFields from '../common/InputField'
import TextArea from '../form/TextArea'
import SelectButton from '../form/SelectButton'
import DatePicker from '../form/DatePicker'
import DscButton from '../form/Dscbutton'
import RequiredStar from './RequiredStar'

type Props = {
    allFormData : any
    formFields : any[]
    onChange : (event: any | undefined, fieldData: any, fieldType: string) => Promise<void>

}

const DynamicFields = ({formFields, onChange, allFormData}: Props) => {
    console.log({allFormData});
    
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
    {
          formFields && formFields?.length > 0 && formFields?.map((field : any) => {
            const fieldType = allFormData?.fieldTypes?.find((type : any) => type?.id === field?.typeId)?.name;
            switch (fieldType) {
              case 'text':
              case 'number':
              case 'password':
              case "phone_number":
                return <div>
                  <label
                    htmlFor={field?.label}
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    {field?.label}
                    <RequiredStar allFormData={allFormData} field={field}/>
                  </label>
                  <InputFields
                    disabled={field?.disabled ? field?.disabled : false}
                    value={field?.userInput}
                    onChange={(e) => onChange(e, field, fieldType)}
                    type={fieldType}
                    id={field?.label}
                    placeholder={field?.placeholder}
                  />
                  <span className="text-red-500">
                    {field?.error}
                  </span>
                </div>
              case 'textarea':
                 return  <div className="">
                 <label
                   htmlFor={field?.label}
                   className="text-base font-normal text-text-gilroy-medium"
                 >
                   {field?.label} <RequiredStar allFormData={allFormData} field={field}/>
                    {/* {field?.regFormFieldsValidations && 
                      field?.regFormFieldsValidations?.some((v : any) => v?.validationId === allFormData?.validations?.find((d : any) => d?.vld_type_name === "Required")?.id)
                      &&
                      <span className="text-[#ff0000]">*</span>} */}
                 </label>
                 <TextArea
                   value={field?.userInput}
                   onChange={(e) => onChange(e, field, fieldType)}
                   id={field?.label}
                   placeholder={field?.placeholder}
                 />
                 <span className="text-red-500">
                    {field?.error}
                  </span>
               </div>
              case 'select':
                return                <div>
                <label
                  htmlFor="district"
                  className="text-base font-normal text-gilroy-medium"
                >
                  {field?.label} <RequiredStar allFormData={allFormData} field={field}/>
                </label>
                <SelectButton
                  onSelect={(data) => onChange(data, field, fieldType)}
                  options={field?.dropdown_options?.options?.map((d : any) => ({value : d?.name, label : d?.name, id : d?.id}))}
                  selectedOption={field?.userInput}
                  placeholder={field?.placeholder}
                 //  searchInputOnchange={handleSearchInputChange3}
                 //  searchInputValue={searchInputValue3}
                  showSearchInput={true}
                />
                <span className="text-red-500">
                    {field?.error}
                  </span>
              </div>
              case 'date_picker':
                return <div>
                <label
                  htmlFor="district"
                  className="text-base font-normal text-gilroy-medium"
                >
                  {field?.label} <RequiredStar allFormData={allFormData} field={field}/>
                </label>
                <DatePicker onChange={(e) => onChange(e, field, fieldType) } userValue={field?.userInput}/>
                <span className="text-red-500">
                    {field?.error}
                  </span>
              </div>
             case 'pincode':
              return <div>
                <label
                  htmlFor={field?.label}
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  {field?.label}
                  <RequiredStar allFormData={allFormData} field={field}/>
                </label>
                <InputFields
                  max={6}
                  min={6}
                  value={field?.userInput}
                  onChange={(e) => onChange(e, field, fieldType)}
                  type={"number"}
                  id={field?.label}
                  placeholder={field?.placeholder}
                />
                <span className="text-red-500">
                  {field?.error}
                </span>
              </div> 
              
            case "DSC3":
                return <div className='flex flex-col'>
                     <label
                  htmlFor={field?.label}
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  {field?.label}
                  <RequiredStar allFormData={allFormData} field={field}/>
                </label>
                <DscButton onFileUpload={(file) => onChange(file, field, fieldType)} fname={field?.dscFileNAme}/>
                <span className="text-red-500">
                  {field?.error}
                </span>
                </div>
              default:
                return <></>;
            }
          })
        }
    </div>
  )
}

export default DynamicFields