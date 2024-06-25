// import React, { useContext, useEffect, useState } from "react";
// import Accordion from "../../../../components/customAccordin/CustomAccordin";
// import VerificationDetails from "./VerificationDetails";
// import EntityDetails from "./EntityDetails";
// import NodalDetails from "./NodalDetails";
// import RegulatorDetails from "./RegulatorDetails";
// import TaskTabsRg from "../../../../components/ScehmaManagement/TaskTabsRg";
// import InfoIcon from "../../../../assets/images/info-circle.svg";
// import UploadIcon from "../../../../assets/images/directbox-send-White.svg";
// import UploadPopUp from "./UploadPopUp";
// import { useScreenWidth } from "../../../../utils/screenSize";
// import SuccessUploadPopUp from "./SuccessUploadPopUp";
// import { useNavigate } from "react-router-dom";

// import { useDepositTakerRegistrationStore } from "../../../../zust/deposit-taker-registration/registrationStore";
// import axios from "axios";
// import { bffUrl } from "../../../../utils/api";
// import DynamicFields from "../../../../components/userFlow/depositeTaker/DynamicFields";
// import { FormHandlerContext } from "../../../../contextAPI/useFormFieldHandlers";
// import LoaderSpin from "../../../../components/LoaderSpin";
// import SuccessPopup from "../../../../components/userFlow/depositeTaker/SuccessPopUp";

// interface AccordionItem {
//   header: React.ReactNode;
//   content: React.ReactNode;
// }

// const DepositeTakerSearchDetailsSM: React.FC = () => {
//   const navigate = useNavigate();

//   const handleCancelClick = () => {
//     navigate("/rg/deposit-taker");
//   };
//   const [uploadPopupOpen, setUploadPopupOpen] = useState(false);
//   const {
//     onChange,
//     handleValidationChecks,
//     onFileChange,
//     updatePanFormField,
//     handleDocumentValidations,
//   } = useContext(FormHandlerContext);
//   const [loader, setLoader] = useState<boolean>(false);
//   // console.log(onChange, "onchange");
//   const [successUploadPopupOpen, setSuccessUploadPopupOpen] = useState(false);
//   // const [accordionItems, setAccordionItems] = useState([]);
//   const [para1, setPara1] = useState("");
//   const [para2, setPara2] = useState("");
//   const [panSuccessModal, setPanSuccessModal] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [allVerified, setAllVerified] = useState(false);
//   const [submitModal, setSubmitModal] = useState(false);

//   const {
//     entities,
//     setEntities,
//     setAllFormData,
//     setAllDocumentData,
//     allFormData,
//     documentData,
//   } = useDepositTakerRegistrationStore((state) => state);
//   // console.log({ allFormData, documentData });
//   const fetchFormFields = () => {
//     axios
//       .get(`${bffUrl}/registration/field-data/${1}?status=addToRegistration`)
//       .then(async (response) => {
//         if (response?.data?.success) {
//           let dropdownData = undefined;
//           try {
//             let dropdownOptionsRes = await axios.get(
//               `${bffUrl}/registration/dropdown-components`
//             );
//             dropdownData = dropdownOptionsRes?.data?.data;
//           } catch (error) {
//             console.log("Error");
//           }
//           let modifiedFormFields = response?.data?.data?.formFields
//             ?.sort((a: any, b: any) => a.sortOrder - b.sortOrder)
//             ?.map((o: any) => ({ ...o, userInput: "", error: "" }));
//           let modifiedFileFields =
//             response?.data?.data?.registrationDocumentFields?.map((o: any) => ({
//               ...o,
//               file: "",
//               error: "",
//               fileName: "",
//             }));
//           console.log({ response });

//           let obj = {
//             dropdownData,
//             ...response?.data?.data,
//             formFields: { form_fields: modifiedFormFields },
//             // currentEntity: selectedRadio,
//           };
//           setAllFormData(obj);
//           setAllDocumentData(modifiedFileFields);
//           // setSections(
//           //   response?.data?.data?.entitySections?.map((e: any) => ({
//           //     ...e,
//           //     completed: false,
//           //   }))
//           // );
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

//   useEffect(() => {
//     fetchFormFields();
//   }, []);

//   const handleUploadClick = () => {
//     setUploadPopupOpen(true);
//   };

