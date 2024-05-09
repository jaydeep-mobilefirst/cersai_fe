// import React, { useState } from "react";
// import addCircle from "../../../assets/images/add-circle.svg";
// import minusCircle from "../../../assets/images/minus-cirlce.svg";
// import TextArea from "../../../components/userFlow/form/TextArea";
// import InputFields from "../../../components/userFlow/common/InputField";
// import SelectButton from "../../../components/userFlow/form/SelectButton";
// import { useScreenWidth } from "../../../utils/screenSize";

// type Props = {
//   i: number;
//   onRemove: (index: number) => void;
//   addBranch: (index: number) => void;
// };

// const ProfileBranchForm = (props: Props) => {
//   const [selectedOption2, setSelectedOption2] = useState<string | null>(null);
//   const [selectedOption1, setSelectedOption1] = useState<string | null>(null);

//   const handleSetOption2 = (value: string) => {
//     setSelectedOption2(value);
//   };
//   const handleSetOption1 = (value: string) => {
//     setSelectedOption1(value);
//   };

//   const options2 = [
//     { value: "Andhra Pradesh", label: "Andhra Pradesh" },
//     { value: "Bihar", label: "Bihar" },
//     { value: "Chhattisgarh", label: "Chhattisgarh" },
//     { value: "Gujarat", label: "Gujarat" },
//   ];
//   const options1 = [
//     { value: "Andhra Pradesh", label: "Andhra Pradesh" },
//     { value: "Bihar", label: "Bihar" },
//     { value: "Chhattisgarh", label: "Chhattisgarh" },
//     { value: "Gujarat", label: "Gujarat" },
//   ];
//   console.log(props.i);
//   return (
//     <div>
//       <div className="flex flex-row justify-between bg-[#EEF7EB] p-2 rounded-md">
//         <span>Branch {props.i}</span>{" "}
//         <div className="flex flex-row cursor-pointer">
//           <img
//             src={addCircle}
//             alt=""
//             onClick={() => props.addBranch(props.i)}
//           />{" "}
//           {props.i > 1 && (
//             <img
//               src={minusCircle}
//               alt=""
//               className="ml-2"
//               onClick={() => props.onRemove(props.i)}
//             />
//           )}
//         </div>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
//         <div>
//           <label htmlFor="addressLine1" className="text-base font-normal">
//             Address line 1 <span className="text-red-500">*</span>
//           </label>
//           <TextArea placeholder="Enter address" />
//         </div>
//         <div>
//           <label htmlFor="addressLine2" className="text-base font-normal">
//             Address line 2<span className="text-red-500">*</span>
//           </label>
//           <TextArea placeholder="Enter address" />
//         </div>
//         <div>
//           <label htmlFor="pinCode" className="text-base font-normal">
//             Pin code <span className="text-red-500">*</span>
//           </label>
//           <InputFields placeholder="Type Here" />
//         </div>
//         <div>
//           <label htmlFor="state" className="text-base font-normal">
//             State <span className="text-red-500">*</span>
//           </label>
//           <SelectButton
//             setOption={handleSetOption1}
//             options={options1}
//             selectedOption={selectedOption1}
//             placeholder="Select"
//             showSearchInput={true}
//           />
//         </div>
//         <div>
//           <label htmlFor="state" className="text-base font-normal">
//             District <span className="text-red-500">*</span>
//           </label>
//           <SelectButton
//             setOption={handleSetOption2}
//             options={options2}
//             selectedOption={selectedOption2}
//             placeholder="Select"
//             showSearchInput={true}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileBranchForm;
// import React from "react";
// import axios from "axios";
// import { useForm, Controller } from "react-hook-form";
// import addCircle from "../../../assets/images/add-circle.svg";
// import TextArea from "../../../components/userFlow/form/TextArea";
// import InputField from "../../../components/userFlow/common/InputField";
// import SelectButton from "../../../components/userFlow/form/SelectButton";
// import minusCircle from "../../../assets/images/minus-cirlce.svg";
// import { bffUrl } from "../../../utils/api";
// type Props = {
//   i: number;
//   onRemove: (index: number) => void;
//   addBranch: (index: number) => void;
// };

