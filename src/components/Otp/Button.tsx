import React from "react";

interface ButtonProps {
  label: string;
  variant: "outlined" | "filled";
  onClick?: (event:  any) => void;
  disabled ?: boolean
}

const Button: React.FC<ButtonProps> = ({ label, variant, onClick, disabled}) => {
  const className =
    variant === "filled"
      ? "bg-[#54B749] text-white py-3 px-4 rounded-xl w-[200px] "
      : "border border-[#54B749] py-3 px-4 rounded-xl w-[200px] text-[#54B749]";
  return (
    <button onClick={onClick} className={className} disabled={disabled ? disabled : false}>
      {label}
    </button>
  );
};

export default Button;
