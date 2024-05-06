// import React, { useState } from 'react';
// import { radioButtons, registrationFirstPage } from '../../../utils/hardText/signuppageText';
// import { useNavigate } from "react-router-dom";

// interface ModelDivProps {
//   closeModal: () => void; // Define the closeModal prop
// }

// const RegisterModel: React.FC<ModelDivProps> = ({ closeModal }) => {

//   const Navigate = useNavigate();
//   const navigateToSideBarPage = () => {
//     Navigate("/depositetaker/signup/verification");
//   };

//   const [radioButton, setRadioBtn] = useState(radioButtons[0].text);

//   return (
//     <div className="text-gilroy-regular md:p-[40px] m-[2.5%] w-[95%] md:w-[586px] md:h-[370px] p-8 bg-white rounded-3xl">
//       <div className="flex flex-row justify-between items-center md:w-[506px] h-12 mb-[16px]">
//         <h1 className='text-black text-2xl font-normal text-gilroy-medium  leading-loose'>{registrationFirstPage[0].heading}</h1>
//         <img src={registrationFirstPage[0].removeBtn} className='w-6 h-6' alt="icon" onClick={closeModal} />
//       </div>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//         }}
//       >
//         {radioButtons.map((item) => {
//           return (
//             <div
//               key={item.id} // Assuming there's an id in radioButtons data
//               className={`md:mb-[18px] md:w-[244px] h-14 pl-4 pr-[18px] rounded-xl flex-col justify-center items-start gap-2 inline-flex ${
//                 radioButton === item.text ? 'bg-[#EEF7EB] text-[#385723]' : 'bg-white text-black'
//               }`}
//             >
//               <div className=" flex flex-row justify-between items-center md:gap-4 inline-flex">
//                 <div className="text-lg font-normal  ">
//                   <label onClick={() => setRadioBtn(item.text)}>
//                     <input type="radio" name="entity" value="Deposit Taker" /> {item.text}
//                   </label>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//         <div className="mt-[22px] text-[20px] modal-footer flex justify-around md:flex-row md:justify-between">
//           <button
//             type="button"
//             className="text-[#385723] Rectangle151 w-[35%] md:w-[244px] h-14 rounded-xl border border-[#385723]"
//             onClick={closeModal} // Close the modal on Cancel button click
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="text-white Rectangle151 w-[35%] md:w-[244px] h-14 rounded-xl border bg-[#385723]"
//             onClick={navigateToSideBarPage}
//           >
//             Select
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default RegisterModel;

import React, { useEffect, useState } from "react";
import {
  radioButtons,
  registrationFirstPage,
} from "../../../utils/hardText/signuppageText";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendBaseUrl } from "../../../utils/api";
import LoaderSpin from "../../LoaderSpin";
import { useDepositTakerRegistrationStore } from "../../../zust/deposit-taker-registration/registrationStore";

interface ModelDivProps {
  closeModal: () => void;
}


type EntityType = {
  id: number;
  entityName: string;
  registrationAllowed: boolean;
  autoApproval: boolean;
};

