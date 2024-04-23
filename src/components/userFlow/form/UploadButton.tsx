// import React, { ButtonHTMLAttributes, FC, forwardRef } from "react";
// import "./custom_css/upload_button.css"; // This will be your custom CSS file
// import UploadButtonFolderSvg from "./svgs/UploadButtonFolderSvg";
// import UploadButtonSvg1 from "./svgs/UploadButtonSvg1";
// import { UploadButtonTexts } from "../../../utils/hardText/formComponents";
// import UploadDocumentComp from "../common/UploadDocumenetComp";

// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

// const UploadButton: FC<ButtonProps> = forwardRef<
//   HTMLButtonElement,
//   ButtonProps
// >((props, ref) => {
//   return (
//     <button
//       {...props}
//       ref={ref}
//       className="upload-button w-[317px] h-[56px] gap-14 flex items-center justify-center px-[8px] py-[16px] rounded-md font-medium focus:outline-none transition duration-150 ease-in-out border"
//     >
//       <div className="flex items-center justify-center gap-2">
//         <UploadButtonFolderSvg />
//         <div className="text-left">
//           <span style={{ fontSize: "14px" }}>
//             {UploadButtonTexts.uploadDocument}
//           </span>
//           <p style={{ fontSize: "14px" }} className="text-gray-400">
//             {UploadButtonTexts.noDocumentsAdded}
//           </p>
//         </div>
//       </div>
//       <UploadButtonSvg1 />
//     </button>
//   );
// });

// export default UploadButton;
// import React, { ButtonHTMLAttributes, FC, forwardRef, useRef } from "react";
// import "./custom_css/upload_button.css"; // This will be your custom CSS file
// import UploadButtonFolderSvg from "./svgs/UploadButtonFolderSvg";
// import UploadButtonSvg1 from "./svgs/UploadButtonSvg1";
// import { UploadButtonTexts } from "../../../utils/hardText/formComponents";

// interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
//   width?: string;
// }

// const UploadButton: FC<ButtonProps> = forwardRef<
//   HTMLButtonElement,
//   ButtonProps
// >((props, ref) => {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const { width = "317px", ...restProps } = props;

//   const handleButtonClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       console.log("File selected:", file.name); // You can also handle the file upload here
//     }
//   };

//   return (
//     <div>
//       <button
//         {...restProps}
//         ref={ref}
//         style={{ width }}
//         className="upload-button h-[56px] gap-14 flex items-center justify-center px-[8px] py-[16px] rounded-md font-medium focus:outline-none transition duration-150 ease-in-out border"
//         onClick={handleButtonClick}
//       >
//         <div className="flex items-center justify-center gap-2">
//           <UploadButtonFolderSvg />
//           <div className="text-left">
//             <span style={{ fontSize: "14px" }}>
//               {UploadButtonTexts.uploadDocument}
//             </span>
//             <p style={{ fontSize: "14px" }} className="text-gray-400">
//               {UploadButtonTexts.noDocumentsAdded}
//             </p>
//           </div>
//         </div>
//         <UploadButtonSvg1 />
//       </button>
//       <input
//         type="file"
//         ref={fileInputRef}
//         style={{ display: "none" }}
//         onChange={handleFileChange}
//       />
//     </div>
//   );
// });

// export default UploadButton;
// import React, { ButtonHTMLAttributes, FC, forwardRef, useRef } from "react";
// import "./custom_css/upload_button.css"; // Your custom CSS file
// import UploadButtonFolderSvg from "./svgs/UploadButtonFolderSvg";
// import UploadButtonSvg1 from "./svgs/UploadButtonSvg1";
// import { UploadButtonTexts } from "../../../utils/hardText/formComponents";

// // Extend the interface to include onFileUpload
// interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
//   width?: string;
//   onFileUpload?: (file: File | null) => void; // Optional callback for file upload
// }

// const UploadButton: FC<ButtonProps> = forwardRef<
//   HTMLButtonElement,
//   ButtonProps
// >((props, ref) => {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const { width = "317px", onFileUpload, ...restProps } = props;

//   const handleButtonClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file && onFileUpload) {
//       onFileUpload(file); // Invoke the onFileUpload callback with the file
//     } else if (onFileUpload) {
//       onFileUpload(null); // If no file is selected, pass null
//     }
//   };

//   return (
//     <div>
//       <button
//         {...restProps}
//         ref={ref}
//         style={{ width }}
//         className="upload-button h-[56px] gap-14 flex items-center justify-center px-[8px] py-[16px] rounded-md font-medium focus:outline-none transition duration-150 ease-in-out border"
//         onClick={handleButtonClick}
//       >
//         <div className="flex items-center justify-center gap-2">
//           <UploadButtonFolderSvg />
//           <div className="text-left">
//             <span style={{ fontSize: "14px" }}>
//               {UploadButtonTexts.uploadDocument}
//             </span>
//             <p style={{ fontSize: "14px" }} className="text-gray-400">
//               {UploadButtonTexts.noDocumentsAdded}
//             </p>
//           </div>
//         </div>
//         <UploadButtonSvg1 />
//       </button>
//       <input
//         type="file"
//         ref={fileInputRef}
//         style={{ display: "none" }}
//         onChange={handleFileChange}
//       />
//     </div>
//   );
// });

// export default UploadButton;
import React, {
  ButtonHTMLAttributes,
  FC,
  forwardRef,
  useRef,
  useState,
} from "react";
import "./custom_css/upload_button.css";
import UploadButtonFolderSvg from "./svgs/UploadButtonFolderSvg";
import UploadButtonSvg1 from "./svgs/UploadButtonSvg1";
import { UploadButtonTexts } from "../../../utils/hardText/formComponents";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onFileUpload?: (file: File | null) => void;
}

const UploadButton: FC<ButtonProps> = forwardRef<
  HTMLButtonElement,
  ButtonProps
>((props, ref) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileSelected, setFileSelected] = useState(false); // State to track file selection
  const { onFileUpload, ...restProps } = props;

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileSelected(!!file); // Update the state based on whether a file is selected
    if (file && onFileUpload) {
      onFileUpload(file);
    } else if (onFileUpload) {
      onFileUpload(null);
    }
  };

  return (
    <div>
      <button
        {...restProps}
        ref={ref}
        className={`upload-button ${
          fileSelected ? "file-selected" : "no-file"
        }`}
        onClick={handleButtonClick}
      >
        <div className="flex items-center space-between gap-2 md:w-[300px]">
          <UploadButtonFolderSvg />
          <div className="text-left">
            <span>{UploadButtonTexts.uploadDocument}</span>
            <p className="text-gray-400">
              {UploadButtonTexts.noDocumentsAdded}
            </p>
          </div>
        </div>
        <UploadButtonSvg1 />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
});

export default UploadButton;
