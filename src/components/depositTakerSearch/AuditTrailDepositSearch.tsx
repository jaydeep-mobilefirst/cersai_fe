import { createColumnHelper } from "@tanstack/table-core";

// import DirectBox from "../../assets/images/send.png";
import DirectBox from "../../assets/images/send.png";
import ReactTable from "../userFlow/common/ReactTable";
import edit from "../../assets/images/eye2.svg";
interface TableType {
  sno: string;
  SchemeId: string;
  SchemeName: string;
  status: string;
  DepositeTaker: string;
  Createdby: string;
  View: boolean;
}

const AuditTrail = () => {
  const columnHelper = createColumnHelper<TableType>();

  const defaultData: TableType[] = [
    {
      sno: "01",
      SchemeId: "Lorem ipsum dolor sit amet",
      SchemeName: "Lorem ipsum dolor",
      status: "Active",
      DepositeTaker: "Deposit",
      Createdby: "chandra",
      View: false,
    },
    {
      sno: "02",
      SchemeId: "Lorem ipsum dolor sit amet",
      SchemeName: "Lorem ipsum dolor",
      status: "pending",
      DepositeTaker: "Deposit",
      Createdby: "chandra",
      View: false,
    },
    {
      sno: "03",
      SchemeId: "Lorem ipsum dolor sit amet",
      SchemeName: "Lorem ipsum dolor",
      status: "pending",
      DepositeTaker: "Deposit",
      Createdby: "chandra",
      View: false,
    },
    {
      sno: "04",
      SchemeId: "Lorem ipsum dolor sit amet",
      SchemeName: "Lorem ipsum dolor",
      status: "pending",
      DepositeTaker: "Deposit",
      Createdby: "chandra",
      View: false,
    },
    {
      sno: "05",
      SchemeId: "Lorem ipsum dolor sit amet",
      SchemeName: "Lorem ipsum dolor",
      status: "pending",
      DepositeTaker: "Deposit",
      Createdby: "chandra",
      View: false,
    },
    {
      sno: "06",
      SchemeId: "Lorem ipsum dolor sit amet",
      SchemeName: "Lorem ipsum dolor",
      status: "pending",
      DepositeTaker: "Deposit",
      Createdby: "chandra",
      View: false,
    },
  ];

  const columns = [
    columnHelper.accessor("sno", {
      cell: (info) => info.renderValue(),
      header: () => <span>S.No.</span>,
    }),

    columnHelper.accessor("SchemeId", {
      cell: (info) => info.renderValue(),
      header: () => <span>Scheme Id</span>,
    }),
    columnHelper.accessor("SchemeName", {
      cell: (info) => info.renderValue(),
      header: () => <span>Scheme Name</span>,
    }),
    columnHelper.accessor("status", {
      cell: (info) => {
        const value = info?.row?.original?.View;

        return (
          <div
            className="flex flex-col md:flex-row justify-center gap-3"
            key={Math.random()}
          >
            <span> Active-Deposit</span>
          </div>
        );
      },
      header: () => <span>Status</span>,
    }),
    columnHelper.accessor("DepositeTaker", {
      cell: (info) => info.renderValue(),
      header: () => <span>Deposite Taker</span>,
    }),
    columnHelper.accessor("Createdby", {
      cell: (info) => info.renderValue(),
      header: () => <span>Created by</span>,
    }),
    columnHelper.accessor((row) => row, {
      id: "action",
      cell: (info) => {
        const value = info.getValue();

        return (
          <div className="flex justify-center items-center ">
            <div>
              <img src={edit} alt="Edit" className="cursor-pointer" />
            </div>
          </div>
        );
      },
      header: () => <span>Edit</span>,
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
