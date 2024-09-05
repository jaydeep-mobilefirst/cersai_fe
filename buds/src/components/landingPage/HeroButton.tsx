import React from "react";

interface SearchButtonProps {
  text: string;
  onClick: (text: string) => void;
}
const HeroButton: React.FC<SearchButtonProps> = ({ text, onClick }) => {
  const onClickButton = () => {
    onClick(text);
  };
  return (
    <div className="z-10">
      <button
        onClick={onClickButton}
        className="rounded-[8px] border-[#1C468E] text-[#1C468E] border px-4 py-2 text-gilroy-semibold"
      >
        {text}
      </button>
    </div>
  );
};

export default HeroButton;
