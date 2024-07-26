import React, { useEffect, useState } from "react";
import LoginPageIcon from "../../../assets/images/Login-bud.svg";
import MobileIcon from "../../../assets/images/MobileIcon.svg";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import OtpInput from "react-otp-input";
import { jwtDecode } from "jwt-decode";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { bffUrl } from "../../../utils/api";
import ButtonAuth from "./ButtonAuth";
import Swal from "sweetalert2";
import { isLinkExpired } from "../../../utils/commonFunction";
import LoaderSpin from "../../LoaderSpin";

interface LoginModelProps {}

const OtpModel: React.FC<LoginModelProps> = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const link = sessionStorage.getItem("link")
  const decoded = jwtDecode(token ?? "");  
  const [loader, setLoader] = useState(false);
  const [button, setButton] = useState("Submit");
  const [startTimer, setStartTimer] = useState(false);
  const [decodedToken, setDecodedToken] = useState<any>(decoded);
  const [mobileOtp, setMobileOtp] = useState<string>("");
  const [emailOtp, setEmailOtp] = useState<string>("");
  const [otp, setOtp] = useState<any>("");
  const [disabled, setDisabled] = useState(true);
  const [showError, setShowError] = useState("");
  const [isValid, setIsValid] = useState<{ email: string; mobile: string }>({
    email: "",
    mobile: "",
  });
  const [sentOtp, setSentOtp] = useState(
    sessionStorage.getItem("otp-sent") === "true" ? true : false
  );
  const [timeLeft, setTimeLeft] = useState(
    parseInt(sessionStorage.getItem("timerSec") ?? "")
  );

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  // useEffect(() => {
  //   if (
  //     sessionStorage.getItem("otp-sent") &&
  //     sessionStorage.getItem("otp-sent") !== "true"
  //   ) {
  //     sendOtp();
  //   }
  // }, []);
  const maskEmail = (email: string) => {
    const [localPart, domain] = email.split("@");
    const maskedLocalPart =
      localPart.length > 4
        ? localPart.slice(0, 3) + "xxx" + localPart.slice(-2)
        : localPart;
    return `${maskedLocalPart}@${domain}`;
  };

  const maskMobile = (mobile: string) => {
    const maskedMobile =
      mobile.length > 4
        ? mobile.slice(0, 2) + "xxx" + mobile.slice(-2)
        : mobile;
    return maskedMobile;
  };

  useEffect(() => {
    if (emailOtp.length === 6 && mobileOtp.length === 6) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [emailOtp, mobileOtp]);

  const handleChangeMobileOtp = (otpValue: any) => {
    // Custom validation logic (e.g., allowing only digits)
    const validInput = /^[0-9]*$/.test(otpValue);

    if (validInput) {
      setMobileOtp(otpValue);
      setIsValid((prev) => ({ ...prev, mobile: "" }));
    } else {
      setIsValid((prev) => ({ ...prev, mobile: "Please enter valid OTP" }));
    }
  };
  const handleChangeEmailOtp = (otpValue: any) => {
    // Custom validation logic (e.g., allowing only digits)
    const validInput = /^[0-9]*$/.test(otpValue);

    if (validInput) {
      setEmailOtp(otpValue);
      setIsValid((prev) => ({ ...prev, email: "" }));
    } else {
      setIsValid((prev) => ({ ...prev, email: "Please enter valid OTP" }));
    }
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setLoader(true)
    axios
      .post(`${bffUrl}/dual-otp/verifyotp`, {
        email: decodedToken?.email,
        mobile: decodedToken?.mobile,
        emailotp: emailOtp,
        mobileotp: "000000",
      })
      .then((response: any) => {
        let data = response.data;
        if (data.success) {
          setShowError("");
          sessionStorage.setItem("otp-sent", "false");
          sessionStorage.setItem("timerSec", "120");
          navigate(link ?? "/");
          sessionStorage.setItem("otp-verified", "true");
        }
      })
      .catch((err: any) => {
        setShowError(err?.response?.data?.message);
      })
      .finally(() => setLoader(false))
  };

  const sendOtp = (event: any) => {
    event.preventDefault();
    if (Object.keys(decodedToken).length > 0) {
      setLoader(true)
      axios
        .post(`${bffUrl}/dual-otp/sendotp`, {
          email: decodedToken?.email,
          mobile: decodedToken?.mobile,
        })
        .then((response: any) => {
          if (response.data.success) {
            sessionStorage.setItem("otp-sent", "true");
            sessionStorage.setItem("timerSec", "120");
            setSentOtp(true);
            setTimeLeft(120);
          }
        })
        .catch((err: any) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Unable to Send OTP, Please try again later!",
          });
        })
        .finally(() => setLoader(false))
    }
  };

  useEffect(() => {
    // Only set the interval if the timeLeft is greater than 0
    if (timeLeft > 0 && sentOtp) {
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        sessionStorage.setItem("timerSec", (timeLeft - 1).toString());
      }, 1000);
      // Clear the interval on component unmount or when timeLeft reaches 0
      return () => clearInterval(intervalId);
    }
    // else{
    sessionStorage.setItem("otp-sent", "false");
    //   sessionStorage.setItem('timerSec', '120')
    //   setTimeLeft(120)
    //   setSentOtp(false)
    // }
  }, [timeLeft, sentOtp]);

  const handleClose = () => {};

  return (
    <Modal
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <div className="bg-black bg-opacity-30 absolute inset-0 flex justify-center items-center shadow-lg">
          <div className="bg-white p-3 rounded-lg md:w-[946px] w-full grid grid-cols-1 md:grid-cols-2 gap-4 shadow-lg m-4">
            <div className="order-1 md:order-2 mt-3">
              <div className="flex justify-between mt-[4px]">
                <div className="w-full text-center">
                  <h1 className="text-[24px] font-bold text-black text-gilroy-medium">
                    OTP Verification
                  </h1>
                  {sentOtp && (
                    <div className="text-center">
                      <span className="text-stone-500 text-base font-normal text-gilroy-medium">
                        Enter the OTP sent to
                        <br />
                      </span>
                      <div className="text-black text-base font-normal text-gilroy-medium mt-2">
                        {/* {decodedToken?.email} */}
                        {decodedToken?.email
                          ? maskEmail(decodedToken.email)
                          : ""}
                      </div>
                      <div className="text-black text-base font-normal text-gilroy-medium mt-2">
                        {/* {decodedToken?.mobile} */}
                        {decodedToken?.mobile
                          ? maskMobile(decodedToken.mobile)
                          : ""}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {isLinkExpired(decoded) ? 
              <main className="mt-40 flex flex-col justify-center items-center bg-[#ffffff]">
              <h1 className="text-2xl font-extrabold text-[#1C468E] tracking-widest">Link is expired</h1>
              <div className="bg-[#E7F0FF] px-2 text-sm rounded mt-2">
                Contact the administrator for activation link
              </div>
              <button className="mt-5">
                <a className="relative inline-block text-sm font-medium text-[#E7F0FF] group focus:outline-none focus:ring">
                  <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#E7F0FF] group-hover:translate-y-0 group-hover:translate-x-0" />
                  <Link className="relative block px-8 py-3 bg-[#1C468E] border border-current" to={"/"}>
                    Go Home!
                  </Link>
                </a>
              </button>
            </main>
            
              :
              sentOtp ? (
                <form className="">
                  <div className="mt-6 md:mt-[24px] relative flex items-center justify-center flex-col">
                    <label htmlFor="">Mobile</label>
                    <OtpInput
                      value={mobileOtp}
                      numInputs={6}
                      onChange={handleChangeMobileOtp}
                      renderSeparator={<span></span>}
                      inputStyle="inputStyle"
                      containerStyle={{
                        display: "flex",
                        justifyContent: "center", // Centers the OTP input fields horizontally
                        flexWrap: "wrap", // Allows the items to wrap in multiple lines if necessary
                        margin: "0 auto", // Centers the container in the available horizontal space
                        width: "100%", // Makes sure the container takes the full width to center correctly
                        maxWidth: "500px",
                      }}
                      renderInput={(props) => <input {...props} />}
                    />
                    <span>Time Left : {formatTime(timeLeft)}</span>
                    {isValid?.mobile !== "" && (
                      <p className="absolute text-[red] -bottom-6">
                        {isValid?.mobile}
                      </p>
                    )}
                  </div>
                  <div className="mt-6 md:mt-[24px] relative flex items-center justify-center flex-col">
                    <label htmlFor="">Email</label>
                    <OtpInput
                      value={emailOtp}
                      numInputs={6}
                      onChange={handleChangeEmailOtp}
                      renderSeparator={<span></span>}
                      inputStyle="inputStyle"
                      containerStyle={{
                        display: "flex",
                        justifyContent: "center", // Centers the OTP input fields horizontally
                        flexWrap: "wrap", // Allows the items to wrap in multiple lines if necessary
                        margin: "0 auto", // Centers the container in the available horizontal space
                        width: "100%", // Makes sure the container takes the full width to center correctly
                        maxWidth: "500px",
                      }}
                      renderInput={(props) => <input {...props} />}
                    />
                    <span>Time Left : {formatTime(timeLeft)}</span>

                    {isValid?.email !== "" && (
                      <p className="absolute text-[red] -bottom-6">
                        {isValid?.email}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="flex flex-row justify-center items-center  mt-10">
                      You didn’t receive a code?
                      <span
                        className={`${
                          timeLeft > 0
                            ? "text-blue-400"
                            : "text-blue-600 hover:cursor-pointer"
                        } font-semibold ml-1 `}
                        onClick={(event) => {
                          if (timeLeft === 0) {
                            sendOtp(event);
                          }
                        }}
                      >
                        Resend
                      </span>
                    </span>
                    <span className="text-red-500 mx-auto">{showError}</span>
                  </div>
                  <div className="mt-5 md:mt-[36px] px-4 md:px-[40px]">
                    <div className="flex justify-center items-center mt-12 ">
                      <ButtonAuth
                        type="submit"
                        loader={loader}
                        label={!loader ? "Submit" : <><LoaderSpin/> &nbsp;Submitting</>}
                        onClick={onSubmit}
                        disabled={disabled}
                      />
                    </div>
                  </div>
                </form>
              ) : (
                <div className=" flex justify-center items-center mt-36 flex-col">
                  <span className="text-center mb-3">
                    Click on send button to send OTP to your registered email
                    and phone number
                  </span>
                  <button
                    className=" bg-[#1C468E] rounded-xl p-3 text-sm font-semibold text-gilroy-medium text-white w-80"
                    onClick={sendOtp}
                    disabled={loader}
                  >
                    {!loader ? "Send" : <><LoaderSpin/>&nbsp;Sending...</>}
                  </button>
                </div>
              )}
            </div>
            <div className="md:order-1 hidden md:flex justify-center items-center">
              <img
                src={LoginPageIcon}
                alt="LoginPageIcon"
                className="w-[200px] h-auto md:w-full"
              />
            </div>
            <div className="md:order-1 flex justify-center items-center md:hidden">
              <img
                src={MobileIcon}
                alt="MobileIcon"
                className="w-[200px] h-auto md:w-full"
              />
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default OtpModel;
