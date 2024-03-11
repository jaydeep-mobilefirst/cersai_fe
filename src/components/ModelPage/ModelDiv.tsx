import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import {
  radioButtons,
  registrationFirstPage,
} from "../../utils/hardText/landingpageText";

interface ModelDivProps {
  modalOpen: boolean;
  setModalOPen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModelDiv: React.FC<ModelDivProps> = ({ modalOpen, setModalOPen }) => {
  const [radioButton, setRadioBtn] = useState(radioButtons[0].text);
  //   const [isOpen, setIsOpen] = useState(false);

  //   const openModal = () => {
  //     setIsOpen(true);
  //   };

  const closeModal = () => {
    setModalOPen(false);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {modalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-gray-800 opacity-50"
          //   onClick={closeModal}
        ></div>
      )}
      <div className="relative">
        {modalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="bg-white p-4 rounded-md shadow-lg relative">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                {radioButtons.map((item) => {
                  return (
                    <div
                      key={item.id} // Assuming there's an id in radioButtons data
                      className={`pl-4 text-[18px] md:mr-[18px] text-gilroy-regular w-[100%] md:w-[244px] mb-[18px] h-14 md:pl-4 pr-[18px] py-4 bg-green-50 rounded-xl flex flex-row  md:flex-col md:justify-start md:items-start gap-2 inline-flex ${
                        radioButton === item.text
                          ? "bg-[#EEF7EB] text-[#385723]"
                          : "bg-white text-black"
                      }`}
                    >
                      <div className="flex flex-row justify-between items-center md:gap-4 inline-flex">
                        <div className="text-lg font-normal  ">
                          <label onClick={() => setRadioBtn(item.text)}>
                            <input
                              type="radio"
                              name="entity"
                              value="Deposit Taker"
                            />{" "}
                            {item.text}
                          </label>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="text-[20px] modal-footer flex flex-start md:flex-row">
                  <button
                    type="button"
                    className="text-[#385723] Rectangle151 w-[40%] md:w-[244px] h-14 rounded-xl border border-[#385723] mr-2"
                    onClick={closeModal} // Close the modal on Cancel button click
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="text-white Rectangle151 w-[40%] md:w-[244px] h-14 rounded-xl border bg-[#385723]"
                  >
                    Select
                  </button>
                </div>
              </form>
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelDiv;
