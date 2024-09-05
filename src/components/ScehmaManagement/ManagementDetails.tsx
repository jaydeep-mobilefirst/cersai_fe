import { createColumnHelper } from "@tanstack/table-core";
import ReactTable from "../userFlow/common/ReactTable";
import DirectBox from "../../assets/images/send.png";
import { useEffect, useState } from "react";
import { axiosTraceIdInstance } from "../../utils/axios";
import { useDepositTakerRegistrationStore } from "../../zust/deposit-taker-registration/registrationStore";


// interface TableType {
//   sno: string;
//   statusChangeBy: string;
//   from: string;
//   to: string;
//   remarks?: string;
//   date: string;
// }
interface TableType {
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
}

const convertToDate = (isoString: string) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

const MangementDetails = () => {
  const { setAllFormData, setAllDocumentData, allFormData } =
  useDepositTakerRegistrationStore((state) => state);
  console.log("allformdata----",allFormData?.other?.depositTakerId)
  const [loader, setLoader] = useState<boolean>(false);
  const [dataManagementTeam, setDataManagementTeam] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [auditTrail, setAuditTrail] = useState(
    allFormData?.other?.schemeAuditTrail
  );
  const columnHelper = createColumnHelper<TableType>();
  const getManagementDetails = () => {
    setLoader(true);
    axiosTraceIdInstance
      .get(`deposit-taker/management-team/${allFormData?.other?.depositTakerId}`)
      .then((res) => {
        setDataManagementTeam(res?.data?.data);
        console.log(res.data)

        setLoader(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoader(false);
      });
  };
  

  useEffect(() => {
    getManagementDetails()
  }, [allFormData?.other?.depositTakerId]);

//   const columns = [
//     columnHelper.accessor("id", {
//       cell: (info: any) => info.renderValue(),
//       header: () => <span>S.No.</span>,
//     }),
//     columnHelper.accessor("user", {
//       cell: (info: any) => info.renderValue(),
//       header: () => <span>Status Change By</span>,
//     }),
//     columnHelper.accessor("from", {
//       cell: (info: any) => info.renderValue(),
//       header: () => <span>From</span>,
//     }),
//     columnHelper.accessor("to", {
//       cell: (info: any) => info.renderValue(),
//       header: () => <span>To</span>,
//     }),
//     columnHelper.accessor("remark", {
//       cell: (info: any) => (
//         <>
//           <div
//             className=" flex items-center justify-between"
//             style={{ width: "200px" }}
//           >
//             <p>{info.row.original.remark}</p>
//             {info.row.original.remark === "Complaint" && (
//               <img src={DirectBox} alt="DirectBox" className="w-6" />
//             )}
//           </div>
//         </>
//       ),
//       header: () => <span>Remarks</span>,
//     }),
//     columnHelper.accessor("updatedAt", {
//       cell: (info: any) => {
//         let modifiedDate = info?.getValue();
//         modifiedDate = convertToDate(modifiedDate);
//         return modifiedDate;
//       },
//       header: () => <span>Date</span>,
//     }),
//   ];
  
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

  console.log({ allFormData });

  return (
    <div>
      <div
        className="custom-scrollbar mt-2"
        style={{ maxHeight: "300px", overflowY: "auto" }}
      >
        {dataManagementTeam?.length > 0 ? (
          <ReactTable defaultData={dataManagementTeam} columns={columnsMangement} />
        ) : (
          <span className="flex justify-center">No data available</span>
        )}
      </div>
    </div>
  );
};

export default MangementDetails;
