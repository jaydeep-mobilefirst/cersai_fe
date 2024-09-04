import React, { useCallback, useEffect, useState } from "react";
import TextArea from "../../../components/userFlow/form/TextArea";
import SelectButton from "../../../components/userFlow/form/SelectButton";
import addCircle from "../../../assets/images/add-user.svg";
import minusCircle from "../../../assets/images/MinusIcon.svg";
import InputFields from "../../../components/userFlow/common/InputField";
import axios from "axios";
import { pincodeValidationUrl } from "../../../utils/api";
import InputFieldsV2 from "../../../components/userFlow/common/InputFiledV2";
import Tooltip from "@mui/material/Tooltip";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { axiosTokenInstance } from "../../../utils/axios";

interface Branch {
  firstName: string;
  addressLine1: string;
  addressLine2: string;
  pinCode: string;
  state: string;
  district: string;
}

interface Props {
  branchId: number;
  i: number;
  control: any; // Update with proper types
  register: any; // Update with proper types
  errors: any; // Update with proper types
  setValue: any; // Update with proper types
  getValues: any; // Update with proper types
  removeBranch: (index: number) => void;
  addBranch: (index: number) => void;
  branch: {
    firstName: string;
    middleName: string;
    lastName: string;
    designation: string;
    landlineNumber: string;
    email: string;
    addressLine1: string;
    addressLine2: string;
    pincode: string;
    state: string;
    district: string;
  };
}