//   const handleClosePopup = () => {
//     setUploadPopupOpen(false);
//   };
//   const handleSuccessUploadClick = () => {
//     setSuccessUploadPopupOpen(true);
//   };

//   const handleSuccessClosePopup = () => {
//     setSuccessUploadPopupOpen(false);
//   };
//   const screenWidth = useScreenWidth();

//   const excludedSectionNames = ["Upload Documents"];

//   const accordionItems =
//     allFormData?.entitySections
//       ?.filter(
//         (section: any) => !excludedSectionNames.includes(section.sectionName)
//       )
//       .map((section: any) => {
//         const formFields = allFormData?.formFields?.form_fields?.filter(
//           (f: any) => f.sectionId === section.id
//         );
//         const hasError = formFields.some((field: any) => field.error);

//         return {
//           header: section?.sectionName,
//           content: (
//             <div key={section.id}>
//               <DynamicFields
//                 allFormData={allFormData}
//                 formFields={formFields}
//                 onChange={onChange}
//               />
//             </div>
//           ),
//           hasError: hasError,
//         };
//       }) || [];
//   // const verifyPan = async (): Promise<boolean> => {
//   //   try {
//   //     let company = allFormData?.formFields?.form_fields?.find((field: any) =>
//   //       /Company Name/i.test(field?.label)
//   //     );
//   //     let pan = allFormData?.formFields?.form_fields?.find((field: any) =>
//   //       /PAN Number/i.test(field?.label)
//   //     );

//   //     let response = await axios.post(
//   //       "http://34.149.91.231/cms/pandirectory/api",
//   //       {
//   //         name: company?.userInput?.toUpperCase(),
//   //         pan_no: pan?.userInput,
//   //       }
//   //     );
//   //     const data = response.data;
//   //     if (data?.status !== "success") {
//   //       setPara1(`Verification Failed`);
//   //       setPara2(`${data?.message}`);
//   //       setSubmitted(false);
//   //       setPanSuccessModal(true);
//   //       return false;
//   //     }

//   //     const panUpdate = updatePanFormField(data, pan);

//   //     setPara1(`Verification Successful`);
//   //     setPara2(`Your PAN Details have been successfully verified.`);
//   //     setPanSuccessModal(true);

//   //     return panUpdate;
//   //   } catch (error) {
//   //     console.error("Error while verifying PAN:", error);
//   //     alert("Error while verifying PAN, please try later!");
//   //     return false;
//   //   }
//   // };

//   const verifyPan = async (): Promise<boolean> => {
//     try {
//       let company = allFormData?.formFields?.form_fields?.find(
//         (field: any, i: number) => /Company Name/i.test(field?.label)
//       );
//       let pan = allFormData?.formFields?.form_fields?.find(
//         (field: any, i: number) => /PAN Number/i.test(field?.label)
//       );

//       let response = await axios.post(
//         "http://34.149.91.231/cms/pandirectory/api",
//         {
//           name: company?.userInput?.toUpperCase(),
//           pan_no: pan?.userInput,
//         }
//       );
//       const data = response.data;
//       if (data?.status !== "success") {
//         setPara1(`Verification Failed`);
//         setPara2(`${data?.message}`);
//         setSubmitted(false);
//         setPanSuccessModal(true);
//       }

//       const panUpdate = updatePanFormField(data, pan);

//       return panUpdate;
//     } catch (error) {
//       alert("Error while verifying pan, Please try later!");
//       return false;
//     }
//   };
//   const onSubmit = async (event: any) => {
//     event?.preventDefault();
//     setLoader(true);

//     const isFormValid = await handleValidationChecks(
//       allFormData?.formFields?.form_fields
//     );

//     if (!isFormValid) {
//       setLoader(false);
//       console.log("Form validation failed");

//       return; // Stop the submission process here if the form is invalid
//     }

//     let panVerified = await verifyPan();
//     console.log({ panVerified });

//     if (panVerified) {
//       let finalResult = allFormData?.formFields?.form_fields?.map(
//         (field: any) => {
//           let sectionCode = allFormData?.entitySections?.find(
//             (section: any) => section?.id === field?.sectionId
//           )?.sectionName;
//           return {
//             fieldId: field?.id,
//             label: field?.label,
//             sectionCode: sectionCode,
//             value: field?.userInput,
//             key: field?.key,
//           };
//         }
//       );

