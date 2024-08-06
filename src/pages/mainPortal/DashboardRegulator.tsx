import React, { useEffect, useState } from "react";
import TaskTabs from "../../components/userFlow/mainPortal/TaskTabs";
import { Outlet } from "react-router-dom";
import TotalFoundationLineChart from "../../components/charts/TotalFoundationLineChart";
import HorizontalBarChart from "../../components/charts/HorizontalBarChart";
import DashboardTabsContainer from "../../components/schemeSearch/DashboardTabsContainer";
import DoubleBarChart from "../../components/charts/DoubleBarChart";
import { axiosTokenInstance } from "../../utils/axios";

type Props = {};

const DashboardRegulator = (props: Props) => {
  const [loader, setLoader] = useState(false);
  // const tabsData = [
  //   { text: "Deposite Taker Registered", value: "1000k", bgColor: true },
  //   { text: "Total Deposite Taker Approved", value: "1000k", bgColor: false },
  //   {
  //     text: "Deposite Taker Approval Pending with Regulator",
  //     value: "1000k",
  //     bgColor: true,
  //   },
  //   { text: "Total Schemes Registered", value: "1000k", bgColor: false },
  //   {
  //     text: "Total Schemes Banned",
  //     value: "1000k",
  //     bgColor: false,
  //   },
  //   {
  //     text: "Total Schemes Under Litigation",
  //     value: "1000k",
  //     bgColor: true,
  //   },
  // ];
  // const [tabsData, setTabsData] = useState([
  //   { text: "Deposite Taker Registered", value: "1000k", bgColor: true },
  //   { text: "Total Deposite Taker Approved", value: "1000k", bgColor: false },
  //   {
  //     text: "Deposite Taker Approval Pending with Regulator",
  //     value: "1000k",
  //     bgColor: true,
  //   },
  //   { text: "Total Schemes Registered", value: "1000k", bgColor: false },
  //   {
  //     text: "Total Schemes Banned",
  //     value: "1000k",
  //     bgColor: false,
  //   },
  //   {
  //     text: "Total Schemes Under Litigation",
  //     value: "1000k",
  //     bgColor: true,
  //   },
  // ]);

  const [tabsData, setTabsData] = useState<any>([]);

  const [loading, setLoading] = useState(false);

  const getAllValues = async () => {
    setLoading(true);
    try {
      const response = await axiosTokenInstance.get(`/dashboard?type=rg`);
      const data = response?.data?.data;

      // Check if the data is in the expected format
      if (Array.isArray(data) && data.length >= 6) {
        // Mapping response data to the corresponding tabsData
        const updatedTabsData = [
          {
            text: "Deposit Taker Registered",
            value: data[0]?.totalDepositTakerRegistered?.toString(),
            bgColor: true,
          },
          {
            text: "Total Deposit Taker Approved",
            value: data[1]?.totalDepositTakerApproved?.toString(),
            bgColor: false,
          },
          {
            text: "Deposit Taker Approval Pending with Regulator",
            value: data[2]?.totalDepositTakerPendingWithRegulator?.toString(),
            bgColor: true,
          },
          {
            text: "Total Schemes Registered",
            value: data[3]?.totalSchemeRegistered?.toString(),
            bgColor: false,
          },
          {
            text: "Total Schemes Banned",
            value: data[4]?.totalSchemeBanned?.toString(),
            bgColor: false,
          },
          {
            text: "Total Schemes Under Litigation",
            value: data[5]?.totalSchemeUnderLetigation?.toString(),
            bgColor: true,
          },
        ];

        // Update the state with the new data
        setTabsData(updatedTabsData);
      } else {
        console.error("Unexpected response data format", data);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllValues();
  }, []);

  const chartData = [
    {
      name: "Jan",
      uv: 4000,
      pv: 2400,
      amt: 2000,
    },
    {
      name: "Feb",
      uv: 3000,
      pv: 1398,
      amt: 1000,
    },
    {
      name: "Mar",
      uv: 2000,
      pv: 9800,
      amt: 2000,
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

export default DashboardRegulator;
