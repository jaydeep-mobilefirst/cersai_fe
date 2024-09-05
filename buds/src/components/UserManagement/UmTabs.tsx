import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import UmTabsItem from "./UmTabItems";

const rolesURL = {
  DC : "/dc/usermanagement",
  CA : "/ca/usermanagement",
  DT : "/dt/usermanagement",
  RG : "/rg/usermanagement"
}

const userUrls = {
  DT :  "/dt/usermanagement/usercreation",
  DC :  "/dc/usermanagement/usercreation",
  CA :  "/ca/usermanagement/usercreation",
  RG :  "/rg/usermanagement/usercreation",
}
interface Props {
  entityType : "DC" | "DT" | "CA" | "RG"
}

const UmTabs : React.FC<Props> = ({entityType} : Props) => {
  //Set User Creation URL
  sessionStorage.setItem('userCreationURL', userUrls[entityType])
  const tabs = [
    {
      title: "Role Creation",
      url: "rolecreation",
      rurl: rolesURL[entityType],
    },
    {
      title: "User Creation",
      url: "usercreation",
      rurl: userUrls[entityType],
    },
  ];
  const location = useLocation();
  const { pathname } = location;
  const [activeTab, setActiveTab] = useState<string>(tabs[0].title); // Default to the first tab

  useEffect(() => {
    const currentTab = tabs.find((tab) => pathname.includes(tab.url));
    if (currentTab) {
      setActiveTab(currentTab.title);
    } else {
      setActiveTab(tabs[0].title); // Default to the first tab if no match is found
    }
  }, [pathname]);

  return (
    <div className="flex-col justify-center items-start inline-flex border-b w-full">
      <ul className="justify-start items-center gap-5 md:gap-10 inline-flex flex-wrap">
        {tabs.map((menuItem, index) => (
          <Link to={menuItem.rurl} key={index}>
            <UmTabsItem
              text={menuItem.title}
              isActive={activeTab === menuItem.title}
              onClick={() => setActiveTab(menuItem.title)}
            />
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default UmTabs;
