import React, {
  ButtonHTMLAttributes,
  FC,
  forwardRef,
  useRef,
  useState,
} from "react";
import "./custom_css/upload_button2.css";
import UploadButtonFolderSvg from "../../../assets/images/uploadFile-2.svg";
import UploadButtonSvg1 from "../../../assets/images/UploadIcon.png";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onFileUpload?: (file: File | null) => void;
  fname?: string;
  disabled?: boolean;
}

const DscButton: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileSelected, setFileSelected] = useState(false); // State to track file selection
    const [fileName, setFileName] = useState<string | undefined>(props?.fname);
    const { onFileUpload, disabled, ...restProps } = props;

    const handleButtonClick = () => {
      fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setFileName(file?.name);
      } else {
        setFileName("");
      }
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
          disabled={disabled}
          type="button"
          ref={ref}
          className={`upload-button w-full ${fileSelected ? "" : "no-file"}`}
          onClick={handleButtonClick}
        >
          <div className="flex items-center justify-between gap-2 w-full">
            <div className="flex items-center justify-center">
              <div>
                <img
                  src={UploadButtonFolderSvg}
                  alt="UploadButtonFolderSvg "
                  className="mx-2"
                />
              </div>
              <div className="">
                <div className="">
                  <h6 className="text-base font-normal text-gilroy-regular md:-mr-[11px] ">
                    Upload DSC
                  </h6>
                  <p className="text-[#1D1D1B] text-base font-normal text-gilroy-regular ">
                    {fileName !== "" && fileName !== undefined ? (
                      <span className="text-sm">{fileName}</span>
                    ) : (
                      "Document"
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="">
                <button
                  type="button"
                  className={`text-white Rectangle151 w-10 h-10 rounded-md ${
                    fileSelected ? "bg-[#1C468E]" : "bg-gray-600"
                  }  flex justify-center items-center `}
                >
                  <img
                    src={UploadButtonSvg1}
                    alt="UploadButtonSvg1"
                    className="w-5"
                  />
                </button>
              </div>
            </div>
          </div>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept=".crt" // Restrict file type to .crt
          onChange={handleFileChange}
        />
      </div>
    );
  }
);

export default DscButton;
