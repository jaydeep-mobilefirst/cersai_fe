import React, { useEffect, useState } from "react";
import blueTickImage from "../../../assets/images/tickCircleBlue.svg"
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HeadComp from "./HeadCom";
import { signupSideBarRegulator } from "../../../utils/hardText/signUpRegulator";
import CrossIcon from "../../../assets/images/CrossIcon.svg";
import { useDepositTakerRegistrationStore } from "../../../zust/deposit-taker-registration/registrationStore";
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
  const { allFormData, sections } = useDepositTakerRegistrationStore((state) => state);

  const [page, setPage] = useState<string | undefined>(location.pathname);

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

  useEffect(() => {
    const data = signupSideBarRegulator.find(
      (p) => p.path === location.pathname
    );
    setPercentage(data?.percentage);
    setPage(data?.path);
  }, [location.pathname]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!allFormData) {
        Navigate("/");
      }
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [allFormData]); 
  return (
    <div className="sm:w-[300px] h-[100vh] md:w-[349px] w-[250px] bg-[#E7F0FF]">
      {/* {isMenuOpen && (
        <div
          className="lg:hidden w-full  flex justify-end items-center p-2"
          onClick={toggleMenu}
        >
          <img src={CrossIcon} alt="Close Menu" className="w-6 h-6" />
        </div>
      )} */}
      {/* <HeadComp /> */}
      <HeadComp isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <hr className="bg-[#000000] w-full md:w-[349px]"></hr>
      <div className="px-[28px] mt-[16px]">
        <div className="h-[101px]">
          <p className="text-[#1c468e] text-xl font-normal font-semibold">
            Regulator
          </p>
          <p className="mt-[16px] text-[#2D2B27] text-base font-normal text-gilroy-medium">
            <span className="text-zinc-800 text-base font-normal text-gilroy-bold">
              {percent}%
            </span>{" "}
            Completed{" "}
          </p>
          <div className="mt-[8px] md:w-[291px] h-2 bg-white rounded-[32px]">
            <div
              className={` ${widthPercentage[percent]} h-2 bg-[#1C468E] rounded-[32px]`}
            />
          </div>
        </div>
        <div className="pt-[16px]">
          <>
            {signupSideBarRegulator.map((item: any) => {
              return (
                <div
                  // onClick={() =>
                  //   handleClick(item.description, item.percentage, item.path)
                  // }
                  key={item.id}
                  className={` mb-[16px] w-full md:w-[290px] h-14 p-2 bg-[#1C468E] rounded-lg justify-between items-center inline-flex ${
                    item.path === page
                      ? "bg-[#1C468E] text-white"
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
                          item.path === page ? "stroke-white" : "text-[#666666]"
                        }`}
                        alt="icon"
                      />
                    )}

                    <p className="ml-[10px]  text-base font-normal leading-tight">
                      {item.description}
                    </p>
                  </div>
                  {
                    sections?.find((s) => item?.description?.trim() === s?.sectionName?.trim())?.completed &&
                    <img src={item.path === page ? item?.tickImgSrc : blueTickImage} className="w-6 h-6 stroke-black" />
                  }
                  {/* <img src={item.tickImgSrc} className="w-6 h-6" alt="icon" /> */}
                </div>
              );
            })}
          </>
        </div>
      </div>
    </div>
  );
};
export default SignUpSideBar;
