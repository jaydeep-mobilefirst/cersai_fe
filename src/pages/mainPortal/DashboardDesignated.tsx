import React from "react";
import TaskTabs from "../../components/userFlow/mainPortal/TaskTabs";
import { Outlet } from "react-router-dom";
import TotalFoundationLineChart from "../../components/charts/TotalFoundationLineChart";
import HorizontalBarChart from "../../components/charts/HorizontalBarChart";
import DashboardTabsContainer from "../../components/schemeSearch/DashboardTabsContainer";
import DoubleBarChart from "../../components/charts/DoubleBarChart";

type Props = {};

const DashboardDesignated = (props: Props) => {
  const tabsData = [
    { text: "Deposite Taker Registered", value: "1000k", bgColor: true },
    { text: "Total Deposite Taker Approved", value: "1000k", bgColor: false },
    {
      text: "Total Schemes Banned By Authority",
      value: "1000k",
      bgColor: true,
    },
    {
      text: "Total Schemes Under Litigation post banned",
      value: "1000k",
      bgColor: false,
    },
    {
      text: "Total Schemes Registered",
      value: "1000k",
      bgColor: false,
    },
    {
      text: "Total Active Schemes",
      value: "1000k",
      bgColor: true,
    },
    {
      text: "Total schemes Banned",
      value: "1000k",
      bgColor: false,
    },
    {
      text: "Total schemes Under Litigation",
      value: "1000k",
      bgColor: true,
    },
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

export default DashboardDesignated;
