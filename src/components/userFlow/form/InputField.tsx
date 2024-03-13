import React, { FC, InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const InputFields: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return (
      <input
        type="text"
        className={`form-input border flex border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300 ${props.className} justify-between align-middle`}
        style={{
          height: "56px",
          width: "317px",
          padding: "8px 16px",
        }}
        {...props}
        ref={ref}
      />
    );
  }
);

export default InputFields;
