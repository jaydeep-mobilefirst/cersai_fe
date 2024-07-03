import React, { useContext, useEffect, useState } from "react";
import Accordion from "../../../../components/customAccordin/CustomAccordin";
import AuditTrail from "../../../../components/ScehmaManagement/AuditTrail";
import { useLocation, useNavigate } from "react-router-dom";
import { useScreenWidth } from "../../../../utils/screenSize";
import TaskTabsDc from "../../../../components/ScehmaManagement/TaskTabsDc";
import InfoIcon from "../../../../assets/images/info-circle.svg";
import DynamicFields from "../../../../components/userFlow/depositeTaker/DynamicFields";
import { FormHandlerContext } from "../../../../contextAPI/useFormFieldHandlers";
import { useDepositTakerRegistrationStore } from "../../../../zust/deposit-taker-registration/registrationStore";
import axios from "axios";
import { bffUrl } from "../../../../utils/api";
import LoaderSpin from "../../../../components/LoaderSpin";
interface AccordionItem {
  header: React.ReactNode;
  content: React.ReactNode;
}
const SchemesSearchDetailsSM: React.FC = () => {
  const [loader, setLoader] = useState(true);
  const screenWidth = useScreenWidth();
  const { onChange } = useContext(FormHandlerContext);
  const { setAllFormData, setAllDocumentData, allFormData } =
    useDepositTakerRegistrationStore((state) => state);
  const navigate = useNavigate();
  const location = useLocation();
  const uniqueId = location.state?.uniqueId;
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(2);
  const depositTakerId = location.state?.depositTakerId;
  const [entityDetailsFields, setEntityDetailsFields] = useState<any[]>([]);

  const fetchSchema = async () => {
    try {
      setLoader(true);
      const response = await axios.get(`${bffUrl}/scheme/field-data`);
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
  const fetchFormFields = () => {
    axios
      .get(`${bffUrl}/registration/field-data/1?status=addToProfile`)
      .then(async (response) => {
        if (response?.data?.success) {
          let dtData: any = [];
          try {
            let depositTakerData = await axios.get(
              `${bffUrl}/deposit-taker/${depositTakerId}`
            );
            dtData =
              depositTakerData?.data?.data?.depositTaker?.depositTakerFormData;
          } catch (error) {
            console.log("Error");
          }
          let modifiedFormFields = response.data.data?.formFields
            ?.map((o: any) => ({
              ...o,
              userInput: dtData
                ? dtData?.find((data: any) => data?.fieldId === o?.id)?.value
                : "",
              error: "",
              disabled: true,
            }))
            ?.sort((a: any, b: any) => a.sortOrder - b.sortOrder);

          let modifiedFileFields =
            response?.data?.data?.registrationDocumentFields?.map((o: any) => ({
              ...o,
              file: dtData
                ? dtData?.find((data: any) => data?.fieldId === o?.id)?.value
                : "",
              error: "",
              fileName: dtData
                ? dtData?.find((data: any) => data?.fieldId === o?.id)?.value
                : "",
              uploadFileId: dtData
                ? dtData?.find((data: any) => data?.fieldId === o?.id)?.value
                : "",
              disabled: true,
            }));

          let obj = {
            ...response?.data?.data,
            formFields: { form_fields: modifiedFormFields },
          };
          setEntityDetailsFields(modifiedFormFields);
          // setAllDocumentData(modifiedFileFields);
        } else {
          throw new Error("Error getting data, Please try later!");
        }
        setLoader(false);
      })
      .catch((error: any) => {
        console.log(error);
        setLoader(false);
      });
  };
  useEffect(() => {
    fetchFormFields();
  }, [depositTakerId]);

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
      header: "Entity Details",
      content: (
        <DynamicFields
          formFields={entityDetailsFields}
          allFormData={entityDetailsFields}
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
    navigate("/dc/my-task");
  };
  return (
    <div className="flex flex-col min-h-screen ">
      <div className="mt-6 mx-8">
        <TaskTabsDc />
      </div>
      <div className="flex flex-row mt-3 mx-8">
        <img
          src={InfoIcon}
          alt="InfoIcon"
          className="h-6 w-6 sm:h-8 sm:w-8 mr-2"
        />
        <p className="text-[#808080]">
          Please update the coments under scheme details
        </p>
      </div>
      <div className="mt-8 mb-8 mx-8">
        {loader ? <LoaderSpin /> : <Accordion items={accordionItems} />}
      </div>
      <div>
        <div
          className="flex w-full p-8 lg:px-[30px] flex-row justify-between items-center "
          style={{
            width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
          }}
        >
          <div className="flex flex-row items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="shrink-0"
            >
              <path
                d="M15 6L9 12L15 18"
                stroke="#1D1D1B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <button
              onClick={handleBackButtonClick}
              className="text-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#385723]"
            >
              Back
            </button>
          </div>
          <div className="flex items-center">
            <button
              type="submit"
              className="bg-[#1C468E] rounded-xl p-3 text-white font-semibold text-sm w-full sm:w-auto sm:max-w-xs text-gilroy-semibold "
            >
              Submit
            </button>
          </div>
        </div>
        <div>
          <div className="border-[#E6E6E6] border-[1px] lg:mt-4"></div>

          <p className="mb-[24px] text-gilroy-light text-center text-[#24222B] text-xs cursor-pointer mt-4">
            © 2024 Protean BUDs, All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SchemesSearchDetailsSM;
