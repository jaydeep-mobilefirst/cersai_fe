import React, { useEffect, useState } from "react";

import { createColumnHelper } from "@tanstack/react-table";

import Eye from "../../../assets/images/eye2.svg";
import addCircle from "../../../assets/images/new_images/add-circle.png";
import { Link, useNavigate } from "react-router-dom";
import InputFields from "../../../components/ScehmaManagement/InputField";
import searchButton from "../../../assets/images/search-normal.svg";
import ReactTable from "../../../components/userFlow/common/ReactTable";
import SelectButtonTask from "../../../components/ScehmaManagement/SelectButton";
import CustomPagination from "../../../components/CustomPagination/CustomPagination";
import ToggleSwitch from "../../../components/ScehmaManagement/ToggleSwitch";
import TaskTabs from "../../../components/ScehmaManagement/TaskTabs";
import LoaderSpin from "../../../components/LoaderSpin";
import { axiosTokenInstance } from "../../../utils/axios";

type SchemeType = {
  id: number;
  uniqueId: string;
  name: string;
  status: string;
  active: boolean;
  createdBy: any;
};

const columnHelper = createColumnHelper<SchemeType>();

const SchemaCreation = () => {
  const [schemaData, setSchemaData] = useState([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [statusForSearch, setStatusForSearch] = useState<string | null>("ALL");
  const [fetchedRoles, setFetchedRoles] = useState<any>(false);

  const [searchInput, setSearchInput] = useState<string>("");
  const handleSearchInput = (event: any) => {
    event?.preventDefault();
    const { value } = event?.target;
    setSearchInput(value);
  };
  const navigate = useNavigate();

  const fetchSchemes = async () => {
    setLoader(true);
    try {
      const data = await axiosTokenInstance.get(
        `/scheme-portal/scheme-by/${sessionStorage.getItem("entityUniqueId")}`,
        {
          params: {
            page: page,
            limit: pageSize,
            nameSearchText: searchInput,
            status: statusForSearch,
          },
        }
      );
      console.log(data?.data?.limit, "data");
      setSchemaData(data?.data?.data);
      setTotal(data?.data?.totalCount);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching schemes:", error);

      setLoader(false);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, [page, pageSize]);

  useEffect(() => {
    const sessionData = sessionStorage.getItem("roles");
    if (sessionData) {
      const rolesArray: string[] = sessionData.split(",");

      const filteredRoles = rolesArray.filter(
        (role) => role === "scheme-edit-access-deposit-taker"
      );
      if (filteredRoles?.length > 0) {
        setFetchedRoles(true);
      }
    }
  }, []);

  const NavigateScheme = (uniqueId: any, createdBy: any) => {
    navigate("/dt/scheme/creation", {
      state: {
        uniqueId: uniqueId,
        createdBy: createdBy,
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
      header: () => "S.No.",
      // cell: (info) => info.getValue(),
      cell: () => {
        while (count <= total) {
          count++;
          return count;
        }
      },
    }),
    columnHelper.accessor("uniqueId", {
      header: () => "Scheme ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("name", {
      header: () => "Scheme Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("status", {
      header: () => "Status",
      cell: (info) => {
        const value = info.getValue();
        // Replace underscores with spaces if the value is "UNDER_LETIGATION"
        return value === "UNDER_LETIGATION" ? "UNDER LITIGATION" : value?.replace(/_/g, " ");
      },
    }),
    // columnHelper.accessor("id", {
    //   header: () => "Action",

    //   cell: (info: any) => {
    //     const Activated = info?.row?.original?.active;
    //     const uniqueId = info?.row?.original?.uniqueId;
    //     const apiCall = () => {
    //       axiosTokenInstance
    //         .patch(`/scheme-portal/${uniqueId}/active`, {
    //           isActive: !Activated,
    //         })

    //         .then((responce: any) => {
    //           fetchSchemes();
    //         })
    //         .catch((error) => {
    //           console.log(error);
    //         });
    //     };

    //     return (
    //       <div key={Math.random()} className='flex justify-center items-center'>
    //         <p className='mr-2'>{Activated ? "Active" : "inactive"}</p>
    //         <ToggleSwitch enabled={Activated} apiCall={apiCall} />
    //       </div>
    //     );
    //   },
    // }),
    columnHelper.accessor("id", {
      header: () => "View",

      cell: (info) => {
        const uniqueId = info?.row?.original?.uniqueId;
        const createdBy = info?.row?.original?.createdBy;
        return (
          <div className="flex justify-center items-center ">
            {/* <Link to={"/dt/schema/creation"}> */}
            <div onClick={() => NavigateScheme(uniqueId, createdBy)}>
              <img src={Eye} alt="Eye " className="cursor-pointer" />
            </div>
            {/* </Link> */}
          </div>
        );
      },
    }),
  ];

  const options1 = [
    { value: "India", label: "India" },
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Pune", label: "Pune" },
    { value: "Status", label: "Status" },
  ];

  const options2 = [
    { value: "India", label: "India" },
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Pune", label: "Pune" },
    { value: "Status", label: "Status" },
  ];
  const options3 = [
    { value: "India", label: "India" },
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Pune", label: "Pune" },
    { value: "Status", label: "Status" },
  ];
  const options4 = [
    { value: "India", label: "India" },
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Pune", label: "Pune" },
    { value: "Status", label: "Status" },
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
    { value: "ALL", label: "All" },
    { value: "ACTIVE", label: "ACTIVE" },
    { value: "BANNED", label: "BANNED" },
    { value: "UNDER_LETIGATION", label: "Under Litigation" },
  ];
  const handleSetStatus = (option: any) => {
    console.log(option, "option");
    setSelectedStatus(option);

    setStatusForSearch(option);
  };

  const handleClickSearch = () => {
    setPage(1);
    fetchSchemes();
  };
  return (
    <div
      className="relative xl:ml-[40px]"
      style={{ minHeight: "calc(100vh - 110px)" }}
    >
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
            {fetchedRoles && (
              <>
                {" "}
                <div className=" flex items-center mt-7">
                  <Link to="/dt/scheme/form">
                    <div className="w-40 h-[40px] border-[2px] rounded-[8px] py-[10.5px] px-2 xl:px-[16px] border-[#1c468e] flex justify-center items-center mt-2 cursor-pointer">
                      <img src={addCircle} alt="icon" />
                      <span className="ml-1 text-[14px] md:text-base font-normal text-[#1c468e] lg:text-[16px] text-gilroy-medium ">
                        New Scheme
                      </span>
                    </div>
                  </Link>
                </div>
              </>
            )}
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
          <div className=" mb-20">
            {loader ? (
              <LoaderSpin />
            ) : schemaData?.length > 0 ? (
              <ReactTable
                key={JSON?.stringify(schemaData)}
                defaultData={schemaData}
                columns={columns}
              />
            ) : (
              <div className=" flex justify-center items-center">
                <h1>No data available</h1>
              </div>
            )}
          </div>
          {schemaData.length > 0 && (
            <div className="absolute bottom-0 w-full">
              <CustomPagination
                currentPage={page}
                setCurrentPage={setPage}
                totalItems={total}
                itemsPerPage={pageSize}
                maxPageNumbersToShow={5}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchemaCreation;
