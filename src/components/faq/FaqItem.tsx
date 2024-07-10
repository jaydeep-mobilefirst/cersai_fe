import React, { useState } from "react";
import ArrowOpen from "../../assets/images/arrow-open.svg";
import ArrowClose from "../../assets/images/arrow-close.svg";
import { faqDataa } from "../../utils/hardText/faqPageContent";

interface FAQItemProps {
  question: string;
  answer: string | string[];
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);
  console.log("faqdatasa",faqDataa);

  return (

    
    <div className="bg-white rounded-lg border border-neutral-300 mb-4">
  <div
    className="flex justify-between items-center cursor-pointer md:p-4 p-3"
    
  >
    <div className="text-[#666] md:text-base text-[14px] font-medium w-[90%] text-gilroy-medium">
      {question}
    </div>
    <div className="flex justify-center items-center w-10 h-10" onClick={toggleOpen}>
      <img
        src={isOpen ? ArrowClose : ArrowOpen}
        alt="toggle"
        className="md:w-8 md:h-8 w-6 h-6"
      />
    </div>
  </div>
  {isOpen && (
    <div className=" px-4 pb-4 text-[#666] md:text-base text-[14px] font-normal py-4 border rounded max-h-52 overflow-auto text-gilroy-medium">
      {Array.isArray(answer) ? (
        <ul className="list-disc pl-5">
          {answer.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>{answer}</p>
      )}
    </div>
  )}
</div>
  );
};

export default FAQItem;
