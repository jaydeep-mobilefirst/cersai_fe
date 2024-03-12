import React, { useState } from 'react';

import Logo from '../../../assets/images/logo.svg';

const SignUpSideBar =()=>{
    const [percentage, setPercentage] = useState(0);

    const percentageChange=()=>{
        setPercentage(25)
    }

    return(
        <div className="w-[349px] bg-[#EEF7EB] h-[100vh] px-[28px]">
            <div className='pl-[29px] pt-[12px] bg-[#EEF7EB]'>
                <img src={Logo} alt="logo"/>
            </div>
            <p className="text-lime-900 text-xl font-normal text-gilroy-semibold">Deposit Taker</p>
            <p className="text-zinc-800 text-base font-normal text-gilroy-medium"><span className="text-zinc-800 text-base font-normal text-gilroy-bold">100%</span> Completed </p>
        </div>
    )
}
export default SignUpSideBar;