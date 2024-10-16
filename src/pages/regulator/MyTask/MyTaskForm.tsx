import React, { useEffect, useState } from "react";
import TaskTabs from "../../../components/ScehmaManagement/TaskTabsRg";
import { createColumnHelper } from "@tanstack/table-core";
import FolderIcon from "../../../assets/images/new_images/FolderOpen.png";
import Button from "../../../components/form/Button";
import BackArrow from "../../../assets/images/BackArrow.svg";
import ApprovModelPopup from "../../../components/MyTasks/ApprovePopup";
import ReturnModelPopup from "../../../components/MyTasks/ReturnModelPopup";
import SubRejectModelPopup from "../../../components/MyTasks/SubRejectModelPopup";
import "./mytaskform.css";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosTokenInstance } from "../../../utils/axios";
import { number } from "yup";
import LoaderSpin from "../../../components/LoaderSpin";
import { useDepositTakerRegistrationStore } from "../../../store/registrationStore";
import { getMimeTypeFromArrayBuffer } from "../../../utils/commonFunction";
import Swal from "sweetalert2";
import moment from "moment";
import ReactTable from "../../../components/userFlow/common/ReactTable";
import { set } from "react-hook-form";

const TableType = {
  sno: number,
  id: number,
  depositTakerId: String,
  addressLine1: String,
  addressLine2: String,
  state: String,
  district: String,
};

