// import { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import UmTabsItem from "./UmTabItems";

// type Props = {};

// const tabs = [
//   {
//     title: "Role Creation",
//     url: "rolecreation",
//     rurl: "/dt/usermanagement",
//   },
//   {
//     title: "User creation",
//     url: "usercreation",
//     rurl: "/dt/usermanagement/usercreation",
//   },
// ];

// const UmTabs = (props: Props) => {
//   const [activeTab, setActiveTab] = useState<string>("Role Creation");
//   const [url, setUrl] = useState<String>("");

//   const location = useLocation();
//   const { pathname } = location;

//   useEffect(() => {
//     const cmsPath = pathname.split("/")[2];
//     setUrl(cmsPath);
//   }, [pathname]);

//   const handleTabClick = (tabName: string) => {
//     setActiveTab(tabName);
//   };

//   return (
//     <div className="flex-col justify-center items-start inline-flex border-b w-full">
//       <ul className="justify-start items-center gap-5 md:gap-10 inline-flex flex-wrap">
//         {tabs.map((menuItem, index) => (
//           <Link to={menuItem.rurl} key={index}>
//             <UmTabsItem
//               key={index}
//               text={menuItem.title}
//               isActive={menuItem.url === url}
//               onClick={() => handleTabClick(menuItem.title)}
//             />
//           </Link>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UmTabs;

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import UmTabsItem from "./UmTabItems";

const tabs = [
  {
    title: "Role Creation",
    url: "rolecreation",
    rurl: "/dc/usermanagement",
  },
  {
    title: "User Creation",
    url: "usercreation",
    rurl: "/dc/usermanagement/usercreation",
  },
];

const UmTabs = () => {
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
