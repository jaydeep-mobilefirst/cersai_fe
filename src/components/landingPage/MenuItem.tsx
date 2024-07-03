import React from "react";

interface MenuItemProps {
  text: string;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ text,onClick  }) => {
  return (
    <li className="text-[14px] leading-[16px] hover:bg-[#0b2551] rounded-[2px] pt-[16px] pb-[16px] pl-[22px] pr-[22px] cursor-pointer" onClick={onClick}>
      <div className="text-gilroy-medium">{text}</div>
    </li>
  );
};

export default MenuItem;
