import VideoComp from "./VideoComp";
import React from "react"
import { aboutBuds } from "../../utils/hardText/landingpageText";
import { useLandingStore } from "../../zust/useLandingStore";
import { Link } from "react-router-dom";

const AboutBuds = () => {
  const { homePageData } = useLandingStore((state) => state);
  return (
    // <div className="flex items-center justify-between px-4 lg:px-[100px] py-4 lg:py-[48px] flex-col lg:flex-row landing-hero-bg-image"></div>
    <div className="bg-white flex flex-col md:flex-row md:items-center md:justify-between p-4 lg:p-[56px] md:mt-0 px-4 lg:px-[60px] py-4 lg:py-[150px] about-buds-background">
      <div className="mt-10 md:mt-0 w-[100%] md:w-[40%]">
        <h1 className="text-[#000000] text-gilroy-medium text-[34px] font-normal leading-[37.40px]">
          {homePageData?.homePageData?.aboutBudsComp[0].text}
        </h1>
        <p className="mt-[16px] w-[100%] text-gilroy-regular opacity-60 text-[#000000] text-base font-normal leading-normal">
          {homePageData?.homePageData?.aboutBudsComp[1].text}
        </p>
        <div className="flex flex-col mt-[24px]">
          <div className="text-[#1C468E] text-base font-normal  underline leading-normal text-gilroy-regular">
            {/* {homePageData?.homePageData?.aboutBudsComp[2].link} */}
            <Link target={"_blank"} to={homePageData?.homePageData?.aboutBudsComp[2].link}> {homePageData?.homePageData?.aboutBudsComp[2].text}</Link>
          </div>
          <div className="mt-[8px] text-[#1C468E] text-base font-normal  underline leading-normal text-gilroy-regular">
            {/* {homePageData?.homePageData?.aboutBudsComp[3].link} */}
            <Link target={"_blank"} to={homePageData?.homePageData?.aboutBudsComp[3].link}> {homePageData?.homePageData?.aboutBudsComp[3].text}</Link>
          </div>
        </div>
      </div>
      <VideoComp />
    </div>
  );
};
export default AboutBuds;