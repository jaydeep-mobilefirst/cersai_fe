import axios from "axios";
import BackArrow from "../../../assets/images/BackArrow.svg";
import Accordion from "../../../components/customAccordin/CustomAccordin";
import AuditTrail from "../../../components/ScehmaManagement/AuditTrail";
import TaskTabs from "../../../components/ScehmaManagement/TaskTabs";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { bffUrl } from "../../../utils/api";
import { useContext, useEffect, useState } from "react";
import { useDepositTakerRegistrationStore } from "../../../zust/deposit-taker-registration/registrationStore";
import DynamicFields from "../../../components/userFlow/depositeTaker/DynamicFields";
import { FormHandlerContext } from "../../../contextAPI/useFormFieldHandlers";
import LoaderSpin from "../../../components/LoaderSpin";

interface AccordionItem {
  header: React.ReactNode;
  content: React.ReactNode;
}

const SchemeMasterForm = () => {
  const [loader, setLoader] = useState(true);
  const { onChange } = useContext(FormHandlerContext);
  const { setAllFormData, setAllDocumentData, allFormData } =
    useDepositTakerRegistrationStore((state) => state);
  const navigate = useNavigate();
  const location = useLocation();
  const uniqueId = location.state?.uniqueId;
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(2);

  const fetchSchema = async () => {
    try {
      setLoader(true);
      const response = await axios.get(`${bffUrl}/scheme/field-data/1`);
      // console.log(response, "response");
      if (response.data.success) {
        const portalResponse = await axios.get(
          `${bffUrl}/scheme-portal/${uniqueId}`
        );

        const userData = portalResponse.data?.data?.schemes[0];
        const formFields = response?.data?.data?.formFields?.allFormFields.map(
          (field: any) => ({
            ...field,
            userInput: userData?.schemeFormData?.find(
              (f: any) => f?.fieldId === field?.id
            )?.value,
            error: "",
            disabled: true,
            typeId: field?.fieldTypeId,
            // id: field.fieldTypeId,
          })
        );

        setAllFormData({
          ...response?.data?.data,
          formFields: {
            form_fields: formFields?.map((field: any) => {
              if (field?.key === "depositTakerId") {
                return {
                  ...field,
                  dropdown_options: {
                    ...field?.dropdown_options,
                    options: field?.dropdown_options?.options?.map(
                      (o: any) => ({
                        name: o?.uniqueId,
                        id: o?.companyName,
                      })
                    ),
                  },
                };
              } else {
                return field;
              }
            }),
          },
          fieldTypes: response?.data?.data?.fieldTypes,
          validations: response?.data?.data?.validations,
          fileTypes: response?.data?.data?.fileTypes,
          other: userData,
        });
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.error("Error fetching schema data:", error);
    }
  };

  useEffect(() => {
    if (uniqueId) {
      fetchSchema();
    }
  }, [uniqueId, page, pageSize]);

  const accordionItems: AccordionItem[] = [
    {
      header: "Scheme Details",
      content: (
        <DynamicFields
          formFields={allFormData?.formFields?.form_fields}
          allFormData={allFormData}
          onChange={onChange}
        />
      ),
    },
    {
      header: "Audit Trail",
      content: <AuditTrail />,
    },
  ];
  const handleBackButtonClick = () => {
    navigate("/dt/scheme");
  };

  return (
    <div>
      <div
        className="relative mx-2 xl:ml-[40px] mt-4"
        style={{ minHeight: "calc(100vh - 110px)" }}
      >
        <div className="mt-6">
          <TaskTabs />
        </div>
        <div className="mt-8">
          {loader ? <LoaderSpin /> : <Accordion items={accordionItems} />}
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
        <div className="w-full absolute bottom-0">
          <div className="border-b-2 border-[#E6E6E6]"></div>
          <div className="text-center">
            <h1 className="text-[#24222B] text-xs text-wrap text-gilroy-light mt-3 font-normal">
              © 2024 Protean BUDs, All Rights Reserved.
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeMasterForm;
