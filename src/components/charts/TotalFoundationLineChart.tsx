// import { useEffect, useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
// } from "recharts";

// interface TotalFoundationLineChartProps {
//   intervalType: string;
// }

// const data = [
//   { name: "Jan", test: 0, test1: 120, test2: 20 },
//   { name: "Feb", test: 110, test1: 50, test2: 30 },
//   { name: "Mar", test: 120, test1: 10, test2: 100 },
//   { name: "Apr", test: 80, test1: 130, test2: 10 },
//   { name: "May", test: 108, test1: 10, test2: 20 },
//   { name: "Jun", test: 130, test1: 120, test2: 40 },
// ];

// const yearlyData = [
//   {
//     name: "2019",
//     totalRegistered: 120,
//     active: 115,
//     banned: 5,
//     underLitigation: 0,
//   },
//   {
//     name: "2020",
//     totalRegistered: 130,
//     active: 125,
//     banned: 5,
//     underLitigation: 0,
//   },
//   {
//     name: "2021",
//     totalRegistered: 140,
//     active: 130,
//     banned: 7,
//     underLitigation: 1,
//   },
//   {
//     name: "2022",
//     totalRegistered: 150,
//     active: 140,
//     banned: 6,
//     underLitigation: 2,
//   },
//   {
//     name: "2023",
//     totalRegistered: 160,
//     active: 150,
//     banned: 8,
//     underLitigation: 2,
//   },
//   {
//     name: "2024",
//     totalRegistered: 170,
//     active: 160,
//     banned: 9,
//     underLitigation: 3,
//   },
// ];

// const monthlyData = [
//   {
//     name: "Jan",
//     totalRegistered: 20,
//     active: 15,
//     banned: 5,
//     underLitigation: 0,
//   },
//   {
//     name: "Feb",
//     totalRegistered: 30,
//     active: 25,
//     banned: 5,
//     underLitigation: 0,
//   },
//   {
//     name: "Mar",
//     totalRegistered: 40,
//     active: 35,
//     banned: 5,
//     underLitigation: 0,
//   },
//   {
//     name: "Apr",
//     totalRegistered: 50,
//     active: 45,
//     banned: 5,
//     underLitigation: 0,
//   },
//   {
//     name: "May",
//     totalRegistered: 60,
//     active: 55,
//     banned: 4,
//     underLitigation: 1,
//   },
//   {
//     name: "Jun",
//     totalRegistered: 70,
//     active: 65,
//     banned: 3,
//     underLitigation: 2,
//   },
//   {
//     name: "Jul",
//     totalRegistered: 80,
//     active: 75,
//     banned: 2,
//     underLitigation: 3,
//   },
//   {
//     name: "Aug",
//     totalRegistered: 90,
//     active: 85,
//     banned: 5,
//     underLitigation: 0,
//   },
//   {
//     name: "Sep",
//     totalRegistered: 100,
//     active: 95,
//     banned: 1,
//     underLitigation: 4,
//   },
//   {
//     name: "Oct",
//     totalRegistered: 110,
//     active: 105,
//     banned: 0,
//     underLitigation: 5,
//   },
//   {
//     name: "Nov",
//     totalRegistered: 120,
//     active: 115,
//     banned: 5,
//     underLitigation: 0,
//   },
//   {
//     name: "Dec",
//     totalRegistered: 130,
//     active: 125,
//     banned: 5,
//     underLitigation: 0,
//   },
// ];

// const quarterlyData = [
//   {
//     name: "Q1",
//     totalRegistered: 90,
//     active: 75,
//     banned: 15,
//     underLitigation: 0,
//   },
//   {
//     name: "Q2",
//     totalRegistered: 180,
//     active: 165,
//     banned: 15,
//     underLitigation: 3,
//   },
//   {
//     name: "Q3",
//     totalRegistered: 270,
//     active: 255,
//     banned: 15,
//     underLitigation: 3,
//   },
//   {
//     name: "Q4",
//     totalRegistered: 360,
//     active: 345,
//     banned: 15,
//     underLitigation: 3,
//   },
// ];

// const getDataAndTicks = (intervalType: string) => {
//   switch (intervalType) {
//     case "annually":
//       return { data: yearlyData, ticks: [0, 50, 100, 150, 200] };
//     case "quarterly":
//       return { data: quarterlyData, ticks: [0, 100, 200, 300, 400] };
//     case "monthly":
//       return { data: monthlyData, ticks: [0, 20, 40, 60, 80, 100, 120, 140] };
//     default:
//       return { data: yearlyData, ticks: [0, 50, 100, 150, 200] }; // Default case
//   }
// };

// const TotalFoundationLineChart: React.FC<TotalFoundationLineChartProps> = (intervalType) => {