// const ProfileBranchForm = ({ i, onRemove, addBranch }: Props) => {
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//     setValue,
//     getValues,
//   } = useForm({
//     defaultValues: {
//       addressLine1: "",
//       addressLine2: "",
//       pinCode: "",
//       state: "",
//       district: "",
//     },
//   });

//   const onSubmit = async (data: any) => {
//     console.log(data, "data from branch");
//     const branchesPayload = {
//       branches: [data],
//     };

//     try {
//       const response = await axios.post(
//         `${bffUrl}/deposit-taker/branch/DT1715081107737`,
//         branchesPayload
//       );
//       console.log(response.data);
//       // Handle success, possibly clearing form or informing user of success
//     } catch (error) {
//       console.error("Failed to submit branch:", error);
//       // Handle error, could notify user of failure
//     }
//   };

//   const options2 = [
//     { value: "Andhra Pradesh", label: "Andhra Pradesh" },
//     { value: "Bihar", label: "Bihar" },
//     { value: "Chhattisgarh", label: "Chhattisgarh" },
//     { value: "Gujarat", label: "Gujarat" },
//   ];
//   const options1 = [
//     { value: "Andhra Pradesh", label: "Andhra Pradesh" },
//     { value: "Bihar", label: "Bihar" },
//     { value: "Chhattisgarh", label: "Chhattisgarh" },
//     { value: "Gujarat", label: "Gujarat" },
//   ];

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div className="flex flex-row justify-between bg-[#EEF7EB] p-2 rounded-md">
//         <span>Branch {i}</span>
//         <div className="flex flex-row cursor-pointer">
//           <img src={addCircle} alt="" onClick={() => addBranch(i)} />
//           {i > 1 && (
//             <img
//               src={minusCircle}
//               alt=""
//               className="ml-2"
//               onClick={() => onRemove(i)}
//             />
//           )}
//         </div>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
//         <div>
//           <label htmlFor="addressLine1" className="text-base font-normal">
//             Address line 1 <span className="text-red-500">*</span>
//           </label>
//           <TextArea
//             placeholder="Enter address"
//             {...register("addressLine1", {
//               required: "Address Line 1 is required",
//             })}
//           />
//           {errors.addressLine1 && (
//             <p className="text-red-500">{errors.addressLine1.message}</p>
//           )}
//         </div>
//         <div>
//           <label htmlFor="addressLine2" className="text-base font-normal">
//             Address line 2
//           </label>
//           <TextArea
//             placeholder="Enter address"
//             {...register("addressLine2", {
//               required: "Address Line 2 is required",
//             })}
//           />
//           {errors.addressLine2 && (
//             <p className="text-red-500">{errors.addressLine2.message}</p>
//           )}
//         </div>
//         <div>
//           <label htmlFor="pinCode" className="text-base font-normal">
//             Pin code <span className="text-red-500">*</span>
//           </label>
//           <InputField
//             placeholder="Type Here"
//             type="number"
//             {...register("pinCode", { required: "Pin Code is required" })}
//           />
//           {errors.pinCode && (
//             <p className="text-red-500">{errors.pinCode.message}</p>
//           )}
//         </div>
//         <div>
//           <label htmlFor="state" className="text-base font-normal">
//             State <span className="text-red-500">*</span>
//           </label>
//           <Controller
//             name="state"
//             control={control}
//             rules={{ required: "State is required" }}
//             render={({ field }) => (
//               <SelectButton
//                 {...field}
//                 options={options1}
//                 setOption={(value) =>
//                   setValue("state", value, { shouldValidate: true })
//                 }
//                 selectedOption={getValues("state")}
//                 placeholder="Select"
//                 showSearchInput={true}
//               />
//             )}
//           />
//           {errors.state && (
//             <p className="text-red-500">{errors.state.message}</p>
//           )}
//         </div>
//         <div>
//           <label htmlFor="district" className="text-base font-normal">
//             District <span className="text-red-500">*</span>
//           </label>
//           <Controller
//             name="district"
//             control={control}
//             rules={{ required: "District is required" }}
//             render={({ field }) => (
//               <SelectButton
//                 {...field}
//                 options={options2}
//                 setOption={(value) =>
//                   setValue("district", value, { shouldValidate: true })
//                 }
//                 selectedOption={getValues("district")}
//                 placeholder="Select"
//                 showSearchInput={true}
//               />
//             )}
//           />
//           {errors.district && (
//             <p className="text-red-500">{errors.district.message}</p>
//           )}
//         </div>
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default ProfileBranchForm;
// import React, { useState } from "react";
// import TextArea from "../../../components/userFlow/form/TextArea";
// import SelectButton from "../../../components/userFlow/form/SelectButton";
// import addCircle from "../../../assets/images/add-circle.svg";
// import minusCircle from "../../../assets/images/minus-cirlce.svg";
// import InputFields from "../../../components/userFlow/common/InputField";

