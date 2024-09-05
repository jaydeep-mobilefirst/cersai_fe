import { createColumnHelper } from "@tanstack/table-core";

import { useState } from "react";
import InputFields from "../../../../components/userFlow/common/InputField";
import TextArea from "../../../../components/userFlow/form/TextArea";
import DatePicker from "../../../../components/userFlow/form/DatePicker";
import SelectButton from "../../../../components/userFlow/form/SelectButton";
import ReactTable from "../../../../components/userFlow/common/ReactTable";
import { SchemaFormValidation } from "../../../../../src/components/ScehmaManagement/SchemaMangementValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import UploadIcon from "../../../../assets/images/upload-gray.svg";
const TableType = {
  sno: String,
  branchName: String,
  addressLine1: String,
  addressLine2: String,
  state: String,
  district: String,
};

const SchemeDetails = () => {
  const columnHelper = createColumnHelper<typeof TableType>();

  const defaultData = [
    {
      sno: "01",
      branchName: "Department of PR",
      addressLine1: "123 Main St",
      addressLine2: "Apt 101",
      state: "Andhra Pradesh",
      district: "Ananthapuram",
    },
    {
      sno: "02",
      branchName: "Department of HR",
      addressLine1: "456 Elm St",
      addressLine2: "Suite 202",
      state: "Andhra Pradesh",
      district: "Ananthapuram",
    },
    {
      sno: "03",
      branchName: "Department of HR",
      addressLine1: "456 Elm St",
      addressLine2: "Suite 202",
      state: "Andhra Pradesh",
      district: "Ananthapuram",
    },
    {
      sno: "04",
      branchName: "Department of HR",
      addressLine1: "456 Elm St",
      addressLine2: "Suite 202",
      state: "Andhra Pradesh",
      district: "Ananthapuram",
    },
    {
      sno: "05",
      branchName: "Department of HR",
      addressLine1: "456 Elm St",
      addressLine2: "Suite 202",
      state: "Andhra Pradesh",
      district: "Ananthapuram",
    },
    {
      sno: "06",
      branchName: "Department of HR",
      addressLine1: "456 Elm St",
      addressLine2: "Suite 202",
      state: "Andhra Pradesh",
      district: "Ananthapuram",
    },
  ];

  const columns = [
    columnHelper.accessor("sno", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>Sr. No.</span>,
    }),
    columnHelper.accessor("branchName", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>Branch Name</span>,
    }),
    columnHelper.accessor("addressLine1", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>Address Line 1</span>,
    }),
    columnHelper.accessor("addressLine2", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>Address Line 2</span>,
    }),
    columnHelper.accessor("state", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>State</span>,
    }),
    columnHelper.accessor("district", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>District</span>,
    }),
  ];
  const [selectedOption1, setSelectedOption1] = useState<string | null>(null);
  const [searchInputValue1, setSearchInputValue1] = useState<string>("");

  const [selectedOption2, setSelectedOption2] = useState<string | null>(null);
  const [searchInputValue2, setSearchInputValue2] = useState<string>("");

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
    <div className="mt-6 -m-4">
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-between flex-col h-full "
        >
          <div className="flex flex-col  w-full ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div>
                <label
                  htmlFor="Scheme Name"
                  className="text-base font-normal text-gilroy-medium"
                >
                  Scheme Name
                </label>
                <TextArea backgroundColor="#F2F2F2" placeholder="Type here" />
              </div>
              <div className="">
                <label
                  htmlFor="Scheme  Description"
                  className="text-base font-normal text-gilroy-medium"
                >
                  Scheme Description
                </label>
                <TextArea backgroundColor="#F2F2F2" placeholder="Type here" />
              </div>
              <div className="mt-1">
                <label
                  htmlFor="Select Start Date"
                  className="text-base font-normal text-gilroy-medium"
                >
                  Select Start Date
                </label>

                <DatePicker
                  backgroundColor="#F2F2F2"
                  onChange={handleDateChange}
                />
              </div>
              <div className="">
                <label
                  htmlFor="Last day to enter scheme"
                  className="text-base font-normal text-gilroy-medium"
                >
                  Last day to enter scheme
                </label>

                <DatePicker
                  backgroundColor="#F2F2F2"
                  onChange={handleDateChange}
                />
              </div>

              <div className="-mt-1">
                <label
                  htmlFor="Minimum Investment"
                  className="text-base font-normal text-gilroy-medium"
                >
                  Minimum Investment
                </label>
                <TextArea backgroundColor="#F2F2F2" placeholder="Type here" />
              </div>
              <div>
                <label
                  htmlFor="Maximum Investment"
                  className="text-base font-normal text-gilroy-medium"
                >
                  Maximum Investment
                </label>
                <InputFields
                  backgroundColor="#F2F2F2"
                  placeholder="Type here"
                />
              </div>

              <div>
                <label
                  htmlFor="Regulator Name"
                  className="text-base font-normal text-gilroy-medium"
                >
                  Regulator Name
                </label>
                <TextArea backgroundColor="#F2F2F2" placeholder="Type Here" />
              </div>
              <div className="mt-1">
                <label
                  htmlFor="Scheme Act"
                  className="text-base font-normal text-gilroy-medium"
                >
                  Scheme Act
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
              <div className="">
                <label
                  htmlFor=" Number of investers"
                  className="text-base font-normal text-gilroy-medium"
                >
                  Number of investers
                </label>
                <TextArea backgroundColor="#F2F2F2" placeholder="Type Here" />
              </div>

              <div>
                <label
                  htmlFor="Status"
                  className="text-base font-normal text-gilroy-medium"
                >
                  Status
                </label>
                <SelectButton
                  backgroundColor="#F2F2F2"
                  setOption={handleSetOption1}
                  options={options1}
                  selectedOption={selectedOption1}
                  placeholder="Select"
                  searchInputOnchange={handleSearchInputChange1}
                  searchInputValue={searchInputValue1}
                  showSearchInput={true}
                />
              </div>
              <div>
                <label
                  htmlFor="Comments"
                  className="text-base font-normal text-gilroy-medium"
                >
                  Comments
                </label>
                <InputFields placeholder="Type here" />
              </div>

              <div>
                <label
                  htmlFor="Upload Document"
                  className="text-base font-normal text-gilroy-medium"
                >
                  Upload Document
                </label>
                <div className="relative flex items-center">
                  <InputFields placeholder="Type here" className="pr-10" />
                  <img
                    src={UploadIcon}
                    alt="Upload"
                    className="absolute right-2 w-[24px] h-[24px]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className="custom-scrollbar  w-full mt-5"
            style={{ maxHeight: "360px", overflowY: "auto" }}
          >
            <ReactTable defaultData={defaultData} columns={columns} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SchemeDetails;
