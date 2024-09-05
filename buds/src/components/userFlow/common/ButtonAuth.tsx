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
>(({ label, className, variant, loader, disabled, ...props }, ref) => {
  // Define a function to get button classes based on variant and disabled state
  const getButtonClasses = (
    variant: "basic" | "outline" = "basic",
    disabled: boolean = false
  ) => {
    const baseClasses = `rounded-xl p-2 text-sm w-full ${className}`;
    const styles = {
      basic: `bg-[#1C468E] text-white font-normal ${baseClasses}`,
      outline: `border border-green-700 text-green-600 ${baseClasses}`,
    };
    const disabledStyle = "opacity-50"; // Style for disabled state

    // Combine styles based on variant and disabled state
    return `${styles[variant]} ${disabled ? disabledStyle : ""}`;
  };

  return (
    <button
      {...props}
      ref={ref}
      disabled={disabled} // Ensure disabled attribute is correctly applied
      className={getButtonClasses(variant, disabled)}
    >
      {loader ? <LoaderSpin /> : label}
    </button>
  );
});

export default ButtonAuth;
