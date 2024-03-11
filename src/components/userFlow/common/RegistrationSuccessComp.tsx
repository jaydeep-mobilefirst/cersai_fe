import {registrationSuccessModal} from '../../../utils/hardText/signuppageText';
const RegistrationSuccessComp =()=>{
    return(
        <div className="text-gilroy-medium p-4 md:p-[8px] Rectangle153 w-auto md:w-[544px] h-auto md:h-[358px] bg-white rounded-2xl bg-green-300">
            <div className='flex flex-row justify-end h-[20px]'>
                <img src={registrationSuccessModal[0].cancelImgSrc} className='w-6 h-6' alt="icon"/>
            </div>
            <div className='flex flex-col justify-center items-center mt-[-4px]'>
                <div className='w-[52px] h-[52px] flex-col justify-center items-center gap-2 inline-flex'>
                    <img src={registrationSuccessModal[1].tickImgSrc} alt="icon"/>
                     </div>
                <h1 className='px-[44px] mt-[13px] text-center text-slate-900 text-xl font-normal '>{registrationSuccessModal[2].description}</h1>
                <p className="mt-[20px] text-center text-lime-600 text-lg font-semibold font-mulish">{registrationSuccessModal[3].regId}</p>
            </div>
            
            <hr className="bg-[#000000] w-auto md:w-[468px] mt-[24px] mb-[24px]"></hr>
            <div className='flex flex-row justify-center'>
                <button className='text-white Rectangle151 w-56 h-14 bg-lime-900 rounded-xl'>{registrationSuccessModal[4].okayBtn}</button>
            </div>

        </div>
    )
}
export default RegistrationSuccessComp;