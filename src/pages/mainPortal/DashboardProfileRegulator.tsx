import React, { useEffect, useState } from "react";
import DashboardProfileSidebar from "../../components/userFlow/mainPortal/DashboardProfileSidebar";
import { useSearchParams } from "react-router-dom";

import ProfileResponsiveTabs from "../../components/userFlow/mainPortal-Regulator/ProfileResponsiveTabs";
import ProfileNodalDetails from "./Edit-Profile-Regulator/ProfileNodalDetail";
// import ProfileRegulatorDetails from "./Edit Profile/ProfileRegulatorDetails";
import ProfileRegulatorDetails from "./Edit-Profile-Regulator/ProfileRegulatorDetail";
import ProfileUploadDocuments from "./Edit-Profile-Regulator/ProfileUploadDocuments";

import { useDepositTakerRegistrationStore } from "../../zust/deposit-taker-registration/registrationStore";
import DashboardProfileSidebarRegulator from "../../components/userFlow/mainPortal-Regulator/DashboardProfileSidebar";
import TaskTabsRegulator from "../../components/userFlow/mainPortal-Regulator/TaskTabsRegulator";
import { axiosTokenInstance } from "../../utils/axios";

type Props = {};

const DashboardProfileRegulator = (props: Props) => {
  const [loader, setLoader] = useState(false);
  const entityUniqueId = sessionStorage.getItem("entityUniqueId");

  const [searchParams, setSearchParams] = useSearchParams();
  const { setAllFormData, setAllDocumentData } =
    useDepositTakerRegistrationStore((state) => state);
  const fetchFormFields = () => {
    axiosTokenInstance
      .get(`/registration/field-data/2?status=addToProfile`)
      .then(async (response) => {
        if (response?.data?.success) {
          let dtData: any = [];
          try {
            let regulatorData = await axiosTokenInstance.get(
              `/regulator/${entityUniqueId}`
            );
            dtData = dtData =
              regulatorData?.data?.data?.regulator?.regulatorFormData;
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

  useEffect(() => {
    fetchFormFields();
  }, []);
  const current = searchParams.get("current");
  return (
    <>
      <div className="lg:hidden mt-4">
        <ProfileResponsiveTabs />
      </div>
      <div className="mt-6 mx-6">
        <TaskTabsRegulator />
      </div>
      <div className="flex flex-row">
        <div className="hidden lg:block">
          <DashboardProfileSidebarRegulator fetchFormFields={fetchFormFields} />
        </div>

        {current === "regulator" && <ProfileRegulatorDetails />}
        {current === "nodal" && <ProfileNodalDetails />}
        {current === "document" && <ProfileUploadDocuments />}
      </div>
    </>
  );
};

export default DashboardProfileRegulator;
