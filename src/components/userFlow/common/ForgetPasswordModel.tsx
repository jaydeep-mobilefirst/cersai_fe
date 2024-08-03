import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import LoginPageIcon from "../../../assets/images/Login-bud.svg";
import CrossIcon from "../../../assets/images/CrossIcon.svg";
import MobileIcon from "../../../assets/images/MobileIcon.svg";
import InputFields from "./InputField";
import Button from "./Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SelectButton from "../form/SelectButton";
import { axiosTraceIdInstance } from "../../../utils/axios";

interface ForgetPasswordModelProps {
  closeForgetModel: () => void;
  closeforgetModelShowLoginModel: () => void;
  showLoginPopup?: () => void;
  closeForgetPasswordandShowRegisterMail: () => void;
}

const ForgetPasswordModel: React.FC<ForgetPasswordModelProps> = ({
  closeForgetModel,
  closeforgetModelShowLoginModel,
  closeForgetPasswordandShowRegisterMail,

  showLoginPopup,
}) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>();
  const [loader, setLoader] = useState(false);
  const [formError, setFormError] = useState("");
  const [error, setError] = useState<boolean>(false);

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

  const handleSelectOption = (option: any) => {
    setSelected(option);
    setFormError("");
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue("email", value, { shouldValidate: true });
  };

  const handleFormSubmit = async (data: any) => {
    if (!selected) {
      setFormError("Entity selection is required");
      return;
    }
    setLoader(true);
    try {
      const response = await axiosTraceIdInstance.post(`/user/forgotpassword`, {
        username: data.email,
        entityType: selected,
      });
      setLoader(false);
      if (response.data.success) {
        closeForgetPasswordandShowRegisterMail();
      } else {
        setFormError(response?.data.message);
        setLoader(false);
      }
    } catch (error: any) {
      setLoader(false);
      setFormError(
        error?.response?.data?.message || "An error occurred. Please try again"
      );
    }
  };

  const handleClose = () => {
    closeForgetModel();
  };

  const handleNavigateLogin = () => {
    closeforgetModelShowLoginModel();
  };
  const canSubmit = watch("email") && selected;

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
              <div className="flex justify-end mt-[4px]">
                <div className="lg:top-2 lg:right-10 relative md:top-2 md:right-10 top-[-6rem]">
                  <img
                    src={CrossIcon}
                    alt="CrossIcon"
                    className="cursor-pointer"
                    onClick={handleClose}
                  />
                </div>
              </div>
              <div className="w-full text-center">
                <h1 className="text-[24px] font-bold text-black text-gilroy-medium">
                  Forgot password ?
                </h1>
                <p className=" text-[#646464] text-gilroy-medium text-base">
                  No worries, We will send you reset Instructions{" "}
                </p>
              </div>
              {formError && (
                <p className="text-red-500 text-lg mt-4 text-center">
                  {formError}
                </p>
              )}

              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="mt-5 md:mt-[60px] px-4 md:px-[40px]">
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
                  </div>

                  <div className="flex justify-center items-center mt-14 ">
                    <Button
                      type="submit"
                      loader={loader}
                      label={!loader ? "Submit" : "Loading..."}
                      disabled={!canSubmit || loader}
                    />
                  </div>
                  <div className="mt-14 flex justify-center items-center">
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

export default ForgetPasswordModel;
