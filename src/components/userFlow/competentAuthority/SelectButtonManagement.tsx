// import React, { useEffect, useRef, useState } from "react";

// interface Option {
//   value: string;
//   label: string;
// }

// type Props = {
//   setOption: any;
//   options: Option[];
//   selectedOption?: string | null;
//   placeholder: string;
//   searchInputOnchange?: any;
//   searchInputValue?: string;
//   bgColor?: string; // Prop for background color
//   mdWidth?: string; // New prop for width in md
// };

// const SelectButtonUserManagement = ({
//   setOption,
//   options,
//   selectedOption,
//   placeholder,
//   searchInputOnchange,
//   searchInputValue,
//   bgColor = "#FFFFFF", // Default background color
//   mdWidth = "md:w-[210px]", // Default width in md
// }: Props) => {
//   const [arrowDirectionToggle, setArrowDirectionToggle] = useState(false);

//   useEffect(() => {
//     setArrowDirectionToggle(false);
//     return () => {};
//   }, [selectedOption]);

//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const handleClickOutside = (event: any) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setArrowDirectionToggle(false);
//     }
//   };

//   useEffect(() => {
//     if (arrowDirectionToggle) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [arrowDirectionToggle]);

//   return (
//     <>
//       <button
//         className={`w-full ${mdWidth} flex justify-between items-center bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700 hover:bg-gray-50 focus:ring-1 focus:ring-gray-300 text-left`}
//         type="button"
//         onClick={() => setArrowDirectionToggle(!arrowDirectionToggle)}
//         style={{
//           height: "50px",
//           padding: "8px 16px",
//           marginTop: "8px",
//           border: "1px solid #E6E6E6",
//           borderRadius: "8px",
//           backgroundColor: bgColor, // Apply bgColor prop to the button
//         }}
//       >
//         {selectedOption ? selectedOption : placeholder}
//         <div>
//           {!arrowDirectionToggle ? (
//             <svg
//               className="w-4 h-4 ml-2 -mr-1"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M19 9l-7 7-7-7"
//               />
//             </svg>
//           ) : (
//             <svg
//               className="w-4 h-4 ml-2 -mr-1"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 stroke-width="2"
//                 d="M5 15l7-7 7 7"
//               ></path>
//             </svg>
//           )}
//         </div>
//       </button>
//       {arrowDirectionToggle && (
//         <div
//           ref={dropdownRef}
//           className={`absolute ${mdWidth} rounded-md bg-white shadow-lg`}
//           role="menu"
//           aria-orientation="vertical"
//           aria-labelledby="options-menu"
//           style={{
//             zIndex: 999, // Setting a high z-index
//             backgroundColor: bgColor, // Apply bgColor prop to the dropdown menu
//           }}
//         >
//           <div
//             className="overflow-auto max-h-40 custom-scrollbar"
//             role="menu"
//             aria-orientation="vertical"
//             aria-labelledby="options-menu"
//           >
//             {options.map((option, index) => (
//               <a
//                 key={index}
//                 onClick={() => setOption(option)}
//                 className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-gray-900 cursor-pointer"
//                 role="menuitem"
//               >
//                 {option.label}
//               </a>
//             ))}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default SelectButtonUserManagement;

// import React, { useEffect, useRef, useState } from "react";

// interface Option {
//   value: string;
//   label: string;
// }

// type Props = {
//   setOption: any;
//   options: Option[];
//   selectedOption?: string | null;
//   placeholder: string;
//   searchInputOnchange?: any;
//   searchInputValue?: string;
//   bgColor?: string; // Prop for background color
//   mdWidth?: string; // New prop for width in md
//   borderColor?: string; // New prop for border color
// };

// const SelectButtonUserManagement = ({
//   setOption,
//   options,
//   selectedOption,
//   placeholder,
//   searchInputOnchange,
//   searchInputValue,
//   bgColor = "#FFFFFF", // Default background color
//   mdWidth = "md:w-[210px]", // Default width in md
//   borderColor = "#E6E6E6", // Default border color
// }: Props) => {
//   const [arrowDirectionToggle, setArrowDirectionToggle] = useState(false);

