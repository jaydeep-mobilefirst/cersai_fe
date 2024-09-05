import Accordion from "../../../components/customAccordin/CustomAccordin";
import AddUserForm from "../UserManagement/AddUserForm";
interface AccordionItem {
  header: React.ReactNode;
  content: React.ReactNode;
}

const UserMasterForm = () => {
  const accordionItems: AccordionItem[] = [
    {
      header: "User Details",
      content: <AddUserForm />,
    },
  ];
  return (
    <div>
      <div className="relative mx-2 xl:ml-[40px] mt-4">
        <div>
          <h1 className="font-gilroy-bold text-[20px] font-medium text-[#1C468E]">
            Add user{" "}
          </h1>
        </div>
        <div className="mt-5">
          <Accordion items={accordionItems} showEdit={true} />
        </div>
      </div>
    </div>
  );
};

export default UserMasterForm;
