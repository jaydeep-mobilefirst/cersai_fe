

import React, { useState } from "react";
import Logo from "../../assets/images/logo.svg";
import { contactDetails, authlable } from "../../utils/hardText/landingpageText";
import RegisterModel from "../userFlow/common/RegisterModal";


interface AuthButtonProps {
  buttontext: string;
  onClick?: () => void; // Adding onClick function prop
}

const TopDetail = () => {

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const downloadReport = () => {};

  return (
    <div className="relative flex items-center justify-between flex-col md:flex-row my-[19px] mx-[16px] lg:mx-[169px]">
      <div className="m-4 md:m-0">
        <img src={Logo} alt="logo" />
      </div>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-gray-800 opacity-30"
          onClick={closeModal}
        ></div>
      )}
      <div className="flex items-start justify-start flex-col">
        {contactDetails.map((data, idx) => {
          return (
            <div className="flex items-center justify-center mb-2" key={idx}>
              <div>
                <img src={data?.imgsrc} alt="icon" />
              </div>
              {idx === 2 ? (
                <>
                  <div
                    className="ml-4 text-[#797979] text-gilroy-regular cursor-pointer underline"
                    onClick={downloadReport}
                  >
                    {data?.text}
                  </div>
                </>
              ) : (
                <>
                  <div className="ml-4 text-[#797979] text-gilroy-regular">
                    {data?.text}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex items-center m-4 md:m-0">
        <AuthButton buttontext={authlable[1]} onClick={openModal} />
        <AuthButton buttontext={authlable[0]}  />
      </div>
      {/* Conditionally render ModelDiv based on isOpen state */}
      {isOpen && 
      <div className="fixed flex-row justify-center items-center mt-[35%] md:mt-[50%] lg:mt-[30%] md:ml-[15%]"><RegisterModel closeModal={closeModal} />
      </div>}
    </div>
  );
};

const AuthButton: React.FC<AuthButtonProps> = ({ buttontext, onClick }) => {
  return (
    <div className="ml-2">
      <button
        className={`w-full px-[24px] h-10 border rounded-[8px] ${
          buttontext === "Register"
            ? "bg-white text-[#338218] border-[#338218]"
            : "bg-[#338218] text-white"
        } rounded-lg justify-center items-center inline-flex`}
        onClick={onClick} // Add onClick handler
      >
        <div className="text-center text-base font-normal text-gilroy-medium  leading-normal">
          {buttontext}
        </div>
      </button>
    </div>
  );
};

export default TopDetail;
