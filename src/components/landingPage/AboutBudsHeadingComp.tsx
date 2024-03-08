import {aboutBudsHeadingComp} from '../../utils/hardText/landingpageText';

const AboutBudsHeadingComp = () => {
  return (
    <div className="py-10 px-5 md:px-10 bg-[#EEF7EB] text-center md:text-start">
      <div className="flex flex-col justify-center items-center md:flex-start md:items-start">
        <h1 className="text-gilroy-medium text-black text-3xl md:text-4xl font-normal leading-10 md:leading-11">
          {aboutBudsHeadingComp[0].heading}
        </h1>
        <p className=" text-gilroy-regular text-base md:text-lg opacity-60 text-black font-normal leading-6 md:w-3/5 lg:w-3/6">
        {aboutBudsHeadingComp[1].description}
        </p>
      </div>
      <div className="mt-6 flex flex-col items-center md:flex-row justify-start md:items-center">
        <div className="mr-4 md:mr-6 mb-0 w-14 h-14 rounded-full bg-[#D8E5D3] flex justify-center items-center">
          <img src={aboutBudsHeadingComp[2].imageSrc} alt="icon" />
        </div>
        <p className="mt-2 md:mt-0 text-base text-gilroy-medium text-black font-normal leading-6">
        {aboutBudsHeadingComp[2].text}
        </p>
      </div>
      <div className="md:ml-[24px] w-[8px] h-[27px] bg-[#D8E5D3] hidden md:block" />
      <div className="mt-6 md:mt-0 md:mb-0 flex flex-col items-center md:flex-row md:items-center">
        <div className="mr-4 md:mr-6 w-14 h-14 rounded-full bg-[#D8E5D3] flex justify-center items-center">
          <img src={aboutBudsHeadingComp[3].imageSrc} alt="icon" className="w-auto h-auto" />
        </div>
        <p className="mt-2 md:mt-0 text-base text-gilroy-medium text-black font-normal leading-6">
        {aboutBudsHeadingComp[3].text}
        </p>
      </div>
      <div className="md:ml-[24px] w-[8px] h-[27px] bg-[#D8E5D3] hidden md:block" />
      {/* <div className="mt-6 md:mt-0 flex flex-col items-center md:flex-row md:items-center">
        <div className="mr-4 md:mr-6 w-14 h-14 rounded-full bg-[#D8E5D3] flex justify-center items-center">
          <img src={aboutBudsHeadingComp[4].imageSrc} alt="icon" className="w-[24.241px] h-auto" />
        </div>
        <p className="mt-2 text-gilroy-medium text-base md:text-lg text-black font-normal leading-6">
        {aboutBudsHeadingComp[4].text}
        </p>
      </div> */}
       <div className="mt-6 md:mt-0 flex flex-col items-center md:flex-row md:items-center">
                <div className='mr-4 md:mr-6 w-[56px] h-14 rounded-full bg-[#D8E5D3] flex flex-col justify-center items-center'>
                    <img src={aboutBudsHeadingComp[4].imageSrc} alt="icon"/>
                </div>
                <p className="mt-2 md:mt-0 text-gilroy-medium text-base text-black font-normal leading-6">No need to submit your KYC documents at any financial Institution if you have your CKYC identifier</p>
        </div>
      <div className="md:ml-[24px] w-[8px] h-[27px] bg-[#D8E5D3] hidden md:block" />
      <div className="mt-6 md:mt-0 flex flex-col items-center md:flex-row md:items-center">
        <div className="mr-4 md:mr-6 w-14 h-14 rounded-full bg-[#D8E5D3] flex justify-center items-center">
          <img src={aboutBudsHeadingComp[5].imageSrc} alt="icon" className="w-auto h-auto" />
        </div>
        <p className="mt-2 md:mt-0 text-gilroy-medium text-base text-black font-normal leading-6">
        {aboutBudsHeadingComp[5].text}
          <span className="text-[#52AE32] underline">{aboutBudsHeadingComp[5].link}</span>
        </p>
      </div>
    </div>
  );
};

export default AboutBudsHeadingComp;
