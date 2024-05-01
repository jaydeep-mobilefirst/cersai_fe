import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import UmTabsItem from "./UmTabItems";

type Props = {};

const tabs = [
  { title: "Role Creation", url: "role", rurl: "/usermanagement/role" },
  { title: "User creation", url: "user", rurl: "/usermanagement/user" },
];

const UmTabs = (props: Props) => {
  const [activeTab, setActiveTab] = useState<string>("Role Creation");
  const [url, setUrl] = useState<String>("");

  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const cmsPath = pathname.split("/")[2];
    setUrl(cmsPath);
  }, [pathname]);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="flex-col justify-center items-start inline-flex border-b w-full">
      <ul className="justify-start items-center gap-5 md:gap-10 inline-flex flex-wrap">
        {tabs.map((menuItem, index) => (
          <Link to={menuItem.rurl} key={index}>
            <UmTabsItem
              key={index}
              text={menuItem.title}
              isActive={menuItem.url === url}
              onClick={() => handleTabClick(menuItem.title)}
            />
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default UmTabs;
