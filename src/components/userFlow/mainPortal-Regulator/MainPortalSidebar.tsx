// import { useEffect } from "react";
// import {
//   portalSideBarList,
//   portalSideBarListRegulator,
// } from "../../../utils/hardText/portalText";
// import { Link, useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import ArrowClose from "../../../assets/images/arrowclose.svg";
// import Logo from "../../../assets/images/logo2.svg";
// import ArrowRight from "../../../assets/images/arrow-left.svg";

// import HamburgerMenu from "../../../assets/images/hamburger_icon.svg";
// import CrossIcon from "../../../assets/images/CrossIcon.svg";

// import Header from "./Header";
// import useSidebarStore from "../../../store/SidebarStore";

// type Props = {
//   layout: React.ReactElement | null;
// };

// const MainPortalSidebar = ({ layout }: Props) => {
//   const {
//     mSidebar,
//     collapsed,
//     url,
//     activeTab,
//     toggleSidebar,
//     toggleCollapse,
//     setUrl,
//     setActiveTab,
//   } = useSidebarStore();
//   const location = useLocation();

//   const { pathname } = location;
//   const navigate = useNavigate();

//   useEffect(() => {
//     const cmsPath = location.pathname.split("/")[1];
//     setUrl("/" + cmsPath);
//   }, [location.pathname]);

//   const handleTabClick = (url: string, title: string) => {
//     setActiveTab(url);
//     localStorage.setItem("current_tab", title);
//   };

//   return (
//     <>
//       <button
//         data-drawer-target="default-sidebar"
//         data-drawer-toggle="default-sidebar"
//         aria-controls="default-sidebar"
//         type="button"
//         onClick={toggleSidebar}
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
//         className={`fixed top-0 left-0 z-40 transition-transform ${
//           mSidebar ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
//         } ${collapsed ? "w-[100px]" : "w-[322px]"} h-screen`}
//         aria-label="Sidebar"
//       >
//         <div
//           className={`h-full overflow-y-auto bg-[#E7F0FF] ${
//             collapsed ? "w-[75px]" : "w-[322px]"
//           }`}
//         >
//           <ul className="">
//             <li className="border-b border-[#E6E6E6] p-4">
//               <img src={Logo} alt="logo" className="max-h-[52px]" />

//               <div
//                 className={`absolute right-20 ${
//                   collapsed ? "md:-right-[-0.1rem]" : "md:-right-4"
//                 }  ${collapsed ? "top-14" : "top-16"} p-2`}
//                 onClick={toggleCollapse}
//               >
//                 <img
//                   src={collapsed ? ArrowRight : ArrowClose}
//                   alt="collapsed"
//                   className="bg-[#E7F0FF] rounded-full cursor-pointer"
//                 />
//               </div>
//             </li>
//             {portalSideBarListRegulator?.map((data, idx) => {
//               return (
//                 <li
//                   className={`${collapsed ? "px-2 py-1" : "px-4 py-2"}`}
//                   key={idx}
//                 >
//                   <Link to={data.url}>
//                     <div
//                       onClick={(e) => handleTabClick(data.url, data.title)}
//                       className={`w-auto h-auto md:h-14 ${
//                         activeTab === data.url ? "bg-[#1C468E]" : "bg-[#E7F0FF]"
//                       } rounded-lg flex items-center  cursor-pointer`}
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
//                       {!collapsed && (
//                         <div
//                           className={`${
//                             activeTab === data.url
//                               ? "text-white"
//                               : "text-[#666666]"
//                           } text-base font-normal text-gilroy-medium leading-normal`}
//                         >
//                           {data.title}
//                         </div>
//                       )}
//                     </div>
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       </aside>
//       <div className={` ${collapsed ? "sm:ml-[75px]" : "sm:ml-[322px]"} `}>
//         <div>
//           <Header />
//         </div>
//         <div className="overflow-x-hidden">{layout}</div>
//       </div>
//     </>
//   );
// };

// export default MainPortalSidebar;