const MyTaskForm = () => {
  const location = useLocation();
  const depositTakerId = location.state?.depositTakerId;
  const approverRelation =
    location.state?.approverRelation?.firstName +
    " " +
    location.state?.approverRelation?.lastName;
  const status = location?.state?.status;
  const approvalDocuments = location?.state?.approvalDocuments?.name;
  const approveTimeStamp = location?.state?.approveTimeStamp;
  const pages = location?.state?.pages;
  const [loader, setLoader] = useState<boolean>(false);
  const [loader1, setLoader1] = useState<boolean>(false);
  const [viewLoaders, setViewLoaders] = useState<Record<number, boolean>>({});
  const [dataBranch, setDataBranch] = useState([]);
  const [dataManagementTeam, setDataManagementTeam] = useState([]);
  const { setAllFormData, allFormData, documentData, setAllDocumentData } =
    useDepositTakerRegistrationStore((state) => state);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [mytask, setMytask] = useState<boolean>(false);

  useEffect(() => {
    const sessionData = sessionStorage.getItem("roles");
    if (sessionData) {
      const rolesArray: string[] = sessionData.split(",");
      const mytaskRoles = rolesArray.filter(
        (role) => role === "dt-approver-role-regulator"
      );
      if (mytaskRoles?.length > 0) {
        setMytask(true);
      }
    }
  }, []);

  const getBranches = () => {
    setLoader(true);

    axiosTokenInstance
      .get(`deposit-taker/branch/${depositTakerId}`)
      .then((res) => {
        setDataBranch(res?.data?.data?.branches);

        setLoader(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoader(false);
      });
  };

  const getManagementDetails = () => {
    setLoader(true);
    axiosTokenInstance
      .get(`deposit-taker/management-team/${depositTakerId}`)
      .then((res) => {
        setDataManagementTeam(res?.data?.data);
        console.log(res.data);

        setLoader(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoader(false);
      });
  };

  useEffect(() => {
    getBranches();
    getManagementDetails();
  }, [depositTakerId]);
  const fetchFormFields = () => {
    setLoader1(true);
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
  }, [depositTakerId]);
  const TableType = {
    sno: number,
    id: number,
    depositTakerId: String,
    firstName: String,
    middleName: String,
    lastName: String,
    addressLine1: String,
    addressLine2: String,
    pincode: String,
    state: String,
    district: String,
    landlineNumber: String,
    email: String,
    designation: String,
  };
  let count: number;
  const serialNoGen = (page: number) => {
    count = (page - 1) * 10;
  };
  serialNoGen(page);

  const columnHelper = createColumnHelper<typeof TableType>();

  // const columns = [
  //   columnHelper.accessor("sno", {
  //     cell: () => {
  //       while (count <= total) {
  //         count++;
  //         return count;
  //       }
  //     },
  //     header: () => <span>Sr. No.</span>,
  //   }),

  //   columnHelper.accessor("depositTakerId", {
  //     cell: (info) => info.renderValue(),
  //     header: () => <span>Deposit Taker Id</span>,
  //   }),
  //   columnHelper.accessor("addressLine1", {
  //     cell: (info) => info.renderValue(),
  //     header: () => <span>Address Line 1</span>,
  //   }),
  //   columnHelper.accessor("addressLine2", {
  //     cell: (info) => info.renderValue(),
  //     header: () => <span>Address Line 2</span>,
  //   }),
  //   columnHelper.accessor("state", {
  //     cell: (info) => info.renderValue(),
  //     header: () => <span>State</span>,
  //   }),
  //   columnHelper.accessor("district", {
  //     cell: (info) => info.renderValue(),
  //     header: () => <span>District</span>,
  //   }),
  // ];
  const columns = [
    columnHelper.accessor("sno", {
      header: () => <span>Sr. No.</span>,
      cell: (info) => {
        // Calculate serial number based on current page and index of the row
        const serialNumber = (page - 1) * pageSize + (info.row.index + 1);
        return <span>{serialNumber}</span>;
      },
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
  const columnsMangement = [
    columnHelper.accessor("sno", {
      header: () => <span>Sr. No.</span>,
      cell: (info) => {
        const serialNumber = (page - 1) * pageSize + (info.row.index + 1);
        return <span>{serialNumber}</span>;
      },
    }),
    columnHelper.accessor("firstName", {
      cell: (info) => info.renderValue(),
      header: () => <span>First Name</span>,
    }),
    columnHelper.accessor("middleName", {
      cell: (info) => info.renderValue(),
      header: () => <span>Middle Name</span>,
    }),
    columnHelper.accessor("lastName", {
      cell: (info) => info.renderValue(),
      header: () => <span>Last Name</span>,
    }),
    columnHelper.accessor("addressLine1", {
      cell: (info) => info.renderValue(),
      header: () => <span>Address Line 1</span>,
    }),
    columnHelper.accessor("addressLine2", {
      cell: (info) => info.renderValue(),
      header: () => <span>Address Line 2</span>,
    }),
    columnHelper.accessor("pincode", {
      cell: (info) => info.renderValue(),
      header: () => <span>Pincode</span>,
    }),
    columnHelper.accessor("state", {
      cell: (info) => info.renderValue(),
      header: () => <span>State</span>,
    }),
    columnHelper.accessor("district", {
      cell: (info) => info.renderValue(),
      header: () => <span>District</span>,
    }),
    columnHelper.accessor("landlineNumber", {
      cell: (info) => info.renderValue(),
      header: () => <span>Landline Number</span>,
    }),
    columnHelper.accessor("email", {
      cell: (info) => info.renderValue(),
      header: () => <span>Email</span>,
    }),
    columnHelper.accessor("designation", {
      cell: (info) => info.renderValue(),
      header: () => <span>Designation</span>,
    }),
  ];

  const getFileDatafromBuffer = async (arrayBuffer: any) => {
    const buffer = new Uint8Array(arrayBuffer);
    const type = await getMimeTypeFromArrayBuffer(buffer);
    const blob = new Blob([buffer], { type: type ?? "" });
    const imageUrl = URL.createObjectURL(blob);
    window.open(imageUrl, "_blank", "noopener");
  };

  const handleOnClikcView = async (uploadFileId: any, index: number) => {
    try {
      // setLoader(true);
      setViewLoaders((prev) => ({ ...prev, [index]: true }));
      const response = await axiosTokenInstance.get(
        `/openkm/get/${uploadFileId}`
      );
      const data = await response.data;
      if (data?.status === "INTERNAL_SERVER_ERROR") {
        Swal.fire({
          icon: "error",
          title: "Internal Server Error",
          text: "Unable to Open File",
        });
        // setLoader(false);
        setViewLoaders((prev) => ({ ...prev, [index]: false }));
        return;
      }
      const arrayBuffer = data?.data?.data;

      await getFileDatafromBuffer(arrayBuffer);
      // await fetchFormFields();
      // setLoader(false);
      setViewLoaders((prev) => ({ ...prev, [index]: false }));
    } catch (error) {
      console.log({ error });
      // setLoader(false);
      setViewLoaders((prev) => ({ ...prev, [index]: false }));
    }
  };

  const [authorityModel, setAuthorityModel] = useState<boolean>(false);

  const [referModel, setRefererModel] = useState<boolean>(false);
  const [approveModel, setApproveModel] = useState<boolean>(false);
  const [returnModel, setReturnModel] = useState<boolean>(false);
  const [rejectModel, setRejectModel] = useState<boolean>(false);
  const handleRefer = () => {
    setRefererModel(true);
  };
  const handleReturn = () => {
    setReturnModel(true);
  };
  const handleApproveModel = () => {
    setApproveModel(true);
  };
  const handleRejectModel = () => {
    setRejectModel(true);
  };

  const CloseReferModel = () => {
    setRefererModel(false);
  };
  const CloseApproveModel = () => {
    setApproveModel(false);
  };

  const CloseReturnModel = () => {
    setReturnModel(false);
  };
  const CloseRejectModel = () => {
    setRejectModel(false);
  };

  const handlerauthority = () => {
    setAuthorityModel(true);
  };

  const CloseAuthorityMode = () => {
    setAuthorityModel(false);
  };

  const navigate = useNavigate();
  const handleBack = () => {
    const currentPage = pages || 1;
    navigate("/rg/mytask", { state: { currentPage } });
  };

  return (
    <div>
      <div className='relative mx-4 xl:ml-[40px]'>
        <div>
          <>
            {loader ? (
              <LoaderSpin />
            ) : (
              <>
                <div className='container mx-auto'>
                  <div id='reviewContent'>
                    {status === "TRANSIT" && (
                      <p className='text-[#24222B] text-sm mt-3 font-normal text-gilroy-bold'>
                        This record has been approved by {approverRelation} on
                        &nbsp;
                        {moment(approveTimeStamp).format("L")} basis supporting
                        document {approvalDocuments}
                      </p>
                    )}

                    <h1 className=' text-gilroy-bold text-[#24222B] text-2xl font-bold  my-2'></h1>
                    {allFormData?.entitySections
                      ?.filter(
                        (s: any) => s?.sectionName !== "Upload Documents"
                      )
                      ?.map((section: any, index: number) => (
                        <div className='mb-[16px] ' key={index}>
                          <div className='rounded-t-lg bg-[#e7f0ff] flex justify-between h-[57px] font-bold'>
                            <p className='lg:w-[152px] ml-[16px] mt-[16px] text-[16px] lg:text-[20px] pb-2 text-nowrap'>
                              {section?.sectionName === "Nodal Details"
                                ? "Nodal Officer Details"
                                : section?.sectionName}
                            </p>
                            <button className='text-[#385723] text-[16px] lg:text-[20px] mr-[13px] font-normal '>
                              {/* {section.buttonText} */}
                            </button>
                          </div>
                          <div className='shadow-sm p-5 rounded-md'>
                            <div className='flex flex-col justify-between w-full sm:flex-row gap-y-[16px]'>
                              <div className='w-full grid grid-cols-2'>
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
                                      <div className='opacity-60'>
                                        {field.label}
                                        {/* <span className="text-[#ff0000]">
                                              *
                                            </span> */}
                                      </div>
                                      {/* <div className="break-all">
                                        {field.label === "DSC3 Certificate"
                                          ? "DSC Certification "
                                          : field.userInput}
                                      </div> */}
                                      <div className='break-all'>
                                        {field.label === "DSC3 Certificate"
                                          ? "DSC Certification "
                                          : field?.label ===
                                              "Regulator approval Date" ||
                                            field?.label ===
                                              "Date of In-corporation"
                                          ? moment(field.userInput).format(
                                              "DD/MM/YYYY"
                                            )
                                          : field.userInput}
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className='w-full overflow-x-auto '>
                    <div className='rounded-t-lg bg-[#e7f0ff] flex justify-between h-[57px] font-bold mb-4'>
                      <p className='lg:w-[152px] ml-[16px] mt-[16px] text-[16px] lg:text-[20px] pb-2 text-nowrap'>
                        Branches
                      </p>
                    </div>
                    <div
                      className='custom-scrollbar'
                      style={{ maxHeight: "200px", overflowY: "auto" }}
                    >
                      {loader ? (
                        <LoaderSpin />
                      ) : dataBranch.length > 0 ? (
                        <ReactTable
                          defaultData={dataBranch}
                          columns={columns}
                        />
                      ) : (
                        <div className=' flex justify-center items-center'>
                          <p>No data available</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='w-full overflow-x-auto mt-4 mb-3'>
                    <div className='rounded-t-lg bg-[#e7f0ff] flex justify-between h-[57px] font-bold mb-4'>
                      <p className='lg:w-[152px] ml-[16px] mt-[16px] text-[16px] lg:text-[20px] pb-2 text-nowrap'>
                        Management Details
                      </p>
                    </div>
                    <div
                      className='custom-scrollbar'
                      style={{ maxHeight: "200px", overflowY: "auto" }}
                    >
                      {loader ? (
                        <LoaderSpin />
                      ) : dataManagementTeam.length > 0 ? (
                        <ReactTable
                          defaultData={dataManagementTeam}
                          columns={columnsMangement}
                        />
                      ) : (
                        <div className=' flex justify-center items-center'>
                          <p>No data available</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className='rounded-t-lg bg-[#e7f0ff] flex justify-between h-[57px] font-bold mb-4'>
                      <p className='lg:w-[152px] ml-[16px] mt-[16px] text-xl lg:text-[20px] pb-2 text-nowrap'>
                        Upload Documents
                      </p>
                    </div>
                    {documentData.map((uploadItem: any, index: number) => {
                      return (
                        <>
                          <div
                            key={index}
                            className='rounded-t-lg rounded-b-lg bg-[#e7f0ff] flex justify-between items-center h-16 text-gilroy-bold mb-4'
                          >
                            <div className='flex p-7 space-x-2 items-center'>
                              <div className=''>
                                <img
                                  src={FolderIcon}
                                  alt={FolderIcon}
                                  className='w-12'
                                />
                              </div>
                              <div className=''>
                                <h1 className='text-sm font-normal text-gilroy-medium text-[#1D1D1B]'>
                                  {uploadItem?.documentName}
                                </h1>
                                {/* <p className="text-base font-normal text-gilroy-medium text-gray-400">
                                  Document.pdf
                                </p> */}
                              </div>
                            </div>
                            <div className='mr-3'>
                              <Button
                                disabled={
                                  uploadItem.uploadFileId === undefined &&
                                  uploadItem.file === undefined
                                }
                                label='View'
                                type='button'
                                width='100px'
                                loader={viewLoaders[index]}
                                onClick={() =>
                                  handleOnClikcView(
                                    uploadItem?.uploadFileId,
                                    index
                                  )
                                }
                              />
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
            <div className='my-11 flex flex-col lg:flex-row lg:items-center justify-between'>
              <div
                className='flex items-center cursor-pointer space-x-2 mb-3 lg:mb-0 md:ml-[5rem]'
                // onClick={() => navigate(-1)}
                onClick={handleBack}
              >
                <img src={BackArrow} alt='Back Arrow' />
                <p className='text-sm font-normal text-gilroy-regular'>Back</p>
              </div>
              {mytask && (
                <div className='flex flex-wrap justify-center lg:flex-nowrap lg:w-auto items-center space-x-3 lg:justify-end'>
                  <div className='mb-3 lg:mb-0'>
                    <Button
                      type='button'
                      label='Return'
                      width='100px'
                      textColor='#F5BD0B'
                      borderColor='#F5BD0B'
                      backgroundColor='white'
                      onClick={handleReturn}
                    />
                  </div>
                  <div className='mb-3 lg:mb-0'>
                    <Button
                      type='button'
                      label='Reject'
                      width='100px'
                      textColor='#E63312'
                      borderColor='#E63312'
                      backgroundColor='white'
                      onClick={handleRejectModel}
                    />
                  </div>
                  <div className='mb-3 lg:mb-0'>
                    <Button
                      type='button'
                      label='Approve'
                      width='100px'
                      backgroundColor='#1C468E'
                      onClick={handleApproveModel}
                    />
                  </div>
                </div>
              )}
            </div>

            {returnModel && (
              <ReturnModelPopup onClose={CloseReturnModel} onSave={() => {}} />
            )}

            {approveModel && (
              <ApprovModelPopup onClose={CloseApproveModel} onSave={() => {}} />
            )}
            {rejectModel && (
              <SubRejectModelPopup
                onClose={CloseRejectModel}
                onSave={() => {}}
              />
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default MyTaskForm;
