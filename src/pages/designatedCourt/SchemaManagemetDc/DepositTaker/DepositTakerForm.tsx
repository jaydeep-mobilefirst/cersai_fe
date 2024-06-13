import React, { useEffect, useState } from "react";
import TaskTabsDc from "../../../../components/ScehmaManagement/TaskTabsDc";
import "./DepositTakerForm.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { bffUrl } from "../../../../utils/api";
import { useDepositTakerRegistrationStore } from "../../../../store/registrationStore";
import { getMimeTypeFromArrayBuffer } from "../../../../utils/commonFunction";
import Swal from "sweetalert2";
import { useScreenWidth } from "../../../../utils/screenSize";

const DepositTakerForm = () => {
  const navigate = useNavigate();
  const screenWidth = useScreenWidth();

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
      buttonText: "Edit",
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
      buttonText: "Edit",
      fieldsLeft: [
        { label: "Regulator Name", value: "Lorem ipsum" },
        { label: "Registration Approval Date", value: "Lorem ipsum" },
      ],
      fieldsRight: [
        { label: "Regulator Registered Number", value: "Lorem ipsum" },
      ],
    },
  ];

  const handleBackButtonClick = () => {
    navigate("/dc/deposit-taker");
  };
  return (
    <div>
      <div className="relative mx-4 xl:ml-[40px]">
        <div className="mt-6 mb-6">
          <TaskTabsDc />
        </div>
        <div>
          <>
            <div className="container mx-auto">
              <div id="reviewContent">
                {section1.map((section, index) => (
                  <div className="mb-[16px]" key={index}>
                    <div className="rounded-t-lg bg-[#e7f0ff] flex justify-between h-[57px] text-gilroy-bold">
                      <p className="lg:w-[152px] ml-[16px] mt-[16px] text-[16px] lg:text-[20px] pb-2 text-nowrap ">
                        {section.title}
                      </p>
                      <button className="text-[#1C468E] text-[16px] lg:text-[20px] mr-[13px] font-bold text-gilroy-bold ">
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
                      <button className="text-[#1C468E] text-[16px] lg:text-[20px] mr-[13px] font-bold text-gilroy-bold ">
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
                      <button className="text-[#1C468E] text-[16px] lg:text-[20px] mr-[13px] font-bold text-gilroy-bold">
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
                      <button className="text-[#1C468E] text-[16px] lg:text-[20px] mr-[13px] font-bold text-gilroy-bold ">
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
            </div>

            <div>
              <div
                className="flex w-full p-4 lg:px-[30px] flex-row justify-between items-center "
                style={{
                  width: `${
                    screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"
                  }`,
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
              </div>
              <div>
                <div className="border-[#E6E6E6] border-[1px] lg:mt-4"></div>

                <p className="mb-[24px] text-gilroy-light text-center text-[#24222B] text-xs cursor-pointer mt-4">
                  © 2024 Protean BUDs, All Rights Reserved.
                </p>
              </div>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default DepositTakerForm;
