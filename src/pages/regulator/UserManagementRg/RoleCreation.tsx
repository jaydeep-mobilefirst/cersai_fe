// import React, { useState } from "react";
// import { createColumnHelper } from "@tanstack/react-table";
// import addCircle from "../../../assets/images/add-circleb.svg";
// import searchButton from "../../../assets/images/search-normal.svg";
// import ReactTable from "../../../components/userFlow/common/ReactTable";
// import SelectButtonTask from "../../../components/userFlow/regulatorCourt/SelectButtonManagement";
// import CustomPagination from "../../../components/CustomPagination/CustomPagination";
// import ToggleSwitch from "../../../components/userFlow/regulatorCourt/ToggleSwitch";
// import UmTabs from "../../../components/userFlow/regulatorCourt/UmTabs";
// import edit from "../../../assets/images/bedit.svg";
// import AddRolePopup from "../../../components/userFlow/regulatorCourt/AddRolePopup";
// type TableType = {
//   sno: string;
//   depositTakerName: string;
//   status: string;
//   action: boolean;
// };

// const columnHelper = createColumnHelper<TableType>();

// const RoleCreation = () => {
//   const [isAddRolePopupOpen, setIsAddRolePopupOpen] = useState(false);

//   const handleAddRoleClick = () => {
//     setIsAddRolePopupOpen(true);
//   };

//   const defaultData: TableType[] = [
//     {
//       sno: "01",
//       depositTakerName: "Lorem ipsum dolor sit amet",
//       status: "Active",
//       action: false,
//     },
//     {
//       sno: "02",
//       depositTakerName: "Lorem ipsum dolor sit amet",
//       status: "pending",
//       action: true,
//     },
//     {
//       sno: "03",
//       depositTakerName: "Lorem ipsum dolor sit amet",
//       status: "pending",
//       action: true,
//     },
//     {
//       sno: "04",
//       depositTakerName: "Lorem ipsum dolor sit amet",
//       status: "pending",
//       action: false,
//     },
//     {
//       sno: "05",
//       depositTakerName: "Lorem ipsum dolor sit amet",
//       status: "pending",
//       action: true,
//     },
//     {
//       sno: "06",
//       depositTakerName: "Lorem ipsum dolor sit amet",
//       status: "pending",
//       action: false,
//     },
//   ];

//   const columns = [
//     columnHelper.accessor("sno", {
//       cell: (info) => info.renderValue(),
//       header: () => <span>S.No.</span>,
//     }),

//     columnHelper.accessor("depositTakerName", {
//       cell: (info) => info.renderValue(),
//       header: () => <span>Name of the Role</span>,
//     }),
//     columnHelper.accessor("status", {
//       cell: (info) => {
//         const value = info?.row?.original?.action;

//         return (
//           <div
//             className="flex flex-col md:flex-row justify-center gap-3"
//             key={Math.random()}
//           >
//             <span> {value ? "Active" : "In-Active"}</span>
//             <ToggleSwitch enabled={value} />
//           </div>
//         );
//       },
//       header: () => <span>Status</span>,
//     }),
//     columnHelper.accessor((row) => row, {
//       id: "action",
//       cell: (info) => {
//         const value = info.getValue();

//         return (
//           <div className="flex justify-center items-center ">
//             <div>
//               <img src={edit} alt="Edit " className="cursor-pointer" />
//             </div>
//           </div>
//         );
//       },
//       header: () => <span>Action</span>,
//     }),
//   ];
//   const options = [
//     { value: "pdf", label: "PDF" },
//     { value: "docx", label: "DOCX" },
//     { value: "image", label: "Image" },
//   ];

//   const [selectedOption1, setSelectedOption1] = useState<string | null>(null);

//   const [selectedOption2, setSelectedOption2] = useState<string | null>(null);

//   const [selectedOption3, setSelectedOption3] = useState<string | null>(null);

//   const handleSetOption1 = (value: string) => {
//     setSelectedOption1(value);
//   };

//   const handleSetOption2 = (value: string) => {
//     setSelectedOption2(value);
//   };

//   const handleSetOption3 = (value: string) => {
//     setSelectedOption3(value);
//   };

//   return (
//     <div className="relative xl:ml-[40px] pr-3">
//       <div className="mt-6">
//         <UmTabs />
//       </div>
//       <div>
//         <div className="mt-5 mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3  ">
//           <div className="flex-grow">
//             <SelectButtonTask
//               setOption={handleSetOption1}
//               options={options}
//               selectedOption={selectedOption1}
//               borderColor="#E7F0FF"
//               placeholder="Name"
//               mdWidth="w-full"
//             />
//           </div>
//           <div className="flex-grow">
//             <SelectButtonTask
//               setOption={handleSetOption1}
//               options={options}
//               selectedOption={selectedOption1}
//               placeholder="Functionality"
//               bgColor="#FFFFFF"
//               borderColor="#E7F0FF" // Custom border color
//               mdWidth="w-full"
//             />
//           </div>
//           <div className="flex-grow">
//             <SelectButtonTask
//               setOption={handleSetOption3}
//               options={options}
//               selectedOption={selectedOption3}
//               placeholder="Functionaly"
//               borderColor="#E7F0FF"
//               mdWidth="w-full"
//             />
//           </div>
//           <div className="flex-grow mt-2 ">
//             <button className="w-full  h-[52px] border-2 rounded-md  px-2 lg:px-[16px] flex justify-center items-center bg-[#1C468E] cursor-pointer">
//               <img src={searchButton} alt="Search Button" className="mr-1" />
//               <span className="text-sm md:text-base font-normal text-white lg:text-[16px]">
//                 Search
//               </span>
//             </button>
//           </div>
//           <div className="flex-grow mt-2 space-x-4">
//             <button
//               onClick={handleAddRoleClick}
//               className="w-full h-[52px] border-2 rounded-md  px-1 lg:px-[16px] border-[#1C468E] flex justify-center items-center bg-white cursor-pointer"
//             >
//               <img src={addCircle} alt="Add Role Icon" className="mr-1" />
//               <span className="text-sm md:text-base font-normal text-[#1C468E] lg:text-[16px]">
//                 Add Role
//               </span>
//             </button>
//           </div>
//         </div>
//         {isAddRolePopupOpen && (
//           <AddRolePopup onClose={() => setIsAddRolePopupOpen(false)} />
//         )}
//       </div>

