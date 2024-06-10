import SchemeSearchTab from "./schemeSearchTab";

const SchemeSearchTabsContainer = () => {
  const tabsData = [
    { text: "Scheme Registered", value: "1000k", bgColor: true },
    { text: "Banned", value: "1000k", bgColor: false },
    { text: "Active", value: "1000k", bgColor: true },
    { text: "Under litigation", value: "1000k", bgColor: false },
    {
      text: "Active - deposits not being taken",
      value: "1000k",
      bgColor: true,
    },
  ];

  return (
    <div className=" bg-[#E7F0FF] rounded-[24px] flex items-center gap-8 flex-wrap px-[26px] py-[24px] 2xl:justify-between">
      {tabsData.map((each, idx) => (
        <SchemeSearchTab
          key={idx}
          text={each.text}
          value={each.value}
          bgColor={each.bgColor}
        />
      ))}
    </div>
  );
};

export default SchemeSearchTabsContainer;
