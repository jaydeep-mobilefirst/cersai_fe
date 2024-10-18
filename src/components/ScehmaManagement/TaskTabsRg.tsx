import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import TaskTabsItem from "./TaskTabItems";
import React from "react";

type Props = {};

const tabs = [
  {
    title: "Deposit Takers",
    url: "deposit-taker",
    rurl: "/rg/deposit-taker",
  },
  {
    title: "Schemes",
    url: "my-task",
    rurl: "/rg/my-task",
  },
];

const TaskTabsRg = (props: Props) => {
  const [activeTab, setActiveTab] = useState<string>("my-task");
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
    <div
      className="flex-col justify-center items-start max-sm:items-center inline-flex border-b w-full"
      data-testid="task-tabs-rg" // Container test ID
    >
      <ul className="justify-start items-center gap-5 md:gap-10 inline-flex flex-wrap">
        {tabs.map((menuItem, index) => (
          <Link to={menuItem.rurl} key={index}>
            <TaskTabsItem
              key={index}
              text={menuItem.title}
              isActive={menuItem.url === url}
              onClick={() => handleTabClick(menuItem.title)}
              data-testid={menuItem.url === url ? "active-tab" : "task-tab-item"} // Active tab test ID
            />
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default TaskTabsRg;
