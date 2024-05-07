import React, { useState } from "react";
import Notification from "../../../assets/images/notification.svg";
import Setting from "../../../assets/images/setting.svg";
import G1 from "../../../assets/images/g1.svg";
import Reddot from "../../../assets/images/reddot.svg";
import DownArrow from "../../assets/images/downarrow.svg";
import DropdownMenu from "./DropdownMenu";
import { useLocation } from "react-router-dom";
import useSidebarStore from "../../../store/SidebarStore";

const Header = () => {
  const location = useLocation();
  let key = location?.pathname?.split("/")[2];

  key = key
    ?.split(" ")
    ?.map((k) => k.slice(0, 1).toUpperCase() + k.slice(1).toLowerCase())
    ?.join(" ");

  const [title, setTitle] = useState(key);
  const firstName = sessionStorage.getItem("firstName");
  const lastName = sessionStorage.getItem("lastName");
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 mt-2 pb-6 flex-col sm:flex-row border-b border-[#E6E6E6]">
        <div className="">
          {key && (
            <div className="h-8 px-2 rounded-[5px] border border-[#54B749] flex items-center justify-center">
              <div className="text-[#54B749] text-base font-normal text-gilroy-medium leading-tight">
                {key}
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
          <div className="mr-4">
            <img src={Setting} alt="Setting" />
          </div>
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
          <DropdownMenu toggleDropdown={toggleDropdown} isOpen={isOpen} />
        </div>
      </div>
    </>
  );
};

export default Header;
