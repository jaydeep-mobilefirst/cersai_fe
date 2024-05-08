import React, { useState } from "react";
import addCircle from "../../../assets/images/add-circle.svg";
import minusCircle from "../../../assets/images/minus-cirlce.svg";
import TextArea from "../../../components/userFlow/form/TextArea";
import InputFields from "../../../components/userFlow/common/InputField";
import SelectButton from "../../../components/userFlow/form/SelectButton";
import { useScreenWidth } from "../../../utils/screenSize";

type Props = {
  i: number;
  onRemove: (index: number) => void;
  addBranch: (index: number) => void;
};

const ProfileBranchForm = (props: Props) => {
  const [selectedOption2, setSelectedOption2] = useState<string | null>(null);

  const handleSetOption2 = (value: string) => {
    setSelectedOption2(value);
  };

  const options2 = [
    { value: "Andhra Pradesh", label: "Andhra Pradesh" },
    { value: "Bihar", label: "Bihar" },
    { value: "Chhattisgarh", label: "Chhattisgarh" },
    { value: "Gujarat", label: "Gujarat" },
  ];
  return (
    <div>
      <div className="flex flex-row justify-between bg-[#EEF7EB] p-2 rounded-md">
        <span>Branch {props.i}</span>{" "}
        <div className="flex flex-row cursor-pointer">
          <img
            src={addCircle}
            alt=""
            onClick={() => props.addBranch(props.i)}
          />{" "}
          <img
            src={minusCircle}
            alt=""
            className="ml-2"
            onClick={() => props.onRemove(props.i)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <div>
          <label htmlFor="addressLine1" className="text-base font-normal">
            Address line 1 <span className="text-red-500">*</span>
          </label>
          <TextArea placeholder="Enter address" />
        </div>
        <div>
          <label htmlFor="addressLine2" className="text-base font-normal">
            Address line 2<span className="text-red-500">*</span>
          </label>
          <TextArea placeholder="Enter address" />
        </div>
        <div>
          <label htmlFor="pinCode" className="text-base font-normal">
            Pin code <span className="text-red-500">*</span>
          </label>
          <InputFields placeholder="Type Here" />
        </div>
        <div>
          <label htmlFor="state" className="text-base font-normal">
            State <span className="text-red-500">*</span>
          </label>
          <SelectButton
            setOption={handleSetOption2}
            options={options2}
            selectedOption={selectedOption2}
            placeholder="Select"
            showSearchInput={true}
          />
        </div>
        <div>
          <label htmlFor="state" className="text-base font-normal">
            District <span className="text-red-500">*</span>
          </label>
          <SelectButton
            setOption={handleSetOption2}
            options={options2}
            selectedOption={selectedOption2}
            placeholder="Select"
            showSearchInput={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileBranchForm;
