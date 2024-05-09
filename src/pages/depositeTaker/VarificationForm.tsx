import { useScreenWidth } from "../../utils/screenSize";
import { useDepositTakerRegistrationStore } from "../../zust/deposit-taker-registration/registrationStore";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FormHandlerContext } from "../../contextAPI/useFormFieldHandlers";
import LoaderSpin from "../../components/LoaderSpin";
import axios from "axios";
import Swal from "sweetalert2";
import DynamicFields from "../../components/userFlow/depositeTaker/DynamicFields";
import SuccessPopup from "../../components/userFlow/depositeTaker/SuccessPopUp";

type Props = {};

const VerificationForm = (props: Props) => {
  const [loader, setLoader] = useState(false);
  const {onChange, handleValidationChecks, updatePanFormField, onFileChange, handleDocumentValidations} = useContext(FormHandlerContext)
  const Navigate = useNavigate();
  const {allFormData, documentData} = useDepositTakerRegistrationStore(state => state)
  const sectionId = allFormData?.entitySections?.find((s : any) => s?.sectionName === "Verification");
  const formFields = allFormData?.formFields?.form_fields?.filter((f : any) => f?.sectionId === sectionId?.id);
  const screenWidth = useScreenWidth();

  // Pan modal data 
  const [para1, setPara1] = useState('')
  const [para2, setPara2] = useState('')
  const [panSuccessModal, setPanSuccessModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [allVerified, setAllVerified] = useState(false);
  const onSubmit = async (event : any) => {
    event?.preventDefault();

    // Verify Pan

    const verifyPan = async () : Promise<boolean> => {
      try {
        let company = formFields?.find((field : any, i : number) => field?.label === "Company Name (As per Pan)");
        let pan = formFields?.find((field : any, i : number) =>  field?.label === "Pan Number");
        
        let response = await axios.post("http://34.149.91.231/cms/pandirectory/api", {
          name:company?.userInput?.toUpperCase(),
          pan_no: pan?.userInput
        })
        const data = response.data;
        if (data?.status !== "success") {
          setPara1(`Verification Failed`)
          setPara2(`${data?.message}`)
          setSubmitted(false)
          setPanSuccessModal(true)
        }
        
        const panUpdate = updatePanFormField(data, pan);

        return panUpdate;
        
      } catch (error) {
        alert("Error while verifying pan, Please try later!")
        return false
      }

    }

    setLoader(true)
    const noError = await handleValidationChecks(formFields)
    let panVerified = undefined;
    if (noError) {
     panVerified = await verifyPan();  
    } 
    setLoader(false)
    
    if (noError && panVerified) {
      setAllVerified(true);
      setPara1(`Verification Successful`)
      setPara2(`Your PAN Details have been successfully verified.`)
      setSubmitted(true)
      setPanSuccessModal(true)
      // Swal.fire({
      //   icon : "success",
      //   text : "Pan Verified Successfully!",
      //   confirmButtonText : "Ok"
      // })
      // .then((confirm : any) => {
      //   
      // })
    }
  };  
  
  const handleClosePopup = () =>{
    setPanSuccessModal(false)
    if (allVerified) {
      Navigate('/depositetaker/signup/entitydetails')
    }
  }
  return (
    <>
      <div className="">
        <form
          className="flex items-center justify-between flex-col h-full lg:h-[100vh]"
        >
          <div
            style={{
              width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
            }}
          >
            <div className="border-[#E6E6E6] border-[1px] lg:mt-[76px] w-full"></div>
            <h1 className="text-xl md:text-2xl font-bold mx-10 ">
              Verification
            </h1>
            <div className="bg-white p-4 lg:p-[48px]">
            <DynamicFields allFormData={allFormData} formFields={formFields} onChange={onChange} documentFields={documentData} onFileChange={onFileChange}/>

            </div>
          </div>
          <div>
            <div
              className="flex w-full p-4 lg:px-[48px] flex-row justify-between items-center"
              style={{
                width: `${
                  screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"
                }`,
              }}
            > 
              <div className="flex items-center ml-auto">
                <button
                  type="submit"
                  disabled={loader}
                  onClick={onSubmit}
                  className="bg-[#385723] rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs"
                >
                  {loader ? <LoaderSpin/> : "Verify details"}
                </button>
              </div>
            </div>
            <SuccessPopup
              closePopup={handleClosePopup}
              showPopup={() => setPanSuccessModal(true)}
              toggle={panSuccessModal}
              para1={para1}
              para2={para2}
              success={submitted}
            />
            <div>
              <div className="border-[#E6E6E6] border-[1px] lg:mt-4"></div>

              <p className="mb-[24px] text-gilroy-light text-center text-[#24222B] text-xs cursor-pointer mt-4">
                © 2024 Protean BUDs, All Rights Reserved.
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default VerificationForm;
