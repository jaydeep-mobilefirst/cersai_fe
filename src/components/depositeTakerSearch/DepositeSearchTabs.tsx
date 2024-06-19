import React from "react";
import DepositeSearchTab from "./DepositeSearchTab";

interface TabData {
  text: string;
  value: string;
  bgColor: boolean;
}

const DepositeSearchTabsContainer: React.FC = () => {
  const tabsData: TabData[] = [
    { text: "Deposit taker Registered", value: "1000k", bgColor: true },
    { text: "Banned", value: "1000k", bgColor: false },
    { text: "Active", value: "1000k", bgColor: true },
  ];

  return (
    <div className="w-[100%] lg:w-[88%] xl:w-[61%] 2xl:w-[57%] bg-[#E7F0FF] rounded-[24px] flex items-center gap-8 flex-wrap px-[24px] py-[24px]">
      {tabsData.map((each, idx) => (
        <DepositeSearchTab
          key={idx}
          text={each.text}
          value={each.value}
          bgColor={each.bgColor}
        />
      ))}
    </div>
  );
};

export default DepositeSearchTabsContainer;
