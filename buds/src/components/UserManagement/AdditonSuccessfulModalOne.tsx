import React from "react";
import add from "../../assets/images/add.svg";
import tickCircle from "../../assets/images/tickCircle.svg";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
interface AdditionSuccessfulModalProps {
  heading: string;
  paragraph: string;
  onClose: () => void;
  onSave?: () => void;
  logo ?: any
}
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  p: 4,
};

const AdditionSuccessfulModalOne: React.FC<AdditionSuccessfulModalProps> = ({
  heading,
  paragraph,
  onClose,
  onSave,
  logo
}) => {
  return (
    <>
      <Modal
        open={true}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col justify-center m-[16px] md:m-[0px] w-[90%] md:w-[544px] rounded-2xl p-[8px] text-gilroy-medium pb-[32px] shadow-xl bg-white">
            <div
              className="flex flex-row justify-end cursor-pointer"
              onClick={onClose}
            >
              <img src={add} className="w-6 h-6" alt="icon" />
            </div>
            <div className="flex flex-col items-center">
              <img src={logo ? logo : tickCircle} className="w-[52px] h-[52px]" alt="icon" />
              <h1 className="mt-[32px] text-center text-black text-2xl font-normal">
                {heading}
              </h1>
              <p className="mt-[8px] text-center text-[#666666] text-base font-normal">
                {paragraph}
              </p>
              <hr className="w-[85%] bg-[#E6E6E6] mx-4 md:mx-[38px] my-[22px]"></hr>
              <div className="flex flex-row justify-center">
                <button
                  className="w-[224px] h-[56px] bg-[#1c468e] rounded-xl text-white"
                  onClick={onSave}
                >
                  Okay
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};
export default AdditionSuccessfulModalOne;
