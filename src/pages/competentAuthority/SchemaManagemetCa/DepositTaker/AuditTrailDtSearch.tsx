import React, { useState } from "react";
import Accordion from "../../../../components/customAccordin/CustomAccordin";
import VerificationDetails from "./VerificationDetails";
import EntityDetails from "./EntityDetails";
import NodalDetails from "./NodalDetails";
import RegulatorDetails from "./RegulatorDetails";
import TaskTabsCa from "../../../../components/ScehmaManagement/TaskTabsCa";
import InfoIcon from "../../../../assets/images/info-circle.svg";
import UploadIcon from "../../../../assets/images/directbox-send-White.svg";
import UploadPopUp from "./UploadPopUp";
import { useScreenWidth } from "../../../../utils/screenSize";
import SuccessUploadPopUp from "./SuccessUploadPopUp";
import { useNavigate } from "react-router-dom";

interface AccordionItem {
  header: React.ReactNode;
  content: React.ReactNode;
}

const DepositeTakerSearchDetailsSM: React.FC = () => {
  const [uploadPopupOpen, setUploadPopupOpen] = useState(false);
  const [successUploadPopupOpen, setSuccessUploadPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate("/ca/deposit-taker");
  };
  const handleUploadClick = () => {
    setUploadPopupOpen(true);
  };

  const handleClosePopup = () => {
    setUploadPopupOpen(false);
  };
  const handleSuccessUploadClick = () => {
    setSuccessUploadPopupOpen(true);
  };

  const handleSuccessClosePopup = () => {
    setSuccessUploadPopupOpen(false);
  };
  const screenWidth = useScreenWidth();
  const accordionItems: AccordionItem[] = [
    {
      header: "Verification Details",
      content: <VerificationDetails />,
    },

    {
      header: "Entity Details",
      content: <EntityDetails />,
    },
    {
      header: "Nodal Details",
      content: <NodalDetails />,
    },
    {
      header: "Regulator Details",
      content: <RegulatorDetails />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen ">
      <div className="mt-6 mx-2">
        <TaskTabsCa />
      </div>

      <div className="mx-8 mt-4 mb-1">
        <div className="flex  flex-col xl:flex-row md:flex-row lg:flex-row items-center justify-between  ">
          <div className="flex flex-row">
            <img
              src={InfoIcon}
              alt="InfoIcon"
              className="h-6 w-6 sm:h-8 sm:w-8 mr-2"
            />
            <p className="text-[#808080]">
              You can Upload Deposit Takers data in bulk. Please use this given
              <span className="underline line-through:text-blue text-[#BFCFFF]">
                Template
              </span>
            </p>
          </div>
          <div className="mt-3 md:mt-0 lg:mt-0 xl:mt-0">
            <button
              onClick={handleUploadClick}
              type="submit"
              className="bg-[#1c468e] rounded-xl p-2 sm:p-3 text-white font-semibold text-sm sm:text-base w-24 sm:w-28 text-gilroy-semibold flex items-center justify-center"
            >
              <img src={UploadIcon} alt="UploadIcon" className="mr-1" /> Upload
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 mb-8 mx-8">
        <Accordion items={accordionItems} />
      </div>
      <div className="my-11  flex flex-col lg:flex-row lg:items-center justify-between ">
        <div>
          <div
            className="flex w-full p-8  flex-row justify-end items-center"
            style={{
              width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
            }}
          >
            <div className="flex items-center space-x-6">
              <p
                onClick={handleCancelClick}
                className="text-[#1c468e]  rounded-xl p-3 border border-[#1c468e] text-gilroy-medium cursor-pointer text-sm w-full sm:w-auto sm:max-w-xs "
              >
                Cancel
              </p>

              <button
                onClick={handleSuccessUploadClick}
                type="submit"
                className="bg-[#1c468e] rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs text-gilroy-semibold "
              >
                Submit
              </button>
            </div>
          </div>
          <div>
            <div className="border-[#E6E6E6] border-[1px] lg:mt-4"></div>

            <p className="mb-[24px] text-gilroy-light text-center text-[#24222B] text-xs cursor-pointer mt-4">
              © 2024 Protean BUDs, All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
      {uploadPopupOpen && (
        <UploadPopUp closePopup={handleClosePopup} SuccessPopup={() => {}} />
      )}
      {successUploadPopupOpen && (
        <SuccessUploadPopUp
          closePopup={handleSuccessClosePopup}
          SuccessPopup={() => {}}
        />
      )}
    </div>
  );
};

export default DepositeTakerSearchDetailsSM;