const ProfileManagementForm: React.FC<Props> = ({
  i,
  control,
  register,
  errors,
  setValue,
  getValues,
  removeBranch,
  addBranch,
  branch,
}) => {
  console.log(branch, "branch");
  const [pinCodeError, setPinCodeError] = useState("");
  const [designationOptions, setDesignationOptions] = useState([]);
  const [selectedState, setSelectedState] = useState<string | null>(
    branch.designation
  );

  console.log({ selectedState }, "selectedState");
  const Stateoptions = [
    { value: "xyz", label: "xyz" },
    { value: "abc", label: "abc" },
    { value: "def", label: "def" },
    { value: "jjjjj", label: "jjjj" },
  ];
  const handleSetState = (value: string) => {
    setSelectedState(value);
    setValue(`branches[${i}].designation`, value); // Set state value
  };
  const Navigate = useNavigate();
  const debounce = (
    func: (...args: any[]) => void,
    delay: number
  ): ((...args: any[]) => void) => {
    let timer: NodeJS.Timeout;
    return function (...args: any[]) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  const fetchLocationData = async (pinCode: string): Promise<void> => {
    if (!pinCode || pinCode.length !== 6) {
      setPinCodeError("Pin code must be 6 digits");
      return;
    }
    setPinCodeError("");
    if (pinCode.length === 6) {
      try {
        const response = await axios.get(`${pincodeValidationUrl}/${pinCode}`);

        if (response.data && response.data[0] && response.data[0].PostOffice) {
          const state = response.data[0].PostOffice[0].State;
          const district = response.data[0].PostOffice[0].District;
          setValue(`branches[${i}].state`, state);
          setValue(`branches[${i}].district`, district);
        } else if (
          response.data[0].Status === "Error" &&
          response.data[0].Message === "No records found"
        ) {
          // Using SweetAlert2 to show error message
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No data found for this pin code!",
          });
          setPinCodeError("No data found for this pin code");
        } else {
          setPinCodeError("No data found for this pin code");
        }
      } catch (error) {
        console.error("Failed to fetch location data:", error);
        setPinCodeError("Failed to fetch data for the pin code");
      }
    }
  };
  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        const response = await axiosTokenInstance.get(
          "/deposit-taker/management-team/designation"
        );
        console.log({ response }, "response");
        setDesignationOptions(
          response.data?.data.map((item: any) => ({
            value: item.name,
            label: item.name,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch designations:", error);
        Swal.fire({
          icon: "error",
          text: "Failed to fetch designations",
          confirmButtonText: "Ok",
        });
      }
    };
    fetchDesignations();
  }, []);

  const debouncedFetchLocation = useCallback(
    debounce(fetchLocationData, 500),
    []
  );
  const popperModifiers = [
    {
      name: "offset",
      options: {
        offset: [0, -8], // Adjust the vertical offset value (second value) to 0 or a negative number
      },
    },
  ];

  const disabledField = sessionStorage.getItem("user_status");

  const checkStatus = (status: any): any => {
    switch (disabledField) {
      case "TRANSIT":
        return true;
      case "MOD_REFER_TO_REGULATOR":
        return true;
      case "REFER_TO_REGULATOR":
        return true;
      case "MOD_TRANSIT":
        return true;
      case "PENDING":
        return true;
      case "MOD_PENDING":
        return true;
      default:
        return false;
    }
  };

  const disableFieldStatus = checkStatus(disabledField);

  return (
    <div className="my-3">
      <div className="flex flex-row justify-between bg-[#E7F0FF] p-2 rounded-md">
        <span>Management Personnel {i + 1}</span>
        {disableFieldStatus ? (
          <></>
        ) : (
          <>
            <div className="flex flex-row cursor-pointer">
              {/* <img src={addCircle} alt="Add" onClick={() => addBranch(i)} />

              {i + 1 > 1 && (
                <img
                  src={minusCircle}
                  alt="Remove"
                  className="ml-2"
                  onClick={() => removeBranch(i)}
                />
              )} */}
              {i < 9 && (
                <img src={addCircle} alt="Add" onClick={() => addBranch(i)} />
              )}
              {i > 0 && (
                <img
                  src={minusCircle}
                  alt="Remove"
                  className="ml-2"
                  onClick={() => removeBranch(i)}
                />
              )}
            </div>
          </>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <div>
          <label htmlFor={`firstName-${i}`} className="text-base font-normal">
            First Name <span className="text-red-500">*</span>
          </label>
          <Tooltip
            title={
              getValues(`branches[${i}].firstName`)
                ? "Edit First Name"
                : "Enter First Name"
            }
            placement="bottom"
            arrow
            PopperProps={{
              modifiers: popperModifiers,
            }}
          >
            <InputFieldsV2
              type="text"
              placeholder="Enter first name"
              disabled={disableFieldStatus}
              {...register(`branches[${i}].firstName`, {
                required: "First name is required",
                pattern: {
                  value: /^[a-zA-Z\s'-]+$/,
                  message: "First name contains invalid characters",
                },
              })}
            />
          </Tooltip>
          {errors?.branches?.[i]?.firstName && (
            <p className="text-red-500">
              {errors.branches[i].firstName.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`middleName-${i}`} className="text-base font-normal">
            Middle Name
          </label>
          <Tooltip
            title={
              getValues(`branches[${i}].middleName`)
                ? "Edit Middle Name"
                : "Enter Middle Name"
            }
            placement="bottom"
            arrow
            PopperProps={{
              modifiers: popperModifiers,
            }}
          >
            <InputFieldsV2
              type="text"
              placeholder="Enter middle name"
              disabled={disableFieldStatus}
              {...register(`branches[${i}].middleName`, {
                // required: "First name is required",
                // pattern: {
                //   value: /^[a-zA-Z\s'-]+$/,
                //   message: "First name contains invalid characters",
                // },
              })}
            />
          </Tooltip>
        </div>
        <div>
          <label htmlFor={`lastName-${i}`} className="text-base font-normal">
            Last Name <span className="text-red-500">*</span>
          </label>
          <Tooltip
            title={
              getValues(`branches[${i}].lastName`)
                ? "Edit last Name"
                : "Enter last Name"
            }
            placement="bottom"
            arrow
            PopperProps={{
              modifiers: popperModifiers,
            }}
          >
            <InputFieldsV2
              type="text"
              placeholder="Enter middle name"
              disabled={disableFieldStatus}
              {...register(`branches[${i}].lastName`, {
                required: "last name is required",
                pattern: {
                  value: /^[a-zA-Z\s'-]+$/,
                  message: "last name contains invalid characters",
                },
              })}
            />
          </Tooltip>
          {errors?.branches?.[i]?.lastName && (
            <p className="text-red-500">
              {errors.branches[i].lastName.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`designation-${i}`} className="text-base font-normal">
            Designation <span className="text-red-500">*</span>
          </label>
          <Tooltip
            title={
              getValues(`branches[${i}].designation`)
                ? "Edit designation"
                : "Enter designation"
            }
            placement="bottom"
            arrow
            PopperProps={{
              modifiers: popperModifiers,
            }}
          >
            {/* <InputFieldsV2
              type="text"
              placeholder="Enter designation"
              disabled={disableFieldStatus}
              {...register(`branches[${i}].designation`, {
                required: "Designation is required",
                pattern: {
                  value: /^[a-zA-Z\s'-]+$/, // Only allows letters, spaces, apostrophes, and hyphens
                  message: "Designation contains invalid characters",
                },
                minLength: {
                  value: 2,
                  message: "Designation must be at least 2 characters long",
                },
                maxLength: {
                  value: 50,
                  message: "Designation must be less than 50 characters long",
                },
              })}
            /> */}
            <SelectButton
              options={designationOptions}
              setOption={(value) => {
                handleSetState(value);
                setValue(`branches[${i}].designation`, value, {
                  // shouldValidate: true,
                }); // Trigger validation when setting value
              }}
              selectedOption={selectedState}
              placeholder="Select"
              showSearchInput={true}
              {...register(`branches[${i}].designation`, {
                required: "State is required",
              })}
            />
          </Tooltip>
          {errors?.branches?.[i]?.designation && (
            <p className="text-red-500">
              {errors.branches[i].designation.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`landlineNumber-${i}`}
            className="text-base font-normal"
          >
            Landline Number
            {/* <span className="text-red-500">*</span> */}
          </label>
          <Tooltip
            title={
              getValues(`branches[${i}].landlineNumber`)
                ? "Edit Landline Number"
                : "Enter Landline Number"
            }
            placement="bottom"
            arrow
            PopperProps={{
              modifiers: popperModifiers,
            }}
          >
            <InputFieldsV2
              type="text"
              placeholder="Enter landline number"
              disabled={disableFieldStatus}
              {...register(`branches[${i}].landlineNumber`, {
                // required: "Landline number is required",
                pattern: {
                  value: /^\+?[0-9-]{6,15}$/, // Regex for landline number: allows optional '+' and digits with hyphens
                  message:
                    "Invalid landline number format. It should be between 6 to 15 digits, and may include hyphens.",
                },
              })}
            />
          </Tooltip>
          {errors?.branches?.[i]?.landlineNumber && (
            <p className="text-red-500">
              {errors.branches[i].landlineNumber.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`email-${i}`} className="text-base font-normal">
            Email Id
            {/* <span className="text-red-500">*</span> */}
          </label>
          <Tooltip
            title={
              getValues(`branches[${i}].email`)
                ? "Edit email Id"
                : "Enter email Id"
            }
            placement="bottom"
            arrow
            PopperProps={{
              modifiers: popperModifiers,
            }}
          >
            <InputFieldsV2
              type="text"
              placeholder="Enter email Id"
              disabled={disableFieldStatus}
              {...register(`branches[${i}].email`, {
                // required: "Email Id is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
          </Tooltip>
          {errors?.branches?.[i]?.email && (
            <p className="text-red-500">{errors.branches[i].email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor={`addressLine1-${i}`}
            className="text-base font-normal"
          >
            Address line 1 <span className="text-red-500">*</span>
          </label>
          <Tooltip
            title={
              getValues(`branches[${i}].addressLine1`)
                ? "Edit Address Line 1"
                : "Enter Address Line 1"
            }
            PopperProps={{
              modifiers: popperModifiers,
            }}
            placement="bottom"
            arrow
          >
            <TextArea
              placeholder="Enter address"
              disabled={disableFieldStatus}
              {...register(`branches[${i}].addressLine1`, {
                required: "Address Line 1 is required",
                pattern: {
                  value: /^[a-zA-Z0-9\s,.-]*$/,
                  message: "Address Line 1 contains invalid characters",
                },
              })}
            />
          </Tooltip>
          {errors?.branches?.[i]?.addressLine1 && (
            <p className="text-red-500">
              {errors.branches[i].addressLine1.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor={`addressLine2-${i}`}
            className="text-base font-normal"
          >
            Address line 2{/* <span className="text-red-500">*</span> */}
          </label>
          <Tooltip
            title={
              getValues(`branches[${i}].addressLine2`)
                ? "Edit Address Line 2"
                : "Enter Address Line 2"
            }
            placement="bottom"
            arrow
            PopperProps={{
              modifiers: popperModifiers,
            }}
          >
            <TextArea
              placeholder="Enter address line 2"
              disabled={disableFieldStatus}
              {...register(`branches[${i}].addressLine2`, {
                // required: "Address Line 2 is required",
                // pattern: {
                //   value: /^[a-zA-Z0-9\s,.-]*$/,
                //   message: "Address Line 2 contains invalid characters",
                // },
              })}
            />
          </Tooltip>
          {errors?.branches?.[i]?.addressLine2 && (
            <p className="text-red-500">
              {errors.branches[i].addressLine2.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`pincode-${i}`} className="text-base font-normal">
            Pin Code <span className="text-red-500">*</span>
          </label>
          <Tooltip
            title={
              getValues(`branches[${i}].pincode`)
                ? "Edit PinCode"
                : "Enter PinCode"
            }
            placement="bottom"
            arrow
            PopperProps={{
              modifiers: popperModifiers,
            }}
          >
            <InputFieldsV2
              type="number"
              placeholder="Enter pin code"
              disabled={disableFieldStatus}
              {...register(`branches[${i}].pincode`, {
                required: "Pin code is required",
                minLength: {
                  value: 6,
                  message: "Pin code must be 6 digits",
                },
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "Invalid pin code",
                },
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  debouncedFetchLocation(e.target.value),
              })}
            />
          </Tooltip>
          {errors?.branches?.[i]?.pincode && (
            <p className="text-red-500">{errors.branches[i].pincode.message}</p>
          )}
          {pinCodeError && <p className="text-red-500">{pinCodeError}</p>}
        </div>

        <div>
          <label htmlFor={`state-${i}`} className="text-base font-normal">
            State <span className="text-red-500">*</span>
          </label>
          <Tooltip
            title={
              getValues(`branches[${i}].state`) ? "Edit State" : "Enter State"
            }
            placement="bottom"
            arrow
            PopperProps={{
              modifiers: popperModifiers,
            }}
          >
            <InputFieldsV2
              type="text"
              disabled={true}
              placeholder="type here"
              {...register(`branches[${i}].state`, {
                required: " state is required",
              })}
            />
          </Tooltip>
        </div>

        <div>
          <label htmlFor={`district-${i}`} className="text-base font-normal">
            District <span className="text-red-500">*</span>
          </label>
          <Tooltip
            title={
              getValues(`branches[${i}].district`)
                ? "Edit District"
                : "Enter District"
            }
            placement="bottom"
            arrow
            PopperProps={{
              modifiers: popperModifiers,
            }}
          >
            <InputFieldsV2
              disabled={true}
              type="text"
              placeholder="type here"
              {...register(`branches[${i}].district`, {
                required: " district is required",
              })}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagementForm;
