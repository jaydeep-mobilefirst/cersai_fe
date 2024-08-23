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
  const operation = sessionStorage.getItem("operation");
  console.log({ operation });
  return (
    <div>
      <div className="relative mx-2 xl:ml-[40px] mt-4">
        <div>
          <h1 className="font-gilroy-bold text-[20px] font-medium text-[#1C468E]">
            {operation === "edit" ? "Edit user" : "Add user"}{" "}
          </h1>
        </div>
        <div className="mt-5">
          <Accordion items={accordionItems} showEdit={false} />
        </div>
      </div>
    </div>
  );
};

export default UserMasterForm;
