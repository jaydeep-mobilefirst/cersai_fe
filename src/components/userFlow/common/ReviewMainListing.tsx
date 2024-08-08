// import React from "react";
// import { Link } from "react-router-dom";

// type Props = {
//   allFormData: any;
//   urlList: any[];
//   documentData: any;
//   isPdfMode: boolean;
// };

// const ReviewMainListing = ({
//   allFormData,
//   urlList,
//   documentData,
//   isPdfMode,
// }: Props) => {
//   //   return (
//   //     <>
//   //       {allFormData &&
//   //         allFormData?.entitySections?.map((section: any, index: number) => {
//   //           return allFormData?.formFields?.form_fields?.filter(
//   //             (f: any) => f?.sectionId === section?.id
//   //           )?.length > 0 || documentData?.length > 0 ? (
//   //             <div className="mb-[16px]" key={index}>
//   //               <div className="rounded-t-lg bg-[#E7F0FF] flex justify-between h-[57px]">
//   //                 <p className="lg:w-[152px] ml-[16px] mt-[16px] text-[20px] lg:text-[20px] pb-2 text-nowrap font-bold text-2xl">
//   //                   {section?.sectionName}
//   //                 </p>
//   //                 {/* <button className="text-[#1c468e] text-[16px] lg:text-[20px] mr-[13px] font-bold ">
//   //                     {section?.sectionName !== "Verification" ? (
//   //                       <Link
//   //                         to={
//   //                           urlList?.find(
//   //                             (sec) => sec?.description === section?.sectionName
//   //                           )?.path + "?edit=true"
//   //                         }
//   //                       >
//   //                         Edit
//   //                       </Link>
//   //                     ) : (
//   //                       "Success"
//   //                     )}
//   //                   </button> */}
//   //                 {!isPdfMode && (
//   //                   <button className="text-[#1C468E] text-[16px] lg:text-[20px] mr-[13px] font-bold">
//   //                     {section?.sectionName !== "Verification" ? (
//   //                       <Link
//   //                         to={
//   //                           urlList.find(
//   //                             (sec) => sec?.description === section?.sectionName
//   //                           )?.path + "?edit=true"
//   //                         }
//   //                       >
//   //                         Edit
//   //                       </Link>
//   //                     ) : (
//   //                       "Success"
//   //                     )}
//   //                   </button>
//   //                 )}
//   //               </div>
//   //               <div className="shadow-sm p-5 rounded-md ">
//   //                 <div className="flex flex-col justify-between w-full sm:flex-row gap-y-[16px]">
//   //                   <div
//   //                     className={`w-full grid grid-cols-1
//   //                        md:${
//   //                          allFormData?.formFields?.form_fields?.filter(
//   //                            (f: any) => f?.sectionId === section?.id
//   //                          )?.length === 1
//   //                            ? ""
//   //                            : "grid-cols-2"
//   //                        }
//   //                         mb-4
//   //                         ${
//   //                           section?.sectionName === "Upload Documents" &&
//   //                           documentData?.length <= 3
//   //                             ? "md:grid-cols-1"
//   //                             : "md:grid-cols-2"
//   //                         }`}
//   //                   >
//   //                     {allFormData?.formFields?.form_fields
//   //                       ?.filter((f: any) => f?.sectionId === section?.id)
//   //                       ?.sort((a: any, b: any) => a?.sortOrder - b?.sortOrder)
//   //                       ?.map((field: any, idx: number) => {
//   //                         return (
//   //                           <div
//   //                             className={`sm:mr-[48px] flex justify-between py-1 pr-4 ${
//   //                               idx % 2 === 0
//   //                                 ? "sm:border-r border-r-[#385723] border-opacity-20"
//   //                                 : ""
//   //                             } `}
//   //                             key={idx}
//   //                           >
//   //                             <div className="text-gray-500 w-1/2">
//   //                               {field.label}
//   //                               <span className="text-[#ff0000]">*</span>
//   //                             </div>
//   //                             <div className="w-full text-right">
//   //                               {field?.dscFileNAme !== "" &&
//   //                               field?.dscFileNAme !== undefined
//   //                                 ? field?.dscFileNAme
//   //                                 : field.userInput}
//   //                             </div>
//   //                           </div>
//   //                         );
//   //                       })}
//   //                     {section?.sectionName === "Upload Documents" &&
//   //                       documentData?.map((doc: any, idx: number) => {
//   //                         return (
//   //                           <div
//   //                             className={`sm:mr-[48px] flex justify-between py-1 pr-4 ${
//   //                               idx % 2 === 0
//   //                                 ? "sm:border-r border-r-[#385723] border-opacity-20"
//   //                                 : ""
//   //                             }
//   //                               ${
//   //                                 section?.sectionName === "Upload Documents" &&
//   //                                 documentData?.length <= 3
//   //                                   ? "py-0 pr-0 border-hidden"
//   //                                   : ""
//   //                               }
//   //                               `}
//   //                             key={idx}
//   //                           >
//   //                             <div className="text-gray-500">
//   //                               {doc?.documentName}
//   //                               <span className="text-[#ff0000]">*</span>
//   //                             </div>
//   //                             <div>{doc?.fileName}</div>
//   //                           </div>
//   //                         );
//   //                       })}
//   //                   </div>
//   //                 </div>
//   //               </div>
//   //             </div>
//   //           ) : (
//   //             <></>
//   //           );
//   //         })}
//   //     </>
//   //   );
//   return (
//     <>
//       {allFormData &&
//         allFormData?.entitySections?.map((section: any, index: number) =>
//           allFormData?.formFields?.form_fields?.filter(
//             (f: any) => f?.sectionId === section?.id
//           )?.length > 0 || documentData?.length > 0 ? (
//             <div className="mb-4" key={index}>
//               <div className="rounded-t-lg bg-blue-100 flex justify-between h-14">
//                 <p className="lg:w-40 ml-4 mt-4 text-xl lg:text-xl pb-2 text-nowrap font-bold">
//                   {section?.sectionName}
//                 </p>
//                 {!isPdfMode && (
//                   <button className="text-blue-700 text-lg lg:text-xl mr-3 font-bold">
//                     {section?.sectionName !== "Verification" ? (
//                       <Link
//                         to={
//                           urlList.find(
//                             (sec) => sec?.description === section?.sectionName
//                           )?.path + "?edit=true"
//                         }
//                       >
//                         Edit
//                       </Link>
//                     ) : (
//                       "Success"
//                     )}
//                   </button>
//                 )}
//               </div>

