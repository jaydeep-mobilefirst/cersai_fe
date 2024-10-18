import { useState, useEffect } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import TaskTabsItem from "../TaskTabItem";
import React from "react";
import { profileSideBarListRegulator } from "../../../../utils/hardText/portalText";

type Props = {};

const ProfileResponsiveTabs = (props: Props) => {
  const [activeTab, setActiveTab] = useState<string>("regulator");
  const [url, setUrl] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const { pathname } = location;
  
  const current = searchParams.get("current");

  // Set initial search param only if it's not set
  useEffect(() => {
    if (!current) {
      setSearchParams({ current: "regulator" });
    }
  }, [current, setSearchParams]);

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
        {profileSideBarListRegulator?.map((menuItem, index) => (
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
