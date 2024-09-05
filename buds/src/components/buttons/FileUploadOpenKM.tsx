import folderOpen from "../../assets/images/folder-open.svg";
import UploadIcon from "../../assets/images/UploadIcon.png";
import { useState } from "react";
import UploadFile from "../../pages/regulator/UploadFile";
import DeleteUpload from "../../pages/regulator/DeleteUpload";
import Swal from "sweetalert2";
import ViewFile from "../userFlow/depositeTaker/ViewFile";
import LoaderSpin from "../LoaderSpin";
import trashIcon from "../../assets/images/trash.svg";
import axios from "axios";
import { bffUrl } from "../../utils/api";
import React from "react";

type Props = {
    setFileData : any
    fileData : string | null
}

const FileUploadOpenKm = ({ setFileData, fileData}: Props) => { 
    const [file, setFile] = useState<File | null>(null)
    const [loader, setLoader] = useState(false);
    const [showUploadPopup, setShowUploadPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
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
       setFile(null)
       setFileData(null)
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoader(true)
        closePopup()
        const allowedMimeTypes = ["image/jpeg","image/png", "application/pdf", "application/msword", "application/vnd.ms-excel", "application/xhtml+xml"]
        var maxFileSize = 5 * 1024 * 1024;
        if (event.target.files && event.target.files.length > 0) {
            // Check for file size
            if (event.target.files[0]?.size > maxFileSize) {
                closePopup();
                let AllowedFileSizeinMB = maxFileSize / (1024 * 1024)
                let CurrentFileSizeinMB = event.target.files[0]?.size / (1024 * 1024)
                Swal.fire({
                    icon : "error",
                    title : "File Size Exceeded",
                    text : `Max file size limit : ${AllowedFileSizeinMB.toFixed()} MB | Uploaded File Size : ${CurrentFileSizeinMB.toFixed(2)} MB`,
                })
                setLoader(false)
                return;
            }

            // Check for File Type
            if (!allowedMimeTypes.includes(event.target.files[0]?.type)) {
                closePopup();
                Swal.fire({
                    icon : "warning",
                    title : "File type allowed only "+ "Jpg/Png, Docx/Xlx/Xlsx PDF",
                    text : `File Type ${event.target.files[0]?.type.split('/')[event.target.files[0]?.type.split('/').length - 1]} not allowed!`
                })
                setLoader(false)
                return;
            }                         
            
            try {
                var formData = new FormData();
                formData.append("file", event.target.files[0]);
                const fileUpload = await axios.post(
                  `${bffUrl}/openkm/save/temp/file`,
                  formData,
                  {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  }
                );
                const data = await fileUpload?.data;
                let uploadFileId = data?.data[0]?.fileId;
                setFileData(uploadFileId)
                setFile(event.target.files[0]);
                toggleUploadPopup();
                closePopup();
                setLoader(false)
            } catch (error) {
                setFileData(null);
                setLoader(false);
                setFile(null);
                setShowUploadPopup(false);
                closePopup();
            }
        }
        else{
            setLoader(false)
        }
    };

    const deleteFile = async () => {
        setLoader(true)
        try {
            await axios.delete(
              `${bffUrl}/openkm/file/delete/${fileData}`
            );
            setLoader(false)
            setFile(null);
            setFileData(null);
            setLoader(false)
          } catch (error) {
            setFile(null);
            setFileData(null);
            setLoader(false)
          }
    }
    
    return (
        <div>
            {showUploadPopup && (
                <UploadFile
                    fileSize={5000}
                    fileTypes={"Jpg/Png, Docx/Xlx/Xlsx PDF"}
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
            <div className="rounded-xl bg-[#E7F0FF] flex flex-col md:flex-row justify-between items-center p-1  text-gilroy-bold mb-4 mt-1">
                <div className="flex flex-row items-center space-x-2 w-full">
                    <div className="my-auto ml-3">
                        <img
                            src={folderOpen}
                            alt="Folder Open Icon"
                            className="bg-white rounded p-1 text-white cursor-pointer"
                            onClick={() => {
                                if (toggleUploadPopup) {
                                    toggleUploadPopup()
                                }
                            }
                            }
                        />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-xs md:text-sm font-normal text-gilroy-medium text-gray-900">
                            {file?.name}
                       </h1>
                        <p className="text-xs md:text-base font-normal text-gilroy-medium text-gray-400">
                            {file ? file?.name : "Upload Document"}
                        </p>
                    </div>
                </div>
                <div className="flex flex-row justify-end w-full md:w-auto ">
                    {file && (
                         <div
                         onClick={deleteFile}
                         className="bg-white mr-1 flex justify-center items-center h-10 w-10 rounded my-auto"
                       >
                         {loader === true ? (
                           <LoaderSpin />
                         ) : (
                           <img
                             src={trashIcon}
                             onError={() => trashIcon}
                             alt="Delete"
                             className="rounded h-5 cursor-pointer"
                           />
                         )}
                       </div>
                    )}
                    <div className="mb-1 mr-3 ">
                        <button
                            type="button"
                            className="bg-[#1C468E] rounded-lg p-3 text-white flex justify-center items-center cursor-pointer h-10 w-[70px] mt-1"
                            onClick={() => {
                                if (!fileData) {
                                    toggleUploadPopup()
                                }
                            }}
                        >
                            {file && fileData ? (
                                <ViewFile uploadFileId={fileData} />
                            ) : (
                                loader ? <LoaderSpin/> : <img
                                    src={UploadIcon}
                                    alt="Upload"
                                    className="w-5"
                                />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FileUploadOpenKm