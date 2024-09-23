// import { useContext, useEffect, useState } from "react";
// import { useScreenWidth } from "../../../../utils/screenSize";
// import TaskTabsRg from "../../../../components/ScehmaManagement/TaskTabsRg";
// import { useNavigate } from "react-router-dom";
// import DynamicFields from "../../../../components/userFlow/depositeTaker/DynamicFields";
// import { useDepositTakerRegistrationStore } from "../../../../zust/deposit-taker-registration/registrationStore";
// import { FormHandlerContext } from "../../../../contextAPI/useFormFieldHandlers";
// import LoaderSpin from "../../../../components/LoaderSpin";
// import SuccessPopup from "../../../../components/userFlow/depositeTaker/SuccessPopUp";
// import { axiosTokenInstance } from "../../../../utils/axios";

// const SchemeDetails = () => {
//   const [submitted, setSubmitted] = useState(false);
//   const [popupData, setPopData] = useState({
//     para1: "",
//     para2: "",
//     show: false,
//   });
//   const screenWidth = useScreenWidth();
//   const [isChecked, setIsChecked] = useState(false);
//   const [regulatorDetails, setDepositTakerId] = useState<any>();
//   const [loader, setLoader] = useState(false);
//   const navigate = useNavigate();

//   const handleBackButtonClick = () => {
//     navigate("/rg/my-task");
//   };
//   const { setAllFormData, setAllDocumentData, allFormData } =
//     useDepositTakerRegistrationStore((state) => state);
//   const { onChange, handleValidationChecks, handleSchemeValidations } =
//     useContext(FormHandlerContext);
//   useEffect(() => {
//     fetchSchema();
//     fetchFormFields();
//   }, []);
//   console.log("depsoitTakerId",allFormData?.formFields?.form_fields?.find((item:any)=>item.key==="depositTakerId")?.userInput)
  
//   const fetchFormFields = () => {   
//     axiosTokenInstance
//       .get(`/registration/field-data/1?status=addToProfile`)
//       .then(async (response) => {
//         if (response?.data?.success) {
//           let dtData: any = [];
//           try {
//             let depositTakerData = await axiosTokenInstance.get(
//               `/deposit-taker/${entityType}`
//             );

//             dtData =
//               depositTakerData?.data?.data?.depositTaker?.depositTakerFormData;
//           } catch (error) {
//             console.log("Error");
//           }
//           console.log({ dtData, response });

//           // console.log(dtData, "respnse--------------");
//           let modifiedFormFields = response.data.data?.formFields?.map(
//             (o: any) => ({
//               ...o,
//               userInput: dtData
//                 ? dtData?.find((data: any) => data?.fieldId === o?.id)?.value
//                 : "",
//               error: "",
//             })
//           );

//           let modifiedFileFields =
//             response?.data?.data?.registrationDocumentFields?.map((o: any) => ({
//               ...o,
//               file: dtData
//                 ? dtData?.find((data: any) => data?.fieldId === o?.id)?.value
//                 : "",
//               error: "",
//               fileName: dtData
//                 ? dtData?.find((data: any) => data?.fieldId === o?.id)?.value
//                 : "",
//               uploadFileId: dtData
//                 ? dtData?.find((data: any) => data?.fieldId === o?.id)?.value
//                 : "",
//             }));

//           let obj = {
//             ...response?.data?.data,
//             formFields: { form_fields: modifiedFormFields },
//           };
//           console.log(obj, "obj-----");
//           // setRegulatorData(obj?.formFields?.form_fields?.find((item:any)=>item.key ==="regulatorName")?.userInput)
//           // setAllFormData(obj);
//           // setAllDocumentData(modifiedFileFields);
//         } else {
//           throw new Error("Error getting data, Please try later!");
//         }
//         setLoader(false);
//       })
//       .catch((error: any) => {
//         console.log(error);
//         setLoader(false);
//       });
//   };
//   const fetchSchema = async () => {
//     try {
//       const response = await axiosTokenInstance.get(`/scheme/field-data/2`);

