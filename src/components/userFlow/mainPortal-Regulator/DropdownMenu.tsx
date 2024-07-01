import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { bffUrl } from "../../../utils/api";
import { useDepositTakerRegistrationStore } from "../../../zust/deposit-taker-registration/registrationStore";
type DropdownMenuProps = {
  toggleDropdown: () => void; // This is a function prop
  isOpen: boolean; // This is a boolean state
  setIsOpen: (open: boolean) => void; // This is a function
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  isOpen,
  toggleDropdown,
  setIsOpen,
}) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState<boolean>(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // const toggleDropdown = () => {
  //   setIsOpen(!isOpen);
  // };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        toggleDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleDropdown]);

  const handleLogOut = () => {
    logoutApiHandle();
  };

  const logoutApiHandle = () => {
    setLoader(true);
    const refreshToken = sessionStorage.getItem("refresh_token");
    axios
      .post(`${bffUrl}/logout`, {
        refresh_token: refreshToken,
      })
      .then((responce) => {
        navigate("/");
        sessionStorage.clear();
      })
      .catch((error) => {
        navigate("/");
        sessionStorage.clear();
      });
  };

  const handleSetting = () => {
    setIsOpen(false);
    navigate("/rg/profile?current=regulator");
  };

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <div className="cursor-pointer" onClick={toggleDropdown}>
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-[#000] font-medium"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-[#000] font-medium"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </div>

      {isOpen && (
        <div className="origin-top-right mt-10 absolute right-0  w-56 rounded-md shadow-sm bg-white ring-1 ring-black ring-opacity-5 ">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {/* <div
              className="block px-4 py-2 text-base text-gilroy-regular text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Dashboard
            </div> */}

            {/* <div
              onClick={handleSetting}
              className="block px-4 py-2 text-base text-gilroy-regular text-gray-700 hover:bg-gray-100 cursor-pointer"
              role="menuitem"
            >
              Setting
            </div> */}

            {loader ? (
              <div className="flex items-start px-4 py-2 text-base text-gilroy-regular text-gray-700 hover:bg-gray-100">
                <div>
                  <LoaderSpin />
                </div>
              </div>
            ) : (
              <div
                className="block px-4 py-2 text-base text-gilroy-regular text-gray-700 hover:bg-gray-100"
                onClick={handleLogOut}
              >
                Logout
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const LoaderSpin = () => {
  return (
    <>
      <div
        role="status"
        className="text-center flex items-center justify-center"
      >
        {" "}
        Logout &nbsp;
        <div>
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-200 animate-spin fill-white"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default DropdownMenu;