//       try {
//         const response = await axios.post(
//           bffUrl + "/deposit-taker/add-form-fields",
//           {
//             formData: finalResult,
//           }
//         );
//         console.log({ response });
//         const data = response.data;
//         if (data?.success) {
//           setPara1(
//             `Your registration request has been sent successfully and approval/rejection of your registration will be informed to you via email.`
//           );
//           setPara2(
//             `Your registration acknowledgement ID is ${data?.data?.newDepositTaker?.uniqueId}`
//           );
//           setSubmitted(true);
//           setSubmitModal(true);
//         } else {
//           throw new Error("Submission failed");
//         }
//       } catch (error) {
//         console.error("Error during form submission:", error);
//         setPara1(`Something went wrong`);
//         setPara2(`Please try again later`);
//         setSubmitted(false);
//         setSubmitModal(true);
//       } finally {
//         setLoader(false);
//       }
//     } else {
//       console.log("PAN verification failed");
//       setLoader(false);
//     }
//   };

//   // const onSubmit = async (event: any) => {
//   //   event?.preventDefault();

//   //   setLoader(true);
//   //   const noError = await handleValidationChecks(
//   //     allFormData?.formFields?.form_fields
//   //   );
//   //   let panVerified = undefined;
//   //   if (noError) {
//   //     panVerified = await verifyPan();
//   //   }
//   //   setLoader(false);
//   //   console.log({ panVerified });

//   //   // if (noError && panVerified) {
//   //   //   setAllVerified(true);
//   //   //   setPara1(`Verification Successful`);
//   //   //   setPara2(`Your PAN Details have been successfully verified.`);
//   //   //   setSubmitted(true);
//   //   //   setPanSuccessModal(true);
//   //   // }
//   //   setLoader(false);

//   //   console.log({ noError });

//   //   if (noError) {
//   //   }
//   //   let finalResult =
//   //     allFormData &&
//   //     allFormData?.formFields?.form_fields?.map((field: any) => {
//   //       let sectionCode = allFormData?.entitySections?.find(
//   //         (section: any) => section?.id === field?.sectionId
//   //       )?.sectionName;
//   //       return {
//   //         fieldId: field?.id,
//   //         label: field?.label,
//   //         sectionCode: sectionCode,
//   //         value: field?.userInput,
//   //         key: field?.key,
//   //       };
//   //     });

//   //   finalResult = [...finalResult];

//   //   axios
//   //     .post(bffUrl + "/deposit-taker/add-form-fields", {
//   //       formData: finalResult,
//   //     })
//   //     .then((response: any) => {
//   //       console.log({ response });

//   //       const data = response.data;
//   //       console.log({ data });

//   //       if (data?.success) {
//   //         // setSubmitModal( true)
//   //         setPara1(`Your registration request has been sent successfully and
//   //         approval/rejection of your registration will be informed to you
//   //         via email.`);
//   //         setPara2(
//   //           `Your registration acknowledgement ID is ${data?.data?.newDepositTaker?.uniqueId}`
//   //         );
//   //         setSubmitted(true);
//   //         setSubmitModal(true);
//   //       } else {
//   //         setPara1(`Something went wrong`);
//   //         setPara2(`Please try again later`);
//   //         setSubmitted(false);
//   //         setSubmitModal(true);
//   //       }
//   //     })
//   //     .catch((e: any) => {
//   //       setLoader(false);
//   //       setPara1(e?.response?.data?.detail?.message);
//   //       setPara2(`Please try again later`);
//   //       setSubmitted(false);
//   //       setSubmitModal(true);
//   //       setLoader(false);
//   //     });
//   // };
//   const handleClosePopupPan = () => {
//     setPanSuccessModal(false);
//   };

//   return (
//     <div className="flex flex-col min-h-screen ">
//       <div className="mt-6 mx-2">
//         <TaskTabsRg />
//       </div>