//   const [data, setData] = useState<typeof monthlyData>([]); // Define the type of data
//   const [yAxisTicks, setYAxisTicks] = useState<number[]>([]);

//   useEffect(() => {
//     const { data, ticks } = getDataAndTicks(intervalType);
//     setData(data);
//     setYAxisTicks(ticks);
//   }, [intervalType]);
//   return (
//     <div className="w-[100%] bg-[#E7F0FF] rounded-[24px] justify-center overflow-x-auto p-3">
//       <h1 className="font-[700] text-[20px] ml-2">Lorem ipsum</h1>
//       <p className="mb-2 ml-2">
//         Lorem ipsum dolor sit amet, consectutor adipiscing elit.
//       </p>
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={data} className="-ml-[30px]">
//           <Line
//             type="monotone"
//             dataKey="test"
//             stroke="#6B3E96"
//             strokeWidth={3}
//             dot={false}
//           />
//           <Line
//             type="monotone"
//             dataKey="test1"
//             stroke="#3D90D0"
//             strokeWidth={3}
//             dot={false}
//           />
//           <Line
//             type="monotone"
//             dataKey="test2"
//             stroke="#1C468E"
//             strokeWidth={3}
//             dot={false}
//           />
//           <CartesianGrid strokeDasharray="0 0" vertical={false} />
//           <Tooltip />
//           <XAxis
//             dataKey="name"
//             tickLine={false}
//             axisLine={false}
//             tick={{ dy: 12 }}
//           />
//           <YAxis
//             ticks={[0, 50, 100, 150, 200]}
//             axisLine={false}
//             tickLine={false}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//       <div className="flex items-center justify-between px-5">
//         <div className="flex gap-2 items-center">
//           <div className=" w-[15px] h-[15px] bg-[#6B3E96] rounded-[50%]"></div>
//           <p className="">Actual</p>
//         </div>
//         <div className="flex gap-2 items-center">
//           <div className=" w-[15px] h-[15px] bg-[#3D90D0] rounded-[50%]"></div>
//           <p className="">Estimated</p>
//         </div>
//         <div className="flex gap-2 items-center">
//           <div className=" w-[15px] h-[15px] bg-[#1C468E] rounded-[50%]"></div>
//           <p className="">Difference</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TotalFoundationLineChart;
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { getMonthAbbreviation } from "../../utils/commonFunction";
import { axiosTokenInstance } from "../../utils/axios";
import { useLocation } from "react-router-dom";

const colors = {
  totalRegistered: "#6B3E96",
  active: "#3D90D0",
  banned: "#1C468E",
  underLitigation: "#FF5733",
};
// Define types for chart data based on the API response
interface ChartData {
  month: any;
  year: number;
  active_count: number;
  banned_count: number;
  under_litigation_count: number;
  total_registered: number;
  quarter?: any;
}

interface TotalFoundationLineChartProps {
  intervalType: string;
}


const yearlyData = [
  {
    name: "2019",
    totalRegistered: 30,
    active: 10,
    banned: 15,
    underLitigation: 25,
  },
  {
    name: "2020",
    totalRegistered: 70,
    active: 10,
    banned: 25,
    underLitigation: 35,
  },
  {
    name: "2021",
    totalRegistered: 90,
    active: 35,
    banned: 25,
    underLitigation: 40,
  },
  {
    name: "2022",
    totalRegistered: 40,
    active: 30,
    banned: 6,
    underLitigation: 4,
  },
  {
    name: "2023",
    totalRegistered: 160,
    active: 150,
    banned: 8,
    underLitigation: 2,
  },
  {
    name: "2024",
    totalRegistered: 170,
    active: 160,
    banned: 9,
    underLitigation: 3,
  },
];

const monthlyData = [
  {
    name: "Jan",
    totalRegistered: 20,
    active: 15,
    banned: 5,
    underLitigation: 0,
  },
  {
    name: "Feb",
    totalRegistered: 30,
    active: 25,
    banned: 5,
    underLitigation: 0,
  },
  {
    name: "Mar",
    totalRegistered: 40,
    active: 35,
    banned: 5,
    underLitigation: 0,
  },
  {
    name: "Apr",
    totalRegistered: 50,
    active: 45,
    banned: 5,
    underLitigation: 0,
  },
  {
    name: "May",
    totalRegistered: 60,
    active: 55,
    banned: 4,
    underLitigation: 1,
  },
  {
    name: "Jun",
    totalRegistered: 70,
    active: 65,
    banned: 3,
    underLitigation: 2,
  },
  {
    name: "Jul",
    totalRegistered: 80,
    active: 75,
    banned: 2,
    underLitigation: 3,
  },
  {
    name: "Aug",
    totalRegistered: 90,
    active: 85,
    banned: 5,
    underLitigation: 0,
  },
  {
    name: "Sep",
    totalRegistered: 100,
    active: 95,
    banned: 1,
    underLitigation: 4,
  },
  {
    name: "Oct",
    totalRegistered: 110,
    active: 105,
    banned: 0,
    underLitigation: 5,
  },
  {
    name: "Nov",
    totalRegistered: 120,
    active: 115,
    banned: 5,
    underLitigation: 0,
  },
  {
    name: "Dec",
    totalRegistered: 130,
    active: 125,
    banned: 5,
    underLitigation: 0,
  },
];

