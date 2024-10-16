import LanguageBar from "../../components/landingPage/LanguageBar";
import TopDetail from "../../components/landingPage/TopDetail";
import Navbar from "../../components/landingPage/Navbar";
import Footer from "../../components/landingPage/Footer";
import Accordion from "../../components/customAccordin/CustomAccordin";
import SchemeDetails from "../../components/depositTakerSearch/DeposittakerSearchForm";
import Eye from "../../assets/images/eye2.svg";

import AuditTrail from "../../components/depositTakerSearch/AuditTrailDepositSearch";

import { useScreenWidth } from "../../utils/screenSize";
import { useLocation, useNavigate } from "react-router-dom";
import { useDepositTakerRegistrationStore } from "../../zust/deposit-taker-registration/registrationStore";
import { useEffect, useState } from "react";
import LoaderSpin from "../../components/LoaderSpin";
import { createColumnHelper } from "@tanstack/table-core";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import ReactTable from "../../components/userFlow/common/ReactTable";
import { axiosTraceIdInstance } from "../../utils/axios";
import { useLandingStore } from "../../zust/useLandingStore";
import { useLangugaeStore } from "../../zust/useLanguageUsStore";
import MangementDetails from "./ManagementDetails";
interface AccordionItem {
  header: React.ReactNode;
  content: React.ReactNode;
}

type SchemeType = {
  id: number;
  uniqueId: string;
  name: string;
  depositTakerId: string;
  // createdBy: string;
  createdBy: string | null;
  status: string;
  active: boolean;
  depositTakerName:string;
  createdByName: string;
};

const columnHelper = createColumnHelper<SchemeType>();

