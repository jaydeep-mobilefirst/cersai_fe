// import React, { FC, InputHTMLAttributes, forwardRef } from "react";
// import "./textarea.css";

// interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {}

// const TextArea: FC<InputProps> = forwardRef<HTMLTextAreaElement, InputProps>(
//   (props, ref) => {
//     return (
//       <>
//         <div className="relative w-full ">
//           {" "}
//           {/* Adjust max width as needed */}
//           <textarea
//             className="form-textarea mt-1 block w-full border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300 textarea-component px-3 py-2 border h-[55px] sm:h-[55px] rounded-md" // Adjust padding and height as needed
//             {...props}
//             ref={ref}
//           ></textarea>
//           <div className="absolute bottom-0 right-0 pr-3 pb-2.5 flex items-center pointer-events-none">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="16"
//               height="16"
//               viewBox="0 0 16 16"
//               fill="none"
//             >
//               <g id="Mask group">
//                 <mask
//                   id="mask0_493_5164"
//                   style={{ maskType: "alpha" }}
//                   maskUnits="userSpaceOnUse"
//                   x="0"
//                   y="0"
//                   width="16"
//                   height="16"
//                 >
//                   <rect
//                     id="Rectangle 27535"
//                     x="0.5"
//                     y="0.5"
//                     width="15"
//                     height="15"
//                     fill="#666666"
//                     stroke="#666666"
//                   />
//                 </mask>
//                 <g mask="url(#mask0_493_5164)">
//                   <path
//                     id="Line 257"
//                     d="M17.0811 -0.374023L-2.55531 19.2623"
//                     stroke="#666666"
//                     stroke-linecap="round"
//                   />
//                   <line
//                     id="Line 258"
//                     x1="19.9903"
//                     y1="2.53519"
//                     x2="0.353909"
//                     y2="22.1716"
//                     stroke="#666666"
//                   />
//                   <line
//                     id="Line 259"
//                     x1="23.626"
//                     y1="4.71683"
//                     x2="3.98965"
//                     y2="24.3532"
//                     stroke="#666666"
//                   />
//                 </g>
//               </g>
//             </svg>
//           </div>
//         </div>
//       </>
//     );
//   }
// );

// export default TextArea;
import React, { FC, InputHTMLAttributes, forwardRef } from "react";
import "./textarea.css";

interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  backgroundColor?: string; // Optional backgroundColor prop
}

const TextArea: FC<InputProps> = forwardRef<HTMLTextAreaElement, InputProps>(
  (props, ref) => {
    const { backgroundColor = "defaultBackgroundColorClass", ...rest } = props; // Destructure backgroundColor and provide a default

    return (
      <>
        <div className="relative w-full">
          <textarea
            className={`form-textarea mt-1 block w-full border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300 textarea-component px-3 py-2 border h-[55px] sm:h-[55px] rounded-md ${backgroundColor}`} // Apply the backgroundColor class
            {...rest}
            ref={ref}
          ></textarea>
          <div className="absolute bottom-0 right-0 pr-3 pb-2.5 flex items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g id="Mask group">
                <mask
                  id="mask0_493_5164"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="16"
                  height="16"
                >
                  <rect
                    id="Rectangle 27535"
                    x="0.5"
                    y="0.5"
                    width="15"
                    height="15"
                    fill="#666666"
                    stroke="#666666"
                  />
                </mask>
                <g mask="url(#mask0_493_5164)">
                  <path
                    id="Line 257"
                    d="M17.0811 -0.374023L-2.55531 19.2623"
                    stroke="#666666"
                    stroke-linecap="round"
                  />
                  <line
                    id="Line 258"
                    x1="19.9903"
                    y1="2.53519"
                    x2="0.353909"
                    y2="22.1716"
                    stroke="#666666"
                  />
                  <line
                    id="Line 259"
                    x1="23.626"
                    y1="4.71683"
                    x2="3.98965"
                    y2="24.3532"
                    stroke="#666666"
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>
      </>
    );
  }
);

export default TextArea;
