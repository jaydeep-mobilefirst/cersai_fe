import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ExtensionModal from "./ExtensionModal";
import Swal from "sweetalert2";

interface WindowWithSignerDigital extends Window {
  SignerDigital?: any;
}

declare let window: WindowWithSignerDigital;

interface DscKeyLoginProps {
  setDscSelected: (selected: boolean) => void;
  setDscCertificate: (selected: any) => void;
}

const DscKeyLogin: React.FC<DscKeyLoginProps> = ({
  setDscSelected,
  setDscCertificate,
}) => {
  const [isSignerDigitalLoaded, setIsSignerDigitalLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSignerDigital = setInterval(() => {
      if (window.SignerDigital) {
        setIsSignerDigitalLoaded(true);
        clearInterval(checkSignerDigital);
      }
    }, 100);
  }, []);

  const detectSmartcardReaders = async () => {
    if (!isSignerDigitalLoaded) {
      setIsModalOpen(true);
      return;
    }

    try {
      const certificate = await window.SignerDigital.getSelectedCertificate(
        "",
        true,
        128
      );
      console.log(certificate, "certificate");
      setDscCertificate(certificate);
      sendCertificate(JSON.parse(certificate));
    } catch (error) {
      // alert("Please Insert and select Your DSC Certificate");
      Swal.fire({
        icon: "error",
        title: "Permission Denied by the user",
        text: "Unable to Process DSC",
      });
      console.error("Error detecting smartcard readers:", error);
    }
  };

  const sendCertificate = async (certificate: any) => {
    try {
      const response = await axios.post(
        "https://cors-anywhere.herokuapp.com/" +
          "https://indilabs-json.vercel.app/second",
        { certificate }
      );

      console.log(response);
      if (response?.data?.status === "INTERNAL_SERVER_ERROR") {
        Swal.fire({
          icon: "error",
          title: "Internal Server Error",
          text: "Unable to Process DSC",
        });
      } else {
        setDscSelected(true);
        Swal.fire({
          icon: "success",
          title: "DSC key fetched successfully",
          text: "Unable to Process DSC",
        });
      }
      setTimeout(() => {
        // navigate("/home");
      }, 3000);
    } catch (error) {
      console.error("Error sending certificate:", error);
      Swal.fire({
        icon: "error",
        title: "Internal Server Error",
        text: "Unable to Process DSC",
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        type="button"
        onClick={detectSmartcardReaders}
        className="p-4 rounded-lg w-full bg-[#1c468e] text-[white]"
      >
        Authenticate with DSC Key
      </button>
      <ExtensionModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        title="Extension Required"
      >
        <p>
          You need to install the SignerDigital browser extension to register
          with a USB token.
        </p>
      </ExtensionModal>
    </div>
  );
};

export default DscKeyLogin;
