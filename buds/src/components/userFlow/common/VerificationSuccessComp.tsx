import React from 'react';
import {verificationSuccessModal} from '../../../utils/hardText/signuppageText';

const VerificationSuccessComp =() =>{
    return(
        <div className="text-gilroy-medium p-4 md:p-[8px] Rectangle153 w-auto md:w-[544px] h-auto md:h-[326px] bg-white rounded-2xl bg-green-400 flex flex-col justify-center">
            <div className='flex flex-row justify-end'>
                <img src={verificationSuccessModal[0].cancelImgSrc} alt="icon"/>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <div className='w-[52px] h-[52px] flex-col justify-center items-center gap-2 inline-flex'>
                    <img src={verificationSuccessModal[1].successImgSrc}  alt="icon"/>
                </div>
                <h1 className='mt-[22px] text-center text-black text-2xl font-normal'>{verificationSuccessModal[2].heading}</h1>
                <p className="mt-[8px] text-center text-[#666] text-base font-normal">{verificationSuccessModal[3].description}</p>
            </div>
            <hr className="bg-[#000000] w-auto md:w-[468px] mt-[42px] mb-[24px] opacity-0.5 mx-6"></hr>
            
            <div className='flex flex-row justify-center'>
                <button className='text-white Rectangle151 w-56 h-14 bg-[#385723] rounded-xl'>{verificationSuccessModal[4].okayBtn}</button>
            </div>

        </div>
    )
}
export default VerificationSuccessComp;