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
            text: "Total Active Schemes",
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

  return (
    <div className="relative xl:ml-[20px]">
      <h1 className="text-[25px] font-[400] mb-3">Business Statistics</h1>
      <div className="mb-[20px]">
        <DashboardTabsContainer tabsData={tabsData} />
      </div>

      <div className="w-[100%] gap-[20px]  flex justify-between flex-wrap">
        {/* <div className="w-[100%] sm:w-[48%] xl:w-[31.5%]">
          <DoubleBarChart />
        </div> */}
        <div className="w-[100%] sm:w-[48%] xl:w-[31.5%]">
          <TotalFoundationLineChart />
        </div>
        {/* <div className="w-[100%] sm:w-[48%] xl:w-[31.5%]">
          <DoubleBarChart />
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
