import React from "react";
import LoaderSpin from "../LoaderSpin";

interface ButtonProps {
  label: string;
  variant: "outlined" | "filled";
  onClick?: (event: any) => void;
  disabled?: boolean;
  loader?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant,
  onClick,
  disabled,
  loader,
}) => {
  const className =
    variant === "filled"
      ? "bg-[#1c468e] text-white py-3 px-4 rounded-xl w-[200px] text-gilroy-medium"
      : "border border-[#1c468e] py-3 px-4 rounded-xl w-[200px] text-[#1c468e] text-gilroy-medium";
  return (
    <button
      onClick={onClick}
      className={className}
      disabled={disabled ? disabled : false}
    >
      {loader ? <LoaderSpin /> : label}
    </button>
  );
};

export default Button;
