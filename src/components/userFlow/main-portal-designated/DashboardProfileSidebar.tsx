import { useEffect, useState } from "react";
import {
  profileSideBarListCompetent,
  profileSideBarListDesignated,
} from "../../../utils/hardText/portalText";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import rightArrow from "../../../assets/images/ArrowDark.svg";
import whiteRightArrow from "../../../assets/images/rightArrowWhiteallWhite.svg";
type Props = {};
const widthPercentage: any = {
  0: "w-5",
  25: "w-1/4",
  50: "w-1/2",
  75: "w-3/4",
  100: "w-full",
};

const DashboardProfileSidebar = ({}: Props) => {
  const [percent, setPercentage] = useState<any>(0);
  const [mSidebar, setMsidebar] = useState<boolean>(false);
  const [url, setUrl] = useState<String>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const current = searchParams.get("current");
  if (!current) {
    setSearchParams({ current: "court" });
  }
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  useEffect(() => {
    const cmsPath = pathname.split("/")[1];
    // Extracting the first part after the domain
    // console.log(cmsPath, "dashboard");
    setUrl("/" + cmsPath);
  }, []);

  const sidebarOnclick = () => {
    setMsidebar(!mSidebar);
  };

  const goBackRoute = () => {
    navigate(-1);
  };

  const optionOnclick = (url: String) => {};
  const firstName = sessionStorage.getItem("firstName");
  const lastName = sessionStorage.getItem("lastName");

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        onClick={sidebarOnclick}
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
        className={`z-40 max-lg:hidden w-[322px] transition-transform ${
          mSidebar ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        } `}
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto bg-[#ffffff] w-[225px] md:w-[322px] border-r-2">
          <ul className="">
            <li className="border-b border-[#E6E6E6] p-4">
              <h1 className="text-2xl font-semibold">
                {firstName}
                {lastName}
              </h1>
              <h1 className="text-xl">CERSAI</h1>
              <div className="h-12">
                <p className="mt-[16px] text-[#2D2B27] text-base font-normal text-gilroy-medium">
                  <span className="text-zinc-800 text-base font-normal text-gilroy-bold">
                    {percent}%
                  </span>{" "}
                  Completed{" "}
                </p>
                <div className="mt-[8px] md:w-[291px] h-2 bg-white rounded-[32px] border border-black-200">
                  <div
                    className={` ${widthPercentage[percent]} h-2 bg-[#1C468E] rounded-[32px] `}
                  />
                </div>
              </div>
            </li>
            {profileSideBarListDesignated?.map((data, idx) => {
              return (
                <li
                  className="px-4 py-2 relative"
                  key={idx}
                  onClick={() => setPercentage(data.percentage)}
                >
                  <Link to={data?.rurl}>
                    <div
                      onClick={(e) => optionOnclick(data?.url)}
                      className={`w-[190px] md:w-[290px] h-auto md:h-14 ${
                        current === data?.url ? "bg-[#1C468E]" : "bg-[#FFFFFF]"
                      }  rounded-lg flex items-center justify-start cursor-pointer`}
                    >
                      <div
                        className={`${
                          current === data?.url
                            ? "text-white"
                            : "text-[#666666]"
                        }  text-base font-normal text-gilroy-medium leading-normal pl-2`}
                      >
                        {data?.title}
                      </div>
                    </div>
                  </Link>
                  <span className="absolute right-6 top-7">
                    <img
                      src={current === data.url ? whiteRightArrow : rightArrow}
                      alt=""
                      height={20}
                      width={20}
                    />
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default DashboardProfileSidebar;
