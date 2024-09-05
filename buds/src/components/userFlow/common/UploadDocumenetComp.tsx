import React from 'react';
import add from '../../../assets/images/add.svg';
import directboxSend from '../../../assets/images/directboxSend.svg';
import {uploadModal} from '../../../utils/hardText/signuppageText';

const UploadDocumentComp =() =>{
    return (
        <div className="p-[8px] Rectangle153 w-[544px] h-[326px] rounded-2xl bg-green-400">
            <div className="flex flex-row justify-between">
                <h1 className="pl-[30px] mt-[15px] text-gilroy-medium">{uploadModal[0].heading}</h1>
                <img src={uploadModal[1].cancelImgSrc} alt="icon"/>
            </div>
            <div className='ml-[30px] mt-[18px] Rectangle27614 w-[468px] h-[148px] bg-green-50 rounded-2xl flex flex-col justify-center items-center'>
                <img src={uploadModal[2].uploadImgSrc} alt="icon"/>
                <p className="text-gilroy-regular opacity-50 text-black text-xs font-normal mt-[18px]">{uploadModal[3].formats}</p>
                <p className='text-gilroy-regular opacity-50 text-black text-xs font-normal mt-[8px]'>{uploadModal[4].size}</p>
            </div>
            <div className='flex flex-row justify-center'>
                <button className='text-gilroy-medium Rectangle151 w-56 h-14 bg-lime-900 rounded-xl text-white mt-[24px]'>{uploadModal[5].buttonText}</button>
            </div>
        </div>
    )
}

export default UploadDocumentComp;