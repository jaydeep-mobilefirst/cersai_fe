import { latestNewsComp } from "../../utils/hardText/landingpageText";

const LatestNewsComp = () => {
  return (
    <div className="mb-4 p-3 flex flex-col items-center justify-center  md:flex-row md:items-center px-[24px] bg-[#E8ECF4] lg:h-[88px] rounded-lg">
      <div className="w-[100%] md:w-[40%] lg:w-[20%] xl:w-[15%]">
        <button className="text-white px-4 py-2 bg-[#1C468E] rounded-lg justify-center items-center gap-2 inline-flex text-gilroy-semibold italic">
          {latestNewsComp[0].button}:
        </button>
      </div>
      <p className="mt-2 md:mt-0 text-gilroy-mediumItalic ml-0 md:ml-[24px] text-[#1C468E] text-base font-normal leading-loose text-gilroy-semibold italic">
        {latestNewsComp[1].description}
      </p>
    </div>
  );
};
export default LatestNewsComp;