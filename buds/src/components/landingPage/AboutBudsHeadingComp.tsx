import React from "react";
import {
  aboutBudsHeadingComp,
  aboutBudsHeadingComp1,
} from "../../utils/hardText/landingpageText";
import { useLandingStore } from "../../zust/useLandingStore";

const AboutBudsHeadingComp = () => {
  const { homePageData } = useLandingStore((state) => state);
  return (
    <div className="p-4 lg:p-[78px] bg-[#E8ECF4] text-center md:text-start buds-background-image">
      <div className="flex flex-col justify-center items-center md:flex-start md:items-start">
        <h1 className="text-gilroy-medium text-black text-3xl md:text-4xl font-normal leading-10 md:leading-11">
          {homePageData?.homePageData?.aboutBudsHeadingComp[0]?.text}
        </h1>
        <p className="mb-6 md:mb-[56px] text-gilroy-regular text-base md:text-lg opacity-60 text-black font-normal leading-6 md:w-3/5 lg:w-3/6">
          {homePageData?.homePageData?.aboutBudsHeadingComp[1]?.text}
        </p>
      </div>
      <>
        {homePageData?.homePageData?.aboutBudsHeadingComp1.map((item:any, idx:any) => {
          if (item.text !== "To know more login to ") {
            return (
              <>
                <div className=" flex flex-col items-center md:flex-row justify-start md:items-center" key={idx}>
                  <div className="mr-4 md:mr-6 mb-0 w-14 h-14 rounded-full bg-[#1C468E] flex justify-center items-center">
                    <img src={item.img} alt="icon" />
                  </div>
                  <p className="mt-2 md:mt-0 text-base text-gilroy-medium text-black font-normal leading-6">
                    {item.text}
                  </p>
                </div>
                <div className="md:ml-[24px] w-[8px] h-[27px] bg-[#1C468E] hidden md:block" />
              </>
            );
          }
          return (
            <div className=" flex flex-col items-center md:flex-row justify-start md:items-center" key={idx}>
              <div className="mr-4 md:mr-6 mb-0 w-14 h-14 rounded-full bg-[#1C468E] flex justify-center items-center">
                <img src={item.img} alt="icon" />
              </div>
              <p className="mt-2 md:mt-0 text-base text-gilroy-medium text-black font-normal leading-6">
                {item.text}
                <span className="text-[#1C468E] text-gilroy-medium underline cursor-pointer">
                  {" "}
                  {item.link}
                </span>
              </p>
            </div>
          );
        })}
      </>
    </div>
  );
};

export default AboutBudsHeadingComp;