//       <div className="mx-8 mt-4 mb-1">
//         <div className="flex  flex-col xl:flex-row md:flex-row lg:flex-row items-center justify-between  ">
//           <div className="flex flex-row">
//             <img
//               src={InfoIcon}
//               alt="InfoIcon"
//               className="h-6 w-6 sm:h-8 sm:w-8 mr-2"
//             />
//             <p className="text-[#808080]">
//               You can Upload Deposit Takers data in bulk. Please use this given
//               <span className="underline line-through:text-blue text-[#BFCFFF]">
//                 Template
//               </span>
//             </p>
//           </div>
//           <div className="mt-3 md:mt-0 lg:mt-0 xl:mt-0">
//             <button
//               onClick={handleUploadClick}
//               type="submit"
//               className="bg-[#1c468e] rounded-xl p-2 sm:p-3 text-white font-semibold text-sm sm:text-base w-24 sm:w-28 text-gilroy-semibold flex items-center justify-center"
//             >
//               <img src={UploadIcon} alt="UploadIcon" className="mr-1" /> Upload
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="mt-8 mb-8 mx-8">
//         <Accordion items={accordionItems} />
//       </div>
//       <div className="my-11  flex flex-col lg:flex-row lg:items-center justify-between ">
//         <div>
//           <div
//             className="flex w-full p-8  flex-row justify-end items-center"
//             style={{
//               width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
//             }}
//           >
//             <div className="flex items-center space-x-6">
//               <p
//                 onClick={handleCancelClick}
//                 className="text-[#1c468e]  rounded-xl p-3 border border-[#1c468e] text-gilroy-medium cursor-pointer text-sm w-full sm:w-auto sm:max-w-xs "
//               >
//                 Cancel
//               </p>

//               <button
//                 // onClick={handleSuccessUploadClick}
//                 onClick={onSubmit}
//                 type="submit"
//                 className="bg-[#1c468e] rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs text-gilroy-semibold "
//               >
//                 {loader ? <LoaderSpin /> : " Submit"}
//               </button>
//             </div>
//           </div>
//           <div>
//             <div className="border-[#E6E6E6] border-[1px] lg:mt-4"></div>

//             <p className="mb-[24px] text-gilroy-light text-center text-[#24222B] text-xs cursor-pointer mt-4">
//               © 2024 Protean BUDs, All Rights Reserved.
//             </p>
//           </div>
//         </div>
//       </div>
//       {uploadPopupOpen && (
//         <UploadPopUp closePopup={handleClosePopup} SuccessPopup={() => {}} />
//       )}
//       {successUploadPopupOpen && (
//         <SuccessUploadPopUp
//           closePopup={handleSuccessClosePopup}
//           SuccessPopup={() => {}}
//         />
//       )}
//       <SuccessPopup
//         closePopup={handleClosePopupPan}
//         showPopup={() => setPanSuccessModal(true)}
//         toggle={panSuccessModal}
//         para1={para1}
//         para2={para2}
//         success={submitted}
//       />
//       <SuccessPopup
//         closePopup={() => {
//           // navigate("/rg/deposit-taker");
//           setSubmitModal(false);
//         }}
//         showPopup={() => setSubmitModal(true)}
//         toggle={submitModal}
//         para1={para1}
//         para2={para2}
//         success={submitted}
//       />
//     </div>
//   );
// };

// export default DepositeTakerSearchDetailsSM;
import React, { useContext, useEffect, useState } from "react";
import Accordion from "../../../../components/customAccordin/CustomAccordin";
import VerificationDetails from "./VerificationDetails";
import EntityDetails from "./EntityDetails";
import NodalDetails from "./NodalDetails";
import RegulatorDetails from "./RegulatorDetails";
import TaskTabsRg from "../../../../components/ScehmaManagement/TaskTabsRg";
import InfoIcon from "../../../../assets/images/info-circle.svg";
import UploadIcon from "../../../../assets/images/directbox-send-White.svg";
import UploadPopUp from "./UploadPopUp";
import { useScreenWidth } from "../../../../utils/screenSize";
import SuccessUploadPopUp from "./SuccessUploadPopUp";
import { useNavigate } from "react-router-dom";

import { useDepositTakerRegistrationStore } from "../../../../zust/deposit-taker-registration/registrationStore";
import axios from "axios";
import { bffUrl } from "../../../../utils/api";
import DynamicFields from "../../../../components/userFlow/depositeTaker/DynamicFields";
import { FormHandlerContext } from "../../../../contextAPI/useFormFieldHandlers";
import LoaderSpin from "../../../../components/LoaderSpin";
import SuccessPopup from "../../../../components/userFlow/depositeTaker/SuccessPopUp";

