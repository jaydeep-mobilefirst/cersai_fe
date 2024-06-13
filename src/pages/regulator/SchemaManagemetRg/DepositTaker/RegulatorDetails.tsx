import React from "react";
import InputFields from "../../../../components/userFlow/common/InputField";
import DatePicker from "../../../../components/userFlow/form/DatePicker";

const RegulatorDetails = () => {
  const handleDateChange = (event: any) => {
    const { value } = event.target;
    const today = new Date();
    const selected = new Date(value);
    today.setHours(0, 0, 0, 0);
  };

  return (
    <div className="">
      <div
        id="reviewContent"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <div className="">
          <label
            htmlFor="entityType"
            className="text-base font-normal text-gilroy-medium"
          >
            Regulator Name
          </label>
          <InputFields id="entityType" placeholder="Type here" />
        </div>
        <div className="">
          <label
            htmlFor="entityType"
            className="text-base font-normal text-gilroy-medium"
          >
            Regulator Registration
          </label>
          <InputFields id="entityType" placeholder="Type here" />
        </div>
        <div className="">
          <label
            htmlFor="registrationDate"
            className="text-base font-normal text-gilroy-medium"
          >
            Registration approval Date
          </label>
          <DatePicker onChange={handleDateChange} />
        </div>
      </div>
    </div>
  );
};

export default RegulatorDetails;
