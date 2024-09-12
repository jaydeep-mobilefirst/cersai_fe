import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoaderSpin from "../../../components/LoaderSpin";

interface FooterProps {
  onSubmit?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  loader?: boolean;

  disabled?: boolean;

  hidecontiuebtn?: boolean;
  showbackbtn?: boolean;
  path?: any;
  backNavigation?: any;
}

const FooterDT: React.FC<FooterProps> = ({
  onSubmit,
  loader,
  disabled,

  showbackbtn,
  path,
  backNavigation,
}) => {
  const Navigate = useNavigate();
  return (
    <div>
      {" "}
      <div
        className={`flex flex-col sm:flex-row ${
          showbackbtn ? "justify-between" : "justify-end"
        } items-center space-y-4 sm:space-y-0 pt-4 pb-4`}
      >
        {showbackbtn && (
          <>
            <div
              className="flex flex-row items-center space-x-2"
              // onClick={() => Navigate(path)}
              onClick={backNavigation}
            >
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
              <button className="text-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#385723] text-gilroy-regular">
                Back
              </button>
            </div>
          </>
        )}

        <div className="flex items-center">
          <>
            <>
              <button
                disabled={disabled}
                onClick={onSubmit}
                type="submit"
                className={`${
                  disabled ? "bg-gray-500" : "bg-[#1C468E] mx-3"
                } rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs`}
              >
                {loader ? <LoaderSpin /> : "Save and continue"}
              </button>
            </>
          </>
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

export default FooterDT;
