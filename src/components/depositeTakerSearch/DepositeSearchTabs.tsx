import React, {useState, useEffect} from "react";
import DepositeSearchTab from "./DepositeSearchTab";
import { axiosTraceIdInstance } from "../../utils/axios";

interface TabData {
  text: string;
  value: string;
  bgColor: boolean;
}

const DepositeSearchTabsContainer: React.FC = () => {
const [data, setData] = useState<any>([])

useEffect(() => {
  stateData()
},[])

  const stateData = () => {
    axiosTraceIdInstance.post("/websitecontent/stats", {
      keylist: [
        "totalDepositTakerRegistered",
        "totalDepositTakerApproved",
        "totalDepositTakerPending",
        "totalDepositTakerBanned",
      ],
    }).then((response)=>{
      setData(response?.data?.data)
    }).catch((error)=>{
      console.log(error)
    })
  };

  const tabsData: TabData[] = [
    { text: "Deposit taker Registered", value: data[0]?.totalDepositTakerRegistered, bgColor: true },
    { text: "Banned", value: data[3]?.totalDepositTakerBanned, bgColor: false },
    { text: "Active", value: data[1]?.totalDepositTakerApproved, bgColor: true },
    { text: "Pending", value: data[2]?.totalDepositTakerPending, bgColor: false },
  ];

  return (
    <div className="w-[100%] bg-[#E7F0FF] rounded-[24px] flex items-center gap-8 flex-wrap px-[24px] py-[24px] 2xl:justify-between">
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
