// import React, { useEffect, useState } from "react";
// import TaskTabs from "../../../components/ScehmaManagement/TaskTabsRg";
// import ReactTable from "../../../components/userFlow/common/ReactTable";
// import { createColumnHelper } from "@tanstack/table-core";
// import FolderIcon from "../../../assets/images/new_images/FolderOpen.png";
// import Button from "../../../components/form/Button";
// import BackArrow from "../../../assets/images/BackArrow.svg";
// import ApprovModelPopup from "../../../components/MyTasks/ApprovePopup";
// import ReturnModelPopup from "../../../components/MyTasks/ReturnModelPopup";
// import SubRejectModelPopup from "../../../components/MyTasks/SubRejectModelPopup";
// import "./mytaskform.css";
// import { useLocation, useNavigate } from "react-router-dom";
// import { axiosInstance } from "../../../utils/axios";
// import axios from "axios";
// import { bffUrl } from "../../../utils/api";
// import { number } from "yup";
// import LoaderSpin from "../../../components/LoaderSpin";
// import { useDepositTakerRegistrationStore } from "../../../store/registrationStore";
// import { getMimeTypeFromArrayBuffer } from "../../../utils/commonFunction";
// import Swal from "sweetalert2";
// import moment from "moment";

// type TableType = {
//   sno: string;
//   branchName: string;
//   addressLine1: string;
//   addressLine2: string;
//   state: string;
//   district: string;
// };
// const columnHelper = createColumnHelper<TableType>();

// const MyTaskForm = () => {
//   const location = useLocation();
//   const depositTakerId = location.state?.depositTakerId;
//   const approverRelation =
//     location.state?.approverRelation?.firstName +
//     " " +
//     location.state?.approverRelation?.lastName;
//   const status = location?.state?.status;
//   const approvalDocuments = location?.state?.approvalDocuments?.name;
//   const approveTimeStamp = location?.state?.approveTimeStamp;
//   const [loader, setLoader] = useState<boolean>(false);
//   const [dataBranch, setDataBranch] = useState([]);
//   const { setAllFormData, allFormData, documentData, setAllDocumentData } =
//     useDepositTakerRegistrationStore((state) => state);

//   console.log(approverRelation);

//   const getBranches = () => {
//     setLoader(true);
//     axiosInstance
//       .get(`deposit-taker/branch/${depositTakerId}`)
//       .then((res) => {
//         setDataBranch(res?.data?.data?.branches);

//         setLoader(false);
//       })
//       .catch((error) => {
//         console.log(error.message);
//         setLoader(false);
//       });
//   };

//   useEffect(() => {
//     getBranches();
//   }, []);
//   const fetchFormFields = () => {
//     axios
//       .get(`${bffUrl}/registration/field-data/1?status=addToProfile`)
//       .then(async (response) => {
//         if (response?.data?.success) {
//           let dtData: any = [];
//           try {
//             let depositTakerData = await axios.get(
//               `${bffUrl}/deposit-taker/${depositTakerId}`
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
//           // console.log(obj, "obj-----");
//           setAllFormData(obj);
//           setAllDocumentData(modifiedFileFields);
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
//   const getFileDatafromBuffer = async (arrayBuffer: any) => {
//     const buffer = new Uint8Array(arrayBuffer);
//     const type = await getMimeTypeFromArrayBuffer(buffer);
//     const blob = new Blob([buffer], { type: type ?? "" });
//     const imageUrl = URL.createObjectURL(blob);
//     window.open(imageUrl, "_blank", "noopener");
//   };

//   const handleOnClikcView = async (uploadFileId: any) => {
//     try {
//       setLoader(true);
//       const response = await axios.get(`${bffUrl}/openkm/get/${uploadFileId}`);
//       const data = await response.data;
//       if (data?.status === "INTERNAL_SERVER_ERROR") {
//         Swal.fire({
//           icon: "error",
//           title: "Internal Server Error",
//           text: "Unable to Open File",
//         });
//         setLoader(false);
//         return;
//       }
//       const arrayBuffer = data?.data?.data;

//       await getFileDatafromBuffer(arrayBuffer);
//       // console.log({buffer, type, blob, url});
//       // setViewLoader(false);
//     } catch (error) {
//       console.log({ error });
//       // setViewLoader(false);
//     }
//   };

//   const TableType = {
//     sno: number,
//     id: number,
//     // branchName: String,
//     depositTakerId: String,
//     addressLine1: String,
//     addressLine2: String,
//     state: String,
//     district: String,
//   };

//   const columnHelper = createColumnHelper<typeof TableType>();
//   const defaultData: TableType[] = [
//     {
//       sno: "01",
//       branchName: "DT001",
//       addressLine1: "Deposit Taker 1",
//       addressLine2: "Deposit Taker 2",
//       state: "Ap",
//       district: "Atp",
//     },
//     {
//       sno: "02",
//       branchName: "DT002",
//       addressLine1: "Deposit Taker 2",
//       addressLine2: "Deposit Taker 2",
//       state: "Ap",
//       district: "Atp",
//     },
//     {
//       sno: "03",
//       branchName: "DT002",
//       addressLine1: "Deposit Taker 2",
//       addressLine2: "Deposit Taker 2",
//       state: "Ap",
//       district: "Atp",
//     },
//     {
//       sno: "04",
//       branchName: "DT002",
//       addressLine1: "Deposit Taker 2",
//       addressLine2: "Deposit Taker 2",
//       state: "Ap",
//       district: "Atp",
//     },
//     {
//       sno: "05",
//       branchName: "DT002",
//       addressLine1: "Deposit Taker 2",
//       addressLine2: "Deposit Taker 2",
//       state: "Ap",
//       district: "Atp",
//     },
//     {
//       sno: "06",
//       branchName: "DT002",
//       addressLine1: "Deposit Taker 2",
//       addressLine2: "Deposit Taker 2",
//       state: "Ap",
//       district: "Atp",
//     },
//   ];

