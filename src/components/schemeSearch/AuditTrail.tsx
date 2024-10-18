import { createColumnHelper } from "@tanstack/table-core";

// import DirectBox from "../../assets/images/send.png";
import DirectBox from "../../assets/images/send.png";
import ReactTable from "../userFlow/common/ReactTable";
import React from "react";

interface TableType {
  sno: string;
  statusChangeBy: string;
  from: string;
  to: string;
  remarks?: string;
  date: string;
}

const AuditTrail = () => {
  const columnHelper = createColumnHelper<TableType>();

  const defaultData: TableType[] = [
    {
      sno: "01",
      statusChangeBy: "Rohit",
      from: "Department A",
      to: "Department B",
      remarks: "Transfer approved",
      date: "2024-03-31",
    },
    {
      sno: "02",
      statusChangeBy: "Aman",
      from: "Department X",
      to: "Department Y",
      remarks: "Promotion",
      date: "2024-04-01",
    },
    {
      sno: "03",
      statusChangeBy: "Kumar",
      from: "Section 1",
      to: "Section 2",
      remarks: "Change of role",
      date: "2024-04-02",
    },
    {
      sno: "04",
      statusChangeBy: "Rahul",
      from: "Department C",
      to: "Department ID",
      remarks: "Complaint",
      date: "2024-04-03",
    },
  ];

  const columns = [
    columnHelper.accessor("sno", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>S.No.</span>,
    }),
    columnHelper.accessor("statusChangeBy", {
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
    columnHelper.accessor("remarks", {
      cell: (info: any) => (
        <>
          <div
            className=" flex items-center justify-center gap-2"
            // style={{ width: "200px" }}
          >
            <p>{info.row.original.remarks}</p>
            {info.row.original.remarks === "Complaint" && (
              <img src={DirectBox} alt="DirectBox" className="w-6" />
            )}
          </div>
        </>
      ),
      header: () => <span>Remarks</span>,
    }),
    columnHelper.accessor("date", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>Date</span>,
    }),
  ];
  return (
    <div>
      <div
        className="custom-scrollbar mt-2"
        style={{ maxHeight: "300px", overflowY: "auto" }}
      >
        <ReactTable defaultData={defaultData} columns={columns} />
      </div>
    </div>
  );
};

export default AuditTrail;
