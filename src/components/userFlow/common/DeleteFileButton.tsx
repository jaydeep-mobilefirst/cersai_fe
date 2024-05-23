import { useState } from "react";
import trashIcon from "../../../assets/images/trash.svg";
import LoaderSpin from "../../LoaderSpin";

type Props = {
  fieldData: any,
  fieldType: string
  onFileChange?: (
    event: any | undefined,
    field: any,
    fieldType: string
  ) => Promise<void>;
}

const DeleteFileButton = ({ fieldData, fieldType, onFileChange }: Props) => {
  const [loader, setLoader] = useState<boolean>(false);
  const deleteFile = async () => {
    console.log({onFileChange});
    if (onFileChange) {
      setLoader(true)
      
      await onFileChange("", fieldData, fieldType)
      setLoader(false)
    }
  }
  return (
    <div onClick={deleteFile}
      className="bg-white mt-1 mr-1 flex justify-center items-center h-10 w-10 rounded">
      {
        loader === true ?
          <LoaderSpin />
          :
          <img
            src={trashIcon}
            onError={() => trashIcon}
            alt="Delete"
            className="rounded h-5 cursor-pointer"
          />
      }
    </div>
  )
}

export default DeleteFileButton