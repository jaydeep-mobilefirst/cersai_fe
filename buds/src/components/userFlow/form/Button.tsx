import React from "react";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  label: string;
}

const Button: React.FC<ButtonProps> = ({ type, label }) => {
  return (
    <button
      type={type}
      className="bg-[#385723] rounded-xl p-3 text-white font-normal text-sm "
    >
      {label}
    </button>
  );
};

export default Button;
