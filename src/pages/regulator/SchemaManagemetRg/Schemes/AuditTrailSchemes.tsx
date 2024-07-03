import React, { useContext, useEffect, useState } from "react";
import Accordion from "../../../../components/customAccordin/CustomAccordin";
import AuditTrail from "../../../../components/ScehmaManagement/AuditTrail";
import { useLocation, useNavigate } from "react-router-dom";
import { useScreenWidth } from "../../../../utils/screenSize";
import TaskTabsRg from "../../../../components/ScehmaManagement/TaskTabsRg";
import InfoIcon from "../../../../assets/images/info-circle.svg";
import { useDepositTakerRegistrationStore } from "../../../../zust/deposit-taker-registration/registrationStore";
import { FormHandlerContext } from "../../../../contextAPI/useFormFieldHandlers";
import axios from "axios";
import { bffUrl } from "../../../../utils/api";
import DynamicFields from "../../../../components/userFlow/depositeTaker/DynamicFields";
import LoaderSpin from "../../../../components/LoaderSpin";
import SelectButton from "../../../../components/userFlow/form/SelectButton";
interface AccordionItem {
  header: React.ReactNode;
  content: React.ReactNode;
}

const options2 = [
  { value: "Scheme 123", label: "Scheme 123" },
  { value: "Scheme 123", label: "Scheme 123" },
  { value: "Scheme 123", label: "Scheme 123" },
];
const SchemesSearchDetailsSM: React.FC = () => {
  const [selectedOption2, setSelectedOption2] = useState<string | null>(null);

  const [selectedOption4, setSelectedOption4] = useState<string | null>(null);

  const [loader, setLoader] = useState(true);
  const screenWidth = useScreenWidth();
  const { onChange } = useContext(FormHandlerContext);
  const { setAllFormData, setAllDocumentData, allFormData } =
    useDepositTakerRegistrationStore((state) => state);
  const navigate = useNavigate();
  const location = useLocation();
  const uniqueId = location.state?.uniqueId;
  const depositTakerId = location.state?.depositTakerId;
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(2);
  const [entityDetailsFields, setEntityDetailsFields] = useState<any[]>([]);
  // console.log(entityDetailsFields, "entitydata");
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

  const handleSetOption2 = (value: string) => {
    setSelectedOption2(value);
  };

  const handleBackButtonClick = () => {
    navigate("/rg/my-task");
  };
  return (
    <div className="flex flex-col min-h-screen ">
      <div className="mt-6 mx-8">
        <TaskTabsRg />
      </div>
      <div className="flex  flex-row mt-3 mx-8">
        <img
          src={InfoIcon}
          alt="InfoIcon"
          className="h-6 w-6 sm:h-8 sm:w-8 mr-2"
        />
        <p className="text-[#808080]">
          You can Upload Deposit Takers data in bulk. Please use this given
          <span className="underline line-through:text-blue text-[#BFCFFF]">
            Template
          </span>
        </p>
      </div>
      <div className="mt-8 mb-8 mx-8">
        {loader ? <LoaderSpin /> : <Accordion items={accordionItems} />}
        <div className="grid grid-cols-2 space-x-3">
          <div>
            <label
              htmlFor="Select Other Schemes"
              className="text-base font-normal text-gilroy-medium"
            >
              Status
            </label>
            <SelectButton
              // backgroundColor="#F2F2F2"
              setOption={handleSetOption2}
              options={options2}
              selectedOption={selectedOption2}
              placeholder="Select"
              showSearchInput={true}
            />
          </div>

          <div>
            <label
              htmlFor="Select Other Schemes"
              className="text-base font-normal text-gilroy-medium"
            >
              Select Other Schemes
            </label>
            <SelectButton
              // backgroundColor="#F2F2F2"
              setOption={handleSetOption2}
              options={options2}
              selectedOption={selectedOption2}
              placeholder="Select"
              showSearchInput={true}
            />
          </div>
        </div>
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
              // onClick={handleButtonClick}
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
      {/* {showPopup && (
        <StatusSuccessPopUp
          closePopup={() => setShowPopup(false)}
          SuccessPopup={() => setShowPopup(false)}
        />
      )} */}
    </div>
  );
};

export default SchemesSearchDetailsSM;