//   const columns = [
//     columnHelper.accessor("sno", {
//       cell: (info) => info.renderValue(),
//       header: () => <span>Sr. No.</span>,
//     }),
//     columnHelper.accessor("depositTakerId", {
//       cell: (info) => info.renderValue(),
//       header: () => <span>Deposit Taker Id</span>,
//     }),
//     columnHelper.accessor("addressLine1", {
//       cell: (info) => info.renderValue(),
//       header: () => <span>Address Line 1</span>,
//     }),
//     columnHelper.accessor("addressLine2", {
//       cell: (info) => info.renderValue(),
//       header: () => <span>Address Line 2</span>,
//     }),
//     columnHelper.accessor("state", {
//       cell: (info) => info.renderValue(),
//       header: () => <span>State</span>,
//     }),
//     columnHelper.accessor("district", {
//       cell: (info) => info.renderValue(),
//       header: () => <span>District</span>,
//     }),
//   ];
//   const [referModel, setRefererModel] = useState<boolean>(false);
//   const [approveModel, setApproveModel] = useState<boolean>(false);
//   const [returnModel, setReturnModel] = useState<boolean>(false);
//   const [rejectModel, setRejectModel] = useState<boolean>(false);
//   const handleRefer = () => {
//     setRefererModel(true);
//   };
//   const handleReturn = () => {
//     setReturnModel(true);
//   };
//   const handleApproveModel = () => {
//     setApproveModel(true);
//   };
//   const handleRejectModel = () => {
//     setRejectModel(true);
//   };

//   const CloseReferModel = () => {
//     setRefererModel(false);
//   };
//   const CloseApproveModel = () => {
//     setApproveModel(false);
//   };

//   const CloseReturnModel = () => {
//     setReturnModel(false);
//   };
//   const CloseRejectModel = () => {
//     setRejectModel(false);
//   };
//   const navigate = useNavigate();

//   return (
//     <div>
//       <div className="relative mx-4 xl:ml-[40px]">
//         <div>
//           <>
//             <div className="container mx-auto">
//               <div id="reviewContent">
//                 {status === "TRANSIT" && (
//                   <p>
//                     This record has been approved by {approverRelation} on
//                     &nbsp;
//                     {moment(approveTimeStamp).format("L")} basis supporting
//                     document {approvalDocuments}
//                   </p>
//                 )}

//                 <h1 className=" text-gilroy-bold text-[#24222B] text-2xl font-bold  my-7"></h1>
//                 {allFormData?.entitySections
//                   ?.filter((s: any) => s?.sectionName !== "Upload Documents")
//                   ?.map((section: any, index: number) => (
//                     <div className="mb-[16px] " key={index}>
//                       <div className="rounded-t-lg bg-[#e7f0ff] flex justify-between h-[57px] font-bold">
//                         <p className="lg:w-[152px] ml-[16px] mt-[16px] text-[16px] lg:text-[20px] pb-2 text-nowrap">
//                           {section.sectionName}
//                         </p>
//                         <button className="text-[#385723] text-[16px] lg:text-[20px] mr-[13px] font-normal ">
//                           {/* {section.buttonText} */}
//                         </button>
//                       </div>

//                       <div className=" shadow-sm p-5 rounded-md">
//                         <div className="flex flex-col justify-between w-full sm:flex-row gap-y-[16px]">
//                           <div className="  w-full sm:border-r-[0.5px] border-r-[#385723] border-opacity-20 grid grid-cols-2 gap-y-[16px]">
//                             {/* {allFormData?.formFields?.form_fields
//                                   ?.filter(
//                                     (f: any) => f?.sectionId === section?.id
//                                   )
//                                   ?.map((field: any, idx: number) => (
//                                     <div
//                                       className="sm:mr-[48px] flex justify-between "
//                                       key={idx}
//                                     >
//                                       <div className="opacity-60">
//                                         {field.label}
//                                         <span className="text-[#ff0000]">
//                                           *
//                                         </span>
//                                       </div>
//                                       <div>{field.userInput}</div>
//                                     </div>
//                                   ))} */}
//                             {allFormData?.formFields?.form_fields
//                               ?.filter((f: any) => f?.sectionId === section?.id)
//                               ?.map((field: any, idx: number) => (
//                                 <div
//                                   className="sm:mr-[48px] flex justify-between "
//                                   key={idx}
//                                 >
//                                   <div className="opacity-60">
//                                     {field.label}
//                                   </div>
//                                   <div className="break-all">
//                                     {field.label === "DSC3 Certificate"
//                                       ? "DSC Certification "
//                                       : field.userInput}
//                                   </div>
//                                 </div>
//                               ))}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//               </div>
//               <div className="w-full overflow-x-auto ">
//                 <div className="rounded-t-lg bg-[#e7f0ff] flex justify-between h-[57px] font-bold mb-4">
//                   <p className="lg:w-[152px] ml-[16px] mt-[16px] text-[16px] lg:text-[20px] pb-2 text-nowrap">
//                     Branches
//                   </p>
//                 </div>
//                 <div className="p-5">
//                   <div className="h-32">
//                     <ReactTable defaultData={defaultData} columns={columns} />
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <div className="rounded-t-lg bg-[#e7f0ff] flex justify-between h-[57px] font-bold mb-4">
//                   <p className="lg:w-[152px] ml-[16px] mt-[16px] text-xl lg:text-[20px] pb-2 text-nowrap">
//                     Upload Documents
//                   </p>
//                 </div>

