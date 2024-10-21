import React, { useState, useEffect } from "react";
import SchemeSearchTab from "./schemeSearchTab";
import { axiosTraceIdInstance } from "../../utils/axios";

interface TabData {
  text: string;
  value: string;
  bgColor: boolean;
}

const SchemeSearchTabsContainer: React.FC = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    stateData();
  }, []);

  const stateData = () => {
    axiosTraceIdInstance
      .post("/websitecontent/stats", {
        keylist: [
          "totalSchemeUnderLetigation",
          "totalSchemeRegistered",
          "totalSchemeBanned",
          "totalSchemeActive",
        ],
      })
      .then((response) => {
        setData(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(data);

  const tabsData: TabData[] = [
    {
      text: "Scheme Registered",
      value: data[1]?.totalSchemeRegistered,
      bgColor: true,
    },
    { text: "Banned", value: data[2]?.totalSchemeBanned, bgColor: false },
    { text: "Active + Active-Deposit not being taken", value: data[3]?.totalSchemeActive, bgColor: true },
    {
      text: "Under litigation",
      value: data[0]?.totalSchemeUnderLetigation,
      bgColor: false,
    }
  ];

  return (
    <div className='min-h-40 bg-[#E7F0FF] rounded-[24px] flex items-center gap-8 flex-wrap px-[26px] py-[24px] 2xl:justify-between'>
      {tabsData.map((each, idx) => (
        <SchemeSearchTab
          key={idx}
          text={each.text}
          value={each.value}
          bgColor={each.bgColor}
        />
      ))}
    </div>
  );
};

export default SchemeSearchTabsContainer;