import { useEffect, useState } from "react";
import { portalSideBarListRegulator } from "../../../utils/hardText/portalText";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ArrowClose from "../../../assets/images/new_images/sidebarCollapse.png";
import Logo from "../../../assets/images/logo2.svg";
import ArrowRight from "../../../assets/images/arrow-left.svg";
import HamburgerMenu from "../../../assets/images/hamburger_icon.svg";
import CrossIcon from "../../../assets/images/CrossIcon.svg";
import Header from "./Header";
import useSidebarStore from "../../../store/SidebarStore";
import { useCollapseStore } from "../../../store/SidebarStore";

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
  const [mSidebarOpen, setMSidebarOpen] = useState<boolean>(false);

  const location = useLocation();

  const collapse = useCollapseStore((state: any) => state.collapse);
  const setCollapse = useCollapseStore((state: any) => state.setCollapse);

  const { pathname } = location;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // useEffect(() => {
  //   const cmsPath = location.pathname.split("/")[1];
  //   setUrl("/" + cmsPath);
  // }, [location.pathname]);

  // const handleTabClick = (url: string, title: string) => {
  //   setActiveTab(url);
  //   localStorage.setItem("current_tab", title);
  // };
  useEffect(() => {
    const cmsPath = location.pathname.split("/")[1];
    setUrl("/" + cmsPath);
    if (
      location.pathname.startsWith("/rg/profile") &&
      searchParams.get("current") === "regulator"
    ) {
      setActiveTab(""); // Reset active tab for specific condition
    }
  }, [location.pathname, searchParams]);

  const handleTabClick = (url: string, title: string) => {
    setMSidebarOpen(false);
    if (
      location.pathname.startsWith("/rg/profile") &&
      searchParams.get("current") === "regulator"
    ) {
      console.log(
        "Sidebar highlight prevention active for /dt/profile with entity"
      );
    } else {
      setActiveTab(url);
      localStorage.setItem("current_tab", title);
      navigate(url);
    }
  };

  const onClickCollapse = () => {
    setCollapse(!collapse);
  };

  const onToggleSideBar = () => {
    setMSidebarOpen(!mSidebarOpen);
  };

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        // onClick={toggleSidebar}
        onClick={onToggleSideBar}
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <img src={HamburgerMenu} alt="hamburger menu" className="w-6 h-6" />
      </button>

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-100  transition-transform ${
          mSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        } ${collapse ? "w-[100px]" : "w-[322px]"} h-screen`}
        aria-label="Sidebar"
      >
        <div
          className={`h-full overflow-y-auto bg-[#E7F0FF] ${
            collapse ? "w-[75px]" : "w-[322px]"
          }`}
        >
          <ul className="">
            <li
              className={`relative border-b border-[#E6E6E6] mb-2 ${
                collapse ? "pt-2 pr-2 pl-2 pb-1 mt-4" : "pb-4 pl-4 pr-4 pt-3"
              }`}
            >
              <img src={Logo} alt="logo" className="max-h-[52px]" />

              <button
                // onClick={toggleSidebar}
                onClick={onToggleSideBar}
                className={`absolute ${
                  collapse ? "top-[calc(100% + 1rem)] m-1 left-5" : "top-7"
                } right-0 sm:hidden`}
              >
                <img
                  src={CrossIcon}
                  alt="Close sidebar"
                  className="w-6 h-6 mr-2"
                />
              </button>
            </li>
            {portalSideBarListRegulator?.map((data, idx) => {
              return (
                <li
                  className={`${collapse ? "px-2 py-1" : "px-4 py-2"}`}
                  key={idx}
                >
                  <Link to={data.url}>
                    <div
                      onClick={(e) => handleTabClick(data.url, data.title)}
                      className={`w-auto h-auto md:h-14 ${
                        activeTab === data.url ? "bg-[#1C468E]" : ""
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
                      {!collapse && (
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
      <div className={`${collapse ? "sm:ml-[75px]" : "sm:ml-[322px]"}`}>
        <div>
          <Header />
          <div
            className={`absolute hidden sm:block md:block lg:block top-[65px] z-[100] ${
              collapse ? "-ml-4" : "-ml-5"
            }`}
            // onClick={toggleCollapse}
            onClick={onClickCollapse}
          >
            <img
              // src={collapse ? ArrowRight : ArrowClose}
              src={ArrowClose}
              alt="collapsed"
              className={`bg-[#E7F0FF] rounded-full cursor-pointer ${
                collapse ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
        </div>
        <div className="overflow-x-hidden p-3">{layout}</div>
      </div>
    </>
  );
};

export default MainPortalSidebar;