// interface Branch {
//   addressLine1: string;
//   addressLine2: string;
// }

// interface Props {
//   i: number;
//   control: any; // Update with proper types
//   register: any; // Update with proper types
//   errors: any; // Update with proper types
//   setValue: any; // Update with proper types
//   getValues: any; // Update with proper types
//   removeBranch: (index: number) => void;
//   addBranch: (index: number) => void;
// }

// const ProfileBranchForm: React.FC<Props> = ({
//   i,
//   control,
//   register,
//   errors,
//   setValue,
//   getValues,
//   removeBranch,
//   addBranch,
// }) => {
//   const [selectedOption2, setSelectedOption2] = useState<string | null>(null);
//   const [selectedOption1, setSelectedOption1] = useState<string | null>(null);

//   const handleSetOption2 = (value: string) => {
//     setSelectedOption2(value);
//   };
//   const handleSetOption1 = (value: string) => {
//     setSelectedOption1(value);
//   };

//   const options2 = [
//     { value: "Andhra Pradesh", label: "Andhra Pradesh" },
//     { value: "Bihar", label: "Bihar" },
//     { value: "Chhattisgarh", label: "Chhattisgarh" },
//     { value: "Gujarat", label: "Gujarat" },
//   ];
//   const options1 = [
//     { value: "Andhra Pradesh", label: "Andhra Pradesh" },
//     { value: "Bihar", label: "Bihar" },
//     { value: "Chhattisgarh", label: "Chhattisgarh" },
//     { value: "Gujarat", label: "Gujarat" },
//   ];
//   return (
//     <div className="my-3">
//       <div className="flex flex-row justify-between bg-[#EEF7EB] p-2 rounded-md">
//         <span>Branch {i}</span>
//         <div className="flex flex-row cursor-pointer">
//           <img src={addCircle} alt="Add" onClick={() => addBranch(i)} />
//           {i > 0 && (
//             <img
//               src={minusCircle}
//               alt="Remove"
//               className="ml-2"
//               onClick={() => removeBranch(i)}
//             />
//           )}
//         </div>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
//         <div>
//           <label
//             htmlFor={`addressLine1-${i}`}
//             className="text-base font-normal"
//           >
//             Address line 1 <span className="text-red-500">*</span>
//           </label>
//           <TextArea
//             placeholder="Enter address"
//             {...register(`branches[${i}].addressLine1`, {
//               required: "Address Line 1 is required",
//             })}
//           />
//           {errors?.branches?.[i]?.addressLine1 && (
//             <p className="text-red-500">
//               {errors.branches[i].addressLine1.message}
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileBranchForm;
import React, { useState } from "react";
import TextArea from "../../../components/userFlow/form/TextArea";
import SelectButton from "../../../components/userFlow/form/SelectButton";
import addCircle from "../../../assets/images/add-circle.svg";
import minusCircle from "../../../assets/images/minus-cirlce.svg";
import InputFields from "../../../components/userFlow/common/InputField";

