// import React, { useState } from "react";
// import { createColumnHelper } from "@tanstack/react-table";
// import addCircle from "../../../assets/images/add-circleb.svg";
// import { Link } from "react-router-dom";
// import searchButton from "../../../assets/images/search-normal.svg";
// //import ReactTable from "../../../components/userFlow/common/ReactTable";
// // import ReactTable from "../../components/userFlow/common/ReactTable";
// import ReactTable from "../../../components/userFlow/common/ReactTable";
// // import SelectButtonTask from "../../../components/UserManagement/SelectButtonManagement";
// import SelectButtonTask from "../../../components/UserManagement/SelectButtonManagement";
// // import CustomPagination from "../../../components/CustomPagination/CustomPagination";
// import CustomPagination from "../../../components/CustomPagination/CustomPagination";
// // import ToggleSwitch from "../../../components/UserManagement/ToggleSwitch";
// import ToggleSwitch from "../../../components/UserManagement/ToggleSwitch";
// // import UmTabs from "../../../components/UserManagement/UmTabs";
// import UmTabs from "../../../components/UserManagement/UmTabs";
// // import edit from "../../assets/images/add.svg";
// import edit from "../../../assets/images/bedit.svg";

// import { useNavigate } from "react-router-dom";
// type TableType = {
//   sno: string;
//   depositTakerName: string;
//   depositTakerId: string;
//   status: string;
//   action: boolean;
// };

// const columnHelper = createColumnHelper<TableType>();

// const UserCreation = () => {
//   const navigate = useNavigate();

//   const handleAddUserClick = () => {
//     navigate("/dt/usermanagement/usermasterum");
//   };

//   const defaultData: TableType[] = [
//     {
//       sno: "01",
//       depositTakerName: "Lorem ipsum dolor sit amet",
//       depositTakerId: "Lorem ipsum dolor",
//       status: "Active",
//       action: false,
//     },
//     {
//       sno: "02",
//       depositTakerName: "Lorem ipsum dolor sit amet",
//       depositTakerId: "Lorem ipsum dolor",
//       status: "pending",
//       action: true,
//     },
//     {
//       sno: "03",
//       depositTakerName: "Lorem ipsum dolor sit amet",
//       depositTakerId: "Lorem ipsum dolor",
//       status: "pending",
//       action: true,
//     },
//     {
//       sno: "04",
//       depositTakerName: "Lorem ipsum dolor sit amet",
//       depositTakerId: "Lorem ipsum dolor",
//       status: "pending",
//       action: false,
//     },
//     {
//       sno: "05",
//       depositTakerName: "Lorem ipsum dolor sit amet",
//       depositTakerId: "Lorem ipsum dolor",
//       status: "pending",
//       action: true,
//     },
//     {
//       sno: "06",
//       depositTakerName: "Lorem ipsum dolor sit amet",
//       depositTakerId: "Lorem ipsum dolor",
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
//       header: () => <span>User Name</span>,
//     }),
//     columnHelper.accessor("depositTakerId", {
//       cell: (info) => info.renderValue(),
//       header: () => <span>Role</span>,
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
//             <Link to={"/dt/usermanagement/usermasterum"}>
//               <div>
//                 <img src={edit} alt="Edit " className="cursor-pointer" />
//               </div>
//             </Link>
//           </div>
//         );
//       },
//       header: () => <span>Edit</span>,
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
//               placeholder="Name"
//               mdWidth="w-full"
//               borderColor="#E7F0FF"
//             />
//           </div>
//           <div className="flex-grow">
//             <SelectButtonTask
//               setOption={handleSetOption2}
//               options={options}
//               selectedOption={selectedOption2}
//               placeholder="Role"
//               mdWidth="w-full"
//               borderColor="#E7F0FF"
//             />
//           </div>
//           <div className="flex-grow">
//             <SelectButtonTask
//               setOption={handleSetOption3}
//               options={options}
//               selectedOption={selectedOption3}
//               placeholder="Functionaly"
//               mdWidth="w-full"
//               borderColor="#E7F0FF"
//             />
//           </div>
//           <div className="flex-grow mt-2">
//             <button className="w-full h-[52px] border-2 rounded-md  px-2 lg:px-[16px] flex justify-center items-center bg-[#1C468E] cursor-pointer">
//               <img src={searchButton} alt="Search Button" className="mr-1" />
//               <span className="text-sm md:text-base font-normal text-white lg:text-[16px]">
//                 Search
//               </span>
//             </button>
//           </div>
//           <div className="flex-grow mt-2">
//             <button
//               onClick={handleAddUserClick}
//               className="w-full h-[52px] border-2 rounded-md  px-1 lg:px-[16px] border-[#1C468E] flex justify-center items-center bg-white cursor-pointer"
//             >
//               <img src={addCircle} alt="Add Role Icon" className="mr-1" />
//               <span className="text-sm md:text-base font-normal text-[#1C468E] lg:text-[16px]">
//                 Add User
//               </span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* <div className="h-screen md:h-auto sm:h-auto overflow-x-hidden overflow-y-auto">
//   <div className="max-w-full overflow-x-auto">
//     <ReactTable defaultData={defaultData} columns={columns} />
//   </div>
//   <div className="mt-10">
//     <CustomPagination
//       totalItems={defaultData.length}
//       itemsPerPage={5}
//       maxPageNumbersToShow={5}
//     />
//   </div>
// </div> */}
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

