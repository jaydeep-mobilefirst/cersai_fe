import React, { useEffect, useState } from "react";

interface AccordionItem {
  header: React.ReactNode;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  showEdit?: boolean; // New prop to show/hide edit button
  hasError?: boolean;
  showAccordion?: boolean,
  handleEditClick?: () => void;
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  showEdit = false,
  showAccordion = false,
  hasError,
}) => {
  // const [activeIndex, setActiveIndex] = useState<number | null>(0);

  // const toggleAccordion = (index: number) => {
  //   setActiveIndex(activeIndex === index ? null : index);
  // };
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    // Automatically open the first section with an error
    const errorIndex = items.findIndex((item: any) => item.hasError);
    if (errorIndex !== -1) {
      setActiveIndex(errorIndex);
    }
  }, [items]);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    if (showAccordion) {
      setActiveIndex(null); // Reset to null when showAccordion is true
    } else {
      setActiveIndex(0); // Set to 0 or any other initial value when showAccordion is false
    }
  }, [showAccordion]);

  const handleEditClick = (event: React.MouseEvent<HTMLParagraphElement>) => {
    event.stopPropagation(); // Prevent event propagation to the parent container
    alert("Edit");
  };

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <div className=" bg-[#E7F0FF] rounded-lg mb-5" key={index}>
          <div
            className="flex justify-between items-center px-4 py-3 cursor-pointer select-none"
            onClick={() => toggleAccordion(index)}
          >
            <div className="flex items-center">
              <span className="text-[#24222B] font-normal text-sm text-gilroy-medium">
                {item.header}
              </span>
            </div>
            <span className="flex items-center">
              {showEdit && ( // Conditionally render edit button
                <p
                  className="mr-2 text-xl font-normal text-[#1C468E] text-gilroy-medium "
                  onClick={handleEditClick}
                >
                  Edit
                </p>
              )}
              <span className="transform transition-transform">
                {activeIndex === index ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#1C468E] font-medium"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#1C468E] font-medium"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </span>
            </span>
          </div>
          {activeIndex === index && (
            <div className="px-4 py-2 bg-white">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
