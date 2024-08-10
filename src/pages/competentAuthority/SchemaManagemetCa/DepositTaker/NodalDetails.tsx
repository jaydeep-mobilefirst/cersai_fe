import React from "react";
import InputFields from "../../../../components/userFlow/common/InputField";
import { useForm } from "react-hook-form";

const NodalDetails = () => {
  return (
    <div className="mt-6 -m-3">
      <div>
        <form className="flex flex-col items-center justify-between w-full h-full">
          <div className="flex flex-col  w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div>
                <label
                  htmlFor="nodalOfficerName"
                  className="text-base font-normal text-gilroy-medium"
                >
                  Nodal Officer Name
                </label>
                <InputFields placeholder="Type here" />
              </div>
              <div>
                <label
                  htmlFor="nodalOfficerEmail"
                  className="text-base font-normal text-gilroy-medium"
                >
                  Nodal Officer Email
                </label>
                <InputFields placeholder="Type here" />
              </div>
              <div>
                <label
                  htmlFor="nodalOfficerMobileNumber"
                  className="text-base font-normal text-gilroy-medium"
                >
                  Nodal Officer Mobile Number
                </label>
                <InputFields placeholder="Type here" />
              </div>
              <div>
                <label
                  htmlFor="nodalOfficerDesignation"
                  className="text-base font-normal text-gilroy-medium"
                >
                  Nodal Officer Designation
                </label>
                <InputFields placeholder="Type here" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NodalDetails;
