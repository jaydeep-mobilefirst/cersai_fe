import React, { useState } from "react";
import InputFields from "../../components/userFlow/common/InputField";
import Footer from "../../components/userFlow/userProfile/Footer";
import { useScreenWidth } from "../../utils/screenSize";
import TaskTabs from "../../components/userFlow/mainPortal/TaskTabs";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import TaskTabsRegulator from "../../components/userFlow/mainPortal-Regulator/TaskTabsRegulator";
import { axiosTokenInstance } from "../../utils/axios";
import InputFieldPassword from "../../components/userFlow/common/InputFieldPassword";

const ResetPasswordRegulator = () => {
  const screenWidth = useScreenWidth();
  const customClass = "flex flex-col w-full mt-4 justify-between w-full";
  const [loader, setLoader] = useState(false);
  const emailId = sessionStorage.getItem("emailId");
  const entityType = sessionStorage.getItem("entityType");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setLoader(true);
    try {
      const response = await axiosTokenInstance.post(`/auth/resetpassword`, {
        username: emailId,
        oldpassword: data?.oldPassword,
        newpassword: data.confirmPassword,
        entityType: entityType,
      });
      setLoader(false);
      // Swal.fire({
      //   icon: "success",
      //   // text: " Reset password is update  successfully ",
      //   text: response.data.message || "Reset password is updated successfully",
      //   confirmButtonText: "Ok",
      // });
      // navigate("/");
      // sessionStorage.clear();
      Swal.fire({
        icon: "success",
        text:
          response.data.message ||
          "Password changed successfully. Please login again using the new password",
        confirmButtonText: "Ok",
      }).then(() => {
        // Clear session and navigate only after success message is shown
        sessionStorage.clear();
        navigate("/");
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setLoader(false);
          Swal.fire({
            icon: "error",
            text:
              error?.response?.data?.error ||
              error?.response?.data?.message ||
              "Please try again later",
            confirmButtonText: "Ok",
          });
        }
      }
    }
  };
  const newPassword = watch("newPassword");
  const oldPassword = watch("oldPassword");

  // Trigger validation error if old and new passwords are the same
  React.useEffect(() => {
    if (newPassword === oldPassword && newPassword) {
      setError("oldPassword", {
        type: "manual",
        message: "Old and New Password could not be same",
      });
      setError("newPassword", {
        type: "manual",
        message: "Old and New Password could not be same",
      });
    } else {
      clearErrors("oldPassword");
      clearErrors("newPassword");
    }
  }, [newPassword, oldPassword, setError, clearErrors]);

  // Password validation pattern
  const passwordValidation = {
    required: "New password is required",
    minLength: {
      value: 8,
      message: "Password must have at least 8 characters",
    },
    validate: {
      upperCase: (v: any) =>
        /[A-Z]/.test(v) ||
        "Password must contain at least one uppercase letter",
      lowerCase: (v: any) =>
        /[a-z]/.test(v) ||
        "Password must contain at least one lowercase letter",
      number: (v: any) =>
        /[0-9]/.test(v) || "Password must contain at least one number",
      specialChar: (v: any) =>
        /[!@#$%^&*(),.?":{}|<>]/.test(v) ||
        "Password must contain at least one special character",
    },
  };

  return (
    <>
      <div className="mt-6 mx-6">
        <TaskTabsRegulator />
      </div>
      <div className={customClass}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-between p-6"
          style={{
            height: `${screenWidth > 1024 ? "calc(100vh - 170px)" : "100%"}`,
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label
                htmlFor="oldPassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Old Password<span className="text-red-500">*</span>
              </label>
              <InputFieldPassword
                {...register("oldPassword", {
                  required: "Old password is required",
                })}
                id="oldPassword"
                placeholder="Type Old Password"
              />
              {errors.oldPassword && (
                <p className="text-red-500">
                  {errors.oldPassword.message as string}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                New Password<span className="text-red-500">*</span>
              </label>
              <InputFieldPassword
                {...register("newPassword", passwordValidation)}
                id="newPassword"
                placeholder="Type New Password"
              />
              {errors.newPassword && (
                <p className="text-red-500">
                  {errors.newPassword.message as string}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Confirm Password<span className="text-red-500">*</span>
              </label>
              <InputFieldPassword
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === newPassword || "The passwords do not match",
                })}
                id="confirmPassword"
                placeholder="Type Confirm Password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500">
                  {errors.confirmPassword.message as string}
                </p>
              )}
            </div>
          </div>
          <div>
            <Footer loader={loader} disabled={Object.keys(errors).length > 0} />
          </div>
          {/* <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Reset Password
          </button> */}
        </form>
      </div>
    </>
  );
};

export default ResetPasswordRegulator;
