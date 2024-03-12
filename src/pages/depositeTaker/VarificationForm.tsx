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

  const onSubmit = (data : any) => {

  }
  return (
    <form className="flex" onSubmit={handleSubmit(onSubmit)}>
      <div>
        Company Name<span className="text-[#ff0000]">*</span>
        <div className="mt-[8px]">
          <InputFields placeholder="Type here" {...register("companyName")}/>
          {errors.companyName?.message && <span className="text-red-500">{errors.companyName.message}</span>}
        </div>
      </div>
      <div className="ml-[24px]">
        Pan Number<span className="text-[#ff0000]">*</span>
        <div className="mt-[8px]">
          <InputFields placeholder="Type here" {...register("panNumber")}/>
          {errors.panNumber?.message && <span className="text-red-500">{errors.panNumber?.message}</span>}
        </div>
      </div>
      <button>Submit</button>
    </form>
  );
};

export default VarificationForm;
