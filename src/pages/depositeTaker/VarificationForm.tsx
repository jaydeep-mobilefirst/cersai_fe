import React from "react";
import InputFields from "../../components/userFlow/form/InputField";
import { useForm } from "react-hook-form";
import { VerificationFormSchema } from "../../formValidationSchema/deposit_taker/Verification.schema";
import { yupResolver } from "@hookform/resolvers/yup";

type Props = {};

const VarificationForm = (props: Props) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(VerificationFormSchema)
  });

  const onSubmit = (data: any) => {
    console.log({ data });
  }
  return (
    <form className="p-4 flex flex-col w-full max-w-[80%] justify-between" onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white p-6 w-full">
        <h1 className="text-2xl font-bold mb-6">Verification</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="nodalOfficerName" className="block text-gray-700 text-sm font-bold mb-2">
              Company Name<span className="text-[#ff0000]">*</span>
            </label>
            <InputFields placeholder="Type here" {...register("companyName")} />
            {errors.companyName?.message && <span className="text-red-500">{errors.companyName.message}</span>}
          </div>
          <div>
            <label htmlFor="nodalOfficerEmail" className="block text-gray-700 text-sm font-bold mb-2">
              Pan Number<span className="text-[#ff0000]">*</span>
            </label>
            <InputFields placeholder="Type here" {...register("panNumber")} />
            {errors.panNumber?.message && <span className="text-red-500">{errors.panNumber?.message}</span>}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span></span>
        <button
          type={'submit'}
          className="bg-[#385723] rounded-xl p-3 text-white font-semibold text-sm  w-[224px]"
        >
          Save and Continue
        </button>
      </div>
    </form>
  );
};

export default VarificationForm;