//   useEffect(() => {
//     setArrowDirectionToggle(false);
//     return () => {};
//   }, [selectedOption]);

//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const handleClickOutside = (event: any) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setArrowDirectionToggle(false);
//     }
//   };

//   useEffect(() => {
//     if (arrowDirectionToggle) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [arrowDirectionToggle]);

//   return (
//     <>
//       <button
//         className={`w-full ${mdWidth} flex justify-between items-center bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700 hover:bg-gray-50 focus:ring-1 focus:ring-gray-300 text-left`}
//         type="button"
//         onClick={() => setArrowDirectionToggle(!arrowDirectionToggle)}
//         style={{
//           height: "50px",
//           padding: "8px 16px",
//           marginTop: "8px",
//           border: `1px solid ${borderColor}`,
//           borderRadius: "8px",
//           backgroundColor: bgColor,
//         }}
//       >
//         {selectedOption ? selectedOption : placeholder}
//         <div>
//           {!arrowDirectionToggle ? (
//             <svg
//               className="w-4 h-4 ml-2 -mr-1"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M19 9l-7 7-7-7"
//               />
//             </svg>
//           ) : (
//             <svg
//               className="w-4 h-4 ml-2 -mr-1"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M5 15l7-7 7 7"
//               />
//             </svg>
//           )}
//         </div>
//       </button>
//       {arrowDirectionToggle && (
//         <div
//           ref={dropdownRef}
//           className={`absolute ${mdWidth} rounded-md bg-white shadow-lg`}
//           role="menu"
//           aria-orientation="vertical"
//           aria-labelledby="options-menu"
//           style={{
//             zIndex: 999,
//             backgroundColor: bgColor,
//             border: `1px solid ${borderColor}`, // Apply border color to dropdown
//           }}
//         >
//           <div
//             className="overflow-auto max-h-40 custom-scrollbar"
//             role="menu"
//             aria-orientation="vertical"
//             aria-labelledby="options-menu"
//           >
//             {options.map((option, index) => (
//               <a
//                 key={index}
//                 onClick={() => setOption(option)}
//                 className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-gray-900 cursor-pointer"
//                 role="menuitem"
//               >
//                 {option.label}
//               </a>
//             ))}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default SelectButtonUserManagement;

// import React, { useEffect, useRef, useState } from "react";

// interface Option {
//   value: string;
//   label: string;
// }

// type Props = {
//   setOption: any;
//   options: Option[];
//   selectedOption?: string | null;
//   placeholder: string;
//   searchInputOnchange?: any;
//   searchInputValue?: string;
//   bgColor?: string; // Prop for background color
//   mdWidth?: string; // New prop for width in md
//   borderColor?: string; // New prop for border color
// };

// const SelectButtonUserManagement = ({
//   setOption,
//   options,
//   selectedOption,
//   placeholder,
//   searchInputOnchange,
//   searchInputValue,
//   bgColor = "#FFFFFF", // Default background color
//   mdWidth = "md:w-[210px]", // Default width in md
//   borderColor = "#E6E6E6", // Default border color
// }: Props) => {
//   const [arrowDirectionToggle, setArrowDirectionToggle] = useState(false);

//   useEffect(() => {
//     setArrowDirectionToggle(false);
//   }, [selectedOption]);

//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const handleClickOutside = (event: any) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setArrowDirectionToggle(false);
//     }
//   };

//   useEffect(() => {
//     if (arrowDirectionToggle) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [arrowDirectionToggle]);

