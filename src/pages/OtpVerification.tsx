import React, { useState } from 'react'
import OTPComponent from "react-otp-input";
import Button from '../components/userFlow/common/Button';
import LoginPageIcon from '../assets/images/Login-bud.svg';
import MobileIcon from "../assets/images/MobileIcon.svg";
type Props = {}

const OtpVerification = (props: Props) => {
  const [loader, setLoader] = useState(false);
  const [otp, setOtp] = useState<any>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isVerified, setIsVerified] = useState<any>(false);

  const handleChange = (otpValue: any) => {
    // Custom validation logic (e.g., allowing only digits)
    const validInput = /^[0-9]*$/.test(otpValue);

    if (validInput) {
      setOtp(otpValue);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const onSubmit = async () => {
    alert(otp);
  };

  const handleClose = () => {};
  return (
    <div className="bg-black bg-opacity-30 absolute inset-0 flex justify-center items-center shadow-lg">
          <div className="bg-white p-3 rounded-lg md:w-[946px] w-full grid grid-cols-1 md:grid-cols-2 gap-4 shadow-lg m-4">
            <div className="order-1 md:order-2 mt-3">
              <div className="flex justify-between mt-[4px]">
                <div className="w-full text-center">
                  <h1 className="text-[24px] font-bold text-black text-gilroy-medium">
                    OTP Verification
                  </h1>

                  <div className="text-center">
                    <span className="text-stone-500 text-base font-normal text-gilroy-medium">
                      Enter the OTP sent to
                      <br />
                    </span>
                    <span className="text-black text-base font-normal text-gilroy-medium">
                      saurabh123@gmail.com
                    </span>
                  </div>
                </div>
              </div>
              <form>
                <div className="mt-6 md:mt-[24px] relative flex items-center justify-center flex-col">
                  <label htmlFor="">Mobile OTP</label>
                  <OTPComponent
                    value={otp}
                    numInputs={4}
                    onChange={handleChange}
                    renderSeparator={<span></span>}
                    inputStyle="inputStyle"
                    renderInput={(props) => <input {...props} />}
                  />
                  {!isValid && (
                  <p className="absolute text-[red] -bottom-6">
                    Please enter number only
                  </p>
                )}
                </div>
                <div className="mt-6 md:mt-[24px] relative flex items-center justify-center flex-col">
                  <label htmlFor="">Email OTP</label>
                  <OTPComponent
                    value={otp}
                    numInputs={4}
                    onChange={handleChange}
                    renderSeparator={<span></span>}
                    inputStyle="inputStyle"
                    renderInput={(props) => <input {...props} />}
                  />
                  {!isValid && (
                  <p className="absolute text-[red] -bottom-6">
                    Please enter number only
                  </p>
                )}
                </div>
                <div className="mt-5 md:mt-[36px] px-4 md:px-[40px]">
                  <div className="flex justify-center items-center mt-12 ">
                    <Button
                      type="submit"
                      loader={loader}
                      label={!loader ? "Submit" : "Loading..."}
                      onClick={onSubmit}
                    />
                  </div>
                </div>
              </form>
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
  )
}

export default OtpVerification