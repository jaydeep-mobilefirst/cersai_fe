import React, { FC, forwardRef, useState } from "react";

interface ToggleSwitchProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  enabled: boolean;
  variant?: "basic" | "table";
  apiCall?: () => void;
}

const ToggleSwitch: FC<ToggleSwitchProps> = forwardRef<
  HTMLButtonElement,
  ToggleSwitchProps
>((props, ref) => {
  const { enabled, variant, className, apiCall } = props;

  const handleOnClick = () => {
    if (apiCall) {
      apiCall();
    }
  };

  const variantsBG = {
    basic: "bg-[#E7F0FF]",
    table: "bg-[#D4FDC6]",
  };

  const circleBG = {
    basic: "bg-[#1C468E]",
    table: "bg-[#385723]",
  };
  return (
    <button
      ref={ref}
      role="switch"
      aria-checked={enabled}
      onClick={handleOnClick}
      className={`${
        enabled ? variantsBG[variant ?? "basic"] : "bg-gray-200"
      } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${className}`}
      {...props}
    >
      <span
        className={`${
          enabled ? "translate-x-6" : "translate-x-1"
        } inline-block w-4 h-4 transform ${
          enabled ? circleBG[variant ?? "basic"] : "bg-white"
        } rounded-full transition-transform`}
      />
    </button>
  );
});
export default ToggleSwitch;
