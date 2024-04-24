import React from "react";
import NodalDetailsSchema from "../../formValidationSchema/deposit_taker/NodalDetails.schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputFields from "../../components/userFlow/form/InputField";
import UploadButton from "../../components/userFlow/form/UploadButton";

type Props = {};

const NodalDetails = (props: Props) => {
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
      <div className="border-[#E6E6E6] border-[1px] -mt-[3px]"></div>
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="p-4 flex flex-col w-full max-w-[100%] justify-between space-y-40"
      >
        <div className="bg-white p-6 w-full">
          <h1 className="text-2xl font-bold mb-6">Nodal Details</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
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
              />
              <span className="text-red-500">
                {errors.nodalOfficerMobileNumber?.message}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label
                htmlFor="nodalOfficerDesgnation"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Nodal Officer Designation<span className="text-red-500">*</span>
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
            <div className="mt-7 lg:mt-0">
              <label
                htmlFor="nodalOfficerDesgnation"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Upload Document
              </label>
              <UploadButton id="Dsc" type="button" className="w-full" />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-row">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15 6L9 12L15 18"
                stroke="#1D1D1B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <button className="text-black transition duration-300">Back</button>
          </div>
          <button
            type={"submit"}
            className="bg-[#385723] rounded-xl p-3 text-white font-semibold text-sm w-full lg:w-auto"
          >
            Save and Continue
          </button>
        </div>
      </form>
    </>
  );
};

export default NodalDetails;
