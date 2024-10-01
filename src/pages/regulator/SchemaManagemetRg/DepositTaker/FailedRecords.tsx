import React, { useState } from "react";
import { createColumnHelper } from "@tanstack/table-core";
import ReactTable from "../../../../components/userFlow/common/ReactTable";
import TaskTabsCa from "../../../../components/ScehmaManagement/TaskTabsCa";
import CustomPagination from "../../../../components/CustomPagination/CustomPagination";
import Button from "../../../../components/userFlow/common/Button";
import BackArrow from "../../../../assets/images/BackArrow.svg";
import { useLocation, useNavigate } from "react-router-dom";
import TaskTabsRg from "../../../../components/ScehmaManagement/TaskTabsRg";

const FailedRecords = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const location = useLocation();
  const data = location.state?.data;
  const navigate = useNavigate();
  console.log(data, "dataqqqqqqqqqqqq");
  const TableType = {
    DepositeTakerName: String,
    PanNumber: String,
    Errors: Array,
  };

  const columnHelper = createColumnHelper<typeof TableType>();

  const failedRecords = data?.failedRecords.map(
    (record: any, index: number) => ({
      DepositeTakerName: record?.record?.["Company Name (as per PAN)*"],
      PanNumber: record?.record?.["PAN Number*"],
      Errors: record?.error,
    })
  );

  console.log(failedRecords, "failedRecords123");

  const columns = [
    {
      id: "sno",
      header: () => <span>S.No.</span>,
      cell: (info: any) => info.row.index + 1,
    },
    columnHelper.accessor("DepositeTakerName", {
      id: "depositeTakerName",
      cell: (info: any) => info.renderValue(),
      header: () => <span>Deposite Taker Name</span>,
    }),
    columnHelper.accessor("PanNumber", {
      id: "panNumber",
      cell: (info: any) => info.renderValue(),
      header: () => <span>Pan Number</span>,
    }),
    columnHelper.accessor("Errors", {
      id: "errors",
      cell: (info: any) => info.renderValue(),
      header: () => <span>Errors</span>,
    }),
  ];

  return (
    <>
      <div className="p-3 ">
        <div className="mt-6">
          <TaskTabsRg />
        </div>
        <p className="font-bold font-gilroy-bold text-black mt-5 mb-5">
          Failed Records
        </p>
        <div
          className="custom-scrollbar w-full mb-20"
          style={{ maxHeight: "360px", overflowY: "auto" }}
        >
          {failedRecords.length > 0 ? (
            <ReactTable defaultData={failedRecords} columns={columns} />
          ) : (
            <div className="text-center p-5">No Data Available</div>
          )}
        </div>
        <div className="mt-72 flex flex-col lg:flex-row lg:items-center justify-between">
          <div
            className="flex items-center cursor-pointer space-x-2 mb-3 lg:mb-0 md:ml-[5rem]"
            onClick={() => navigate(-1)}
          >
            <img src={BackArrow} alt="Back Arrow" />
            <p className="text-sm font-normal text-gilroy-regular">Back</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FailedRecords;
