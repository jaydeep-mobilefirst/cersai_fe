import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ExtensionModal from "./ExtensionModal";
import Swal from "sweetalert2";
import UploadButtonFolderSvg from "../../../assets/images/new_images/uploadFile-2.png";
import UploadButtonSvg1 from "../../../assets/images/UploadIcon.png";

interface WindowWithSignerDigital extends Window {
  SignerDigital?: any;
}

declare let window: WindowWithSignerDigital;

interface DscKeyLoginProps {
  setDscSelected: (selected: boolean) => void;
  setDscCertificate: (selected: any) => void;
  isDscSelected?: boolean;
}

const DscKeyLogin: React.FC<DscKeyLoginProps> = ({
  setDscSelected,
  setDscCertificate,
  isDscSelected,
}) => {
  const [isSignerDigitalLoaded, setIsSignerDigitalLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [certName, setCertName] = useState("");

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
      if (certificate) {
        const strCert = JSON.parse(certificate);
        setDscCertificate(strCert);
        setDscSelected(true);
        setCertName(strCert?.SelCertSubject?.split(",")[0]);
      }
    } catch (error) {
      // alert("Please Insert and select Your DSC Certificate");
      Swal.fire({
        icon: "error",
        title: "Permission Denied by the user",
        text: "Unable to Process DSC",
        customClass: {
          container: "my-swal",
        },
      });
      console.error("Error detecting smartcard readers:", error);
    }
  };

  // const sendCertificate = async (certificate: any) => {
  //   try {
  //     const response = await axios.post(
  //       // "https://cors-anywhere.herokuapp.com/" +
  //       "https://indilabs-json.vercel.app/second",
  //       { certificate }
  //     );

  //     console.log(response);
  //     if (response?.data?.status === "INTERNAL_SERVER_ERROR") {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Internal Server Error",
  //         text: "Unable to Process DSC",
  //       });
  //     } else {
  //       setDscSelected(true);
  //       Swal.fire({
  //         icon: "success",
  //         title: "DSC key fetched successfully",
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
    <>
      <div
        className="bg-[#f4f4f4] flex items-center justify-between p-2 cursor-pointer rounded"
        onClick={detectSmartcardReaders}
      >
        <div>
          <img
            src={UploadButtonFolderSvg}
            alt="UploadButtonFolderSvg "
            className=""
          />
        </div>
        <p className=" text-[black] ">
          {isDscSelected ? certName : "Upload DSC Certificate"}
        </p>
        <button
          type="button"
          className={`text-white Rectangle151 w-10 h-10 rounded-md ${
            isDscSelected ? "bg-[#1c468e]" : "bg-[#1c468e]"
          }  flex justify-center items-center `}
        >
          <img src={UploadButtonSvg1} alt="UploadButtonSvg1" className="w-5" />
        </button>
      </div>
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
    </>
  );
};

export default DscKeyLogin;