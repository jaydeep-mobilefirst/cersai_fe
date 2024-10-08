import React from "react";
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
  name: string;
  uv: number;
  pv: number;
  amt: number;
}

interface DoubleBarChartProps {
  chartData: ChartData[];
}

const DoubleBarChart: React.FC<DoubleBarChartProps> = ({ chartData }) => {
  return (
    <div className="p-3 bg-[#E7F0FF] rounded-[24px]">
      <h1 className="font-[700] text-[20px] ml-2">Lorem ipsum</h1>
      <p className="mb-2 ml-2">
        Lorem ipsum dolor sit amet, consectutor adipiscing elit.
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          //   height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="1 1" vertical={false} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          {/* <Tooltip shared={false} /> */}
          {/* <Legend /> */}

          <Bar
            dataKey="pv"
            fill="#ffffff"
            radius={[10, 10, 10, 10]}
            barSize={18}
          />
          <Bar
            dataKey="uv"
            fill="#3E7AEA"
            radius={[10, 10, 10, 10]}
            barSize={18}
          />
          <Line type="monotone" dataKey="amt" stroke="red" strokeWidth={20} />
        </BarChart>
      </ResponsiveContainer>
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

export default DoubleBarChart;
