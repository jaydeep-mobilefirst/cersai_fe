import React, { createContext } from 'react'
import { useDepositTakerRegistrationStore } from '../zust/deposit-taker-registration/registrationStore';
import { backendBaseUrl, backendBudsPortalBFFUrl, pincodeValidationUrl } from '../utils/api';
import axios from 'axios';

type Props = {
  children : React.ReactElement
}

interface IContextProps {
  onChange: (event: any | undefined, fieldData: any, fieldType: string) => Promise<void>
  updatePanFormField: (responseData: any, panFormField: any) => Promise<boolean>
  handleValidationChecks: (formFields: any[]) => Promise<boolean>
}

// declare function handleValidations(errors: any): void;

export const FormHandlerContext = createContext({} as IContextProps);

const FormHandlerProviders = ({children}: Props) => {
  const {allFormData, setAllFormData} = useDepositTakerRegistrationStore(state => state)
  const updateValue = (value : string | any[], fieldId : number) => {
    let modifiedFormFields = allFormData?.formFields?.form_fields?.map((o : any) => {
      if (o?.id === fieldId) {
        return {...o, userInput : value, error : value !== "" ? "" : o?.error};
      }
      else{
        return o;
      }
    })
    let obj = {
      ...allFormData,
      formFields : {form_fields : modifiedFormFields}
    }            
    setAllFormData(obj)
  }

  const updateDropdownOptionsForStateAndDistrict = (value : any[], fieldId : number, stateValue : string, stateId : number) => {    
    let modifiedFormFields = allFormData?.formFields?.form_fields?.map((o : any) => {
      if (o?.id === fieldId) {
        let data = {...o, dropdown_options : {...o.dropdown_options, options : value}, error : ""}        
        return data;
      }
      if (o?.id === stateId) {
        let data = {...o, userInput : stateValue,  error : ""}        
        return data;
      }
      else{
        return o;
      }
    })
    
    let obj = {
      ...allFormData,
      formFields : {form_fields : modifiedFormFields}
    }            
    setAllFormData(obj)
  }


  const onChange = async (event : any = undefined, fieldData : any, fieldType : string) => {
    const inputFieldTypes = ["text", "textarea", "password", "number", "email", "phone_number"];
    if (inputFieldTypes.includes(fieldType) && event) {
      const {value} = event?.target;
      let inputValue : string = value;

      // Check for Pan Number form field
      // If Pan then make each letter into the capital
      const regex = /\bpan\b/i;
      if (regex.test(fieldData.label)) {
        inputValue = inputValue.toUpperCase();
      }

      if (fieldData?.label) {
        
      }

      updateValue(inputValue, fieldData?.id);     
    }
    else if (fieldType === "date_picker"){
    const { value } = event.target;
    updateValue(value, fieldData?.id);
    }
    else if (fieldType === "select") {
      if (fieldData?.dropdown_Components) {
        const dropdownData = allFormData?.dropdownData?.find((d : any) => d.id === fieldData?.dropdown_Components);
          if (dropdownData) {
          switch (dropdownData?.name) {
            case "state":
              let districtDropDownId = allFormData?.dropdownData?.find((d : any) => d.name === "district")?.id; 
              if (districtDropDownId) {
                let districtFormField = allFormData?.formFields?.form_fields?.find((f : any) => f?.dropdown_Components === districtDropDownId);
                let fetchDistricts = await axios.get(`${backendBaseUrl}/cms/location/district/${event?.id}?page=1&pagesize=50`)
                if (fetchDistricts.status > 300 || fetchDistricts?.status < 200) {
                  alert("Error Fetching Districts! Please try again later!")
                }
                let districts = await fetchDistricts.data?.data?.list;
                updateDropdownOptionsForStateAndDistrict(districts, districtFormField?.id, event?.value, fieldData?.id)
              }
              break;
          
            default:
              updateValue(event?.value, fieldData?.id);
              break;
          }
        }
      }
    }
    else if(fieldType === "pincode"){
      const { value } = event.target;
      if (value?.length <= 6) {
        updateValue(value, fieldData?.id);
      }

      if (value.length === 6) {
       const response = await axios.get(`${pincodeValidationUrl}/${value}`)
       const data = response?.data;  
       console.log({data});
       let stateFormField = allFormData?.formFields?.form_fields?.find((o : any) => o?.label?.toLowerCase() === "state" && fieldData?.sectionId === o?.sectionId);
       let districtFormField = allFormData?.formFields?.form_fields?.find((o : any) => o?.label?.toLowerCase() === "district" && fieldData?.sectionId === o?.sectionId);
        if (data[0]?.Status === "Success") {
          let locationData = data[0]?.PostOffice[0]
          console.log({locationData});
          
          handlePincodeSucess({
              districtField : districtFormField, 
              stateField : stateFormField, 
              stateValue : locationData?.State, 
              districtValue : locationData?.District,
              pinCodeField : fieldData,
              pinCodeValue : value         
            },
          true
          )          
        }
        else{
          handlePincodeSucess({
            districtField : districtFormField, 
            stateField : stateFormField, 
            stateValue : "", 
            districtValue : "",
            pinCodeField : fieldData,
            pinCodeValue : value         
          },
        false
        )     
        }
      }
    }
  }

  const handlePincodeSucess = (data : {stateField : any, stateValue : string, districtField : any, districtValue : string, pinCodeField : any, pinCodeValue : string}, disabled : boolean) => {    
    let modifiedFormFields = allFormData?.formFields?.form_fields?.map((o : any) => {
      if (o?.id === data?.stateField?.id) {
        return {...o, userInput : data?.stateValue, error : "", disabled : disabled};
      }
      else if(o?.id === data?.districtField?.id){
        return {...o, userInput : data?.districtValue, error : "", disabled : disabled};
      }
      else if (o?.id === data?.pinCodeField?.id){
        return {...o, userInput : data?.pinCodeValue, error : ""};
      }
      else{
        return o;
      }
    })
    let obj = {
      ...allFormData,
      formFields : {form_fields : modifiedFormFields}
    }            
    setAllFormData(obj)
  }

  const handleValidations = async(errorData : any) : Promise<void> => {
      let modifiedFormFields = allFormData?.formFields?.form_fields?.map((o : any) => {
        if (errorData === true) {
          return {...o, error : ""};
        }
        else{
          const errorField = errorData?.find((eData : any) => parseInt(eData?.formId) === o?.id);
          if (o?.id === parseInt(errorField?.formId)) {
            return {...o, error : errorField?.validationErrors[0]?.error};
          }
          else{
            return {...o, error : ""};
          }
        }
      })
      let obj = {
        ...allFormData,
        formFields : {form_fields : modifiedFormFields}
      }            
      setAllFormData(obj)
      return
  }

  const ValidationSubmitAPI = async (formFieldsForValidations : any[])  : Promise<boolean> => {
    try {
      const response = await axios?.post(`${backendBudsPortalBFFUrl}/validator/submit`, formFieldsForValidations)
      const data = await response?.data?.data;
      const success = await response?.data?.success;
  
      if (!success) {
        handleValidations(data?.errors);
      }
      else{
        handleValidations(true);
      }
      return success
    } catch (error) {
      return true
    }
    
  }

  const handleValidationChecks = async (formFields : any[]) : Promise<boolean> => {
    const formFieldsForValidations = formFields?.map((field : any) => {
      return {
        formId: field?.id?.toString(),
        fieldValue: field?.userInput,
        validations: field?.regFormFieldsValidations?.map((v : any) => {
          return {
            validationName : allFormData?.validations?.find((vd : any) => vd?.id === v?.validationId)?.vld_type_name,
            value : v?.patternValue
          }
        })
      }
    })   
    return await ValidationSubmitAPI(formFieldsForValidations);
  }

   const updatePanFormField = async (responseData : any, panFormField  : any) : Promise<boolean> => {
    if (responseData?.status !== "success") {
      let modifiedFormFields = allFormData?.formFields?.form_fields?.map((o : any) => {
        if (o?.id === panFormField?.id) {
          return {...o, error : responseData?.message}
        }
        else{
          return o;
        }
      })
      let obj = {
        ...allFormData,
        formFields : {form_fields : modifiedFormFields}
      }            
      setAllFormData(obj)

      return false;
    }
    return true;
  }

  return (
    <FormHandlerContext.Provider  value={{onChange, handleValidationChecks, updatePanFormField}}>
      {children}
    </FormHandlerContext.Provider>
  )
}

export default FormHandlerProviders