import InputFields from "../../../../components/userFlow/common/InputField";
import TextArea from "../../../../components/userFlow/form/TextArea";
import DatePicker from "../../../../components/userFlow/form/DatePicker";
import SelectButton from "../../../../components/userFlow/form/SelectButton";
import { SchemaFormValidation } from "../../../../../src/components/ScehmaManagement/SchemaMangementValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import InfoIcon from "../../../../assets/images/info-circle-black.svg";
const EntityDetails = () => {
  const [selectedOption1, setSelectedOption1] = useState<string | null>(null);
  const [searchInputValue1, setSearchInputValue1] = useState<string>("");

  const [selectedOption2, setSelectedOption2] = useState<string | null>(null);
  const [searchInputValue2, setSearchInputValue2] = useState<string>("");

  const [selectedOption3, setSelectedOption3] = useState<string | null>(null);
  const [searchInputValue3, setSearchInputValue3] = useState<string>("");

  const [selectedOption4, setSelectedOption4] = useState<string | null>(null);
  const [searchInputValue4, setSearchInputValue4] = useState<string>("");

  const options1 = [
    { value: "Pvt Ltd", label: "Pvt Ltd" },
    { value: "LLP", label: "LLP" },
    { value: "Sole PArtnership", label: "Sole PArtnership" },
  ];

  const options2 = [
    { value: "Andhra Pradesh", label: "Andhra Pradesh" },
    { value: "Bihar", label: "Bihar" },
    { value: "Chhattisgarh", label: "Chhattisgarh" },
    { value: "Gujarat", label: "Gujarat" },
  ];

  const options3 = [
    { value: "Anantapur", label: "Anantapur" },
    { value: "Kurnool", label: "Kurnool" },
    { value: "Chittoor", label: "Chittoor" },
  ];

  const options4 = [
    { value: "515661", label: "515661" },
    { value: "515672", label: "515672" },
    { value: "515662", label: "515662" },
  ];
  const handleSetOption1 = (value: string) => {
    setSelectedOption1(value);
  };

  const handleSearchInputChange1 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInputValue1(event.target.value);
  };

  const handleSetOption2 = (value: string) => {
    setSelectedOption2(value);
  };

  const handleSearchInputChange2 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInputValue2(event.target.value);
  };

  const handleSetOption3 = (value: string) => {
    setSelectedOption3(value);
  };

  const handleSearchInputChange3 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInputValue3(event.target.value);
  };
  const handleSetOption4 = (value: string) => {
    setSelectedOption4(value);
  };

  const handleSearchInputChange4 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInputValue4(event.target.value);
  };
  const handleDateChange = (event: any) => {
    const { value } = event.target;
    const today = new Date();
    const selected = new Date(value);
    today.setHours(0, 0, 0, 0);

    // if (!(selected <= today)) {
    //   setError("registrationDate", { message: "Date should not be in future" });
    // } else {
    //   clearErrors("registrationDate");
    // }
    // setValue("registrationDate", value);
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(SchemaFormValidation),
  });
  const onSubmit = (data: any) => {
    alert("Form submitted successfully!");
    console.log({ data });

    reset();
  };

  return (
    <div className="mt-6 -m-3">
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-between flex-col h-full "
        >
          <div className="flex flex-col  w-full ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div>
                <label
                  htmlFor="gstNumber"
                  className="text-base font-normal text-gilroy-medium"
                >
                  Type of Entity <span className="text-red-500">*</span>
                </label>
                <InputFields
                  placeholder="Type here"
                  {...register("TypeOfEntity")}
                />
                {errors?.TypeOfEntity && (
                  <p className="text-red-500">
                    {errors?.TypeOfEntity?.message}
                  </p>
                )}
              </div>

              <div>
                <div className="flex flex-row">
                  <label
                    htmlFor="gstNumber"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Unique ID Number <span className="text-red-500">*</span>{" "}
                  </label>
                  <img src={InfoIcon} className="ml-2" alt="InfoIcon" />
                </div>
                <InputFields
                  placeholder="Type here"
                  {...register("uniqueIdNumber")}
                />
                {errors?.uniqueIdNumber && (
                  <p className="text-red-500">
                    {errors?.uniqueIdNumber?.message}
                  </p>
                )}
              </div>

              <div className="">
                <label
                  htmlFor="ABCD Scheme"
                  className="text-base font-normal text-gilroy-medium"
                >
                  Address Line 1
                </label>
                <TextArea placeholder="ABCD" />
              </div>

              <div className="">
                <label
                  htmlFor="ABCD Scheme"
                  className="text-base font-normal text-gilroy-medium"
                >
                  Address Line 2
                </label>
                <TextArea placeholder="ABCD" />
              </div>

              <div>
                <label
                  htmlFor="gstNumber"
                  className="text-base font-normal text-gilroy-medium"
                >
                  PIN Code
                </label>
                <InputFields placeholder="Type here" />
              </div>
              <div>
                <label
                  htmlFor="pinCode"
                  className="text-base font-normal text-gilroy-medium"
                >
                  State
                </label>
                <SelectButton
                  setOption={handleSetOption4}
                  options={options4}
                  selectedOption={selectedOption4}
                  placeholder="Select"
                  searchInputOnchange={handleSearchInputChange4}
                  searchInputValue={searchInputValue4}
                  showSearchInput={true}
                />
              </div>
              <div>
                <label
                  htmlFor="state"
                  className="text-base font-normal text-gilroy-medium"
                >
                  District
                </label>
                <SelectButton
                  setOption={handleSetOption2}
                  options={options2}
                  selectedOption={selectedOption2}
                  placeholder="Select"
                  searchInputOnchange={handleSearchInputChange2}
                  searchInputValue={searchInputValue2}
                  showSearchInput={true}
                />
              </div>
              <div>
                <label
                  htmlFor="gstNumber"
                  className="text-base font-normal text-gilroy-medium"
                >
                  GST Number
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

export default EntityDetails;
