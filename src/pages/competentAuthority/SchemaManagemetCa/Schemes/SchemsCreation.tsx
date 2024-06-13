import React, { useState } from "react";

import { createColumnHelper } from "@tanstack/react-table";

import Eye from "../../../../assets/images/eye2.svg";
import addCircle from "../../../../assets/images/new_images/add-circle.png";
import { Link } from "react-router-dom";
import InputFields from "../../../../components/ScehmaManagement/InputField";
import searchButton from "../../../../assets/images/search-normal.svg";
import ReactTable from "../../../../components/userFlow/common/ReactTable";
import SelectButtonTask from "../../../../components/ScehmaManagement/SelectButton";
import CustomPagination from "../../../../components/CustomPagination/CustomPagination";
import ToggleSwitch from "../../../../components/ScehmaManagement/ToggleSwitch";
import TaskTabsCa from "../../../../components/ScehmaManagement/TaskTabsCa";
import EditIcon from "../../../../assets/images/editBlue.svg";
type TableType = {
  sno: string;
  schemeID: string;
  schemeName: string;
  status: string;
  depositTaker: string;
  createdBy: string;
  action: boolean;
};

const columnHelper = createColumnHelper<TableType>();

const validatePan = (pan: string): boolean => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan);
};
const NewSchemaCreation = () => {
  const defaultData: TableType[] = [
    {
      sno: "01",
      schemeID: "DT001",
      schemeName: "Deposit Taker 1",
      status: "Active",
      depositTaker: "Chandra",
      createdBy: "BOB",
      action: false,
    },
    {
      sno: "02",
      schemeID: "DT002",
      schemeName: "Deposit Taker 2",
      status: "Active",
      depositTaker: "Chandra",
      createdBy: "BOB",
      action: false,
    },
    {
      sno: "03",
      schemeID: "DT002",
      schemeName: "Deposit Taker 2",
      status: "Active",
      depositTaker: "Chandra",
      createdBy: "BOB",
      action: false,
    },
    {
      sno: "04",
      schemeID: "DT002",
      schemeName: "Deposit Taker 2",
      status: "Active",
      depositTaker: "Chandra",
      createdBy: "BOB",
      action: false,
    },
    {
      sno: "05",
      schemeID: "DT002",
      schemeName: "Deposit Taker 2",
      status: "Active",
      depositTaker: "Chandra",
      createdBy: "BOB",
      action: false,
    },
    {
      sno: "06",
      schemeID: "DT002",
      schemeName: "Deposit Taker 2",
      status: "Active",
      depositTaker: "Chandra",
      createdBy: "BOB",
      action: false,
    },
  ];

  const columns = [
    columnHelper.accessor("sno", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>Sr. No.</span>,
    }),
    columnHelper.accessor("schemeID", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>Scheme ID</span>,
    }),
    columnHelper.accessor("schemeName", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>Scheme Name</span>,
    }),

    columnHelper.accessor("status", {
      cell: (info: any) => {
        const value = info?.row?.original?.action;

        return (
          <div
            className="flex flex-col md:flex-row justify-center gap-3"
            key={Math.random()}
          >
            <span> {value ? "Active" : "In-Active"}</span>
          </div>
        );
      },
      header: () => <span>Status</span>,
    }),
    columnHelper.accessor("depositTaker", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>Deposit Taker</span>,
    }),
    columnHelper.accessor("createdBy", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>Created By</span>,
    }),
    columnHelper.accessor((row: any) => row, {
      id: "action",
      cell: (info: any) => {
        const value = info.getValue();

        return (
          <div className="flex justify-center items-center ">
            <Link to={"/ca/my-task/audit-rail"}>
              <div>
                <img
                  src={EditIcon}
                  alt="EditIcon "
                  className="cursor-pointer"
                />
              </div>
            </Link>
          </div>
        );
      },
      header: () => <span>Action</span>,
    }),
  ];
  const options = [
    { value: "pdf", label: "PDF" },
    { value: "docx", label: "DOCX" },
    { value: "image", label: "Image" },
  ];

  const [selectedOption1, setSelectedOption1] = useState<string | null>(null);

  const [selectedOption2, setSelectedOption2] = useState<string | null>(null);

  const [selectedOption3, setSelectedOption3] = useState<string | null>(null);

  const handleSetOption1 = (value: string) => {
    setSelectedOption1(value);
  };

  const handleSetOption2 = (value: string) => {
    setSelectedOption2(value);
  };

  const handleSetOption3 = (value: string) => {
    setSelectedOption3(value);
  };

  return (
    <div className="relative xl:ml-[40px]">
      <div className="mt-6">
        <TaskTabsCa />
      </div>
      <div>
        <div className=" mt-2">
          <div className=" flex  space-x-2  items-center flex-wrap">
            <div className="md:w-[500px] lg:w-[600px] sm:w-[350px] w-[300px]">
              <div className="mb-2">
                <label
                  htmlFor="Deposit taker Search"
                  className="text-base font-normal text-gilroy-medium "
                >
                  Scheme Search
                </label>
              </div>

              <InputFields
                height="40px"
                // width="550px"
                padding="10px"
                placeholder="Search by Unique ID/name"
              />
            </div>
            <div className=" flex items-center mt-7">
              <button
                className={`w-40 h-[45px] border-[2px] rounded-[8px] py-[10.5px] px-2 xl:px-[16px] flex justify-center items-center ${"bg-[#1c468e] cursor-pointer"} mt-2`}
              >
                <img src={searchButton} alt="searchButton" />
                <span className="ml-1 text-[14px] md:text-base font-normal text-[#fff] lg:text-[16px] text-gilroy-medium ">
                  Search
                </span>
              </button>
            </div>
            <div className=" flex items-center mt-7">
              <Link to="/ca/my-task/new-scheme-creation">
                <div className="w-44 h-[40px] border-[2px] rounded-[8px] py-[10.5px] px-2 xl:px-[16px] border-[#1c468e] flex justify-center items-center mt-2 cursor-pointer">
                  <img src={addCircle} alt="icon" />
                  <span className="ml-1 text-sm  md:text-[10px] font-normal text-[#1c468e] lg:text-[13px] text-gilroy-medium ">
                    New Schema
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="mt-[25px] mb-[35px] ">
            <div className="">
              <p className="text-sm font-normal text-gilroy-medium ">
                OR search by Geography
              </p>
            </div>
            <div className="flex items-center flex-wrap gap-4">
              <div className="">
                <SelectButtonTask
                  setOption={handleSetOption1}
                  options={options}
                  selectedOption={selectedOption1}
                  placeholder="India"
                />
              </div>
              <div className="">
                <SelectButtonTask
                  setOption={handleSetOption2}
                  options={options}
                  selectedOption={selectedOption2}
                  placeholder="Maharashtra"
                />
              </div>
              <div className="">
                <SelectButtonTask
                  setOption={handleSetOption2}
                  options={options}
                  selectedOption={selectedOption2}
                  placeholder="Pune"
                />
              </div>
              <div className="h-6 border-r-2 border-gray-300 "></div>
              <div>
                <SelectButtonTask
                  setOption={handleSetOption3}
                  options={options}
                  selectedOption={selectedOption3}
                  placeholder="Status"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="h-screen md:h-auto sm:h-auto overflow-x-hidden overflow-y-auto">
          <div className="">
            <ReactTable defaultData={defaultData} columns={columns} />
          </div>
          <div className="mt-10">
            <CustomPagination
              totalItems={defaultData?.length}
              itemsPerPage={5}
              maxPageNumbersToShow={5}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSchemaCreation;
