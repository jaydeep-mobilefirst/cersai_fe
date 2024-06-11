import { useState } from "react";
import InputFields from "../userFlow/common/InputField";
import TextArea from "../userFlow/form/TextArea";
import DatePicker from "../userFlow/form/DatePicker";
import SelectButton from "../userFlow/form/SelectButton";
import { EntityDetailschema } from "../../formValidationSchema/deposit_taker/EntityValidation.schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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
    resolver: yupResolver(EntityDetailschema),
  });
  const onSubmit = (data: any) => {
    alert("Form submitted successfully!");
    console.log({ data });

    reset();
  };

  return (
    <div className="mt-6">
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-between flex-col h-full "
        >
          <div className="flex flex-col p-6 w-full ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div>
                <label
                  htmlFor="gstNumber"
                  className="text-base font-normal text-gilroy-medium"
                >
                  Entity Name <span className="text-red-500">*</span>
                </label>
                <InputFields
                  backgroundColor="#F2F2F2"
                  placeholder="Type here"
                  {...register("gstNumber")}
                />
                {errors?.gstNumber && (
                  <p className="text-red-500">{errors?.gstNumber?.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="gstNumber"
                  className="text-base font-normal text-gilroy-medium"
                >
                  PAN <span className="text-red-500">*</span>
                </label>
                <InputFields
                  backgroundColor="#F2F2F2"
                  placeholder="Type here"
                  {...register("gstNumber")}
                />
                {errors?.gstNumber && (
                  <p className="text-red-500">{errors?.gstNumber?.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="pinCode"
                  className="text-base font-normal text-gilroy-medium"
                >
                  Type of Entity <span className="text-red-500">*</span>
                </label>
                <SelectButton
                  backgroundColor="#F2F2F2"
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
                  htmlFor="gstNumber"
                  className="text-base font-normal text-gilroy-medium"
                >
                  Unique ID Number <span className="text-red-500">*</span>
                </label>
                <InputFields
                  backgroundColor="#F2F2F2"
                  placeholder="Type here"
                  {...register("gstNumber")}
                />
                {errors?.gstNumber && (
                  <p className="text-red-500">{errors?.gstNumber?.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="gstNumber"
                  className="text-base font-normal text-gilroy-medium"
                >
                  Address Line 1 <span className="text-red-500">*</span>
                </label>
                <InputFields
                  backgroundColor="#F2F2F2"
                  placeholder="Type here"
                  {...register("gstNumber")}
                />
                {errors?.gstNumber && (
                  <p className="text-red-500">{errors?.gstNumber?.message}</p>
                )}
              </div>
              {/* <div>
                <label
                  htmlFor="addressLine2"
                  className="text-base font-normal text-gilroy-medium"
                >
                  Address Line 2
                </label>
                <TextArea
                  placeholder="Type Here"
                  {...register("addressLine2")}
                />
              </div> */}
              <div>
                <label
                  htmlFor="gstNumber"
                  className="text-base font-normal text-gilroy-medium"
                >
                  Address Line 2
                </label>
                <InputFields
                  backgroundColor="#F2F2F2"
                  placeholder="Type here"
                  {...register("gstNumber")}
                />
                {errors?.gstNumber && (
                  <p className="text-red-500">{errors?.gstNumber?.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="gstNumber"
                  className="text-base font-normal text-gilroy-medium"
                >
                  PIN Code <span className="text-red-500">*</span>
                </label>
                <InputFields
                  backgroundColor="#F2F2F2"
                  placeholder="Type here"
                  {...register("gstNumber")}
                />
                {errors?.gstNumber && (
                  <p className="text-red-500">{errors?.gstNumber?.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="pinCode"
                  className="text-base font-normal text-gilroy-medium"
                >
                  State <span className="text-red-500">*</span>
                </label>
                <SelectButton
                  backgroundColor="#F2F2F2"
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
                  District <span className="text-red-500">*</span>
                </label>
                <SelectButton
                  backgroundColor="#F2F2F2"
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
                  GST Number <span className="text-red-500">*</span>
                </label>
                <InputFields
                  backgroundColor="#F2F2F2"
                  placeholder="Type here"
                  {...register("gstNumber")}
                />
                {errors?.gstNumber && (
                  <p className="text-red-500">{errors?.gstNumber?.message}</p>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EntityDetails;