//       if (response.data.success) {
//         const formFields = response?.data?.data?.formFields?.allFormFields.map(
//           (field: any) => ({
//             ...field,
//             userInput: "",
//             error: "",
//             typeId: field?.fieldTypeId,
//             // id: field.fieldTypeId,
//           })
//         );

//         setAllFormData({
//           ...response?.data?.data,
//           formFields: {
//             form_fields: formFields?.map((field: any) => {
//               if (field?.key === "depositTakerId") {
//                 return {
//                   ...field,
//                   dropdown_options: {
//                     ...field?.dropdown_options,
//                     options: field?.dropdown_options?.options
//                       ?.map((o: any) => ({
//                         name: o?.uniqueId,
//                         id: o?.companyName,
//                       }))
//                       ?.sort((a: any, b: any) => a.sortOrder - b.sortOrder),
//                   },
//                 };
//               } else {
//                 return field;
//               }
//             }),
//           },
//           fieldTypes: response?.data?.data?.fieldTypes,
//           validations: response?.data?.data?.validations,
//           fileTypes: response?.data?.data?.fileTypes,
//         });
   
//       }
//     } catch (error) {
//       console.error("Error fetching schema data:", error);
//     }
//   };
//   const entityType = sessionStorage.getItem("entityUniqueId");
//   const onSubmit = async (event: any) => {
//     event.preventDefault();
//     setLoader(true);
//     const isFormValid = await handleValidationChecks(
//       allFormData?.formFields?.form_fields
//     );
//     if (!isFormValid) {
//       setLoader(false);
//       return;
//     } else {
//       // returns true if no error
//       const schemeValidations = await handleSchemeValidations();
//       if (schemeValidations === false) {
//         setLoader(false);
//         return;
//       }
//     }
//     try {
//       // Mapping over the form fields to prepare the formData
//       // let formData = allFormData.formFields.form_fields.map((field: any) => ({
//       //   fieldId: field.id,
//       //   value: field.userInput,
//       //   key: field.key,
//       //   label : field?.label
//       // }));

//       let formData = allFormData.formFields.form_fields.map((field: any) => {
//         // Initialize the base object to be returned for each field
//         let fieldData = {
//           fieldId: field.id,
//           value: field.userInput,
//           key: field.key,
//           label: field.label,
//         };

//         // Special handling for the "Branch" field to match userInput with options
//         if (field.label === "Branch" && Array.isArray(field.userInput)) {
//           // Map user inputs to their corresponding IDs from the options
//           let branchIds = field.userInput
//             .map((userInputValue: any) => {
//               // Find the option that matches the userInputValue
//               const matchingOption = field.dropdown_options.options.find(
//                 (option: any) => option.name === userInputValue
//               );
//               return matchingOption ? matchingOption.id : null; // Return the ID if found, otherwise return null
//             })
//             .filter((id: any) => id !== null); // Filter out any null values if no match was found

//           fieldData.value = branchIds; // Set the value to the array of matched IDs
//           fieldData.value = JSON.stringify(branchIds);
//         }

//         return fieldData;
//       });

//       // Creating the payload object that includes both formData and depositTakerId
//       const payload = {
//         createdBy: entityType,
//         formData: formData,
//       };

//       // Making the POST request with axios
//       const response = await axiosTokenInstance.post(
//         `/scheme-portal/add-form-fields`, // Assuming bffUrl is defined elsewhere
//         payload // Sending the payload with depositTakerId and formData
//       );

//       if (response.data?.success) {
//         setSubmitted(true);
//         setPopData({
//           para1: "Addition Successful",
//           // para2: response.data?.message,
//           para2: `${response.data?.message} ID: ${response.data?.data?.newScheme?.uniqueId}`,
//           show: true,
//         });
//       } else {
//         setSubmitted(false);
//         setPopData({
//           para1: "Something went wrong",
//           para2: response.data?.message,
//           show: true,
//         });
//       }
//       setLoader(false);
//       // SuccessPopup();
//     } catch (error) {
//       setLoader(false);
//     }
//   };

