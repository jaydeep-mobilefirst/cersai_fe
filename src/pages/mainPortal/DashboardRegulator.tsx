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
  const [timeframe, setTimeframe] = useState('annually'); // Default to 'annually'
  const timeframes = ['annually', 'quarterly', 'monthly']; // List of timeframes
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
  

  const handleRadioChange = (event:any) => {
    setTimeframe(event.target.value);
  };
  const chartData = [
    { name: "Reg 08", clean: 70, others: 30 },
    { name: "Reg 03", clean: 60, others: 40 },
    { name: "Reg 06", clean: 40, others: 60 },
    { name: "Reg 07", clean: 100, others: 90 },
    { name: "Reg 01", clean: 90, others: 10 },
    { name: "Reg 09", clean: 90, others: 10 },
    { name: "Reg 02", clean: 80, others: 20 },
    { name: "Reg 05", clean: 20, others: 80 },
    { name: "Reg 04", clean: 10, others: 90 },
  ];
  const quarterlyChartData = [
    { name: "Q1", clean: 85, others: 15 },
    { name: "Q2", clean: 78, others: 22 },
    { name: "Q3", clean: 89, others: 11 },
    { name: "Q4", clean: 92, others: 80 },
  ];
  const annualChartData = [
    { name: "2023", clean: 86, others: 14 },
    { name: "2022", clean: 81, others: 19 },
    { name: "2021", clean: 88, others: 12 },
    { name: "2020", clean: 86, others: 14 },
    { name: "2019", clean: 81, others: 19 },
  ];

  return (
    <div className="relative xl:ml-[20px]">
      <h1 className="text-[25px] font-[400] mb-3">Business Statistics</h1>
      <div className="mb-[20px]">
        <DashboardTabsContainer tabsData={tabsData} />
      </div>

      <div className="w-[100%] gap-[20px]  flex justify-between flex-wrap">
        <div className="w-[100%] sm:w-[48%] md:order-1">
          <DoubleBarChart chartData={chartData.slice(0,5)} title="Bottom 5 Regulator" description="represent % deposit taker with all banned and under litigation schemes"/>
        </div>
        <div className="w-[100%] sm:w-[48%] md:order-1">
          <DoubleBarChart chartData={chartData.slice(-5)} title="Bottom 5 Regulator" description="represent % deposit taker with all banned and under litigation schemes"/>
        </div>
      </div>
      <div>
        
      
      <div className="mb-[20px] flex gap-[15px] mt-4" >
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
        <div className="w-[100%] sm:w-[48%]  md:w-[100%] md:order-2">
          <TotalFoundationLineChart intervalType={timeframe}/>
        </div>
      </div>
    </div>
  );
};

export default DashboardRegulator;
