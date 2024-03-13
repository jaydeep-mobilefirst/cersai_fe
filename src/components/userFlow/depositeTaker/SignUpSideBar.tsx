import React, { useState } from 'react';
import HeadComp from './HeadComp';
import {signupSideBar} from '../../../utils/hardText/signuppageText';


const SignUpSideBar: React.FC =()=>{
    const [page, setPage] = useState<string>(signupSideBar[0].description);
    const [percent, setPercentage] = useState<any>(0);
    const widthPercentage : any = {
        0 : 'w-0',
        25 : 'w-1/4',
        50 : 'w-1/2',
        75 : 'w-3/4',
        100 : 'w-full'
    }

    const handleClick=(des:string,num:number)=>{
        setPercentage(num);
        setPage(des)
    }

    return(
        <div className='w-full h-[100vh] md:w-[349px] bg-[#EEF7EB]'>
            <HeadComp/>
            <hr className="bg-[#000000] w-full md:w-[349px] mb-[16px]"></hr>
            <div className="px-[28px] mt-[16px]">
                <div className='h-[101px]'>
                    <p className="text-[#385723] text-xl font-normal text-gilroy-semibold">Deposit Taker</p>
                    <p className="mt-[16px] text-[#2D2B27] text-base font-normal text-gilroy-medium"><span className="text-zinc-800 text-base font-normal text-gilroy-bold">{percent}%</span> Completed </p>
                    <div className="mt-[8px] md:w-[291px] h-2 bg-white rounded-[32px]" >
                    <div className={` ${widthPercentage[percent]} h-2 bg-[#52AE32] rounded-[32px]`} />
                    </div>
                </div>
                <div className='pt-[16px]'>
                    <>
                    {signupSideBar.map((item)=>{
                        return(
                            
                    <div onClick={()=> handleClick(item.description,item.percentage)} key={item.id} className={` mb-[16px] w-full md:w-[290px] h-14 p-2 bg-[#385723] rounded-lg justify-between items-center inline-flex ${
                        item.description===page?"bg-[#385723] text-white":"bg-white text-black"
                    }`}>
                    <div className='w-[234px] h-10 justify-start items-center gap-0.5 inline-flex'>
                        {
                            item.description===page?(
                                <img src={item.imgSrcHighlighted} className={` ${
                                    item.description===page?"stroke-white block":"text-[#666666] hidden"
                                }`} alt="icon"/>
                            ):(
                                <img src={item.imgSrc} className={`${
                                    item.description===page?"stroke-white":"text-[#666666]"
                                }`} alt="icon"/>
                            )
                        }
                        <p className="ml-[10px]  text-base font-normal leading-tight">{item.description}</p>
                    </div>
                    <img src={item.tickImgSrc} className='w-6 h-6' alt="icon"/>
                </div>
                        )
                    })}
                    </>
                </div>
            </div>
        </div>
    )
}
export default SignUpSideBar;