//                 <div className="mb-3">
//                   <div className="p-2">
//                     <div className="bg-blue-900 h-[64px] flex items-center rounded-xl">
//                       <div className="flex flex-row items-center justify-between px-4 w-full">
//                         <div className="flex items-center">
//                           <img
//                             src={FolderIcon}
//                             alt="Folder Icon"
//                             className="h-[44px] w-[44px]"
//                           />
//                           <div className="flex flex-col justify-center ml-2">
//                             <p className="text-white">Document Uploaded</p>
//                             <p className="text-white text-sm">Document.pdf</p>
//                           </div>
//                         </div>
//                         <button type="button" className="text-white">
//                           View
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="my-11 flex flex-col sm:flex-row justify-between items-center">
//               <div
//                 className="flex items-center cursor-pointer space-x-2 mb-3 sm:mb-0"
//                 onClick={() => navigate(-1)}
//               >
//                 <img src={BackArrow} alt={BackArrow} />
//                 <p className="text-sm font-normal text-gilroy-regular">Back</p>
//               </div>
//               <div className="flex flex-wrap justify-center sm:w-7/12 items-center space-x-3 sm:mb-3">
//                 <div className="mb-3 sm:mb-0">
//                   <Button
//                     type="button"
//                     label="Return"
//                     width="100px"
//                     textColor="#F5BD0B"
//                     borderColor="#F5BD0B"
//                     backgroundColor="white"
//                     onClick={handleReturn}
//                   />
//                 </div>
//                 <div className="mb-3 sm:mb-0">
//                   <Button
//                     type="button"
//                     label="Reject"
//                     width="100px"
//                     textColor="#E63312"
//                     borderColor="#E63312"
//                     backgroundColor="white"
//                     onClick={handleRejectModel}
//                   />
//                 </div>

//                 <div className="mb-3 sm:mb-0">
//                   <Button
//                     type="button"
//                     label="Approve"
//                     width="100px"
//                     backgroundColor="#1C468E"
//                     onClick={handleApproveModel}
//                   />
//                 </div>
//               </div>
//             </div>

//             {returnModel && (
//               <ReturnModelPopup onClose={CloseReturnModel} onSave={() => {}} />
//             )}

//             {approveModel && (
//               <ApprovModelPopup
//                 closePopup={CloseApproveModel}
//                 SuccessPopup={() => {}}
//               />
//             )}
//             {rejectModel && (
//               <SubRejectModelPopup
//                 onClose={CloseRejectModel}
//                 onSave={() => {}}
//               />
//             )}
//           </>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyTaskForm;

// import React, { useEffect, useState } from "react";
// import TaskTabs from "../../../components/ScehmaManagement/TaskTabsRg";
// import ReactTable from "../../../components/userFlow/common";
// import { createColumnHelper } from "@tanstack/table-core";
// import FolderIcon from "../../assets/images/new_images/FolderOpen.png";
// import Button from "../../../components/form/Button";
// import BackArrow from "../../assets/images/BackArrow.svg";
// import ReferModelPopup from "../../../components/MyTasks/ReferModelPopup";
// import ApprovModelPopup from "../../../components/MyTasks/ApproveModelPopup";
// import ReturnModelPopup from "../../../components/MyTasks/ReturnModelPopup";
// import SubRejectModelPopup from "../../../components/MyTasks/SubRejectModelPopup";
// import "../myTask/mytaskform.css";
// import { useLocation, useNavigate } from "react-router-dom";
// import { axiosInstance } from "../../../utils/axios";
// import axios from "axios";
// import { bffUrl } from "../../../utils/api";
// import { number } from "yup";
// import LoaderSpin from "../../../components/LoaderSpin";
// import { useDepositTakerRegistrationStore } from "../../../store/registrationStore";
// import { getMimeTypeFromArrayBuffer } from "../../../utils/commonFunction";
// import Swal from "sweetalert2";
// import moment from "moment";

// const MyTaskForm = () => {
//   const location = useLocation();
//   const depositTakerId = location.state?.depositTakerId;
//   const approverRelation =
//     location.state?.approverRelation?.firstName +
//     " " +
//     location.state?.approverRelation?.lastName;
//   const status = location?.state?.status;
//   const approvalDocuments = location?.state?.approvalDocuments?.name;
//   const approveTimeStamp = location?.state?.approveTimeStamp;
//   const [loader, setLoader] = useState<boolean>(false);
//   const [dataBranch, setDataBranch] = useState([]);
//   const { setAllFormData, allFormData, documentData, setAllDocumentData } =
//   useDepositTakerRegistrationStore((state) => state);

//   console.log(approverRelation);

//   const getBranches = () => {
//     setLoader(true);
//     axiosInstance
//       .get(`deposit-taker/branch/${depositTakerId}`)
//       .then((res) => {
//         setDataBranch(res?.data?.data?.branches);

//         setLoader(false);
//       })
//       .catch((error) => {
//         console.log(error.message);
//         setLoader(false);
//       });
//   };

//   useEffect(() => {
//     getBranches();
//   }, []);
//   const fetchFormFields = () => {
//     axios
//       .get(`${bffUrl}/registration/field-data/1?status=addToProfile`)
//       .then(async (response) => {
//         if (response?.data?.success) {
//           let dtData: any = [];
//           try {
//             let depositTakerData = await axios.get(
//               `${bffUrl}/deposit-taker/${depositTakerId}`
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
//           // console.log(obj, "obj-----");
//           setAllFormData(obj);
//           setAllDocumentData(modifiedFileFields);
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
//   const getFileDatafromBuffer = async (arrayBuffer: any) => {
//     const buffer = new Uint8Array(arrayBuffer);
//     const type = await getMimeTypeFromArrayBuffer(buffer);
//     const blob = new Blob([buffer], { type: type ?? "" });
//     const imageUrl = URL.createObjectURL(blob);
//     window.open(imageUrl, "_blank", "noopener");
//   };

//   const handleOnClikcView = async (uploadFileId: any) => {
//     try {
//       setLoader(true);
//       const response = await axios.get(`${bffUrl}/openkm/get/${uploadFileId}`);
//       const data = await response.data;
//       if (data?.status === "INTERNAL_SERVER_ERROR") {
//         Swal.fire({
//           icon: "error",
//           title: "Internal Server Error",
//           text: "Unable to Open File",
//         });
//         setLoader(false);
//         return;
//       }
//       const arrayBuffer = data?.data?.data;

//       await getFileDatafromBuffer(arrayBuffer);
//       // console.log({buffer, type, blob, url});
//       // setViewLoader(false);
//     } catch (error) {
//       console.log({ error });
//       // setViewLoader(false);
//     }
//   };

//   const TableType = {
//     sno: number,
//     id: number,
//     // branchName: String,
//     depositTakerId: String,
//     addressLine1: String,
//     addressLine2: String,
//     state: String,
//     district: String,
//   };

//   const columnHelper = createColumnHelper<typeof TableType>();

