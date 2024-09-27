import BackArrow from "../../../../assets/images/BackArrow.svg";

import Accordion from "../../../../components/customAccordin/CustomAccordin";
import AuditTrail from "../../../../components/ScehmaManagement/AuditTrail";
import SchemeDetails from "../../../../components/ScehmaManagement/SchemaDetails";
import TaskTabsCa from "../../../../components/ScehmaManagement/TaskTabsCa";
interface AccordionItem {
  header: React.ReactNode;
  content: React.ReactNode;
}

const DepositSchemaMasterDetail = () => {
  const accordionItems: AccordionItem[] = [
    {
      header: "Scheme Details",
      content: <SchemeDetails />,
    },

    {
      header: "Audit Trail",
      content: <AuditTrail />,
    },
  ];
  return (
    <div>
      <div className="relative mx-2 xl:ml-[40px] mt-4">
        <div className="mt-6">
          <TaskTabsCa />
        </div>
        <div className="mt-8">
          <Accordion items={accordionItems} />
        </div>
        <div className="my-11 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center cursor-pointer space-x-2 mb-3 md:mb-0">
            <img src={BackArrow} alt={BackArrow} />
            <p className="text-sm font-normal text-gilroy-regular">Back</p>
          </div>
        </div>
        <div className="border-b-2 border-[#E6E6E6]"></div>
        

<div className="text-center mt-auto">
  <h1 className="text-[#24222B] text-xs text-wrap text-gilroy-light mt-3 font-normal">
    COPYRIGHT © 2024 CERSAI. ALL RIGHTS RESERVED.
  </h1>
  <p className="text-[#24222B] text-xs text-wrap text-gilroy-light font-normal">
    Powered and managed by{" "}
    <a
      href="https://www.proteantech.in/"
      className="underline text-gilroy-regular font-bold"
      target="_blank"
    >
      Protean eGov Technologies
    </a>{" "}
  </p>
</div>
      </div>
    </div>
  );
};

export default DepositSchemaMasterDetail;
