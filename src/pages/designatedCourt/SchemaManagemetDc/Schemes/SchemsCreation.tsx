import { useState, useEffect } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import Eye from "../../../../assets/images/eye2.svg";
import InputFields from "../../../../components/ScehmaManagement/InputField";
import searchButton from "../../../../assets/images/search-normal.svg";
import ReactTable from "../../../../components/userFlow/common/ReactTable";
import SelectButtonTask from "../../../../components/ScehmaManagement/SelectButton";
import CustomPagination from "../../../../components/CustomPagination/CustomPagination";
import TaskTabsDc from "../../../../components/ScehmaManagement/TaskTabsDc";
import { useNavigate } from "react-router-dom";
import LoaderSpin from "../../../../components/LoaderSpin";
import { axiosTokenInstance } from "../../../../utils/axios";

type SchemeType = {
  id: number;
  uniqueId: string;
  name: string;
  depositTakerId: string;
  // createdBy: string;
  createdBy: string | null;
  status: string;
  active: boolean;
  createdByName: string;
};

const columnHelper = createColumnHelper<SchemeType>();

const NewSchemaCreation = () => {
  const [schemaData, setSchemaData] = useState([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [statusForSearch, setStatusForSearch] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const handleSearchInput = (event: any) => {
    event?.preventDefault();
    const { value } = event?.target;
    setSearchInput(value);
  };

  const fetchSchemes = async () => {
    setLoader(true);
    try {
      // const uniqueId = sessionStorage.getItem("entityUniqueId");
      const { data } = await axiosTokenInstance.get(`/scheme-portal/scheme`, {
        params: {
          page: page,
          limit: pageSize,
          searchText: searchInput,
          status: statusForSearch,
        },
      });

      // setSchemaData(
      //   data.data.map((item: any, index: any) => ({
      //     ...item,
      //     id: index + 1, // Assuming you want to use index as S.No.
      //     status: item.status, // Or some logic to determine status
      //   }))
      // );
      setSchemaData(data?.data);
      setTotal(data?.total);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching schemes:", error);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, [page, pageSize]);
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
      header: () => <span>Scheme ID</span>,
    }),
    columnHelper.accessor("name", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>Scheme Name</span>,
    }),
    columnHelper.accessor("status", {
      header: () => "Status",
      cell: (info) => {
        const value = info.getValue();
        // Replace underscores with spaces if the value is "UNDER_LETIGATION"
        return value === "UNDER_LETIGATION" ? "UNDER LITIGATION" : value;
      },
    }),

    columnHelper.accessor("createdByName", {
      cell: (info: any) => (info.renderValue() ? info.renderValue() : "N/A"),
      header: () => <span>Created By</span>,
    }),
    columnHelper.accessor((row: any) => row, {
      id: "action",
      cell: (info) => {
        let createdBy = info?.cell?.row?.original?.createdBy;
        const NavigateScheme = (uniqueId: any, depositTakerId: any) => {
          navigate("/dc/my-task/audit-rail", {
            state: {
              uniqueId: uniqueId,
              depositTakerId: depositTakerId,
              createdBy,
            },
          });
        };
        const uniqueId = info?.row?.original?.uniqueId;
        const depositTakerId = info?.row?.original?.depositTakerId;
        return (
          <div className="flex justify-center items-center ">
            <div onClick={() => NavigateScheme(uniqueId, depositTakerId)}>
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
    { value: "", label: "All" },
    { value: "ACTIVE", label: "Active" },
    { value: "BANNED", label: "Banned" },
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
        <TaskTabsDc />
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
                onChange={handleSearchInput}
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
          <div className=" mb-12">
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

export default NewSchemaCreation;
