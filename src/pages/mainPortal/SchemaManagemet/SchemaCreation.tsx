import React, { useState } from "react";

import { createColumnHelper } from "@tanstack/react-table";

import Eye from "../../../assets/images/eye2.svg";
import addCircle from "../../../assets/images/new_images/add-circle.png";
import { Link } from "react-router-dom";
import InputFields from "../../../components/ScehmaManagement/InputField";
import searchButton from "../../../assets/images/search-normal.svg";
import ReactTable from "../../../components/userFlow/common/ReactTable";
import SelectButtonTask from "../../../components/ScehmaManagement/SelectButton";
import CustomPagination from "../../../components/CustomPagination/CustomPagination";
import ToggleSwitch from "../../../components/ScehmaManagement/ToggleSwitch";
import TaskTabs from "../../../components/ScehmaManagement/TaskTabs";

type TableType = {
  sno: string;
  depositTakerID: string;
  depositTakerName: string;
  status: string;
  action: boolean;
};

const columnHelper = createColumnHelper<TableType>();

const SchemaCreation = () => {
  const defaultData: TableType[] = [
    {
      sno: "01",
      depositTakerID: "DT001",
      depositTakerName: "Deposit Taker 1",
      status: "Active",
      action: false,
    },
    {
      sno: "02",
      depositTakerID: "DT002",
      depositTakerName: "Deposit Taker 2",
      status: "pending",
      action: true,
    },
    {
      sno: "03",
      depositTakerID: "DT002",
      depositTakerName: "Deposit Taker 2",
      status: "pending",
      action: true,
    },
    {
      sno: "04",
      depositTakerID: "DT002",
      depositTakerName: "Deposit Taker 2",
      status: "pending",
      action: true,
    },
    {
      sno: "05",
      depositTakerID: "DT002",
      depositTakerName: "Deposit Taker 2",
      status: "pending",
      action: true,
    },
    {
      sno: "06",
      depositTakerID: "DT002",
      depositTakerName: "Deposit Taker 2",
      status: "pending",
      action: true,
    },
  ];

  const columns = [
    columnHelper.accessor("sno", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>Sr. No.</span>,
    }),
    columnHelper.accessor("depositTakerID", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>Deposit Taker ID</span>,
    }),
    columnHelper.accessor("depositTakerName", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>Deposit Taker Name</span>,
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
            <ToggleSwitch enabled={value} />
          </div>
        );
      },
      header: () => <span>Status</span>,
    }),
    columnHelper.accessor((row: any) => row, {
      id: "action",
      cell: (info: any) => {
        const value = info.getValue();

        return (
          <div className="flex justify-center items-center ">
            <Link to={"/dt/mytask/form"}>
              <div>
                <img src={Eye} alt="Eye " className="cursor-pointer" />
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
        <TaskTabs />
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
              <Link to="/usermanagement/adduser">
                <div className="w-44 h-[40px] border-[2px] rounded-[8px] py-[10.5px] px-2 xl:px-[16px] border-[#1c468e] flex justify-center items-center mt-2 cursor-pointer">
                  <img src={addCircle} alt="icon" />
                  <span className="ml-1 text-[14px] md:text-base font-normal text-[#1c468e] lg:text-[16px] text-gilroy-medium ">
                    Add User
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
              totalItems={defaultData.length}
              itemsPerPage={5}
              maxPageNumbersToShow={5}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemaCreation;
