import BackArrow from "../../../assets/images/BackArrow.svg";
// import CreatedBy from "./CreatedBy";
// import EntityDetails from "./EntityDetails";
// import SchemeDetails from "./SchemeDetails";
// import AuditTrail from "./AuditTrail";
import Accordion from "../../../components/customAccordin/CustomAccordin";
import AuditTrail from "../../../components/ScehmaManagement/AuditTrail";
import SchemeDetails from "../../../components/ScehmaManagement/SchemaDetails";
import TaskTabs from "../../../components/ScehmaManagement/TaskTabsCa";
interface AccordionItem {
  header: React.ReactNode;
  content: React.ReactNode;
}

const SchemaMasterDetailCa = () => {
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
          <TaskTabs />
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
        <div className="text-center">
          <h1 className="text-[#24222B] text-xs text-wrap text-gilroy-light mt-3 font-normal">
            © 2024 Protean BUDs, All Rights Reserved.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SchemaMasterDetailCa;
