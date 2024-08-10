import React, { useEffect, useState } from "react";
import TaskTabs from "../../components/userFlow/mainPortal/TaskTabs";
import { Outlet } from "react-router-dom";
import TotalFoundationLineChart from "../../components/charts/TotalFoundationLineChart";
import HorizontalBarChart from "../../components/charts/HorizontalBarChart";
import DashboardTabsContainer from "../../components/schemeSearch/DashboardTabsContainer";
import DoubleBarChart from "../../components/charts/DoubleBarChart";
import { axiosTokenInstance } from "../../utils/axios";

type Props = {};

const DashboardCompetent = (props: Props) => {
  const [state, setState] = useState({
    totalDepositTakerRegistered: 0,
    totalDepositTakerApproved: 0,
    totalSchemeRegistered: 0,
    totalSchemeActive: 0,
    totalSchemeBanned: 0,
    totalSchemeUnderLetigation: 0,
  });
  const [loader, setLoader] = useState(false);
  const [isOpen, setIsOpen] = useState("");

  useEffect(() => {
    dashboardCaApi();
  }, []);

  const dashboardCaApi = () => {
    setLoader(true);
    axiosTokenInstance
      .get(`/dashboard?type=ca`,{
    })
      .then((response) => {
        console.log("response", response);
        const responseData = response.data.data;
        setState({
          totalDepositTakerRegistered: responseData[0].totalDepositTakerRegistered,
          totalDepositTakerApproved: responseData[1].totalDepositTakerApproved,
          totalSchemeRegistered: responseData[2].totalSchemeRegistered,
          totalSchemeActive: responseData[3].totalSchemeActive,
          totalSchemeBanned: responseData[4].totalSchemeBanned,
          totalSchemeUnderLetigation: responseData[5].totalSchemeUnderLetigation,
        });
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  };

  const tabsData = [
    { text: "Deposit Taker Registered", value: `${state.totalDepositTakerRegistered}`, bgColor: true },
    { text: "Total Deposit Taker Approved", value: `${state.totalDepositTakerApproved}`, bgColor: false },
    { text: "Total Schemes Registered", value: `${state.totalSchemeRegistered}`, bgColor: false },
    { text: "Total Active Schemes", value: `${state.totalSchemeActive}`, bgColor: true },
    { text: "Total Schemes Banned", value: `${state.totalSchemeBanned}`, bgColor: false },
    { text: "Total Schemes Under Litigation", value: `${state.totalSchemeUnderLetigation}`, bgColor: true },
  ];

  const chartData = [
    {
      name: "Jan",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Feb",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Mar",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Apr",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "May",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
  ];

  return (
    <div className="relative xl:ml-[20px]">
      <h1 className="text-[25px] font-[400] mb-3">Business Statistics</h1>
      <div className="mb-[20px]">
        <DashboardTabsContainer tabsData={tabsData} />
      </div>

      <div className="w-[100%] gap-[20px]  flex justify-between flex-wrap">
        <div className="w-[100%] sm:w-[48%] xl:w-[31.5%]">
          <DoubleBarChart chartData={chartData} />
        </div>
        <div className="w-[100%] sm:w-[48%] xl:w-[31.5%]">
          <TotalFoundationLineChart />
        </div>
        <div className="w-[100%] sm:w-[48%] xl:w-[31.5%]">
          <DoubleBarChart chartData={chartData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCompetent;
