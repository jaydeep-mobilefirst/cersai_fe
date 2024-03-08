import VideoComp from "./VideoComp";
import { aboutBuds } from "../../utils/hardText/landingpageText";

const AboutBuds = () => {
  return (
    <div className="bg-white flex flex-col md:flex-row md:items-center md:justify-between px-4 lg:px-[56px]">
      <div className="mt-10 md:mt-0 w-[100%] md:w-[40%]">
        <h1 className="text-[#000000] text-[34px] font-normal leading-[37.40px]">
          {aboutBuds[0].heading}
        </h1>
        <p className="mt-[16px] w-[100%]  opacity-60 text-[#000000] text-base font-normal leading-normal">
          {aboutBuds[1].description}
        </p>
        <div className="flex flex-col mt-[24px]">
          <div className="text-[#52AE32] text-base font-normal  underline leading-normal">
            {aboutBuds[2].click1}
          </div>
          <div className="mt-[8px] text-[#52AE32] text-base font-normal  underline leading-normal">
            {aboutBuds[3].click2}
          </div>
        </div>
      </div>
      <VideoComp />
    </div>
  );
};
export default AboutBuds;
