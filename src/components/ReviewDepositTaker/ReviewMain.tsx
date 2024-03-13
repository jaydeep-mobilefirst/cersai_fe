import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModelDiv from "../ModelPage/ModelDiv";

const ReviewMain = () => {
  const Navigate = useNavigate();
  const [modalOpen, setModalOPen] = useState(false);

  const navigeToLandingPage = () => {
    Navigate("/landingpage");
  };

  const openModelDiv = () => {
    setModalOPen(true);
  };

  const sections = [
    {
      title: "Verification Status",
      buttonText: "Success",
      onClick: openModelDiv,
      fields: [
        { label: "Name", value: "Lorem ipsum" },
        { label: "PAN Details", value: "Lorem ipsum" },
      ],
    },
    {
      title: "Entity Details",
      buttonText: "Edit",
      onClick: navigeToLandingPage,
      fields: [
        { label: "Name of Deposit Taker", value: "Lorem ipsum" },
        { label: "Type of Entity", value: "Lorem ipsum" },
        { label: "Address Line 1", value: "Lorem ipsum" },
        { label: "Address Line 2", value: "Lorem ipsum" },
        { label: "Unique Registration ID", value: "Lorem ipsum" },
        { label: "PIN code", value: "Lorem ipsum" },
        { label: "State", value: "Lorem ipsum" },
        { label: "District", value: "Lorem ipsum" },
      ],
    },
    {
      title: "Regulator Details",
      buttonText: "Edit",
      onClick: navigeToLandingPage,
      fields: [
        { label: "Regulator Name", value: "Lorem ipsum" },
        { label: "Registration Approval Date", value: "Lorem ipsum" },
        { label: "Regulator Registered Number", value: "Lorem ipsum" },
      ],
    },
    {
      title: "Verification Status", // Duplicate? Can be removed if not needed
      buttonText: "Edit",
      onClick: navigeToLandingPage,
      fields: [
        { label: "Nodal Officer Name", value: "Lorem ipsum" },
        { label: "Nodal Officer Email", value: "Lorem ipsum" },
        { label: "Nodal Officer Name", value: "Lorem ipsum" },
        { label: "Nodal Officer Designation", value: "Lorem ipsum" },
      ],
    },
  ];

  return (
    <>
      <div className="container mx-auto relative">
        {sections.map((section, index) => (
          <div className="mb-[16px]" key={index}>
            <div className="rounded-t-lg bg-[#EEF7EB] flex justify-between h-[57px;] text-gilroy-bold">
              <p className="lg:w-[152px] ml-[16px] mt-[16px] text-[16px] lg:text-[20px] pb-2 text-nowrap">
                {section.title}
              </p>
              <button
                onClick={section.onClick}
                className="text-[#385723] text-[16px] lg:text-[20px] mr-[13px] font-normal"
              >
                {section.buttonText}
              </button>
            </div>

            <div className="ml-[16px] mt-[24px] mr-[16px] mb-[24px]">
              <div className="flex flex-col justify-between w-full sm:flex-row">
                <div className="w-full sm:border-r-[0.5px] border-r-[#385723] border-opacity-20 grid gap-y-[16px]">
                  {section.fields.map((field, idx) => (
                    <div
                      className="sm:mr-[48px] flex justify-between"
                      key={idx}
                    >
                      <div className="opacity-60">
                        {field.label}
                        <span className="text-[#ff0000]">*</span>
                      </div>
                      <div>{field.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute">
        <ModelDiv modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </div>
    </>
  );
};

export default ReviewMain;
