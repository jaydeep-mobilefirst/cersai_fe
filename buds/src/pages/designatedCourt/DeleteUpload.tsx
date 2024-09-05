import React, { useState } from "react";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import trashIcon from "../../assets/images/trash.svg";
import add from "../../assets/images/add.svg";

interface DeleteUploadProps {
  file: File | null;
  handleDeleteFile: () => void;
  toggleDeletePopup: () => void;
  showDeletePopup: boolean;
}

const DeleteUpload: React.FC<DeleteUploadProps> = ({
  file,
  handleDeleteFile,
  toggleDeletePopup,
  showDeletePopup,
}) => {
  return (
    <Modal
      open={showDeletePopup}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 w-[90%] max-w-[500px] relative">
            <div className="text-right">
              <img
                src={add}
                onClick={toggleDeletePopup}
                className="absolute top-1 right-2 cursor-pointer p-5"
                alt="cross"
              />
            </div>
            <div className="text-center mb-4">
              <img
                src={trashIcon}
                alt="Delete"
                className="w-12 h-12 mx-auto mb-2"
              />
              <p className="text-gray-700 mb-2 text-lg">
                Are You Sure To Delete
              </p>
              <p className="text-[#1c468e] mb-4 text-lg">
                {file ? file.name : "No Document uploaded"}?
              </p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-center">
              <button
                onClick={toggleDeletePopup}
                className="bg-transparent border-[1c468e] border w-[45%] md:w-[224px] rounded-xl px-4 md:px-10 py-3 text-[#1c468e] font-semibold text-sm mr-4 mb-2 md:mb-0"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteFile}
                className="bg-[#1c468e] rounded-xl w-[45%] md:w-[224px] px-4 md:px-10 py-3 text-white font-semibold text-sm"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default DeleteUpload;
