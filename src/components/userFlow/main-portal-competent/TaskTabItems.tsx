import React from "react";

interface MenuItemProps {
  text: string;
  isActive: boolean;
  onClick: () => void;
}

const TaskTabsItem: React.FC<MenuItemProps> = ({ text, isActive, onClick }) => {
  return (
    <li
      className={`parentLi flex-col text-[20px] text-[#666666] justify-start items-start gap-3.5 inline-flex text-nowrap cursor-pointer
      `}
      onClick={onClick}
    >
      <div
        className={`hover:text-gilroy-bold 
                       ${
                         isActive
                           ? "font-bold text-[#1C468E]"
                           : "text-[#666666] "
                       }
      `}
      >
        {text}
      </div>
      <div
        className={` self-stretch h-1 rounded-sm ${
          isActive ? "bg-[#1C468E]" : "bg-white"
        }`}
      ></div>
    </li>
  );
};

export default TaskTabsItem;
