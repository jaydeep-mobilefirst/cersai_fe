import React, { useState } from "react";
import NodalDetailsSchema from "../../formValidationSchema/deposit_taker/NodalDetails.schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputFields from "../../components/userFlow/form/InputField";
import UploadButton from "../../components/userFlow/form/UploadButton";
import SignUpSideBar from "../../components/userFlow/depositeTaker/SignUpSideBar";
import { useScreenWidth } from "../../utils/screenSize";
import OtpPage from "./OtpPage";

type Props = {};

const NodalDetails = (props: Props) => {
  const screenWidth = useScreenWidth();
  const [showOTPModel, setShowOTPModel] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(NodalDetailsSchema),
  });

  const handleOnSubmit = (data: any) => {
    console.log({ data });
    setShowOTPModel(true);
  };

  const closeShowOtpModel = () => {
    setShowOTPModel(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="flex items-center justify-between flex-col h-full lg:h-[100vh]"
      >
        <div
          style={{
            width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
          }}
        >
          <div className="border-[#E6E6E6] border-[1px] lg:mt-[76px] w-full"></div>
          <div className="bg-white p-6 w-full">
            <h1 className="text-2xl font-bold mb-6">Nodal Details</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label
                  htmlFor="nodalOfficerName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Nodal Officer Name<span className="text-red-500">*</span>
                </label>
                <InputFields
                  type="text"
                  id="nodalOfficerName"
                  placeholder="Type here"
                  {...register("nodalOfficerName")}
                  //   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <span className="text-red-500">
                  {errors.nodalOfficerName?.message}
                </span>
              </div>
              <div>
                <label
                  htmlFor="nodalOfficerEmail"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Nodal Officer Email <span className="text-red-500">*</span>
                </label>
                <InputFields
                  type="email"
                  id="nodalOfficerEmail"
                  placeholder="Type here"
                  {...register("nodalOfficerEmail")}
                  //   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <span className="text-red-500">
                  {errors.nodalOfficerEmail?.message}
                </span>
              </div>
              <div>
                <label
                  htmlFor="nodalMobileNumber"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Nodal Officer Mobile Number
                  <span className="text-red-500">*</span>
                </label>
                <InputFields
                  type="text"
                  id="nodalMobileNumber"
                  {...register("nodalOfficerMobileNumber")}
                  placeholder="Type "
                  //   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <span className="text-red-500">
                  {errors.nodalOfficerMobileNumber?.message}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label
                  htmlFor="nodalOfficerDesgnation"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Nodal Officer Designation
                  <span className="text-red-500">*</span>
                </label>
                <InputFields
                  type="text"
                  id="nodalOfficerDesgnation"
                  placeholder="Type here"
                  {...register("nodalOfficerDesignation")}
                  //   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <span className="text-red-500">
                  {errors.nodalOfficerDesignation?.message}
                </span>
              </div>
              <div>
                <label
                  htmlFor="Dsc"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  DSC
                </label>
                <UploadButton id="Dsc" type="button" />
              </div>
            </div>
          </div>
        </div>
        {showOTPModel && <OtpPage closeShowOtpModel={closeShowOtpModel} />}

        <div>
          <div
            className="flex w-full p-4 lg:px-[30px] flex-row justify-between items-center"
            style={{
              width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
            }}
          >
            <div className="flex flex-row items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0"
              >
                <path
                  d="M15 6L9 12L15 18"
                  stroke="#1D1D1B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <button className="text-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#385723]">
                Back
              </button>
            </div>
            <div className="flex items-center">
              <button
                type="submit"
                className="bg-[#385723] rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs"
              >
                Verify details
              </button>
            </div>
          </div>
          <div>
            <div className="border-[#E6E6E6] border-[1px] lg:mt-4"></div>

            <p className="mb-[24px] text-gilroy-light text-center text-[#24222B] text-xs cursor-pointer mt-4">
              © 2024 Protean BUDs, All Rights Reserved.
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default NodalDetails;
