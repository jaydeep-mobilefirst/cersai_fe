import React, { useEffect, useState } from "react";
import Notification from "../../../assets/images/notification.svg";
import Setting from "../../../assets/images/setting.svg";
import G1 from "../../../assets/images/g1.svg";
import Reddot from "../../../assets/images/reddot.svg";
import DownArrow from "../../assets/images/downarrow.svg";
import DropdownMenu from "./DropdownMenu";
import { Link, useLocation } from "react-router-dom";
import useSidebarStore from "../../../store/SidebarStore";

const Header = () => {
  // const location = useLocation();
  // let key = location?.pathname?.split("/")[2];

  // key = key
  //   ?.split(" ")
  //   ?.map((k) => k.slice(0, 1).toUpperCase() + k.slice(1).toLowerCase())
  //   ?.join(" ");

  // const title = localStorage.getItem("current_tab");

  const firstName = sessionStorage.getItem("firstName");
  const lastName = sessionStorage.getItem("lastName");
  const entityType = sessionStorage.getItem("entityType");

  const [isOpen, setIsOpen] = useState(false);
  const [Title, setTitle] = useState<string>("");
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // const showTitle = (title: string) => {
  //   if (title === "DT") {
  //     setTitle("Deposit Taker");
  //   } else if (title === "CA") {
  //     setTitle("Competent Authority");
  //   } else if (title === "DC") {
  //     setTitle("Designated Court");
  //   } else if (title === "RG") {
  //     setTitle("Regulator");
  //   }
  // };
  // useEffect(() => {
  //   showTitle(title || "");
  // }, []);
  useEffect(() => {
    const titleMap: { [key: string]: string } = {
      DT: "Deposit Taker",
      CA: "Competent Authority",
      DC: "Designated Court",
      RG: "Regulator",
    };
    if (entityType && titleMap.hasOwnProperty(entityType)) {
      setTitle(titleMap[entityType]);
    } else {
      setTitle("");
    }
  }, [entityType]);

  return (
    <>
      <div className="flex items-center justify-between p-4 mt-2 pb-6 flex-col sm:flex-row border-b border-[#E6E6E6]">
        <div className="">
          {Title && (
            <div className="h-8 px-2 rounded-[5px] border border-[#1C468E] flex items-center justify-center">
              <div className="text-[#1C468E] text-base font-normal text-gilroy-medium leading-tight">
                {/* {showTitle(title)} */}
                {/* {Title} */}Deposit Taker
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="relative mr-4">
              <img src={Notification} alt="notification" />
              <img
                src={Reddot}
                alt="notification count"
                className="absolute top-0 right-0"
              />
            </div>
          </div>
          <Link to="/dt/profile?current=entity">
            <div className="mr-4">
              <img src={Setting} alt="Setting" />
            </div>
          </Link>
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={toggleDropdown}
          >
            <div className="mr-3">
              <img src={G1} alt="user logo" />
            </div>
            <div className="mr-1">
              <div className="w-auto text-black text-sm font-normal text-gilroy-medium tracking-[0.14px]">
                {firstName} {lastName}
              </div>
              <div className="w-auto text-black text-xs font-normal text-gilroy-medium tracking-[0.12px]">
                CERSAI
              </div>
            </div>
          </div>
          <DropdownMenu
            toggleDropdown={toggleDropdown}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
