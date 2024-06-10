import LanguageBar from "../../components/landingPage/LanguageBar";
import TopDetail from "../../components/landingPage/TopDetail";
import Navbar from "../../components/landingPage/Navbar";
import Footer from "../../components/landingPage/Footer";
import SchemeSearchTabsContainer from "../../components/schemeSearch/schemeSearchTabs";
import InputField from "../../components/form/InputField";
import SelectField from "../../components/form/SelectField";
import searchButton from "../../assets/images/search-normal.svg";
import ReactTable from "../../components/userFlow/common/ReactTable";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import { createColumnHelper } from "@tanstack/react-table";
import ToggleSwitch from "../../components/ScehmaManagement/ToggleSwitch";
import { Link } from "react-router-dom";
import Eye from "../../assets/images/eye2.svg";

import { useState } from "react";

type TableType = {
  sno: string;
  depositTakerID: string;
  depositTakerName: string;
  status: string;
  action: boolean;
};

const columnHelper = createColumnHelper<TableType>();

const SchemeSearch: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

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
      header: () => <span>Scheme ID</span>,
    }),
    columnHelper.accessor("depositTakerName", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>Scheme Name</span>,
    }),
    columnHelper.accessor("depositTakerName", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>Status</span>,
    }),
    columnHelper.accessor("depositTakerName", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>Deposite Taker</span>,
    }),
    columnHelper.accessor("depositTakerName", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>Created by</span>,
    }),
    columnHelper.accessor((row: any) => row, {
      id: "action",
      cell: (info: any) => {
        const value = info.getValue();

        return (
          <div className="flex justify-center items-center ">
            <Link to={"/scheme-search-details"}>
              <div>
                <img src={Eye} alt="Eye " className="cursor-pointer" />
              </div>
            </Link>
          </div>
        );
      },
      header: () => <span>View</span>,
    }),
  ];

  const options = [
    { value: "pdf", label: "PDF" },
    { value: "docx", label: "DOCX" },
    { value: "image", label: "Image" },
  ];

  const handleSetOption1 = () => {};

  return (
    <div>
      <LanguageBar />
      <TopDetail />
      <Navbar />
      <div className="w-[100%] p-[50px] flex flex-col gap-[40px]">
        <SchemeSearchTabsContainer />
        <div className="flex items-center gap-4  ">
          <div className="w-[30%] max-w-[317px] ">
            <label
              htmlFor="Deposit taker Search"
              className="text-base font-normal text-gilroy-medium "
            >
              Search by
            </label>
            <SelectField
              setOption={handleSetOption1}
              options={options}
              selectedOption={selectedOption}
              placeholder="India"
              height="56px"
            />
          </div>
          <div className="w-[60%]">
            <label
              htmlFor="Deposit taker Search"
              className="text-base font-normal text-gilroy-medium "
            >
              Scheme Search
            </label>
            <div className="mt-2">
              <InputField
                height="40px"
                // width="550px"
                padding="10px"
                placeholder="Search by Unique ID/name"
              />
            </div>
          </div>
          <div className=" flex items-center self-end ">
            <button
              className={`w-[146px] h-[56px] border-[2px] rounded-[8px] py-[10.5px] px-2 xl:px-[16px] flex justify-center items-center ${"bg-[#1c468e] cursor-pointer"} mt-2`}
            >
              <img src={searchButton} alt="searchButton" />
              <span className="ml-1 text-[14px] md:text-base font-normal text-[#fff] lg:text-[16px] text-gilroy-medium ">
                Search
              </span>
            </button>
          </div>
        </div>
        <div>
          <label
            htmlFor="Deposit taker Search"
            className="text-base font-normal text-gilroy-medium "
          >
            QR Search by
          </label>
          <div className="w-[40%] flex items-center gap-2">
            <SelectField
              setOption={handleSetOption1}
              options={options}
              selectedOption={selectedOption}
              placeholder="India"
              height="40px"
            />
            <SelectField
              setOption={handleSetOption1}
              options={options}
              selectedOption={selectedOption}
              placeholder="India"
              height="40px"
            />
            <SelectField
              setOption={handleSetOption1}
              options={options}
              selectedOption={selectedOption}
              placeholder="India"
              height="40px"
            />
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
      {/* <div className="mt-[100px]"><Footer /></div> */}
    </div>
  );
};

export default SchemeSearch;