//   const handleOnchange = async (
//     event: any,
//     fieldData: any,
//     fieldType: string
//   ) => {
//     if (fieldData?.key === "depositTakerId") {
//       const res = await axiosTokenInstance.get(
//         "/deposit-taker/branch/" + event?.value
//       );
//       let data = res.data;
//       let branches = data?.data?.branches?.map((b: any) => {
//         return {
//           name: b?.pinCode + " " + b?.district + " " + b?.state,
//           id: b?.id,
//         };
//       });
//       setAllFormData({
//         ...allFormData,
//         formFields: {
//           form_fields: allFormData?.formFields?.form_fields?.map((f: any) => {
//             if (f?.key === "branch") {
//               return {
//                 ...f,
//                 dropdown_options: { ...f?.dropdown_options, options: branches },
//               };
//             } else if (f?.key === "depositTakerId") {
//               return { ...f, userInput: event?.value };
//             } else {
//               return f;
//             }
//           }),
//         },
//       });
//     } else {
//       onChange(event, fieldData, fieldType);
//     }
//   };
//   const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setIsChecked(event.target.checked);
//   };
//   console.log("all-form-data------", allFormData);
//   return (
//     <div
//       className="mt-6 mx-8 relative"
//       style={{ minHeight: "calc(100vh - 110px)" }}
//     >
//       <div className="mt-2 ">
//         <TaskTabsRg />
//       </div>
//       <div className="-ml-7">
//         <div className="flex items-center justify-between flex-col h-full mx-10 my-0  ">
//           <div className="w-full mb-40">
//             <div className="mt-10">
//               <DynamicFields
//                 formFields={allFormData?.formFields?.form_fields}
//                 allFormData={allFormData}
//                 onChange={handleOnchange}
//               />
//             </div>
//             {/* <div className="flex flex-shrink-0 mt-[20px]">
//               <div className="opacity-30 w-[24px] h-[24px] justify-center align-center">
//                 <input
//                   type="checkbox"
//                   checked={isChecked}
//                   onChange={handleCheckboxChange}
//                   placeholder="ischecked"
//                 />
//               </div>
//               <div className="leading-[24px]">
//                 I declare all the Information provided is correct as per my
//                 knowledge.
//               </div>
//             </div> */}
//             <div className="flex flex-shrink-0 mt-[20px] justify-start items-center">
//               <div className="">
//                 <input
//                   type="checkbox"
//                   className="h-4 w-4 accent-[#1c648e]"
//                   checked={isChecked}
//                   onChange={handleCheckboxChange}
//                   placeholder="ischecked"
//                 />
//               </div>
//               <div className="leading-[24px] ml-4 text-gilroy-medium text-[14px]">
//                 I declare all the Information provided is correct as per my
//                 knowledge.
//               </div>
//             </div>
//           </div>
//           <SuccessPopup
//             closePopup={() => {
//               setPopData({ ...popupData, show: false });
//               if (submitted) {
//                 navigate("/rg/my-task");
//               }
//             }}
//             showPopup={() => {}}
//             toggle={popupData.show}
//             para1={popupData.para1}
//             para2={popupData.para2}
//             success={submitted}
//           />

//           <div className="w-full absolute bottom-0">
//             <div
//               className="flex w-full p-4 lg:px-[30px] flex-row justify-end items-center"
//               style={{
//                 width: `${
//                   screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"
//                 }`,
//               }}
//             >
//               <div className="flex items-center space-x-6">
//                 <p
//                   onClick={handleBackButtonClick}
//                   className="text-[#1c468e] text-gilroy-medium cursor-pointer"
//                 >
//                   Discard
//                 </p>

