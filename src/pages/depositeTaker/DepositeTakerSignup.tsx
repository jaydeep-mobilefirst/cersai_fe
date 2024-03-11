import { useState } from "react";
import SignupModal from "../../components/userFlow/depositeTaker/SignupModal";
import InputField from "../../components/userFlow/form/InputField";
import SelectButton from "../../components/userFlow/form/SelectButton";
import TextArea from "../../components/userFlow/form/TextArea";

const DepositeTakerSignup = () => {
  const [option, setoption] = useState(null)
  const options = [
    { value: 'andhra_pradesh', label: 'Andhra Pradesh' },
    { value: 'bihar', label: 'Bihar' },
    { value: 'chhattisgarh', label: 'Chhattisgarh' },
    { value: 'gujarat', label: 'Gujarat' },
];

console.log(option);

  return (
    <div>
      <SignupModal/>
      <InputField/>
      <SelectButton 
        selectedOption={option}
        setOption={setoption}
        options={options}
        placeholder="Select State"
      />

      <TextArea/>
    </div>
  );
};

export default DepositeTakerSignup
