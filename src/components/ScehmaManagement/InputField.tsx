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
    return (
      <input
        type="text"
        className={`${
          error && "border-[red] text-[red]"
        } form-input border flex border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300 justify-between align-middle  ${className} `}
        style={{
          height,
          width,
          padding,
        }}
        {...rest}
        ref={ref}
      />
    );
  }
);

export default InputFields;
