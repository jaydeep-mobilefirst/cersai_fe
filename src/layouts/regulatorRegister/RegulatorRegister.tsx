import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SignUpSideBar from '../../components/userFlow/regulatorCourt/SignUpSideBar';
import MenuIcon from '../../assets/images/menu.svg';
import CrossIcon from '../../assets/images/CrossIcon.svg';

const RegulatorRegister = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex relative">
      {/* Menu Icon */}
      <div className="lg:hidden absolute top-0 left-0 m-4 z-50" onClick={toggleMenu}>
        {isMenuOpen ? (
          <img src={CrossIcon} alt="Close Menu" className="w-6 h-6" />
        ) : (
          <img src={MenuIcon} alt="Open Menu" className="w-6 h-6" />
        )}
      </div>

      {/* Sidebar */}
      <div  className={`${
          isMenuOpen ? "flex" : "hidden"
        } lg:hidden  h-screen w-1/2 sm:w-1/3 fixed top-0 left-0 z-20`}>
        <SignUpSideBar />
      </div>

      {/* Sidebar (always visible on larger devices) */}
      <div className="hidden lg:block h-screen">
        <SignUpSideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default RegulatorRegister;
