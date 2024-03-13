import Logo from '../../../assets/images/logo.svg';
const HeadComp =()=>{
    return(
        <div className="flex flex-row ">
            <div className='bg-[#EEF7EB] pl-[29px] pt-[12px] h-[92px] w-full md:w-[349px] flex flex-row jusitfy-center md:justify-start'>
                <img src={Logo} alt="logo" className='rounded-full h-[52px] w-[52px]'/>
            </div>
        </div>
    )
}
export default HeadComp;