import React from "react";
import NodalDetailsSchema from "../../formValidationSchema/deposit_taker/NodalDetails.schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputFields from "../../components/userFlow/form/InputField";
import UploadButton from "../../components/userFlow/form/UploadButton";
import { useScreenWidth } from "../../utils/screenSize";

const NodalDetailsRegulator = () => {
  const screenWidth = useScreenWidth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(NodalDetailsSchema),
  });

  const handleOnSubmit = (data: any) => {
    console.log({ data });
  };

  return (
    <>
      {/* <div className="border-[#E6E6E6] border-[1px] -mt-[3px]"></div> */}

      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        // className="p-4 flex flex-col w-full max-w-[100%] justify-between"
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
                  className="block text-gray-700 text-sm font-bold mb-2 text-gilroy-medium"
                >
                  Nodal Officer Name<span className="text-red-500">*</span>
                </label>
                <InputFields
                  type="text"
                  id="nodalOfficerName"
                  placeholder="Type here"
                  {...register("nodalOfficerName")}
                />
                <span className="text-red-500">
                  {errors.nodalOfficerName?.message}
                </span>
              </div>
              <div>
                <label
                  htmlFor="nodalOfficerEmail"
                  className="block text-gray-700 text-sm font-bold mb-2 text-gilroy-medium"
                >
                  Nodal Officer Email <span className="text-red-500">*</span>
                </label>
                <InputFields
                  type="email"
                  id="nodalOfficerEmail"
                  placeholder="Type here"
                  {...register("nodalOfficerEmail")}
                />
                <span className="text-red-500">
                  {errors.nodalOfficerEmail?.message}
                </span>
              </div>
              <div>
                <label
                  htmlFor="nodalMobileNumber"
                  className="block text-gray-700 text-sm font-bold mb-2 text-gilroy-medium"
                >
                  Nodal Officer Mobile Number
                  <span className="text-red-500">*</span>
                </label>
                <InputFields
                  type="text"
                  id="nodalMobileNumber"
                  {...register("nodalOfficerMobileNumber")}
                  placeholder="type"
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
                  className="block text-gray-700 text-sm font-bold mb-2 text-gilroy-medium"
                >
                  Nodal Officer Designation
                  <span className="text-red-500">*</span>
                </label>
                <InputFields
                  type="text"
                  id="nodalOfficerDesgnation"
                  placeholder="Type here"
                  {...register("nodalOfficerDesignation")}
                />
                <span className="text-red-500">
                  {errors.nodalOfficerDesignation?.message}
                </span>
              </div>
              <div className="mt-7">
                <UploadButton id="Dsc" type="button" />
              </div>
            </div>
          </div>
        </div>

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
                className="bg-[#385723] rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs text-gilroy-semibold "
              >
                Save & Review
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

export default NodalDetailsRegulator;
