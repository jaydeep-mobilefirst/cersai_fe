
import React, { useState } from 'react';
import { radioButtons, registrationFirstPage } from '../../../utils/hardText/signuppageText';

interface ModelDivProps {
  closeModal: () => void; // Define the closeModal prop
}

const RegisterModel: React.FC<ModelDivProps> = ({ closeModal }) => {
  const [radioButton, setRadioBtn] = useState(radioButtons[0].text);

  return (
    <div className="text-gilroy-regular md:p-[40px] m-[2.5%] w-[95%] md:w-[70%] p-8 bg-white rounded-3xl">
      <div className="flex flex-row justify-between items-center mb-[16px]">
        <h1 className='text-[24px]'>{registrationFirstPage[0].heading}</h1>
        <img src={registrationFirstPage[0].removeBtn} alt="icon" onClick={closeModal} />
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
              className={`pl-4 text-[18px] md:mr-[18px] text-gilroy-regular w-[100%] md:w-[244px] mb-[18px] h-14 md:pl-4 pr-[18px] py-4 bg-green-50 rounded-xl flex flex-row  md:flex-col md:justify-start md:items-start gap-2 inline-flex ${
                radioButton === item.text ? 'bg-[#EEF7EB] text-[#385723]' : 'bg-white text-black'
              }`}
            >
              <div className="flex flex-row justify-between items-center md:gap-4 inline-flex">
                <div className="text-lg font-normal  ">
                  <label onClick={() => setRadioBtn(item.text)}>
                    <input type="radio" name="entity" value="Deposit Taker" /> {item.text}
                  </label>
                </div>
              </div>
            </div>
          );
        })}
        <div className="text-[20px] modal-footer flex flex-start md:flex-row md:justify-between">
          <button
            type="button"
            className="text-[#385723] Rectangle151 w-[45%] md:w-[244px] h-14 rounded-xl border border-[#385723] mr-2"
            onClick={closeModal} // Close the modal on Cancel button click
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-white Rectangle151 w-[45%] md:w-[244px] h-14 rounded-xl border bg-[#385723]"
          >
            Select
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterModel;
