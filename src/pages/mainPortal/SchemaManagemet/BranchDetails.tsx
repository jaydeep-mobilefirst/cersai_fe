import { createColumnHelper } from "@tanstack/table-core";
import DirectBox from "../../assets/images/send.png";
import { useDepositTakerRegistrationStore } from "../../../zust/deposit-taker-registration/registrationStore";
import { useEffect, useState } from "react";
import LoaderSpin from "../../../components/LoaderSpin";
import ReactTable from "../../../components/userFlow/common/ReactTable";
import { axiosTraceIdInstance } from "../../../utils/axios";
import { useLocation } from "react-router-dom";

interface TableType {
  sno: number;
  id: number;
  depositTakerId: String;
  firstName: String;
  middleName: String;
  lastName: String;
  addressLine1: String;
  addressLine2: String;
  pincode: String;
  pinCode: String;
  state: String;
  district: String;
  landlineNumber: String;
  email: String;
  designation: String;
}

const BranchDetails = () => {
  const { setAllFormData, setAllDocumentData, allFormData } =
    useDepositTakerRegistrationStore((state) => state);
  const entityType = sessionStorage.getItem("entityUniqueId");
  console.log("allformdata----", allFormData?.other?.depositTakerId);
  const [loader, setLoader] = useState<boolean>(false);
  const location = useLocation();
  const [dataManagementTeam, setDataManagementTeam] = useState([]);
  const [dataBranches, setDataBranches] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [auditTrail, setAuditTrail] = useState(
    allFormData?.other?.schemeAuditTrail
  );
  const columnHelper = createColumnHelper<TableType>();
  const filterB = allFormData?.formFields?.form_fields?.find(
    (branch: any) => branch?.key === "branch"
  )?.userInput;
  console.log("filered", filterB);

  const fetchBranchDetails = () => {
    axiosTraceIdInstance
      .post(`/deposit-taker/fetch-branches`, {
        depositTakerId: entityType, // you can replace it with the actual ID
        branchIds: (() => {
          try {
            // Try parsing as JSON
            return JSON?.parse(filterB);
          } catch (e) {
            // If parsing fails, treat it as a comma-separated string
            // return filterB ? filterB && filterB?.split(",") : [];
            return typeof filterB === "string" ? filterB?.split(",") : [];
          }
        })(),
      })

      .then(async (response) => {
        setLoader(true);
        if (response?.data?.success) {
          setDataBranches(response?.data?.data?.branches);
          setLoader(false);
        } else {
          alert("Error getting data, Please try later!");
          setLoader(false);
        }
      })
      .catch((error: any) => {
        console.log("Error fetching branches:", error);
        setLoader(false);
      });
  };

  useEffect(() => {
    if (filterB !== undefined && filterB !== null) {
      fetchBranchDetails();
      
      setAllFormData({
        ...allFormData,
        formFields: {
          form_fields: allFormData?.formFields?.form_fields?.filter((f: any) => f.key !== "branch"),
        },
      });
    }
  }, [filterB]);




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
    columnHelper.accessor("pinCode", {
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
  ];

  console.log({ allFormData });

  return (
    <div>
      <div
        className="custom-scrollbar mt-2"
        style={{ maxHeight: "300px", overflowY: "auto" }}
      >
        <h1 className="font-bold mb-1 text-[18px] text-center">Branches</h1>
        {loader ? (
          <LoaderSpin /> // Show loader when loading is true
        ) : dataBranches?.length > 0 ? (
          <ReactTable
            defaultData={dataBranches}
            columns={columns}
            lineHeight={true}
          />
        ) : (
          <span>No data available</span>
        )}
      </div>
    </div>
  );
};

export default BranchDetails;
