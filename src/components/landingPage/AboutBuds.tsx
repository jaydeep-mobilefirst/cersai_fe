import VideoComp from "./VideoComp";
import {aboutBuds} from '../../utils/hardText/landingpageText';


const AboutBuds =()=>{
    return(
        <div className="w-[100vw] h-[100vh] bg-white flex flex-col md:flex-row md:items-center md:justify-between px-4 lg:px-[56px] ">
            <div className="mt-10 md:mt-0 w-[100%] md:w-[40%]" >
                <h1 className="text-[#000000] text-[34px] font-normal leading-[37.40px]">{aboutBuds[0].heading}</h1>
                <p className="mt-[16px] w-[100%]  opacity-60 text-[#000000] text-base font-normal leading-normal">{aboutBuds[1].description}</p>
                <div className="flex flex-col mt-[24px]">
                <div className="text-[#52AE32] text-base font-normal  underline leading-normal">{aboutBuds[2].click1}</div>
                <div className="mt-[8px] text-[#52AE32] text-base font-normal  underline leading-normal">{aboutBuds[3].click2}</div>
                </div>
            </div >
                <VideoComp/>
            </div>
    )
}
export default AboutBuds;

// import VideoComp from "./VideoComp";

// const AboutBuds = () => {
//     return (
//         <div className="md:flex md:items-center md:justify-between w-full h-full bg-white p-8 md:pl-10 md:pr-10">
//             <div className="md:w-1/2">
//                 <h1 className="font-Gilroy-Regular text-stone-900 text-2xl md:text-3xl font-normal leading-normal mb-4">About BUDS</h1>
//                 <p className="font-Gilroy-Regular opacity-60 text-black text-sm md:text-base leading-normal mb-4">Central KYC Registry is a centralized repository of KYC records of customers in the financial sector with uniform KYC norms and inter-usability of the KYC records across the sector with an objective to reduce the burden of producing KYC documents and getting those verified every time when the customer creates a new relationship with a financial entity.</p>
//                 <div className="flex flex-col">
//                     <a className="font-Gilroy-Regular text-lime-600 text-sm md:text-base font-normal underline leading-normal mb-2">Click here for more details</a>
//                     <a className="font-Gilroy-Regular text-lime-600 text-sm md:text-base font-normal underline leading-normal">Click here for Board of Directors of CERSAI</a>
//                 </div>
//             </div>
//             <div className="md:w-1/2 mt-8 md:mt-0">
//                 <VideoComp />
//             </div>
//         </div>
//     )
// }

// export default AboutBuds;
