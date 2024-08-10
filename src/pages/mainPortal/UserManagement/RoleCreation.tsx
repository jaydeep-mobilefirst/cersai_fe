import { useEffect, useState } from "react";
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
import uamStore from "../../../store/uamStore";
import InputFields from "../../../components/ScehmaManagement/InputField";
import LoaderSpin from "../../../components/LoaderSpin";
import { axiosTokenInstance } from "../../../utils/axios";
import { useDebounce } from "../../../utils/commonFunction";

type TableType = {
  sno: number;
  id: string;
  compositeRoleName: string;
  status: string;
  isActive: boolean;
};

interface Props {
  entityType: "DT" | "DC" | "RG" | "CA";
}

const columnHelper = createColumnHelper<TableType>();

const RoleCreation: React.FC<Props> = ({ entityType }: Props) => {
  const entityId = sessionStorage.getItem("entityUniqueId") ?? "";
  const { uamFunctionalities } = useFetchFunctionalityForUAM(entityType);
  const { handleRefreshUAM } = uamStore((state) => state);
  const {
    loading,
    roles,
    page,
    pageSize,
    setFunctionalitySearch,
    setPage,
    setSearchString,
    total,
    totalPages,
    searchString,
    handleSearch,
  } = useFetchRoles(entityId);
  const [isAddRolePopupOpen, setIsAddRolePopupOpen] = useState(false);
  const [isEditRolePopupOpen, setIsEditRolePopupOpen] = useState(false);
  const [editRoleData, setEditRoleData] = useState<TableType | null>(null);

  // States for Edit
  const [roleName, setRoleName] = useState<string | undefined>(undefined);
  const [isActive, setIsActive] = useState();
  const [roleEditId, setRoleEditId] = useState<number | undefined>();
  const [selectedFuncs, setSelectedFuncs] = useState<any[]>([]);
  const debouncedSearchTerm = useDebounce(searchString, 500);

  const handleAddRoleClick = (operation: "add" | "edit") => {
    if (operation === "add") {
      setIsActive(undefined);
      setRoleName(undefined);
      setRoleEditId(undefined);
      setSelectedFuncs([]);
    }
    sessionStorage.setItem("operation", operation);
    setIsAddRolePopupOpen(true);
  };

  const handleEditRoleClick = (role: TableType) => {
    setEditRoleData(role);
    setIsEditRolePopupOpen(true);
  };

  let count: number;
  const serialNoGen = (page: number) => {
    count = (page - 1) * 10;
  };
  serialNoGen(page);

  const columns = [
    columnHelper.accessor("sno", {
      cell: (info) => {
        while (count <= total) {
          count++;
          return count;
        }
      },
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
          axiosTokenInstance
            .patch(`/role/status/`, {
              id: id,
              status: !value,
            })
            .then((response: any) => {
              handleRefreshUAM();
            })
            .catch((error: any) => {});
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
          event?.preventDefault();
          const data = info.cell.row.original;
          setIsActive(data.isActive);
          setRoleName(data?.compositeRoleName);
          setRoleEditId(data?.id);
          setSelectedFuncs(
            data?.functionalities?.map((f: any) => ({
              value: f.id,
              label: f.functionality,
              roleName: f.roleName,
            }))
          );
          handleAddRoleClick("edit");
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

  const handleSetOption1 = (value: any) => {
    setSelectedOption1(value?.label);
    setFunctionalitySearch(value?.roleName);
  };
  useEffect(() => {
    if (debouncedSearchTerm.trim() === "") {
      handleSearch();
    }
  }, [debouncedSearchTerm]);

  const onSearchStringChange = (e: any) => {
    setSearchString(e.target.value);
  };

  // const onSearchStringChange = (e: any) => {
  //   const value = e.target.value;
  //   setSearchString(value);
  //   if (value?.trim() === "") {
  //     handleSearch();
  //   }
  // };

  return (
    <div className="relative xl:ml-[20px] pr-3">
      <div className="mt-6">
        <UmTabs entityType={entityType} />
      </div>
      <div>
        <div className="mt-5 mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          <div className="flex-grow mt-[11px] mb-[35px] flex items-center  flex-wrap gap-4 me-1">
            <InputFields
              height="45px"
              padding="10px"
              placeholder="Search by Name"
              onChange={onSearchStringChange}
              value={searchString}
            />
          </div>
          <div className="flex-grow">
            <SelectButtonTask
              setOption={handleSetOption1}
              options={[
                { label: "All", value: null, roleName: "" },
                ...uamFunctionalities,
              ]}
              selectedOption={selectedOption1}
              placeholder="Functionality"
              bgColor="#FFFFFF"
              borderColor="#E7F0FF" // Custom border color
              mdWidth="w-full"
            />
          </div>
          <div className="flex-grow mt-2">
            <button
              className="w-full h-[52px] border-2 rounded-md px-2 lg:px-[16px] flex justify-center items-center bg-[#1C468E] cursor-pointer"
              onClick={handleSearch}
            >
              <img src={searchButton} alt="Search Button" className="mr-1" />
              <span className="text-sm md:text-base font-normal text-white lg:text-[16px]">
                Search
              </span>
            </button>
          </div>
          <div className="flex-grow mt-2 space-x-4">
            <button
              onClick={() => handleAddRoleClick("add")}
              className="w-full h-[52px] border-2 rounded-md px-1 lg:px-[16px] border-[#1C468E] flex justify-center items-center bg-white cursor-pointer"
            >
              <img src={addCircle} alt="Add Role Icon" className="mr-1" />
              <span className="text-sm md:text-base font-normal text-[#1C468E] lg:text-[16px]">
                Add Role
              </span>
            </button>
          </div>
        </div>
        {isAddRolePopupOpen && (
          <AddRolePopup
            onClose={() => setIsAddRolePopupOpen(false)}
            functionalities={uamFunctionalities}
            isActive={isActive}
            selectedFuncs={selectedFuncs}
            roleId={roleEditId}
            roleName={roleName}
            entityType={entityType}
          />
        )}
        {isEditRolePopupOpen && editRoleData && (
          <EditRolePopup
            roleData={editRoleData}
            onClose={() => setIsEditRolePopupOpen(false)}
          />
        )}
      </div>

      <div className="h-screen md:h-auto sm:h-auto overflow-x-hidden overflow-y-auto">
        <div className="max-w-full overflow-x-auto">
          {loading ? (
            <LoaderSpin />
          ) : roles?.length > 0 ? (
            <ReactTable defaultData={roles} columns={columns} />
          ) : (
            <div className="text-center w-full">No Data Available</div>
          )}
        </div>
        <div className="mt-10">
          {roles?.length > 0 && (
            <CustomPagination
              currentPage={page}
              setCurrentPage={setPage}
              totalItems={totalPages}
              itemsPerPage={pageSize}
              maxPageNumbersToShow={5}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleCreation;
