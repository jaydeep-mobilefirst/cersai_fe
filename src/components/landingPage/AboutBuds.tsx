import VideoComp from "./VideoComp";
import { aboutBuds } from "../../utils/hardText/landingpageText";

const AboutBuds = () => {
  return (
    // <div className="flex items-center justify-between px-4 lg:px-[100px] py-4 lg:py-[48px] flex-col lg:flex-row landing-hero-bg-image"></div>
    <div className="bg-white flex flex-col md:flex-row md:items-center md:justify-between p-4 lg:p-[56px] md:mt-0 px-4 lg:px-[60px] py-4 lg:py-[150px] about-buds-background">
      <div className="mt-10 md:mt-0 w-[100%] md:w-[40%]">
        <h1 className="text-[#000000] text-gilroy-medium text-[34px] font-normal leading-[37.40px]">
          {aboutBuds[0].heading}
        </h1>
        <p className="mt-[16px] w-[100%] text-gilroy-regular opacity-60 text-[#000000] text-base font-normal leading-normal">
          {aboutBuds[1].description}
        </p>
        <div className="flex flex-col mt-[24px]">
          <div className="text-[#1C468E] text-base font-normal  underline leading-normal text-gilroy-regular">
            {aboutBuds[2].click1}
          </div>
          <div className="mt-[8px] text-[#1C468E] text-base font-normal  underline leading-normal text-gilroy-regular">
            {aboutBuds[3].click2}
          </div>
        </div>
      </div>
      <VideoComp />
    </div>
  );
};
export default AboutBuds;