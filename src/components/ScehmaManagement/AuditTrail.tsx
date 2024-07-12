import { createColumnHelper } from "@tanstack/table-core";

// import DirectBox from "../../assets/images/send.png";
import DirectBox from "../../assets/images/send.png";
import ReactTable from "../userFlow/common/ReactTable";
import { useDepositTakerRegistrationStore } from "../../zust/deposit-taker-registration/registrationStore";
import { useEffect, useState } from "react";
import { handleViewOpenkmFileWithDocumentId, isUUID } from "../../utils/commonFunction";
import LoaderSpin from "../LoaderSpin";

interface TableType {
  id: string;
  user: string;
  from: string;
  to: string;
  remark?: string;
  updatedAt: string;
}

const convertToDate = (isoString: string) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

const AuditTrail = () => {
  const { allFormData } = useDepositTakerRegistrationStore(state => state)
  const [auditTrail, setAuditTrail] = useState([]);
  const columnHelper = createColumnHelper<TableType>();

  useEffect(() => {
    setAuditTrail(allFormData?.other?.schemeAuditTrail)
  }, [allFormData])
  const columns = [
    columnHelper.accessor("id", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>S.No.</span>,
    }),
    columnHelper.accessor("user", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>Status Change By</span>,
    }),
    columnHelper.accessor("from", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>From</span>,
    }),
    columnHelper.accessor("to", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>To</span>,
    }),
    columnHelper.accessor("remark", {
      cell: (info: any) => {
        let docId = info?.cell?.row?.original?.documentId        
        const handleOpenFile = async (e : any) =>{
          const isOk = handleViewOpenkmFileWithDocumentId(docId)
          e.preventDefault();
        }
        return <>
          <div
            className=" flex items-center justify-between"
            style={{ width: "200px" }}
          >
            <p>{info.row.original.remark}</p>
            {docId && isUUID(docId) &&
              <img src={DirectBox} alt="DirectBox" className="w-6 hover:cursor-pointer" 
              onClick={handleOpenFile}/>
            }
          </div>
        </>
      },
      header: () => <span>Remarks</span>,
    }),
    columnHelper.accessor("updatedAt", {
      cell: (info: any) => {
        let modifiedDate = info?.getValue();
        modifiedDate = convertToDate(modifiedDate);
        return modifiedDate
      },
      header: () => <span>Date</span>,
    }),
  ];
  
  return (
    <div>
      <div
        className="custom-scrollbar mt-2"
        style={{ maxHeight: "300px", overflowY: "auto" }}
      >
        {auditTrail?.length > 0 ? <ReactTable defaultData={auditTrail} columns={columns} /> : <span>No data</span>}
      </div>
    </div>
  );
};

export default AuditTrail;
