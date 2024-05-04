import React from "react";
import logo from "../../../assets/images/logo.svg";

interface Props {
  userName: string;
}

const EmailActivation: React.FC<Props> = ({ userName }) => {
  return (
    <div className="w-[600px] h-[804px] relative bg-white">
      <div className="w-[386px] left-[40px] top-[276px] absolute text-zinc-800 text-base font-normal font-['Gilroy-Medium'] leading-loose">
        We are sending you this Email because your Signup journey is successful.
        Please click on Activate link to set your password.
      </div>
      <div className="w-[386px] left-[40px] top-[537px] absolute text-zinc-800 text-base font-normal font-['Gilroy-Medium'] leading-loose">
        If you didn’t request a password reset, you can ignore this email. Your
        password will not be changed.
      </div>
      <div className="left-[39px] top-[194px] absolute text-lime-900 text-4xl font-normal font-['Gilroy-Medium'] leading-loose">
        Set your Password
      </div>
      <div className="left-[42px] top-[131px] absolute text-zinc-800 text-xl font-normal font-['Gilroy-Medium'] leading-loose">
        Hi {userName},
      </div>
      <div className="px-[22px] py-3 left-[60px] top-[422px] absolute bg-lime-900 rounded-xl justify-start items-start gap-2 inline-flex">
        <div className="text-right text-white text-xl font-normal font-['Gilroy-SemiBold'] leading-normal cursor-pointer">
          Activate Now
        </div>
      </div>
      <img
        className="w-[63.20px] h-16 left-[39px] top-[43px] absolute rounded-[39.50px]"
        src={logo}
        alt="User avatar"
      />
    </div>
  );
};

export default EmailActivation;
