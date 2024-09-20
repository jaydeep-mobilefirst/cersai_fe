import React, {useEffect} from "react";
import folderOpen from "../../../assets/images/folder-open.svg";
import UploadIcon from "../../../assets/images/UploadIcon.png";
import ViewFile from "./ViewFile";
import DeleteFileButton from "../common/DeleteFileButton";
import { useContext, useState } from "react";
import UploadFile from "../../../pages/regulator/UploadFile";
import DeleteUpload from "../../../pages/regulator/DeleteUpload";
import { useDepositTakerRegistrationStore } from "../../../zust/deposit-taker-registration/registrationStore";
import { FormHandlerContext } from "../../../contextAPI/useFormFieldHandlers";
import Swal from "sweetalert2";
import LoaderSpin from "../../LoaderSpin";
import { Link, useLocation } from "react-router-dom";
import useStore2 from "../../../store/statusStore2";
import { Tooltip } from "@mui/material";

type Props = {
  data: any;
};

const popperModifiers = [
  {
    name: "offset",
    options: {
      offset: [0, -30], // Adjust the vertical offset value (second value) to 0 or a negative number
    },
  },
];

const DynamicFileUpload = ({ data }: Props) => {
  const { allFormData } = useDepositTakerRegistrationStore((state) => state);
  const fieldType = allFormData?.fileTypes?.find(
    (type: any) => type?.id === data?.fileType
  )?.name;
  const [loader, setLoader] = useState(false);
  const { onFileChange } = useContext(FormHandlerContext);
  const [fieldData, setFieldData] = useState<any>(null);
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const location = useLocation();
  const { pathname } = location;

  const { dataAccess, loading, error, fetchData } = useStore2();

  useEffect(() => {
    if (checkPathName(pathname)) {
      fetchData(); // Trigger the API call when the component mounts
    }
  }, [fetchData]);


  const toggleUploadPopup = () => {
    setShowUploadPopup(true);
  };

  const closePopup = () => {
    setShowUploadPopup(false);
  };

  const toggleDeletePopup = () => {
    setShowDeletePopup(!showDeletePopup);
  };

  const handleDeleteFile = () => {
    const fieldType = allFormData?.fileTypes?.find(
      (type: any) => type?.id === fieldData?.fileType
    )?.name;
    onFileChange("", fieldData, fieldType);
    setFile(null);
    toggleDeletePopup();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoader(true);
    const allowedMimeTypes = fieldType
      .split("/")
      .map((type: any) => {
        switch (type) {
          case "jpg":
          case "jpg":
            return "image/jpeg";
          case "png":
            return "image/png";
          case "pdf":
            return "application/pdf";
          default:
            return undefined;
        }
      })
      .filter(Boolean);
    var maxFileSize =
      (data?.fileSizeLimit ? data?.fileSizeLimit / 1000 : 5) * 1024 * 1024;
    if (event.target.files && event.target.files.length > 0) {
      // Check for file size
      if (event.target.files[0]?.size > maxFileSize) {
        closePopup();
        let AllowedFileSizeinMB = maxFileSize / (1024 * 1024);
        let CurrentFileSizeinMB = event.target.files[0]?.size / (1024 * 1024);
        Swal.fire({
          icon: "error",
          title: "File Size Exceeded",
          text: `Max file size limit : ${AllowedFileSizeinMB.toFixed()} MB | Uploaded File Size : ${CurrentFileSizeinMB.toFixed(
            2
          )} MB`,
        });
        setLoader(false);
        return;
      }

      // Check for File Type
      if (!allowedMimeTypes.includes(event.target.files[0]?.type)) {
        closePopup();
        Swal.fire({
          icon: "warning",
          title: "File type allowed only " + fieldType,
          text: `File Type ${
            event.target.files[0]?.type.split("/")[
              event.target.files[0]?.type.split("/").length - 1
            ]
          } not allowed!`,
        });
        setLoader(false);
        return;
      }
      // Check for File Type
      setFile(event.target.files[0]);
      onFileChange(event.target.files[0], fieldData, fieldType);
      toggleUploadPopup();
      closePopup();
      setLoader(false);
      return;
    } else {
      setLoader(false);
    }
  };

  const disabledField = sessionStorage.getItem("user_status");

  const checkStatus = (status: any): any => {
    switch (disabledField) {
      case "TRANSIT":
        return true;
      case "MOD_REFER_TO_REGULATOR":
        return true;
      case "REFER_TO_REGULATOR":
        return true;
      case "MOD_TRANSIT":
        return true;
      case "PENDING":
        return true;
      case "MOD_PENDING":
        return true;
      default:
        return false;
    }
  };

  const checkPathName = (status: any): any => {
    switch (pathname) {
      case "/dt/profile":
        return true;
      case "/rg/profile":
        return true;
      case "/dc/profile":
        return true;
      case "/ca/profile":
        return true;
      default:
        return false;
    }
  };

  if (pathname == "/dt/profile") {
    var disableFieldStatus = checkPathName(pathname)
      ? disabledField == "RETURNED"
        ? false
        : !dataAccess?.profileUpdate
      : !dataAccess?.profileUpdate;
  } else {
    disableFieldStatus = checkPathName(pathname)
      ? checkStatus(disabledField)
      : false;
  }

  console.log(dataAccess, 'disableFieldStatus')
  return (
      
              
    <Tooltip
            title={data?.documentName === "Certificate of Incorporation"?<p>The document to be uploaded in this section may vary according to the various constitution types. To know the document to upload for your constitution type, please 
            <span className="underline text-blue-400"><Link target={"_blank"} to="https://www.google.com"> click here
            </Link></span></p>:""}
            arrow
            PopperProps={{
              modifiers: popperModifiers,
            }}>
    
    <div key={data?.id}>
      {showUploadPopup && (
        
        <UploadFile
          fileSize={data?.fileSizeLimit}
          fileTypes={fieldType}
          showUploadPopup={showUploadPopup}
          closePopup={closePopup}
          file={file}
          handleFileChange={handleFileChange}
          toggleUploadPopup={toggleUploadPopup}
        />
      )}
      {showDeletePopup && (
        <DeleteUpload
          file={file}
          handleDeleteFile={handleDeleteFile}
          toggleDeletePopup={toggleDeletePopup}
          showDeletePopup={showDeletePopup}
        />
      )}
      <div className='rounded-xl bg-[#E7F0FF] flex flex-col md:flex-row justify-between items-center p-4  text-gilroy-bold mb-4'>
        <div className='flex flex-row items-center space-x-2 w-full'>
          <div className='mt-2'>
            <img
              src={folderOpen}
              alt='Folder Open Icon'
              className='bg-white rounded p-1 text-white cursor-pointer'
              onClick={() => {
                if (toggleUploadPopup) {
                  toggleUploadPopup();
                }
                if (setFieldData) {
                  setFieldData(data);
                }
              }}
            />
          </div>
          <div className='flex flex-col'>
            <h1 className='text-xs md:text-sm font-normal text-gilroy-medium text-gray-900'>
              {data?.documentName}
              {data?.required && <span className='text-red-500'>*</span>}
            </h1>
            <p className='text-xs md:text-base font-normal text-gilroy-medium text-gray-400'>
              {data?.fileName !== "" && data?.fileName !== undefined
                ? data?.fileName
                : "No Document uploaded"}
            </p>
          </div>
        </div>
        <div className='flex flex-row mt-1 justify-end w-full md:w-auto'>
          {disableFieldStatus ? (
            <></>
          ) : (
            <>
              {data?.uploadFileId && (
                <DeleteFileButton
                  fieldData={data}
                  fieldType={fieldType}
                  onFileChange={onFileChange}
                />
              )}
            </>
          )}

          <div className='mt-1'>
            {data?.uploadFileId ? (
              <>
                {" "}
                <button
                  type='button'
                  className='bg-[#1C468E] rounded-lg p-3 text-white flex justify-center items-center cursor-pointer ml-2 h-10 w-[70px]'
                  onClick={() => {
                    if (toggleUploadPopup && !data?.uploadFileId) {
                      toggleUploadPopup();
                    }
                    if (setFieldData && !data?.uploadFileId) {
                      setFieldData(data);
                    }
                  }}
                >
                  {data?.uploadFileId ? (
                    <ViewFile uploadFileId={data?.uploadFileId} />
                  ) : (
                    <img src={UploadIcon} alt='Upload' className='w-5' />
                  )}
                </button>
              </>
            ) : (
              <>
                {" "}
                <button
                  type='button'
                  className='bg-[#1C468E] rounded-lg p-3 text-white flex justify-center items-center cursor-pointer ml-2 h-10 w-[70px]'
                  disabled={disableFieldStatus}
                  onClick={() => {
                    if (toggleUploadPopup && !data?.uploadFileId) {
                      toggleUploadPopup();
                    }
                    if (setFieldData && !data?.uploadFileId) {
                      setFieldData(data);
                    }
                  }}
                >
                  {data?.uploadFileId ? (
                    <ViewFile uploadFileId={data?.uploadFileId} />
                  ) : (
                    <img src={UploadIcon} alt='Upload' className='w-5' />
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <span className='text-red-500'>{data?.error}</span>
      
    </div>
    
    </Tooltip>
  );
};

export default DynamicFileUpload;
