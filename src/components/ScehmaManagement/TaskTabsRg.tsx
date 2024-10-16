import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import TaskTabsItem from "./TaskTabItems";

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
  const [DT, setDT] = useState<boolean>(false);
  const [DTView, setDTView] = useState<boolean>(false);
  const [scheme, setScheme] = useState<boolean>(false);
  const [schemeView, setSchemeView] = useState<boolean>(false);

  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const sessionData = sessionStorage.getItem("roles");
    if (sessionData) {
      const rolesArray: string[] = sessionData.split(",");

      // dt
      const mytaskRoles = rolesArray.filter(
        (role) => role === "dt-approver-role-regulator"
      );
      if (mytaskRoles?.length > 0) {
        setDT(true);
      }
      const mytaskRolesView = rolesArray.filter(
        (role) => role === "dt-reviewer-role-regulator"
      );
      if (mytaskRolesView?.length > 0) {
        setDTView(true);
      }

      // scheme
      const schemeRolesView = rolesArray.filter(
        (role) => role === "scheme-view-access-regulator"
      );
      if (schemeRolesView?.length > 0) {
        setSchemeView(true);
      }
      const schemeRoles = rolesArray.filter(
        (role) => role === "scheme-edit-access-regulator"
      );
      if (schemeRoles?.length > 0) {
        setScheme(true);
      }
    }
  }, []);

  const checkDislayStauts = (status: any): any => {
    switch (status) {
      case "Deposit Takers":
        return DT ? true : DTView;
      case "Schemes":
        return scheme ? true : schemeView;
      default:
        return true;
    }
  };

  useEffect(() => {
    const cmsPath = pathname.split("/")[2];
    setUrl(cmsPath);
  }, [pathname]);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className='flex-col justify-center items-start max-sm:items-center inline-flex border-b w-full'>
      <ul className='justify-start items-center gap-5 md:gap-10 inline-flex flex-wrap'>
        {tabs.map((menuItem, index) => (
          <div
            key={index}
            className={`${
              checkDislayStauts(menuItem?.title) ? "block" : "hidden"
            }`}
          >
            <Link to={menuItem.rurl}>
              <TaskTabsItem
                key={index}
                text={menuItem.title}
                isActive={menuItem.url === url}
                onClick={() => handleTabClick(menuItem.title)}
              />
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TaskTabsRg;