export const paths : any = {
  DT : "/depositetaker/signup/verification",
  RG : "/regulator/court/regulatordetails",
  DC : "designated/court/designateddetails",
  CA : "/competent/authority/competentdetails",

}
;
const RegisterModel: React.FC<ModelDivProps> = ({ closeModal }) => {
  const Navigate = useNavigate();
  const {entities, setEntities, setAllFormData} = useDepositTakerRegistrationStore(state => state)
  const [data, setData] = useState<EntityType[]>(entities);
  const [loader, setLoader] = useState<boolean>(false);
  useEffect(() => {
    if (entities.length <= 0) {
      apiCall();
    }
  }, []);

  const apiCall = () => {
    setLoader(true);
    axios
      .get(`${backendBaseUrl}/cms/registration/entities`)
      .then((responce) => {
        const data = responce?.data?.data;
        let sortedData = data.sort(
          (a: { id: number }, b: { id: number }) => a.id - b.id
        );
        sortedData = sortedData?.map((d : any) => ({ ...d, path: paths[d?.entityCode]}));
        setData(sortedData);
        setEntities(sortedData)
        setLoader(false);
        setSelectedRadio(sortedData[0])
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  };

  const fetchFormFields = () => {
    axios
        .get(`${backendBaseUrl}/cms/registration/field-data/${selectedRadio?.id}`)
        .then(async (response) => {
          if (response?.data?.success) {
            let dropdownData = undefined;
            try {
              let dropdownOptionsRes = await axios.get(`${backendBaseUrl}/cms/registration/dropdown-components`)
              dropdownData = dropdownOptionsRes?.data?.data;
            } catch (error) {
              console.log("Error");
              
            }
            let modifiedFormFields = response?.data?.data?.formFields?.form_fields?.map((o : any) => ({...o, userInput : "", error : ""}))
            let districtDropDownId = dropdownData?.find((d : any) => d.name === "district")?.id; 
            
            modifiedFormFields = modifiedFormFields?.map((f : any) => {
              if (f?.dropdown_Components === districtDropDownId) {
                return {...f, dropdown_options : {...f.dropdown_options, options : []}}
              }
              else{
                return f
              }
            })            
            let obj = {
              dropdownData,
              ...response?.data?.data,
              formFields : {form_fields : modifiedFormFields}
            }            
            setAllFormData(obj)
          }
          else{
            throw new Error("Error getting data, Please try later!")
          }
          setLoader(false);
        })
        .catch((error: any) => {
          console.log(error);
          setLoader(false);
        });

  }
  const [selectedRadio, setSelectedRadio] = useState<any>(entities[0]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetchFormFields()
    Navigate(selectedRadio?.path);
  };

  return (
    <div className="text-gilroy-regular md:p-[40px] m-[2.5%] w-[95%] md:w-[586px] md:h-[370px] p-8  bg-white rounded-3xl">
      <div className="flex flex-row justify-between items-center md:w-[506px] h-12 mb-[16px]">
        <h1 className="text-black text-2xl font-normal text-gilroy-medium leading-loose">
          {registrationFirstPage[0].heading}
        </h1>
        <img
          src={registrationFirstPage[0].removeBtn}
          className="w-6 h-6 cursor-pointer"
          alt="icon"
          onClick={closeModal}
        />
      </div>
     {loader ? <LoaderSpin/> :  <form onSubmit={handleSubmit}>
        {data?.length > 0 && data?.map((item) => (
          <div
            onClick={() => setSelectedRadio(item)}
            key={item.id}
            className={`md:mb-[18px] md:w-[244px] h-14 pl-4 pr-[18px] rounded-xl flex-col justify-center items-start gap-2 inline-flex hover:cursor-pointer ${selectedRadio.id === item.id
                ? "bg-[#EEF7EB] text-[#385723] border-[#385723] mr-2"
                : "bg-white text-black border border-gray-300 mr-2"
              }`}
          >
            <div className=" flex-row justify-between items-center  md:gap-4 inline-flex hover:cursor-pointer">
              <div className="text-lg font-normal hover:cursor-pointer">
                <label>
                  <input
                    type="radio"
                    name="entity"
                    checked={selectedRadio?.id === item?.id}
                    onChange={() => setSelectedRadio(item)}
                    className="mr-2 hover:cursor-pointer"
                  />
                  {item?.entityName}
                </label>
              </div>
            </div>
          </div>
        ))}
        <div className="mt-[22px] text-[20px] modal-footer flex justify-around md:flex-row md:justify-between">
          <button
            type="button"
            className="text-[#385723] Rectangle151 w-[35%] md:w-[244px] h-14 rounded-xl border border-[#385723]"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-white Rectangle151 w-[35%] md:w-[244px] h-14 rounded-xl border bg-[#385723]"
          >
            Select
          </button>
        </div>
      </form>}
    </div>
  );
};

export default RegisterModel;