const DepositeTakerSearchDetailsSM: React.FC = () => {
  const navigate = useNavigate();
  const [uploadPopupOpen, setUploadPopupOpen] = useState(false);
  const [successUploadPopupOpen, setSuccessUploadPopupOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [panSuccessModal, setPanSuccessModal] = useState(false);
  const [submitModal, setSubmitModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [para1, setPara1] = useState("");
  const [para2, setPara2] = useState("");
  const screenWidth = useScreenWidth();

  const { onChange, handleValidationChecks, updatePanFormField } =
    useContext(FormHandlerContext);

  const { setAllFormData, setAllDocumentData, allFormData } =
    useDepositTakerRegistrationStore((state) => state);

  useEffect(() => {
    fetchFormFields();
  }, []);

  const handleCancelClick = () => {
    navigate("/rg/deposit-taker");
  };

  const handleUploadClick = () => {
    setUploadPopupOpen(true);
  };

  const handleClosePopup = () => {
    setUploadPopupOpen(false);
  };

  const handleSuccessUploadClick = () => {
    setSuccessUploadPopupOpen(true);
  };

  const handleSuccessClosePopup = () => {
    setSuccessUploadPopupOpen(false);
  };

  const fetchFormFields = async () => {
    try {
      const response = await axios.get(
        `${bffUrl}/registration/field-data/${1}?status=addToRegistration`
      );
      const dropdownOptionsRes = await axios.get(
        `${bffUrl}/registration/dropdown-components`
      );
      if (response?.data?.success) {
        const dropdownData = dropdownOptionsRes?.data?.data;
        const modifiedFormFields = response?.data?.data?.formFields
          ?.sort((a: any, b: any) => a.sortOrder - b.sortOrder)
          .map((o: any) => ({ ...o, userInput: "", error: "" }));
        const modifiedFileFields =
          response?.data?.data?.registrationDocumentFields?.map((o: any) => ({
            ...o,
            file: "",
            error: "",
            fileName: "",
          }));
        setAllFormData({
          ...response.data.data,
          formFields: { form_fields: modifiedFormFields },
          dropdownData,
        });
        setAllDocumentData(modifiedFileFields);
      }
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  };
  const excludedSectionNames = ["Upload Documents"];

  const accordionItems =
    allFormData?.entitySections
      ?.filter(
        (section: any) => !excludedSectionNames.includes(section.sectionName)
      )
      .map((section: any) => {
        const formFields = allFormData?.formFields?.form_fields?.filter(
          (f: any) => f.sectionId === section.id
        );
        const hasError = formFields.some((field: any) => field.error);

        return {
          header: section?.sectionName,
          content: (
            <div key={section.id}>
              <DynamicFields
                allFormData={allFormData}
                formFields={formFields}
                onChange={onChange}
              />
            </div>
          ),
          hasError: hasError,
        };
      }) || [];

  const verifyPan = async () => {
    try {
      const company = allFormData?.formFields?.form_fields?.find((field: any) =>
        /Company Name/i.test(field?.label)
      );
      const pan = allFormData?.formFields?.form_fields?.find((field: any) =>
        /PAN Number/i.test(field?.label)
      );
      const response = await axios.post(
        "http://34.149.91.231/cms/pandirectory/api",
        {
          name: company?.userInput?.toUpperCase(),
          pan_no: pan?.userInput,
        }
      );
      const data = response.data;
      if (data?.status !== "success") {
        setPara1("Verification Failed");
        setPara2(data?.message);
        setSubmitted(false);
        setPanSuccessModal(true);
        return false;
      }
      updatePanFormField(data, pan);
      return true;
    } catch (error) {
      console.error("Error while verifying PAN:", error);
      setPara1("Verification Error");
      setPara2("There was an error verifying the PAN. Please try again later.");
      setPanSuccessModal(true);
      return false;
    }
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setLoader(true);
    const isFormValid = await handleValidationChecks(
      allFormData?.formFields?.form_fields
    );
    if (!isFormValid) {
      setLoader(false);
      console.log("Form validation failed");
      return;
    }
    const panVerified = await verifyPan();
    if (panVerified) {
      // Process submission if PAN is verified
      try {
        let formData = allFormData.formFields.form_fields.map((field: any) => ({
          fieldId: field.id,
          label: field.label,
          sectionCode: allFormData.entitySections.find(
            (section: any) => section.id === field.sectionId
          )?.sectionName,
          value: field.userInput,
          key: field.key,
        }));
        const response = await axios.post(
          bffUrl + "/deposit-taker/add-form-fields",
          { formData }
        );
        if (response.data.success) {
          setPara1(
            "Your registration request has been submitted successfully."
          );
          setPara2(
            `Your registration acknowledgement ID is ${response.data.data.newDepositTaker.uniqueId}`
          );
          setSubmitted(true);
        } else {
          throw new Error("Submission failed");
        }
      } catch (error) {
        console.error("Error during form submission:", error);
        setPara1("Submission Error");
        setPara2(
          "There was an error during the submission process. Please try again later."
        );
      } finally {
        setSubmitModal(true);
        setLoader(false);
      }
    } else {
      console.log("PAN verification failed");
      setLoader(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="mt-6 mx-2">
        <TaskTabsRg />
      </div>

      <div className="mx-8 mt-4 mb-1">
        <div className="flex flex-col xl:flex-row md:flex-row lg:flex-row items-center justify-between">
          <div className="flex flex-row">
            <img
              src={InfoIcon}
              alt="Info Icon"
              className="h-6 w-6 sm:h-8 sm:w-8 mr-2"
            />
            <p className="text-[#808080]">
              You can Upload Deposit Takers data in bulk. Please use this given{" "}
              <span className="underline line-through:text-blue text-[#BFCFFF]">
                Template
              </span>
            </p>
          </div>
          <div className="mt-3 md:mt-0 lg:mt-0 xl:mt-0">
            <button
              onClick={handleUploadClick}
              type="submit"
              className="bg-[#1c468e] rounded-xl p-2 sm:p-3 text-white font-semibold text-sm sm:text-base w-24 sm:w-28 text-gilroy-semibold flex items-center justify-center"
            >
              <img src={UploadIcon} alt="Upload Icon" className="mr-1" /> Upload
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 mb-8 mx-8">
        <Accordion items={accordionItems} />
      </div>

      <div className="my-11 flex flex-col lg:flex-row lg:items-center justify-between">
        <div>
          <div
            className="flex w-full p-8 flex-row justify-end items-center"
            style={{
              width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
            }}
          >
            <div className="flex items-center space-x-6">
              <p
                onClick={handleCancelClick}
                className="text-[#1c468e] rounded-xl p-3 border border-[#1c468e] text-gilroy-medium cursor-pointer text-sm w-full sm:w-auto sm:max-w-xs"
              >
                Cancel
              </p>
              <button
                onClick={onSubmit}
                type="submit"
                className="bg-[#1c468e] rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs text-gilroy-semibold"
              >
                {loader ? <LoaderSpin /> : "Submit"}
              </button>
            </div>
          </div>
          <div>
            <div className="border-[#E6E6E6] border-[1px] lg:mt-4"></div>
            <p className="mb-[24px] text-gilroy-light text-center text-[#24222B] text-xs cursor-pointer mt-4">
              © 2024 Protean BUDs, All Rights Reserved.
            </p>
          </div>
        </div>
      </div>

      {uploadPopupOpen && (
        <UploadPopUp closePopup={handleClosePopup} SuccessPopup={() => {}} />
      )}
      {successUploadPopupOpen && (
        <SuccessUploadPopUp
          closePopup={handleSuccessClosePopup}
          SuccessPopup={() => {}}
        />
      )}
      <SuccessPopup
        closePopup={() => {
          setPanSuccessModal(false);
        }}
        showPopup={() => setPanSuccessModal(true)}
        toggle={panSuccessModal}
        para1={para1}
        para2={para2}
        success={submitted}
      />
      <SuccessPopup
        closePopup={() => {
          setSubmitModal(false);
          navigate("/rg/deposit-taker");
        }}
        showPopup={() => setSubmitModal(true)}
        toggle={submitModal}
        para1={para1}
        para2={para2}
        success={submitted}
      />
    </div>
  );
};

export default DepositeTakerSearchDetailsSM;
