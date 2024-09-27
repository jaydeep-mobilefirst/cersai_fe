import React, { useEffect, useState } from "react";
import { useLandingStore } from "../../zust/useLandingStore";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {};

export const Footer = (props: Props) => {
  const { homePageData } = useLandingStore((state) => state);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("");

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
    } else if (location.pathname === "/operatingguidelines") {
      setActiveTab("OPERATING GUIDELINES");
    }
  }, [location.pathname]);

  const handleMenuClick = async (text: any) => {
    if (text === "FAQ") {
      navigate("/faq");
    } else if (text === "NOTIFICATIONS") {
      navigate("/notifications");
    } else if (text === "HOME") {
      navigate("/");
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
  };

  let arr = [
    { heading: "Home", link: "#" },
    { heading: "FAQ", link: "#" },
    { heading: "Notifications", link: "#" },
    { heading: "Operating Guidelines", link: "#" },
    { heading: "Downloads", link: "#" },
    { heading: "Training", link: "#" },
    { heading: "Contact Us", link: "#" },
    { heading: "Sitemap", link: "#" },
  ];
  return (
    <footer className="lg:-mt-[100px] text-white text-sm bg-footer-gradient-custom bg-[#1C468E]">
      <nav
        className="flex-col flex-wrap justify-center items-center p-4 max-w-screen-xl mx-auto border-b border-opacity-50 pb-6"
        style={{ borderColor: "#1C468E", fontSize: "16px" }}
      >
        {/* primary nav */}
        <div className="w-full md:flex md:items-center md:w-auto md:space-x-4 md:justify-center flex-wrap">
          <>
            {homePageData?.homePageData?.footer?.map(
              (link: any, index: any) => {
                if (link.text === "Contact Us") {
                  return (
                    <p
                      className="block px-2 py-1 border-white md:inline-block pr-6 text-gilroy-medium cursor-pointer"
                      key={index}
                      onClick={() => handleMenuClick(link.text.toUpperCase())}
                    >
                      {link.text.toUpperCase()}
                    </p>
                  );
                } else if (
                  link.text === "Sitemap" ||
                  link.text === "Operating Guidelines"
                ) {
                  // Skip rendering these links
                  return null;
                }
                return (
                  <p
                    className="block px-2 py-1 md:border-r border-white md:inline-block pr-6 text-gilroy-medium cursor-pointer"
                    key={index}
                    onClick={() => handleMenuClick(link.text.toUpperCase())}
                  >
                    {link.text.toUpperCase()}
                  </p>
                );
              }
            )}
          </>
        </div>
      </nav>
      <hr className="mt-2 bg-[#668FD7] w-[85%] mx-[5%] lg:mx-[8%] flex justify-center"></hr>
      <div
        className="py-4 text-center mt-6 text-gilroy-regular"
        style={{ fontSize: "10px" }}
      >
        {homePageData?.homePageData?.footerDescription[0]?.text}
        <div className="mt-4 md:mt-0 flex justify-center">
          {/* <p>
          {homePageData?.homePageData?.footerDescription[1]?.text}{" "}
            <span className="underline text-gilroy-regular font-bold">
            {homePageData?.homePageData?.footerDescription[1]?.link}
            </span>
          </p> */}
          <p>
            {
              homePageData?.homePageData?.footerDescription[1]?.text
            } &nbsp;
            <a
              href={homePageData?.homePageData?.footerDescription[1]?.link}
              className="underline text-gilroy-regular font-bold"
              target="_blank"
              rel="noopener noreferrer"
            >
              {
                homePageData?.homePageData?.footerDescription[1]?.img
              }
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
