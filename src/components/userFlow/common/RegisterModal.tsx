
import React, { useState } from 'react';
import { radioButtons, registrationFirstPage } from '../../../utils/hardText/signuppageText';
import { useNavigate } from "react-router-dom";

interface ModelDivProps {
  closeModal: () => void; // Define the closeModal prop
}

const RegisterModel: React.FC<ModelDivProps> = ({ closeModal }) => {
  
  const Navigate = useNavigate();
  const navigateToSideBarPage = () => {
    Navigate("/sidebar");
  };

  const [radioButton, setRadioBtn] = useState(radioButtons[0].text);

  return (
    <div className="text-gilroy-regular md:p-[40px] m-[2.5%] w-[95%] md:w-[586px] md:h-[370px] p-8 bg-white rounded-3xl">
      <div className="flex flex-row justify-between items-center md:w-[506px] h-12 mb-[16px]">
        <h1 className='text-black text-2xl font-normal text-gilroy-medium  leading-loose'>{registrationFirstPage[0].heading}</h1>
        <img src={registrationFirstPage[0].removeBtn} className='w-6 h-6' alt="icon" onClick={closeModal} />
      </div>
      <form 
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {radioButtons.map((item) => {
          return (
            <div
              key={item.id} // Assuming there's an id in radioButtons data
              className={`md:mb-[18px] md:w-[244px] h-14 pl-4 pr-[18px] rounded-xl flex-col justify-center items-start gap-2 inline-flex ${
                radioButton === item.text ? 'bg-[#EEF7EB] text-[#385723]' : 'bg-white text-black'
              }`}
            >
              <div className=" flex flex-row justify-between items-center md:gap-4 inline-flex">
                <div className="text-lg font-normal  ">
                  <label onClick={() => setRadioBtn(item.text)}>
                    <input type="radio" name="entity" value="Deposit Taker" /> {item.text}
                  </label>
                </div>
              </div>
            </div>
          );
        })}
        <div className="mt-[22px] text-[20px] modal-footer flex justify-around md:flex-row md:justify-between">
          <button
            type="button"
            className="text-[#385723] Rectangle151 w-[35%] md:w-[244px] h-14 rounded-xl border border-[#385723]"
            onClick={closeModal} // Close the modal on Cancel button click
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-white Rectangle151 w-[35%] md:w-[244px] h-14 rounded-xl border bg-[#385723]"
            onClick={navigateToSideBarPage}
          >
            Select
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterModel;
