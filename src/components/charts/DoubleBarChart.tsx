// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   Line,
//   ResponsiveContainer,
// } from "recharts";

// interface ChartData {
//   name: string;
//   uv: number;
//   pv: number;
//   amt: number;
// }

// interface DoubleBarChartProps {
//   chartData: ChartData[];
// }

// const DoubleBarChart: React.FC<DoubleBarChartProps> = ({ chartData }) => {
//   return (
//     <div className="p-3 bg-[#E7F0FF] rounded-[24px]">
//       <h1 className="font-[700] text-[20px] ml-2">Lorem ipsum</h1>
//       <p className="mb-2 ml-2">
//         Lorem ipsum dolor sit amet, consectutor adipiscing elit.
//       </p>
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart
//           //   height={300}
//           data={chartData}
//           margin={{
//             top: 5,
//             right: 30,
//             left: 0,
//             bottom: 5,
//           }}
//         >
//           <CartesianGrid strokeDasharray="1 1" vertical={false} />
//           <XAxis dataKey="name" axisLine={false} tickLine={false} />
//           <YAxis axisLine={false} tickLine={false} />
//           {/* <Tooltip shared={false} /> */}
//           {/* <Legend /> */}

//           <Bar
//             dataKey="pv"
//             fill="#ffffff"
//             radius={[10, 10, 10, 10]}
//             barSize={18}
//           />
//           <Bar
//             dataKey="uv"
//             fill="#3E7AEA"
//             radius={[10, 10, 10, 10]}
//             barSize={18}
//           />
//           <Line type="monotone" dataKey="amt" stroke="red" strokeWidth={20} />
//         </BarChart>
//       </ResponsiveContainer>
//       <div className="flex items-center justify-center gap-6 px-5">
//         <div className="flex gap-2 items-center">
//           <div className=" w-[15px] h-[15px] bg-[#3E7AEA] rounded-[50%]"></div>
//           <p className="">Actual</p>
//         </div>
//         <div className="flex gap-2 items-center">
//           <div className=" w-[15px] h-[15px] bg-[#ffffff] rounded-[50%]"></div>
//           <p className="">Estimated</p>
//         </div>
//         {/* <div className="flex gap-2 items-center">
//           <div className=" w-[15px] h-[15px] bg-violet-500 rounded-[50%]"></div>
//           <p className="mb-3">Difference</p>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default DoubleBarChart;
import React from "react";
import { useLocation } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  regulatorId: string;
  active_count: number;
  non_active_count: number;
}

interface DoubleBarChartProps {
  chartData: ChartData[];
  title?: string;
  description?: string
}
const CustomTick = (props: any) => {
  const { x, y, payload } = props;
  const value = payload.value;

  // Function to split text into lines with a max of 10 characters per line
  const splitTextToLines = (text: string, maxLineLength: number) => {
    const words = text.split(' ');
    let lines: string[] = ['', '', '', ''];
    let currentLineIndex = 0;

    words.forEach((word) => {
      // Add words to the current line, if it exceeds maxLineLength move to the next line
      if ((lines[currentLineIndex] + word).length <= maxLineLength) {
        lines[currentLineIndex] += word + ' ';
      } else {
        currentLineIndex++;
        if (currentLineIndex < 4) {
          lines[currentLineIndex] = word + ' ';
        }
      }
    });

    // Trim spaces at the end of each line
    return lines.map(line => line.trim());
  };

  // Split text into lines with each line having max 10 characters
  const [firstLine, secondLine, thirdLine, fourthLine] = splitTextToLines(value, 10);

  return (
    <text x={x} y={y} dy={16} textAnchor="middle" fill="#666">
      {firstLine && <tspan x={x} dy="1em">{firstLine}</tspan>}
      {secondLine && <tspan x={x} dy="1.2em">{secondLine}</tspan>}
      {thirdLine && <tspan x={x} dy="1.2em">{thirdLine}</tspan>}
      {fourthLine && <tspan x={x} dy="1.2em">{fourthLine}</tspan>}
    </text>
  );
};

const NewDoubleBarChart: React.FC<DoubleBarChartProps> = ({ chartData, title, description }) => {
  const location = useLocation();
  
  return (
    <div className="p-3 bg-[#E7F0FF] rounded-[24px] overflow-x-auto xl:overflow-x-hidden">
      <h1 className="font-[700] text-[20px] ml-2">{title}</h1>
      <p className="mb-2 ml-2 min-h-[50px]">
       {description}
      </p>
      <div className="min-w-[500px] xl:min-w-full xl:overflow-x-auto">
      <ResponsiveContainer width="110%" height={300} className={`-ml-4`}>
        <BarChart
          //   height={300}
          data={chartData?.slice(0,5)}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 40, // Increase bottom margin for rotated labels
          }}
        >
          <CartesianGrid strokeDasharray="1 1" vertical={false} />
          <XAxis dataKey={location.pathname.includes('/rg/dashboard')?"uniqueId":"regulatorId"} axisLine={false} tickLine={false} 
            interval={0} // Show all labels
            className="text-[11px] md:text-[12px]"
            tick={<CustomTick />} 
            />
          <YAxis axisLine={false} tickLine={false} />
          {/* <Tooltip shared={false} /> */}
          {/* <Legend /> */}

          <Bar
            dataKey="active_count"
            fill="#ffffff"
            radius={[10, 10, 10, 10]}
            barSize={18}
          />
          <Bar
            dataKey="non_active_count"
            fill="#3E7AEA"
            radius={[10, 10, 10, 10]}
            barSize={18}
          />
          <Line type="monotone" dataKey="amt" stroke="red" strokeWidth={20} />
        </BarChart>
      </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-6 px-5">
        <div className="flex gap-2 items-center">
          <div className=" w-[15px] h-[15px] bg-[#3E7AEA] rounded-[50%]"></div>
          <p className="">Actual</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className=" w-[15px] h-[15px] bg-[#ffffff] rounded-[50%]"></div>
          <p className="">Estimated</p>
        </div>
        {/* <div className="flex gap-2 items-center">
          <div className=" w-[15px] h-[15px] bg-violet-500 rounded-[50%]"></div>
          <p className="mb-3">Difference</p>
        </div> */}
      </div>
    </div>
  );
};

export default NewDoubleBarChart;

