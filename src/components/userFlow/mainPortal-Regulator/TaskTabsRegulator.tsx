import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import TaskTabsItem from "./TaskTabItem";

type Props = {};

const tabs = [
  { title: "Profile", url: "profile", rurl: "/rg/profile" },
  {
    title: "Reset Password",
    url: "resetpassword",
    rurl: "/rg/resetpassword",
  },
  { title: "Update DSC 3 Certificate", url: "uploaddsc3", rurl: "/rg/uploaddsc3" },
];

const TaskTabsRegulator = (props: Props) => {
  const [activeTab, setActiveTab] = useState<string>("profile");
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
    <div className="flex-col justify-center items-start max-sm:items-center inline-flex border-b w-full">
      <ul className="justify-start items-center gap-5 md:gap-10 inline-flex flex-wrap">
        {tabs.map((menuItem, index) => (
          <Link to={menuItem.rurl} key={index}>
            <TaskTabsItem
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

export default TaskTabsRegulator;
