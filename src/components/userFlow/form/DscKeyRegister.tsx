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
  setDscSelected?: (selected: boolean) => void;
  setDscCertificate?: (selected: any) => void;
  isDscSelected?: boolean;
  disable?: boolean;
  onFileUpload?: (file: File | null | string) => void;
  fieldData?: any;
}

const DscKeyRegister: React.FC<DscKeyLoginProps> = ({
  disable,
  onFileUpload,
  setDscSelected,
  setDscCertificate,
  isDscSelected,
  fieldData,
}) => {
  const [isSignerDigitalLoaded, setIsSignerDigitalLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [certName, setCertName] = useState("");

  const navigate = useNavigate();

  // console.log(JSON.parse(fieldData?.userInput), "filed dataaaa");

  // const dscName = JSON.parse(fieldData?.userInput)?.SelCertSubject?.split(
  //   ","
  // )[0];

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
      const strCert = JSON.parse(certificate);

      const expiryDate = new Date(strCert?.ExpDate);
      // const expiryDate = new Date("2023-06-22T13:37:00+05:30");
      // const currentDate = new Date("2026-06-23T13:37:00+05:30");
      const currentDate = new Date();

      if (expiryDate < currentDate) {
        Swal.fire({
          icon: "error",
          title: "Invalid Certificate",
          text: "Your DSC Certificate is expired. Please use the valid DSC3 Certificate",
          customClass: {
            container: "my-swal",
          },
        });
        return;
      }

      if (onFileUpload) {
        onFileUpload(strCert);
        setCertName(strCert?.SelCertSubject?.split(",")[0]);
        if (setDscSelected) {
          setDscSelected(true);
        }
      }

      if (certificate && setDscCertificate && setDscSelected) {
        setDscCertificate(strCert);
        setCertName(strCert?.SelCertSubject?.split(",")[0]);
        setDscSelected(true);
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className={`bg-[#f4f4f4] flex items-center justify-between p-2 rounded ${
          disable ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        type="button"
        onClick={detectSmartcardReaders}
        disabled={disable}
      >
        <div>
          <img
            src={UploadButtonFolderSvg}
            alt="UploadButtonFolderSvg "
            className=""
          />
        </div>
        <p className=" text-[black] ">
          {isDscSelected
            ? certName
            : fieldData?.userInput?.SelCertSubject
            ? fieldData?.userInput?.SelCertSubject?.split(",")[0]
            : "Upload DSC Certificate"}
          {/* {isDscSelected
            ? certName
            : fieldData?.length
            ? fieldData?.userInput?.replace(/^"|"$/g, "")?.slice(19, 35)
            : "Upload DSC Certificate"} */}
        </p>
        <div
          className={`text-white Rectangle151 w-10 h-10 rounded-md ${
            isDscSelected ? "bg-[#1c468e]" : "bg-[#1c468e]"
          }  flex justify-center items-center `}
        >
          <img src={UploadButtonSvg1} alt="UploadButtonSvg1" className="w-5" />
        </div>
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
    </>
  );
};

export default DscKeyRegister;
