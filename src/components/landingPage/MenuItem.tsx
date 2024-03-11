import React from "react";

interface MenuItemProps {
  text: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ text }) => {
  return (
    <li className="text-[14px] leading-[16px] hover:bg-[#385723] rounded-[2px] pt-[16px] pb-[16px] pl-[22px] pr-[22px] cursor-pointer">
      <div className="text-gilroy-medium">{text}</div>
    </li>
  );
};

export default MenuItem;
