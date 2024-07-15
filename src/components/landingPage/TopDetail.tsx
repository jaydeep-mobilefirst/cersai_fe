import React, { useState } from "react";
import Logo from "../../assets/images/logo.svg";
import {
  contactDetails,
  authlable,
} from "../../utils/hardText/landingpageText";
import RegisterModel from "../userFlow/common/RegisterModal";
import LoginModel from "../userFlow/common/LoginModel";
import ForgetPasswordModel from "../userFlow/common/ForgetPasswordModel";
import RegisterMailPopup from "../userFlow/common/RegisterMailPopup";
import SetNewPasswordModel from "../userFlow/common/SetNewPasswordModel";
import PasswordUpdateModel from "../userFlow/common/PasswordUpdateModel";
import useTopDetailStore from "../../store/TopDetailStore";
import { useLandingStore } from "../../zust/useLandingStore";

interface AuthButtonProps {
  buttontext: string;
  onClick?: () => void;
}

const TopDetail = () => {
  // const [isOpen, setIsOpen] = useState(false);
  // const [showLoginModel, setShowLoginModel] = useState(false);
  // const [showForgetModel, setShowForgetModel] = useState(false);
  // const [showRegisterMailModel, setShowRegisterMailModel] = useState(false);
  // const [showsNewPasswordModel, setShowsNewPasswordModel] = useState(true);
  // const [showsPasswordUpdateModel, setShowsPasswordUpdateModel] =
  //   useState(false);

  const { homePageData } = useLandingStore((state) => state);
  // console.log("contactdetails",homePageData?.homePageData?.contactDetails)

  const {
    isOpen,
    showLoginModel,
    showForgetModel,
    showRegisterMailModel,
    showsNewPasswordModel,
    showsPasswordUpdateModel,
    setIsOpen,
    setShowLoginModel,
    setShowForgetModel,
    setShowRegisterMailModel,
    setShowsNewPasswordModel,
    setShowsPasswordUpdateModel,
  } = useTopDetailStore();

  const openModal = () => {
    setIsOpen(true);
  };
  const openLoginModel = () => {
    setShowLoginModel(true);
  };

  const showRegisterModel = () => {
    setShowLoginModel(false);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const CloseLoginModal = () => {
    setShowLoginModel(false);
  };

  const ShowForgetModel = () => {
    setShowLoginModel(false);
    setShowForgetModel(true);
  };
  const CloseForgetModel = () => {
    setShowForgetModel(false);
  };
  const CloseforgetModelShowLoginModel = () => {
    setShowForgetModel(false);
    setShowLoginModel(true);
  };

  const CloseForgetPasswordShowRegisterMail = () => {
    // setShowRegisterMailModel(false);
    setShowRegisterMailModel(true);
  };

  const closeRegisterMailPopup = () => {
    setShowForgetModel(false);
    setShowRegisterMailModel(false);
  };
  const closeRegisterMailPopupShowLoginPopup = () => {
    setShowForgetModel(false);
    setShowRegisterMailModel(false);
    setShowLoginModel(true);
  };

  const CloseSetNewPasswordModel = () => {
    setShowsNewPasswordModel(false);
  };

  const CloseNewPasswordandshowUpdatePassword = () => {
    setShowsNewPasswordModel(false);
    setShowsPasswordUpdateModel(true);
  };
  const CloseNewPasswordAndshowLoginModel = () => {
    setShowsNewPasswordModel(false);
    setShowLoginModel(true);
  };

  const CloseUpdatePasswordModel = () => {
    setShowsPasswordUpdateModel(false);
  };

  const CloseUpdatePasswordandShowLogin = () => {
    setShowsPasswordUpdateModel(false);
    setShowLoginModel(true);
  };

  const downloadReport = () => {};

  return (
    <div className="relative flex items-center justify-between flex-col md:flex-row my-[19px] mx-[16px] lg:mx-[169px]">
      <div className="m-4 md:m-0">
        <img src={homePageData?.homePageData?.logo[0]?.img} alt="logo" className="w-[88px] h-[88px]" />
      </div>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-gray-800 opacity-30 z-10"
          onClick={closeModal}
        ></div>
      )}
      <div className="flex items-start justify-start flex-col">
        {homePageData?.homePageData?.contactDetails?.map((data:any, idx:any) => {
          return (
            <div className="flex items-center justify-center mb-2" key={idx}>
              <div>
                <img src={data?.img} alt="icon" className="w-[24px] h-[24px]" />
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
        <AuthButton buttontext={homePageData?.homePageData?.authlable[1].text} onClick={openModal} />
        <AuthButton buttontext={homePageData?.homePageData?.authlable[0].text} onClick={openLoginModel} />
      </div>
      {/* Conditionally render ModelDiv based on isOpen state */}
      {isOpen && (
        <div className="fixed flex-row justify-center items-center mt-[35%] md:mt-[50%] lg:mt-[30%] md:ml-[15%] z-20">
          <RegisterModel closeModal={closeModal} />
        </div>
      )}
      {showLoginModel && (
        <LoginModel
          closeModal={CloseLoginModal}
          showRegisterModel={showRegisterModel}
          ShowForgetModel={ShowForgetModel}
        />
      )}

      {showForgetModel && (
        <ForgetPasswordModel
          closeForgetModel={CloseForgetModel}
          closeforgetModelShowLoginModel={CloseforgetModelShowLoginModel}
          closeForgetPasswordandShowRegisterMail={
            CloseForgetPasswordShowRegisterMail
          }
        />
      )}

      {showRegisterMailModel && (
        <RegisterMailPopup
          closeRegisterMailPopup={closeRegisterMailPopup}
          showLoginPopup={closeRegisterMailPopupShowLoginPopup}
        />
      )}
      {/* {showsNewPasswordModel && (
        <SetNewPasswordModel
          closeSetNewPasswordModel={CloseSetNewPasswordModel}
          closeNewPasswordandshowUpdatePassword={
            CloseNewPasswordandshowUpdatePassword
          }
          closeNewPasswordAndshowLoginModel={CloseNewPasswordAndshowLoginModel}
        />
      )}
      {showsPasswordUpdateModel && (
        <PasswordUpdateModel
          closeUpdatePasswordModel={CloseUpdatePasswordModel}
          closeUpdatePasswordandShowLogin={CloseUpdatePasswordandShowLogin}
        />
      )} */}
    </div>
  );
};

const AuthButton: React.FC<AuthButtonProps> = ({ buttontext, onClick }) => {
  return (
    <div className="ml-2">
      <button
        className={`w-full px-[24px] h-10 border rounded-[8px] ${
          buttontext === "Register"
            ? "bg-white text-[#1c468e] border-[#1c468e]"
            : "bg-[#1c468e] text-white"
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
