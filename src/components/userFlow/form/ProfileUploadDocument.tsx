import React, {
  ButtonHTMLAttributes,
  FC,
  forwardRef,
  useRef,
  useState,
} from "react";
import "./custom_css/upload_button.css";
import trash from "../../../assets/images/trash.svg";
import folderOpen from "../../../assets/images/folder-open-light.svg";
import UploadButtonFolderSvg from "./svgs/UploadButtonFolderSvg";
import UploadButtonSvg1 from "./svgs/UploadButtonSvg1";
import { UploadButtonTexts } from "../../../utils/hardText/formComponents";
import Button from "../common/Button";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onFileUpload?: (file: File | null) => void;
  deleteFile?: () => void;
  documentName?: string;
  required?: boolean;
  fileSelected?: boolean;
  fileName?: string;
}

const ProfileUploadDocument: FC<ButtonProps> = forwardRef<
  HTMLButtonElement,
  ButtonProps
>((props, ref) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { onFileUpload, documentName, ...restProps } = props;

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
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
        className={`upload-button w-full h-48 ${
          props?.fileName && props?.fileName?.trim() !== ""
            ? "file-selected"
            : "no-file"
        }`}
      >
        <div className="flex items-center space-between gap-2 w-full">
          <img src={folderOpen} alt="Error" height={30} width={30} />
          <div className="text-left">
            <span>
              {documentName}{" "}
              {props?.required && props?.required === true && (
                <span className="text-red-500">*</span>
              )}
            </span>
            <p className="text-gray-400">
              {props?.fileName && props?.fileName?.trim() !== ""
                ? props?.fileName
                : UploadButtonTexts.uploadDocument}
            </p>
          </div>
        </div>
        <div>
          {props?.fileName && props?.fileName?.trim() !== "" ? (
            <span className="flex flex-row justify-between">
              {props?.deleteFile && (
                <div
                  className="p-1 bg-white flex align-middle mr-4 rounded-lg"
                  role="button"
                  onClick={() => {
                    if (props.deleteFile) {
                      props.deleteFile();
                    }
                  }}
                >
                  <img src={trash} height={40} width={40} />
                </div>
              )}
              <Button
                backgroundColor="#52AE32"
                borderColor="#52AE32"
                label="View"
                width="5rem"
                type="button"
              />
            </span>
          ) : (
            <div onClick={handleButtonClick}>
              <UploadButtonSvg1 />
            </div>
          )}
        </div>
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

export default ProfileUploadDocument;