//   const columns = [
//     columnHelper.accessor("sno", {
//       cell: (info) => info.renderValue(),
//       header: () => <span>Sr. No.</span>,
//     }),
//     columnHelper.accessor("depositTakerId", {
//       cell: (info) => info.renderValue(),
//       header: () => <span>Deposit Taker Id</span>,
//     }),
//     columnHelper.accessor("addressLine1", {
//       cell: (info) => info.renderValue(),
//       header: () => <span>Address Line 1</span>,
//     }),
//     columnHelper.accessor("addressLine2", {
//       cell: (info) => info.renderValue(),
//       header: () => <span>Address Line 2</span>,
//     }),
//     columnHelper.accessor("state", {
//       cell: (info) => info.renderValue(),
//       header: () => <span>State</span>,
//     }),
//     columnHelper.accessor("district", {
//       cell: (info) => info.renderValue(),
//       header: () => <span>District</span>,
//     }),
//   ];
//   const [referModel, setRefererModel] = useState<boolean>(false);
//   const [approveModel, setApproveModel] = useState<boolean>(false);
//   const [returnModel, setReturnModel] = useState<boolean>(false);
//   const [rejectModel, setRejectModel] = useState<boolean>(false);
//   const handleRefer = () => {
//     setRefererModel(true);
//   };
//   const handleReturn = () => {
//     setReturnModel(true);
//   };
//   const handleApproveModel = () => {
//     setApproveModel(true);
//   };
//   const handleRejectModel = () => {
//     setRejectModel(true);
//   };

//   const CloseReferModel = () => {
//     setRefererModel(false);
//   };
//   const CloseApproveModel = () => {
//     setApproveModel(false);
//   };

//   const CloseReturnModel = () => {
//     setReturnModel(false);
//   };
//   const CloseRejectModel = () => {
//     setRejectModel(false);
//   };
//   const navigate = useNavigate();

//   return (
//     <div>

//           <div className="relative mx-4 xl:ml-[40px]">
//             <div className="mt-6 ">
//               <TaskTabs />
//             </div>
//             <div>
//               <>
//                 <div className="container mx-auto">
//                   <div id="reviewContent">
//                     {status === "TRANSIT" && (
//                       <p>
//                         This record has been approved by {approverRelation} on &nbsp;
//                          {moment(approveTimeStamp).format("L")} basis supporting document{" "}
//                         {approvalDocuments}
//                       </p>
//                     )}

//                     <h1 className=" text-gilroy-bold text-[#24222B] text-2xl font-bold  my-7"></h1>
//                     {allFormData?.entitySections
//                       ?.filter(
//                         (s: any) => s?.sectionName !== "Upload Documents"
//                       )
//                       ?.map((section: any, index: number) => (
//                         <div className="mb-[16px] " key={index}>
//                           <div className="rounded-t-lg bg-[#e7f0ff] flex justify-between h-[57px] font-bold">
//                             <p className="lg:w-[152px] ml-[16px] mt-[16px] text-[16px] lg:text-[20px] pb-2 text-nowrap">
//                               {section.sectionName}
//                             </p>
//                             <button className="text-[#385723] text-[16px] lg:text-[20px] mr-[13px] font-normal ">
//                               {/* {section.buttonText} */}
//                             </button>
//                           </div>

