import {verificationFiledModal} from '../../../utils/hardText/signuppageText';

const VerificationFailedComp =() =>{
    return(
        <div className="text-gilroy-medium p-4 md:p-[20px] Rectangle153 w-auto md:w-[544px] h-auto md:h-[326px] bg-white rounded-2xl bg-green-300">
            <div className='flex flex-row justify-end'>
                <img src={verificationFiledModal[0].cancelImgSrc} alt="icon"/>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <div className='w-[52px] h-[52px] flex-col justify-center items-center gap-2 inline-flex'>
                    <img src={verificationFiledModal[5].circleImgSrc} alt="icon"/>
                    <img src={verificationFiledModal[1].failedImgSrc} className='w-[13px] h-[13px] absolute' alt="icon"/>
                </div>
                <h1 className='mt-[20px] text-center text-black text-2xl font-normal'>{verificationFiledModal[2].heading}</h1>
                <p className="mt-[8px] text-center text-stone-500 text-base font-normal">{verificationFiledModal[3].description}</p>
            </div>
            
            <hr className="bg-[#000000] w-auto md:w-[468px] mt-[42px] mb-[24px]"></hr>
            <div className='flex flex-row justify-center'>
                <button className='text-white Rectangle151 w-56 h-14 bg-lime-900 rounded-xl'>{verificationFiledModal[4].okayBtn}</button>
            </div>

        </div>
    )
}
export default VerificationFailedComp;