//               <div className="shadow-sm p-5 rounded-md">
//                 <div className="flex flex-col justify-between w-full sm:flex-row gap-y-4">
//                   <div
//                     className={`w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-4`}
//                   >
//                     {allFormData?.formFields?.form_fields
//                       ?.filter((f: any) => f?.sectionId === section?.id)
//                       ?.sort((a: any, b: any) => a?.sortOrder - b?.sortOrder)
//                       ?.map((field: any, idx: number) => (
//                         <div
//                           key={idx}
//                           className={`flex justify-between items-center py-1 pr-4 ${
//                             idx % 2 === 0
//                               ? "border-r border-r-green-800 border-opacity-20"
//                               : ""
//                           } ${isPdfMode ? "whitespace-nowrap" : ""}`}
//                           //   className={`flex justify-between items-center py-1 pr-4 ${
//                           //     idx % 2 === 0 && !isPdfMode
//                           //       ? "border-r border-r-green-800 border-opacity-20"
//                           //       : ""
//                           //   } ${isPdfMode ? "whitespace-nowrap" : ""}`}
//                         >
//                           <div
//                             className="text-gray-500 w-1/2"
//                             // style={{
//                             //   whiteSpace: isPdfMode ? "normal" : "nowrap",
//                             // }}
//                           >
//                             {field.label}
//                             <span className="text-red-500">*</span>
//                             {/* {isPdfMode && (
//                               <span className="font-extrabold mr-3">:</span>
//                             )} */}
//                           </div>
//                           <div
//                             className="text-right w-1/2"
//                             // style={{
//                             //   whiteSpace: isPdfMode ? "normal" : "nowrap",
//                             //   width: isPdfMode ? "100%" : "50%",
//                             // }}
//                           >
//                             {field?.dscFileNAme || field.userInput}
//                           </div>
//                         </div>
//                       ))}
//                     {section?.sectionName === "Upload Documents" &&
//                       documentData?.map((doc: any, idx: number) => (
//                         <div
//                           key={idx}
//                           //   className={`flex justify-between items-center py-1 pr-4 ${
//                           //     idx % 2 === 0
//                           //       ? "border-r border-r-green-800 border-opacity-20"
//                           //       : ""
//                           //   } ${isPdfMode ? "whitespace-nowrap " : ""}`}
//                           className={`flex justify-between items-center py-1 pr-4 ${
//                             idx % 2 === 0 && !isPdfMode
//                               ? "border-r border-r-green-800 border-opacity-20"
//                               : ""
//                           } ${isPdfMode ? "whitespace-nowrap" : ""}`}
//                         >
//                           <div className="text-gray-500">
//                             {doc?.documentName}
//                             <span className="text-red-500">*</span>
//                             {/* {isPdfMode && (
//                               <span className="font-extrabold mr-3">:</span>
//                             )} */}
//                           </div>
//                           <div>{doc?.fileName}</div>
//                         </div>
//                       ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : null
//         )}
//     </>
//   );
// };

