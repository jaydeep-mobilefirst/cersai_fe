import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import LoginPageIcon from "../../../assets/images/LoginpageIcon.svg";
import CrossIcon from "../../../assets/images/CrossIcon.svg";
import MobileIcon from "../../../assets/images/MobileIcon.svg";
import InputFields from "./InputField";
import InputFieldPassword from "./InputFieldPassword";
import Button from "./Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SelectButton from "../form/SelectButton";
import UploadButtonV2 from "../form/UploadButtonV2";

interface LoginModelProps {
  closeModal: () => void;
  showRegisterModel: () => void;
}

const LoginModel: React.FC<LoginModelProps> = ({
  closeModal,
  showRegisterModel,
}) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [formError, setFormError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSelectOption = (option: any) => {
    // console.log(option, "option");
    setSelected(option);
    setIsOptionSelected(option.value ? true : false);

    setFormError("");
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleFileUpload = (file: any) => {
    setIsFileUploaded(file ? true : false);
  };

  const handleFormSubmit = async (data: any) => {
    if (!selected) {
      setFormError("Please select an option!");
      return;
    }

    if (!data.email || !data.password) {
      setFormError("Please enter both email and password!");
      return;
    }

    setLoader(true);
    setError(false);
    try {
      const response = await axios.post(`your_api_endpoint/login`, {
        username: data.email,
        password: data.password,
      });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoader(false);
    }
  };

  const handleClose = () => {
    closeModal();
  };

  const handleNavigateRegistration = () => {
    closeModal();
    showRegisterModel();
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
            <div className="order-1 md:order-2 mt-3">
              <div className="flex justify-between mt-[4px]">
                <div className="w-full text-center">
                  <h1 className="text-[24px] font-bold text-black text-gilroy-medium">
                    Login
                  </h1>
                </div>
                <div className="top-2 right-10 relative">
                  <img
                    src={CrossIcon}
                    alt="CrossIcon"
                    className="cursor-pointer"
                    onClick={handleClose}
                  />
                </div>
              </div>
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="mt-5 md:mt-[36px] px-4 md:px-[40px]">
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
                        { value: "Regulator", label: "Regulator" },
                        { value: "Deposit taker", label: "Deposit taker" },
                      ]}
                      selectedOption={selected || "Regulator"}
                      placeholder="Select an option"
                      showSearchInput={false}
                    />
                    {formError && <p className="text-red-500">{formError}</p>}
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
                      error={error || !!errors.email}
                      onChange={handleEmailChange}
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
                      error={error || !!errors.password}
                      onChange={handlePasswordChange}
                    />
                    {errors.password && (
                      <p className="text-red-500">{errors.password.message}</p>
                    )}
                  </div>

                  <div className="mt-5">
                    <UploadButtonV2
                      onFileUpload={handleFileUpload}
                      disabled={!email || !password}
                    >
                      Upload Document
                    </UploadButtonV2>
                  </div>

                  <div className="flex justify-center items-center mt-14 md:mt-12 ">
                    <Button
                      type="submit"
                      loader={loader}
                      label={!loader ? "Login" : "Loading..."}
                    />
                  </div>
                  <div className="mt-14">
                    <p className="text-base font-normal text-gilroy-regular">
                      Not registered with CERSAI account?{" "}
                      <span
                        className="text-green-500 cursor-pointer"
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
            <div className="md:order-1 flex justify-center items-center md:hidden">
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