import React, { FC, InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  height?: string;
  width?: string;
  padding?: string;
  error?: boolean;
}

const InputFields: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      height = "56px",
      width = "100%",
      padding = "8px 16px",
      className,
      error,
      ...rest
    },
    ref
  ) => {
    const errorClasses = error ? "border-red-500 text-red-500" : "";

    return (
      <input
        type="text"
        className={`form-input border flex border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300 justify-between align-middle ${errorClasses} ${className}`}
        style={{
          height,
          width,
          padding,
          color: error ? "red" : "gray",
        }}
        {...rest}
        ref={ref}
      />
    );
  }
);

export default InputFields;
