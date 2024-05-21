import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import LoginPageIcon from "../../../assets/images/Login-bud.svg";
import CrossIcon from "../../../assets/images/CrossIcon.svg";
import MobileIcon from "../../../assets/images/MobileIcon.svg";
import InputFields from "./InputField";
import InputFieldPassword from "./InputFieldPassword";
import Button from "./Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SelectButton from "../form/SelectButton";
import UploadButtonV2 from "../form/UploadButtonV2";
import { bffUrl } from "../../../utils/api";
import Dscbutton from "../form/Dscbutton";
import { convertFileToBase64 } from "../../../utils/fileConversion";

interface LoginModelProps {
  closeModal: () => void;
  showRegisterModel: () => void;
  ShowForgetModel?: () => void;
}

const LoginModel: React.FC<LoginModelProps> = ({
  closeModal,
  showRegisterModel,
  ShowForgetModel,
}) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>("DT");
  const [loader, setLoader] = useState(false);
  const [formError, setFormError] = useState("");
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [base64Data, setBase64Data] = useState<string>("");
  const [hexData, setHexData] = useState("");
  const [roles, setRoles] = useState<any>();
  const [dsc, setDsc] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  // Effect to detect autofill
  useEffect(() => {
    register("email");
    register("password");
  }, [register]);

  const handleSelectOption = (option: any) => {
    setSelected(option);
    setFormError("");
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue("email", value, { shouldValidate: true });
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue("password", value, { shouldValidate: true });
  };

  const handleFormSubmit = async (data: any) => {
    if (!selected) {
      setFormError("Please select an option!");
      return;
    }

    setLoader(true);
    setError(false);

    try {
      const response = await axios.post(`${bffUrl}/auth/login`, {
        // username: data.email,
        username: watch("email"),
        // password: data.password,
        password: watch("password"),
        entityType: selected,
      });
      console.log(response?.data?.user?.UserRoles, "login model");

      sessionStorage.setItem(
        "access_token",
        response?.data?.response?.access_token
      );
      sessionStorage.setItem(
        "refresh_token",
        response?.data?.response?.refresh_token
      );
      sessionStorage.setItem("firstName", response?.data?.user?.firstName);
      sessionStorage.setItem("lastName", response?.data?.user?.lastName);
      sessionStorage.setItem("emailId", response.data.user?.emailId);
      sessionStorage.setItem("entityType", response.data.user?.entityType);
      sessionStorage.setItem(
        "entityUniqueId",
        response.data.user?.entityUniqueId
      );
      setRoles(response?.data?.user?.UserRoles);
      setDsc(true);
      if (roles) {
        apicallDsc();
      }

      setError(false);
    } catch (err: any) {
      setError(true);
      if (err.response?.data?.error?.error_description) {
        setFormError(err.response.data.error?.error_description);
        setError(true);
      } else {
        setFormError("An error occurred. Please try again.");
      }
    } finally {
      setLoader(false);
      // setError(false);
    }
  };

  const apicallDsc = () => {
    setLoader(true);
    axios
      .post(bffUrl + `/auth/mfa`, {
        entityType: selected,
        username: getValues("email"),
        dscCertificateFile: base64Data,
      })
      .then((respose) => {
        reset();
        console.log(respose);
        setLoader(false);
        if (selected === "DT") {
          navigate("/dt/dashboard");
        } else if (selected === "RG") {
          navigate("/rg/dashboard");
        } else if (selected === "DC") {
          navigate("/dc/dashboard");
        } else {
          navigate("/ca/dashboard");
        }
      })
      .catch((error) => {
        setFormError(error?.response?.data?.message);
        setLoader(false);
      });
  };

  const handleClose = () => {
    closeModal();
  };

  const handleNavigateRegistration = () => {
    // closeModal();
    showRegisterModel();
  };

  const handleFileUpload = (file: File | null) => {
    if (file) {
      setIsFileUploaded(true);

      convertFileToBase64(
        file,
        (hex) => {
          setHexData(hex);
        },
        (base64) => {
          setBase64Data(base64);
        }
      );
    } else {
      setIsFileUploaded(false);
      setBase64Data(""); // Clear the base64 data if no file is uploaded
      setHexData(""); // Clear the hex data as well
    }
  };

  return (
    <Modal
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <div className="bg-black bg-opacity-30 absolute inset-0 flex justify-center items-center shadow-lg">
          <div className="bg-white p-3 rounded-lg md:w-[946px] w-full grid grid-cols-1 md:grid-cols-2 gap-4 shadow-lg m-4">
            <div className="order-1 md:order-2 mt-3 ">
              <div className="flex justify-between mt-[4px]">
                <div className="w-full text-center">
                  <h1 className="text-[24px] font-bold text-black text-gilroy-medium">
                    Login
                  </h1>
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
              <form
                // onSubmit={handleSubmit(handleFormSubmit)}
                onSubmit={handleSubmit((data) => {
                  handleFormSubmit(data);
                })}
              >
                <div
                  className="mt-5 md:mt-[36px] px-4 md:px-[40px] custom-scrollbar"
                  style={{
                    maxHeight: "500px",
                    overflowY: "auto",
                    overflowX: "hidden",
                  }}
                >
                  <div>
                    <label
                      htmlFor="entity"
                      className="text-base font-normal text-gilroy-medium my-3"
                    >
                      Select Entity
                    </label>
                    <SelectButton
                      setOption={handleSelectOption}
                      options={[
                        { value: "RG", label: "Regulator" },
                        { value: "DT", label: "Deposit Taker" },
                        {
                          value: "DC",
                          label: "Designated Court",
                        },
                        {
                          value: "CA",
                          label: "Competent Authority",
                        },
                      ]}
                      selectedOption={selected}
                      placeholder="Select an option"
                      showSearchInput={false}
                    />
                  </div>

                  <div className="mt-5">
                    <label
                      htmlFor="email"
                      className="text-base font-normal text-gilroy-medium my-3"
                    >
                      Email id / Mobile no.
                    </label>
                    <InputFields
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      placeholder="Email id / Mobile no."
                      onChange={handleEmailChange}
                      error={error}
                    />
                    {errors.email && (
                      <p className="text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="mt-5">
                    <label
                      htmlFor="password"
                      className="text-base font-normal text-gilroy-medium my-3"
                    >
                      Password
                    </label>
                    <InputFieldPassword
                      {...register("password", {
                        required: "Password is required",
                      })}
                      placeholder="Password"
                      onChange={handlePasswordChange}
                      error={error}
                    />
                    {errors.password && (
                      <p className="text-red-500">{errors.password.message}</p>
                    )}
                    <p
                      className="text-xs font-normal text-gilroy-medium text-end text-[#1C468E] cursor-pointer "
                      onClick={ShowForgetModel}
                    >
                      Forgot password?
                    </p>
                  </div>

                  <div className="mt-4 lg:mt-8">
                    {/* {watch("email") && watch("password") && (
                      <Dscbutton
                        onFileUpload={handleFileUpload}
                        disabled={false}
                      >
                        Upload Document
                      </Dscbutton>
                    )} */}

                    {dsc && (
                      <>
                        <Dscbutton
                          onFileUpload={handleFileUpload}
                          disabled={false}
                        >
                          Upload Document
                        </Dscbutton>
                      </>
                    )}
                  </div>
                  <div className="mt-4 lg:mt-8 text-red-500 text-center">
                    {formError}
                  </div>
                  <div className="flex justify-center items-center mt-12 ">
                    <Button
                      type="submit"
                      loader={loader}
                      label={!loader ? "Login" : "Loading..."}
                    />
                  </div>
                  <div className="mt-14">
                    <p className="text-base font-normal text-gilroy-regular">
                      {/* {formError && (
                        <span className="text-red-500">{formError}</span>
                      )} */}
                      <br />
                      Not registered with CERSAI account?{" "}
                      <span
                        className="text-[#1C468E] cursor-pointer"
                        onClick={handleNavigateRegistration}
                      >
                        Register Now
                      </span>
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
  );
};

export default LoginModel;
