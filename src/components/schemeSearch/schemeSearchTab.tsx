interface SchemeSearchTabProps {
  text: string;
  value: string;
  bgColor: boolean;
}
const SchemeSearchTab: React.FC<SchemeSearchTabProps> = ({
  text,
  value,
  bgColor,
}) => {
  return (
    <div
      className={`min-w-[170px] sm:min-w-[232px] lg:w-[298px] w-[18%] h-[100px] rounded-[12px] flex flex-col justify-between px-4 py-3 ${
        bgColor ? "bg-[#7398D7]" : "bg-[#ffffff]"
      }`}
    >
      <p className="max-w-[158px] text-[16px] text-[#000000] font-[600] text-gilroy-medium">
        {text}
      </p>
      <p className="text-[24px] text-[#000000] font-[600] text-gilroy-semibold self-end">
        {value}
      </p>
    </div>
  );
};

export default SchemeSearchTab;
