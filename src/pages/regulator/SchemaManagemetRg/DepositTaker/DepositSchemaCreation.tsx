import React, { useEffect, useRef, useState } from "react";

import { createColumnHelper } from "@tanstack/react-table";

import Eye from "../../../../assets/images/eye2.svg";
import addCircle from "../../../../assets/images/new_images/add-circle.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InputFields from "../../../../components/ScehmaManagement/InputField";
import searchButton from "../../../../assets/images/search-normal.svg";
import ReactTable from "../../../../components/userFlow/common/ReactTable";
import SelectButtonTask from "../../../../components/ScehmaManagement/SelectButton";
import CustomPagination from "../../../../components/CustomPagination/CustomPagination";
import ToggleSwitch from "../../../../components/ScehmaManagement/ToggleSwitch";
import TaskTabsRg from "../../../../components/ScehmaManagement/TaskTabsRg";
import { axiosTokenInstance } from "../../../../utils/axios";
import LoaderSpin from "../../../../components/LoaderSpin";

// type TableType = {
//   sno: string;
//   depositTakerID: string;
//   depositTakerName: string;
//   pan: string;
//   status: string;
//   action: boolean;
// };
type TableType = {
  id: number;
  panNumber: string;
  status: string;
  uniqueId: string;
  action: boolean;
  companyName: string;
};

const columnHelper = createColumnHelper<TableType>();

