import React, { useEffect, useState } from "react";
import { createColumnHelper } from "@tanstack/table-core";
import "./mytaskform.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { bffUrl } from "../../utils/api";
import { useDepositTakerRegistrationStore } from "../../store/registrationStore";
import { getMimeTypeFromArrayBuffer } from "../../utils/commonFunction";
import Swal from "sweetalert2";
import ReactTable from "../../components/userFlow/common/ReactTable";
import LanguageBar from "../../components/landingPage/LanguageBar";
import AboutBudsHeadingComp from "../../components/landingPage/AboutBudsHeadingComp";
import Footer from "../../components/landingPage/Footer";
type TableType = {
  sno: string;
  branchName: string;
  addressLine1: string;
  addressLine2: string;
  state: string;
  district: string;
};

const columnHelper = createColumnHelper<TableType>();

const DepositTakerSearchForm = () => {
  const defaultData: TableType[] = [
    {
      sno: "01",
      branchName: "DT001",
      addressLine1: "Deposit Taker 1",
      addressLine2: "Deposit Taker 2",
      state: "Ap",
      district: "Atp",
    },
    {
      sno: "02",
      branchName: "DT002",
      addressLine1: "Deposit Taker 2",
      addressLine2: "Deposit Taker 2",
      state: "Ap",
      district: "Atp",
    },
    {
      sno: "03",
      branchName: "DT002",
      addressLine1: "Deposit Taker 2",
      addressLine2: "Deposit Taker 2",
      state: "Ap",
      district: "Atp",
    },
    {
      sno: "04",
      branchName: "DT002",
      addressLine1: "Deposit Taker 2",
      addressLine2: "Deposit Taker 2",
      state: "Ap",
      district: "Atp",
    },
    {
      sno: "05",
      branchName: "DT002",
      addressLine1: "Deposit Taker 2",
      addressLine2: "Deposit Taker 2",
      state: "Ap",
      district: "Atp",
    },
    {
      sno: "06",
      branchName: "DT002",
      addressLine1: "Deposit Taker 2",
      addressLine2: "Deposit Taker 2",
      state: "Ap",
      district: "Atp",
    },
  ];

  const columns = [
    columnHelper.accessor("sno", {
      cell: (info) => info.renderValue(),
      header: () => <span>Sr. No.</span>,
    }),
    columnHelper.accessor("branchName", {
      cell: (info) => info.renderValue(),
      header: () => <span>branchName</span>,
    }),
    columnHelper.accessor("addressLine1", {
      cell: (info) => info.renderValue(),
      header: () => <span>Address Line 1</span>,
    }),
    columnHelper.accessor("addressLine2", {
      cell: (info) => info.renderValue(),
      header: () => <span>Address Line 2</span>,
    }),
    columnHelper.accessor("state", {
      cell: (info) => info.renderValue(),
      header: () => <span>State</span>,
    }),
    columnHelper.accessor("district", {
      cell: (info) => info.renderValue(),
      header: () => <span>District</span>,
    }),
  ];
  const location = useLocation();
  const [loader, setLoader] = useState<boolean>(false);
  const competentId = location.state?.competentId;
  const { setAllFormData, setAllDocumentData, allFormData, documentData } =
    useDepositTakerRegistrationStore((state) => state);
  const approverRelation =
    location.state?.approverRelation?.firstName +
    " " +
    location.state?.approverRelation?.lastName;
  const status = location?.state?.status;
  const approveTimeStamp = location?.state?.approveTimeStamp;

  const fetchFormFields = () => {
    axios
      .get(`${bffUrl}/registration/field-data/3?status=addToProfile`)
      .then(async (response) => {
        if (response?.data?.success) {
          let dtData: any = [];
          try {
            let depositTakerData = await axios.get(
              `${bffUrl}/competent-authority/${competentId}`
            );
            dtData =
              depositTakerData?.data?.data?.competentAuthority
                ?.competentAuthorityData;
          } catch (error) {
            console.log("Error");
          }
          // console.log(dtData, "respnse--------------");
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
          console.log({ modifiedFileFields });

          let obj = {
            ...response?.data?.data,
            formFields: { form_fields: modifiedFormFields },
          };
          // console.log(obj, "obj-----");
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

  useEffect(() => {
    fetchFormFields();
  }, []);

  const getFileDatafromBuffer = async (arrayBuffer: any) => {
    const buffer = new Uint8Array(arrayBuffer);
    const type = await getMimeTypeFromArrayBuffer(buffer);
    const blob = new Blob([buffer], { type: type ?? "" });
    const imageUrl = URL.createObjectURL(blob);
    window.open(imageUrl, "_blank", "noopener");
  };

  const handleOnClikcView = async (uploadFileId: any) => {
    try {
      setLoader(true);
      const response = await axios.get(`${bffUrl}/openkm/get/${uploadFileId}`);
      const data = await response.data;
      if (data?.status === "INTERNAL_SERVER_ERROR") {
        Swal.fire({
          icon: "error",
          title: "Internal Server Error",
          text: "Unable to Open File",
        });
        setLoader(false);
        return;
      }
      const arrayBuffer = data?.data?.data;

      await getFileDatafromBuffer(arrayBuffer);
      // console.log({buffer, type, blob, url});
      // setViewLoader(false);
    } catch (error) {
      console.log({ error });
      // setViewLoader(false);
    }
  };

  const section1 = [
    {
      title: "Verification Status",
      buttonText: "Success",
      fieldsLeft: [{ label: " Name", value: "Lorem ipsum" }],
      fieldsRight: [{ label: "PAN Details", value: "Lorem ipsum" }],
    },
  ];
  const section2 = [
    {
      title: "Entity Details",
      buttonText: "",
      fieldsLeft: [
        { label: "Name of Deposit Taker", value: "Lorem ipsum" },
        { label: "Type of Entity", value: "Lorem ipsum" },
        { label: "Address Line 1", value: "Lorem ipsum" },
        { label: "Address Line 2", value: "Lorem ipsum" },
      ],
      fieldsRight: [
        { label: "Unique Registration ID", value: "Lorem ipsum" },
        { label: "PIN code", value: "Lorem ipsum" },
        { label: "State", value: "Lorem ipsum" },
        { label: "District", value: "Lorem ipsum" },
      ],
    },
  ];
  const section3 = [
    {
      title: "Nodal Details",
      buttonText: "Edit",
      fieldsLeft: [
        { label: "Nodal Officer Name", value: "Lorem ipsum" },
        { label: "Nodal Officer Email", value: "Lorem ipsum" },
      ],
      fieldsRight: [
        { label: "Nodal Officer Name", value: "Lorem ipsum" },
        { label: "Nodal Officer Designation", value: "Lorem ipsum" },
      ],
    },
  ];
  const section4 = [
    {
      title: "Regulator Details",
      buttonText: "",
      fieldsLeft: [
        { label: "Regulator Name", value: "Lorem ipsum" },
        { label: "Registration Approval Date", value: "Lorem ipsum" },
      ],
      fieldsRight: [
        { label: "Regulator Registered Number", value: "Lorem ipsum" },
      ],
    },
  ];
  const [authorityModel, setAuthorityModel] = useState<boolean>(false);

  const [referModel, setRefererModel] = useState<boolean>(false);
  const [approveModel, setApproveModel] = useState<boolean>(false);
  const [returnModel, setReturnModel] = useState<boolean>(false);
  const [rejectModel, setRejectModel] = useState<boolean>(false);
  const handleRefer = () => {
    setRefererModel(true);
  };
  const handleReturn = () => {
    setReturnModel(true);
  };
  const handleApproveModel = () => {
    setApproveModel(true);
  };
  const handleRejectModel = () => {
    setRejectModel(true);
  };

  const CloseReferModel = () => {
    setRefererModel(false);
  };
  const CloseApproveModel = () => {
    setApproveModel(false);
  };

  const CloseReturnModel = () => {
    setReturnModel(false);
  };
  const CloseRejectModel = () => {
    setRejectModel(false);
  };

  const handlerauthority = () => {
    setAuthorityModel(true);
  };

  const CloseAuthorityMode = () => {
    setAuthorityModel(false);
  };

  const navigate = useNavigate();

  return (
    <div>
      <div className="relative mx-4 xl:ml-[40px]">
        <div>
          <>
            <div className="container mx-auto">
              <div id="reviewContent">
                {section1.map((section, index) => (
                  <div className="mb-[16px]" key={index}>
                    <div className="rounded-t-lg bg-[#e7f0ff] flex justify-between h-[57px] text-gilroy-bold">
                      <p className="lg:w-[152px] ml-[16px] mt-[16px] text-[16px] lg:text-[20px] pb-2 text-nowrap">
                        {section.title}
                      </p>
                      <button className="text-[#1C468E] text-[16px] lg:text-[20px] mr-[13px] font-normal ">
                        {section.buttonText}
                      </button>
                    </div>

                    <div className="shadow-sm p-5 rounded-md">
                      <div className="flex flex-col justify-between w-full sm:flex-row gap-y-4">
                        <div className="  w-full  sm:w-1/2 sm:border-r-2 border-r-[#1C468E] border-opacity-20 grid gap-y-4 pr-12">
                          {section.fieldsLeft.map((field, idx) => (
                            <div className=" flex justify-between " key={idx}>
                              <div className="opacity-60">{field.label}</div>
                              <div className="-mr-12 sm:-mr-0 lg:-mr-0 xl:-mr-0">
                                {field.value}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className=" w-full  sm:w-1/2 lg:pl-5  xl:pl-5 md:pl-5 sm:pl-2 rid gap-y-4 pr-12">
                          {section.fieldsRight.map((field, idx) => (
                            <div className=" flex justify-between" key={idx}>
                              <div className="opacity-60">{field.label}</div>
                              <div className="-mr-12 sm:-mr-0 lg:-mr-0 xl:-mr-0">
                                {field.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div id="reviewContent">
                <h1 className=" text-gilroy-bold text-[#24222B] text-2xl font-bold  my-7"></h1>
                {section2.map((section, index) => (
                  <div className="mb-[16px]" key={index}>
                    <div className="rounded-t-lg bg-[#e7f0ff] flex justify-between h-[57px] text-gilroy-bold">
                      <p className="lg:w-[152px] ml-[16px] mt-[16px] text-[16px] lg:text-[20px] pb-2 text-nowrap">
                        {section.title}
                      </p>
                      <button className="text-[#1C468E] text-[16px] lg:text-[20px] mr-[13px] font-normal ">
                        {section.buttonText}
                      </button>
                    </div>

                    <div className="shadow-sm p-5 rounded-md">
                      <div className="flex flex-col justify-between w-full sm:flex-row gap-y-4">
                        <div className="  w-full  sm:w-1/2 sm:border-r-2 border-r-[#1C468E] border-opacity-20 grid gap-y-4 pr-12">
                          {section.fieldsLeft.map((field, idx) => (
                            <div className=" flex justify-between " key={idx}>
                              <div className="opacity-60">{field.label}</div>
                              <div className="-mr-12 sm:-mr-0 lg:-mr-0 xl:-mr-0">
                                {field.value}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className=" w-full  sm:w-1/2 lg:pl-5  xl:pl-5 md:pl-5 sm:pl-2 grid gap-y-4 pr-12">
                          {section.fieldsRight.map((field, idx) => (
                            <div className=" flex justify-between" key={idx}>
                              <div className="opacity-60">{field.label}</div>
                              <div className="-mr-12 sm:-mr-0 lg:-mr-0 xl:-mr-0">
                                {field.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>{" "}
              <div id="reviewContent">
                <h1 className=" text-gilroy-bold text-[#24222B] text-2xl font-bold  my-7"></h1>
                {section3.map((section, index) => (
                  <div className="mb-[16px]" key={index}>
                    <div className="rounded-t-lg bg-[#e7f0ff] flex justify-between h-[57px] text-gilroy-bold">
                      <p className="lg:w-[152px] ml-[16px] mt-[16px] text-[16px] lg:text-[20px] pb-2 text-nowrap">
                        {section.title}
                      </p>
                      <button className="text-[#1C468E] text-[16px] lg:text-[20px] mr-[13px] font-normal ">
                        {section.buttonText}
                      </button>
                    </div>

                    <div className="shadow-sm p-5 rounded-md">
                      <div className="flex flex-col justify-between w-full sm:flex-row gap-y-4">
                        <div className="  w-full  sm:w-1/2 sm:border-r-2 border-r-[#1C468E] border-opacity-20 grid gap-y-4 pr-12">
                          {section.fieldsLeft.map((field, idx) => (
                            <div className=" flex justify-between " key={idx}>
                              <div className="opacity-60">{field.label}</div>
                              <div className="-mr-12 sm:-mr-0 lg:-mr-0 xl:-mr-0">
                                {field.value}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className=" w-full  sm:w-1/2 lg:pl-5  xl:pl-5 md:pl-5 sm:pl-2 grid gap-y-4 pr-12">
                          {section.fieldsRight.map((field, idx) => (
                            <div className=" flex justify-between" key={idx}>
                              <div className="opacity-60">{field.label}</div>
                              <div className="-mr-12 sm:-mr-0 lg:-mr-0 xl:-mr-0">
                                {field.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>{" "}
              <div id="reviewContent">
                <h1 className=" text-gilroy-bold text-[#24222B] text-2xl font-bold  my-7"></h1>
                {section4.map((section, index) => (
                  <div className="mb-[16px]" key={index}>
                    <div className="rounded-t-lg bg-[#e7f0ff] flex justify-between h-[57px] text-gilroy-bold">
                      <p className="lg:w-[152px] ml-[16px] mt-[16px] text-[16px] lg:text-[20px] pb-2 text-nowrap">
                        {section.title}
                      </p>
                      <button className="text-[#1C468E] text-[16px] lg:text-[20px] mr-[13px] font-normal ">
                        {section.buttonText}
                      </button>
                    </div>

                    <div className="shadow-sm p-5 rounded-md">
                      <div className="flex flex-col justify-between w-full sm:flex-row gap-y-4">
                        <div className="  w-full  sm:w-1/2 sm:border-r-2 border-r-[#1C468E] border-opacity-20 grid gap-y-4 pr-12">
                          {section.fieldsLeft.map((field, idx) => (
                            <div className=" flex justify-between " key={idx}>
                              <div className="opacity-60">{field.label}</div>
                              <div className="-mr-12 sm:-mr-0 lg:-mr-0 xl:-mr-0">
                                {field.value}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className=" w-full  sm:w-1/2 lg:pl-5  xl:pl-5 md:pl-5 sm:pl-5 grid gap-y-4 pr-12">
                          {section.fieldsRight.map((field, idx) => (
                            <div className=" flex justify-between" key={idx}>
                              <div className="opacity-60">{field.label}</div>
                              <div className="-mr-12 sm:-mr-0 lg:-mr-0 xl:-mr-0">
                                {field.value}
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
                <div className="rounded-t-lg bg-[#e7f0ff] flex justify-between h-[57px] font-bold mb-4">
                  <p className="lg:w-[152px] ml-[16px] mt-[16px] text-[16px] lg:text-[20px] pb-2 text-nowrap">
                    Branches
                  </p>
                </div>
                <div className="w-full overflow-x-auto ">
                  <div className="p-5">
                    <div className="h-32">
                      <ReactTable defaultData={defaultData} columns={columns} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default DepositTakerSearchForm;