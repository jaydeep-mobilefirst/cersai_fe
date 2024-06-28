import React from "react";
import { useLandingStore } from "../../zust/useLandingStore";

const LanguageBar = () => {
  const { homePageData } = useLandingStore((state) => state);
  return (
    <div>
      <div className="h-6 relative bg-[#ECECEB] flex items-center lg:justify-start overflow-auto">
        <div className="ml-[8px] lg:ml-[161px] text-center text-[#797979] text-xs font-normal leading-none flex items-center justify-start">
          <div className="mx-[8px] text-gilroy-regular">
            {homePageData?.languageLable}
          </div>
          {homePageData?.languageData?.length > 0 && (
            <>
              {homePageData?.languageData.map((languagename: any, idx: any) => {
                return (
                  <div
                    className={`mx-[8px] cursor-pointer ${
                      idx === 1 ? "text-gilroy-medium" : "text-gilroy-regular"
                    }`}
                    key={idx}
                  >
                    {languagename}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LanguageBar;