//                 <button
//                   onClick={onSubmit}
//                   type="submit"
//                   className={`bg-[#1c468e] rounded-xl p-3 text-white font-semibold text-sm text-gilroy-semibold ${
//                     !isChecked
//                       ? "opacity-50 cursor-not-allowed"
//                       : "hover:bg-[#163a7a]"
//                   }`}
//                   style={{ width: "150px" }}
//                   disabled={!isChecked}
//                 >
//                   {loader ? <LoaderSpin /> : "Create Scheme"}
//                 </button>
//               </div>
//             </div>
//             <div>
//               <div className="border-[#E6E6E6] border-[1px] lg:mt-4 "></div>

//               <p className="mb-[24px] text-gilroy-light text-center text-[#24222B] text-xs cursor-pointer mt-4">
//                 © 2024 Protean BUDs, All Rights Reserved.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SchemeDetails;
import { useContext, useEffect, useState } from "react";
import { useScreenWidth } from "../../../../utils/screenSize";
import TaskTabsRg from "../../../../components/ScehmaManagement/TaskTabsRg";
import { useNavigate } from "react-router-dom";
import DynamicFields from "../../../../components/userFlow/depositeTaker/DynamicFields";
import { useDepositTakerRegistrationStore } from "../../../../zust/deposit-taker-registration/registrationStore";
import { FormHandlerContext } from "../../../../contextAPI/useFormFieldHandlers";
import LoaderSpin from "../../../../components/LoaderSpin";
import SuccessPopup from "../../../../components/userFlow/depositeTaker/SuccessPopUp";
import { axiosTokenInstance } from "../../../../utils/axios";

