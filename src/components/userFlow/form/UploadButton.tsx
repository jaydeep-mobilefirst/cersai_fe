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
  onFileUpload?: (file: File) => void;
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
        type="button"
      >
        <div className="flex items-center space-between gap-2 md:w-[280px]">
          <UploadButtonFolderSvg />
          <div className="text-left">
            <span>{UploadButtonTexts.uploadDocument}</span>
            <p className="text-gray-400 ">
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
