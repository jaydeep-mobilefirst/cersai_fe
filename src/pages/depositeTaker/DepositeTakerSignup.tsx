import { useState } from "react";
import SignupModal from "../../components/userFlow/depositeTaker/SignupModal";
import InputField from "../../components/userFlow/form/InputField";
import SelectButton from "../../components/userFlow/form/SelectButton";
import TextArea from "../../components/userFlow/form/TextArea";
import UploadButton from "../../components/userFlow/form/UploadButton";
import VarificationForm from "./VarificationForm";

const DepositeTakerSignup = () => {
  const [option, setoption] = useState(null)
  const options = [
    { value: 'andhra_pradesh', label: 'Andhra Pradesh' },
    { value: 'bihar', label: 'Bihar' },
    { value: 'chhattisgarh', label: 'Chhattisgarh' },
    { value: 'gujarat', label: 'Gujarat' },
];

const dateHandler = (event : any) => {
  const {value} = event.target  
}

  return (
    <div>
      <SignupModal/>
      <InputField type="date"/>
      <SelectButton 
        selectedOption={option}
        setOption={setoption}
        options={options}
        placeholder="Select State"
      />
      <TextArea/>
      <VarificationForm/>
      <UploadButton/>
    </div>
  );
};

export default DepositeTakerSignup
