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
import { Link, useNavigate } from "react-router-dom";
import Eye from "../../assets/images/eye2.svg";
import VerticalLine from "../../assets/images/verticalLine.png";

import { useEffect, useState } from "react";
import { useDepositTakerRegistrationStore } from "../../zust/deposit-taker-registration/registrationStore";
import axios from "axios";
import { bffUrl } from "../../utils/api";
import LoaderSpin from "../../components/LoaderSpin";
import useFetchStates from "../../contextAPI/useFetchStates";
import useFetchDistrict from "../../contextAPI/useFetchDistrict";

type SchemeType = {
  id: number;
  uniqueId: string;
  name: string;
  depositTakerId: string;
  // createdBy: string;
  createdBy: string | null;
  status: string;
  active: boolean;
};

const columnHelper = createColumnHelper<SchemeType>();

const SchemeSearch: React.FC = () => {
  const navigate = useNavigate();

  const [schemaData, setSchemaData] = useState([]);

  const [loader, setLoader] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);

  const [pageSize, setPageSize] = useState<number>(10);

  const [total, setTotal] = useState<number>(0);
  const [stateId, setStateId] = useState<number | null | undefined>(null)
  const [searchInput, setSearchInput] = useState<string>("")

  const [state, setSelectedState] = useState<string | null>(null);

  const [district, setSelectedDistrict] = useState<string | null>(null);

  const [selectedOption1, setSelectedOption1] = useState<string | null>(null);
  const [selectedOption4, setSelectedOption4] = useState<string | null>(null);

  const fetchSchemes = async () => {
    setLoader(true);
    try {
      const { data } = await axios.get(`${bffUrl}/scheme-portal/solr-scheme`, {
        params: {
          page: page,
          limit: pageSize,
          searchText: searchInput,
          status : selectedOption1
        },
      });
      let currentPage = (parseInt(data?.page) - 1 ) * pageSize
      setSchemaData(data?.data?.map((d : any, i: number) => ({...d, id : (i + 1) + currentPage})));
      setTotal(data?.total);
      setLoader(false);
    } catch (error) {
      setSchemaData([])
      console.error("Error fetching schemes:", error);
      setLoader(false);
    }
  };
  
  useEffect(() => {
    fetchSchemes();
  }, [page, pageSize, selectedOption1]);

  const columns = [
    // columnHelper.accessor("id", {
    //   cell: (info: any) => info.renderValue(),
    //   header: () => <span>Sr. No.</span>,
    // }),
    columnHelper.accessor("id", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>Sr. No.</span>,
    }),
    columnHelper.accessor("uniqueId", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>Scheme ID</span>,
    }),
    columnHelper.accessor("name", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>Scheme Name</span>,
    }),

    columnHelper.accessor("status", {
      cell: (info: any) => {
        const value = info?.getValue();

        return (
          <div
            className="flex flex-col md:flex-row justify-center gap-3"
            key={Math.random()}
          >
            <span className="text-sm">{value}</span>
          </div>
        );
      },
      header: () => <span>Status</span>,
    }),
    columnHelper.accessor("depositTakerId", {
      cell: (info: any) => (info.renderValue() ? info.renderValue() : "N/A"),
      header: () => <span>Deposit Taker</span>,
    }),

    columnHelper.accessor("createdBy", {
      cell: (info: any) => (info.renderValue() ? info.renderValue() : "N/A"),
      header: () => <span>Created By</span>,
    }),
    columnHelper.accessor((row: any) => row, {
      id: "action",
      cell: (info) => {
        let createdBy = info?.cell?.row?.original?.createdBy;
        const NavigateScheme = (uniqueId: any, depositTakerId: any) => {
          navigate("/scheme-search-details", {
            state: {
              uniqueId: uniqueId,
              depositTakerId: depositTakerId,
              createdBy
            },
          });
        };
        const uniqueId = info?.row?.original?.uniqueId;
        const depositTakerId = info?.row?.original?.depositTakerId;
        return (
          <div className="flex justify-center items-center ">
            {/* <Link to={"/dt/schema/creation"}> */}
            <div onClick={() => NavigateScheme(uniqueId, depositTakerId)}>
              <img src={Eye} alt="Eye " className="cursor-pointer" />
            </div>
            {/* </Link> */}
          </div>
        );
      },
      header: () => <span>View</span>,
    }),
  ];

  const options = [
    {value : "", label : "All"},
    { value: "ACTIVE", label: "Active" },
    { value: "BANNED", label: "Banned" },
    { value: "UNDER_LETIGATION", label: "Under litigation" },
  ];

  const handleSetOption1 = (value: string) => {
    setSelectedOption1(value);
  };

  const handleSetOption4 = (value: any) => {
    setSelectedOption4(value);
    setSelectedOption1(value?.value)
  };

  const handleSetState = (option : any) => {
    setSelectedState(option?.value);
    setStateId(option?.stateId)
  };
  const handleSetDistrict = (option: any) => {
    setSelectedDistrict(option?.value);
  };
  const handleSearchSubmit = (event : any) => {
    event?.preventDefault();
    fetchSchemes();
  }
  const handleSetSearchInput = (event : any) => {
    const {value} = event?.target;
    setSearchInput(value)

  }

  return (
    <div>
      <LanguageBar />
      <TopDetail />
      <Navbar />
      <div className="w-[100%] p-[50px] flex flex-col gap-[40px]">
        <SchemeSearchTabsContainer />
        <div className="flex items-center gap-4 flex-wrap">
          <div className="w-[60%] min-w-[200px]">
            <label
              htmlFor="Deposit taker Search"
              className="text-base font-normal text-gilroy-medium "
            >
              Scheme Search
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
            QR Search by
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
            />
            <img src={VerticalLine} alt="line" className="mx-1 mt-1" /> */}
            <SelectField
              setOption={handleSetOption4}
              options={options}
              selectedOption={selectedOption4}
              placeholder="Status"
              height="40px"
            />
          </div>
        </div>
        <div className="h-screen md:h-auto sm:h-auto overflow-x-hidden overflow-y-auto">
          <div className="">
          {loader ? (
              <LoaderSpin />
            ) : schemaData?.length > 0 ? (
              <ReactTable defaultData={schemaData} columns={columns} />
            ) : (
              <div className=" flex justify-center items-center">
                <h1>No data available</h1>
              </div>
            )}
          </div>
          <div className="mt-10">
          {schemaData.length > 0 && (
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

export default SchemeSearch;
