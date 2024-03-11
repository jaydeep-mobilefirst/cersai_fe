import {aboutBudsHeadingComp,aboutBudsHeadingComp1} from '../../utils/hardText/landingpageText';

const AboutBudsHeadingComp = () => {
  return (
    <div className="py-10 px-5 md:px-10 bg-[#EEF7EB] text-center md:text-start">
      <div className="flex flex-col justify-center items-center md:flex-start md:items-start">
        <h1 className="text-gilroy-medium text-black text-3xl md:text-4xl font-normal leading-10 md:leading-11">
          {aboutBudsHeadingComp[0].heading}
        </h1>
        <p className="mb-6 text-gilroy-regular text-base md:text-lg opacity-60 text-black font-normal leading-6 md:w-3/5 lg:w-3/6">
        {aboutBudsHeadingComp[1].description}
        </p>
      </div>
      <>{
        aboutBudsHeadingComp1.map((item)=>{
          if (item.text !== "To know more login to "){
            return (
              <>
              <div className=" flex flex-col items-center md:flex-row justify-start md:items-center">
                <div className="mr-4 md:mr-6 mb-0 w-14 h-14 rounded-full bg-[#D8E5D3] flex justify-center items-center">
                  <img src={item.imageSrc} alt="icon" />
                </div>
                <p className="mt-2 md:mt-0 text-base text-gilroy-medium text-black font-normal leading-6">
                {item.text}
                </p>
              </div>
              <div className="md:ml-[24px] w-[8px] h-[27px] bg-[#D8E5D3] hidden md:block" />
              </>
            )
          }
          return (
            <div className=" flex flex-col items-center md:flex-row justify-start md:items-center">
              <div className="mr-4 md:mr-6 mb-0 w-14 h-14 rounded-full bg-[#D8E5D3] flex justify-center items-center">
                <img src={item.imageSrc} alt="icon" />
              </div>
              <p className="mt-2 md:mt-0 text-base text-gilroy-medium text-black font-normal leading-6">
              {item.text}
              </p>
            </div>

          )
        })
      }

      </>
     
    </div>
  );
};

export default AboutBudsHeadingComp;
