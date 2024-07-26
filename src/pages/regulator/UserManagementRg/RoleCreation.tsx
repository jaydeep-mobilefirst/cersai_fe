import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import addCircle from "../../../assets/images/add-circleb.svg";
import searchButton from "../../../assets/images/search-normal.svg";
import ReactTable from "../../../components/userFlow/common/ReactTable";
import SelectButtonTask from "../../../components/UserManagement/SelectButtonManagement";
import CustomPagination from "../../../components/CustomPagination/CustomPagination";
import ToggleSwitch from "../../../components/UserManagement/ToggleSwitch";
import UmTabs from "../../../components/UserManagement/UmTabs";
import AddRolePopup from "../../../components/UserManagement/AddRolePopup";
import EditRolePopup from "../../../components/UserManagement/EditRolePopup"; // Import the EditRolePopup
import useFetchFunctionalityForUAM from "../../../custom hooks/useFetchFunctionalityForUAM";
import useFetchRoles from "../../../custom hooks/fetchRoles";
import ActionButton from "../../../components/buttons/ActionButton";
import axios from "axios";
import { bffUrl } from "../../../utils/api";
import uamStore from "../../../store/uamStore";
import InputFields from "../../../components/ScehmaManagement/InputField";

type TableType = {
  id: string;
  compositeRoleName: string;
  status: string;
  isActive: boolean;
};

const columnHelper = createColumnHelper<TableType>();

const RoleCreation = () => {
  const entityId = sessionStorage.getItem('entityUniqueId') ?? ''
  const { uamFunctionalities } = useFetchFunctionalityForUAM('RG');
  const { handleRefreshUAM } = uamStore((state => state))
  const { loading, roles, page, pageSize, setFunctionalitySearch, setPage, setSearchString, totalPages } = useFetchRoles(entityId);
  const [isAddRolePopupOpen, setIsAddRolePopupOpen] = useState(false);
  const [isEditRolePopupOpen, setIsEditRolePopupOpen] = useState(false);
  const [editRoleData, setEditRoleData] = useState<TableType | null>(null);


  // States for Edit
  const [roleName, setRoleName] = useState<string | undefined>(undefined);
  const [isActive, setIsActive] = useState();
  const [roleEditId, setRoleEditId] = useState<number | undefined>();
  const [selectedFuncs, setSelectedFuncs] = useState<any[]>([]);

  const handleAddRoleClick = () => {
    setIsAddRolePopupOpen(true);
  };

  const handleEditRoleClick = (role: TableType) => {
    setEditRoleData(role);
    setIsEditRolePopupOpen(true);
  };


  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.renderValue(),
      header: () => <span>Sr. No.</span>,
    }),

    columnHelper.accessor("compositeRoleName", {
      cell: (info) => info.renderValue(),
      header: () => <span>Name of the Role</span>,
    }),
    columnHelper.accessor("isActive", {
      header: () => <span>Status</span>,
      cell: (info: any) => {
        const value = info?.row?.original?.isActive;
        const id = info?.row?.original?.id;
        const StatusChange = () => {
          axios
            .patch(`${bffUrl}/role/status/`, {
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
    }),
    {
      accessorFn: (row: any) => row,
      id: "edit",
      cell: (info: any) => {
        const handleOnEdit = (event: any) => {
          const data = info.cell.row.original;
          setIsActive(data.isActive);
          setRoleName(data?.compositeRoleName);
          setRoleEditId(data?.id);
          const selectedFuncs = uamFunctionalities.filter(
            (f) => data?.functionalities?.includes(f.roleName) === true
          );
          setSelectedFuncs(selectedFuncs);
          setIsEditRolePopupOpen(true);
        };
        return (
          <>
            <ActionButton variant="edit" onClick={handleOnEdit} />
          </>
        );
      },
      header: () => <span>Action</span>,
    },
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
        <div className="mt-5 mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
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
              setOption={handleSetOption1}
              options={uamFunctionalities}
              selectedOption={selectedOption1}
              placeholder="Functionality"
              bgColor="#FFFFFF"
              borderColor="#E7F0FF" // Custom border color
              mdWidth="w-full"
            />
          </div>
          <div className="flex-grow mt-2">
            <button className="w-full h-[52px] border-2 rounded-md px-2 lg:px-[16px] flex justify-center items-center bg-[#1C468E] cursor-pointer">
              <img src={searchButton} alt="Search Button" className="mr-1" />
              <span className="text-sm md:text-base font-normal text-white lg:text-[16px]">
                Search
              </span>
            </button>
          </div>
          <div className="flex-grow mt-2 space-x-4">
            <button
              onClick={handleAddRoleClick}
              className="w-full h-[52px] border-2 rounded-md px-1 lg:px-[16px] border-[#1C468E] flex justify-center items-center bg-white cursor-pointer"
            >
              <img src={addCircle} alt="Add Role Icon" className="mr-1" />
              <span className="text-sm md:text-base font-normal text-[#1C468E] lg:text-[16px]">
                Add Role
              </span>
            </button>
          </div>
        </div>
        {/* {isAddRolePopupOpen && (
          <AddRolePopup onClose={() => setIsAddRolePopupOpen(false)} />
        )} */}
        {isEditRolePopupOpen && editRoleData && (
          <EditRolePopup
            roleData={editRoleData}
            onClose={() => setIsEditRolePopupOpen(false)}
          />
        )}
      </div>

      <div className="h-screen md:h-auto sm:h-auto overflow-x-hidden overflow-y-auto">
        <div className="max-w-full overflow-x-auto">
          {roles?.length > 0 && <ReactTable defaultData={roles} columns={columns} />}
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

export default RoleCreation;
