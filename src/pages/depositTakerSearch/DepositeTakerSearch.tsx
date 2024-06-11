import LanguageBar from "../../components/landingPage/LanguageBar";
import TopDetail from "../../components/landingPage/TopDetail";
import Navbar from "../../components/landingPage/Navbar";
import Footer from "../../components/landingPage/Footer";
import SchemeSearchTabsContainer from "../../components/schemeSearch/schemeSearchTabs";
import DepositeSearchTabsContainer from "../../components/depositeTakerSearch/DepositeSearchTabs";
import InputField from "../../components/form/InputField";
import SelectField from "../../components/form/SelectField";
import searchButton from "../../assets/images/search-normal.svg";
import ReactTable from "../../components/userFlow/common/ReactTable";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import { createColumnHelper } from "@tanstack/react-table";
import ToggleSwitch from "../../components/ScehmaManagement/ToggleSwitch";
import { Link } from "react-router-dom";
import Eye from "../../assets/images/eye2.svg";
import VerticalLine from "../../assets/images/verticalLine.png";
import ArrangeSquare from "../../assets/images/arrangeSquare.png";

import { useState } from "react";

type TableType = {
  sno: string;
  depositeTakerID: string;
  depositeTakerName: string;
  pan: string;
  status: string;
  action: boolean;
};

const columnHelper = createColumnHelper<TableType>();

const DepositeTakerSearch: React.FC = () => {
  const [selectedOption1, setSelectedOption1] = useState<string | null>(null);
  const [selectedOption2, setSelectedOption2] = useState<string | null>(null);
  const [selectedOption3, setSelectedOption3] = useState<string | null>(null);
  const [selectedOption4, setSelectedOption4] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);

  const defaultData: TableType[] = [
    {
      sno: "01",
      depositeTakerID: "DT001",
      depositeTakerName: "Deposit Taker 1",
      status: "Active",
      pan: "BOdbv4588D",
      action: false,
    },
    {
      sno: "02",
      depositeTakerID: "DT002",
      depositeTakerName: "Deposit Taker 2",
      status: "pending",
      pan: "BOdbv4588D",
      action: true,
    },
    {
      sno: "03",
      depositeTakerID: "DT002",
      depositeTakerName: "Deposit Taker 2",
      status: "pending",
      pan: "BOdbv4588D",
      action: true,
    },
    {
      sno: "04",
      depositeTakerID: "DT002",
      depositeTakerName: "Deposit Taker 2",
      status: "pending",
      pan: "BOdbv4588D",
      action: true,
    },
    {
      sno: "05",
      depositeTakerID: "DT002",
      depositeTakerName: "Deposit Taker 2",
      status: "pending",
      pan: "BOdbv4588D",
      action: true,
    },
    {
      sno: "06",
      depositeTakerID: "DT002",
      depositeTakerName: "Deposit Taker 2",
      status: "pending",
      pan: "BOdbv4588D",
      action: true,
    },
  ];

  const columns = [
    columnHelper.accessor("sno", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>Sr. No.</span>,
    }),
    columnHelper.accessor("depositeTakerID", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>Deposite Taker ID</span>,
    }),
    columnHelper.accessor("depositeTakerName", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>Deposite Taker Name</span>,
    }),
    columnHelper.accessor("pan", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>PAN</span>,
    }),
    columnHelper.accessor("status", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>Status</span>,
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

  const handleSetOption1 = (value: string) => {
    setSelectedOption1(value);
  };

  const handleSetOption2 = (value: string) => {
    setSelectedOption2(value);
  };
  const handleSetOption3 = (value: string) => {
    setSelectedOption3(value);
  };
  const handleSetOption4 = (value: string) => {
    setSelectedOption4(value);
  };

  return (
    <div>
      <LanguageBar />
      <TopDetail />
      <Navbar />
      <div className="w-[100%] p-[50px] flex flex-col gap-[40px]">
        <DepositeSearchTabsContainer />
        <div className="flex items-center gap-4 flex-wrap">
          <div className="w-[30%] min-w-[150px] max-w-[317px] ">
            <label
              htmlFor="Deposit taker Search"
              className="text-base font-normal text-gilroy-medium "
            >
              Search by
            </label>
            <SelectField
              setOption={handleSetOption1}
              options={options}
              selectedOption={selectedOption1}
              placeholder="India"
              height="56px"
            />
          </div>
          <div className="w-[60%] min-w-[200px]">
            <label
              htmlFor="Deposit taker Search"
              className="text-base font-normal text-gilroy-medium "
            >
              Deposite Taker Search
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
          <div className=" w-[60%] sm:w-[60%] lg:w-[40%] flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <SelectField
              setOption={handleSetOption2}
              options={options}
              selectedOption={selectedOption2}
              placeholder="India"
              height="40px"
            />
            <SelectField
              setOption={handleSetOption3}
              options={options}
              selectedOption={selectedOption3}
              placeholder="India"
              height="40px"
            />
            <img src={VerticalLine} alt="line" className="mx-1 mt-1" />
            <SelectField
              setOption={handleSetOption4}
              options={options}
              selectedOption={selectedOption4}
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
              currentPage={page}
              setCurrentPage={setPage}
              totalItems={defaultData?.length}
              itemsPerPage={pageSize}
              maxPageNumbersToShow={5}
            />
          </div>
        </div>
      </div>
      <div className="mt-[100px]">
        <Footer />
      </div>
    </div>
  );
};

export default DepositeTakerSearch;