//                           <div className=" shadow-sm p-5 rounded-md">
//                             <div className="flex flex-col justify-between w-full sm:flex-row gap-y-[16px]">
//                               <div className="  w-full sm:border-r-[0.5px] border-r-[#385723] border-opacity-20 grid grid-cols-2 gap-y-[16px]">
//                                 {/* {allFormData?.formFields?.form_fields
//                                   ?.filter(
//                                     (f: any) => f?.sectionId === section?.id
//                                   )
//                                   ?.map((field: any, idx: number) => (
//                                     <div
//                                       className="sm:mr-[48px] flex justify-between "
//                                       key={idx}
//                                     >
//                                       <div className="opacity-60">
//                                         {field.label}
//                                         <span className="text-[#ff0000]">
//                                           *
//                                         </span>
//                                       </div>
//                                       <div>{field.userInput}</div>
//                                     </div>
//                                   ))} */}
//                                 {allFormData?.formFields?.form_fields
//                                   ?.filter(
//                                     (f: any) => f?.sectionId === section?.id
//                                   )
//                                   ?.map((field: any, idx: number) => (
//                                     <div
//                                       className="sm:mr-[48px] flex justify-between "
//                                       key={idx}
//                                     >
//                                       <div className="opacity-60">
//                                         {field.label}
//                                         <span className="text-[#ff0000]">
//                                           *
//                                         </span>
//                                       </div>
//                                       <div className="break-all">
//                                         {field.label === "DSC3 Certificate"
//                                           ? "DSC Certification "
//                                           : field.userInput}
//                                       </div>
//                                     </div>
//                                   ))}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                   </div>
//                   <div className="w-full overflow-x-auto ">
//                     <div className="rounded-t-lg bg-[#e7f0ff] flex justify-between h-[57px] font-bold mb-4">
//                       <p className="lg:w-[152px] ml-[16px] mt-[16px] text-[16px] lg:text-[20px] pb-2 text-nowrap">
//                         Branches
//                       </p>
//                     </div>
//                     <div
//                       className="custom-scrollbar"
//                       style={{ maxHeight: "200px", overflowY: "auto" }}
//                     >
//                       {loader ? (
//                         <LoaderSpin />
//                       ) : dataBranch.length > 0 ? (
//                         <ReactTable
//                           defaultData={dataBranch}
//                           columns={columns}
//                         />
//                       ) : (
//                         <div className=" flex justify-center items-center">
//                           <p>No data available</p>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <div>
//                     <div className="rounded-t-lg bg-[#e7f0ff] flex justify-between h-[57px] font-bold mb-4">
//                       <p className="lg:w-[152px] ml-[16px] mt-[16px] text-xl lg:text-[20px] pb-2 text-nowrap">
//                         Upload Documents
//                       </p>
//                     </div>
//                     {documentData.map((uploadItem: any, index: number) => {
//                       return (
//                         <>
//                           <div
//                             key={index}
//                             className="rounded-t-lg rounded-b-lg bg-[#e7f0ff] flex justify-between items-center h-16 text-gilroy-bold mb-4"
//                           >
//                             <div className="flex p-7 space-x-2 ">
//                               <div className="">
//                                 <img
//                                   src={FolderIcon}
//                                   alt={FolderIcon}
//                                   className="w-12"
//                                 />
//                               </div>
//                               <div className="">
//                                 <h1 className="text-sm font-normal text-gilroy-medium text-[#1D1D1B]">
//                                   {uploadItem?.documentName}
//                                 </h1>
//                                 <p className="text-base font-normal text-gilroy-medium text-gray-400">
//                                   Document.pdf
//                                 </p>
//                               </div>
//                             </div>
//                             <div className="mr-3">
//                               <Button
//                                 disabled={
//                                   uploadItem.uploadFileId === "" ? true : false
//                                 }
//                                 label="View"
//                                 type="button"
//                                 width="100px"
//                                 onClick={() =>
//                                   handleOnClikcView(uploadItem?.uploadFileId)
//                                 }
//                               />
//                             </div>
//                           </div>
//                         </>
//                       );
//                     })}
//                   </div>
//                 </div>
//                 <div className="my-11 flex flex-col sm:flex-row justify-between items-center">
//                   <div
//                     className="flex items-center cursor-pointer space-x-2 mb-3 sm:mb-0"
//                     onClick={() => navigate(-1)}
//                   >
//                     <img src={BackArrow} alt={BackArrow} />
//                     <p className="text-sm font-normal text-gilroy-regular">
//                       Back
//                     </p>
//                   </div>
//                   <div className="flex flex-wrap justify-center sm:w-7/12 items-center space-x-3 sm:mb-3">
//                     <div className="mb-3 sm:mb-0">
//                       <Button
//                         type="button"
//                         label="Return"
//                         width="100px"
//                         textColor="#F5BD0B"
//                         borderColor="#F5BD0B"
//                         backgroundColor="white"
//                         onClick={handleReturn}
//                       />
//                     </div>
//                     <div className="mb-3 sm:mb-0">
//                       <Button
//                         type="button"
//                         label="Reject"
//                         width="100px"
//                         textColor="#E63312"
//                         borderColor="#E63312"
//                         backgroundColor="white"
//                         onClick={handleRejectModel}
//                       />
//                     </div>
//                     <div className="mb-3 sm:mb-0">
//                       <Button
//                         type="button"
//                         label="Refer to regulator"
//                         width="150px"
//                         textColor="#1c468e"
//                         borderColor="#1c468e"
//                         backgroundColor="white"
//                         onClick={handleRefer}
//                       />
//                     </div>
//                     <div className="mb-3 sm:mb-0">
//                       <Button
//                         type="button"
//                         label="Approve"
//                         width="100px"
//                         onClick={handleApproveModel}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {returnModel && (
//                   <ReturnModelPopup
//                     onClose={CloseReturnModel}
//                     onSave={() => {}}
//                   />
//                 )}
//                 {referModel && (
//                   <ReferModelPopup
//                     onClose={CloseReferModel}
//                     onSave={() => {}}
//                   />
//                 )}
//                 {approveModel && (
//                   <ApprovModelPopup
//                     onClose={CloseApproveModel}
//                     onSave={() => {}}
//                   />
//                 )}
//                 {rejectModel && (
//                   <SubRejectModelPopup
//                     onClose={CloseRejectModel}
//                     onSave={() => {}}
//                   />
//                 )}
//               </>
//             </div>
//           </div>

//     </div>
//   );
// };

// export default MyTaskForm;

// import React, { useEffect, useState } from "react";
// import Layout from "../../components/layout/Layout";
// import TaskTabs from "../../components/MyTasks/TaskTabs";
// import FolderIcon from "../../assets/images/folder-open.svg";
// import Button from "../../components/form/Button";
// import BackArrow from "../../assets/images/BackArrow.svg";
// import RegularModelPopup from "../../components/MyTasks/RegulatorModelPopup";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useDepositTakerRegistrationStore } from "../../state/registrationStore";
// import axios from "axios";
// import { bffUrl } from "../../utils/api";
// import Swal from "sweetalert2";
// import { getMimeTypeFromArrayBuffer } from "../../utils/commonFunction";
// import ApprovePopupRegister from "../../components/MyTasks/ApprovePopupRegister";
// import moment from "moment";
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
import { axiosInstance } from "../../../utils/axios";
import axios from "axios";
import { bffUrl } from "../../../utils/api";
import { number } from "yup";
import LoaderSpin from "../../../components/LoaderSpin";
import { useDepositTakerRegistrationStore } from "../../../store/registrationStore";
import { getMimeTypeFromArrayBuffer } from "../../../utils/commonFunction";
import Swal from "sweetalert2";
import moment from "moment";
import ReactTable from "../../../components/userFlow/common/ReactTable";

type TableType = {
  sno: string;
  branchName: string;
  addressLine1: string;
  addressLine2: string;
  state: string;
  district: string;
};

const columnHelper = createColumnHelper<TableType>();