const DepositSearchDetails: React.FC = () => {
  const navigate = useNavigate();
  const screenWidth = useScreenWidth();
  const location = useLocation();
  const { setAllFormData, allFormData, documentData, setAllDocumentData } =
    useDepositTakerRegistrationStore((state) => state);
  const [loader, setLoader] = useState<boolean>(false);
  const depositTakerId = location.state?.depositTakerId;

  const nodalOfficerId = location.state.nodalOfficerId;
  const { homePageData, setHomePageData } = useLandingStore((state) => state);
  const { language } = useLangugaeStore((state) => state);

  useEffect(() => {
    homePageCmsApi();
  }, [language]);

  const homePageCmsApi = () => {
    setLoader(true);
    // setHomePageData(data.data.content)
    axiosTraceIdInstance
      .get(`/websitecontent/get/name?wcname=home`, {
        headers: {
          "Accept-Language": language,
        },
      })
      .then((response) => {
        console.log("api-response", response);
        setHomePageData(response?.data?.data?.content?.updatedStructure);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  };

  // Scheme 
  const columns = [
    // columnHelper.accessor("id", {
    //   cell: (info: any) => info.renderValue(),
    //   header: () => <span>Sr. No.</span>,
    // }),
    columnHelper.accessor("id", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>Sr. No.</span>,
    }),
    columnHelper.accessor("uniqueId", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>Scheme ID</span>,
    }),
    columnHelper.accessor("name", {
      cell: (info: any) => info.renderValue(),
      header: () => <span>Scheme Name</span>,
    }),

    columnHelper.accessor("status", {
      cell: (info: any) => {
        const value = info?.getValue();
        const updatedValue =
          value === "UNDER_LETIGATION" ? "UNDER LITIGATION" : value?.replace(/_/g, " ");

        return (
          <div
            className="flex flex-col md:flex-row justify-center gap-3"
            key={Math.random()}
          >
            <span className="text-sm">{updatedValue}</span>
          </div>
        );
      },
      header: () => <span>Status</span>,
    }),
    columnHelper.accessor("depositTakerName", {
      cell: (info: any) => (info.renderValue() ? info.renderValue() : "N/A"),
      header: () => <span>Deposit Taker Name</span>,
    }),

    columnHelper.accessor("createdByName", {
      cell: (info: any) => (info.renderValue() ? info.renderValue() : "N/A"),
      header: () => <span>Created By</span>,
    }),
    columnHelper.accessor((row: any) => row, {
      id: "action",
      cell: (info) => {
        let createdBy = info?.cell?.row?.original?.createdBy;
        const NavigateScheme = (uniqueId: any, depositTakerId: any) => {
          navigate("/scheme-search-details", {
            state: {
              uniqueId: uniqueId,
              depositTakerId: depositTakerId,
              createdBy
            },
          });
        };
        const uniqueId = info?.row?.original?.uniqueId;
        const depositTakerId = info?.row?.original?.depositTakerId;
        console.log("display", info?.row?.original);
        return (
          <div className="flex justify-center items-center ">
            {/* <Link to={"/dt/schema/creation"}> */}
            <div onClick={() => NavigateScheme(uniqueId, depositTakerId)}>
              <img src={Eye} alt="Eye " className="cursor-pointer" />
            </div>
            {/* </Link> */}
          </div>
        );
      },
      header: () => <span>View</span>,
    }),
  ];
  const [schemaData, setSchemaData] = useState([]);

  const [loader2, setLoader2] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);

  const [pageSize, setPageSize] = useState<number>(10);

  const [total, setTotal] = useState<number>(0);
  const fetchFormFields = () => {
    setLoader(true);
    axiosTraceIdInstance
      .get(`/registration/field-data/1?status=addToProfile`)
      .then(async (response) => {
        if (response?.data?.success) {
          let dtData: any = [];
          try {
            let depositTakerData = await axiosTraceIdInstance.get(
              `/deposit-taker/${depositTakerId}`
            );

            dtData =
              depositTakerData?.data?.data?.depositTaker?.depositTakerFormData;
          } catch (error) {
            console.log("Error");
          }
          let modifiedFormFields = response.data.data?.formFields?.map(
            (o: any) => ({
              ...o,
              userInput: dtData
                ? dtData?.find((data: any) => data?.fieldId === o?.id)?.value
                : "",
              error: "",
            })
          );

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
            }));

          let obj = {
            ...response?.data?.data,
            formFields: { form_fields: modifiedFormFields },
          };
          setAllFormData(obj);
          setAllDocumentData(modifiedFileFields);
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

  const fetchSchemes = async () => {
    setLoader2(true);
    try {
      const { data } = await axiosTraceIdInstance.get(`/scheme-portal/scheme-by/${depositTakerId}`, {
        params: {
          page: page,
          limit: pageSize,
          status:'ALL'
        },
      });
      let currentPage = (parseInt(data?.page) - 1 ) * pageSize
      setSchemaData(data?.data?.map((d : any, i: number) => ({...d, id : (i + 1) + currentPage})));
      setTotal(data?.totalCount);
      setLoader2(false);
      setPage(parseInt(data?.page))
    } catch (error) {
      console.error("Error fetching schemes:", error);
      setLoader2(false);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, [page, pageSize, depositTakerId]);

  useEffect(() => {
    fetchFormFields();
  }, []);

  // -------------------------------------------------------------------------------------------------------------

  const accordionItems: AccordionItem[] = [
    {
      header: <h1 className="font-bold text-xl">Scheme Details</h1>,
      content: <>
               <div className="h-screen md:h-auto sm:h-auto overflow-x-hidden overflow-y-auto">
          <div className="">
          {loader2 ? (
              <LoaderSpin />
            ) : schemaData?.length > 0 ? (
              <ReactTable defaultData={schemaData} columns={columns} />
            ) : (
              <div className=" flex justify-center items-center">
                <h1>No data available</h1>
              </div>
            )}
          </div>
          <div className="mt-10">
          {schemaData?.length > 0 && (
              <CustomPagination
                currentPage={page}
                setCurrentPage={setPage}
                totalItems={total}
                itemsPerPage={10}
                maxPageNumbersToShow={5}
              />
          )}
          </div>
        </div>
      </>,
    },
    {
      header: "Management Details",
      content: <MangementDetails />,
    },

  ];

  const onNavigateToBack = () => {
    navigate("/deposite-taker-search");
  };

  function maskLastFiveDigits(mobile: string): string {
    if (mobile.length < 5) {
      return mobile;
    }
    return mobile.slice(0, -5) + '*****';
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <LanguageBar />
      <TopDetail />
      <Navbar />
      <div className="mt-8 mb-5">
        <div className="relative mx-4 xl:ml-[40px]">
          <div>
            <>
              <div className="container mx-auto">
                <div id="reviewContent">
                  <h1 className=" text-gilroy-bold text-[#24222B] text-2xl font-bold  my-7"></h1>
                  {loader ? <LoaderSpin/> : allFormData?.entitySections
                    ?.filter(
                      (s: any) => s?.sectionName !== "Upload Documents"
                    )
                    ?.map((section: any, index: number) => (
                      <div className="mb-[16px] " key={index}>
                        <div className="rounded-t-lg bg-[#e7f0ff] flex justify-between h-[57px] font-bold">
                          <p className="lg:w-[152px] ml-[16px] mt-[16px] text-[16px] lg:text-[20px] pb-2 text-nowrap">
                            {section?.sectionName}
                          </p>

                        </div>
                        <div className="shadow-sm p-5 rounded-md">
                          <div className="flex flex-col justify-between w-full sm:flex-row gap-y-[16px]">
                            <div className="w-full grid grid-cols-2">
                              {allFormData?.formFields?.form_fields
                                ?.filter(
                                  (f: any) =>
                                    f?.sectionId === section?.id
                                )
                                ?.map((field: any, idx: number) => (
                                  <div
                                    className={`${idx % 2 === 0
                                        ? "pr-4 pt-2 sm:border-r-[0.5px] border-r-[#385723] border-opacity-20"
                                        : "pl-4 pt-2"
                                      } flex justify-between`}
                                    key={idx}
                                  >
                                    <div className="opacity-60">
                                      {field.label}
                                    </div>
                                    <div className="break-all">
                                      {field.label ===
                                        "DSC3 Certificate"
                                        ? "DSC Certification Approved"
                                        : field.label === "Nodal Officer Mobile Number" ? maskLastFiveDigits(field.userInput) : field.userInput}
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="mb-[16px] shadow-sm  rounded-md">
                  <div>
                    <div className="mt-5">
                      <Accordion items={accordionItems} showEdit={false} />
                    </div>
                  </div>
                  {/* <div className="w-full overflow-x-auto ">
                  <div className="p-5">
                    <div className="h-32">
                      <ReactTable defaultData={defaultData} columns={columns} />
                    </div>
                  </div>
                </div> */}
                </div>
              </div>
            </>
          </div>
        </div>
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

export default DepositSearchDetails;
