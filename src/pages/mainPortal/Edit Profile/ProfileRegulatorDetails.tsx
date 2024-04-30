import React from "react";
import InputFields from "../../../components/userFlow/form/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import RegulatorsDetailsSchema from "../../../formValidationSchema/deposit_taker/RegulatorsDetails.schema";
import DatePicker from "../../../components/userFlow/form/DatePicker";
import { useScreenWidth } from "../../../utils/screenSize";
import Footer from "../../../components/userFlow/userProfile/Footer";

type Props = {};

const ProfileRegulatorDetails = (props: Props) => {
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
      <div className="flex flex-col w-full">
        <form
          onSubmit={handleSubmit(onSubmitClick)}
          className="p-4 flex flex-col w-full max-w-[100%] justify-between h-screen"
          style={{
            height: `${screenWidth > 1024 ? "calc(100vh - 155px)" : "100%"}`,
          }}
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
          <div>
            <Footer />
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileRegulatorDetails;
