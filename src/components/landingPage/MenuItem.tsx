import React from 'react'

interface MenuItemProps {
    text: string;
  }
  
  const MenuItem: React.FC<MenuItemProps> = ({ text }) => {
    return (
        <div className='cursor-pointer hover:bg-[#385723] rounded-[2px] pt-[16px] pb-[16px] pl-[22px] pr-[22px]'>
      <li className='text-[14px] leading-[16px] '>
        <div>{text}</div>
      </li>
      </div>
    );
  };
  
  export default MenuItem;