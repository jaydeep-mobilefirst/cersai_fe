import { FC, InputHTMLAttributes, forwardRef, useState } from "react";
import Eye from "../../../assets/images/eye2.svg";
import EyeHide from "../../../assets/images/eye-slash.svg";
import React from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  disabled?: boolean;
}

const InputFieldPassword: FC<InputProps> = forwardRef<
  HTMLInputElement,
  InputProps
>(({ className, error, disabled, ...rest }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Correct Tailwind CSS error class application
  const errorClasses = error
    ? "border-red-500 text-red-500"
    : "border-gray-300 text-gray-700";

  return (
    <div className="relative">
      <input
        disabled={disabled}
        type={showPassword ? "text" : "password"}
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
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 focus:outline-none"
      >
        <img
          src={showPassword ? Eye : EyeHide}
          alt="Toggle visibility"
          className="h-5 w-5 m-[10px]"
        />
      </button>
    </div>
  );
});

export default InputFieldPassword;
