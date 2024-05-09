import React from "react";
import LoaderSpin from "../../LoaderSpin";
interface FooterProps {
  onSubmit?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  loader?: boolean;
  disabled?: boolean;
}

const Footer: React.FC<FooterProps> = ({ onSubmit, loader, disabled }) => {
  return (
    <div>
      {" "}
      <div className="flex flex-col sm:flex-row justify-end sm:justify-end items-center space-y-4 sm:space-y-0 pt-4 pb-4">
        <div className="flex items-center">
          <button
            disabled={disabled}
            onClick={onSubmit}
            type="submit"
            className={`${
              disabled ? "bg-gray-500" : "bg-[#385723]"
            } rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs`}
          >
            {loader ? <LoaderSpin /> : " Save and Continue"}
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
