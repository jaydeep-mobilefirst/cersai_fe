import React from "react";
import InputFields from "../../components/userFlow/form/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import RegulatorsDetailsSchema from "../../formValidationSchema/deposit_taker/RegulatorsDetails.schema";
import DatePicker from "../../components/userFlow/form/DatePicker";
import { useScreenWidth } from "../../utils/screenSize";

type Props = {};

const RegularDetailsForm = (props: Props) => {
  const screenWidth = useScreenWidth();
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
      <form
        onSubmit={handleSubmit(onSubmitClick)}
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
            <h1 className="text-2xl font-bold mb-6">Regulator Details</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="mt-[2px]">
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
              <div className="mt-[2px]">
                <label
                  htmlFor="registrationDate"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Registration approval Date
                  <span className="text-red-500">*</span>
                </label>

                <DatePicker onChange={handleDateChange} />
                <span className="text-red-500">
                  {errors.registrationDate?.message}
                </span>
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

export default RegularDetailsForm;
