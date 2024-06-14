import React from "react";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import add from "../../../assets/images/add.svg";
import TickIcon from "../../../assets/images/tickCircleBlue.svg";

interface ApproveProps {
  closePopup: () => void;
  SuccessPopup: () => void;
}

const SchemeSuccessPopUp: React.FC<ApproveProps> = ({
  closePopup,
  SuccessPopup,
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
          minHeight: "100vh",
        }}
      >
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-[300px] md:max-w-[40%] lg:max-w-[30%] relative">
            <div className="text-right">
              <img
                src={add}
                onClick={closePopup}
                className="absolute top-1 right-2 cursor-pointer p-5"
                alt="cross"
              />
            </div>
            <div className="flex flex-col items-center justify-center text-center mb-4">
              <img
                src={TickIcon}
                alt="TickIcon"
                className="h-[52px] w-[52px] mb-3"
              />
              <h1 className="text-[24px] text-[#000000] font-normal font-gilroy-medium mb-1">
                Scheme Creation Successful
              </h1>
              <p className="text-[16px] text-[#666666] font-normal font-gilroy-medium mb-2">
                "Success! Your scheme creation is complete.
              </p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-center space-x-4">
              <button
                onClick={closePopup}
                className="bg-[#1C468E] rounded-xl w-[45%] md:w-[224px] px-4 md:px-10 py-3 text-white font-semibold text-sm transition-colors duration-200"
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

export default SchemeSuccessPopUp;