//   return (
//     <div className={`relative w-full ${mdWidth}`}>
//       <button
//         className={`w-full flex justify-between items-center border rounded-md shadow-sm px-4 py-2 text-gray-700 hover:bg-gray-50 focus:ring-1 focus:ring-gray-300 text-left ${mdWidth}`}
//         type="button"
//         onClick={() => setArrowDirectionToggle(!arrowDirectionToggle)}
//         style={{
//           height: "50px",
//           padding: "8px 16px",
//           marginTop: "8px",
//           border: `1px solid ${borderColor}`,
//           borderRadius: "8px",
//           backgroundColor: bgColor,
//         }}
//       >
//         {selectedOption ? selectedOption : placeholder}
//         <div>
//           {!arrowDirectionToggle ? (
//             <svg
//               className="w-4 h-4 ml-2 -mr-1"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M19 9l-7 7-7-7"
//               />
//             </svg>
//           ) : (
//             <svg
//               className="w-4 h-4 ml-2 -mr-1"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M5 15l7-7 7 7"
//               ></path>
//             </svg>
//           )}
//         </div>
//       </button>
//       {arrowDirectionToggle && (
//         <div
//           ref={dropdownRef}
//           className={`absolute w-full ${mdWidth} rounded-md bg-white shadow-lg`}
//           role="menu"
//           aria-orientation="vertical"
//           aria-labelledby="options-menu"
//           style={{
//             zIndex: 999,
//             border: `1px solid ${borderColor}`, // Apply border color to dropdown
//           }}
//         >
//           <div
//             className="overflow-auto max-h-40 custom-scrollbar"
//             role="menu"
//             aria-orientation="vertical"
//             aria-labelledby="options-menu"
//           >
//             {options.map((option, index) => (
//               <a
//                 key={index}
//                 onClick={() => setOption(option)}
//                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-gray-900 cursor-pointer"
//                 role="menuitem"
//               >
//                 {option.label}
//               </a>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SelectButtonUserManagement;

// import React, { useEffect, useRef, useState } from "react";

// interface Option {
//   value: string;
//   label: string;
// }

// type Props = {
//   setOption: any;
//   options: Option[];
//   selectedOption?: string | null;
//   placeholder: string;
//   searchInputOnchange?: any;
//   searchInputValue?: string;
//   bgColor?: string; // Prop for background color
//   mdWidth?: string; // New prop for width in md
//   borderColor?: string; // New prop for border color
// };

// const SelectButtonUserManagement = ({
//   setOption,
//   options,
//   selectedOption,
//   placeholder,
//   searchInputOnchange,
//   searchInputValue,
//   bgColor = "#FFFFFF", // Default background color
//   mdWidth = "md:w-[210px]", // Default width in md
//   borderColor = "#E6E6E6", // Default border color
// }: Props) => {
//   const [arrowDirectionToggle, setArrowDirectionToggle] = useState(false);

//   useEffect(() => {
//     setArrowDirectionToggle(false);
//   }, [selectedOption]);

//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const handleClickOutside = (event: any) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setArrowDirectionToggle(false);
//     }
//   };

//   useEffect(() => {
//     if (arrowDirectionToggle) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [arrowDirectionToggle]);

//   const handleButtonClick = () => {
//     setArrowDirectionToggle((prevState) => !prevState);
//   };

//   const handleOptionClick = (option: Option) => {
//     setOption(option);
//     setArrowDirectionToggle(false);
//   };

