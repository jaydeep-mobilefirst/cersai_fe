import { FC, InputHTMLAttributes, forwardRef, useState } from "react";
import Eye from "../../../assets/images/eye2.svg";
import EyeHide from "../../../assets/images/eye-slash.svg";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  disabled?: boolean;
}

const EmailInputField: FC<InputProps> = forwardRef<
  HTMLInputElement,
  InputProps
>(({ className, error, disabled, ...rest }, ref) => {
  // Correct Tailwind CSS error class application
  const errorClasses = error
    ? "border-red-500 text-red-500"
    : "border-gray-300 text-gray-700";

  return (
    <div className="relative">
      <input
        disabled={disabled}
        type="text"
        className={`form-input border flex rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300 justify-between align-middle pr-12 ${errorClasses} ${className}`}
        style={{
          height: "56px",
          width: "100%",
          paddingRight: "48px",
          paddingLeft: "16px",
        }}
        {...rest}
        ref={ref}
      />
    </div>
  );
});

export default EmailInputField;
