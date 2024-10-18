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

//     // Determine the background color based on disabled status or provided prop
//     const effectiveBackgroundColor = disabled
//       ? "#E0E0E0" /* gray-500 */
//       : backgroundColor || "white";

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
//           backgroundColor: effectiveBackgroundColor, // Use the effective background color
//         }}
//         {...rest}
//         ref={ref}
//       />
//     );
//   }
// );

// export default InputFields;
import React, { FC, InputHTMLAttributes, forwardRef, useRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  height?: string;
  width?: string;
  padding?: string;
  error?: boolean;
  disabled?: boolean;
  backgroundColor?: string;
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
      backgroundColor,
      type = "text", // Ensure the default type is text or a type that supports selection
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const errorClasses = error ? "border-red-500 text-red-500" : "";

    const effectiveBackgroundColor = disabled
      ? "#E0E0E0"
      : backgroundColor || "white";

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const cursorPosition = e.target.selectionStart;
      if (ref) {
        if (typeof ref === "function") {
          ref(inputRef.current);
        } else if (inputRef.current) {
          (ref as React.MutableRefObject<HTMLInputElement>).current =
            inputRef.current;
        }
      }
      rest.onChange && rest.onChange(e);

      if (inputRef.current && inputRef.current.type === "text") {
        // Check if the input type supports selection
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.selectionStart = cursorPosition;
            inputRef.current.selectionEnd = cursorPosition;
          }
        }, 0);
      }
    };

    return (
      <input
        disabled={disabled}
        type={type} // Pass the type prop to the input
        className={`form-input border flex border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300 justify-between align-middle ${errorClasses} ${className}`}
        style={{
          height,
          width,
          padding,
          color: error ? "red" : "gray",
          backgroundColor: effectiveBackgroundColor,
        }}
        {...rest}
        ref={inputRef}
        onChange={handleInputChange}
        data-testid="input-field"
      />
    );
  }
);

export default InputFields;
