import { useState } from "react";
import SignupModal from "../../components/userFlow/depositeTaker/SignupModal";
import InputField from "../../components/userFlow/form/InputField";
import SelectButton from "../../components/userFlow/form/SelectButton";
import TextArea from "../../components/userFlow/form/TextArea";
import UploadButton from "../../components/userFlow/form/UploadButton";
import VarificationForm from "./VarificationForm";
import SignUpSideBar from "../../components/userFlow/depositeTaker/SignUpSideBar";
import DepositTakerRegisterFlow from "../../layouts/depositTakerRegisterFlow/DepositTakerRegisterFlow";
import RegularDetailsForm from "./RegularDetailsForm";
import NodalDetails from "./NodalDetails";

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
    // <div>
    //   <SignupModal/>
    //   <InputField type="date"/>
    //   <SelectButton 
    //     selectedOption={option}
    //     setOption={setoption}
    //     options={options}
    //     placeholder="Select State"
    //   />
    //   <TextArea/>
    //   <VarificationForm/>
    //   <UploadButton/>
    // </div>
    <>
    {/* <DepositTakerRegisterFlow>
      <VarificationForm/>
      <RegularDetailsForm/>
      <NodalDetails/>
      
    </DepositTakerRegisterFlow> */}
    </>
  );
};

export default DepositeTakerSignup
