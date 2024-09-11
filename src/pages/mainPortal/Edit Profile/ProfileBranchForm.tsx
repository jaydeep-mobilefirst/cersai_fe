import React, { useCallback, useEffect, useState } from "react";
import TextArea from "../../../components/userFlow/form/TextArea";
import SelectButton from "../../../components/userFlow/form/SelectButton";
// import addCircle from "../../../assets/images/add-circle.svg";
import addCircle from "../../../assets/images/add-user.svg";
// import minusCircle from "../../../assets/images/minus-cirlce.svg";
import minusCircle from "../../../assets/images/MinusIcon.svg";
import InputFields from "../../../components/userFlow/common/InputField";
import axios from "axios";
import { pincodeValidationUrl } from "../../../utils/api";
import InputFieldsV2 from "../../../components/userFlow/common/InputFiledV2";
import Tooltip from "@mui/material/Tooltip";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import useStore from "../../../store/statusStore";

interface Branch {
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
    addressLine1: string;
    addressLine2: string;
    pinCode: string;
    state: string;
    district: string;
  };
}

const ProfileBranchForm: React.FC<Props> = ({
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
  // const [selectedState, setSelectedState] = useState<string | null>(
  //   branch.state
  // );
  // const [selectedDistrict, setSelectedDistrict] = useState<string | null>(
  //   branch.district
  // );

  // useEffect(() => {
  //   setValue(`branches[${i}].state`, selectedState);
  //   setValue(`branches[${i}].district`, selectedDistrict);
  // }, [selectedState, selectedDistrict, setValue, i]);

  // const handleSetState = (value: string) => {
  //   setSelectedState(value);
  //   setValue(`branches[${i}].state`, value); // Set state value
  // };
  // const handleSetDistrict = (value: string) => {
  //   setSelectedDistrict(value);
  //   setValue(`branches[${i}].district`, value); // Set district value
  // };

  // const Districtoptions = [
  //   { value: "Anantapur", label: "Anantapur" }, // Andhra Pradesh
  //   { value: "Gaya", label: "Gaya" }, // Bihar
  //   { value: "Raipur", label: "Raipur" }, // Chhattisgarh
  //   { value: "Ahmedabad", label: "Ahmedabad" }, // Gujarat
  //   { value: "Hyderabad", label: "Hyderabad" }, // Telangana
  // ];

  // const Stateoptions = [
  //   { value: "Andhra Pradesh", label: "Andhra Pradesh" },
  //   { value: "Bihar", label: "Bihar" },
  //   { value: "Chhattisgarh", label: "Chhattisgarh" },
  //   { value: "Gujarat", label: "Gujarat" },
  //   { value: "Telangana", label: "Telangana" },
  // ];
  const [pinCodeError, setPinCodeError] = useState("");


  const { data, loading, error, fetchData } = useStore();

  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    if (checkPathName(pathname)) {
      fetchData(); // Trigger the API call when the component mounts
    }
  }, [fetchData]);


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

  // const fetchLocationData = async (pinCode: string): Promise<void> => {
  //   if (!pinCode || pinCode.length !== 6) {
  //     setPinCodeError("Pin code must be 6 digits");
  //     return;
  //   }
  //   setPinCodeError("");
  //   if (pinCode.length === 6) {
  //     try {
  //       const response = await axios.get(`${pincodeValidationUrl}/${pinCode}`);

  //       // const state = response.data[0].PostOffice[0].State;
  //       // const district = response.data[0].PostOffice[0].District;
  //       // setSelectedState(state);
  //       // setSelectedDistrict(district);
  //       // setValue(`branches[${i}].state`, state);
  //       // setValue(`branches[${i}].district`, district);
  //       if (response.data[0] && response.data[0].PostOffice[0]) {
  //         const state = response.data[0].PostOffice[0].State;
  //         const district = response.data[0].PostOffice[0].District;
  //         setValue(`branches[${i}].state`, state);
  //         setValue(`branches[${i}].district`, district);
  //       } else {
  //         setPinCodeError("No data found for this pin code");
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch location data:", error);
  //       setPinCodeError("Failed to fetch data for the pin code");
  //     }
  //   }
  // };
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

  const checkPathName = (status: any): any => {
    switch (pathname) {
      case "/dt/profile":
        return true;
      case "/rg/profile":
        return true;
      case "/dc/profile":
        return true;
      case "/ca/profile":
        return true;
      default:
        return false;
    }
  };

  if (pathname == "/dt/profile") {
    var disableFieldStatus = checkPathName(pathname)
      ? disabledField == "RETURNED"
        ? false
        : !data?.profileUpdate
      : !data?.profileUpdate;
  } else {
    disableFieldStatus = checkPathName(pathname)
      ? checkStatus(disabledField)
      : false;
  }

  return (
    <div className="my-3">
      <div className="flex flex-row justify-between bg-[#E7F0FF] p-2 rounded-md">
        <span>Branch {i + 1}</span>
        {disableFieldStatus ? (
          <></>
        ) : (
          <>
            <div className="flex flex-row cursor-pointer">
              <img src={addCircle} alt="Add" onClick={() => addBranch(i)} />
              {i + 1 > 1 && (
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
          <label htmlFor={`pinCode-${i}`} className="text-base font-normal">
            Pin Code
          </label>
          <Tooltip
            title={
              getValues(`branches[${i}].pinCode`)
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
              {...register(`branches[${i}].pinCode`, {
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
          {errors?.branches?.[i]?.pinCode && (
            <p className="text-red-500">{errors.branches[i].pinCode.message}</p>
          )}
          {pinCodeError && <p className="text-red-500">{pinCodeError}</p>}
        </div>

        <div>
          <label htmlFor={`state-${i}`} className="text-base font-normal">
            State <span className="text-red-500">*</span>
          </label>
          {/* <SelectButton
            options={Stateoptions}
            setOption={(value) => {
              handleSetState(value);
              setValue(`branches[${i}].state`, value, { shouldValidate: true }); // Trigger validation when setting value
            }}
            selectedOption={selectedState}
            placeholder="Select"
            showSearchInput={true}
            {...register(`branches[${i}].state`, {
              required: "State is required",
            })}
          />
          {errors?.branches?.[i]?.state && (
            <p className="text-red-500">{errors.branches[i].state.message}</p>
          )} */}
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

          {/* <SelectButton
            options={Districtoptions}
            setOption={(value) => {
              handleSetDistrict(value);
              setValue(`branches[${i}].district`, value, {
                shouldValidate: true,
              }); // Trigger validation when setting value
            }}
            selectedOption={selectedDistrict}
            placeholder="Select"
            showSearchInput={true}
            {...register(`branches[${i}].district`, {
              required: "District is required",
            })}
          />
          {errors?.branches?.[i]?.district && (
            <p className="text-red-500">
              {errors.branches[i].district.message}
            </p>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ProfileBranchForm;
