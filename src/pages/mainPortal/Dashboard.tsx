import React, { useEffect, useState } from "react";
import TaskTabs from "../../components/userFlow/mainPortal/TaskTabs";
import { Outlet } from "react-router-dom";
import TotalFoundationLineChart from "../../components/charts/TotalFoundationLineChart";
import HorizontalBarChart from "../../components/charts/HorizontalBarChart";
import DashboardTabsContainer from "../../components/schemeSearch/DashboardTabsContainer";
import DoubleBarChart from "../../components/charts/DoubleBarChart";
import { axiosTokenInstance } from "../../utils/axios";

type Props = {};

const Dashboard = (props: Props) => {
  const [loader, setLoader] = useState(false);
  const [timeframe, setTimeframe] = useState('annually'); // Default to 'annually'
  const timeframes = ['annually', 'quarterly', 'monthly']; // List of timeframes
  // const getAllValues = () => {
  //   setLoader(true);
  //   // setHomePageData(data.data.content)

  //   axiosTokenInstance
  //     .get(`/dashboard?type=dt`, {})
  //     .then((response: any) => {
  //       console.log("response", response);
  //       setLoader(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setLoader(false);
  //     });
  // };
  // useEffect(() => {
  //   getAllValues();
  // }, []);

  // const tabsData = [
  //   { text: "Total Schemes Registered", value: "1000k", bgColor: true },
  //   {
  //     text: "Total Active Schemes",
  //     value: "1000k",
  //     bgColor: true,
  //   },
  //   { text: "Total Schemes Banned", value: "1000k", bgColor: false },
  //   {
  //     text: "Total Schemes Under Litigation",
  //     value: "1000k",
  //     bgColor: true,
  //   },
  // ];
  const [tabsData, setTabsData] = useState<any>([]);

  const getAllValues = () => {
    setLoader(true);

    axiosTokenInstance
      .get(`/dashboard?type=dt`, {})
      .then((response: any) => {
        // console.log("response", response?.data?.data);

        // Mapping response data to the corresponding tabsData
        const updatedTabsData = [
          {
            text: "Total Schemes Registered",
            value: response?.data?.data[0].totalSchemeRegistered.toString(),
            bgColor: true,
          },
          {
            text: "Total Active + Active-Deposit not being taken Schemes",
            value: response?.data?.data[1].totalSchemeActive.toString(),
            bgColor: true,
          },
          {
            text: "Total Schemes Banned",
            value: response?.data?.data[2].totalSchemeBanned.toString(),
            bgColor: false,
          },
          {
            text: "Total Schemes Under Litigation",
            value:
              response?.data?.data[3].totalSchemeUnderLetigation.toString(),
            bgColor: true,
          },
        ];

        // Update the state with the new data
        setTabsData(updatedTabsData);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  };

  useEffect(() => {
    getAllValues();
  }, []);

  const handleRadioChange = (event:any) => {
    setTimeframe(event.target.value);
  };
  // Mapping the selected timeframe to the correct interval type
const getIntervalType = (timeframe: string) => {
    switch (timeframe) {
      case "annually":
        return "year";
      case "quarterly":
        return "quarter";
      case "monthly":
        return "month";
      default:
        return "year";
    }
  };

  return (
    <div className="relative xl:ml-[20px]">
      <h1 className="text-[25px] font-[400] mb-3">Business Statistics</h1>
      <div className="mb-[20px]">
        <DashboardTabsContainer tabsData={tabsData} />
      </div>
            <div className="mb-[20px] flex gap-[15px]">
              {timeframes.map((time) => (
                <label key={time} className="flex items-center">
                  <input
                    type="radio"
                    name="timeframe"
                    value={time}
                    checked={timeframe === time}
                    onChange={handleRadioChange}
                  />
                  <span className="ml-[8px] capitalize">{time}</span>
                </label>
              ))}
            </div>

      <div className="w-[100%] gap-[20px]  flex justify-between flex-wrap">
        {/* <div className="w-[100%] sm:w-[48%] xl:w-[31.5%]">
          <DoubleBarChart />
        </div> */}
        <div className="w-[100%] sm:w-[50%]  md:w-[100%]">
          <TotalFoundationLineChart intervalType={getIntervalType(timeframe)}/>
        </div>
        {/* <div className="w-[100%] sm:w-[48%] xl:w-[31.5%]">
          <DoubleBarChart />
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
