import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import addCircle from "../../../assets/images/add-circleb.svg";
import searchButton from "../../../assets/images/search-normal.svg";
import ReactTable from "../../../components/userFlow/common/ReactTable";
import SelectButtonTask from "../../../components/UserManagement/SelectButtonManagement";
import CustomPagination from "../../../components/CustomPagination/CustomPagination";
import ToggleSwitch from "../../../components/UserManagement/ToggleSwitch";
import UmTabs from "../../../components/UserManagement/UmTabs";
import edit from "../../../assets/images/bedit.svg";
import { useNavigate } from "react-router-dom";
import useFetchFunctionalityForUAM from "../../../custom hooks/useFetchFunctionalityForUAM";
import uamStore from "../../../store/uamStore";
import useFetchUsers from "../../../custom hooks/fetchUsers";
import InputFields from "../../../components/ScehmaManagement/InputField";
import useFetchRoles from "../../../custom hooks/fetchRoles";
import { axiosTokenInstance } from "../../../utils/axios";

type TableType = {
  id: string;
  Name: string;
  role: string;
  isActive: boolean;
};

const columnHelper = createColumnHelper<TableType>();

const UserCreation = () => {
  const entityId = sessionStorage.getItem('entityUniqueId') ?? ''
  const { handleRefreshUAM } = uamStore((state => state))
  const { loading, users, page, pageSize, setFunctionalitySearch, setPage, setSearchString, totalPages } = useFetchUsers(entityId);


  const navigate = useNavigate();

  const handleAddUserClick = () => {
    navigate("/rg/usermanagement/usermaster");
  };


  const handleEditClick = (user: TableType) => {
    navigate("/rg/usermanagement/editusermasterum");
  };

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.renderValue(),
      header: () => <span>S.No.</span>,
    }),

    columnHelper.accessor((row) => row, {
      id: "name",
      cell: (info) => {
        const value: any = info.getValue();
        return <>{value?.firstName + " " + value?.lastName}</>
      },
      header: () => <span>Name</span>
    }),
    columnHelper.accessor("role", {
      cell: (info) => info.renderValue(),
      header: () => <span>Role</span>,
    }),
    columnHelper.accessor("isActive", {
      cell: (info) => {
        const value = info?.row?.original?.isActive;
        const id = info?.row?.original?.id;
        const StatusChange = () => {
          axiosTokenInstance
            .patch(`/user/status/`, {
              id: id,
              status: !value,
            })
            .then((response: any) => {
              handleRefreshUAM();
            })
            .catch((error: any) => { });
        };

        return (
          <div
            className="flex flex-col md:flex-row justify-center gap-3"
            key={Math.random()}
          >
            <span>{value ? "Active" : "InActive"}</span>
            <ToggleSwitch enabled={value} apiCall={StatusChange} />
          </div>
        );
      },
      header: () => <span>Status</span>,
    }),
    columnHelper.accessor((row) => row, {
      id: "action",
      cell: (info) => {
        const value = info.getValue();

        return (
          <div className="flex justify-center items-center ">
            <div>
              <img
                src={edit}
                alt="Edit"
                className="cursor-pointer"
                onClick={() => handleEditClick(value)}
              />
            </div>
          </div>
        );
      },
      header: () => <span>Edit</span>,
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

  const handleSearch = (e: any) => {
    setSearchString(e.target.value);
  };

  return (
    <div className="relative xl:ml-[20px] pr-3">
      <div className="mt-6">
        {/* <UmTabs /> */}
      </div>
      <div>
        <div className="mt-5 mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3  ">
          <div className="flex-grow mt-[11px] mb-[35px] flex items-center  flex-wrap gap-4">
            <InputFields
              height="45px"
              width="500px"
              padding="10px"
              placeholder="Search by Name/Role"
              onChange={handleSearch}
            />
          </div>
          <div className="flex-grow">
            <SelectButtonTask
              setOption={handleSetOption2}
              options={options}
              selectedOption={selectedOption2}
              placeholder="Role"
              mdWidth="w-full"
              borderColor="#E7F0FF"
            />
          </div>
          <div className="flex-grow mt-2">
            <button className="w-full h-[52px] border-2 rounded-md  px-2 lg:px-[16px] flex justify-center items-center bg-[#1C468E] cursor-pointer">
              <img src={searchButton} alt="Search Button" className="mr-1" />
              <span className="text-sm md:text-base font-normal text-white lg:text-[16px]">
                Search
              </span>
            </button>
          </div>
          <div className="flex-grow mt-2">
            <button
              onClick={handleAddUserClick}
              className="w-full h-[52px] border-2 rounded-md  px-1 lg:px-[16px] border-[#1C468E] flex justify-center items-center bg-white cursor-pointer"
            >
              <img src={addCircle} alt="Add Role Icon" className="mr-1" />
              <span className="text-sm md:text-base font-normal text-[#1C468E] lg:text-[16px]">
                Add User
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="h-screen md:h-auto sm:h-auto overflow-x-hidden overflow-y-auto">
        <div className="max-w-full overflow-x-auto">
          {users?.length > 0 && <ReactTable defaultData={users} columns={columns} />}
        </div>
        <div className="mt-10">
          <CustomPagination
            currentPage={page}
            setCurrentPage={setPage}
            totalItems={totalPages}
            itemsPerPage={pageSize}
            maxPageNumbersToShow={5}
          />
        </div>
      </div>
    </div>
  );
};

export default UserCreation;