// export default UserCreation;

import React, { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import addCircle from "../../../assets/images/add-circleb.svg";
import searchButton from "../../../assets/images/search-normal.svg";
import ReactTable from "../../../components/userFlow/common/ReactTable";
import SelectButtonTask from "../../../components/UserManagement/SelectButtonManagement";
import CustomPagination from "../../../components/CustomPagination/CustomPagination";
import ToggleSwitch from "../../../components/UserManagement/ToggleSwitch";
import UmTabs from "../../../components/UserManagement/UmTabs";
import edit from "../../../assets/images/bedit.svg";
import EditRolePopup from "../../../components/UserManagement/EditUserPopup"; // Import the EditRolePopup
import { useNavigate } from "react-router-dom";

type TableType = {
  sno: string;
  depositTakerName: string;
  depositTakerId: string;
  status: string;
  action: boolean;
};

const columnHelper = createColumnHelper<TableType>();

const UserCreation = () => {
  const navigate = useNavigate();

  const handleAddUserClick = () => {
    navigate("/ca/usermanagment/usermaster");
  };

  const defaultData: TableType[] = [
    {
      sno: "01",
      depositTakerName: "Lorem ipsum dolor sit amet",
      depositTakerId: "Lorem ipsum dolor",
      status: "Active",
      action: false,
    },
    {
      sno: "02",
      depositTakerName: "Lorem ipsum dolor sit amet",
      depositTakerId: "Lorem ipsum dolor",
      status: "pending",
      action: true,
    },
    {
      sno: "03",
      depositTakerName: "Lorem ipsum dolor sit amet",
      depositTakerId: "Lorem ipsum dolor",
      status: "pending",
      action: true,
    },
    {
      sno: "04",
      depositTakerName: "Lorem ipsum dolor sit amet",
      depositTakerId: "Lorem ipsum dolor",
      status: "pending",
      action: false,
    },
    {
      sno: "05",
      depositTakerName: "Lorem ipsum dolor sit amet",
      depositTakerId: "Lorem ipsum dolor",
      status: "pending",
      action: true,
    },
    {
      sno: "06",
      depositTakerName: "Lorem ipsum dolor sit amet",
      depositTakerId: "Lorem ipsum dolor",
      status: "pending",
      action: false,
    },
  ];

  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<TableType | null>(null);

  const handleEditClick = (user: TableType) => {
    setSelectedUser(user);
    setEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setEditPopupOpen(false);
    setSelectedUser(null);
  };

  const columns = [
    columnHelper.accessor("sno", {
      cell: (info) => info.renderValue(),
      header: () => <span>S.No.</span>,
    }),

    columnHelper.accessor("depositTakerName", {
      cell: (info) => info.renderValue(),
      header: () => <span>User Name</span>,
    }),
    columnHelper.accessor("depositTakerId", {
      cell: (info) => info.renderValue(),
      header: () => <span>Role</span>,
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

  return (
    <div className="relative xl:ml-[40px] pr-3">
      <div className="mt-6">
        <UmTabs />
      </div>
      <div>
        <div className="mt-5 mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3  ">
          <div className="flex-grow">
            <SelectButtonTask
              setOption={handleSetOption1}
              options={options}
              selectedOption={selectedOption1}
              placeholder="Name"
              mdWidth="w-full"
              borderColor="#E7F0FF"
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
          <div className="flex-grow">
            <SelectButtonTask
              setOption={handleSetOption3}
              options={options}
              selectedOption={selectedOption3}
              placeholder="Functionaly"
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

      {isEditPopupOpen && selectedUser && (
        <EditRolePopup user={selectedUser} onClose={closeEditPopup} />
      )}
    </div>
  );
};

export default UserCreation;