const quarterlyData = [
  {
    name: "Q1",
    totalRegistered: 90,
    active: 75,
    banned: 15,
    underLitigation: 0,
  },
  {
    name: "Q2",
    totalRegistered: 180,
    active: 165,
    banned: 15,
    underLitigation: 3,
  },
  {
    name: "Q3",
    totalRegistered: 270,
    active: 255,
    banned: 15,
    underLitigation: 3,
  },
  {
    name: "Q4",
    totalRegistered: 360,
    active: 345,
    banned: 15,
    underLitigation: 3,
  },
];

// const getDataAndTicks = (intervalType: string) => {

//   switch (intervalType) {
//     case "annually":
//       return { data: yearlyData, ticks: [0, 50, 100, 150, 200] };
//     case "quarterly":
//       return { data: quarterlyData, ticks: [0, 100, 200, 300, 400] };
//     case "monthly":
//       return { data: monthlyData, ticks: [0, 20, 40, 60, 80, 100, 120, 140] };
//     default:
//       return { data: yearlyData, ticks: [0, 50, 100, 150, 200] };
//   }
// };

const getDataAndTicks = (data: ChartData[], intervalType: string) => {
  let chartData: ChartData[] = [];
  let ticks: number[] = [];

  switch (intervalType) {
    case "year":
      chartData = data.map((item) => ({
        month: item.month, // provide default values if necessary
        year: item.year,
        active_count: item.active_count,
        banned_count: item.banned_count,
        under_litigation_count: item.under_litigation_count,
        total_registered: item.active_count+item.banned_count+item.under_litigation_count
        // Add properties with default or computed values
      }));
      ticks = [0, 20, 40, 60, 80,100,120];
      break;
    case "quarter":
      chartData = data.map((item) => ({
        month: 0, // Default value or computation
        year: item.year,
        quarter: "Q"+item.quarter+`-${item.year.toString().slice(-2)}` ,
        active_count: item.active_count,
        banned_count: item.banned_count,
        under_litigation_count: item.under_litigation_count,
        total_registered: item.active_count+item.banned_count+item.under_litigation_count
        // Add properties with default or computed values
      }));
      ticks = [0, 20, 40, 60, 80,100,120];
      break;
    case "month":
      chartData = data.map((item) => ({
        month: getMonthAbbreviation(item.month)+`-${item.year.toString().slice(-2)}`,
        year: item.year,
        active_count: item.active_count,
        banned_count: item.banned_count,
        under_litigation_count: item.under_litigation_count,
        total_registered: item.active_count+item.banned_count+item.under_litigation_count
        // Add properties with default or computed values
      }));
      ticks = [0, 20, 40, 60, 80,100,120];
      break;
    default:
      chartData = [];
      ticks = [];
      break;
  }

  return { data: chartData, ticks };
};
interface ChartDataItem {
  year: number;
  month?: number; // Optional for monthly intervals
  quarter?: number; // Optional for quarterly intervals
  value: number; // Replace with your actual fields
}

