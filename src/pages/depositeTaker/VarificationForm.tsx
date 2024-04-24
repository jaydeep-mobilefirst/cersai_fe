import React from "react";
import InputFields from "../../components/userFlow/form/InputField";
import { useForm } from "react-hook-form";
import { VerificationFormSchema } from "../../formValidationSchema/deposit_taker/Verification.schema";
import { yupResolver } from "@hookform/resolvers/yup";

type Props = {};

const VerificationForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(VerificationFormSchema),
  });

  const onSubmit = (data: any) => {
    console.log({ data });
  };

  return (
    <>
      <div className="border-[#E6E6E6] border-[1px] -mt-[3px]"></div>

      <form
        className="p-4 flex flex-col w-full max-w-xs md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto justify-between"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="bg-white p-6 w-full">
          <h1 className="text-xl md:text-2xl font-bold mb-6">Verification</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label
                htmlFor="companyName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Company Name<span className="text-[#ff0000]">*</span>
              </label>
              <InputFields
                placeholder="Type here"
                {...register("companyName")}
              />
              {errors.companyName?.message && (
                <span className="text-red-500">
                  {errors.companyName.message}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="panNumber"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Pan Number<span className="text-[#ff0000]">*</span>
              </label>
              <InputFields placeholder="Type here" {...register("panNumber")} />
              {errors.panNumber?.message && (
                <span className="text-red-500">
                  {errors.panNumber?.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-4 sm:space-y-0 lg:mt-80 md:mt-80">
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
        <div className="border-[#E6E6E6] border-[1px] mt-2"></div>

        <p className="text-gilroy-light text-center text-[#24222B] text-xs cursor-pointer mt-4">
          © 2024 Protean BUDs, All Rights Reserved.
        </p>
      </form>
    </>
  );
};

export default VerificationForm;
