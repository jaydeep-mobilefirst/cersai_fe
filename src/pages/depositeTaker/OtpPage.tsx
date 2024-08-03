// import React, { useEffect, useState } from "react";
// import Button from "../../components/Otp/Button";
// import Modal from "@mui/material/Modal";
// import { Box } from "@mui/material";
// import { useDepositTakerRegistrationStore } from "../../zust/deposit-taker-registration/registrationStore";
// import { useNavigate } from "react-router-dom";
// import OTPInput from "react-otp-input";

// // Responsive style adjustments with enhanced modal dimensions and padding
// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   overflow: "hidden",
//   transform: "translate(-50%, -50%)",
//   width: { xs: "90%", sm: "80%", md: "70%", lg: "600px" }, // Responsive width
//   maxHeight: "calc(100vh - 20px)",
//   overflowY: "auto",
//   p: { xs: 2, sm: 3, md: 4 }, // Responsive padding
//   display: "flex",
//   flexDirection: "column",
// };

// interface OtpPageProps {
//   closeShowOtpModel: () => void;
//   redirectLink: string;
// }

// const OtpPage: React.FC<OtpPageProps> = ({
//   closeShowOtpModel,
//   redirectLink,
// }) => {
//   const navigate = useNavigate();
//   const [loader, setLoader] = useState(false);
//   const { allFormData } = useDepositTakerRegistrationStore((state) => state);
//   const [mobileTimer, setMobileTimer] = useState<number>(60);
//   const [emailTimer, setEmailTimer] = useState<number>(60);
//   const [disabled, setDisabled] = useState(true);
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState<"success" | "error" | null>(
//     null
//   );
//   const [mobileOtp, setMobileOtp] = useState<string>("");
//   const [emailOtp, setEmailOtp] = useState<string>("");
//   const [mobileOtpError, setMobileOtpError] = useState<string>("");
//   const [emailOtpError, setEmailOtpError] = useState<string>("");

//   const maskEmail = (email: string) => {
//     const [localPart, domain] = email.split("@");
//     const maskedLocalPart =
//       localPart.length > 4
//         ? localPart.slice(0, 3) + "xxx" + localPart.slice(-2)
//         : localPart;
//     return `${maskedLocalPart}@${domain}`;
//   };

//   const maskMobile = (mobile: string) => {
//     const maskedMobile =
//       mobile.length > 4
//         ? mobile.slice(0, 2) + "xxx" + mobile.slice(-2)
//         : mobile;
//     return maskedMobile;
//   };

//   useEffect(() => {
//     const updateTimers = () => {
//       setMobileTimer((prevTime) => {
//         const newTime = prevTime > 0 ? prevTime - 1 : 0;
//         localStorage.setItem("mobileTimer", newTime.toString());
//         return newTime;
//       });
//       setEmailTimer((prevTime) => {
//         const newTime = prevTime > 0 ? prevTime - 1 : 0;
//         localStorage.setItem("emailTimer", newTime.toString());
//         return newTime;
//       });
//     };

//     updateTimers(); // Update timers immediately on mount
//     const timer = setInterval(updateTimers, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   useEffect(() => {
//     if (mobileOtp.length === 6 && emailOtp.length === 6) {
//       setDisabled(false);
//     }
//   }, [mobileOtp, emailOtp]);

//   const resendMobileOtp = async () => {
//     try {
//       await axios.post(`/dual-otp/sendotp`, {
//         email: email,
//         mobile: mobile,
//       });
//       setMobileTimer(60);
//       localStorage.setItem("mobileTimer", "60");
//     } catch (error) {
//       console.error("Failed to resend mobile OTP:", error);
//     }
//   };

//   const resendEmailOtp = async () => {
//     try {
//       await axios.post(`/dual-otp/sendotp`, {
//         email: email,
//         mobile: mobile,
//       });
//       setEmailTimer(60);
//       localStorage.setItem("emailTimer", "60");
//     } catch (error) {
//       console.error("Failed to resend email OTP:", error);
//     }
//   };

//   const mobile = allFormData?.formFields?.form_fields?.find(
//     (field: any) => field?.label === "Nodal Officer Mobile Number"
//   )?.userInput;
//   const email = allFormData?.formFields?.form_fields?.find(
//     (field: any) => field?.label === "Nodal Officer Email"
//   )?.userInput;

//   const onMobileOtpChange = (otpValue: string) => {
//     if (/^[0-9]*$/.test(otpValue)) {
//       setMobileOtp(otpValue);
//       setMobileOtpError("");
//     } else {
//       setMobileOtpError("Invalid OTP. Only numeric values are allowed.");
//     }
//   };

//   const onEmailOtpChange = (otpValue: string) => {
//     if (/^[0-9]*$/.test(otpValue)) {
//       setEmailOtp(otpValue);
//       setEmailOtpError("");
//     } else {
//       setEmailOtpError("Invalid OTP. Only numeric values are allowed.");
//     }
//   };

//   const onSubmit = async (event: any) => {
//     event.preventDefault();
//     if (mobileOtp.length === 6 && emailOtp.length === 6) {
//       setLoader(true);
//       try {
//         const response = await axios.post(`/dual-otp/verifyotp`, {
//           email: email,
//           mobile: mobile,
//           emailotp: emailOtp,
//           mobileotp: mobileOtp,
//         });

//         if (response.data.success) {
//           setLoader(false);
//           setMessageType("success");
//           setMessage(response.data.message);
//           localStorage.setItem(
//             "nodalVerification",
//             JSON.stringify({ verified: true })
//           );
//           setTimeout(() => {
//             closeShowOtpModel();
//             navigate(redirectLink);
//           }, 2000);
//         } else {
//           setMessageType("error");
//           setMessage(response.data.message);
//         }
//       } catch (error: any) {
//         console.log(error?.message, "error");
//         setLoader(false);
//         setMessage(error.response?.data?.message || "OTP verification failed");
//         setMessageType("error");
//       }
//     }
//   };

//   return (
//     <Modal
//       open={true}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//     >
//       <Box sx={style}>
//         <div className="flex flex-col justify-center items-center w-full">
//           <div className="bg-white rounded-2xl overflow-hidden shadow-lg max-w-full">
//             <div className="bg-[#E7F0FF] py-6 text-center text-lg sm:text-xl md:text-2xl text-[24px] text-gilroy-medium">
//               Verify your mobile number and email ID
//             </div>
//             {message && (
//               <p
//                 className={`flex justify-center items-center ${
//                   messageType === "success" ? "text-[#1c648e]" : "text-red-600"
//                 }`}
//               >
//                 {message}
//               </p>
//             )}
//             <div className="p-3">
//               <div className="flex justify-between items-center mt-4">
//                 <label className="block text-sm sm:text-base text-gilroy-medium ml-3">
//                   Mobile OTP <span className="text-red-600">*</span>
//                 </label>
//                 <div className="flex justify-end items-center space-x-3 mr-6 text-gilroy-medium">
//                   <div className="text-xs sm:text-sm text-black">
//                     {mobileTimer > 0
//                       ? `${String(Math.floor(mobileTimer / 60)).padStart(
//                           2,
//                           "0"
//                         )}:${String(mobileTimer % 60).padStart(2, "0")}`
//                       : "00:00"}
//                   </div>
//                   <div>
//                     <button
//                       onClick={resendMobileOtp}
//                       disabled={mobileTimer > 0}
//                       className={`${
//                         mobileTimer > 0
//                           ? "cursor-not-allowed text-gray-500"
//                           : "text-[#1C468E]"
//                       }`}
//                     >
//                       Send again
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               <OTPInput
//                 value={mobileOtp}
//                 numInputs={6}
//                 onChange={onMobileOtpChange}
//                 renderSeparator={<span></span>}
//                 inputStyle="inputStyle"
//                 containerStyle={{
//                   display: "flex",
//                   justifyContent: "center", // Centers the OTP input fields horizontally
//                   flexWrap: "wrap", // Allows the items to wrap in multiple lines if necessary
//                   margin: "0 auto", // Centers the container in the available horizontal space
//                   width: "100%", // Makes sure the container takes the full width to center correctly
//                   maxWidth: "500px",
//                 }}
//                 renderInput={(props) => <input {...props} />}
//               />
//               {mobileOtpError && (
//                 <div className="text-red-600 text-xs mt-1">
//                   {mobileOtpError}
//                 </div>
//               )}
//               <span className="text-xs sm:text-sm text-gray-400 ml-3 text-gilroy-medium">
//                 {`OTP sent on +91 ${maskMobile(mobile)}`}
//               </span>

//               <div className="flex justify-between items-center mt-4 ml-3">
//                 <label className="block text-sm sm:text-base text-gilroy-medium">
//                   Email OTP <span className="text-red-600">*</span>
//                 </label>
//                 <div className="flex justify-end items-center space-x-3 mr-6 text-gilroy-medium">
//                   <div className="text-xs sm:text-sm text-black">
//                     {emailTimer > 0
//                       ? `${String(Math.floor(emailTimer / 60)).padStart(
//                           2,
//                           "0"
//                         )}:${String(emailTimer % 60).padStart(2, "0")}`
//                       : "00:00"}
//                   </div>
//                   <div>
//                     <button
//                       onClick={resendEmailOtp}
//                       disabled={emailTimer > 0}
//                       className={`${
//                         emailTimer > 0
//                           ? "cursor-not-allowed text-gray-500"
//                           : "text-[#1C468E]"
//                       }`}
//                     >
//                       Send again
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               <OTPInput
//                 value={emailOtp}
//                 numInputs={6}
//                 onChange={onEmailOtpChange}
//                 renderSeparator={<span></span>}
//                 inputStyle="inputStyle"
//                 containerStyle={{
//                   display: "flex",
//                   justifyContent: "center", // Centers the OTP input fields horizontally
//                   flexWrap: "wrap", // Allows the items to wrap in multiple lines if necessary
//                   margin: "0 auto", // Centers the container in the available horizontal space
//                   width: "100%", // Makes sure the container takes the full width to center correctly
//                   maxWidth: "500px",
//                 }}
//                 renderInput={(props) => <input {...props} />}
//               />
//               {emailOtpError && (
//                 <div className="text-red-600 text-xs mt-1">{emailOtpError}</div>
//               )}
//               <span className="text-xs sm:text-sm text-gray-400 ml-3 text-gilroy-medium">
//                 {`OTP sent on ${maskEmail(email)}`}
//               </span>
//               <hr className=" ml-4 mr-4 mt-6" />
//               <div className="flex justify-between sm:p-4 space-x-3">
//                 <Button
//                   label="Back"
//                   variant="outlined"
//                   onClick={closeShowOtpModel}
//                 />
//                 <Button
//                   label="Verify"
//                   variant="filled"
//                   loader={loader}
//                   onClick={onSubmit}
//                   disabled={disabled}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </Box>
//     </Modal>
//   );
// };

// export default OtpPage;
import React, { useEffect, useState } from "react";
import Button from "../../components/Otp/Button";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { useDepositTakerRegistrationStore } from "../../zust/deposit-taker-registration/registrationStore";
import { useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import { axiosTraceIdInstance } from "../../utils/axios";

// Responsive style adjustments with enhanced modal dimensions and padding
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  overflow: "hidden",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "80%", md: "70%", lg: "600px" }, // Responsive width
  maxHeight: "calc(100vh - 20px)",
  overflowY: "auto",
  p: { xs: 2, sm: 3, md: 4 }, // Responsive padding
  display: "flex",
  flexDirection: "column",
};

