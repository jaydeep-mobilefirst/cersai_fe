import React, { useState } from 'react';

const SignUpSideBar =()=>{
    const [percentage, setPercentage] = useState(0);

    const percentageChange=()=>{
        setPercentage(25)
    }

    return(
        <div className="w-[349px] bg-[#EEF7EB] h-[100vh] px-[28px] pt-[92px]">
            <p className="text-lime-900 text-xl font-normal text-gilroy-semibold">Regulator</p>
            <p className="text-zinc-800 text-base font-normal text-gilroy-medium"><span className="text-zinc-800 text-base font-normal text-gilroy-bold">100%</span> Completed </p>
        </div>
    )
}
export default SignUpSideBar;