//   return (
//     <div className={`relative w-full ${mdWidth}`}>
//       <button
//         className={`w-full flex justify-between items-center border rounded-md shadow-sm px-4 py-2 text-gray-700 hover:bg-gray-50 focus:ring-1 focus:ring-gray-300 text-left ${mdWidth}`}
//         type="button"
//         onClick={handleButtonClick}
//         style={{
//           height: "50px",
//           padding: "8px 16px",
//           marginTop: "8px",
//           border: `1px solid ${borderColor}`,
//           borderRadius: "8px",
//           backgroundColor: bgColor,
//         }}
//       >
//         {selectedOption ? selectedOption : placeholder}
//         <div>
//           {!arrowDirectionToggle ? (
//             <svg
//               className="w-4 h-4 ml-2 -mr-1"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M19 9l-7 7-7-7"
//               />
//             </svg>
//           ) : (
//             <svg
//               className="w-4 h-4 ml-2 -mr-1"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M5 15l7-7 7 7"
//               ></path>
//             </svg>
//           )}
//         </div>
//       </button>
//       {arrowDirectionToggle && (
//         <div
//           ref={dropdownRef}
//           className={`absolute w-full ${mdWidth} rounded-md bg-white shadow-lg`}
//           role="menu"
//           aria-orientation="vertical"
//           aria-labelledby="options-menu"
//           style={{
//             zIndex: 999,
//             border: `1px solid ${borderColor}`, // Apply border color to dropdown
//           }}
//         >
//           <div
//             className="overflow-auto max-h-40 custom-scrollbar"
//             role="menu"
//             aria-orientation="vertical"
//             aria-labelledby="options-menu"
//           >
//             {options.map((option, index) => (
//               <a
//                 key={index}
//                 onClick={() => handleOptionClick(option)}
//                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-gray-900 cursor-pointer"
//                 role="menuitem"
//               >
//                 {option.label}
//               </a>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SelectButtonUserManagement;

import React, { useEffect, useRef, useState } from "react";

interface Option {
  value: string;
  label: string;
}

type Props = {
  setOption: any;
  options: Option[];
  selectedOption?: string | null;
  placeholder: string;
  searchInputOnchange?: any;
  searchInputValue?: string;
  bgColor?: string; // Prop for background color
  mdWidth?: string; // New prop for width in md
  borderColor?: string; // New prop for border color
};

const SelectButtonUserManagement = ({
  setOption,
  options,
  selectedOption,
  placeholder,
  searchInputOnchange,
  searchInputValue,
  bgColor = "#FFFFFF", // Default background color
  mdWidth = "md:w-[210px]", // Default width in md
  borderColor = "#E6E6E6", // Default border color
}: Props) => {
  const [arrowDirectionToggle, setArrowDirectionToggle] = useState(false);

  useEffect(() => {
    setArrowDirectionToggle(false);
  }, [selectedOption]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    console.log("Clicked outside");
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      console.log("Closing dropdown");
      setArrowDirectionToggle(false);
    }
    // Check if any other event handlers are intercepting the click event
    console.log("Event bubbling path:", event.composedPath());
  };

  useEffect(() => {
    if (arrowDirectionToggle) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [arrowDirectionToggle]);

  const handleButtonClick = () => {
    setArrowDirectionToggle((prevState) => !prevState);
  };

  const handleOptionClick = (option: Option) => {
    setOption(option);
    setArrowDirectionToggle(false);
  };

  return (
    <div className={`relative w-full ${mdWidth}`}>
      <button
        className={`w-full flex justify-between items-center border rounded-md shadow-sm px-4 py-2 text-gray-700 hover:bg-gray-50 focus:ring-1 focus:ring-gray-300 text-left ${mdWidth}`}
        type="button"
        onClick={handleButtonClick}
        style={{
          height: "50px",
          padding: "8px 16px",
          marginTop: "8px",
          border: `1px solid ${borderColor}`,
          borderRadius: "8px",
          backgroundColor: bgColor,
        }}
      >
        {selectedOption ? selectedOption : placeholder}
        <div>
          {!arrowDirectionToggle ? (
            <svg
              className="w-4 h-4 ml-2 -mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 ml-2 -mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              ></path>
            </svg>
          )}
        </div>
      </button>
      {arrowDirectionToggle && (
        <div
          ref={dropdownRef}
          className={`absolute w-full ${mdWidth} rounded-md bg-white shadow-lg`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          style={{
            zIndex: 999,
            border: `1px solid ${borderColor}`,
          }}
        >
          <div
            className="overflow-auto max-h-40 custom-scrollbar"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option, index) => (
              <a
                key={index}
                onClick={() => handleOptionClick(option)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-gray-900 cursor-pointer"
                role="menuitem"
              >
                {option.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectButtonUserManagement;