interface Branch {
  addressLine1: string;
  addressLine2: string;
  pinCode: string;
  state: string;
  district: string;
}

interface Props {
  i: number;
  control: any; // Update with proper types
  register: any; // Update with proper types
  errors: any; // Update with proper types
  setValue: any; // Update with proper types
  getValues: any; // Update with proper types
  removeBranch: (index: number) => void;
  addBranch: (index: number) => void;
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
}) => {
  const [selectedOption2, setSelectedOption2] = useState<string | null>(null);
  const [selectedOption1, setSelectedOption1] = useState<string | null>(null);

  const handleSetOption2 = (value: string) => {
    console.log(value, "value");
    setSelectedOption2(value);
    setValue(`branches[${i}].state`, value); // Set state value
  };
  const handleSetOption1 = (value: string) => {
    setSelectedOption1(value);
    setValue(`branches[${i}].district`, value); // Set district value
  };

  const options2 = [
    { value: "Andhra Pradesh", label: "Andhra Pradesh" },
    { value: "Bihar", label: "Bihar" },
    { value: "Chhattisgarh", label: "Chhattisgarh" },
    { value: "Gujarat", label: "Gujarat" },
  ];
  const options1 = [
    { value: "Andhra Pradesh", label: "Andhra Pradesh" },
    { value: "Bihar", label: "Bihar" },
    { value: "Chhattisgarh", label: "Chhattisgarh" },
    { value: "Gujarat", label: "Gujarat" },
  ];
  return (
    <div className="my-3">
      <div className="flex flex-row justify-between bg-[#EEF7EB] p-2 rounded-md">
        <span>Branch {i}</span>
        <div className="flex flex-row cursor-pointer">
          <img src={addCircle} alt="Add" onClick={() => addBranch(i)} />
          {i > 0 && (
            <img
              src={minusCircle}
              alt="Remove"
              className="ml-2"
              onClick={() => removeBranch(i)}
            />
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <div>
          <label
            htmlFor={`addressLine1-${i}`}
            className="text-base font-normal"
          >
            Address line 1 <span className="text-red-500">*</span>
          </label>
          <TextArea
            placeholder="Enter address"
            {...register(`branches[${i}].addressLine1`, {
              required: "Address Line 1 is required",
            })}
          />
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
            Address line 2
          </label>
          <InputFields
            placeholder="Enter address line 2"
            {...register(`branches[${i}].addressLine2`, {
              required: "Address Line 2 is required",
            })}
          />
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
          <InputFields
            type="number"
            placeholder="Enter pin code"
            {...register(`branches[${i}].pinCode`, {
              required: "Pin code is required",
            })}
          />
          {errors?.branches?.[i]?.pinCode && (
            <p className="text-red-500">{errors.branches[i].pinCode.message}</p>
          )}
        </div>
        <div>
          <label htmlFor={`state-${i}`} className="text-base font-normal">
            State
          </label>
          <SelectButton
            options={options1}
            setOption={handleSetOption1}
            selectedOption={selectedOption1}
            placeholder="Select"
            showSearchInput={true}
          />
          {errors?.branches?.[i]?.state && (
            <p className="text-red-500">{errors.branches[i].state.message}</p>
          )}
        </div>
        <div>
          <label htmlFor={`district-${i}`} className="text-base font-normal">
            District
          </label>
          <SelectButton
            options={options2}
            setOption={handleSetOption2}
            selectedOption={selectedOption2}
            placeholder="Select"
            showSearchInput={true}
          />
          {errors?.branches?.[i]?.district && (
            <p className="text-red-500">
              {errors.branches[i].district.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileBranchForm;
