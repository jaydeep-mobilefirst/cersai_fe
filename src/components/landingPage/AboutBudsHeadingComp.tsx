import global from "../../assets/images/global.svg";
import link from "../../assets/images/link.svg";
import mobile from "../../assets/images/mobile.svg";
import shieldSearch from "../../assets/images/shieldSearch.svg";

// const AboutBudsHeadingComp =() =>{
//     return(
//         <div className="py-[80px] px-[78px] bg-[#EEF7EB]">
//             <div>
//                 <h1 className="text-gilroy-medium text-black text-[34px] font-normal leading-[37.40px]">About BUDS</h1>
//                 <p className="text-gilroy-regular md:w-[60%] lg:w-[40%] opacity-60 text-black text-base font-normal leading-normal">Central KYC Registry is a centralized repository of KYC records of customers in the financial sector with uniform.</p>
//             </div>
//             <div className="mt-[56px] flex md:flex-row md:items-center">
//                 <div className='mr-[24px] md:w-14 md:h-14 rounded-full bg-[#D8E5D3] flex flex-col justify-center items-center'>
//                     <img src={mobile} alt="icon"/>
//                 </div>
//                 <p className="text-zinc-800 text-base font-normal text-gilroy-medium leading-normal">Ask for your CKYC Identifier now and open account faster with reduced paper-work</p>
//             </div>
//             <div className="ml-[24px] w-2 h-[27px] bg-[#D8E5D3] hidden md:block" />
//             <div className="flex flex-row items-center">
//                 <div className='mr-[24px] w-14 h-14 rounded-full bg-[#D8E5D3] flex flex-col justify-center items-center'>
//                     <img src={link} alt="icon"/>
//                 </div>
//                 <p className="text-zinc-800 text-base font-normal text-gilroy-medium leading-normal">CKYC identifier is linked to your KYC data</p>
//             </div>
//             <div className="ml-[24px] w-2 h-[27px] bg-[#D8E5D3]" />
//             <div className="flex flex-row items-center">
//                 <div className='mr-[24px] w-14 h-14 rounded-full bg-[#D8E5D3] flex flex-col justify-center items-center'>
//                     <img src={shieldSearch} alt="icon"/>
//                 </div>
//                 <p className="text-zinc-800 text-base font-normal text-gilroy-medium leading-normal">No need to submit your KYC documents at any financial Institution if you have your CKYC identifier</p>
//             </div>
//             <div className="ml-[24px] w-2 h-[27px] bg-[#D8E5D3]" />
//             <div className="flex flex-row items-center">
//                 <div className='mr-[24px] w-14 h-14 rounded-full bg-[#D8E5D3] flex flex-col justify-center items-center'>
//                     <img src={global} alt="icon"/>
//                 </div>
//                 <p className="text-zinc-800 text-base font-normal text-gilroy-medium leading-normal">To know more login to <span className='text-[#52AE32] underline'>www.ckycindia.in</span></p>
//             </div>
//         </div>
//     )
// }
// export default AboutBudsHeadingComp

const AboutBudsHeadingComp = () => {
  return (
    <div className="py-10 px-5 md:px-10 bg-[#EEF7EB]">
      <div className="flex flex-col justify-center items-center md:flex-start md:items-start">
        <h1 className="text-gilroy-medium text-black text-3xl md:text-4xl font-normal leading-10 md:leading-11">
          About BUDS
        </h1>
        <p className="text-gilroy-regular text-base md:text-lg opacity-60 text-black font-normal leading-6 md:w-3/5 lg:w-2/5">
          Central KYC Registry is a centralized repository of KYC records of
          customers in the financial sector with uniform.
        </p>
      </div>
      <div className="mt-6 flex flex-col items-center md:flex-row justify-start md:items-center">
        <div className="mr-4 md:mr-6 w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#D8E5D3] flex justify-center items-center">
          <img src={mobile} alt="icon" className="w-auto h-auto" />
        </div>
        <p className="mt-2 text-base text-gilroy-medium md:text-lg text-black font-normal leading-6">
          Ask for your CKYC Identifier now and open account faster with reduced
          paper-work
        </p>
      </div>
      <div className="md:ml-[24px] w-[8px] h-[40px] bg-[#D8E5D3] hidden md:block" />
      <div className="mt-6 md:mt-0 flex flex-col items-center md:flex-row md:items-center">
        <div className="mr-4 md:mr-6 w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#D8E5D3] flex justify-center items-center">
          <img src={link} alt="icon" className="w-auto h-auto" />
        </div>
        <p className="mt-2 text-base text-gilroy-medium md:text-lg text-black font-normal leading-6">
          CKYC identifier is linked to your KYC data
        </p>
      </div>
      <div className="md:ml-[24px] w-[8px] h-[40px] bg-[#D8E5D3] hidden md:block" />
      <div className="mt-6 md:mt-0 flex flex-col items-center md:flex-row md:items-center">
        <div className="mr-4 md:mr-6 w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#D8E5D3] flex justify-center items-center">
          <img src={shieldSearch} alt="icon" className="w-auto h-auto" />
        </div>
        <p className="mt-2 text-gilroy-medium text-base md:text-lg text-black font-normal leading-6">
          To know more login to{" "}
          <span className="text-[#52AE32] underline">www.ckycindia.in</span>
        </p>
      </div>
      <div className="md:ml-[24px] w-[8px] h-[40px] bg-[#D8E5D3] hidden md:block" />
      <div className="mt-6 md:mt-0 flex flex-col items-center md:flex-row md:items-center">
        <div className="mr-4 md:mr-6 w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#D8E5D3] flex justify-center items-center">
          <img src={global} alt="icon" className="w-auto h-auto" />
        </div>
        <p className="mt-2 text-gilroy-medium text-base md:text-lg text-black font-normal leading-6">
          To know more login to{" "}
          <span className="text-[#52AE32] underline">www.ckycindia.in</span>
        </p>
      </div>
    </div>
  );
};

export default AboutBudsHeadingComp;
