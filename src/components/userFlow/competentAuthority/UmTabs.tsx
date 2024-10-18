import React from "react";

type UmTabsItemProps = {
  text: string;
  isActive: boolean;
  onClick: () => void;
};

const UmTabsItem: React.FC<UmTabsItemProps> = ({ text, isActive, onClick }) => {
  return (
    <li
      className={`tab-item ${isActive ? "active" : "hover:text-gilroy-bold text-[#666666]"}`}
      onClick={onClick}
    >
      {text}
    </li>
  );
};

export default UmTabsItem;
