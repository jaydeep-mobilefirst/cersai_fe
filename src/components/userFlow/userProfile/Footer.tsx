import React from "react";
import LoaderSpin from "../../LoaderSpin";
import { useLocation } from "react-router-dom";

interface FooterProps {
  onSubmit?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  loader?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  hidecontiuebtn?: boolean;
}

const Footer: React.FC<FooterProps> = ({
  onSubmit,
  loader,
  disabled,
  onClick,
  hidecontiuebtn,
}) => {
  const disabledField = sessionStorage.getItem("user_status");

  const location = useLocation();
  const { pathname } = location;

  const checkStatus = (status: any): any => {
    switch (disabledField) {
      case "TRANSIT":
        return true;
      case "MOD_REFER_TO_REGULATOR":
        return true;
      case "REFER_TO_REGULATOR":
        return true;
      case "MOD_TRANSIT":
        return true;
      case "PENDING":
        return true;
      case "MOD_PENDING":
        return true;
      default:
        return false;
    }
  };

  const checkPathName = (status: any): any => {
    switch (pathname) {
      case "/dt/profile":
        return true;
      case "/rg/profile":
        return true;
      case "/dc/profile":
        return true;
      case "/ca/profile":
        return true;
      default:
        return false;
    }
  };
  const showbtn = checkPathName(pathname);

  const disableFieldStatus = checkPathName(pathname)
    ? checkStatus(disabledField)
    : false;

  return (
    <div>
      {" "}
      <div className="flex flex-col sm:flex-row justify-end sm:justify-end items-center space-y-4 sm:space-y-0 pt-4 pb-4">
        <div className="flex items-center">
          {disableFieldStatus ? (
            <></>
          ) : (
            <>
              {" "}
              {hidecontiuebtn ? (
                <></>
              ) : (
                <>
                  <button
                    disabled={disabled}
                    onClick={onClick}
                    type="submit"
                    className={`${
                      disabled ? "bg-gray-500" : "bg-[#1C468E] mx-3"
                    } rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs`}
                  >
                    Save and continue
                  </button>
                </>
              )}
              {showbtn && (
                <button
                  disabled={disabled}
                  onClick={onSubmit}
                  type="submit"
                  className={`${
                    disabled ? "bg-gray-500" : "bg-[#1C468E]"
                  } rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs`}
                >
                  {loader ? <LoaderSpin /> : " Save and Submit"}
                </button>
              )}
            </>
          )}
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
