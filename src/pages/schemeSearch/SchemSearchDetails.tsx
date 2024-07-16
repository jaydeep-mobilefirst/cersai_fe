import LanguageBar from "../../components/landingPage/LanguageBar";
import TopDetail from "../../components/landingPage/TopDetail";
import Navbar from "../../components/landingPage/Navbar";
import Footer from "../../components/landingPage/Footer";
import Accordion from "../../components/customAccordin/CustomAccordin";
import SchemeDetails from "../../components/schemeSearch/schemeDetails";

import EntityDetails from "../../components/schemeSearch/EntityDetails";
import CreatedBy from "../../components/schemeSearch/CreatedBy";
import { useScreenWidth } from "../../utils/screenSize";
import { useLocation, useNavigate } from "react-router-dom";
import DynamicFields from "../../components/userFlow/depositeTaker/DynamicFields";
import { useDepositTakerRegistrationStore } from "../../zust/deposit-taker-registration/registrationStore";
import { useEffect, useState } from "react";
import axios from "axios";
import { bffUrl } from "../../utils/api";
import AuditTrail from "../../components/ScehmaManagement/AuditTrail";
import LoaderSpin from "../../components/LoaderSpin";

interface AccordionItem {
  header: React.ReactNode;
  content: React.ReactNode;
}

const SchemeSearchDetails: React.FC = () => {
  const location = useLocation();
  const [entityDetailsFields, setEntityDetailsFields] = useState<any[]>([]);
  const [loader, setLoader] = useState(true);
  const [loader2, setLoader2] = useState(true);
  const [schemes, setSchemes] = useState<any[]>([]);

  const createdBy = location.state?.createdBy?.substring(0,2)  

  const uniqueId = location.state?.uniqueId;

  const depositTakerId = location.state?.depositTakerId;

  const { setAllFormData, setAllDocumentData, allFormData } =
  useDepositTakerRegistrationStore((state) => state);

  const screenWidth = useScreenWidth();
  const navigate = useNavigate();
  

  const fetchSchema = async () => {
    try {
      setLoader(true);
      const response = await axios.get(`${bffUrl}/scheme/field-data/${createdBy === 'DT' ? 1 : 2}`);
      // console.log(response, "response");
      if (response.data.success) {
        const portalResponse = await axios.get(
          `${bffUrl}/scheme-portal/${uniqueId}`
        );

        const userData = portalResponse.data?.data?.schemes[0];
        let formFields = response?.data?.data?.formFields?.allFormFields.map(
          async (field: any) => {
            if (field?.key === 'depositTakerId') {
              return {
                ...field,
                userInput: userData?.schemeFormData?.find(
                  (f: any) => f?.fieldId === field?.id
                )?.value,
                error: "",
                disabled : true,
                typeId: field?.fieldTypeId,
                dropdown_options: {
                  ...field?.dropdown_options, options: field?.dropdown_options?.options?.map((o: any) => ({
                    name: o?.uniqueId,
                    id: o?.companyName,
                  }))
                }
              }
            }
            else if (field?.key === 'branch') {
              try {
                const res = await axios.get(bffUrl + '/deposit-taker/branch/' + location.state.depositTakerId)
                let data = res.data;
                let branches = data?.data?.branches?.map((b: any) => {
                  return {
                    name: b?.pinCode + " " + b?.district + " " + b?.state,
                    id: b?.id
                  }
                })

                return {
                  ...field,
                  userInput: userData?.schemeFormData?.find(
                    (f: any) => f?.fieldId === field?.id
                  )?.value,
                  disabled : true,
                  error: "",
                  typeId: field?.fieldTypeId,
                  dropdown_options: { ...field?.dropdown_options, options: branches }
                };
              } catch (error) {
                return {
                  ...field,
                  disabled : true,
                  userInput: userData?.schemeFormData?.find(
                    (f: any) => f?.fieldId === field?.id
                  )?.value,
                  error: "",
                  typeId: field?.fieldTypeId,
                };
              }
            }
            else {
              return {
                ...field,
                disabled : true,
                userInput: userData?.schemeFormData?.find(
                  (f: any) => f?.fieldId === field?.id
                )?.value,
                error: "",
                typeId: field?.fieldTypeId,
              };
            }
          }
        )

        formFields = await Promise.all(formFields)

        setAllFormData({
          ...response?.data?.data,
          formFields: { form_fields: formFields },
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
  }, [uniqueId]);
  const fetchFormFields = () => {
    setLoader2(true)
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

          // let modifiedFileFields =
          //   response?.data?.data?.registrationDocumentFields?.map((o: any) => ({
          //     ...o,
          //     file: dtData
          //       ? dtData?.find((data: any) => data?.fieldId === o?.id)?.value
          //       : "",
          //     error: "",
          //     fileName: dtData
          //       ? dtData?.find((data: any) => data?.fieldId === o?.id)?.value
          //       : "",
          //     uploadFileId: dtData
          //       ? dtData?.find((data: any) => data?.fieldId === o?.id)?.value
          //       : "",
          //     disabled: true,
          //   }));

          // let obj = {
          //   ...response?.data?.data,
          //   formFields: { form_fields: modifiedFormFields },
          // };
          setEntityDetailsFields(modifiedFormFields);
          setLoader2(false)
          // setAllDocumentData(modifiedFileFields);
        } else {
          setLoader2(false)
          alert("Error getting data, Please try later!");
        }
      })
      .catch((error: any) => {
        console.log(error);
        setLoader2(true)
      });
  };

  useEffect(() => {
    if (allFormData?.other?.depositTakerId) {
      axios.get(`${bffUrl}/scheme-portal/scheme-by/${allFormData?.other?.depositTakerId}?page=1&limit=10000`)
      .then((res) => {
        let data = res?.data?.data;
        setSchemes(data?.map((d : any) => {
          return {
            label : d?.name,
            value : d?.uniqueId,
            status : d?.status
          }
        }))
      })
      .catch((e) => {alert("Error fetching Schemes"); setSchemes([])})
    }
  }, [allFormData])


  useEffect(() => {
    fetchFormFields();
  }, [depositTakerId]);


  const accordionItems: AccordionItem[] = [
    {
      header: "Scheme Details",
      content: (
        <>
      {loader ? <LoaderSpin/> :   <DynamicFields
          formFields={allFormData?.formFields?.form_fields}
          allFormData={allFormData}
          />}
          </>
      ),
    },
    {
      header: "Entity Details",
      content: (
        <>
        {loader2 ? <LoaderSpin/> : <DynamicFields
          formFields={entityDetailsFields}
          allFormData={entityDetailsFields}
          />}
          </>
      ),
    },
    {
      header: "Audit Trail",
      content: <AuditTrail />,
    },
  ];


  const onNavigateToBack = () => {
    navigate("/scheme-search");
  };
  return (
    <div className="flex flex-col min-h-screen">
      <LanguageBar />
      <TopDetail />
      <Navbar />
      <div className="mt-8 mb-8 mx-8">
        <Accordion items={accordionItems} />
      </div>

      {/* <div className="mb-8">
        <div
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
              onClick={onNavigateToBack}
              className="text-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#385723]"
            >
              Back
            </button>
          </div>
        </div>
        <div>
          <div className="border-[#E6E6E6] border-[1px] mt-4"></div>
        </div>
      </div> */}

      <div className="mt-[100px]">
        <Footer />
      </div>
    </div>
  );
};

export default SchemeSearchDetails;
