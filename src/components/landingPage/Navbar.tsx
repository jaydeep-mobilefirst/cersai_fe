import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem";
import hamburger from "../../assets/images/hamburger_icon.svg";
import close_icon from "../../assets/images/white_close.png";
import { navbar } from "../../utils/hardText/landingpageText";
import { useLandingStore } from "../../zust/useLandingStore";
import { operatingGuidlinesData } from "../../utils/hardText/operatingGuidelines";
import { useOperatingGuidelinesStore } from "../../zust/useOperatingGuidelinesStore";

const Navbar: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("HOME");
  const navigate = useNavigate();
  const location = useLocation();

  const { homePageData } = useLandingStore((state) => state);

  const { guidelinesPageData } = useOperatingGuidelinesStore((state) => state);

  useEffect(() => {
    if (location.pathname === "/faq") {
      setActiveTab("FAQ");
    } else if (location.pathname === "/notifications") {
      setActiveTab("NOTIFICATIONS");
    } else if (location.pathname === "/downloads") {
      setActiveTab("DOWNLOADS");
    } else if (location.pathname === "/training") {
      setActiveTab("TRAINING");
    } else if (location.pathname === "/contactus") {
      setActiveTab("CONTACT US");
    }else if (location.pathname === "/operatingguidelines") {
      setActiveTab("OPERATING GUIDELINES");
    }
  }, [location.pathname]);

  const handleMenuClick = async (text: string) => {
    if (text === "FAQ") {
      navigate("/faq");
    } else if (text === "NOTIFICATIONS") {
      navigate("/notifications");
    } else if (text === "HOME") {
      navigate("/");

      // handle other routes if necessary
    } else if (text === "DOWNLOADS") {
      navigate("/downloads");
    } else if (text === "TRAINING") {
      navigate("/training");
    } else if (text === "CONTACT US") {
      navigate("/contactus");
    } else if (text === "OPERATING GUIDELINES") {
      
      navigate("/operatingguidelines");
      } 
  

    setActiveTab(text);
    setShowMenu(false);
  };

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
            {homePageData?.homePageData?.navbar?.length > 0 && (
              <>
                {homePageData?.homePageData?.navbar.map(
                  
                  (menuItem: any, index: any) => (
                    menuItem.text !== "Operating Guidelines" &&
                    <MenuItem
                      key={index}
                      text={menuItem.text.toUpperCase()}
                      onClick={() =>
                        handleMenuClick(menuItem.text.toUpperCase())
                      }
                      isActive={activeTab === menuItem.text.toUpperCase()}
                    />
                  )
                )}
              </>
            )}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Items */}
      <nav
        className={`${
          showMenu ? "flex" : "hidden"
        } lg:hidden w-1/8 h-screen bg-gradient-to-r from-[#3521cc] to-[#0b2551] fixed top-0 left-0 z-20`}
      >
        <ul className="flex flex-col h-full text-white">
          {homePageData?.homePageData?.navbar?.length > 0 && (
            <>
              {homePageData?.homePageData?.navbar.map(
                (menuItem: any, index: any) => (
                  menuItem.text !== "Operating Guidelines" && 
                  <MenuItem
                    key={index}
                    text={menuItem.text.toUpperCase()}
                    onClick={() => handleMenuClick(menuItem.text.toUpperCase())}
                    isActive={activeTab === menuItem.text}
                  />
                )
              )}
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
