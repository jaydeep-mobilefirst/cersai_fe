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
import { useDepositTakerRegistrationStore } from "../../../../store/registrationStore";
import axios from "axios";
import { bffUrl } from "../../../../utils/api";
import DynamicFields from "../../../../components/userFlow/depositeTaker/DynamicFields";
import { FormHandlerContext } from "../../../../contextAPI/useFormFieldHandlers";

interface AccordionItem {
  header: React.ReactNode;
  content: React.ReactNode;
}

const DepositeTakerSearchDetailsSM: React.FC = () => {
  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate("/rg/deposit-taker");
  };
  const [uploadPopupOpen, setUploadPopupOpen] = useState(false);
  const {
    onChange,
    handleValidationChecks,
    onFileChange,
    handleDocumentValidations,
  } = useContext(FormHandlerContext);
  const [loader, setLoader] = useState<boolean>(false);
  // console.log(onChange, "onchange");
  const [successUploadPopupOpen, setSuccessUploadPopupOpen] = useState(false);
  const [accordionItems, setAccordionItems] = useState([]);
  const {
    entities,
    setEntities,
    setAllFormData,
    setAllDocumentData,
    allFormData,
    documentData,
  } = useDepositTakerRegistrationStore((state) => state);
  // console.log({ allFormData });
  const fetchFormFields = () => {
    axios
      .get(`${bffUrl}/registration/field-data/${1}?status=addToRegistration`)
      .then(async (response) => {
        if (response?.data?.success) {
          let dropdownData = undefined;
          try {
            let dropdownOptionsRes = await axios.get(
              `${bffUrl}/registration/dropdown-components`
            );
            dropdownData = dropdownOptionsRes?.data?.data;
          } catch (error) {
            console.log("Error");
          }
          let modifiedFormFields = response?.data?.data?.formFields
            ?.sort((a: any, b: any) => a.sortOrder - b.sortOrder)
            ?.map((o: any) => ({ ...o, userInput: "", error: "" }));
          let modifiedFileFields =
            response?.data?.data?.registrationDocumentFields?.map((o: any) => ({
              ...o,
              file: "",
              error: "",
              fileName: "",
            }));
          console.log({ response });

          let obj = {
            dropdownData,
            ...response?.data?.data,
            formFields: { form_fields: modifiedFormFields },
            // currentEntity: selectedRadio,
          };
          setAllFormData(obj);
          setAllDocumentData(modifiedFileFields);
          // setSections(
          //   response?.data?.data?.entitySections?.map((e: any) => ({
          //     ...e,
          //     completed: false,
          //   }))
          // );
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

  useEffect(() => {
    fetchFormFields();
  }, []);

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
  const screenWidth = useScreenWidth();

  useEffect(() => {
    console.log({ allFormData });
    const accordionItems =
      allFormData?.entitySections?.map((section: any) => {
        const sectionFormFields = allFormData.formFields.form_fields.filter(
          (field: any) => {
            return field.sectionId === section.id;
          }
        );
        console.log({ sectionFormFields });

        return {
          header: section.sectionName,
          content: (
            <DynamicFields
              allFormData={allFormData}
              formFields={sectionFormFields}
              onChange={onChange}
              onFileChange={onFileChange}
            />
          ),
        };
      }) || [];
    setAccordionItems(accordionItems);
  }, [allFormData]);

  // const accordionItems =
  //   allFormData?.entitySections?.map((section: any) => {
  //     const formFields = allFormData?.formFields?.form_fields?.filter(
  //       (f: any) => f.sectionId === section.id
  //     );
  //     console.log({ formFields });

  //     return {
  //       header: section?.sectionName,
  //       content: (
  //         <DynamicFields
  //           allFormData={allFormData}
  //           formFields={formFields}
  //           onChange={onChange}
  //           documentFields={documentData}
  //           onFileChange={onFileChange}
  //         />
  //       ),
  //     };
  //   }) || [];

  return (
    <div className="flex flex-col min-h-screen ">
      <div className="mt-6 mx-2">
        <TaskTabsRg />
      </div>

      <div className="mx-8 mt-4 mb-1">
        <div className="flex  flex-col xl:flex-row md:flex-row lg:flex-row items-center justify-between  ">
          <div className="flex flex-row">
            <img
              src={InfoIcon}
              alt="InfoIcon"
              className="h-6 w-6 sm:h-8 sm:w-8 mr-2"
            />
            <p className="text-[#808080]">
              You can Upload Deposit Takers data in bulk. Please use this given
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
              <img src={UploadIcon} alt="UploadIcon" className="mr-1" /> Upload
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 mb-8 mx-8">
        <Accordion items={accordionItems} />
      </div>
      <div className="my-11  flex flex-col lg:flex-row lg:items-center justify-between ">
        <div>
          <div
            className="flex w-full p-8  flex-row justify-end items-center"
            style={{
              width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
            }}
          >
            <div className="flex items-center space-x-6">
              <p
                onClick={handleCancelClick}
                className="text-[#1c468e]  rounded-xl p-3 border border-[#1c468e] text-gilroy-medium cursor-pointer text-sm w-full sm:w-auto sm:max-w-xs "
              >
                Cancel
              </p>

              <button
                onClick={handleSuccessUploadClick}
                type="submit"
                className="bg-[#1c468e] rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs text-gilroy-semibold "
              >
                Submit
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
    </div>
  );
};

export default DepositeTakerSearchDetailsSM;
// import React, { useContext, useEffect, useState } from "react";
// import Accordion from "../../../../components/customAccordin/CustomAccordin";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { bffUrl } from "../../../../utils/api";
// import { useDepositTakerRegistrationStore } from "../../../../store/registrationStore";
// import { useScreenWidth } from "../../../../utils/screenSize";
// import { FormHandlerContext } from "../../../../contextAPI/useFormFieldHandlers";
// import DynamicFields from "../../../../components/userFlow/depositeTaker/DynamicFields";
// import InfoIcon from "../../../../assets/images/info-circle.svg";
// import UploadIcon from "../../../../assets/images/directbox-send-White.svg";
// import UploadPopUp from "./UploadPopUp";
// import SuccessUploadPopUp from "./SuccessUploadPopUp";
// import TaskTabsRg from "../../../../components/ScehmaManagement/TaskTabsRg";
// import LoaderSpin from "../../../../components/LoaderSpin";

// const DepositeTakerSearchDetailsSM: React.FC = () => {
//   const navigate = useNavigate();
//   const [uploadPopupOpen, setUploadPopupOpen] = useState(false);
//   const [successUploadPopupOpen, setSuccessUploadPopupOpen] = useState(false);
//   const [loader, setLoader] = useState(false);
//   const {
//     onChange,
//     handleValidationChecks,
//     onFileChange,
//     handleDocumentValidations,
//   } = useContext(FormHandlerContext);

//   console.log(onChange, "onchange");
//   const { setAllFormData, allFormData } = useDepositTakerRegistrationStore(
//     (state) => state
//   );

//   const fetchFormFields = async () => {
//     try {
//       const response = await axios.get(
//         `${bffUrl}/registration/field-data/${1}?status=addToRegistration`
//       );
//       if (response.data.success) {
//         const modifiedFormFields = response?.data?.data?.formFields
//           .sort((a: any, b: any) => a?.sortOrder - b?.sortOrder)
//           .map((field: any) => ({ ...field, userInput: "", error: "" }));
//         const modifiedDocumentFields =
//           response?.data?.data?.documentFields?.map((field: any) => ({
//             ...field,
//             file: "",
//             error: "",
//             fileName: "",
//           }));
//         setAllFormData({
//           ...allFormData,
//           formFields: modifiedFormFields,
//           documentFields: modifiedDocumentFields,
//         });
//       } else {
//         throw new Error("Error getting data, please try later!");
//       }
//     } catch (error) {
//       console.error("Error loading form fields:", error);
//     } finally {
//       setLoader(false);
//     }
//   };

//   const handleUploadClick = () => setUploadPopupOpen(true);
//   const handleClosePopup = () => setUploadPopupOpen(false);
//   const handleSuccessUploadClick = () => setSuccessUploadPopupOpen(true);
//   const handleSuccessClosePopup = () => setSuccessUploadPopupOpen(false);
//   const handleCancelClick = () => navigate("/rg/deposit-taker");

//   const onSubmit = async () => {
//     alert("submit");
//     setLoader(true);
//     const allValid = await handleValidationChecks(allFormData.formFields);

//     setLoader(false);
//   };

//   const screenWidth = useScreenWidth();

//   const accordionItems =
//     allFormData?.entitySections?.map((section: any) => ({
//       header: section?.sectionName,
//       content: (
//         <DynamicFields
//           allFormData={allFormData}
//           formFields={allFormData?.formFields?.filter(
//             (f: any) => f.sectionId === section.id
//           )}
//           documentFields={allFormData?.documentFields?.filter(
//             (d: any) => d.sectionId === section.id
//           )}
//           onChange={onChange}
//           onFileChange={onFileChange}
//         />
//       ),
//     })) || [];

//   return (
//     <div className="flex flex-col min-h-screen">
//       <div className="mt-6 mx-2">
//         <TaskTabsRg />
//       </div>
//       <div className="mx-8 mt-4 mb-1">
//         <div className="flex flex-col xl:flex-row md:flex-row lg:flex-row items-center justify-between">
//           <div className="flex flex-row">
//             <img
//               src={InfoIcon}
//               alt="Info Icon"
//               className="h-6 w-6 sm:h-8 sm:w-8 mr-2"
//             />
//             <p className="text-[#808080]">
//               You can upload Deposit Takers data in bulk. Please use this given{" "}
//               <span className="underline text-[#BFCFFF]">template</span>.
//             </p>
//           </div>
//           <button
//             onClick={handleUploadClick}
//             type="submit"
//             className="bg-[#1c468e] rounded-xl p-2 sm:p-3 text-white font-semibold text-sm sm:text-base w-24 sm:w-28 flex items-center justify-center"
//           >
//             <img src={UploadIcon} alt="Upload Icon" className="mr-1" /> Upload
//           </button>
//         </div>
//       </div>
//       <div className="mt-8 mb-8 mx-8">
//         <Accordion items={accordionItems} />
//       </div>
//       <div className="my-11 flex flex-col lg:flex-row lg:items-center justify-between">
//         <div
//           className="flex w-full p-8 flex-row justify-end items-center"
//           style={{
//             width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
//           }}
//         >
//           <button
//             onClick={handleCancelClick}
//             className="text-[#1c468e] rounded-xl p-3 border border-[#1c468e] cursor-pointer text-sm w-full sm:w-auto sm:max-w-xs"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onSubmit}
//             type="submit"
//             className="bg-[#1c468e] rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs"
//           >
//             {loader ? <LoaderSpin /> : " Submit"}
//           </button>
//         </div>
//         <div>
//           <div className="border-[#E6E6E6] border-1 lg:mt-4"></div>
//           <p className="mb-24 text-gilroy-light text-center text-[#24222B] text-xs cursor-pointer mt-4">
//             © 2024 Protean BUDs, All Rights Reserved.
//           </p>
//         </div>
//       </div>
//       {/* {uploadPopupOpen && <UploadPopUp closePopup={handleClosePopup} />}
//       {successUploadPopupOpen && (
//         <SuccessUploadPopUp closePopup={handleSuccessClosePopup} />
//       )} */}
//     </div>
//   );
// };

// export default DepositeTakerSearchDetailsSM;
// import React, { useContext, useEffect, useState } from "react";
// import Accordion from "../../../../components/customAccordin/CustomAccordin";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { bffUrl } from "../../../../utils/api";
// import { useDepositTakerRegistrationStore } from "../../../../store/registrationStore";
// import { useScreenWidth } from "../../../../utils/screenSize";
// import { FormHandlerContext } from "../../../../contextAPI/useFormFieldHandlers";
// import DynamicFields from "../../../../components/userFlow/depositeTaker/DynamicFields";
// import InfoIcon from "../../../../assets/images/info-circle.svg";
// import UploadIcon from "../../../../assets/images/directbox-send-White.svg";
// import UploadPopUp from "./UploadPopUp";
// import SuccessUploadPopUp from "./SuccessUploadPopUp";
// import TaskTabsRg from "../../../../components/ScehmaManagement/TaskTabsRg";
// import LoaderSpin from "../../../../components/LoaderSpin";

// const DepositeTakerSearchDetailsSM: React.FC = () => {
//   const navigate = useNavigate();
//   const [uploadPopupOpen, setUploadPopupOpen] = useState(false);
//   const [successUploadPopupOpen, setSuccessUploadPopupOpen] = useState(false);
//   const [loader, setLoader] = useState(false);
//   const {
//     onChange,
//     handleValidationChecks,
//     onFileChange,
//     handleDocumentValidations,
//   } = useContext(FormHandlerContext);

//   const { setAllFormData, allFormData } = useDepositTakerRegistrationStore(
//     (state) => state
//   );
//   console.log(allFormData?.formFields);

//   const fetchFormFields = async () => {
//     try {
//       const response = await axios.get(
//         `${bffUrl}/registration/field-data/${1}?status=addToRegistration`
//       );
//       if (response.data.success) {
//         const modifiedFormFields =
//           response?.data?.data?.formFields
//             ?.sort((a: any, b: any) => a?.sortOrder - b?.sortOrder)
//             ?.map((field: any) => ({ ...field, userInput: "", error: "" })) ||
//           [];
//         const modifiedDocumentFields =
//           response?.data?.data?.documentFields?.map((field: any) => ({
//             ...field,
//             file: "",
//             error: "",
//             fileName: "",
//           })) || [];
//         setAllFormData({
//           ...allFormData,
//           formFields: modifiedFormFields,
//           documentFields: modifiedDocumentFields,
//         });
//       } else {
//         throw new Error("Error getting data, please try later!");
//       }
//     } catch (error) {
//       console.error("Error loading form fields:", error);
//     } finally {
//       setLoader(false);
//     }
//   };

//   useEffect(() => {
//     fetchFormFields();
//   }, []);

//   const handleUploadClick = () => setUploadPopupOpen(true);
//   const handleClosePopup = () => setUploadPopupOpen(false);
//   const handleSuccessUploadClick = () => setSuccessUploadPopupOpen(true);
//   const handleSuccessClosePopup = () => setSuccessUploadPopupOpen(false);
//   const handleCancelClick = () => navigate("/rg/deposit-taker");

//   const onSubmit = async () => {
//     alert("submit");
//     setLoader(true);
//     const allValid = await handleValidationChecks(allFormData.formFields);
//     setLoader(false);
//   };

//   const screenWidth = useScreenWidth();

//   const accordionItems =
//     allFormData?.entitySections?.map((section: any) => ({
//       header: section?.sectionName,
//       content: (
//         <DynamicFields
//           allFormData={allFormData}
//           formFields={
//             Array.isArray(allFormData?.formFields)
//               ? allFormData.formFields.filter(
//                   (f: any) => f.sectionId === section.id
//                 )
//               : []
//           }
//           documentFields={
//             Array.isArray(allFormData?.documentFields)
//               ? allFormData.documentFields.filter(
//                   (d: any) => d.sectionId === section.id
//                 )
//               : []
//           }
//           onChange={onChange}
//           onFileChange={onFileChange}
//         />
//       ),
//     })) || [];

//   return (
//     <div className="flex flex-col min-h-screen">
//       <div className="mt-6 mx-2">
//         <TaskTabsRg />
//       </div>
//       <div className="mx-8 mt-4 mb-1">
//         <div className="flex flex-col xl:flex-row md:flex-row lg:flex-row items-center justify-between">
//           <div className="flex flex-row">
//             <img
//               src={InfoIcon}
//               alt="Info Icon"
//               className="h-6 w-6 sm:h-8 sm:w-8 mr-2"
//             />
//             <p className="text-[#808080]">
//               You can upload Deposit Takers data in bulk. Please use this given{" "}
//               <span className="underline text-[#BFCFFF]">template</span>.
//             </p>
//           </div>
//           <button
//             onClick={handleUploadClick}
//             type="submit"
//             className="bg-[#1c468e] rounded-xl p-2 sm:p-3 text-white font-semibold text-sm sm:text-base w-24 sm:w-28 flex items-center justify-center"
//           >
//             <img src={UploadIcon} alt="Upload Icon" className="mr-1" /> Upload
//           </button>
//         </div>
//       </div>
//       <div className="mt-8 mb-8 mx-8">
//         <Accordion items={accordionItems} />
//       </div>
//       <div className="my-11 flex flex-col lg:flex-row lg:items-center justify-between">
//         <div
//           className="flex w-full p-8 flex-row justify-end items-center"
//           style={{
//             width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
//           }}
//         >
//           <button
//             onClick={handleCancelClick}
//             className="text-[#1c468e] rounded-xl p-3 border border-[#1c468e] cursor-pointer text-sm w-full sm:w-auto sm:max-w-xs"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onSubmit}
//             type="submit"
//             className="bg-[#1c468e] rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs"
//           >
//             {loader ? <LoaderSpin /> : " Submit"}
//           </button>
//         </div>
//         <div>
//           <div className="border-[#E6E6E6] border-1 lg:mt-4"></div>
//           <p className="mb-24 text-gilroy-light text-center text-[#24222B] text-xs cursor-pointer mt-4">
//             © 2024 Protean BUDs, All Rights Reserved.
//           </p>
//         </div>
//       </div>
//       {/* {uploadPopupOpen && <UploadPopUp closePopup={handleClosePopup} />}
//       {successUploadPopupOpen && (
//         <SuccessUploadPopUp closePopup={handleSuccessClosePopup} />
//       )} */}
//     </div>
//   );
// };

// export default DepositeTakerSearchDetailsSM;
