import React, { useEffect, useState } from "react";

import { createColumnHelper } from "@tanstack/react-table";

import Eye from "../../../assets/images/eye2.svg";

import { Link } from "react-router-dom";
import InputFields from "../../../components/ScehmaManagement/InputField";
import searchButton from "../../../assets/images/search-normal.svg";
import ReactTable from "../../../components/userFlow/common/ReactTable";
import SelectButtonTask from "../../../components/ScehmaManagement/SelectButton";
import CustomPagination from "../../../components/CustomPagination/CustomPagination";
import axios from "axios";
import { bffUrl } from "../../../utils/api";
import LoaderSpin from "../../../components/LoaderSpin";

type TableType = {
  id: number;
  uniqueId: string;
  depositTakerID: string;
  depositTakerName: string;
  status: string;
  action: boolean;
};

const columnHelper = createColumnHelper<TableType>();

const MyTaskStatus = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [myTaskData, setMyTaskData] = useState([]);
  const myTaskRg = async () => {
    setLoader(true);
    try {
      const { data } = await axios.get(`${bffUrl}/mytask/regulator-task`, {
        params: {
          page: page,
          limit: pageSize,
          regId: "RG02ID8",
        },
      });
      if (data?.data?.depositTakers) {
        const mappedData = data.data.depositTakers.map(
          (item: any, index: number) => ({
            ...item,
            id: index + 1,
            key: index,
            depositTakerName: `${item?.approverRelation?.firstName || ""} ${
              item?.approverRelation?.lastName || ""
            }`,
          })
        );
        setMyTaskData(mappedData);
      }

      setTotal(data?.data?.total);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching schemes:", error);
      setLoader(false);
    }
  };

  useEffect(() => {
    myTaskRg();
  }, [page, pageSize]);

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.renderValue(),
      header: () => <span>Sr. No.</span>,
    }),
    columnHelper.accessor("uniqueId", {
      cell: (info) => info.renderValue(),
      header: () => <span>Deposit Taker ID</span>,
    }),
    columnHelper.accessor("depositTakerName", {
      cell: (info) => info.renderValue(),
      header: () => <span>Deposit Taker Name</span>,
    }),
    columnHelper.accessor("status", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => <span>Status</span>,
    }),
    columnHelper.accessor((row) => row, {
      id: "action",
      cell: (info) => (
        <div className="flex justify-center items-center ">
          <Link to={"/rg/mytask/form"}>
            <div>
              <img src={Eye} alt="Eye" className="cursor-pointer" />
            </div>
          </Link>
        </div>
      ),
      header: () => <span>Action</span>,
    }),
  ];

  const options1 = [
    { value: "pdf", label: "PDF" },
    { value: "docx", label: "DOCX" },
    { value: "image", label: "Image" },
  ];

  const options2 = [
    { value: "pdf", label: "PDF" },
    { value: "docx", label: "DOCX" },
    { value: "image", label: "Image" },
  ];
  const options3 = [
    { value: "pdf", label: "PDF" },
    { value: "docx", label: "DOCX" },
    { value: "image", label: "Image" },
  ];
  const options4 = [
    { value: "pdf", label: "PDF" },
    { value: "docx", label: "DOCX" },
    { value: "image", label: "Image" },
  ];
  const [selectedOption1, setSelectedOption1] = useState<string | null>(null);

  const [selectedOption2, setSelectedOption2] = useState<string | null>(null);

  const [selectedOption3, setSelectedOption3] = useState<string | null>(null);
  const [selectedOption4, setSelectedOption4] = useState<string | null>(null);

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
    <div
      className="relative xl:ml-[40px]"
      style={{ minHeight: "calc(100vh - 110px)" }}
    >
      <div>
        <div className=" mt-4">
          <div className=" flex  space-x-2  items-center flex-wrap">
            <div className="md:w-[500px] lg:w-[600px] sm:w-[350px] w-[300px]">
              <div className="mb-2">
                <label
                  htmlFor="Deposit taker Search"
                  className="text-base font-normal text-gilroy-medium "
                >
                  Deposit taker Search
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
                  options={options1}
                  selectedOption={selectedOption1}
                  placeholder="India"
                />
              </div>
              <div className="">
                <SelectButtonTask
                  setOption={handleSetOption2}
                  options={options2}
                  selectedOption={selectedOption2}
                  placeholder="Maharashtra"
                />
              </div>
              <div className="">
                <SelectButtonTask
                  setOption={handleSetOption3}
                  options={options3}
                  selectedOption={selectedOption3}
                  placeholder="Pune"
                />
              </div>
              <div className="h-6 border-r-2 border-gray-300 "></div>
              <div>
                <SelectButtonTask
                  setOption={handleSetOption4}
                  options={options4}
                  selectedOption={selectedOption4}
                  placeholder="Status"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="h-screen md:h-auto sm:h-auto overflow-x-hidden overflow-y-auto">
          <div className=" mb-20">
            {loader ? (
              <LoaderSpin />
            ) : myTaskData?.length > 0 ? (
              <ReactTable defaultData={myTaskData} columns={columns} />
            ) : (
              <div className=" flex justify-center items-center">
                <h1>No data available</h1>
              </div>
            )}
          </div>
          <div className="absolute bottom-0 w-full">
            {myTaskData?.length > 0 && (
              <CustomPagination
                currentPage={page}
                setCurrentPage={setPage}
                totalItems={total}
                itemsPerPage={pageSize}
                maxPageNumbersToShow={5}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTaskStatus;
