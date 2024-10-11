import { useEffect, useState } from "react";
import { portalSideBarListDesignated } from "../../../utils/hardText/portalText";
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
import Swal from "sweetalert2";
import { axiosTokenInstance } from "../../../utils/axios";

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
  const [state, setState] = useState<boolean>(true);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [timeoutId, setTimeoutId] = useState<any>(null);
  const [dashboard, setDashboard] = useState<boolean>(false);
  const [scheme, setScheme] = useState<boolean>(false)
  const [schemeView, setSchemeView] = useState<boolean>(false)
  const [user, setUser] = useState<boolean>(false)
  const [role, setRole] = useState<boolean>(false)

  const location = useLocation();
  const collapse = useCollapseStore((state: any) => state.collapse);
  const setCollapse = useCollapseStore((state: any) => state.setCollapse);

  const { pathname } = location;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const checkDislayStauts = (status: any): any => {
    switch (status) {
      case "Dashboard":
        return dashboard;
      case "Scheme Management":
        return scheme ? true : schemeView;
      case "User Management":
        return role;
      default:
        return true;
    }
  };

  useEffect(()=>{
    const sessionData = sessionStorage.getItem("roles");
    if (sessionData) {
      const rolesArray: string[] = sessionData.split(",");
     
      // dashboard
      const dashboardRoles = rolesArray.filter(role =>
        role === "dashboard-viewer-role-designated-court"
      );
      if(dashboardRoles?.length > 0){
      setDashboard(true);
      }

      // scheme
      const schemeRolesView = rolesArray.filter(role =>
        role === "scheme-view-access-designated-court"
      );
      if(schemeRolesView?.length > 0){
      setSchemeView(true);
      }
      const schemeRoles = rolesArray.filter(role =>
        role === "scheme-edit-access-designated-court"
      );
      if(schemeRoles?.length > 0){
      setScheme(true);
      }

       // uam
       const userRoles = rolesArray.filter(role =>
        role === "role-creation-access-designated-court"
      );
      if(userRoles?.length > 0){
      setUser(true);
      }
      const roleRoles = rolesArray.filter(role =>
        role === "user-creation-access-designated-court"
      );
      if(roleRoles?.length > 0){
      setRole(true);
      }
    }

    
  }, [])

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
    const activePath = portalSideBarListDesignated?.find((item) =>
      pathname.includes(item.url)
    );
    if (activePath) {
      setActiveTab(activePath.url);
    }

    if (
      location.pathname.startsWith("/ca/profile") &&
      searchParams.get("current") === "competent"
    ) {
      setActiveTab(""); // Reset active tab for specific condition
    }
  }, [location.pathname, searchParams]);

  const handleTabClick = (url: string, title: string) => {
    setMSidebarOpen(false);
    if (
      location.pathname.startsWith("/ca/profile") &&
      searchParams.get("current") === "competent"
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

  const handleUserActivity = () => {
    setIsActive(true);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // Set a timeout to mark the user as inactive after 10 minutes (600000 ms)
    const newTimeoutId = setTimeout(() => {
      setIsActive(false);
    }, 18000000);
    setTimeoutId(newTimeoutId);
  };

  useEffect(() => {
    // Add event listeners for user   activity
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);
    window.addEventListener("focus", handleUserActivity);
    window.addEventListener("click", handleUserActivity);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("focus", handleUserActivity);
      window.removeEventListener("click", handleUserActivity);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const refreshPage = sessionStorage.getItem("refreshCount");

  useEffect(() => {
    const reloadToken = sessionStorage.getItem("reload");
    if (reloadToken) {
      window.location.reload();
      sessionStorage.setItem("reload", "");
    }
  }, []);

  useEffect(() => {
    const refreshCount = () => {
      // Get the current count from sessionStorage
      const count = parseInt(sessionStorage.getItem("refreshCount") || "0", 10);

      // Update the count and save it back to sessionStorage
      const newCount = count + 1;
      sessionStorage.setItem("refreshCount", newCount.toString());
    };

    // Add event listener for beforeunload
    window.addEventListener("beforeunload", refreshCount);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", refreshCount);
    };
  }, [state]);

  useEffect(() => {
    if (!isActive || refreshPage == "1") {
      sessionStorage.clear();
      Swal.fire({
        icon: "error",
        title:
          refreshPage == "1"
            ? "Dont refresh the page. Please login again"
            : "User inactive for 10 min. Please login again",
      });
      navigate("/");
    }
  });

  const refreshToken = sessionStorage.getItem("refresh_token");

    // Function to fetch data from the API
    const fetchDataRefresh = async () => {
      axiosTokenInstance
        .post("/auth/refresh-token", {
          refresh_token: refreshToken,
        })
        .then((responce) => {
          sessionStorage.setItem("access_token", responce?.data?.access_token);
          sessionStorage.setItem("refresh_token", responce?.data?.refresh_token);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    useEffect(() => {
      // Fetch data on initial render
      fetchDataRefresh();
  
      const intervalId = setInterval(fetchDataRefresh, 10000);
  
      // Clean up the interval on component unmount
      return () => clearInterval(intervalId);
    }, []);

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        onClick={onToggleSideBar}
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <img src={HamburgerMenu} alt="hamburger menu" className="w-6 h-6" />
      </button>

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-100  transition-transform ${
          mSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
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
                onClick={onToggleSideBar}
                className={`absolute ${
                  collapse ? "top-[calc(100% + 1rem)] m-1 left-5" : "top-7"
                } right-0 lg:hidden`}
              >
                <img
                  src={CrossIcon}
                  alt="Close sidebar"
                  className="w-6 h-6 mr-2"
                />
              </button>
            </li>
            {portalSideBarListDesignated?.map((data, idx) => {
              return (
                <li
                  className={`${collapse ? "px-2 py-1" : "px-4 py-2"} ${
                    checkDislayStauts(data?.title) ? "block" : "hidden"
                  }`}
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
      <div className={`${collapse ? "lg:ml-[75px]" : "lg:ml-[322px]"}`}>
        <div>
          <Header />
          <div
            className={`fixed hidden lg:block top-[65px] z-[100] ${
              collapse ? "-ml-4" : "-ml-5"
            }`}
            onClick={onClickCollapse}
          >
            <img
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
