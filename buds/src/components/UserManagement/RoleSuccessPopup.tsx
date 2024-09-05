import React from "react";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import add from "../../assets/images/add.svg";
import tickCircle from "../../assets/images/check circle 2.svg";

interface SuccessProps {
  closePopup: () => void;
  SuccessPopup: () => void;
}

const RoleSuccessPopup: React.FC<SuccessProps> = ({
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
            <div className="text-center mb-4">
              <img
                src={tickCircle}
                alt="tickCircle"
                className="w-12 h-12 mx-auto mb-2"
              />
              <p className="text-[#000000] mb-2 text-sm">
                Role Created Successfully
              </p>
              <p className="text-[#666666] mb-4 text-sm">
                A new role has been added successfully
              </p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-center">
              <button
                type="button"
                onClick={SuccessPopup}
                className="bg-[#1C468E] rounded-xl w-full md:w-[224px] px-4 md:px-10 py-3 text-white font-semibold text-sm"
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

export default RoleSuccessPopup;
