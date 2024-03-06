import React from "react";
import { languageData } from "../../utils/languageText";

const LanguageBar = () => {
  return (
    <div>
      <div className="w-screen h-6 relative bg-[#ECECEB] flex items-center lg:justify-start overflow-auto">
        <div className="ml-[8px] lg:ml-[161px] text-center text-[#797979] text-xs font-normal font-['Gilroy-Regular'] leading-none flex items-center justify-start">
          <div className="mx-[8px]">Language: </div>
          {languageData.map((languagename, idx) => {
            return (
              <div className="mx-[8px]" key={idx}>
                {languagename}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LanguageBar;
