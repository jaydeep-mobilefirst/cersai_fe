// import React, { FC, InputHTMLAttributes, forwardRef } from "react";

// interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
//   height?: string;
//   width?: string;
//   padding?: string;
//   error?: boolean;
//   disabled?: boolean;
// }

// const InputFields: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
//   (
//     {
//       height = "56px",
//       width = "100%",
//       padding = "8px 16px",
//       className,
//       error,
//       disabled,
//       ...rest
//     },
//     ref
//   ) => {
//     const errorClasses = error ? "border-red-500 text-red-500" : "";

//     return (
//       <input
//         disabled={disabled}
//         type="text"
//         className={`form-input border flex border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300 justify-between align-middle ${errorClasses} ${className}`}
//         style={{
//           height,
//           width,
//           padding,
//           color: error ? "red" : "gray",
//         }}
//         {...rest}
//         ref={ref}
//       />
//     );
//   }
// );

// export default InputFields;

// import React, { FC, InputHTMLAttributes, forwardRef } from "react";

// interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
//   height?: string;
//   width?: string;
//   padding?: string;
//   error?: boolean;
//   disabled?: boolean;
//   backgroundColor?: string; // New background color prop
// }

// const InputFields: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
//   (
//     {
//       height = "56px",
//       width = "100%",
//       padding = "8px 16px",
//       className,
//       error,
//       disabled,
//       backgroundColor, // Destructure the new background color prop
//       ...rest
//     },
//     ref
//   ) => {
//     const errorClasses = error ? "border-red-500 text-red-500" : "";

//     return (
//       <input
//         disabled={disabled}
//         type="text"
//         className={`form-input border flex border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300 justify-between align-middle ${errorClasses} ${className}`}
//         style={{
//           height,
//           width,
//           padding,
//           color: error ? "red" : "gray",
//           backgroundColor: backgroundColor || "white",

//           // Set background color if provided, default to white
//         }}
//         {...rest}
//         ref={ref}
//       />
//     );
//   }
// );

// export default InputFields;
import React, { FC, InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  height?: string;
  width?: string;
  padding?: string;
  error?: boolean;
  disabled?: boolean;
  backgroundColor?: string; // New background color prop
}

const InputFields: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      height = "56px",
      width = "100%",
      padding = "8px 16px",
      className,
      error,
      disabled,
      backgroundColor, // Destructure the new background color prop
      ...rest
    },
    ref
  ) => {
    const errorClasses = error ? "border-red-500 text-red-500" : "";

    // Determine the background color based on disabled status or provided prop
    const effectiveBackgroundColor = disabled
      ? "#E0E0E0" /* gray-500 */
      : backgroundColor || "white";

    return (
      <input
        disabled={disabled}
        type="text"
        className={`form-input border flex border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300 justify-between align-middle ${errorClasses} ${className}`}
        style={{
          height,
          width,
          padding,
          color: error ? "red" : "gray",
          backgroundColor: effectiveBackgroundColor, // Use the effective background color
        }}
        {...rest}
        ref={ref}
      />
    );
  }
);

export default InputFields;
