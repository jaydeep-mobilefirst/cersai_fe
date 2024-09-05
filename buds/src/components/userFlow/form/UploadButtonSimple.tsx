import React, {
  ButtonHTMLAttributes,
  FC,
  forwardRef,
  useRef,
  useState,
} from "react";
import "./custom_css/upload_button.css";
import uploadIcon from "../../../assets/images/directbox-send.svg"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onFileUpload?: (file: File | null) => void;
}

const UploadButtonSimple: FC<ButtonProps> = forwardRef<
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
    <div onClick={handleButtonClick}>
     <button
      className="bg-[#385723] rounded-xl p-2 text-white font-normal text-sm w-36 flex flex-row align-middle justify-center"
    >
      <span className="mr-2"><img src={uploadIcon} alt="" /></span>Upload
    </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        className="absolute left-0 border"
        onChange={handleFileChange}
      />
    </div>
  );
});

export default UploadButtonSimple;
