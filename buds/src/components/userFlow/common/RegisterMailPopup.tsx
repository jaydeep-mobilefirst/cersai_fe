import LoginPageIcon from "../../../assets/images/Login-bud.svg";
import CrossIcon from "../../../assets/images/CrossIcon.svg";
import MobileIcon from "../../../assets/images/MobileIcon.svg";
import Loginticketcircel from "../../../assets/images/Login-tick-circle.svg";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React from "react";

interface RegisterMailPopupModelProps {
  closeRegisterMailPopup: () => void;
  showLoginPopup: () => void;
}

const RegisterMailPopup: React.FC<RegisterMailPopupModelProps> = ({
  closeRegisterMailPopup,
  showLoginPopup,
}) => {
  const handleClose = () => {
    closeRegisterMailPopup();
  };

  const handleNavigateLogin = () => {
    showLoginPopup();
  };

  return (
    <Modal
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <div className="bg-black bg-opacity-30 absolute inset-0 flex justify-center items-center shadow-lg">
          <div className="bg-white p-3 rounded-lg md:w-[946px] w-full grid grid-cols-1 md:grid-cols-2 gap-4 shadow-lg m-4">
            <div className="order-1 md:order-2 mt-3">
              <div className="flex justify-end mt-[4px]">
                <div className="lg:top-2 lg:right-10 relative md:top-2 md:right-10 top-[-6rem]">
                  <img
                    src={CrossIcon}
                    alt="CrossIcon"
                    className="cursor-pointer"
                    onClick={handleClose}
                  />
                </div>
              </div>

              {/* <div className=" mt-5 md:mt-[130px] px-4 md:px-[40px]">
                <div className="">
                  <div className="flex justify-center items-center  ">
                    <img src={Loginticketcircel} alt="" />
                  </div>
                  <div>
                    <h1 className="text-gilroy-medium  text-2xl my-5 text-[#000000]">
                      Please check the Registered mail
                    </h1>

                    <div className="flex justify-center items-center flex-col">
                      <p className="text-[#646464] text-gilroy-medium text-base">
                        {" "}
                        We have sent you a link on your
                      </p>
                      <p className="text-[#646464] text-gilroy-medium">
                        {" "}
                        registered email address to reset the
                      </p>
                      <p className="text-[#646464] text-gilroy-medium">
                        {" "}
                        password.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-32 flex justify-center">
                  <p
                    className="text-base font-normal text-gilroy-regular text-[#1C468E] cursor-pointer"
                    onClick={handleNavigateLogin}
                  >
                    Back to Login
                  </p>
                </div>
              </div> */}
              <div className="mt-5 md:mt-[150px] px-4 md:px-[40px]">
                <div className="">
                  <div className="flex justify-center items-center">
                    <img src={Loginticketcircel} alt="Loginticketcircel" />
                  </div>
                  <div>
                    <h1 className="text-gilroy-medium text-2xl my-5 text-[#000000] text-center">
                      Please check the Registered mail
                    </h1>
                    <div className="flex justify-center items-center flex-col text-center">
                      <p className="text-[#646464] text-gilroy-medium text-base">
                        We have sent you a link on your
                      </p>
                      <p className="text-[#646464] text-gilroy-medium">
                        registered email address to reset the
                      </p>
                      <p className="text-[#646464] text-gilroy-medium">
                        password.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-16 md:mt-32 flex justify-center">
                  <p
                    className="text-base font-normal text-gilroy-regular text-[#1C468E] cursor-pointer"
                    onClick={handleNavigateLogin}
                  >
                    Back to Login
                  </p>
                </div>
              </div>
            </div>
            <div className="md:order-1 hidden md:flex justify-center items-center">
              <img
                src={LoginPageIcon}
                alt="LoginPageIcon"
                className="w-[200px] h-auto md:w-full"
              />
            </div>
            <div className="md:order-1 flex justify-center items-center md:hidden">
              <img
                src={MobileIcon}
                alt="MobileIcon"
                className="w-[200px] h-auto md:w-full"
              />
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default RegisterMailPopup;