interface OtpPageProps {
  closeShowOtpModel: () => void;
  redirectLink: string;
}

const OtpPage: React.FC<OtpPageProps> = ({
  closeShowOtpModel,
  redirectLink,
}) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const { allFormData } = useDepositTakerRegistrationStore((state) => state);
  const [mobileTimer, setMobileTimer] = useState<number>(60);
  const [emailTimer, setEmailTimer] = useState<number>(60);
  const [disabled, setDisabled] = useState(true);
  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );
  const [mobileOtp, setMobileOtp] = useState<string>("");
  const [emailOtp, setEmailOtp] = useState<string>("");
  const [mobileOtpError, setMobileOtpError] = useState<string>("");
  const [emailOtpError, setEmailOtpError] = useState<string>("");

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
    const updateTimers = () => {
      setMobileTimer((prevTime) => {
        const newTime = prevTime > 0 ? prevTime - 1 : 0;
        localStorage.setItem("mobileTimer", newTime.toString());
        return newTime;
      });
      setEmailTimer((prevTime) => {
        const newTime = prevTime > 0 ? prevTime - 1 : 0;
        localStorage.setItem("emailTimer", newTime.toString());
        return newTime;
      });
    };

    updateTimers(); // Update timers immediately on mount
    const timer = setInterval(updateTimers, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (mobileOtp.length === 6 && emailOtp.length === 6) {
      setDisabled(false);
    }
  }, [mobileOtp, emailOtp]);

  const resendMobileOtp = async () => {
    try {
      await axiosTraceIdInstance.post(`/dual-otp/sendotp`, {
        email: email,
        mobile: mobile,
      });
      setMobileTimer(60);
      localStorage.setItem("mobileTimer", "60");
    } catch (error) {
      console.error("Failed to resend mobile OTP:", error);
    }
  };

  const resendEmailOtp = async () => {
    try {
      await axiosTraceIdInstance.post(`/dual-otp/sendotp`, {
        email: email,
        mobile: mobile,
      });
      setEmailTimer(60);
      localStorage.setItem("emailTimer", "60");
    } catch (error) {
      console.error("Failed to resend email OTP:", error);
    }
  };

  const mobile = allFormData?.formFields?.form_fields?.find(
    (field: any) => field?.label === "Nodal Officer Mobile Number"
  )?.userInput;
  const email = allFormData?.formFields?.form_fields?.find(
    (field: any) => field?.label === "Nodal Officer Email"
  )?.userInput;

  const onMobileOtpChange = (otpValue: string) => {
    if (/^[0-9]*$/.test(otpValue)) {
      setMobileOtp(otpValue);
      setMobileOtpError("");
    } else {
      setMobileOtpError("Invalid OTP. Only numeric values are allowed.");
    }
  };

  const onEmailOtpChange = (otpValue: string) => {
    if (/^[0-9]*$/.test(otpValue)) {
      setEmailOtp(otpValue);
      setEmailOtpError("");
    } else {
      setEmailOtpError("Invalid OTP. Only numeric values are allowed.");
    }
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (mobileOtp.length === 6 && emailOtp.length === 6) {
      setLoader(true);
      setDisabled(true); // Disable the button after submission
      try {
        const response = await axiosTraceIdInstance.post(`/dual-otp/verifyotp`, {
          email: email,
          mobile: mobile,
          emailotp: emailOtp,
          mobileotp: mobileOtp,
        });

        if (response.data.success) {
          setLoader(false);
          setMessageType("success");
          
          setMessage(response.data.message);
          localStorage.setItem(
            "nodalVerification",
            JSON.stringify({ verified: true })
          );
          setTimeout(() => {
            closeShowOtpModel();
            navigate(redirectLink);
          }, 2000);
        } else {
          setLoader(false);
          setMessageType("error");
          setMessage(response.data.message);
          setDisabled(false); // Re-enable the button if verification fails
        }
      } catch (error: any) {
        setLoader(false);
        setMessage(error.response?.data?.message || "OTP verification failed");
        setMessageType("error");
        setDisabled(false); // Re-enable the button if an error occurs
      }
    }
  };

  return (
    <Modal
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex flex-col justify-center items-center w-full">
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg max-w-full">
            <div className="bg-[#E7F0FF] py-6 text-center text-lg sm:text-xl md:text-2xl text-[24px] text-gilroy-medium">
              Verify your mobile number and email ID
            </div>
            {message && (
              <p
                className={`flex justify-center items-center ${
                  messageType === "success" ? "text-[#1c648e]" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
            <div className="p-3">
              <div className="flex justify-between items-center mt-4">
                <label className="block text-sm sm:text-base text-gilroy-medium ml-3">
                  Mobile OTP <span className="text-red-600">*</span>
                </label>
                <div className="flex justify-end items-center space-x-3 mr-6 text-gilroy-medium">
                  <div className="text-xs sm:text-sm text-black">
                    {mobileTimer > 0
                      ? `${String(Math.floor(mobileTimer / 60)).padStart(
                          2,
                          "0"
                        )}:${String(mobileTimer % 60).padStart(2, "0")}`
                      : "00:00"}
                  </div>
                  <div>
                    <button
                      onClick={resendMobileOtp}
                      disabled={mobileTimer > 0}
                      className={`${
                        mobileTimer > 0
                          ? "cursor-not-allowed text-gray-500"
                          : "text-[#1C468E]"
                      }`}
                    >
                      Send again
                    </button>
                  </div>
                </div>
              </div>
              <OTPInput
                value={mobileOtp}
                numInputs={6}
                onChange={onMobileOtpChange}
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
              {mobileOtpError && (
                <div className="text-red-600 text-xs mt-1">
                  {mobileOtpError}
                </div>
              )}
              <span className="text-xs sm:text-sm text-gray-400 ml-3 text-gilroy-medium">
                {`OTP sent on +91 ${maskMobile(mobile)}`}
              </span>

              <div className="flex justify-between items-center mt-4 ml-3">
                <label className="block text-sm sm:text-base text-gilroy-medium">
                  Email OTP <span className="text-red-600">*</span>
                </label>
                <div className="flex justify-end items-center space-x-3 mr-6 text-gilroy-medium">
                  <div className="text-xs sm:text-sm text-black">
                    {emailTimer > 0
                      ? `${String(Math.floor(emailTimer / 60)).padStart(
                          2,
                          "0"
                        )}:${String(emailTimer % 60).padStart(2, "0")}`
                      : "00:00"}
                  </div>
                  <div>
                    <button
                      onClick={resendEmailOtp}
                      disabled={emailTimer > 0}
                      className={`${
                        emailTimer > 0
                          ? "cursor-not-allowed text-gray-500"
                          : "text-[#1C468E]"
                      }`}
                    >
                      Send again
                    </button>
                  </div>
                </div>
              </div>
              <OTPInput
                value={emailOtp}
                numInputs={6}
                onChange={onEmailOtpChange}
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
              {emailOtpError && (
                <div className="text-red-600 text-xs mt-1">{emailOtpError}</div>
              )}
              <span className="text-xs sm:text-sm text-gray-400 ml-3 text-gilroy-medium">
                {`OTP sent on ${maskEmail(email)}`}
              </span>
              <hr className=" ml-4 mr-4 mt-6" />
              <div className="flex justify-between sm:p-4 space-x-3">
                <Button
                  label="Back"
                  variant="outlined"
                  onClick={closeShowOtpModel}
                />
                <Button
                  label="Verify"
                  variant="filled"
                  loader={loader}
                  onClick={onSubmit}
                  disabled={disabled}
                />
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default OtpPage;
