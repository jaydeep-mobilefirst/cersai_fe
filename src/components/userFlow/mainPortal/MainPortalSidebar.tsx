// import { useEffect, useState } from "react";
// import { portalSideBarList } from "../../../utils/hardText/portalText";
// import { Link, useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import ArrowClose from "../../../assets/images/arrowclose.svg";
// import Logo from "../../../assets/images/logo2.svg";

// import Header from "./Header";
// type Props = {
//   layout: React.ReactElement | null;
// };

// const MainPortalSidebar = ({ layout }: Props) => {
//   const [mSidebar, setMsidebar] = useState<boolean>(false);
//   const [url, setUrl] = useState<String>("");
//   const [activeTab, setActiveTab] = useState<string>("dashboard");
//   console.log(activeTab, "owais");

//   console.log(url, "url");

//   const location = useLocation();
//   const { pathname } = location;
//   console.log(pathname, "pathname");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const cmsPath = pathname.split("/")[1];
//     // Extracting the first part after the domain
//     // console.log(cmsPath, "dashboard cms path");
//     setUrl("/" + cmsPath);
//   }, [pathname, url, activeTab]);

//   const sidebarOnclick = () => {
//     setMsidebar(!mSidebar);
//   };

//   const goBackRoute = () => {
//     navigate(-1);
//   };

//   const handleTabClick = (tabName: string) => {
//     setActiveTab(tabName);
//   };

//   return (
//     <>
//       <button
//         data-drawer-target="default-sidebar"
//         data-drawer-toggle="default-sidebar"
//         aria-controls="default-sidebar"
//         type="button"
//         onClick={sidebarOnclick}
//         className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//       >
//         <span className="sr-only">Open sidebar</span>
//         <svg
//           className="w-6 h-6"
//           aria-hidden="true"
//           fill="currentColor"
//           viewBox="0 0 20 20"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             clipRule="evenodd"
//             fillRule="evenodd"
//             d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
//           ></path>
//         </svg>
//       </button>

//       <aside
//         id="default-sidebar"
//         className={`fixed top-0 left-0 z-40 w-[322px] h-screen transition-transform ${
//           mSidebar ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
//         } `}
//         aria-label="Sidebar"
//       >
//         <div className="h-full overflow-y-auto bg-[#EEF7EB] w-[225px] md:w-[322px]">
//           <ul className="">
//             <li className="border-b border-[#E6E6E6] p-4">
//               <img src={Logo} alt="logo" className="max-h-[52px]" />
//               <div
//                 className="absolute right-20 md:-right-4 top-16 p-2"
//                 onClick={goBackRoute}
//               >
//                 <img
//                   src={ArrowClose}
//                   alt="closearroe"
//                   className="bg-[#EEF7EB] rounded-full cursor-pointer"
//                 />
//               </div>
//             </li>
//             {portalSideBarList?.map((data, idx) => {
//               console.log(data.url, url, "data portalsidebar");
//               return (
//                 <li className="px-4 py-2" key={idx}>
//                   <Link to={data?.rurl}>
//                     <div
//                       onClick={(e) => handleTabClick(data?.url)}
//                       className={`w-[190px] md:w-[290px] h-auto md:h-14 ${
//                         activeTab === data?.url
//                           ? "bg-[#385723]"
//                           : "bg-[#EEF7EB]"
//                       }  rounded-lg flex items-center justify-start cursor-pointer`}
//                     >
//                       <div className="m-4 h-[24px] w-[24px]">
//                         <img
//                           src={
//                             activeTab === data?.url
//                               ? data?.selectlogo
//                               : data?.logo
//                           }
//                           alt="logo"
//                           className="object-fit"
//                         />
//                       </div>

//                       <div
//                         className={`${
//                           activeTab === data?.url
//                             ? "text-white"
//                             : "text-[#666666]"
//                         }  text-base font-normal text-gilroy-medium leading-normal`}
//                       >
//                         {data?.title}
//                       </div>
//                     </div>
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       </aside>
//       <div className="sm:ml-[322px]">
//         <div>
//           <Header />
//         </div>
//         <div className="overflow-x-hidden">{layout}</div>
//       </div>
//     </>
//   );
// };

// import { useEffect, useState } from "react";
// import { portalSideBarList } from "../../../utils/hardText/portalText";
// import { Link, useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import ArrowClose from "../../../assets/images/arrowclose.svg";
// import Logo from "../../../assets/images/logo2.svg";

// import Header from "./Header";

// type Props = {
//   layout: React.ReactElement | null;
// };

// const MainPortalSidebar = ({ layout }: Props) => {
//   const [mSidebar, setMsidebar] = useState<boolean>(false);
//   const [url, setUrl] = useState<string>("");
//   const [activeTab, setActiveTab] = useState<string>(() => {
//     return localStorage.getItem("activeTab") || "dashboard";
//   });

//   const location = useLocation();
//   const { pathname } = location;
//   const navigate = useNavigate();

//   useEffect(() => {
//     const cmsPath = pathname.split("/")[1];
//     setUrl("/" + cmsPath);
//   }, [pathname]);

//   const sidebarOnclick = () => {
//     setMsidebar(!mSidebar);
//   };

//   const CollapseSidebar = () => {};

//   const handleTabClick = (tabName: string) => {
//     setActiveTab(tabName);
//     localStorage.setItem("activeTab", tabName);
//   };

//   return (
//     <>
//       <button
//         data-drawer-target="default-sidebar"
//         data-drawer-toggle="default-sidebar"
//         aria-controls="default-sidebar"
//         type="button"
//         onClick={sidebarOnclick}
//         className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//       >
//         <span className="sr-only">Open sidebar</span>
//         <svg
//           className="w-6 h-6"
//           aria-hidden="true"
//           fill="currentColor"
//           viewBox="0 0 20 20"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             clipRule="evenodd"
//             fillRule="evenodd"
//             d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
//           ></path>
//         </svg>
//       </button>

