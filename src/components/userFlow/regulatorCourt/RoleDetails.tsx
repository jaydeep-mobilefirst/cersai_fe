import { createColumnHelper } from "@tanstack/table-core";
import { useState } from "react";
import InputFields from "../../userFlow/common/InputField";
import TextArea from "../../userFlow/form/TextArea";
import DatePicker from "../../userFlow/form/DatePicker";
import SelectButton from "../../userFlow/form/SelectButton";
import ReactTable from "../../userFlow/common/ReactTable";
import { EntityDetailschema } from "../../../formValidationSchema/deposit_taker/EntityValidation.schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useScreenWidth } from "../../../utils/screenSize";

const TableType = {
  sno: String,
  branchName: String,
  addressLine1: String,
  addressLine2: String,
  state: String,
  district: String,
};

const RoleDetails = () => {
  const columnHelper = createColumnHelper<typeof TableType>();

  const defaultData = [
    {
      sno: "01",
      branchName: "Department of PR",
      addressLine1: "123 Main St",
      addressLine2: "Apt 101",
      state: "California",
      district: "Los Angeles",
    },
    {
      sno: "02",
      branchName: "Department of HR",
      addressLine1: "456 Elm St",
      addressLine2: "Suite 202",
      state: "California",
      district: "San Francisco",
    },
    {
      sno: "02",
      branchName: "Department of HR",
      addressLine1: "456 Elm St",
      addressLine2: "Suite 202",
      state: "California",
      district: "San Francisco",
    },
    {
      sno: "02",
      branchName: "Department of HR",
      addressLine1: "456 Elm St",
      addressLine2: "Suite 202",
      state: "California",
      district: "San Francisco",
    },
  ];

  const columns = [
    columnHelper.accessor("sno", {
      cell: (info) => info.renderValue(),
      header: () => <span>Sr. No.</span>,
    }),
    columnHelper.accessor("branchName", {
      cell: (info) => info.renderValue(),
      header: () => <span>Branch Name</span>,
    }),
    columnHelper.accessor("addressLine1", {
      cell: (info) => info.renderValue(),
      header: () => <span>Address Line 1</span>,
    }),
    columnHelper.accessor("addressLine2", {
      cell: (info) => info.renderValue(),
      header: () => <span>Address Line 2</span>,
    }),
    columnHelper.accessor("state", {
      cell: (info) => info.renderValue(),
      header: () => <span>State</span>,
    }),
    columnHelper.accessor("district", {
      cell: (info) => info.renderValue(),
      header: () => <span>District</span>,
    }),
  ];
  const [selectedOption1, setSelectedOption1] = useState<string | null>(null);
  const [searchInputValue1, setSearchInputValue1] = useState<string>("");

  const [selectedOption2, setSelectedOption2] = useState<string | null>(null);
  const [searchInputValue2, setSearchInputValue2] = useState<string>("");

  const [selectedOption3, setSelectedOption3] = useState<string | null>(null);
  const [searchInputValue3, setSearchInputValue3] = useState<string>("");

  const [selectedOption4, setSelectedOption4] = useState<string | null>(null);
  const [searchInputValue4, setSearchInputValue4] = useState<string>("");
  const screenWidth = useScreenWidth();
  const [isChecked, setIsChecked] = useState(false);
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
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="mt-6">
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-between flex-col h-full lg:h-[100vh]"
        >
          <div
            style={{
              width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
            }}
          >
            <div className="flex flex-col p-6 w-full ">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="">
                  <label
                    htmlFor="ABCD Scheme"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Scheme Name
                  </label>
                  <TextArea
                    placeholder="ABCD Scheme"
                    {...register("addressLine1")}
                    backgroundColor="bg-[#F2F2F2]"
                  />
                  {errors.addressLine1 && (
                    <p className="text-red-500">
                      {errors.addressLine1.message}
                    </p>
                  )}
                  <span className="text-[#00000066] text-xs text-gilroy-medium flex justify-end items-end">
                    0 / 50
                  </span>
                </div>
                <div className="">
                  <label
                    htmlFor="Scheme  Description"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Scheme Description
                  </label>
                  <TextArea
                    placeholder="Scheme  Description"
                    {...register("addressLine1")}
                    backgroundColor="bg-[#F2F2F2]"
                  />
                  {errors.addressLine1 && (
                    <p className="text-red-500">
                      {errors.addressLine1.message}
                    </p>
                  )}
                  <span className="text-[#00000066] text-xs text-gilroy-medium flex justify-end items-end">
                    0 / 50
                  </span>
                </div>
                <div className="mt-[2px]">
                  <label
                    htmlFor="registrationDate"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Scheme Start Date
                    <span className="text-red-500">*</span>
                  </label>

                  <DatePicker onChange={handleDateChange} />
                  <span className="text-red-500"></span>
                </div>
                <div className="-mt-2">
                  <label
                    htmlFor="registrationDate"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Last day to enter scheme
                    <span className="text-red-500">*</span>
                  </label>

                  <DatePicker onChange={handleDateChange} />

                  <span className="text-red-500"></span>
                </div>

                <div>
                  <label
                    htmlFor="gstNumber"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Minimum Investment amount
                  </label>
                  <InputFields
                    placeholder="Type here"
                    {...register("gstNumber")}
                    className="bg-[#F2F2F2]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="gstNumber"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Maximum Investment amount
                  </label>
                  <InputFields
                    placeholder="Type here"
                    {...register("gstNumber")}
                    className="bg-[#F2F2F2]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="pinCode"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Regulator Name
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
                    Branch
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
                    htmlFor="district"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Scheme Act <span className="text-red-500">*</span>
                  </label>
                  <SelectButton
                    setOption={handleSetOption3}
                    options={options3}
                    selectedOption={selectedOption3}
                    placeholder="Select"
                    searchInputOnchange={handleSearchInputChange3}
                    searchInputValue={searchInputValue3}
                    showSearchInput={true}
                  />
                </div>
                <div>
                  <label
                    htmlFor="gstNumber"
                    className="text-base font-normal text-gilroy-medium"
                  >
                    Number of investers
                  </label>
                  <InputFields
                    placeholder="Type here"
                    {...register("gstNumber")}
                    className="bg-[#F2F2F2]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className="custom-scrollbar mt-10 w-full"
            style={{ maxHeight: "300px", overflowY: "auto" }}
          >
            <ReactTable defaultData={defaultData} columns={columns} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoleDetails;
