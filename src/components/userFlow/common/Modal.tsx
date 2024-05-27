import closeCircle from "../../../assets/images/closeCircle.svg";
// import Modal from 'react-modal';
import React, { useState } from "react";
import RegisterModel from "./RegisterModal";

const ModelDiv = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro placeat,
        eum eveniet cum, praesentium laudantium corrupti officiis facilis ipsa,
        modi quod. Quam, consequuntur facere nobis dicta animi consectetur!
        Velit, quidem!
      </h1>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-gray-800 opacity-50"
          onClick={closeModal}
        ></div>
      )}
      <div className="relative">
        <button
          onClick={openModal}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Open Modal
        </button>
        {/* Modal */}
        {isOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="bg-white p-4 rounded-md shadow-lg w-[400px] h-[250px] relative">
              <h1 className="text-xl font-bold">Model Div</h1>
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <img src={closeCircle} alt="icon"/>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelDiv;

