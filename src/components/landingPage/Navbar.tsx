import React, { useState } from "react";
import MenuItem from "./MenuItem";
import hamburger from "../../assets/images/hamburger_icon.svg";
import close_icon from "../../assets/images/white_close.png";
import { navbar } from "../../utils/hardText/landingpageText";
import { useLandingStore } from "../../zust/useLandingStore";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const { homePageData } = useLandingStore((state) => state);

  return (
    <div>
      {/* Hamburger Icon */}
      <div
        className={`bg-white lg:hidden cursor-pointer fixed top-0 left-0 mt-4 ml-4 z-10 ${
          showMenu ? "hidden" : "block"
        }`}
        onClick={() => setShowMenu(true)}
      >
        <img className="size-[30px]" src={hamburger} alt="" />
      </div>

      {/* Desktop Menu Items */}
      <nav className="hidden w-full lg:flex h-[48px] bg-[#1c468e]">
        <div className="w-full text-[#ffffff] flex items-center justify-center">
          <ul className="flex lg:flex-row items-center">
            {homePageData?.navbar?.length > 0 && (
              <>
                {homePageData?.navbar.map((menuItem: any, index: any) => (
                  <MenuItem key={index} text={menuItem} />
                ))}
              </>
            )}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Items */}
      <nav
        className={`${
          showMenu ? "flex" : "hidden"
        } lg:hidden w-1/8 h-screen bg-gradient-to-r from-[#54AD47] to-[#0b2551] fixed top-0 left-0 z-20`}
      >
        <ul className="flex flex-col h-full text-white">
          {homePageData?.navbar?.length > 0 && (
            <>
              {homePageData?.navbar.map((menuItem: any, index: any) => (
                <MenuItem key={index} text={menuItem} />
              ))}
            </>
          )}
        </ul>

        {/* Close Icon*/}
        <div
          className="cursor-pointer text-2xl text-white absolute top-0 right-0 mt-4 mr-4 z-30"
          onClick={() => setShowMenu(false)}
        >
          <img className="size-[30px] mt-[-7px]" src={close_icon} alt="" />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
