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
  useEffect(() => {
    // Find fields with the key 'dsc3'
    const dsc3Fields = allFormData?.formFields?.form_fields?.filter(
      (field: any) => field.key === "dsc3"
    );

    // Check if any of the dsc3 fields have an empty userInput
    const hasEmptyUserInput = dsc3Fields.some((field: any) => !field.userInput);

    // Navigate if the condition is met
    if (hasEmptyUserInput) {
      navigate(-1);
    }
  }, [allFormData, navigate]);

  console.log("alformdataa---", allFormData);

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
                  isPdfMode ? "flex-col h-full" : ""
                }`}
              >
                <p
                  className={`lg:w-40 ml-4 mt-4 text-xl lg:text-xl pb-2 text-nowrap font-bold ${
                    isPdfMode ? "mb-2 " : ""
                  }`}
                >
                  {section?.sectionName === "Nodal Details"
                    ? "Nodal Officer Details"
                    : section?.sectionName}
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
                              ? "border-r border-r-green-800 border-opacity-20 "
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
                          <div className=" text-right  w-1/2 overflow-auto custom-scrollbar1">
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