const MyTaskForm = () => {
  const defaultData: TableType[] = [
    {
      sno: "01",
      branchName: "DT001",
      addressLine1: "Deposit Taker 1",
      addressLine2: "Deposit Taker 2",
      state: "Ap",
      district: "Atp",
    },
    {
      sno: "02",
      branchName: "DT002",
      addressLine1: "Deposit Taker 2",
      addressLine2: "Deposit Taker 2",
      state: "Ap",
      district: "Atp",
    },
    {
      sno: "03",
      branchName: "DT002",
      addressLine1: "Deposit Taker 2",
      addressLine2: "Deposit Taker 2",
      state: "Ap",
      district: "Atp",
    },
    {
      sno: "04",
      branchName: "DT002",
      addressLine1: "Deposit Taker 2",
      addressLine2: "Deposit Taker 2",
      state: "Ap",
      district: "Atp",
    },
    {
      sno: "05",
      branchName: "DT002",
      addressLine1: "Deposit Taker 2",
      addressLine2: "Deposit Taker 2",
      state: "Ap",
      district: "Atp",
    },
    {
      sno: "06",
      branchName: "DT002",
      addressLine1: "Deposit Taker 2",
      addressLine2: "Deposit Taker 2",
      state: "Ap",
      district: "Atp",
    },
  ];

  const columns = [
    columnHelper.accessor("sno", {
      cell: (info) => info.renderValue(),
      header: () => <span>Sr. No.</span>,
    }),
    columnHelper.accessor("branchName", {
      cell: (info) => info.renderValue(),
      header: () => <span>branchName</span>,
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
  const location = useLocation();
  const [loader, setLoader] = useState<boolean>(false);
  const competentId = location.state?.competentId;
  const { setAllFormData, setAllDocumentData, allFormData, documentData } =
    useDepositTakerRegistrationStore((state) => state);
  const approverRelation =
    location.state?.approverRelation?.firstName +
    " " +
    location.state?.approverRelation?.lastName;
  const status = location?.state?.status;
  const approveTimeStamp = location?.state?.approveTimeStamp;

  const fetchFormFields = () => {
    axios
      .get(`${bffUrl}/registration/field-data/3?status=addToProfile`)
      .then(async (response) => {
        if (response?.data?.success) {
          let dtData: any = [];
          try {
            let depositTakerData = await axios.get(
              `${bffUrl}/competent-authority/${competentId}`
            );
            dtData =
              depositTakerData?.data?.data?.competentAuthority
                ?.competentAuthorityData;
          } catch (error) {
            console.log("Error");
          }
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
          console.log({ modifiedFileFields });

          let obj = {
            ...response?.data?.data,
            formFields: { form_fields: modifiedFormFields },
          };
          // console.log(obj, "obj-----");
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
      // console.log({buffer, type, blob, url});
      // setViewLoader(false);
    } catch (error) {
      console.log({ error });
      // setViewLoader(false);
    }
  };

  const section1 = [
    {
      title: "Verification Status",
      buttonText: "Success",
      fieldsLeft: [{ label: " Name", value: "Lorem ipsum" }],
      fieldsRight: [{ label: "PAN Details", value: "Lorem ipsum" }],
    },
  ];
  const section2 = [
    {
      title: "Entity Details",
      buttonText: "",
      fieldsLeft: [
        { label: "Name of Deposit Taker", value: "Lorem ipsum" },
        { label: "Type of Entity", value: "Lorem ipsum" },
        { label: "Address Line 1", value: "Lorem ipsum" },
        { label: "Address Line 2", value: "Lorem ipsum" },
      ],
      fieldsRight: [
        { label: "Unique Registration ID", value: "Lorem ipsum" },
        { label: "PIN code", value: "Lorem ipsum" },
        { label: "State", value: "Lorem ipsum" },
        { label: "District", value: "Lorem ipsum" },
      ],
    },
  ];
  const section3 = [
    {
      title: "Nodal Details",
      buttonText: "",
      fieldsLeft: [
        { label: "Nodal Officer Name", value: "Lorem ipsum" },
        { label: "Nodal Officer Email", value: "Lorem ipsum" },
      ],
      fieldsRight: [
        { label: "Nodal Officer Name", value: "Lorem ipsum" },
        { label: "Nodal Officer Designation", value: "Lorem ipsum" },
      ],
    },
  ];
  const section4 = [
    {
      title: "Regulator Details",
      buttonText: "",
      fieldsLeft: [
        { label: "Regulator Name", value: "Lorem ipsum" },
        { label: "Registration Approval Date", value: "Lorem ipsum" },
      ],
      fieldsRight: [
        { label: "Regulator Registered Number", value: "Lorem ipsum" },
      ],
    },
  ];
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

  return (
    <div>
      <div className="relative mx-4 xl:ml-[40px]">
        <div>
          <>
            <div className="container mx-auto">
              <div id="reviewContent">
                <h1 className=" text-gilroy-bold text-[#24222B] text-2xl font-bold  my-7">
                  Lorem Ipsum
                </h1>
                {section1.map((section, index) => (
                  <div className="mb-[16px]" key={index}>
                    <div className="rounded-t-lg bg-[#e7f0ff] flex justify-between h-[57px] text-gilroy-bold">
                      <p className="lg:w-[152px] ml-[16px] mt-[16px] text-[16px] lg:text-[20px] pb-2 text-nowrap">
                        {section.title}
                      </p>
                      <button className="text-[#1C468E] text-[16px] lg:text-[20px] mr-[13px] font-normal ">
                        {section.buttonText}
                      </button>
                    </div>

                    <div className="shadow-sm p-5 rounded-md">
                      <div className="flex flex-col justify-between w-full sm:flex-row gap-y-4">
                        <div className="  w-full  sm:w-1/2 sm:border-r-2 border-r-[#1C468E] border-opacity-20 grid gap-y-4 pr-12">
                          {section.fieldsLeft.map((field, idx) => (
                            <div className=" flex justify-between " key={idx}>
                              <div className="opacity-60">{field.label}</div>
                              <div className="-mr-12 sm:-mr-0 lg:-mr-0 xl:-mr-0">
                                {field.value}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className=" w-full  sm:w-1/2 lg:pl-5  xl:pl-5 md:pl-5 sm:pl-2 rid gap-y-4 pr-12">
                          {section.fieldsRight.map((field, idx) => (
                            <div className=" flex justify-between" key={idx}>
                              <div className="opacity-60">{field.label}</div>
                              <div className="-mr-12 sm:-mr-0 lg:-mr-0 xl:-mr-0">
                                {field.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* <div id="reviewContent">
                <h1 className=" text-gilroy-bold text-[#24222B] text-2xl font-bold  my-7"></h1>
                {sections2.map((section, index) => (
                  <div className="mb-[16px]" key={index}>
                    <div className="rounded-t-lg bg-[#E7F0FF] flex justify-between h-[57px] text-gilroy-bold">
                      <p className="lg:w-[152px] ml-[16px] mt-[16px] text-[16px] lg:text-[20px] pb-2 text-nowrap">
                        {section.title}
                      </p>
                      <button className="text-[#1C468E] text-[16px] lg:text-[20px] mr-[13px] font-normal ">
                        {section.buttonText}
                      </button>
                    </div>

                    <div className="shadow-sm p-5 rounded-md">
                      <div className="flex flex-col justify-between w-full sm:flex-row gap-y-[16px]">
                        <div className="  w-full sm:border-r-[0.5px] border-r-[#1C468E] border-opacity-20 grid gap-y-[16px]">
                          {section.fieldsLeft.map((field, idx) => (
                            <div
                              className="sm:mr-[48px] flex justify-between "
                              key={idx}
                            >
                              <div className="opacity-60">{field.label}</div>
                              <div>{field.value}</div>
                            </div>
                          ))}
                        </div>

                        <div className="w-full grid gap-y-[16px]">
                          {section.fieldsRight.map((field, idx) => (
                            <div
                              className="sm:ml-[48px] flex justify-between"
                              key={idx}
                            >
                              <div className="opacity-60">{field.label}</div>
                              <div>{field.value}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div id="reviewContent">
                <h1 className=" text-gilroy-bold text-[#24222B] text-2xl font-bold  my-7"></h1>
                {sections3.map((section, index) => (
                  <div className="mb-[16px]" key={index}>
                    <div className="rounded-t-lg bg-[#E7F0FF] flex justify-between h-[57px] text-gilroy-bold">
                      <p className="lg:w-[152px] ml-[16px] mt-[16px] text-[16px] lg:text-[20px] pb-2 text-nowrap">
                        {section.title}
                      </p>
                      <button className="text-[#1C468E] text-[16px] lg:text-[20px] mr-[13px] font-normal ">
                        {section.buttonText}
                      </button>
                    </div>

                    <div className="shadow-sm p-5 rounded-md">
                      <div className="flex flex-col justify-between w-full sm:flex-row gap-y-[16px]">
                        <div className="  w-full sm:border-r-[0.5px] border-r-[#1C468E] border-opacity-20 grid gap-y-[16px]">
                          {section.fieldsLeft.map((field, idx) => (
                            <div
                              className="sm:mr-[48px] flex justify-between "
                              key={idx}
                            >
                              <div className="opacity-60">{field.label}</div>
                              <div>{field.value}</div>
                            </div>
                          ))}
                        </div>

                        <div className="w-full grid gap-y-[16px]">
                          {section.fieldsRight.map((field, idx) => (
                            <div
                              className="sm:ml-[48px] flex justify-between"
                              key={idx}
                            >
                              <div className="opacity-60">{field.label}</div>
                              <div>{field.value}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div id="reviewContent">
                <h1 className=" text-gilroy-bold text-[#24222B] text-2xl font-bold  my-7"></h1>
                {sections4.map((section, index) => (
                  <div className="mb-[16px]" key={index}>
                    <div className="rounded-t-lg bg-[#E7F0FF] flex justify-between h-[57px] text-gilroy-bold">
                      <p className="lg:w-[152px] ml-[16px] mt-[16px] text-[16px] lg:text-[20px] pb-2 text-nowrap">
                        {section.title}
                      </p>
                      <button className="text-[#1C468E] text-[16px] lg:text-[20px] mr-[13px] font-normal ">
                        {section.buttonText}
                      </button>
                    </div>

                    <div className="shadow-sm p-5 rounded-md">
                      <div className="flex flex-col justify-between w-full sm:flex-row gap-y-[16px]">
                        <div className="  w-full sm:border-r-[0.5px] border-r-[#1C468E] border-opacity-20 grid gap-y-[16px]">
                          {section.fieldsLeft.map((field, idx) => (
                            <div
                              className="sm:mr-[48px] flex justify-between "
                              key={idx}
                            >
                              <div className="opacity-60">{field.label}</div>
                              <div>{field.value}</div>
                            </div>
                          ))}
                        </div>

                        <div className="w-full grid gap-y-[16px]">
                          {section.fieldsRight.map((field, idx) => (
                            <div
                              className="sm:ml-[48px] flex justify-between"
                              key={idx}
                            >
                              <div className="opacity-60">{field.label}</div>
                              <div>{field.value}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div> */}
              <div id="reviewContent">
                <h1 className=" text-gilroy-bold text-[#24222B] text-2xl font-bold  my-7"></h1>
                {section2.map((section, index) => (
                  <div className="mb-[16px]" key={index}>
                    <div className="rounded-t-lg bg-[#e7f0ff] flex justify-between h-[57px] text-gilroy-bold">
                      <p className="lg:w-[152px] ml-[16px] mt-[16px] text-[16px] lg:text-[20px] pb-2 text-nowrap">
                        {section.title}
                      </p>
                      <button className="text-[#1C468E] text-[16px] lg:text-[20px] mr-[13px] font-normal ">
                        {section.buttonText}
                      </button>
                    </div>

                    <div className="shadow-sm p-5 rounded-md">
                      <div className="flex flex-col justify-between w-full sm:flex-row gap-y-4">
                        <div className="  w-full  sm:w-1/2 sm:border-r-2 border-r-[#1C468E] border-opacity-20 grid gap-y-4 pr-12">
                          {section.fieldsLeft.map((field, idx) => (
                            <div className=" flex justify-between " key={idx}>
                              <div className="opacity-60">{field.label}</div>
                              <div className="-mr-12 sm:-mr-0 lg:-mr-0 xl:-mr-0">
                                {field.value}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className=" w-full  sm:w-1/2 lg:pl-5  xl:pl-5 md:pl-5 sm:pl-2 grid gap-y-4 pr-12">
                          {section.fieldsRight.map((field, idx) => (
                            <div className=" flex justify-between" key={idx}>
                              <div className="opacity-60">{field.label}</div>
                              <div className="-mr-12 sm:-mr-0 lg:-mr-0 xl:-mr-0">
                                {field.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>{" "}
              <div id="reviewContent">
                <h1 className=" text-gilroy-bold text-[#24222B] text-2xl font-bold  my-7"></h1>
                {section3.map((section, index) => (
                  <div className="mb-[16px]" key={index}>
                    <div className="rounded-t-lg bg-[#e7f0ff] flex justify-between h-[57px] text-gilroy-bold">
                      <p className="lg:w-[152px] ml-[16px] mt-[16px] text-[16px] lg:text-[20px] pb-2 text-nowrap">
                        {section.title}
                      </p>
                      <button className="text-[#1C468E] text-[16px] lg:text-[20px] mr-[13px] font-normal ">
                        {section.buttonText}
                      </button>
                    </div>

                    <div className="shadow-sm p-5 rounded-md">
                      <div className="flex flex-col justify-between w-full sm:flex-row gap-y-4">
                        <div className="  w-full  sm:w-1/2 sm:border-r-2 border-r-[#1C468E] border-opacity-20 grid gap-y-4 pr-12">
                          {section.fieldsLeft.map((field, idx) => (
                            <div className=" flex justify-between " key={idx}>
                              <div className="opacity-60">{field.label}</div>
                              <div className="-mr-12 sm:-mr-0 lg:-mr-0 xl:-mr-0">
                                {field.value}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className=" w-full  sm:w-1/2 lg:pl-5  xl:pl-5 md:pl-5 sm:pl-2 grid gap-y-4 pr-12">
                          {section.fieldsRight.map((field, idx) => (
                            <div className=" flex justify-between" key={idx}>
                              <div className="opacity-60">{field.label}</div>
                              <div className="-mr-12 sm:-mr-0 lg:-mr-0 xl:-mr-0">
                                {field.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>{" "}
              <div id="reviewContent">
                <h1 className=" text-gilroy-bold text-[#24222B] text-2xl font-bold  my-7"></h1>
                {section4.map((section, index) => (
                  <div className="mb-[16px]" key={index}>
                    <div className="rounded-t-lg bg-[#e7f0ff] flex justify-between h-[57px] text-gilroy-bold">
                      <p className="lg:w-[152px] ml-[16px] mt-[16px] text-[16px] lg:text-[20px] pb-2 text-nowrap">
                        {section.title}
                      </p>
                      <button className="text-[#1C468E] text-[16px] lg:text-[20px] mr-[13px] font-normal ">
                        {section.buttonText}
                      </button>
                    </div>

                    <div className="shadow-sm p-5 rounded-md">
                      <div className="flex flex-col justify-between w-full sm:flex-row gap-y-4">
                        <div className="  w-full  sm:w-1/2 sm:border-r-2 border-r-[#1C468E] border-opacity-20 grid gap-y-4 pr-12">
                          {section.fieldsLeft.map((field, idx) => (
                            <div className=" flex justify-between " key={idx}>
                              <div className="opacity-60">{field.label}</div>
                              <div className="-mr-12 sm:-mr-0 lg:-mr-0 xl:-mr-0">
                                {field.value}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className=" w-full  sm:w-1/2 lg:pl-5  xl:pl-5 md:pl-5 sm:pl-5 grid gap-y-4 pr-12">
                          {section.fieldsRight.map((field, idx) => (
                            <div className=" flex justify-between" key={idx}>
                              <div className="opacity-60">{field.label}</div>
                              <div className="-mr-12 sm:-mr-0 lg:-mr-0 xl:-mr-0">
                                {field.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mb-[16px] shadow-sm  rounded-md">
                <div className="rounded-t-lg bg-[#e7f0ff] flex justify-between h-[57px] font-bold mb-4">
                  <p className="lg:w-[152px] ml-[16px] mt-[16px] text-[16px] lg:text-[20px] pb-2 text-nowrap">
                    Branches
                  </p>
                </div>
                <div className="w-full overflow-x-auto ">
                  <div className="p-5">
                    <div className="h-32">
                      <ReactTable defaultData={defaultData} columns={columns} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-[16px] shadow-sm  rounded-md">
                <div className="rounded-t-lg bg-[#e7f0ff] flex justify-between h-[57px] font-bold mb-4">
                  <p className="lg:w-[152px] ml-[16px] mt-[16px] text-xl lg:text-[20px] pb-2 text-nowrap">
                    Upload Documents
                  </p>
                </div>

                <div className="mb-3">
                  <div className="p-2">
                    <div className="bg-blue-900 h-[64px] flex items-center rounded-xl">
                      <div className="flex flex-row items-center justify-between px-4 w-full">
                        <div className="flex items-center">
                          <img
                            src={FolderIcon}
                            alt="Folder Icon"
                            className="h-[44px] w-[44px]"
                          />
                          <div className="flex flex-col justify-center ml-2">
                            <p className="text-white">Document Uploaded</p>
                            <p className="text-white text-sm">Document.pdf</p>
                          </div>
                        </div>
                        <button type="button" className="text-white">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-11 flex flex-col lg:flex-row lg:items-center justify-between">
              <div
                className="flex items-center cursor-pointer space-x-2 mb-3 lg:mb-0 md:ml-[5rem]"
                onClick={() => navigate(-1)}
              >
                <img src={BackArrow} alt="Back Arrow" />
                <p className="text-sm font-normal text-gilroy-regular">Back</p>
              </div>
              <div className="flex flex-wrap justify-center lg:flex-nowrap lg:w-auto items-center space-x-3 lg:justify-end">
                <div className="mb-3 lg:mb-0">
                  <Button
                    type="button"
                    label="Return"
                    width="100px"
                    textColor="#F5BD0B"
                    borderColor="#F5BD0B"
                    backgroundColor="white"
                    onClick={handleReturn}
                  />
                </div>
                <div className="mb-3 lg:mb-0">
                  <Button
                    type="button"
                    label="Reject"
                    width="100px"
                    textColor="#E63312"
                    borderColor="#E63312"
                    backgroundColor="white"
                    onClick={handleRejectModel}
                  />
                </div>
                <div className="mb-3 lg:mb-0">
                  <Button
                    type="button"
                    label="Approve"
                    width="100px"
                    backgroundColor="#1C468E"
                    onClick={handleApproveModel}
                  />
                </div>
              </div>
            </div>

            {returnModel && (
              <ReturnModelPopup onClose={CloseReturnModel} onSave={() => {}} />
            )}

            {approveModel && (
              <ApprovModelPopup
                closePopup={CloseApproveModel}
                SuccessPopup={() => {}}
              />
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
