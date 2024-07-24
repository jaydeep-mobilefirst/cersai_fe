import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Jan", test: 0, test1: 120, test2: 20 },
  { name: "Feb", test: 110, test1: 50, test2: 30 },
  { name: "Mar", test: 120, test1: 10, test2: 100 },
  { name: "Apr", test: 80, test1: 130, test2: 10 },
  { name: "May", test: 108, test1: 10, test2: 20 },
  { name: "Jun", test: 130, test1: 120, test2: 40 },
];

const TotalFoundationLineChart: React.FC = () => {
  return (
    <div className="w-[100%] bg-[#E7F0FF] rounded-[24px] justify-center overflow-x-auto p-3">
      <h1 className="font-[700] text-[20px] ml-2">Lorem ipsum</h1>
      <p className="mb-2 ml-2">
        Lorem ipsum dolor sit amet, consectutor adipiscing elit.
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} className="-ml-[30px]">
          <Line
            type="monotone"
            dataKey="test"
            stroke="#6B3E96"
            strokeWidth={3}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="test1"
            stroke="#3D90D0"
            strokeWidth={3}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="test2"
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
          />
          <YAxis
            ticks={[0, 50, 100, 150, 200]}
            axisLine={false}
            tickLine={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-between px-5">
        <div className="flex gap-2 items-center">
          <div className=" w-[15px] h-[15px] bg-[#6B3E96] rounded-[50%]"></div>
          <p className="">Actual</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className=" w-[15px] h-[15px] bg-[#3D90D0] rounded-[50%]"></div>
          <p className="">Estimated</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className=" w-[15px] h-[15px] bg-[#1C468E] rounded-[50%]"></div>
          <p className="">Difference</p>
        </div>
      </div>
    </div>
  );
};

export default TotalFoundationLineChart;
