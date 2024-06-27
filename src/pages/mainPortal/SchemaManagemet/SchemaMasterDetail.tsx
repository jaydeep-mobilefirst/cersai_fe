import axios from "axios";
import BackArrow from "../../../assets/images/BackArrow.svg";
// import CreatedBy from "./CreatedBy";
// import EntityDetails from "./EntityDetails";
// import SchemeDetails from "./SchemeDetails";
// import AuditTrail from "./AuditTrail";
import Accordion from "../../../components/customAccordin/CustomAccordin";
import AuditTrail from "../../../components/ScehmaManagement/AuditTrail";
import SchemeDetails from "../../../components/ScehmaManagement/SchemaDetails";
import TaskTabs from "../../../components/ScehmaManagement/TaskTabs";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { bffUrl } from "../../../utils/api";
import { useEffect, useState } from "react";

interface AccordionItem {
  header: React.ReactNode;
  content: React.ReactNode;
}

const SchemeMasterForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const uniqueId = location.state?.uniqueId;
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(2);

  const fetchAndMapSchemeData = async () => {
    try {
      // Fetch schema form fields (assuming this endpoint provides the necessary field IDs and types)
      const schemaResponse = await axios.get(`${bffUrl}/scheme/field-data`);
      if (!schemaResponse.data.success) {
        throw new Error("Failed to fetch schema fields");
      }
      let formFields = schemaResponse.data.data.formFields.allFormFields;
      console.log({ formFields });

      // Fetch user data from the scheme portal (actual values to be filled in the form)
      const portalResponse = await axios.get(
        `${bffUrl}/scheme-portal/${uniqueId}?page=${page}&limit=${pageSize}`
      );
      const userData = portalResponse.data?.data;
      console.log(userData, "userData"); // Assuming this returns the scheme data with schemeFormData

      // Ensure userData contains the schemeFormData before proceeding
      if (!userData || !userData.schemeFormData) {
        throw new Error("Scheme form data not available");
      }

      // Map user inputs to schema fields
      formFields = formFields.map((field: any) => {
        const userField = userData.schemeFormData.find(
          (uField: any) => uField.fieldId === field.id
        );
        if (userField) {
          console.log(`Match found for fieldId ${field.id}:`, userField);
        }
        return {
          ...field,
          userInput: userField ? userField.value : "",
          error: "", // Placeholder for future validation error handling
        };
      });

      // Optionally: update state or handle the mapped fields as needed
      console.log(formFields, "Mapped form fields data"); // Log or manage the mapped data as needed
    } catch (error: any) {
      console.error("Error in fetching or mapping scheme data:", error);
      if (error.response) {
        console.log("Error response:", error.response.data);
      }
    }
  };

  useEffect(() => {
    if (uniqueId) {
      fetchAndMapSchemeData();
    }
  }, [uniqueId, page, pageSize]);

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
  const handleBackButtonClick = () => {
    navigate("/dt/mytask");
  };
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
            <p
              onClick={handleBackButtonClick}
              className="text-sm font-normal text-gilroy-regular"
            >
              Back
            </p>
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

export default SchemeMasterForm;
