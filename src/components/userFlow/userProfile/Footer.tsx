import React, { useEffect } from "react";
import LoaderSpin from "../../LoaderSpin";
import { useLocation, useNavigate } from "react-router-dom";
import useStore from "../../../store/statusStore";

interface FooterProps {
  onSubmit?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  loader?: boolean;
  loader1?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  hidecontiuebtn?: boolean;
  showbackbtn?: boolean;
  path?: any;
  backNavigation?: any;
}

const Footer: React.FC<FooterProps> = ({
  onSubmit,
  loader,
  loader1,
  disabled,
  onClick,
  hidecontiuebtn,
  showbackbtn,
  path,
  backNavigation,
}) => {
  const disabledField = sessionStorage.getItem("user_status");
  const Navigate = useNavigate();

  const location = useLocation();
  const { pathname } = location;

  const { data, loading, error, fetchData } = useStore();

  useEffect(() => {
    if (checkPathName(pathname)) {
      fetchData(); // Trigger the API call when the component mounts
    }
  }, [fetchData]);

  const isConfigurable = sessionStorage.getItem("isConfigurable")

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

  if (pathname == "/dt/profile") {
    var disableFieldStatus = isConfigurable === 'true' ? true : checkPathName(pathname)
      ? disabledField == "RETURNED"
        ? false
        : !data?.profileUpdate
      : !data?.profileUpdate;
  } else {
    disableFieldStatus = checkPathName(pathname)
    ? isConfigurable === 'true' ? true : checkStatus(disabledField)
    : false;
  }

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
              <button
                type="submit"
                className="text-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#385723] text-gilroy-regular"
                onClick={backNavigation}
              >
                Back
              </button>
            </div>
          </>
        )}

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
                    {loader1 ? <LoaderSpin /> : " Save and continue"}
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
        <div className="text-center mt-auto">
        <h1 className="text-[#24222B] text-xs text-wrap text-gilroy-light mt-3 font-normal">
          COPYRIGHT © 2024 CERSAI. ALL RIGHTS RESERVED.
        </h1>
        <p className="text-[#24222B] text-xs text-wrap text-gilroy-light font-normal">
          Powered and managed by{" "}
          <a
            href="https://www.proteantech.in/"
            className="underline text-gilroy-regular font-bold"
            target="_blank"
          >
            Protean eGov Technologies
          </a>{" "}
        </p>
      </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
