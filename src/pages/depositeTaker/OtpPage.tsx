import React, { useEffect, useState } from "react";
import OtpInput from "../../components/Otp/OtpInput";
import Button from "../../components/Otp/Button";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { useDepositTakerRegistrationStore } from "../../zust/deposit-taker-registration/registrationStore";
import { useNavigate } from "react-router-dom";

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
}

const OtpPage: React.FC<OtpPageProps> = ({ closeShowOtpModel }) => {
  const Navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const {allFormData} = useDepositTakerRegistrationStore(state => state)
  const [mobileTimer, setMobileTimer] = useState(60);
  const [emailTimer, setEmailTimer] = useState(60);
  const [disbaled, setdisabled] = useState(true)
  const [mobileOtp, setMobileOtp] = useState<any>({
    0 : "",
    1 : "",
    2 : "",
    3 : "",
    4 : "",
    5 : ""
  });
  const [emailOtp, setEmailOtp] = useState<any>({
    0 : "",
    1 : "",
    2 : "",
    3 : "",
    4 : "",
    5 : ""
  });
  useEffect(() => {
    const timer = setInterval(() => {
      setMobileTimer((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      setEmailTimer((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (Object.values(mobileOtp)?.length === 6 &&  Object.values(emailOtp)?.length === 6 ) {
      setdisabled(false)
    }
  }, [mobileOtp, emailOtp])
  const resendMobileOtp = () => {
    setMobileTimer(60);
  };

  const resendEmailOtp = () => {
    setEmailTimer(60);
  };


  const onMobileOtpChange = (event  : any, index : any ) => {
    const {value} = event?.target;
    if (!/^\d+$/.test(value)) {
      event.preventDefault(); // Prevent further action
      return;
    }
    let obj = {
      ...mobileOtp,
      [index] : value
    };
    setMobileOtp(obj)

  }

  const onEmailOtpChange = (event  : any, index : any ) => {
   const {value} = event?.target;
   if (!/^\d+$/.test(value)) {
    event.preventDefault(); // Prevent further action
    return;
  }
   let obj = {
    ...emailOtp,
    [index] : value
  };

  setEmailOtp(obj )
  }
  const onSubmit = (event : any) => {
    event?.preventDefault()
    if (mobileTimer > 0 && Object.values(mobileOtp)?.length === 6 &&  Object.values(emailOtp)?.length === 6 ) {
      setLoader(true)
      setLoader(false);
      Navigate("/depositetaker/signup/reviewdetails")
    }
  }

  return (
    <Modal
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex flex-col justify-center items-center w-full">
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg max-w-full">
            <div className="bg-[#EEF7EB] py-6 text-center text-lg sm:text-xl md:text-2xl font-medium">
              Verify your mobile number and email ID
            </div>
            <div className="p-3">
            <OtpInput
              value={mobileOtp}
              onChange={onMobileOtpChange}
              label="Mobile OTP"
              infoText={`OTP sent on +91 ${allFormData?.formFields?.form_fields?.find((field : any) => field?.label === "Nodal Officer Mobile Number")?.userInput}`}
              resendText="Send again"
              timer={
                mobileTimer > 0
                  ? mobileTimer.toString().padStart(2, "0") + ": 00"
                  : "00:00"
              }
              error="Invalid"
              onResend={resendMobileOtp}
            />
            <OtpInput
              value={emailOtp}
              onChange={onEmailOtpChange}
              label="Email OTP"
              infoText={`OTP sent on ${allFormData?.formFields?.form_fields?.find((field : any) => field?.label === "Nodal Officer Email")?.userInput}`}
              resendText="Send again"
              timer={
                emailTimer > 0
                  ? emailTimer.toString().padStart(2, "0") + ": 00"
                  : "00:00"
              }
              error="Invalid"
              onResend={resendEmailOtp}
            />
            <div className="flex justify-between p-3 sm:p-4">
              <Button
                label="Back"
                variant="outlined"
                onClick={closeShowOtpModel}
              />
              <Button label="Verify" variant="filled" onClick={onSubmit} disabled={disbaled}/>
            </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default OtpPage;
