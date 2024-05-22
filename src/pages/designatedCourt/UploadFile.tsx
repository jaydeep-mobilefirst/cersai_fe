import React, { useState, ChangeEvent } from "react";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import add from "../../assets/images/CrossIcon.svg";
import UploadIcon from "../../assets/images/new_images/directbox-send.png";

interface UploadFileProps {
  showUploadPopup: boolean;
  file: File | null;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  toggleUploadPopup ?: () => void;
  closePopup: () => void;
}

const UploadFile: React.FC<UploadFileProps> = ({
  showUploadPopup,
  file,
  handleFileChange,
  toggleUploadPopup,
  closePopup,
}) => {
  return (
    <Modal
      open={showUploadPopup}
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
        <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-[#E7F0FF] bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 w-[90%] max-w-[500px] relative">
            <h2 className="text-2xl mb-4 absolute top-1 left-2 p-5 text-gilroy-medium">
              Upload Documents
            </h2>
            <div className="text-right">
              <img
                src={add}
                onClick={closePopup}
                className="absolute top-1 right-2 p-5 cursor-pointer"
                alt="cross"
              />
            </div>
            <div className="bg-[#E7F0FF] rounded-lg text-center p-4 mt-10 mb-10">
              <div className=" flex  justify-center items-center py-2">
                <div className="text-center">
                  <label htmlFor="file-upload">
                    <img src={UploadIcon} className=" cursor-pointer" alt="" />
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".pdf,.jpg,.png,.svg"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>
              <p className="text-[#000000] mb-2 text-xs text-font-Gilroy-Regular">
                Supported formates: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
              </p>
              <p className="text-[#000000] mb-4 text-xs font-Gilroy-Regular">
                File size: Less than 500kb
              </p>
            </div>
            <div className="text-center">
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-[#1c468e] rounded-xl p-3 text-white font-semibold text-sm w-72 inline-block"
              >
                Browse Files
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.jpg,.png,.svg"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default UploadFile;
