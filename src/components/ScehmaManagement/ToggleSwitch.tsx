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
  const [isEnabled, setEnabled] = useState(enabled);

  const handleOnClick = () => {
    setEnabled(!isEnabled);
    if (apiCall) {
      apiCall();
    }
  };

  const variantsBG = {
    basic: "bg-[#E7F0FF]",
    table: "bg-[#E7F0FF]",
  };

  const circleBG = {
    basic: "bg-[#1c468e]",
    table: "bg-[#1c468e]",
  };
  return (
    <button
      ref={ref}
      role="switch"
      aria-checked={enabled}
      onClick={handleOnClick}
      className={`${
        isEnabled ? variantsBG[variant ?? "basic"] : "bg-gray-200"
      } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${className}`}
      {...props}
    >
      <span
        className={`${
          isEnabled ? "translate-x-6" : "translate-x-1"
        } inline-block w-4 h-4 transform ${
          isEnabled ? circleBG[variant ?? "basic"] : "bg-white"
        } rounded-full transition-transform`}
      />
    </button>
  );
});
export default ToggleSwitch;
