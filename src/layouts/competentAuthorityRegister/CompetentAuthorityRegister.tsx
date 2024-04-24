

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SignUpSideBar from '../../components/userFlow/competentAuthority/SignUpSideBar';
import MenuIcon from '../../assets/images/menu.svg';
import CrossIcon from '../../assets/images/CrossIcon.svg';

const CompetentAuthorityRegister = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex relative min-h-screen">
      {/* Menu Icon */}
      <div className="lg:hidden fixed top-0 left-0 m-4 z-50" onClick={toggleMenu}>
        {isMenuOpen ? (
          <img src={CrossIcon} alt="Close Menu" className="w-6 h-6" />
        ) : (
          <img src={MenuIcon} alt="Open Menu" className="w-6 h-6" />
        )}
      </div>

      {/* Sidebar */}
      <div  className={`${
          isMenuOpen ? "flex" : "hidden"
        } lg:hidden fixed top-0 left-0 z-20 h-screen w-1/8`}>
        <SignUpSideBar />
      </div>

      {/* Sidebar (always visible on larger devices) */}
      <div className="hidden lg:block h-full">
        <SignUpSideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default CompetentAuthorityRegister;

