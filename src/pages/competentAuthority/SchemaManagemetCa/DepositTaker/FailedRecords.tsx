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
  const TableType = {
    sno: String,
    DepositeTakerName: String,
    PanNumber: String,
  };
  const columnHelper = createColumnHelper<typeof TableType>();

  const defaultData = [
    {
      sno: "01",
      DepositeTakerName: "Department of PR",
      PanNumber: "ABCD1234R",
    },
    {
      sno: "02",
      DepositeTakerName: "Department of HR",
      PanNumber: "ABCD1234R",
    },
    {
      sno: "03",
      DepositeTakerName: "Department of HR",
      PanNumber: "ABCD1234R",
    },
    {
      sno: "04",
      DepositeTakerName: "Department of HR",
      PanNumber: "ABCD1234R",
    },
  ];

  const columns = [
    columnHelper.accessor("sno", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>S. No.</span>,
    }),
    columnHelper.accessor("DepositeTakerName", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>Deposite taker name</span>,
    }),
    columnHelper.accessor("PanNumber", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>Pan number</span>,
    }),
  ];
  const navigate = useNavigate();
  return (
    <>
      <div className="p-3">
        <div className="mt-6">
          <TaskTabsCa />
        </div>
        <p className="font-bold font-gilroy-bold text-black mt-5 mb-5 ">
          Failed Records
        </p>
        <div
          className="custom-scrollbar  w-full"
          style={{ maxHeight: "360px", overflowY: "auto" }}
        >
          <ReactTable defaultData={defaultData} columns={columns} />
        </div>
        <div className="my-11 flex flex-col lg:flex-row lg:items-center justify-between">
          <div
            className="flex items-center cursor-pointer space-x-2 mb-3 lg:mb-0 md:ml-[5rem]"
            onClick={() => navigate(-1)}
          >
            <img src={BackArrow} alt="Back Arrow" />
            <p className="text-sm font-normal text-gilroy-regular">Back</p>
          </div>
        </div>
        <div className="mt-10">
          <CustomPagination
            currentPage={page}
            setCurrentPage={setPage}
            totalItems={defaultData?.length}
            itemsPerPage={pageSize}
            maxPageNumbersToShow={5}
          />
        </div>
      </div>
    </>
  );
};
export default FailedRecords;