const TotalFoundationLineChart: React.FC<TotalFoundationLineChartProps> = ({
  intervalType,
}) => {
  const [chartData, setChartData] = useState<typeof monthlyData>([]);
  const [yAxisTicks, setYAxisTicks] = useState<number[]>([]);
  const [data, setData] = useState<ChartData[]>([]);
  const location = useLocation(); // Get location from useLocation hook
  const currentPath = location.pathname;
  const sortData = (data: ChartDataItem[], intervalType: string): ChartDataItem[] => {
    return data.sort((a, b) => {
      switch (intervalType) {
        case 'month':
          if (a.year === b.year) {
            return (a.month ?? 0) - (b.month ?? 0); // Ascending order
          }
          return a.year - b.year; // Ascending order
        case 'quarter':
          if (a.year === b.year) {
            return (a.quarter ?? 0) - (b.quarter ?? 0); // Ascending order
          }
          return a.year - b.year; // Ascending order
        case 'year':
          return a.year - b.year; // Ascending order
        default:
          return 0; // No sorting if the interval type is unknown
      }
    });
  };

  

  const dashboardLineGraphApi = () => {
    const masterId = sessionStorage.getItem('masterId')
    const entityUniqueId = sessionStorage.getItem('entityUniqueId')
    const apiUrl = currentPath.includes('rg/dashboard') ? `dashboard/regulatorscheme?filter=${intervalType}&regulatorId=${masterId}`:currentPath.includes('dt/dashboard')
  ? `dashboard/deposittakerscheme?filter=${intervalType}&depositTakerId=${entityUniqueId}`:`dashboard/adminScheme?filter=${intervalType}`
    
    axiosTokenInstance
      .get(apiUrl, {})
      .then((response) => {
        const sortedData = sortData(response?.data?.data, intervalType);
        
        const { data, ticks } = getDataAndTicks(response?.data?.data, intervalType);
        setData(data);
        setYAxisTicks(ticks);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    dashboardLineGraphApi();
  }, [intervalType]);
  
  const formatTooltipLabel = (value:any, name:any) => {
    // Replace underscores with spaces and capitalize the first letter of each word
    const formattedName = name.replace(/_/g, ' ').replace(/\b\w/g, (char:any) => char.toUpperCase());
    return [value, formattedName];
  };

  return (
    <div className="w-[100%] bg-[#E7F0FF] rounded-[24px] justify-center overflow-x-auto p-3">
      <h1 className="font-[700] text-[20px] ml-2">Scheme Trends over {intervalType}s</h1>
      <p className="mb-2 ml-2">&nbsp;</p>
      {/* <div className="min-w-[400px] md:w-[100%]">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} className="-ml-[30px]">
            <Line
              type="monotone"
              dataKey="totalRegistered"
              stroke="#6B3E96"
              strokeWidth={3}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="active"
              stroke="#3D90D0"
              strokeWidth={3}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="banned"
              stroke="#1C468E"
              strokeWidth={3}
              dot={false}
            />
            <CartesianGrid strokeDasharray="0 0" vertical={false} />
            <Tooltip />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{ dy: 12 }}
              className={`${
                intervalType === "monthly"
                  ? "text-[12px] md:text-[14px]"
                  : "md:text-[12px]"
              }`}
              interval={0}
              padding={{ right: 15 }}
            />
            <YAxis ticks={yAxisTicks} axisLine={false} tickLine={false} />
          </LineChart>
        </ResponsiveContainer>
      </div> */}
      
      <div className="min-w-[600px] md:w-[100%]">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} className="-ml-[30px]">
          <Line
            type="monotone"
            dataKey="total_registered"
            stroke={colors.totalRegistered}
            strokeWidth={3}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="active_count"
            stroke={colors.active}
            strokeWidth={3}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="banned_count"
            stroke={colors.banned}
            strokeWidth={3}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="under_litigation_count"
            stroke={colors.underLitigation}
            strokeWidth={3}
            dot={false}
          />
          <CartesianGrid strokeDasharray="0 0" vertical={false} />
          <Tooltip formatter={formatTooltipLabel}/>
          <XAxis
            dataKey={intervalType}
            tickLine={false}
            axisLine={false}
            tick={{ dy: 12 }}
            className={`${intervalType==="month"?"text-[12px] md:text-[14px]":"md:text-[12px]"}`}
            interval={0}
            padding={{ right: 25 }} 
          />
          <YAxis axisLine={false} tickLine={false} domain={['auto', 'auto']}/>
        </LineChart>
      </ResponsiveContainer>
      </div>
      {/* <div className="flex items-center justify-between px-5">
        <div className="flex gap-2 items-center">
          <div className=" w-[15px] h-[15px] bg-[#6B3E96] rounded-[50%]"></div>
          <p>Actual</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className=" w-[15px] h-[15px] bg-[#3D90D0] rounded-[50%]"></div>
          <p>Active</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className=" w-[15px] h-[15px] bg-[#1C468E] rounded-[50%]"></div>
          <p>Banned</p>
        </div>
      </div> */}
      
      <div className="flex items-center justify-between px-3  gap-x-1">
        <div className="flex gap-2 items-center">
          <div
            className="w-[15px] h-[15px] rounded-[50%]"
            style={{ backgroundColor: colors.totalRegistered }}
          ></div>
          <p>Registered</p>
        </div>
        <div className="flex gap-2 items-center">
          <div
            className="w-[15px] h-[15px] rounded-[50%]"
            style={{ backgroundColor: colors.active }}
          ></div>
          <p>Active</p>
        </div>
        <div className="flex gap-2 items-center">
          <div
            className="w-[15px] h-[15px] rounded-[50%]"
            style={{ backgroundColor: colors.banned }}
          ></div>
          <p>Banned</p>
        </div>
        <div className="flex gap-2 items-center">
          <div
            className="w-[15px] h-[15px] rounded-[50%]"
            style={{ backgroundColor: colors.underLitigation }}
          ></div>
          <p>Litigation</p>
        </div>
      </div>
    </div>
  );
};

export default TotalFoundationLineChart;