const SchemeDetails = () => {
  const [submitted, setSubmitted] = useState(false);
  const [popupData, setPopData] = useState({
    para1: "",
    para2: "",
    show: false,
  });
  const screenWidth = useScreenWidth();
  const [isChecked, setIsChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [fetchRegulatorData, setRegulatorData] = useState<any>();
  const [dtId, setDtId] = useState<any>();
  console.log({ fetchRegulatorData }, "fetchRegulatorData");

  const handleBackButtonClick = () => {
    navigate("/rg/my-task");
  };
  const { setAllFormData, setAllDocumentData, allFormData } =
    useDepositTakerRegistrationStore((state) => state);
  const { onChange, handleValidationChecks, handleSchemeValidations } =
    useContext(FormHandlerContext);
  console.log({ allFormData }, "allFormData");
    

  const depositTakerId = allFormData?.formFields?.form_fields?.find(
    (field: any) => field?.key === "depositTakerId"
  )?.userInput;

  useEffect(() => {

    // setDtData(depositTakerId)
    // if (depositTakerId) {
    setDtId(depositTakerId)
      fetchFormFields();
    // }
  }, [dtId]);

  useEffect(() => {
    fetchSchema();
  }, []);

  const fetchFormFields = () => {
    axiosTokenInstance
      .get(`/registration/field-data/1?status=addToProfile`)
      .then(async (response) => {
        if (response?.data?.success) {
          let dtData: any = [];
          try {
            let depositTakerData = await axiosTokenInstance.get(
              `/deposit-taker/${depositTakerId}`
            );

            dtData =
              depositTakerData?.data?.data?.depositTaker?.depositTakerFormData;
            // setDtData(dtData?.find((item:any)=>item.fieldId===11)?.value)
            // console.log("regulator________value",dtData?.find((item:any)=>item.fieldId===11)?.value)
          } catch (error) {
            console.log("Error");
          }
          console.log({ dtData, response });

          // console.log(dtData, "respnse--------------");
          let modifiedFormFields = response.data.data?.formFields?.map(
            (o: any) => ({
              ...o,
              userInput: dtData
                ? dtData?.find((data: any) => data?.fieldId === o?.id)?.value
                : "",
              error: "",
            })
          );

          let modifiedFileFields =
            response?.data?.data?.registrationDocumentFields?.map((o: any) => ({
              ...o,
              file: dtData
                ? dtData?.find((data: any) => data?.fieldId === o?.id)?.value
                : "",
              error: "",
              fileName: dtData
                ? dtData?.find((data: any) => data?.fieldId === o?.id)?.value
                : "",
              uploadFileId: dtData
                ? dtData?.find((data: any) => data?.fieldId === o?.id)?.value
                : "",
            }));

          let obj = {
            ...response?.data?.data,
            formFields: { form_fields: modifiedFormFields },
          };
          console.log(obj, "obj-----");
          setRegulatorData(
            obj?.formFields?.form_fields?.find(
              (item: any) => item.key === "regulatorName" || item.key === "regulator" || item.key === "regulatorNameRG"
            )?.userInput
          );
          
          
          // setAllFormData(obj);
          // setAllDocumentData(modifiedFileFields);
        } else {
          throw new Error("Error getting data, Please try later!");
        }
        setLoader(false);
      })
      .catch((error: any) => {
        console.log(error);
        setLoader(false);
      });
  };
  const fetchSchema = async () => {
    try {
      const response = await axiosTokenInstance.get(`/scheme/field-data/2`);

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
        await fetchFormFields();

        setAllFormData({
          ...response?.data?.data,
          formFields: {
            form_fields: formFields?.map((field: any) => {
              if (field?.key === "depositTakerId") {
                return {
                  ...field,
                  dropdown_options: {
                    ...field?.dropdown_options,
                    options: field?.dropdown_options?.options
                      ?.map((o: any) => ({
                        name: o?.uniqueId,
                        id: o?.companyName,
                      }))
                      ?.sort((a: any, b: any) => a.sortOrder - b.sortOrder),
                  },
                };
              } else if (field?.key === "regulator" || field?.key === "regulatorName" || field?.key ==="regulatorNameRG") {
                console.log(field, "key");
                // fetchFormFields();
                // Ensure fetchRegulatorData is available
                const regulatorValue = fetchRegulatorData; // Default to empty string if not fetched yet
                console.log("regulatorValueregulatorValue", fetchRegulatorData);
                return {
                  ...field,
                  userInput: fetchRegulatorData,
                  disabled: true,
                  error: "",
                  typeId: field?.fieldTypeId,
                };
              } else {
                return field;
              }
            }),
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
      //   label : field?.label
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

      // Creating the payload object that includes both formData and depositTakerId
      const payload = {
        createdBy: entityType,
        formData: formData,
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
          // para2: response.data?.message,
          para2: `${response.data?.message} ID: ${response.data?.data?.newScheme?.uniqueId}`,
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

  const handleOnchange = async (
    event: any,
    fieldData: any,
    fieldType: string
  ) => {
    if (fieldData?.key === "depositTakerId") {
      const res = await axiosTokenInstance.get(
        "/deposit-taker/branch/" + event?.value
      );
      let data = res.data;
      let branches = data?.data?.branches?.map((b: any) => {
        return {
          name: b?.pinCode + " " + b?.district + " " + b?.state,
          id: b?.id,
        };
      });

      await fetchFormFields();
      setAllFormData({
        ...allFormData,
        formFields: {
          form_fields: allFormData?.formFields?.form_fields?.map((f: any) => {
            if (f?.key === "branch") {
              return {
                ...f,
                dropdown_options: { ...f?.dropdown_options, options: branches },
              };
            } else if (f?.key === "depositTakerId") {
              return { ...f, userInput: event?.value };
            } else if (f?.key === "regulator" || f?.key === "regulatorName" || f?.key === "regulatorNameRG") {
              return { ...f, userInput: fetchRegulatorData };
            } 
            else {
              return f;
            }
          }),
        },
      });
    } else {
      onChange(event, fieldData, fieldType);
    }
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  console.log("all-form-data------", allFormData);
  return (
    <div
      className="mt-6 mx-8 relative"
      style={{ minHeight: "calc(100vh - 110px)" }}
    >
      <div className="mt-2 ">
        <TaskTabsRg />
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
            {/* <div className="flex flex-shrink-0 mt-[20px]">
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
            </div> */}
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
                navigate("/rg/my-task");
              }
            }}
            showPopup={() => {}}
            toggle={popupData.show}
            para1={popupData.para1}
            para2={popupData.para2}
            success={submitted}
          />

          <div className="w-full absolute bottom-0">
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
