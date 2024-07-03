import React from 'react';
import FaqItem from './FaqItem';

interface FAQSectionProps {
  title: string;
  items: { question: string; answer: string | string[] }[];
}

const FAQSection: React.FC<FAQSectionProps> = ({ title, items }) => {
  return (
    <div>
      <h2 className="text-[#000508] text-base font-bold text-gilroy-semibold mt-[28px] mb-[12px]">{title}</h2>
      {items.map((item, index) => (
        <FaqItem key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
};

export default FAQSection;