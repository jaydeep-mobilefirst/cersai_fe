import React, { useEffect, useState } from "react";
import OtpInput from "../../components/Otp/OtpInput";
import Button from "../../components/Otp/Button";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";

// Responsive style adjustments with enhanced modal dimensions and padding
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  overflow: "hidden",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "80%", md: "70%", lg: "544px" }, // Responsive width
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
  const [mobileTimer, setMobileTimer] = useState(30);
  const [emailTimer, setEmailTimer] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setMobileTimer((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      setEmailTimer((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const resendMobileOtp = () => {
    setMobileTimer(30);
  };

  const resendEmailOtp = () => {
    setEmailTimer(30);
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
            <div className="bg-green-50 p-4 text-center text-lg sm:text-xl md:text-2xl font-medium">
              Verify your mobile number and email ID
            </div>
            <OtpInput
              label="Mobile OTP"
              infoText={`OTP sent on +91 - 7992444768`}
              resendText="Send again"
              timer={
                mobileTimer > 0
                  ? mobileTimer.toString().padStart(2, "0")
                  : "00:00"
              }
              error="Invalid"
              onResend={resendMobileOtp}
            />
            <OtpInput
              label="Email OTP"
              infoText="OTP sent on Amar.salve@thedesigntrip.com"
              resendText="Send again"
              timer={
                emailTimer > 0
                  ? emailTimer.toString().padStart(2, "0")
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
              <Button label="Verify" variant="filled" />
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default OtpPage;
