import { queryResolutionComp } from "../../utils/hardText/landingpageText";

const QueryResolutionComp = () => {
  return (
    <div className="px-4 lg:px-[56px] lg:pb-[180px] query-bg-image">
      <h1 className="mt-8 px-3 md:pl-10 text-[#1D1D1B] text-2xl md:text-3xl font-normal font-Gilroy-Medium leading-normal">
        {queryResolutionComp[0].heading}
      </h1>
      <div className="mx-2 lg:ml-10 mt-6 md:mt-8 w-full h-auto md:w-auto md:h-40 lg:w-[80%] bg-[#EEF7EB] rounded-lg flex flex-col items-center md:flex-row md:justify-around md:items-center">
        <div className="flex flex-col justify-around items-center mt-6">
          <h1 className="text-gilroy-medium text-black text-2xl font-normal leading-tight md:text-4xl">
            {queryResolutionComp[1].date}
          </h1>
          <p className="text-gilroy-medium text-black text-base font-normal leading-normal">
            {queryResolutionComp[1].month}
          </p>
        </div>
        <div className="md:block hidden w-0 h-10 border-l-2 border-stone-300"></div>
        <div className="flex flex-col justify-around items-center mt-6 md:mt-0">
          <p className="text-gilroy-medium text-black text-base font-normal leading-normal">
            {queryResolutionComp[2].location}
          </p>
          <h1 className="text-gilroy-semibold text-black text-2xl font-normal leading-loose md:text-4xl">
            {queryResolutionComp[2].city}
          </h1>
        </div>
        <div className="md:block hidden w-0 h-10 border-l-2 border-stone-300"></div>
        <div className="md:w-[50%] px-6 flex flex-col justify-start mt-6 md:mt-0">
          <h1 className="text-gilroy-semibold text-[#52AE32] text-[24px] md:text-xl font-normal leading-snug">
            {queryResolutionComp[3].onlineHeading}
          </h1>
          <p className="text-gilroy-light text-black lg:w-[396px] text-base font-normal leading-normal">
            {queryResolutionComp[3].descritpion}
          </p>
        </div>
        <div className="my-6 md:my-0 w-auto md:w-auto h-10 px-4 py-2 bg-lime-700 rounded-lg justify-center items-center">
          <button className="text-white text-base font-Gilroy-SemiBold leading-normal">
            {queryResolutionComp[4].button}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QueryResolutionComp;
