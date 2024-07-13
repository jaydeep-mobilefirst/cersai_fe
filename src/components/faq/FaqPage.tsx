import { useState } from "react";
import { faqData } from "../../utils/hardText/faqExample";
const FaqPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState("");

  const toggleOpen = (text: string) => () => {
    if (isOpen === text) {
      setIsOpen(""); // Close the FAQ answer if it's already open
    } else {
      setIsOpen(text); // Open the FAQ answer if it's closed
    }
  };
  return (
    <div>
      <h1 className="text-[#24222B] text-xl font-bold text-gilroy-bold">
        {faqData?.data?.content?.faqPageData?.heading?.[0]?.text}
      </h1>
      {faqData?.data?.content?.faqPageData?.questionSections?.map(
        (section, sectionIndex) => (
          <div key={sectionIndex}>
            <h2 className="text-[#000508] text-base font-bold text-gilroy-semibold mt-[28px] mb-[12px]">
              {section?.subHeading?.[0]?.text}
            </h2>
            {section?.questions?.map((question, questionIndex) => (
              <div className="bg-white rounded-lg border border-neutral-300 mb-4 ">
                <div className="flex justify-between items-center cursor-pointer md:p-4 p-3">
                  <div key={questionIndex}>
                    <h3 className="text-[#666] md:text-base text-[14px] font-medium text-gilroy-medium">
                      {question?.question}
                    </h3>
                  </div>
                  <div
                    className="flex justify-center items-center w-10 h-10"
                    onClick={toggleOpen(question?.question)}
                  >
                    <img
                      src={
                        isOpen === question?.question
                          ? faqData?.data?.content?.faqPageData?.arrows?.[1]?.img
                          : faqData?.data?.content?.faqPageData?.arrows?.[0]?.img
                      }
                      alt="toggle"
                      className="md:w-8 md:h-8 w-6 h-6"
                    />
                  </div>
                </div>
                {isOpen === question?.question && (
                  <div className=" px-4 pb-4 text-[#666] md:text-base text-[14px] font-normal py-4 border rounded max-h-52 overflow-auto text-gilroy-medium">
                    {Array.isArray(question?.answer) ? (
                      <ul className="list-disc pl-5">
                        {question?.answer?.map((answer, answerIndex) => (
                          <li key={answerIndex}>{answer}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{question?.answer}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default FaqPage;
