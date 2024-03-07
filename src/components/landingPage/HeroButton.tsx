import React from "react";

interface SearchButtonProps {
  text: string;
}
const HeroButton: React.FC<SearchButtonProps> = ({ text }) => {
  return (
    <div>
      <button className="border-[1px] border-[#52AE32] rounded-[8px] pt-1 pr-2 pb-1 pl-2 gap-1">
        {text}
      </button>
    </div>
  );
};

export default HeroButton;
