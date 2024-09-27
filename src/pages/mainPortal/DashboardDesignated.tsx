import React, { useEffect, useState } from "react";
import TaskTabs from "../../components/userFlow/mainPortal/TaskTabs";
import { Outlet } from "react-router-dom";
import TotalFoundationLineChart from "../../components/charts/TotalFoundationLineChart";
import HorizontalBarChart from "../../components/charts/HorizontalBarChart";
import DashboardTabsContainer from "../../components/schemeSearch/DashboardTabsContainer";
import DoubleBarChart from "../../components/charts/DoubleBarChart";
import { axiosTokenInstance } from "../../utils/axios";

type Props = {};
type DashboardChartTab = {
  top_5: {
    regulatorId: string;
    active_count: number;
    non_active_count: number;
  }[];
  bottom_5: {
    regulatorId: string;
    active_count: number;
    non_active_count: number;
  }[];
};

const DashboardDesignated = (props: Props) => {
  
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
  const [timeframe, setTimeframe] = useState('annually'); // Default to 'annually'
  const timeframes = ['annually', 'quarterly', 'monthly']; // List of timeframes
  const [dashBoardChartTabs, setDashboardChartData] = useState<DashboardChartTab | null>(null);

  useEffect(() => {
    dashboardCaApi();
    dashboardChartApi();
  }, []);

  const dashboardCaApi = () => {
    setLoader(true);
    axiosTokenInstance
      .get(`/dashboard?type=dc`,{
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

  const dashboardChartApi = () => {

    axiosTokenInstance
      .get(`/dashboard/admin`, {})
      .then((response) => {
        setDashboardChartData(response?.data?.data);
        console.log("response------", response?.data?.data);
        // setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        // setLoader(false);
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

  // const chartData = [
  //   {
  //     name: "Jan",
  //     uv: 4000,
  //     pv: 2400,
  //     amt: 2400,
  //   },
  //   {
  //     name: "Feb",
  //     uv: 3000,
  //     pv: 1398,
  //     amt: 2210,
  //   },
  //   {
  //     name: "Mar",
  //     uv: 2000,
  //     pv: 9800,
  //     amt: 2290,
  //   },
  //   {
  //     name: "Apr",
  //     uv: 2780,
  //     pv: 3908,
  //     amt: 2000,
  //   },
  //   {
  //     name: "May",
  //     uv: 1890,
  //     pv: 4800,
  //     amt: 2181,
  //   },
  // ];

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
  const chartDataquaterly = [
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

      <div className="w-[100%] gap-[20px]  flex justify-between flex-wrap">
        <div className="w-[100%] sm:w-[48%] ">
          <DoubleBarChart chartData={dashBoardChartTabs?.top_5 ?? []} title="Bottom 5 Regulator" description="represent % deposit taker with all banned and under litigation schemes"/>
        </div>
        <div className="w-[100%] sm:w-[48%] ">
          <DoubleBarChart chartData={dashBoardChartTabs?.bottom_5 ?? []} title="Bottom 5 Regulator" description="represent % deposit taker with all banned and under litigation schemes"/>
        </div>
      </div>
      <div>
        
      <div className="mb-[20px] flex gap-[15px] mt-4">
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
        <div className="w-[100%] sm:w-[48%] md:w-[100%] md:order-2">
          <TotalFoundationLineChart intervalType={getIntervalType(timeframe)}/>
        </div>
      </div>
    </div>
  );
};

export default DashboardDesignated;
