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
import SelectButtonMultiselect from "../../../../components/UserManagement/SelectButtonMultiselect";
interface AccordionItem {
  header: React.ReactNode;
  content: React.ReactNode;
}

const status = [
  { label: "Ban", value: "BANNED" },
  { label: "Active", value: "ACTIVE" },
  { label: "Under Legislation", value: "UNDER_LETIGATION" },
];
const SchemesSearchDetailsSM: React.FC = () => {
  const [selectedOption2, setSelectedOption2] = useState<string | null>(null);

  const [schemes, setSchemes] = useState<any[]>([]);
  const [selectedSchemes, setSelectedSchems] = useState<any[]>([])
  const [loader, setLoader] = useState(true);
  const screenWidth = useScreenWidth();
  const { onChange } =
    useContext(FormHandlerContext);
  const { setAllFormData, setAllDocumentData, allFormData } =
    useDepositTakerRegistrationStore((state) => state);
  const navigate = useNavigate();
  const location = useLocation();
  const uniqueId = location.state?.uniqueId;
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(2);

  const fetchSchema = async () => {
    try {
      setLoader(true)
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
            userInput: userData?.schemeFormData?.find((f: any) => f?.fieldId === field?.id)?.value,
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
              if (field?.key === 'depositTakerId') {
                return {
                  ...field, dropdown_options: {
                    ...field?.dropdown_options, options: field?.dropdown_options?.options?.map((o: any) => ({
                      name: o?.uniqueId,
                      id: o?.companyName,
                    }))
                  }
                }
              }
              else {
                return field;
              }
            })
          },
          fieldTypes: response?.data?.data?.fieldTypes,
          validations: response?.data?.data?.validations,
          fileTypes: response?.data?.data?.fileTypes,
          other: userData
        });
        console.log({userData});
      }

      
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.error("Error fetching schema data:", error);
    }
  };  

  useEffect(() => {
    if (allFormData?.other?.depositTakerId) {
      axios.get(`${bffUrl}/scheme-portal/scheme-by/${allFormData?.other?.depositTakerId}?page=1&limit=10000`)
      .then((res) => {
        let data = res?.data?.data;
        setSchemes(data?.map((d : any) => {
          return {
            label : d?.name,
            value : d?.uniqueId
          }
        }))
        console.log({data});
        
      })
      .catch((e) => {alert("Error fetching Schemes"); setSchemes([])})
    }
  }, [allFormData])
  
  useEffect(() => {
    if (uniqueId) {
      fetchSchema();
    }
  }, [uniqueId, page, pageSize]);

  const accordionItems: AccordionItem[] = [
    {
      header: "Scheme Details",
      content: <DynamicFields
        formFields={allFormData?.formFields?.form_fields}
        allFormData={allFormData}
        onChange={onChange}
      />,
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

  const handleSetOption1 = (value: any) => {
    if (
      schemes.length > 0 &&
      !selectedSchemes.find((f) => f.value === value.value)
    ) {
      const selected = schemes.find((f) => f.value === value.value);
      setSelectedSchems((prev) => [...prev, selected]);
    }
  };

  const remove = (data: any) => {
    const filtered = selectedSchemes.filter(
      (f) => f.value !== data.value
    );
    setSelectedSchems(filtered);
  };

  const handleUpdateSchemeStatus = (e : any) => {
    e?.preventDefault();
  }
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
        <div > 
          <label
            htmlFor="Select Other Schemes"
            className="text-base font-normal text-gilroy-medium"
          >
            Status
          </label>
          <SelectButton
            // backgroundColor="#F2F2F2"
            setOption={handleSetOption2}
            options={status}
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
          <SelectButtonMultiselect
                  setOption={handleSetOption1}
                  options={schemes}
                  placeholder="Select"
                  multiselect={true}
                  allSelectedOptions={selectedSchemes}
                  remove={remove}
                  className="relative"
                />
          {/* <SelectButton
            // backgroundColor="#F2F2F2"
            setOption={handleSetOption2}
            options={options2}
            selectedOption={selectedOption2}
            placeholder="Select"
            showSearchInput={true}
          /> */}
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
