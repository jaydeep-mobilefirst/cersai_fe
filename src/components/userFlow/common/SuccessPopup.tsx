import React, { useState } from "react";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import Tick from "../../../assets/images/Tick.svg";

import add from "../../../assets/images/add.svg";

interface SuccessPopupProps {
  closePopup: () => void;
  showPopup: () => void;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({
  closePopup,
  showPopup,
}) => {
  return (
    <Modal
      open={true}
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
                onClick={closePopup}
                className="absolute top-1 right-2 cursor-pointer p-5"
                alt="cross"
              />
            </div>
            <div className="flex justify-center items-center">
              <img src={Tick} alt="cross" className="" />
            </div>
            <div className=" w-auto text-center  my-2">
              <p className="text-xl font-normal text-gilroy-medium">
                Your registration request has been send successfully and
                approval/rejection of your registration will be informed to you
                via email.
              </p>
            </div>
            <div>
              <h2 className="text-[#52AE32] text-base text-center text-gilroy-medium my-2">
                Your registration acknowledgement ID is "DT76545678"
              </h2>
            </div>

            <hr className="my-4" />
            <div className="flex justify-center  items-center">
              <button
                onClick={showPopup}
                className="bg-[#385723] rounded-xl w-[45%] md:w-[224px] px-4 md:px-10 py-3 text-white font-semibold text-sm"
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

export default SuccessPopup;