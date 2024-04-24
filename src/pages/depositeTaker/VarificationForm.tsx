import React from "react";
import InputFields from "../../components/userFlow/form/InputField";
import { useForm } from "react-hook-form";
import { VerificationFormSchema } from "../../formValidationSchema/deposit_taker/Verification.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useScreenWidth } from "../../utils/screenSize";

type Props = {};

const VerificationForm = (props: Props) => {
  const screenWidth = useScreenWidth();
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
      <div className="">
        <form
          className="flex items-center justify-between flex-col h-full lg:h-[100vh]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div
            style={{
              width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
            }}
          >
            <div className="border-[#E6E6E6] border-[1px] lg:mt-20 w-full"></div>
            <div className="bg-white p-4 lg:p-[48px]">
              <h1 className="text-xl md:text-2xl font-bold mb-6">
                Verification
              </h1>
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
                  <InputFields
                    placeholder="Type here"
                    {...register("panNumber")}
                  />
                  {errors.panNumber?.message && (
                    <span className="text-red-500">
                      {errors.panNumber?.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div
              className="flex w-full p-4 lg:px-[48px] flex-row justify-between items-center"
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
      </div>
    </>
  );
};

export default VerificationForm;
