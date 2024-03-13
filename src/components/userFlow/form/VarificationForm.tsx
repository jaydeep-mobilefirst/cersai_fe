import React from "react";
import InputFields from "./InputField";

const VarificationForm = () => {
  return (
    <form className="flex">
      <div>
        Company Name<span className="text-[#ff0000]">*</span>
        <div className="mt-[8px]">
          <InputFields placeholder="Type here" />
        </div>
      </div>
      <div className="ml-[24px]">
        Pan Number<span className="text-[#ff0000]">*</span>
        <div className="mt-[8px]">
          <InputFields placeholder="Type here" />
        </div>
      </div>
    </form>
  );
};

export default VarificationForm;
