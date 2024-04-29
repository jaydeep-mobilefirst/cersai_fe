import React from "react";
import InputFields from "../../../components/userFlow/form/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import RegulatorsDetailsSchema from "../../../formValidationSchema/deposit_taker/RegulatorsDetails.schema";
import DatePicker from "../../../components/userFlow/form/DatePicker";

type Props = {};

const ProfileRegulatorDetails = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(RegulatorsDetailsSchema),
  });

  const handleDateChange = (event: any) => {
    const { value } = event.target;
    const today = new Date();
    const selected = new Date(value);
    today.setHours(0, 0, 0, 0);

    if (!(selected <= today)) {
      setError("registrationDate", { message: "Date should not be in future" });
    } else {
      clearErrors("registrationDate");
    }
    setValue("registrationDate", value);
  };

  const onSubmitClick = (data: any) => {
    console.log({ data });
  };

  return (
    <>
      <div className="flex flex-col w-full">
      <form
        onSubmit={handleSubmit(onSubmitClick)}
        className="p-4 flex flex-col w-full max-w-[100%] justify-between h-screen"
      >
        <div className="bg-white p-6 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <label
                htmlFor="regulatorName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Regulator Name<span className="text-red-500">*</span>
              </label>
              <InputFields
                type="text"
                id="regulatorName"
                placeholder="Type here"
                {...register("regulatorName")}
                //   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <span className="text-red-500">
                {errors.regulatorName?.message}
              </span>
            </div>
            <div>
              <label
                htmlFor="registrationNo"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Registration No.{" "}
                <span style={{ fontSize: "10px" }}>
                  (Provided by Regulator)
                </span>
                <span className="text-red-500">*</span>
              </label>
              <InputFields
                type="text"
                id="registrationNo"
                placeholder="Type here"
                {...register("registrationNo")}
                //   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <span className="text-red-500">
                {errors.registrationNo?.message}
              </span>
            </div>
            <div>
              <label
                htmlFor="registrationDate"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Registration approval Date
                <span className="text-red-500">*</span>
              </label>
              {/* <InputFields
                type="date"
                id="registrationDate"
                {...register("registrationDate")}
                onChange={handleDateChange}
                //   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              /> */}
              <DatePicker onChange={handleDateChange} />
              <span className="text-red-500">
                {errors.registrationDate?.message}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-end sm:justify-end items-center space-y-4 sm:space-y-0">
        <div className="flex flex-row items-center mr-auto mt-3">
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
              className="bg-[#385723] rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs mt-3"
            >
              Save and Continue
            </button>
          </div>
        </div>
      </form>
      <div>
    <div className="border-[#E6E6E6] border-[1px] w-full"></div>
      <div className="text-gilroy-light text-[#24222B] text-xs cursor-pointer h-16 flex items justify-center items-center">
        <div>
            © 2024 Protean BUDs, All Rights Reserved.
        </div>
      </div>
      </div>      </div>
    </>
  );
};

export default ProfileRegulatorDetails;
