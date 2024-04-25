import React, { useState } from "react";

import { signupSideBar } from "../../../utils/hardText/signuppageText";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HeadComp from "./HeadCom";
import { signupSideBarCompetent } from "../../../utils/hardText/signUpCompetentText";
import CrossIcon from "../../../assets/images/CrossIcon.svg";
interface SignUpSideBarProps {
  isMenuOpen?: boolean;
  toggleMenu?: () => void;
}

const SignUpSideBar: React.FC<SignUpSideBarProps> = ({
  isMenuOpen,
  toggleMenu,
}) => {
  const Navigate = useNavigate();
  const location = useLocation();

  const [page, setPage] = useState<string>(location.pathname);

  const [percent, setPercentage] = useState<any>(0);
  const widthPercentage: any = {
    0: "w-0",
    25: "w-1/4",
    50: "w-1/2",
    75: "w-3/4",
    100: "w-full",
  };

  const handleClick = (des: string, num: number, path: string) => {
    setPercentage(num);
    setPage(path);
    Navigate(path);
  };

  return (
    <div className="sidebar-container h-screen bg-[#EEF7EB] flex flex-col">
      <div className=" sm:w-[300px] w-[250px] h-[100vh] md:w-[349px] bg-[#EEF7EB]  ">
        {isMenuOpen && (
          <div
            className="lg:hidden w-full  flex justify-end items-center p-2"
            onClick={toggleMenu}
          >
            <img src={CrossIcon} alt="Close Menu" className="w-6 h-6" />
          </div>
        )}
        <HeadComp />
        <hr className="bg-[#000000] w-full md:w-[349px]"></hr>
        <div className="px-[28px] mt-[16px]">
          <div className="h-[101px]">
            <p className="text-[#385723] text-xl font-normal text-gilroy-semibold">
              Competent Authority
            </p>
            <p className="mt-[16px] text-[#2D2B27] text-base font-normal text-gilroy-medium">
              <span className="text-zinc-800 text-base font-normal text-gilroy-bold">
                {percent}%
              </span>{" "}
              Completed{" "}
            </p>
            <div className="mt-[8px] md:w-[291px] h-2 bg-white rounded-[32px]">
              <div
                className={` ${widthPercentage[percent]} h-2 bg-[#52AE32] rounded-[32px]`}
              />
            </div>
          </div>
          <div className="pt-[16px]">
            <>
              {signupSideBarCompetent.map((item) => {
                return (
                  <div
                    onClick={() =>
                      handleClick(item.description, item.percentage, item.path)
                    }
                    key={item.id}
                    className={` mb-[16px] w-full md:w-[290px] h-14 p-2 bg-[#385723] rounded-lg justify-between items-center inline-flex ${
                      item.path === page
                        ? "bg-[#385723] text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    <div className="w-[234px] h-10 justify-start items-center gap-0.5 inline-flex">
                      {item.path === page ? (
                        <img
                          src={item.imgSrcHighlighted}
                          className={` ${
                            item.path === page
                              ? "stroke-white block"
                              : "text-[#666666] hidden"
                          }`}
                          alt="icon"
                        />
                      ) : (
                        <img
                          src={item.imgSrc}
                          className={`${
                            item.path === page
                              ? "stroke-white"
                              : "text-[#666666]"
                          }`}
                          alt="icon"
                        />
                      )}

                      <p className="ml-[10px]  text-base font-normal leading-tight">
                        {item.description}
                      </p>
                    </div>
                    <img src={item.tickImgSrc} className="w-6 h-6" alt="icon" />
                  </div>
                );
              })}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUpSideBar;
