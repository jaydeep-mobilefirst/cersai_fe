import React, { useState } from "react";
import Accordion from "../../../../components/customAccordin/CustomAccordin";
import SchemeDetails from "./schemeDetails";
import EntityDetails from "./EntityDetails";
import CreatedBy from "./CreatedBy";
import AuditTrail from "../../../../components/ScehmaManagement/AuditTrail";

import { useNavigate } from "react-router-dom";
import { useScreenWidth } from "../../../../utils/screenSize";
import TaskTabsRg from "../../../../components/ScehmaManagement/TaskTabsRg";
import StatusSuccessPopUp from "./StatusSuccessPopUp";
import InfoIcon from "../../../../assets/images/info-circle.svg";
interface AccordionItem {
  header: React.ReactNode;
  content: React.ReactNode;
}
const SchemesSearchDetailsSM: React.FC = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const screenWidth = useScreenWidth();
  const accordionItems: AccordionItem[] = [
    {
      header: "Scheme Details",
      content: <SchemeDetails />,
    },
    {
      header: "Entity Details",
      content: <EntityDetails />,
    },
    {
      header: "Created By",
      content: <CreatedBy />,
    },
    {
      header: "Audit Trail",
      content: <AuditTrail />,
    },
  ];
  const handleButtonClick = () => {
    // Set showPopup to true to display the popup
    setShowPopup(true);
  };
  const handleBackButtonClick = () => {
    navigate("/rg/my-task");
  };
  return (
    <div className="flex flex-col min-h-screen ">
      <div className="mt-6 mx-8">
        <TaskTabsRg />
      </div>
      <div className="flex flex-row mt-3 mx-8">
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
      <div className="mt-8 mb-8 mx-8">
        <Accordion items={accordionItems} />
      </div>
      <div>
        <div
          className="flex w-full p-8 lg:px-[30px] flex-row justify-between items-center "
          style={{
            width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
          }}
        >
          <div className="flex flex-row items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="shrink-0"
            >
              <path
                d="M15 6L9 12L15 18"
                stroke="#1D1D1B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <button
              onClick={handleBackButtonClick}
              className="text-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#385723]"
            >
              Back
            </button>
          </div>
          <div className="flex items-center">
            <button
              type="submit"
              onClick={handleButtonClick}
              className="bg-[#1C468E] rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs text-gilroy-semibold "
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
      {showPopup && (
        <StatusSuccessPopUp
          closePopup={() => setShowPopup(false)}
          SuccessPopup={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default SchemesSearchDetailsSM;
