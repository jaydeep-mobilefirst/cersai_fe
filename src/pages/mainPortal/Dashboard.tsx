import React from "react";
import TaskTabs from "../../components/userFlow/mainPortal/TaskTabs";
import { Outlet } from "react-router-dom";
import TotalFoundationLineChart from "../../components/charts/TotalFoundationLineChart";
import HorizontalBarChart from "../../components/charts/HorizontalBarChart";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div className="relative xl:ml-[20px]">
      <h1 className="text-[20px] font-[700] mb-3">Dashboard</h1>
      <div className="w-[100%] bg-[#E7F0FF] rounded-[24px] p-[24px]">
        <TotalFoundationLineChart />
      </div>
      <div className="mt-5">
        <HorizontalBarChart />
      </div>
    </div>
  );
};

export default Dashboard;
