import React, { useState, useEffect } from "react";
import Logo from "../assets/images/logo2.svg";
import Button from "../components/form/Button";
import InputFieldPassword from "../components/form/InputFieldPassword";
import axios from "axios";
import { bffUrl } from "../utils/api";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InfoCircle from "../assets/images/info-circle-black.svg";
import Swal from "sweetalert2";

const schema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}$/,
      "Password must contain at least one digit, one uppercase letter, and one special character"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const SetPasswordPage = () => {
  const [loader, setLoader] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Fetch the value of 'identity' parameter
  const identity = searchParams.get("identity");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const apiCall = () => {
    setLoader(true);
    axios
      .post(`${bffUrl}/admin/user/setpassword`, {
        identity: identity,
        password: watch("confirmPassword"),
      })
      .then((responce) => {
        setLoader(false);
        Swal.fire({
          title: `Password changed successfully`,
          icon: "success",
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
        Swal.fire({
          title: error?.response?.data?.message,
          icon: "error",
        });
      });
  };

  return (
    <div>
      <div className="py-[16px] px-[16px] lg:px-[56px] border-b-2">
        <img src={Logo} alt="logo" />
      </div>
      <div className="flex lg:items-center justify-center flex-col p-4 lg:p-0">
        <div className="text-[20px] lg:text-[40px] text-gilroy-semibold mt-[40px]">
          Set your Password
          <div className="text-base lg:text-[20px] text-[#1D1D1B] opacity-60">
            Setup your current password.
          </div>
        </div>
        <form
          onSubmit={handleSubmit((data) => {
            apiCall();
          })}
        >
          <div className="mt-4 md:mt-[36px] lg:w-[423px]">
            <div className="mt-5">
              <label
                htmlFor="Password"
                className="text-base font-normal text-gilroy-medium my-3"
              >
                Password
              </label>
              <InputFieldPassword
                {...register("password")}
                placeholder="Type input"
              />
              {errors.password && (
                <p className="text-[red]">{errors.password.message}</p>
              )}
            </div>
            <div className="flex items-start justify-center mt-1">
              <div className="m-1">
                <img src={InfoCircle} alt="info" />
              </div>
              <div className="text-[14px] text-[#24222B]">
                The password must contain at least 8 characters with a number, a
                uppercase and a special character.
              </div>
            </div>
            <div className="mt-5">
              <label
                htmlFor="Confirm Password"
                className="text-base font-normal text-gilroy-medium my-3"
              >
                Confirm Password
              </label>
              <InputFieldPassword
                {...register("confirmPassword")}
                placeholder="Type input"
              />
              {errors.confirmPassword && (
                <p className="text-[red]">{errors.confirmPassword.message}</p>
              )}
            </div>
            <div className="flex justify-center items-center mt-14 md:mt-10">
              <Button
                type="submit"
                loader={loader}
                label={!loader ? "Submit" : "...."}
              />
            </div>
          </div>
        </form>
      </div>
      <div className="absolute bottom-0 w-screen flex items-center justify-center p-4 opacity-70 text-zinc-800 text-xs font-normal text-gilroy-light border-t-2 leading-none">
        © 2024 Protean BUDs, All Rights Reserved.
      </div>
    </div>
  );
};

export default SetPasswordPage;
