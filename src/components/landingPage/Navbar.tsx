import React, { useState } from "react";
import MenuItem from "./MenuItem";
import hamburger from "../../assets/images/hamburger_icon.svg";
import close_icon from "../../assets/images/white_close.png";
import { navbar } from "../../utils/hardText/landingpageText";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div>
      {/* Hamburger Icon */}
      <div
        className={`lg:hidden cursor-pointer fixed top-0 left-0 mt-4 ml-4 z-10 ${
          showMenu ? "hidden" : "block"
        }`}
        onClick={() => setShowMenu(true)}
      >
        <img className="size-[30px]" src={hamburger} alt="" />
      </div>

      {/* Desktop Menu Items */}
      <nav className="hidden lg:flex w-full h-[48px] bg-gradient-to-r from-[#54AD47] to-[#338118]">
        <div className="mx-auto flex justify-between items-center lg:w-[896px] md:w-1/8 sm:w-full text-[#ffffff]">
          <ul className="flex lg:flex-row items-center">
            {navbar.map((menuItem, index) => (
              <MenuItem key={index} text={menuItem} />
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Items */}
      <nav
        className={`${
          showMenu ? "flex" : "hidden"
        } lg:hidden w-1/8 h-screen bg-gradient-to-r from-[#54AD47] to-[#338118] fixed top-0 left-0 z-20`}
      >
        <ul className="flex flex-col h-full text-white">
          {navbar.map((menuItem, index) => (
            <MenuItem key={index} text={menuItem} />
          ))}
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
