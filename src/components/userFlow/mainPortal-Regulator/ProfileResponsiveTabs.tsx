import { useState, useEffect } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

import { profileSideBarListRegulator } from "../../../utils/hardText/portalText";
import TaskTabsItem from "./TaskTabItem";

type Props = {};

// const tabs = [
//   { title: "Profile", url: "profile", rurl: "/dt/dashboard/profile" },
//   { title: "Reset Password", url: "resetpassword", rurl: "/dt/dashboard/resetpassword" },
// ];

const ProfileResponsiveTabs = (props: Props) => {
  const [activeTab, setActiveTab] = useState<string>("regulator");
  const [url, setUrl] = useState<String>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const current = searchParams.get("current");
  if (!current) {
    setSearchParams({ current: "regulator" });
  }
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const cmsPath = pathname.split("/")[3];
    setUrl(cmsPath);
  }, [pathname]);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="flex-col justify-center items-center inline-flex border-b w-full">
      <ul className="justify-start items-center inline-flex flex-wrap">
        {profileSideBarListRegulator.map((menuItem, index) => (
          <Link to={menuItem.rurl} key={index} className="mx-3">
            <TaskTabsItem
              key={index}
              text={menuItem.title}
              isActive={menuItem.url === current}
              onClick={() => handleTabClick(menuItem.title)}
            />
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ProfileResponsiveTabs;