const validatePan = (pan: string): boolean => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan);
};
const DepositSchemaCreation = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [myTaskData, setMyTaskData] = useState([]);
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [statusForSearch, setStatusForSearch] = useState<string | null>(null);
  const [scheme, setScheme] = useState<boolean>(false);
  const [schemeView, setSchemeView] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const isFirstRender = useRef(true); // Flag to track if it's the first render
  const location = useLocation();
  const handleSearchInput = (event: any) => {
    event?.preventDefault();
    const { value } = event?.target;
    setSearchInput(value);
    // if (value === "") {
    //   myTaskRg();
    // }
  };
  useEffect(()=>{
    if (isFirstRender.current) {
      isFirstRender.current = false; // Set flag to false after the first render
      return; // Exit early to prevent running the effect on the first load
    }
    if(searchInput===""){
      myTaskRg();
    }
  },[searchInput])
  const myTaskRg = async () => {
    setLoader(true);
    try {
      const { data } = await axiosTokenInstance.get(`/deposit-taker`, {
        params: {
          page: page,
          limit: pageSize,
          searchText: searchInput,
          status: statusForSearch,
        },
      });
      // if (data?.data?.depositTakers) {
      //   const mappedData = data.data.depositTakers.map(
      //     (item: any, index: number) => ({
      //       ...item,
      //       id: index + 1,
      //       key: index,
      //     })
      //   );
      //   setMyTaskData(mappedData);
      // }
      setMyTaskData(data?.data?.depositTakers);

      setTotal(data?.data?.total);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching schemes:", error);
      setLoader(false);
    }
  };

  useEffect(() => {
    myTaskRg();
  }, [page, pageSize, statusForSearch]);
  const NavigateDepositTaker = (id: string, page: any) => {
    navigate("/rg/deposit-taker/form", {
      state: {
        depositTakerId: id,
        pages: page,
      },
    });
  };
  let count: number;
  const serialNoGen = (page: number) => {
    count = (page - 1) * 10;
  };
  serialNoGen(page);

  const columns = [
    columnHelper.accessor("id", {
      cell: () => {
        while (count <= total) {
          count++;
          return count;
        }
      },
      header: () => <span>Sr. No.</span>,
    }),
    columnHelper.accessor("uniqueId", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>Deposit Taker ID</span>,
    }),
    columnHelper.accessor("companyName", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>Deposit Taker Name</span>,
    }),
    columnHelper.accessor("panNumber", {
      cell: (info: any) => {
        const pan = info.renderValue();
        return validatePan(pan) ? pan : "Invalid PAN";
      },
      header: () => <span>PAN</span>,
    }),
    columnHelper.accessor("status", {
      // cell: (info: any) => info.renderValue().replace(/_/g, " "),
      cell: (info) => {
        let value = info.renderValue();
        // Check for specific combination of "MOD" and "TRANSIT"
        if (value && /mod_transit/i.test(value)) {
          // Using a case-insensitive regex to match "MOD_TRANSIT"
          value = "Modification in Transit";
        } else if (value && /mod/i.test(value)) {
          // Similarly applying a case-insensitive check for any "MOD" occurrences
          value = value.replace(/mod/i, "Modification"); // Replace "MOD" with "Modification" case-insensitively
        }
        return value ? value.replace(/_/g, " ") : "N/A"; // Replace underscores with spaces for any other statuses
      },

      header: () => <span>Status</span>,
    }),
    columnHelper.accessor((row: any) => row, {
      id: "action",
      cell: (info: any) => {
        const { uniqueId } = info.getValue();

        return (
          <div
            className="flex justify-center items-center "
            onClick={() => NavigateDepositTaker(uniqueId, page)}
          >
            <div>
              <img src={Eye} alt="Eye " className="cursor-pointer" />
            </div>
          </div>
        );
      },
      header: () => <span>View</span>,
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
  const options = [
    { label: "All", value: "" },
    { label: "Approved", value: "APPROVED" },
    { label: "Rejected", value: "REJECTED" },
    { label: "Transit", value: "TRANSIT" },
    { label: "Refer to Regulator", value: "REFER_TO_REGULATOR" },
    { label: "Incomplete", value: "INCOMPLETE" },
    { label: "Pending", value: "PENDING" },
    { label: "Return", value: "RETURNED" },
    { label: "Modification Pending", value: "MOD_PENDING" },
    { label: "Modification In Transit", value: "MOD_TRANSIT" },
    {
      label: "Modification Refer to Regulator",
      value: "MOD_REFER_TO_REGULATOR",
    },
  ];
  const handleSetStatus = (option: any) => {
    console.log(option, "option");
    setSelectedStatus(option);

    setStatusForSearch(option);
  };

  const handleClickSearch = () => {
    setPage(1);
    myTaskRg();
  };
  useEffect(() => {
    const currentPageFromState = location?.state?.currentPage;
    console.log(currentPageFromState, "currentPageFromState");

    if (currentPageFromState) {
      myTaskRg();
      setPage(currentPageFromState);
    } else {
      setPage(1); // default to the first page
    }
  }, [location.state?.currentPage]);

  useEffect(() => {
    const sessionData = sessionStorage.getItem("roles");
    if (sessionData) {
      const rolesArray: string[] = sessionData.split(",");

      // scheme
      const schemeRolesView = rolesArray.filter(
        (role) => role === "scheme-view-access-regulator"
      );
      if (schemeRolesView?.length > 0) {
        setSchemeView(true);
      }
      const schemeRoles = rolesArray.filter(
        (role) => role === "scheme-edit-access-regulator"
      );
      if (schemeRoles?.length > 0) {
        setScheme(true);
      }
    }
  }, []);

  return (
    <div
      className="relative xl:ml-[40px]"
      style={{ minHeight: "calc(100vh - 110px)" }}
    >
      <div className="mt-6">
        <TaskTabsRg />
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
                  Deposit taker Search
                </label>
              </div>

              <InputFields
                height="40px"
                // width="550px"
                padding="10px"
                onChange={handleSearchInput}
                placeholder="Search by Unique ID/name"
                value={searchInput}
              />
            </div>
            <div className=" flex items-center mt-7">
              <button
                onClick={handleClickSearch}
                className={`w-40 h-[45px] border-[2px] rounded-[8px] py-[10.5px] px-2 xl:px-[16px] flex justify-center items-center ${"bg-[#1c468e] cursor-pointer"} mt-2`}
              >
                <img src={searchButton} alt="searchButton" />
                <span className="ml-1 text-[14px] md:text-base font-normal text-[#fff] lg:text-[16px] text-gilroy-medium ">
                  Search
                </span>
              </button>
            </div>
            <div className=" flex items-center mt-7">
              {scheme && (
                <Link to="/rg/deposit-taker/audit">
                  <div className="w-44 h-[40px] border-[2px] rounded-[8px] py-[10.5px] px-2 xl:px-[16px] border-[#1c468e] flex justify-center items-center mt-2 cursor-pointer">
                    <img src={addCircle} alt="icon" />
                    <span className="ml-1 text-sm  md:text-[10px] font-normal text-[#1c468e] lg:text-[13px] text-gilroy-medium ">
                      New Deposit taker
                    </span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="mt-[25px] mb-[35px] ">
            <div className="">
              <p className="text-sm font-normal text-gilroy-medium ">
                OR search by Status
              </p>
            </div>
            <div className="flex items-center flex-wrap gap-4">
              {/* <div className="">
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
              </div> */}
              {/* <div className="h-6 border-r-2 border-gray-300 "></div> */}
              <div>
                <SelectButtonTask
                  // setOption={handleSetOption4}
                  // options={options4}
                  // selectedOption={selectedOption4}
                  // placeholder="Status"
                  setOption={handleSetStatus}
                  options={options}
                  selectedOption={selectedStatus}
                  placeholder="Status"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="h-screen md:h-auto sm:h-auto overflow-x-hidden overflow-y-auto">
          <div className="mb-40">
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

export default DepositSchemaCreation;
