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
import axios from "axios";
import { bffUrl } from "../../../utils/api";
import InputFields from "../../../components/ScehmaManagement/InputField";
import useFetchRoles from "../../../custom hooks/fetchRoles";
import SendActivationLink from "../../../components/userFlow/common/SendActivationLink";

type TableType = {
  sno: number;
  id: string;
  Name: string;
  role: string;
  isActive: boolean;
};

interface Props {
  entityType : 'DT' | 'DC' | "RG" | 'CA'
}

const columnHelper = createColumnHelper<TableType>();

const UserCreation : React.FC<Props>=  ({entityType} : Props)  => {
  const entityId = sessionStorage.getItem('entityUniqueId') ?? ''
  const { handleRefreshUAM } = uamStore((state => state))
  const { loading, users, page, pageSize, setFunctionalitySearch, setPage, setSearchString, total, totalPages, handleSearch } = useFetchUsers(entityId);
  const { roles } = useFetchRoles(entityId, 100);

  let customRoles = roles?.map((r) => ({label : r?.compositeRoleName, value : r?.compositeRoleName, id : r?.id}))
  sessionStorage.setItem("customRoles", JSON.stringify(customRoles))
  sessionStorage.setItem('entityType', entityType);

  const navigate = useNavigate();

  const handleAddUserClick = () => {
    sessionStorage.setItem('operation', 'add')
    navigate(`/${entityType.toLocaleLowerCase()}/usermanagement/usermaster`);
  };


  const handleEditClick = (data: any) => {
    sessionStorage.setItem('operation', 'edit')
    sessionStorage.setItem('editUserData', JSON.stringify(data))
    navigate(`/${entityType.toLowerCase()}/usermanagement/usermaster`);
    // alert('Edit is in progress')
  };

  let count: number;
  const serialNoGen = (page: number) => {
    count = (page - 1) * 10;
  }
  serialNoGen(page)

  const columns = [
    columnHelper.accessor("sno", {
      cell: () => {
        while (count <= total)
          {
            count++;
            return count;
          }
      },
      header: () => <span>Sr. No.</span>,
    }),

    columnHelper.accessor((row) => row, {
      id: "name",
      cell: (info) => {
        const value: any = info.getValue();
        console.log({ value });
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
          axios
            .patch(`${bffUrl}/user/status/`, {
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
      id: "link",
      cell: (info) => {
        const value : any = info.getValue();
        return (
          <div className="flex justify-center">
          {value?.emailId && <SendActivationLink email={value?.emailId}/>}
          </div>
        );
      },
      header: () => <span>Send Invite Link</span>,
    }),
    columnHelper.accessor((row) => row, {
      id: "action",
      cell: (info) => {
        const value : any = info.getValue();
        console.log("Value -----------", {value});
        return (
          <div className="flex justify-center items-center flex-row w-full">
            <div>
              <img
                src={edit}
                title="Edit User"
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

  const [selectedOption2, setSelectedOption2] = useState<string | null>(null);

  const handleSetOption2 = (value: any) => {
    setSelectedOption2(value?.label);
    setFunctionalitySearch(value?.value)
  };


  const onSearchStringChange = (e: any) => {
    setSearchString(e.target.value);
  };

  return (
    <div className="relative xl:ml-[20px] pr-3">
      <div className="mt-6">
        <UmTabs entityType={entityType}/>
      </div>
      <div>
        <div className="mt-5 mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3  ">
          <div className="flex-grow mt-[11px] mb-[35px] flex items-center flex-wrap gap-4">
            <InputFields
              height="45px"
              width="500px"
              padding="10px"
              placeholder="Search by Name/Role"
              onChange={onSearchStringChange}
            />
          </div>
          <div className="flex-grow">
            <SelectButtonTask
              setOption={handleSetOption2}
              options={[{label : "All", value : ""},...customRoles]}
              selectedOption={selectedOption2}
              placeholder="Role"
              mdWidth="w-full"
              borderColor="#E7F0FF"
            />
          </div>
          <div className="flex-grow mt-2">
            <button 
            onClick={handleSearch}
            className="w-full h-[52px] border-2 rounded-md  px-2 lg:px-[16px] flex justify-center items-center bg-[#1C468E] cursor-pointer">
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
          {users?.length > 0 ? <ReactTable defaultData={users} columns={columns} /> : <div className="text-center w-full">No Data Available</div>}
        </div>
        <div className="mt-10">
          {users?.length > 0 && <CustomPagination
            currentPage={page}
            setCurrentPage={setPage}
            totalItems={totalPages}
            itemsPerPage={pageSize}
            maxPageNumbersToShow={5}
          />}
        </div>
      </div>
    </div>
  );
};

export default UserCreation;
