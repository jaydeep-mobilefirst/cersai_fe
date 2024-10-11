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
import { Link, useNavigate } from "react-router-dom";
import Eye from "../../assets/images/eye2.svg";
import VerticalLine from "../../assets/images/verticalLine.png";
import ArrangeSquare from "../../assets/images/arrangeSquare.png";

import { useEffect, useState } from "react";
import LoaderSpin from "../../components/LoaderSpin";
import useFetchStates from "../../contextAPI/useFetchStates";
import useFetchDistrict from "../../contextAPI/useFetchDistrict";
import { useLandingStore } from "../../zust/useLandingStore";
import { useLangugaeStore } from "../../zust/useLanguageUsStore";
import { axiosTraceIdInstance } from "../../utils/axios";

type TableType = {
  sn: number;
  id: string;
  panCard: string;
  companyName: string;
  status: string;
  action: boolean;
  nodalOfficerId: any;
};

const columnHelper = createColumnHelper<TableType>();

const DepositeTakerSearch: React.FC = () => {
  const [stateId, setStateId] = useState<number | null | undefined>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedOption1, setSelectedOption1] = useState<string | null>(null);
  const [state, setSelectedState] = useState<string | null>(null);
  const [district, setSelectedDistrict] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [statusForSearch, setStatusForSearch] = useState<string | null>(null);
  const [loader, setLoader] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);

  const [pageSize, setPageSize] = useState<number>(10);

  const [total, setTotal] = useState<number>(0);

  const [taskData, setTaskData] = useState([]);
  const navigate = useNavigate();
  const { homePageData, setHomePageData } = useLandingStore((state) => state);
  const { language } = useLangugaeStore((state) => state);
  console.log("totoal", total, taskData);

  useEffect(() => {
    homePageCmsApi();
  }, [state, language]);

  const homePageCmsApi = () => {
    setLoader(true);
    // setHomePageData(data.data.content)
    axiosTraceIdInstance
      .get(`/websitecontent/get/name?wcname=home`, {
        headers: {
          "Accept-Language": language,
        },
      })
      .then((response) => {
        console.log("api-response", response);
        setHomePageData(response?.data?.data?.content?.updatedStructure);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  };

  useEffect(() => {
    apiCall();
  }, [pageSize, page, statusForSearch]);

  const NavigateDepositTaker = (id: string, nodalOfficerId: any) => {
    navigate("/deposite-taker-search-form", {
      state: {
        depositTakerId: id,
        nodalOfficerId: nodalOfficerId,
      },
    });
  };

  const apiCall = () => {
    setLoader(true);
    axiosTraceIdInstance
      .get("/deposit-taker/solr", {
        params: {
          page: page,
          limit: pageSize,
          // userId: 1,
          searchText: searchInput,
          status: statusForSearch,
        },
      })
      .then((res) => {
        setLoader(false);
        if (res.status === 200) {
          let currentPage = (parseInt(res?.data?.data?.page) - 1) * pageSize;
          const data = res?.data?.data;
          if (data && data?.length > 0) {
            setTaskData(res?.data?.data);
            setTotal(res?.data?.total);
            setLoader(false);
          } else {
            setTaskData([]);
            setLoader(false);
          }
        }
      })
      .catch((error) => {
        console.log(error.message);
        setLoader(false);
      });
  };

  const columns = [
    columnHelper.accessor("sn", {
      header: () => <span>Sr. No.</span>,
      cell: (info) => {
        const serialNumber = (page - 1) * pageSize + (info.row.index + 1);
        return <span>{serialNumber}</span>;
      },
    }),
    columnHelper.accessor("id", {
      cell: (info) => (info.renderValue() ? info.renderValue() : "N/A"),
      header: () => <span>Deposit Taker ID</span>,
    }),
    columnHelper.accessor("panCard", {
      cell: (info) => (info.renderValue() ? info.renderValue() : "N/A"),
      header: () => <span>PAN</span>,
    }),
    columnHelper.accessor("companyName", {
      cell: (info) => (info.renderValue() ? info.renderValue() : "N/A"),
      header: () => (
        <div className="flex justify-center items-center">
          <p> Deposit Taker Name</p>
          {/* <img
            // src={SortIcon}
            alt="Deposit Taker Name Icon"
            className="ml-2 cursor-pointer"
          /> */}
        </div>
      ),
    }),
    columnHelper.accessor("status", {
      cell: (info) => (info.renderValue() ? info.renderValue() : "N/A"),
      header: () => (
        <div className="flex justify-center items-center">
          <p> Status</p>
          {/* <img
            // src={SortIcon}
            alt="Status Icon"
            className="ml-2 cursor-pointer"
          /> */}
        </div>
      ),
    }),
    columnHelper.accessor((row) => row, {
      id: "action",
      cell: (info) => {
        // const value = info.getValue();
        const { id, nodalOfficerId } = info.getValue();
        return (
          <div
            className="flex justify-center items-center"
            onClick={() => NavigateDepositTaker(id, nodalOfficerId)}
          >
            {/* <Link to={"/entitymaster/deposit/form"}> */}
            <img src={Eye} alt="Eye " className="cursor-pointer" />
            {/* </Link> */}
          </div>
        );
      },
      header: () => <span>View</span>,
    }),
  ];

  const status = [
    { label: "Select Status", value: "" },
    { label: "Approved", value: "APPROVED" },
    { label: "Rejected", value: "REJECTED" },
    { label: "Incomplete", value: "INCOMPLETE" },
  ];

  const handleSetOption1 = (value: string) => {
    setSelectedOption1(value);
  };

  const handleSetState = (option: any) => {
    setSelectedState(option?.value);
    setStateId(option?.stateId);
  };
  const handleSetDistrict = (option: any) => {
    setSelectedDistrict(option?.value);
  };
  const handleSetStatus = (option: any) => {
    setPage(1);
    setSelectedStatus(option);
    setStatusForSearch(option?.value);
  };

  const handleSearchSubmit = (event: any) => {
    event?.preventDefault();
    setPage(1);
    apiCall();
  };

  const handleSetSearchInput = (event: any) => {
    const { value } = event?.target;
    setSearchInput(value);
    if (value === "") {
      setPage(1);
      apiCall();
    }
  };

  return (
    <div>
      <LanguageBar />
      <TopDetail />
      <Navbar />
      <div className="w-[100%] p-[50px] flex flex-col gap-[40px]">
        <DepositeSearchTabsContainer />
        <div className="flex items-center gap-4 flex-wrap">
          {/* <div className="w-[30%] min-w-[150px] max-w-[317px] ">
            <label
              htmlFor="Deposit taker Search"
              className="text-base font-normal text-gilroy-medium "
            >
              Search by
            </label>
            <SelectField
              setOption={handleSetOption1}
              options={[]}
              selectedOption={selectedOption1}
              placeholder="India"
              height="56px"
            />
          </div> */}
          <div className="w-[60%] min-w-[200px]">
            <label
              htmlFor="Deposit taker Search"
              className="text-base font-normal text-gilroy-medium "
            >
              Deposit Taker Search
            </label>
            <div className="mt-2">
              <InputField
                onChange={handleSetSearchInput}
                value={searchInput}
                height="40px"
                padding="10px"
                placeholder="Search by Unique ID/name"
              />
            </div>
          </div>
          <div className=" flex items-center self-end ">
            <button
              type="button"
              onClick={handleSearchSubmit}
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
            OR Search by
          </label>
          <div className=" w-[60%] sm:w-[60%] lg:w-[40%] flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* <SelectField
              setOption={handleSetState}
              options={[{label : "All", value : "", stateId : null}, ...states?.map((s : any) => ({value : s?.name, label : s?.name, stateId : s?.id}))]}
              selectedOption={state}
              placeholder="State"
              height="40px"
            />
            <SelectField
              setOption={handleSetDistrict}
              options={[{label : "All", value : "", stateId : null}, ...districts?.map((s : any) => ({value : s?.name, label : s?.name}))]}
              selectedOption={district}
              placeholder="District"
              height="40px"
            /> */}
            {/* <img src={VerticalLine} alt="line" className="mx-1 mt-1" /> */}
            <SelectField
              setOption={handleSetStatus}
              options={status}
              selectedOption={selectedStatus}
              placeholder="Status"
              height="40px"
            />
          </div>
        </div>
        <div className="h-screen md:h-auto sm:h-auto overflow-x-hidden overflow-y-auto ">
          <div className="">
            {loader ? (
              <LoaderSpin />
            ) : taskData?.length > 0 ? (
              <ReactTable
                key={JSON?.stringify(taskData)}
                defaultData={taskData}
                columns={columns}
              />
            ) : (
              <div className=" flex justify-center items-center">
                <h1>No data available</h1>
              </div>
              // <LoaderSpin />
            )}
          </div>
          <div className="mt-10">
            {taskData?.length > 0 && (
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
      <div className="mt-[100px]">
        <Footer />
      </div>
    </div>
  );
};

export default DepositeTakerSearch;
