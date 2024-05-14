import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import LoginPageIcon from "../../../assets/images/Login-bud.svg";
import CrossIcon from "../../../assets/images/CrossIcon.svg";
import MobileIcon from "../../../assets/images/MobileIcon.svg";
import InputFieldPassword from "./InputFieldPassword";
import Button from "./Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

interface SetNewPasswordModelProps {
  closeSetNewPasswordModel: () => void;
  closeNewPasswordandshowUpdatePassword: () => void;
  closeNewPasswordAndshowLoginModel: () => void;
}

const SetNewPasswordModel: React.FC<SetNewPasswordModelProps> = ({
  closeSetNewPasswordModel,
  closeNewPasswordandshowUpdatePassword,
  closeNewPasswordAndshowLoginModel,
}) => {
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);
  const [formError, setFormError] = useState("");

  const [error, setError] = useState<boolean>(false);
  const handleClose = () => {
    closeSetNewPasswordModel();
  };
  const handleNavigateLogin = () => {
    closeNewPasswordAndshowLoginModel();
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const handleFormSubmit = async (data: any) => {
    // Implement the submit functionality here
    closeNewPasswordandshowUpdatePassword();
  };

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

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
      test: (value: string) => /[0-9]/.test(value),
      message: "Atleast 1 numeric value",
    },
    {
      test: (value: string) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
      message: "Atleast 1 special char",
    },
  ];

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
                <div className="mt-5 md:mt-[36px] px-4 md:px-[40px]">
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
                      <ul className="flex flex-col md:flex-row flex-wrap p-0 list-disc w-full">
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
                    {errors.confirmPassword?.message && (
                      <p className="text-red-500">
                        {errors.confirmPassword.message as string}
                      </p>
                    )}
                    {confirmPassword && (
                      <p
                        className={
                          confirmPassword === password
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {confirmPassword === password
                          ? "Passwords match"
                          : "Passwords do not match"}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-center items-center mt-12">
                    <Button
                      type="submit"
                      loader={loader}
                      label={!loader ? "Submit" : "Loading..."}
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
  );
};

export default SetNewPasswordModel;
