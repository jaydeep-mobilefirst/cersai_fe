import React, {
    ButtonHTMLAttributes,
    FC,
    forwardRef,
    useRef,
    useState,
  } from "react";
  import "./custom_css/upload_button.css";
  import trash from "../../../assets/images/trash.svg"
  import folderOpen from "../../../assets/images/folder-open-light.svg"
  import UploadButtonFolderSvg from "./svgs/UploadButtonFolderSvg";
  import UploadButtonSvg1 from "./svgs/UploadButtonSvg1";
  import { UploadButtonTexts } from "../../../utils/hardText/formComponents";
  import Button from "../common/Button";
  
  interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onFileUpload?: (file: File | null) => void;
    deleteFile ?: () => void
  }
  
  const ProfileUploadDocument: FC<ButtonProps> = forwardRef<
    HTMLButtonElement,
    ButtonProps
  >((props, ref) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileSelected, setFileSelected] = useState(false); // State to track file selection
    const [file, setFile] = useState<any>(null)
    const { onFileUpload, ...restProps } = props;
  
    const handleButtonClick = () => {
      fileInputRef.current?.click();
    };
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      setFileSelected(!!file); // Update the state based on whether a file is selected
      setFile(file)
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
            fileSelected ? "file-selected" : "no-file"
          }`}
          onClick={handleButtonClick}
        >
          <div className="flex items-center space-between gap-2 w-full">
            <img src={folderOpen} alt="Error" height={30} width={30} />
            <div className="text-left">
              <span>{!fileSelected ? UploadButtonTexts.uploadDocument : "Document"}</span>
              <p className="text-gray-400">
                {!fileSelected ? UploadButtonTexts.noDocumentsAdded : file?.name}
              </p>
            </div>
          </div>
          <div>
            {
              fileSelected ? <span className="flex flex-row justify-between"> {props?.deleteFile && <div className="p-1 bg-white flex align-middle mr-4 rounded-lg"><img src={trash} height={40} width={40}/></div>}<Button backgroundColor="#52AE32" borderColor="#52AE32" label="View" width="5rem" type="button"/></span>: <UploadButtonSvg1 />
            }
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