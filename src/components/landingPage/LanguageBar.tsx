import React from "react";
import { useLandingStore } from "../../zust/useLandingStore";
import { useLangugaeStore } from "../../zust/useLanguageUsStore";
import {languageData} from '../../utils/hardText/landingpageText';

const LanguageBar = () => {
  const langauges = [
    { language: "English", code: "en" },
    { language: "हिंदी", code: "hi" },
    { language: "کٲشُر", code: "ks" },
    { language: "اردو", code: "ur" },
  ]


  const { homePageData } = useLandingStore((state) => state);
  const { language, setLanguage } = useLangugaeStore((state) => state);

  const resetLangugae = (code: string) => {
    if (language !== code) {
      setLanguage(code);
    }
  };
  return (
    <div>
      <div className="h-6 relative bg-[#ECECEB] flex items-center lg:justify-start overflow-auto">
        <div className="ml-[8px] lg:ml-[161px] text-center text-[#797979] text-xs font-normal leading-none flex items-center justify-start">
          <div className="mx-[8px] text-gilroy-regular">
            {homePageData?.homePageData?.languageLable[0].text}
          </div>
          {/* {homePageData?.homePageData?.languageData?.length > 0 && (
            <>
              {homePageData?.homePageData?.languageData.map((languagename: any, idx: any) => {
                return (
                  <div
                    className={`mx-[8px] cursor-pointer ${
                      idx === 1 ? "text-gilroy-medium" : "text-gilroy-regular"
                    }`}
                    key={idx}
                  >
                    {languagename.text}
                  </div>
                );
              })}
            </>
          )} */}
          
          {langauges?.length > 0 && (
            <>
              {langauges?.map((languagename: any, idx: any) => {
                return (
                  <div
                    className={`mx-[8px] cursor-pointer ${
                      idx === 1 ? "text-gilroy-medium" : "text-gilroy-regular"
                    } ${languagename.code===language ? "bg-[#0B2551] text-white p-2" : ""}`}
                    key={idx}
                    onClick={() => resetLangugae(languagename.code)}
                  >
                    {languagename.language}
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
