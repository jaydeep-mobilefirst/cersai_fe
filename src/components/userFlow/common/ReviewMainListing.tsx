import React from 'react'
import { Link } from 'react-router-dom';

type Props = {
    allFormData: any
    urlList: any[]
    documentData: any

}

const ReviewMainListing = ({ allFormData, urlList, documentData }: Props) => {
    return (
        <>
            {allFormData &&
                allFormData?.entitySections?.map(
                    (section: any, index: number) => (
                        <div className="mb-[16px]" key={index}>
                            <div className="rounded-t-lg bg-[#E7F0FF] flex justify-between h-[57px]">
                                <p className="lg:w-[152px] ml-[16px] mt-[16px] text-[20px] lg:text-[20px] pb-2 text-nowrap font-bold text-2xl">
                                    {section?.sectionName}
                                </p>
                                <button className="text-[#1c468e] text-[16px] lg:text-[20px] mr-[13px] font-bold ">
                                    {section?.sectionName !== "Verification" ? (
                                        <Link
                                            to={
                                                urlList?.find(
                                                    (sec) =>
                                                        sec?.description === section?.sectionName
                                                )?.path + "?edit=true"
                                            }
                                        >
                                            Edit
                                        </Link>
                                    ) : (
                                        "Success"
                                    )}
                                </button>
                            </div>

                            <div className="shadow-sm p-5 rounded-md ">
                                <div className="flex flex-col justify-between w-full sm:flex-row gap-y-[16px]">
                                    <div className={`w-full grid grid-cols-1
                     md:${allFormData?.formFields?.form_fields
                                            ?.filter((f: any) => f?.sectionId === section?.id)?.length === 1 ? "" : "grid-cols-2"}
                      mb-4
                      
                      ${section?.sectionName === "Upload Documents" &&
                                            documentData?.length <= 3 ? "md:grid-cols-1" : "md:grid-cols-2"
                                        }`}>
                                        {allFormData?.formFields?.form_fields
                                            ?.filter((f: any) => f?.sectionId === section?.id)
                                            ?.sort((a: any, b: any) => a?.sortOrder - b?.sortOrder)
                                            ?.map((field: any, idx: number) => {
                                                return (
                                                    <div
                                                        className={`sm:mr-[48px] flex justify-between py-1 pr-4 ${idx % 2 === 0
                                                                ? "sm:border-r border-r-[#385723] border-opacity-20"
                                                                : ""
                                                            } `}
                                                        key={idx}
                                                    >
                                                        <div className="text-gray-500 w-1/2">
                                                            {field.label}
                                                            <span className="text-[#ff0000]">*</span>
                                                        </div>
                                                        <div className="w-full text-right">
                                                            {field?.dscFileNAme !== "" &&
                                                                field?.dscFileNAme !== undefined
                                                                ? field?.dscFileNAme
                                                                : field.userInput}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        {section?.sectionName === "Upload Documents" &&
                                            documentData?.map((doc: any, idx: number) => {
                                                return (
                                                    <div
                                                        className={`sm:mr-[48px] flex justify-between py-1 pr-4 ${idx % 2 === 0
                                                                ? "sm:border-r border-r-[#385723] border-opacity-20"
                                                                : ""
                                                            } 
                            
                            ${section?.sectionName === "Upload Documents" &&
                                                                documentData?.length <= 3 ? "py-0 pr-0 border-hidden" : ""
                                                            }       
                            
                            `}
                                                        key={idx}
                                                    >
                                                        <div className="text-gray-500">
                                                            {doc?.documentName}
                                                            <span className="text-[#ff0000]">*</span>
                                                        </div>
                                                        <div>{doc?.fileName}</div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                )}
        </>
    )
}

export default ReviewMainListing