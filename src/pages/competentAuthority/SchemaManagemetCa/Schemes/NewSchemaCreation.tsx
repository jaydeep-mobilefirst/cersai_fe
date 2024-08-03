import { useContext, useEffect, useState } from "react";
import { useScreenWidth } from "../../../../utils/screenSize";
import TaskTabsCa from "../../../../components/ScehmaManagement/TaskTabsCa";
import { useDepositTakerRegistrationStore } from "../../../../zust/deposit-taker-registration/registrationStore";
import { useNavigate } from "react-router-dom";
import { FormHandlerContext } from "../../../../contextAPI/useFormFieldHandlers";
import axios from "axios";
import { bffUrl } from "../../../../utils/api";
import DynamicFields from "../../../../components/userFlow/depositeTaker/DynamicFields";
import LoaderSpin from "../../../../components/LoaderSpin";
import SuccessPopup from "../../../../components/userFlow/depositeTaker/SuccessPopUp";
const SchemeDetails = () => {
  const navigate = useNavigate();
  const screenWidth = useScreenWidth();
  const [isChecked, setIsChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [popupData, setPopData] = useState({
    para1: "",
    para2: "",
    show: false,
  });
  const [loader, setLoader] = useState(false);
  const { setAllFormData, setAllDocumentData, allFormData } =
    useDepositTakerRegistrationStore((state) => state);
  const { onChange, handleValidationChecks, handleSchemeValidations } =
    useContext(FormHandlerContext);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  useEffect(() => {
    fetchSchema();
  }, []);
  const fetchSchema = async () => {
    try {
      const response = await axios.get(`${bffUrl}/scheme/field-data/2`);
      if (response.data.success) {
        const formFields = response?.data?.data?.formFields?.allFormFields.map(
          (field: any) => ({
            ...field,
            userInput: "",
            error: "",
            typeId: field?.fieldTypeId,
            // id: field.fieldTypeId,
          })
        );

        setAllFormData({
          ...response?.data?.data,
          formFields: {
            form_fields: formFields?.map((field: any) => {
              if (field?.key === "depositTakerId") {
                return {
                  ...field,
                  dropdown_options: {
                    ...field?.dropdown_options,
                    options: field?.dropdown_options?.options?.map(
                      (o: any) => ({
                        name: o?.uniqueId,
                        id: o?.companyName,
                      })
                    ),
                  },
                };
              } else {
                return field;
              }
            })?.sort((a : any, b : any) => a.sortOrder - b.sortOrder),
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
  const entityType = sessionStorage.getItem("entityUniqueId");
  const onSubmit = async (event: any) => {
    event.preventDefault();
    setLoader(true);
    let isFormValid = await handleValidationChecks(
      allFormData?.formFields?.form_fields
    );
    if (!isFormValid) {
      setLoader(false);
      return;
    }
    else{
      // returns true if no error 
      const schemeValidations = await handleSchemeValidations();
      if (schemeValidations === false) {
        setLoader(false);
        return;
      }
      }
    try {
      // Mapping over the form fields to prepare the formData
      let formData = allFormData.formFields.form_fields.map((field: any) => ({
        fieldId: field.id,
        value: field.userInput,
        key: field.key,
        label : field?.label
      }));

      // Creating the payload object that includes both formData and depositTakerId
      const payload = {
        createdBy: entityType,
        formData: formData,
      };

      // Making the POST request with axios
      const response = await axios.post(
        `${bffUrl}/scheme-portal/add-form-fields`, // Assuming bffUrl is defined elsewhere
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

  
  const handleOnchange = async ( event: any,
    fieldData: any,
    fieldType: string) => {
      if (fieldData?.key === "depositTakerId") {
        const res = await axios.get(bffUrl + '/deposit-taker/branch/' + event?.value)
        let data = res.data;
        let branches = data?.data?.branches?.map((b: any) => {
          return {
            name: b?.pinCode + " " + b?.district + " " + b?.state,
            id: b?.id
          }
        })
        
          setAllFormData({
            ...allFormData,
            formFields : {
              form_fields : allFormData?.formFields?.form_fields?.map((f : any) => {
                if (f?.key === 'branch') {                  
                  return {
                    ...f,
                    dropdown_options : {...f?.dropdown_options, options : branches}
                  }
                }
                else if (f?.key === "depositTakerId") {
                  return {...f, userInput : event?.value}
                }
                else{
                  return f;
                }
              })
            }
          })
          
      }
      else{
        onChange(event, fieldData, fieldType)
      }
  }
  return (
    <div
      className="mt-6 mx-8 relative"
      style={{ minHeight: "calc(100vh - 110px)" }}
    >
      <div className="mt-2 ">
        <TaskTabsCa />
      </div>
      <div className="-ml-7">
        <div className="flex items-center justify-between flex-col h-full mx-10 my-0  ">
          <div className="w-full mb-40">
            <div className="mt-10">
              <DynamicFields
                formFields={allFormData?.formFields?.form_fields}
                allFormData={allFormData}
                onChange={handleOnchange}
              />
            </div>
            <div className="flex flex-shrink-0 mt-[20px]">
              <div className="opacity-30 w-[24px] h-[24px] justify-center align-center">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  placeholder="ischecked"
                />
              </div>
              <div className="leading-[24px]">
                I declare all the Information provided is correct as per my
                knowledge.
              </div>
            </div>
          </div>
          <SuccessPopup
            closePopup={() => {
              setPopData({ ...popupData, show: false });
              if (submitted) {
                navigate("/ca/my-task");
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
                  onClick={() => navigate("/ca/my-task")}
                  className="text-[#1c468e] text-gilroy-medium cursor-pointer"
                >
                  Discard
                </p>

                {/* <button
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
                </button> */}
                <button
                  onClick={onSubmit}
                  type="submit"
                  className={`bg-[#1c468e] rounded-xl p-3 text-white font-semibold text-sm text-gilroy-semibold ${
                    !isChecked
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-[#163a7a]"
                  }`}
                  style={{ width: "150px" }}
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
      </div>
    </div>
  );
};

export default SchemeDetails;