//       <div className="h-screen md:h-auto sm:h-auto overflow-x-hidden overflow-y-auto">
//         <div className="max-w-full overflow-x-auto">
//           <ReactTable defaultData={defaultData} columns={columns} />
//         </div>
//         <div className="mt-10">
//           <CustomPagination
//             totalItems={defaultData.length}
//             itemsPerPage={5}
//             maxPageNumbersToShow={5}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RoleCreation;

import React, { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import addCircle from "../../../assets/images/add-circleb.svg";
import searchButton from "../../../assets/images/search-normal.svg";
import ReactTable from "../../../components/userFlow/common/ReactTable";
import SelectButtonTask from "../../../components/userFlow/regulatorCourt/SelectButtonManagement";
import CustomPagination from "../../../components/CustomPagination/CustomPagination";
import ToggleSwitch from "../../../components/userFlow/regulatorCourt/ToggleSwitch";
import UmTabs from "../../../components/userFlow/regulatorCourt/UmTabs";
import edit from "../../../assets/images/bedit.svg";
import AddRolePopup from "../../../components/userFlow/regulatorCourt/AddRolePopup";
import EditRolePopup from "../../../components/userFlow/regulatorCourt/EditRolePopup"; // Import the EditRolePopup

type TableType = {
  sno: string;
  depositTakerName: string;
  status: string;
  action: boolean;
};

const columnHelper = createColumnHelper<TableType>();

const RoleCreation = () => {
  const [isAddRolePopupOpen, setIsAddRolePopupOpen] = useState(false);
  const [isEditRolePopupOpen, setIsEditRolePopupOpen] = useState(false);
  const [editRoleData, setEditRoleData] = useState<TableType | null>(null);

  const handleAddRoleClick = () => {
    setIsAddRolePopupOpen(true);
  };

  const handleEditRoleClick = (role: TableType) => {
    setEditRoleData(role);
    setIsEditRolePopupOpen(true);
  };

  const defaultData: TableType[] = [
    {
      sno: "01",
      depositTakerName: "Lorem ipsum dolor sit amet",
      status: "Active",
      action: false,
    },
    {
      sno: "02",
      depositTakerName: "Lorem ipsum dolor sit amet",
      status: "pending",
      action: true,
    },
    {
      sno: "03",
      depositTakerName: "Lorem ipsum dolor sit amet",
      status: "pending",
      action: true,
    },
    {
      sno: "04",
      depositTakerName: "Lorem ipsum dolor sit amet",
      status: "pending",
      action: false,
    },
    {
      sno: "05",
      depositTakerName: "Lorem ipsum dolor sit amet",
      status: "pending",
      action: true,
    },
    {
      sno: "06",
      depositTakerName: "Lorem ipsum dolor sit amet",
      status: "pending",
      action: false,
    },
  ];

  const columns = [
    columnHelper.accessor("sno", {
      cell: (info) => info.renderValue(),
      header: () => <span>S.No.</span>,
    }),

    columnHelper.accessor("depositTakerName", {
      cell: (info) => info.renderValue(),
      header: () => <span>Name of the Role</span>,
    }),
    columnHelper.accessor("status", {
      cell: (info) => {
        const value = info?.row?.original?.action;

        return (
          <div
            className="flex flex-col md:flex-row justify-center gap-3"
            key={Math.random()}
          >
            <span> {value ? "Active" : "In-Active"}</span>
            <ToggleSwitch enabled={value} />
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
          <div className="flex justify-center items-center">
            <div onClick={() => handleEditRoleClick(value)}>
              <img src={edit} alt="Edit" className="cursor-pointer" />
            </div>
          </div>
        );
      },
      header: () => <span>Action</span>,
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

  return (
    <div className="relative xl:ml-[20px] pr-3">
      <div className="mt-6">
        <UmTabs />
      </div>
      <div>
        <div className="mt-5 mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          <div className="flex-grow">
            <SelectButtonTask
              setOption={handleSetOption1}
              options={options}
              selectedOption={selectedOption1}
              borderColor="#E7F0FF"
              placeholder="Name"
              mdWidth="w-full"
            />
          </div>
          <div className="flex-grow">
            <SelectButtonTask
              setOption={handleSetOption1}
              options={options}
              selectedOption={selectedOption1}
              placeholder="Functionality"
              bgColor="#FFFFFF"
              borderColor="#E7F0FF" // Custom border color
              mdWidth="w-full"
            />
          </div>
          <div className="flex-grow">
            <SelectButtonTask
              setOption={handleSetOption3}
              options={options}
              selectedOption={selectedOption3}
              placeholder="Functionaly"
              borderColor="#E7F0FF"
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
        {isAddRolePopupOpen && (
          <AddRolePopup onClose={() => setIsAddRolePopupOpen(false)} />
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
          <ReactTable defaultData={defaultData} columns={columns} />
        </div>
        <div className="mt-10">
          <CustomPagination
            totalItems={defaultData.length}
            itemsPerPage={5}
            maxPageNumbersToShow={5}
          />
        </div>
      </div>
    </div>
  );
};

export default RoleCreation;