//       <aside
//         id="default-sidebar"
//         className={`fixed top-0 left-0 z-40 w-[322px] h-screen transition-transform ${
//           mSidebar ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
//         } `}
//         aria-label="Sidebar"
//       >
//         <div className="h-full overflow-y-auto bg-[#EEF7EB] w-[225px] md:w-[322px]">
//           <ul className="">
//             <li className="border-b border-[#E6E6E6] p-4">
//               <img src={Logo} alt="logo" className="max-h-[52px]" />

//               <div
//                 className="absolute right-20 md:-right-4 top-16 p-2"
//                 onClick={CollapseSidebar}
//               >
//                 <img
//                   src={ArrowClose}
//                   alt="closearroe"
//                   className="bg-[#EEF7EB] rounded-full cursor-pointer"
//                 />
//               </div>
//             </li>
//             {portalSideBarList?.map((data, idx) => {
//               console.log(data.url, url, "data portalsidebar");
//               return (
//                 <li className="px-4 py-2" key={idx}>
//                   <Link to={data.url}>
//                     <div
//                       onClick={(e) => handleTabClick(data.url)}
//                       className={`w-[190px] md:w-[290px] h-auto md:h-14 ${
//                         activeTab === data.url ? "bg-[#385723]" : "bg-[#EEF7EB]"
//                       }  rounded-lg flex items-center justify-start cursor-pointer`}
//                     >
//                       <div className="m-4 h-[24px] w-[24px]">
//                         <img
//                           src={
//                             activeTab === data.url ? data.selectlogo : data.logo
//                           }
//                           alt="logo"
//                           className="object-fit"
//                         />
//                       </div>

//                       <div
//                         className={`${
//                           activeTab === data.url
//                             ? "text-white"
//                             : "text-[#666666]"
//                         }  text-base font-normal text-gilroy-medium leading-normal`}
//                       >
//                         {data.title}
//                       </div>
//                     </div>
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       </aside>
//       <div className="sm:ml-[322px]">
//         <div>
//           <Header />
//         </div>
//         <div className="overflow-x-hidden">{layout}</div>
//       </div>
//     </>
//   );
// };

// export default MainPortalSidebar;
import { useEffect } from "react";
import { portalSideBarList } from "../../../utils/hardText/portalText";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ArrowClose from "../../../assets/images/arrowclose.svg";
import Logo from "../../../assets/images/logo2.svg";
import ArrowRight from "../../../assets/images/arrow-left.svg";

import Header from "./Header";
import useSidebarStore from "../../../store/SidebarStore";

type Props = {
  layout: React.ReactElement | null;
};

const MainPortalSidebar = ({ layout }: Props) => {
  const {
    mSidebar,
    collapsed,
    url,
    activeTab,
    toggleSidebar,
    toggleCollapse,
    setUrl,
    setActiveTab,
  } = useSidebarStore();
  const location = useLocation();

  const { pathname } = location;
  const navigate = useNavigate();

  useEffect(() => {
    const cmsPath = location.pathname.split("/")[1];
    setUrl("/" + cmsPath);
  }, [location.pathname]);

  const handleTabClick = (url: string, title: string) => {
    setActiveTab(url);
    localStorage.setItem("current_tab", title);
  };

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        onClick={toggleSidebar}
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 transition-transform ${
          mSidebar ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        } ${collapsed ? "w-[100px]" : "w-[322px]"} h-screen`}
        aria-label="Sidebar"
      >
        <div
          className={`h-full overflow-y-auto bg-[#EEF7EB] ${
            collapsed ? "w-[75px]" : "w-[322px]"
          }`}
        >
          <ul className="">
            <li className="border-b border-[#E6E6E6] p-4">
              <img src={Logo} alt="logo" className="max-h-[52px]" />

              <div
                className={`absolute right-20 ${
                  collapsed ? "md:-right-[-0.1rem]" : "md:-right-4"
                }  ${collapsed ? "top-14" : "top-16"} p-2`}
                onClick={toggleCollapse}
              >
                <img
                  src={collapsed ? ArrowRight : ArrowClose}
                  alt="collapsed"
                  className="bg-[#EEF7EB] rounded-full cursor-pointer"
                />
              </div>
            </li>
            {portalSideBarList?.map((data, idx) => {
              return (
                <li
                  className={`${collapsed ? "px-2 py-1" : "px-4 py-2"}`}
                  key={idx}
                >
                  <Link to={data.url}>
                    <div
                      onClick={(e) => handleTabClick(data.url, data.title)}
                      className={`w-auto h-auto md:h-14 ${
                        activeTab === data.url ? "bg-[#1C468E]" : "bg-[#EEF7EB]"
                      } rounded-lg flex items-center  cursor-pointer`}
                    >
                      <div className="m-4 h-[24px] w-[24px]">
                        <img
                          src={
                            activeTab === data.url ? data.selectlogo : data.logo
                          }
                          alt="logo"
                          className="object-fit"
                        />
                      </div>
                      {!collapsed && (
                        <div
                          className={`${
                            activeTab === data.url
                              ? "text-white"
                              : "text-[#666666]"
                          } text-base font-normal text-gilroy-medium leading-normal`}
                        >
                          {data.title}
                        </div>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
      <div className={` ${collapsed ? "sm:ml-[75px]" : "sm:ml-[322px]"} `}>
        <div>
          <Header />
        </div>
        <div className="overflow-x-hidden">{layout}</div>
      </div>
    </>
  );
};

export default MainPortalSidebar;
