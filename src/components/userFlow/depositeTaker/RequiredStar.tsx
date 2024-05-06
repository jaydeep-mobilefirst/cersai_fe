import React from 'react'

type Props = {
    field : any
    allFormData : any
}

const RequiredStar = ({field, allFormData}: Props) => {
  return (
    <>
    {field?.regFormFieldsValidations && 
                    field?.regFormFieldsValidations?.some((v : any) => v?.validationId === allFormData?.validations?.find((d : any) => d?.vld_type_name === "Required")?.id)
                    &&
                    <span className="text-[#ff0000] ml-1">*</span>}
    </>
  )
}

export default RequiredStar