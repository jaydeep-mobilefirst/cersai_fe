import React, { forwardRef } from "react";
import LoaderSpin from "../../LoaderSpin";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string | React.ReactNode;
  variant?: "basic" | "outline";
  loader?: boolean;
}

const ButtonAuth: React.FC<ButtonProps> = forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ type, label, className, variant, loader, ...props }, ref) => {
  const variantClasses = {
    basic: `bg-[#385723] rounded-xl p-2 text-white font-normal text-sm w-full ${className}`,
    outline: `rounded-xl p-2 text-sm border border-green-700 text-green-600 w-full ${className}`,
  };
  return (
    <button {...props} ref={ref} className={variantClasses[variant ?? "basic"]}>
      {loader ? <LoaderSpin /> : label}
    </button>
  );
});

export default ButtonAuth;