// export default ReviewMainListing;
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import RequiredStar from "../depositeTaker/RequiredStar";

type Props = {
  allFormData: any;
  urlList: any[];
  documentData: any;
  isPdfMode: boolean;
};

const ReviewMainListing = ({
  allFormData,
  urlList,
  documentData,
  isPdfMode,
}: Props) => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Check if any field's userInput is empty
  //   const hasEmptyUserInput = allFormData?.formFields?.form_fields?.some(
  //     (field: any) => field.key === "dsc3" && !field.userInput
  //   );

  //   // Navigate if the condition is met
  //   if (hasEmptyUserInput) {
  //     navigate(-1);
  //   }
  // }, [allFormData, navigate]);

  return (
    <>
      {allFormData &&
        allFormData?.entitySections?.map((section: any, index: number) =>
          allFormData?.formFields?.form_fields?.filter(
            (f: any) => f?.sectionId === section?.id
          )?.length > 0 || documentData?.length > 0 ? (
            <div className="mb-4" key={index}>
              <div
                className={`rounded-t-lg bg-blue-100 flex justify-between h-14 ${
                  isPdfMode ? "flex-col" : ""
                }`}
              >
                <p
                  className={`lg:w-40 ml-4 mt-4 text-xl lg:text-xl pb-2 text-nowrap font-bold ${
                    isPdfMode ? "mb-2" : ""
                  }`}
                >
                  {section?.sectionName}
                </p>
                {!isPdfMode && (
                  <button className="text-blue-700 text-lg lg:text-xl mr-3 font-bold">
                    {section?.sectionName !== "Verification" ? (
                      <Link
                        to={
                          urlList.find(
                            (sec) => sec?.description === section?.sectionName
                          )?.path + "?edit=true"
                        }
                      >
                        Edit
                      </Link>
                    ) : (
                      "Success"
                    )}
                  </button>
                )}
              </div>

              <div className="shadow-sm p-5 rounded-md">
                <div className="flex flex-col justify-between w-full sm:flex-row gap-y-4">
                  <div
                    className={`w-full ${
                      isPdfMode
                        ? "flex flex-col"
                        : "grid grid-cols-1 md:grid-cols-2 gap-4"
                    } mb-4`}
                  >
                    {allFormData?.formFields?.form_fields
                      ?.filter((f: any) => f?.sectionId === section?.id)
                      ?.sort((a: any, b: any) => a?.sortOrder - b?.sortOrder)
                      ?.map((field: any, idx: number) => (
                        <div
                          key={idx}
                          className={`flex justify-between items-center py-1 pr-4 ${
                            isPdfMode
                              ? "flex-row"
                              : idx % 2 === 0
                              ? "border-r border-r-green-800 border-opacity-20"
                              : ""
                          }`}
                        >
                          <div className="text-gray-500 w-1/2">
                            {field.label}
                            {/* <span className="text-red-500">*</span> */}
                            <RequiredStar
                              field={field}
                              allFormData={allFormData}
                            />
                          </div>
                          <div className="text-right w-1/2 overflow">
                            {field?.dscFileNAme || field?.key === "dsc3"
                              ? "DSC Uploaded"
                              : field.userInput}
                          </div>
                        </div>
                      ))}
                    {section?.sectionName === "Upload Documents" &&
                      documentData?.map((doc: any, idx: number) => (
                        <div
                          key={idx}
                          className={`flex justify-between items-center py-1 pr-4 ${
                            isPdfMode
                              ? "flex-row"
                              : idx % 2 === 0
                              ? "border-r border-r-green-800 border-opacity-20"
                              : ""
                          }`}
                        >
                          <div className="text-gray-500">
                            {doc?.documentName}
                            <span className="text-red-500">*</span>
                          </div>
                          <div>{doc?.fileName}</div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ) : null
        )}
    </>
  );
};

export default ReviewMainListing;
