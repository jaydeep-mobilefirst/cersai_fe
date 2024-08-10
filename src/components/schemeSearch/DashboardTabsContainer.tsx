import DashboardTab from "./DashBoardTabs";

interface TabData {
  text: string;
  value: string;
  bgColor: boolean;
}

interface DashboardTabsContainerProps {
  tabsData: TabData[];
}

const DashboardTabsContainer: React.FC<DashboardTabsContainerProps> = ({
  tabsData,
}) => {
  return (
    <div className="w-[100%] bg-[#E7F0FF] rounded-[24px] flex items-center gap-7 flex-wrap px-[26px] py-[24px]">
      {tabsData.map((each, idx) => (
        <DashboardTab
          key={idx}
          text={each.text}
          value={each.value}
          bgColor={each.bgColor}
        />
      ))}
    </div>
  );
};

export default DashboardTabsContainer;
