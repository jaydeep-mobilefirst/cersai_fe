import React, { useState } from "react";
import { createColumnHelper } from "@tanstack/table-core";
import ReactTable from "../../../../components/userFlow/common/ReactTable";
import TaskTabsCa from "../../../../components/ScehmaManagement/TaskTabsCa";
import CustomPagination from "../../../../components/CustomPagination/CustomPagination";
import Button from "../../../../components/userFlow/common/Button";
import BackArrow from "../../../../assets/images/BackArrow.svg";
import { useLocation, useNavigate } from "react-router-dom";

const FailedRecords = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const location = useLocation();
  const data = location.state?.data;
  const navigate = useNavigate();

  const TableType = {
    DepositeTakerName: String,
    PanNumber: String,
    Errors: Array,
  };

  const columnHelper = createColumnHelper<typeof TableType>();

  const failedRecords =
    data?.data?.failed?.records.map((record: any, index: number) => ({
      DepositeTakerName: record.companyName,
      PanNumber: record.panNumber,
      Errors: record.errors.join(", "),
    })) || [];

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
      <div className="p-3">
        <div className="mt-6">
          <TaskTabsCa />
        </div>
        <p className="font-bold font-gilroy-bold text-black mt-5 mb-5">
          Failed Records
        </p>
        <div
          className="custom-scrollbar w-full"
          style={{ maxHeight: "360px", overflowY: "auto" }}
        >
          <ReactTable defaultData={failedRecords} columns={columns} />
        </div>
        <div className=" lg:my-28 md:my-11 flex flex-col lg:flex-row lg:items-center justify-between">
          <div
            className="flex items-center cursor-pointer space-x-2 mb-3 lg:mb-0 md:ml-[5rem]"
            onClick={() => navigate(-1)}
          >
            <img src={BackArrow} alt="Back Arrow" />
            <p className="text-sm font-normal text-gilroy-regular">Back</p>
          </div>
        </div>
        {/* <div className="mt-10">
          <CustomPagination
            currentPage={page}
            setCurrentPage={setPage}
            totalItems={failedRecords.length}
            itemsPerPage={pageSize}
            maxPageNumbersToShow={5}
          />
        </div> */}
      </div>
    </>
  );
};

export default FailedRecords;
