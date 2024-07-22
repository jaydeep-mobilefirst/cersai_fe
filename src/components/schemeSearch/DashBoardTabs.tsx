interface DashboardTabProps {
  text: string;
  value: string;
  bgColor: boolean;
}
const DashboardTab: React.FC<DashboardTabProps> = ({
  text,
  value,
  bgColor,
}) => {
  return (
    <div
      className={`w-[100%] min-w-[170px] sm:min-w-[248px] sm:w-[47%] md:w-[48%] lg:w-[47%] xl:w-[31%] 2xl:w-[23%] h-[120px] rounded-[12px] flex flex-col justify-between px-3 py-2 ${
        bgColor ? "bg-[#7398D7]" : "bg-[#ffffff]"
      }`}
    >
      <p className="xl:w-[80%] text-[16px] text-[#000000] font-[600] text-gilroy-medium">
        {text}
      </p>
      <p className="text-[24px] text-[#000000] font-[600] text-gilroy-semibold self-end">
        {value}
      </p>
    </div>
  );
};

export default DashboardTab;
