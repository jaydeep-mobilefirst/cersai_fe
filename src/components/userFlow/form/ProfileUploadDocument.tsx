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
import UploadButtonSvg1 from "./svgs/UploadButtonSvg1";
import { UploadButtonTexts } from "../../../utils/hardText/formComponents";
import Button from "../common/Button";
import axios from "axios";
import { bffUrl } from "../../../utils/api";
import { getMimeTypeFromArrayBuffer } from "../../../utils/commonFunction";
import Swal from "sweetalert2";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onFileUpload?: (file: File | null) => void;
  deleteFile?: () => void;
  documentName?: string;
  required?: boolean;
  fileSelected?: boolean;
  fileName?: string;
  fileData ?: any
}

const ProfileUploadDocument: FC<ButtonProps> = forwardRef<
  HTMLButtonElement,
  ButtonProps
>((props, ref) => {
  const [resetInput, setResetInput] = useState<boolean>(true)
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { onFileUpload, documentName, ...restProps } = props;
  const [viewLoader, setViewLoader] = useState(false);
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResetInput(false)
    const file = event.target.files?.[0];
    if (file && fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (file && onFileUpload) {
      onFileUpload(file);
    } else if (onFileUpload) {
      onFileUpload(null);
    }
    setResetInput(true)
  };

  const getFileDatafromBuffer = async (arrayBuffer : any) => {    
    const buffer = new Uint8Array(arrayBuffer);
    const type = await getMimeTypeFromArrayBuffer(buffer);
    const blob = new Blob([buffer], { type: type ?? "" });
    const imageUrl = URL.createObjectURL(blob);
    window.open(imageUrl, '_blank', 'noopener')
}

  const handleOnClikcView = async () => {
    try {
      setViewLoader(true)
      const response = await axios.get(`${bffUrl}/openkm/get/${props?.fileData?.uploadFileId}`);
      const data = await response.data;
      if (data?.status === "INTERNAL_SERVER_ERROR") {
        Swal.fire({
          icon : "error",
          title : "Internal Server Error",
          text : "Unable to Open File"
        })
        setViewLoader(false);
        return;
      }
      const arrayBuffer = data?.data?.data
      await getFileDatafromBuffer(arrayBuffer); 
      setViewLoader(false)
    } catch (error) {
      console.log({error});
      setViewLoader(false);
    }
    
  }

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
                <>
                <div
                  className=" bg-white flex align-middle mr-4 rounded-lg"
                  role="button"
                  onClick={() => {
                    if (props.deleteFile) {
                      props.deleteFile();
                    }
                  }}
                  >
                  <img src={trash} height={50} width={50} className="px-2" />
                </div>
                  </>
              )}
              <Button
                onClick={handleOnClikcView}
                backgroundColor="#1C468E"
                borderColor="#1C468E"
                label="View"
                loader={viewLoader}
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
      {resetInput && <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />}
    </div>
  );
});

export default ProfileUploadDocument;
