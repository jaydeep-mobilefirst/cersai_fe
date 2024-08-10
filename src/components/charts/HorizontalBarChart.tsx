import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import DownloadIcon from "../../assets/images/documentIcon.png";

const data = [
  { name: "At sea", value: 250 },
  { name: "Drifting", value: 300 },
  { name: "In port", value: 500 },
  { name: "In port", value: 600 },
];

const HorizontalBarChart = () => (
  <div className="w-[333px] bg-[#E7F0FF] p-3 rounded-[16px]">
    <div className="flex justify-between mb-2 ">
      <div className="text-gilroy-medium font-bold">Lorem ipsum</div>
      <button className="flex gap-[8px] text-[#2C6BB8] text-gilroy-semibold">
        Download <img src={DownloadIcon} alt="Download" />
      </button>
    </div>
    <p className="text-[14px] font-[400] mb-2">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </p>
    <div>
      <BarChart
        width={280}
        height={162}
        data={data}
        layout="vertical"
        margin={{ top: 0, right: 0, left: -55, bottom: 0 }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis
          type="number"
          tickLine={false}
          axisLine={false}
          ticks={[0, 100, 200, 300, 400, 500, 600]}
          opacity={0.8}
        />
        <YAxis
          dataKey="name"
          type="category"
          tickLine={false}
          axisLine={false}
          tick={{
            dx: 15,
            fill: "#000000",
            fontWeight: 500,
            opacity: 1,
            fontSize: 12,
            fontSizeAdjust: "true",
            textAnchor: "start",
          }}
        />
        {/* <Tooltip /> */}
        <Bar
          dataKey="value"
          fill="#819BC7"
          opacity={0.5}
          radius={[0, 6, 6, 0]}
          barSize={20}
        />
      </BarChart>
    </div>
  </div>
);

export default HorizontalBarChart;
