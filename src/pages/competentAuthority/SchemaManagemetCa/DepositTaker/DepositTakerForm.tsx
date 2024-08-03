import React, { useEffect, useState } from "react";
import TaskTabs from "../../../../components/ScehmaManagement/TaskTabsRg";
import { createColumnHelper } from "@tanstack/table-core";
import "./DepositTakerForm.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { bffUrl } from "../../../../utils/api";
import { useDepositTakerRegistrationStore } from "../../../../store/registrationStore";
import { getMimeTypeFromArrayBuffer } from "../../../../utils/commonFunction";
import Swal from "sweetalert2";
import ReactTable from "../../../../components/userFlow/common/ReactTable";
import TaskTabsCa from "../../../../components/ScehmaManagement/TaskTabsCa";
import SelectButton from "../../../../../src/components/userFlow/form/SelectButton";
import { useScreenWidth } from "../../../../utils/screenSize";
import LoaderSpin from "../../../../components/LoaderSpin";
import { axiosTokenInstance } from "../../../../utils/axios";
import FolderIcon from "../../../../assets/images/new_images/FolderOpen.png";
import Button from "../../../../components/form/Button";

const DepositTakerForm = () => {
  const navigate = useNavigate();
  const screenWidth = useScreenWidth();

  const location = useLocation();
  const [loader, setLoader] = useState<boolean>(false);
  const depositTakerId = location.state?.depositTakerId;
  const [dataBranch, setDataBranch] = useState([]);
  const { setAllFormData, setAllDocumentData, allFormData, documentData } =
    useDepositTakerRegistrationStore((state) => state);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

  const getBranches = () => {
    setLoader(true);

    axiosTokenInstance
      .get(`deposit-taker/branch/${depositTakerId}`)
      .then((res: any) => {
        setDataBranch(res?.data?.data?.branches);

        setLoader(false);
      })
      .catch((error: any) => {
        console.log(error.message);
        setLoader(false);
      });
  };

  useEffect(() => {
    getBranches();
  }, []);
  const fetchFormFields = () => {
    setLoader(true);
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
          } catch (error) {
            console.log("Error");
          }
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
          setAllFormData(obj);
          setAllDocumentData(modifiedFileFields);
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

  const getFileDatafromBuffer = async (arrayBuffer: any) => {
    const buffer = new Uint8Array(arrayBuffer);
    const type = await getMimeTypeFromArrayBuffer(buffer);
    const blob = new Blob([buffer], { type: type ?? "" });
    const imageUrl = URL.createObjectURL(blob);
    window.open(imageUrl, "_blank", "noopener");
  };
  const TableType = {
    sno: Number,
    id: Number,
    depositTakerId: String,
    addressLine1: String,
    addressLine2: String,
    state: String,
    district: String,
  };

  let count: number;
  const serialNoGen = (page: number) => {
    count = (page - 1) * 10;
  };
  serialNoGen(page);

  const columnHelper = createColumnHelper<typeof TableType>();

  const columns = [
    columnHelper.accessor("sno", {
      cell: () => {
        while (count <= total) {
          count++;
          return count;
        }
      },
      header: () => <span>Sr. No.</span>,
    }),

    columnHelper.accessor("depositTakerId", {
      cell: (info) => info.renderValue(),
      header: () => <span>Deposit Taker Id</span>,
    }),
    columnHelper.accessor("addressLine1", {
      cell: (info) => info.renderValue(),
      header: () => <span>Address Line 1</span>,
    }),
    columnHelper.accessor("addressLine2", {
      cell: (info) => info.renderValue(),
      header: () => <span>Address Line 2</span>,
    }),
    columnHelper.accessor("state", {
      cell: (info) => info.renderValue(),
      header: () => <span>State</span>,
    }),
    columnHelper.accessor("district", {
      cell: (info) => info.renderValue(),
      header: () => <span>District</span>,
    }),
  ];

  const handleOnClikcView = async (uploadFileId: any) => {
    try {
      setLoader(true);
      const response = await axios.get(`${bffUrl}/openkm/get/${uploadFileId}`);
      const data = await response.data;
      if (data?.status === "INTERNAL_SERVER_ERROR") {
        Swal.fire({
          icon: "error",
          title: "Internal Server Error",
          text: "Unable to Open File",
        });
        setLoader(false);
        return;
      }
      const arrayBuffer = data?.data?.data;

      await getFileDatafromBuffer(arrayBuffer);
      // setViewLoader(false);
      fetchFormFields();
      // window.location.reload();
    } catch (error) {
      console.log({ error });
      // setViewLoader(false);
    }
  };

  const [selectedOption1, setSelectedOption1] = useState<string | null>(null);
  const [searchInputValue1, setSearchInputValue1] = useState<string>("");

  const handleSetOption1 = (value: string) => {
    setSelectedOption1(value);
  };

  const handleSearchInputChange1 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInputValue1(event.target.value);
  };
  const options1 = [
    { value: "Pvt Ltd", label: "Pvt Ltd" },
    { value: "LLP", label: "LLP" },
    { value: "Sole PArtnership", label: "Sole PArtnership" },
  ];
  const handleBackButtonClick = () => {
    navigate("/ca/deposit-taker");
  };
  return (
    <div>
      <div className="relative mx-4 xl:ml-[40px]">
        <div className="mt-6">
          <TaskTabsCa />
        </div>
        <div>
          <>
            {loader ? (
              <LoaderSpin />
            ) : (
              <>
                <div className="container mx-auto">
                  <div id="reviewContent">
                    <h1 className=" text-gilroy-bold text-[#24222B] text-2xl font-bold  my-7"></h1>
                    {allFormData?.entitySections
                      ?.filter(
                        (s: any) => s?.sectionName !== "Upload Documents"
                      )
                      ?.map((section: any, index: number) => (
                        <div className="mb-[16px] " key={index}>
                          <div className="rounded-t-lg bg-[#e7f0ff] flex justify-between h-[57px] font-bold">
                            <p className="lg:w-[152px] ml-[16px] mt-[16px] text-[16px] lg:text-[20px] pb-2 text-nowrap">
                              {section?.sectionName}
                            </p>
                            <button className="text-[#385723] text-[16px] lg:text-[20px] mr-[13px] font-normal ">
                              {/* {section.buttonText} */}
                            </button>
                          </div>
                          <div className="shadow-sm p-5 rounded-md">
                            <div className="flex flex-col justify-between w-full sm:flex-row gap-y-[16px]">
                              <div className="w-full grid grid-cols-2">
                                {allFormData?.formFields?.form_fields
                                  ?.filter(
                                    (f: any) => f?.sectionId === section?.id
                                  )
                                  ?.map((field: any, idx: number) => (
                                    <div
                                      className={`${
                                        idx % 2 === 0
                                          ? "pr-4 pt-2 sm:border-r-[0.5px] border-r-[#385723] border-opacity-20"
                                          : "pl-4 pt-2"
                                      } flex justify-between`}
                                      key={idx}
                                    >
                                      <div className="opacity-60">
                                        {field.label}
                                        {/* <span className="text-[#ff0000]">
                                              *
                                            </span> */}
                                      </div>
                                      <div className="break-all">
                                        {field.label === "DSC3 Certificate"
                                          ? "DSC Certification "
                                          : field.userInput}
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    <div className="w-full overflow-x-auto ">
                      <div className="rounded-t-lg bg-[#e7f0ff] flex justify-between h-[57px] font-bold mb-4">
                        <p className="lg:w-[152px] ml-[16px] mt-[16px] text-[16px] lg:text-[20px] pb-2 text-nowrap">
                          Branches
                        </p>
                      </div>
                      <div
                        className="custom-scrollbar"
                        style={{ maxHeight: "200px", overflowY: "auto" }}
                      >
                        {loader ? (
                          <LoaderSpin />
                        ) : dataBranch?.length > 0 ? (
                          <ReactTable
                            defaultData={dataBranch}
                            columns={columns}
                          />
                        ) : (
                          <div className=" flex justify-center items-center">
                            <p>No data available</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="rounded-t-lg bg-[#e7f0ff] flex justify-between h-[57px] font-bold mb-4">
                        <p className="lg:w-[152px] ml-[16px] mt-[16px] text-xl lg:text-[20px] pb-2 text-nowrap">
                          Upload Documents
                        </p>
                      </div>
                      {documentData?.map((uploadItem: any, index: number) => {
                        return (
                          <>
                            <div
                              key={index}
                              className="rounded-t-lg rounded-b-lg bg-[#e7f0ff] flex justify-between items-center h-16 text-gilroy-bold mb-4"
                            >
                              <div className="flex p-7 space-x-2 ">
                                <div className="">
                                  <img
                                    src={FolderIcon}
                                    alt={FolderIcon}
                                    className="w-12"
                                  />
                                </div>
                                <div className="">
                                  <h1 className="text-sm font-normal text-gilroy-medium text-[#1D1D1B]">
                                    {uploadItem?.documentName}
                                  </h1>
                                  <p className="text-base font-normal text-gilroy-medium text-gray-400">
                                    Document.pdf
                                  </p>
                                </div>
                              </div>
                              <div className="mr-3">
                                <Button
                                  disabled={
                                    uploadItem?.uploadFileId === undefined &&
                                    uploadItem?.file === undefined
                                  }
                                  label="View"
                                  type="button"
                                  width="100px"
                                  onClick={() =>
                                    handleOnClikcView(uploadItem?.uploadFileId)
                                  }
                                />
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    className="flex w-full p-4 lg:px-[30px] flex-row justify-between items-center "
                    style={{
                      width: `${
                        screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"
                      }`,
                    }}
                  >
                    <div className="flex flex-row items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="shrink-0"
                      >
                        <path
                          d="M15 6L9 12L15 18"
                          stroke="#1D1D1B"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <button
                        onClick={handleBackButtonClick}
                        className="text-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#385723]"
                      >
                        Back
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
              </>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default DepositTakerForm;
