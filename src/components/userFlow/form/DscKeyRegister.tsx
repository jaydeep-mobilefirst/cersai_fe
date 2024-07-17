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
  setDscSelected?: (selected: boolean) => void;
  setDscCertificate?: (selected: any) => void;
  disable?: boolean;
  onFileUpload?: (file: File | null | string) => void;
}

const DscKeyRegister: React.FC<DscKeyLoginProps> = ({
  disable,
  onFileUpload,
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
      const strCert = JSON.stringify(JSON.parse(certificate)) ?? "";
      if (onFileUpload) {
        onFileUpload(strCert);
      }
      if (certificate && setDscCertificate && setDscSelected) {
        setDscCertificate(strCert);
        setDscSelected(true);
      }
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

  // const sendCertificate = async (certificate: any) => {
  //   try {
  //     const response = await axios.post(
  //       // "https://cors-anywhere.herokuapp.com/" +
  //       "https://indilabs-json.vercel.app/first",
  //       { certificate }
  //     );

  //     console.log(response?.data);
  //     if (response?.data?.status === "INTERNAL_SERVER_ERROR") {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Internal Server Error",
  //         text: "Unable to Process DSC",
  //       });
  //     } else {
  //       Swal.fire({
  //         icon: "success",
  //         title: "DSC key fetcheds successfully",
  //         text: "Unable to Process DSC",
  //       });
  //     }
  //     setTimeout(() => {
  //       // navigate("/home");
  //     }, 3000);
  //   } catch (error) {
  //     console.error("Error sending certificate:", error);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Internal Server Error",
  //       text: "Unable to Process DSC",
  //     });
  //   }
  // };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        type="button"
        disabled={disable}
        onClick={detectSmartcardReaders}
        className={`p-4 rounded-lg w-full bg-[#1c468e] text-[white] ${
          disable && "bg-opacity-50 cursor-not-allowed"
        }`}
      >
        Upload DSC certificate
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

export default DscKeyRegister;
