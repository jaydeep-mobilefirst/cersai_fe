import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

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
    <div className="w-[50%] bg-white rounded-2xl justify-center overflow-x-auto p-5">
      <div className="w-[154px] text-black text-[14px] font-[500] text-gilroy-medium leading-tight mb-5">
        Total Foundation Registered
      </div>

      <div>
        <LineChart width={418} height={184} data={data} className="-ml-[30px]">
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
      </div>
    </div>
  );
};

export default TotalFoundationLineChart;
