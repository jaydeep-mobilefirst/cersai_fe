import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import LoginPageIcon from "../../../assets/images/Login-bud.svg";

import CrossIcon from "../../../assets/images/CrossIcon.svg";

import MobileIcon from "../../../assets/images/MobileIcon.svg";

import InputFieldPassword from "./InputFieldPassword";

import Button from "./Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import Dscbutton from "../form/Dscbutton";
import { convertFileToBase64 } from "../../../utils/fileConversion";
import PasswordUpdateModel from "./PasswordUpdateModel";
import DscAuth from "./DscAuth";
import DscKeyRegister from "../form/DscKeyRegister";
import { axiosTraceIdInstance } from "../../../utils/axios";

interface SetNewPasswordModelProps {}

const SetNewPasswordModel: React.FC<SetNewPasswordModelProps> = ({}) => {
  const isDscKeyAvbl = process.env.REACT_APP_IS_DSC_KEY_AVBL;
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("identity");
  const otpVerified = sessionStorage.getItem("otp-verified");

  if (!otpVerified || otpVerified === "false") {
    sessionStorage.setItem("otp-sent", "false");
    sessionStorage.setItem("timerSec", "120");
    sessionStorage.setItem("link", "/set-password?identity=" + token);
    setTimeout(() => {
      navigate("/otp-verification?token=" + token);
    }, 3000);
  }
  const [loader, setLoader] = useState(false);
  const [formError, setFormError] = useState("");

  const [error, setError] = useState<boolean>(false);
  const [base64Data, setBase64Data] = useState<string>("");
  const [errormessage, setErromessage] = useState<string>("");
  const [hexData, setHexData] = useState("");
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [decodedToken, setDecodedToken] = useState<any>(null);
  const [fileName, setFileName] = useState<string | undefined>("");
  const [ShowPasswordModel, setShowPasswordModel] = useState(
    otpVerified === "true"
  );
  const [showPasswordUpdateModel, setShowPasswordUpdateModel] = useState(false);
  const [isDscSelected, setDscSelected] = useState<boolean>(false);
  const [dscCertificate, setDscCertificate] = useState<any>();

  console.log(decodedToken, "decoded token...");

  useEffect(() => {
    if (token && !decodedToken) {
      try {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, [token, decodedToken]);
  const handleClose = () => {
    setShowPasswordModel(false);
  };
  const handleNavigateLogin = (e: any) => {
    e.preventDefault();
    navigate("/");
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const apiCall = () => {
    setLoader(true);
    const payload: any = {
      identity: token,
      password: watch("confirmPassword"),
      dscCertificateFile: "xyz",
    };

    if (decodedToken?.isDsc && (base64Data || isDscSelected)) {
      payload.dscCertificateFile =
        isDscKeyAvbl === "true" ? dscCertificate : base64Data;
    }

    axiosTraceIdInstance
      .post(`/user/setpassword`, payload)
      .then((response) => {
        setLoader(false);
        setShowPasswordModel(false);
        setTimeout(() => {
          sessionStorage.setItem("otp-verified", "false");
        }, 60000);
        setShowPasswordUpdateModel(true);
      })
      .catch((error) => {
        // Swal.fire({
        //   icon: "error",
        //   title: "Error",
        //   text: error?.response?.data?.message,
        // });
        setErromessage(
          error?.response?.data?.message || error?.response?.data?.error
        );
        Swal.fire({
          icon: "error",
          text: error?.response?.data?.message || error?.response?.data?.error,
        });
        // alert(error?.response?.data?.message);
        setLoader(false);
        setTimeout(() => {
          sessionStorage.setItem("otp-verified", "false");
        }, 3000);
        // navigate("/");
      });
  };

  const handleFileUpload = (file: File | null) => {
    setFileName(file?.name);
    if (file) {
      setIsFileUploaded(true);

      convertFileToBase64(
        file,
        (hex: any) => {
          setHexData(hex);
        },
        (base64: any) => {
          setBase64Data(base64);
        }
      );
    } else {
      setIsFileUploaded(false);
      setBase64Data("");
      setHexData("");
    }
  };

  const verifyDscWithNodalOfficer = () => {
    // Extract names from the data array
    const firstName = decodedToken?.firstName?.toUpperCase();
    const middleName = decodedToken?.middleName?.toUpperCase();
    const lastName = decodedToken?.lastName.toUpperCase();

    console.log(firstName, middleName, lastName, "all namess");

    // Check if required names are provided
    if (firstName.length === 0 || lastName.length === 0) {
      return false;
    }

    const dscCertName =
      dscCertificate?.SelCertSubject?.split(",")[0]?.toUpperCase();

    // Extract and normalize names from the certificate name
    const certNameParts = dscCertName
      .replace("CN=", "")
      .toUpperCase()
      .split(" ")
      .filter(Boolean);

    // Combine names into a single array
    // const combinedNames = [firstName, middleName, lastName].sort();
    const combinedNames = [firstName, middleName, lastName]
      .filter((name) => name)
      .sort();

    console.log(combinedNames, "combinedNames");

    const certNameSorted = certNameParts.sort();

    console.log(certNameSorted, "certNameSorted");
    // Check if all parts of combined names are present in the certificate name
    const isMatch =
      combinedNames.length === certNameSorted.length &&
      combinedNames.every((part, index) => part === certNameSorted[index]);
    return isMatch;
  };

  const handleFormSubmit = async (data: any) => {
    if (isDscKeyAvbl === "true" && decodedToken?.isDsc) {
      if (verifyDscWithNodalOfficer()) {
        console.log("name checked");
      } else {
        setLoader(false);
        Swal.fire({
          icon: "error",
          title: "Invalid Name",
          text: "Name should match with DSC3",
        });
        return;
      }
    }

    try {
      await apiCall();
    } catch (error) {}
  };

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const canSubmit = watch("password") && watch("confirmPassword");

  const passwordValidations = [
    {
      test: (value: string) => value?.length >= 8,
      message: "Atleast 8 char",
    },
    {
      test: (value: string) => /[A-Z]/.test(value),
      message: "Atleast 1 uppercase",
    },
    {
      test: (value: string) => /[a-z]/.test(value),
      message: "Atleast 1 lowercase",
    },
    {
      test: (value: string) => /[0-9]/.test(value),
      message: "Atleast 1 numeric value",
    },
    {
      test: (value: string) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
      message: "Atleast 1 special char",
    },
  ];

  return (
    <>
      {ShowPasswordModel && (
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
                    <div className="w-full text-center mt-7">
                      <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-black">
                        Set new password
                      </h1>
                      <p className="text-gray-600 text-sm md:text-base mt-3">
                        Your new password should be different
                        <p className="text-gray-600 text-sm md:text-base">
                          from previously used.
                        </p>
                      </p>
                    </div>

                    <div className="lg:top-2 lg:right-10 relative md:top-2 md:right-10 top-[-6rem]">
                      <img
                        src={CrossIcon}
                        alt="CrossIcon"
                        className="cursor-pointer"
                        onClick={handleClose}
                      />
                    </div>
                  </div>
                  <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="mt-5 md:mt-[15px] px-4 md:px-[40px]">
                      <div className="mt-5">
                        <label
                          htmlFor="password"
                          className="text-base font-normal text-gilroy-medium my-3"
                        >
                          New Password
                        </label>
                        <InputFieldPassword
                          {...register("password", {
                            required: "Password is required",
                            validate: (value) =>
                              passwordValidations.every((validation) =>
                                validation.test(value)
                              ),
                          })}
                          placeholder="New Password"
                          error={error}
                        />
                        {errors.password?.message && (
                          <p className="text-red-500">
                            {errors.password.message as string}
                          </p>
                        )}
                        <div>
                          <ul className="flex flex-col md:flex-row flex-wrap p-0 list-disc w-full ">
                            {passwordValidations.map((validation, index) => (
                              <li
                                key={index}
                                className={`mb-2 ml-3 mr-4 ${
                                  validation.test(password)
                                    ? "text-green-500"
                                    : password
                                    ? "text-red-500"
                                    : "text-gray-500"
                                }`}
                              >
                                {validation.message}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-5">
                        <label
                          htmlFor="confirmPassword"
                          className="text-base font-normal text-gilroy-medium my-3"
                        >
                          Confirm Password
                        </label>
                        <InputFieldPassword
                          {...register("confirmPassword", {
                            required: "Please confirm your password",
                            validate: (value) =>
                              value === password || "Passwords do not match",
                          })}
                          placeholder="Confirm Password"
                          error={error}
                        />
                        {/* {errors.confirmPassword?.message && (
                          <p className="text-red-500">
                            {errors.confirmPassword.message as string}
                          </p>
                        )} */}
                        {confirmPassword && (
                          <p
                            className={
                              confirmPassword === password
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            {confirmPassword === password
                              ? "Password & confirm password  match"
                              : "Password & confirm password do not match"}
                          </p>
                        )}
                      </div>

                      {decodedToken?.isDsc && (
                        <div className="mt-4 lg:mt-8">
                          {isDscKeyAvbl === "false" ? (
                            <DscAuth
                              onFileUpload={handleFileUpload}
                              disabled={false}
                              fileName={fileName}
                            >
                              Upload Document
                            </DscAuth>
                          ) : (
                            <DscKeyRegister
                              isDscSelected={isDscSelected}
                              setDscSelected={setDscSelected}
                              setDscCertificate={setDscCertificate}
                            />
                          )}
                        </div>
                      )}
                      {/* {errormessage && (
                        <p className=" flex justify-center items-center text-red-500 mt-3">
                          {errormessage}
                        </p>
                      )} */}

                      <div className="flex justify-center items-center mt-12">
                        <Button
                          type="submit"
                          loader={loader}
                          label={!loader ? "Submit" : "Loading..."}
                          disabled={!canSubmit || loader}
                        />
                      </div>
                      <div className="mt-5 md:mt-10 flex justify-center">
                        <p
                          className="text-base font-normal text-gilroy-regular text-[#1C468E] cursor-pointer"
                          onClick={handleNavigateLogin}
                        >
                          Back to Login
                        </p>
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
                <div className="md:order-1 flex justify-center items-center md:hidden ">
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
      )}

      {showPasswordUpdateModel && (
        <PasswordUpdateModel
        // closePasswordUpdateModel={ClosePasswordUpdateModel}
        />
      )}
    </>
  );
};

export default SetNewPasswordModel;