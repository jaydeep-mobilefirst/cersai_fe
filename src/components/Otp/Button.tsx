import React from "react";

interface ButtonProps {
  label: string;
  variant: "outlined" | "filled";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, variant, onClick }) => {
  const className =
    variant === "filled"
      ? "bg-green-500 text-white font-medium py-2 px-4 rounded-xl w-[150px] "
      : "border border-green-500 text-green-500 font-medium py-2 px-4 rounded-xl w-[150px] ";
  return (
    <button onClick={onClick} className={className}>
      {label}
    </button>
  );
};

export default Button;
