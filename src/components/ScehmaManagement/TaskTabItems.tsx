import React from "react";

type TaskTabsItemProps = {
  text: string;
  isActive: boolean;
  onClick: () => void;
  "data-testid"?: string;
};

const TaskTabsItem = ({ text, isActive, onClick, "data-testid": testId }: TaskTabsItemProps) => {
  return (
    <li
      onClick={onClick}
      className={`parentLi flex-col text-[20px] text-[#666666] justify-start items-start gap-3.5 inline-flex text-nowrap cursor-pointer ${isActive ? "active-class" : ""}`}
      data-testid={testId}  // Apply the data-testid here
    >
      <div className={`hover:text-gilroy-bold ${isActive ? "text-[#000000]" : "text-[#666666]"}`}>
        {text}
      </div>
      <div className={`${isActive ? "bg-black" : "bg-white"} self-stretch h-1 rounded-sm`} />
    </li>
  );
};

export default TaskTabsItem;
