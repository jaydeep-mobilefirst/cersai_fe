import React from "react";

const Footer = () => {
  return (
    <div>
      {" "}
      <div className="flex flex-col sm:flex-row justify-end sm:justify-end items-center space-y-4 sm:space-y-0 pt-4 pb-4">
        <div className="flex items-center">
          <button
            type="submit"
            className="bg-[#385723] rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs"
          >
            Save and Continue
          </button>
        </div>
      </div>
      <div>
        <div className="border-[#E6E6E6] border-[1px] w-full"></div>
        <div className="text-gilroy-light text-[#24222B] text-xs cursor-pointer h-16 flex items justify-center items-center">
          <div>© 2024 Protean BUDs, All Rights Reserved.</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;