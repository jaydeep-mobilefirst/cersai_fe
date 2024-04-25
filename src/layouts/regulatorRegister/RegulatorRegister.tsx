import React, { useState } from "react";

import { Outlet } from "react-router-dom";
import SignUpSideBar from "../../components/userFlow/regulatorCourt/SignUpSideBar";

import MenuIcon from "../../assets/images/menu.svg";
import CrossIcon from "../../assets/images/CrossIcon.svg";

const RegulatorRegister = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="flex  relative min-h-screen">
      {/* Menu Icon */}
      <div
        className="lg:hidden fixed top-0 left-0  m-4 z-50"
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          // <img src={CrossIcon} alt="Close Menu" className="w-6 h-6" />
          <div></div>
        ) : (
          // <img src={MenuIcon} alt="Open Menu" className="w-6 h-6" />
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        )}
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } lg:hidden fixed top-0 left-0 z-20 h-screen w-1/8`}
      >
        <SignUpSideBar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </div>

      {/* Sidebar (always visible on larger devices) */}
      <div className="hidden lg:block h-full">
        <SignUpSideBar />
      </div>

      {/* <Outlet/> */}
      <div className=" flex w-full flex-col">
        <div className="w-full mt-20 lg:mt-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RegulatorRegister;
