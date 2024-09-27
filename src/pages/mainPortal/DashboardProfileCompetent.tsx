import React, { useEffect, useState } from "react";
import DashboardProfileSidebar from "../../components/userFlow/main-portal-competent/DashboardProfileSidebar";
import { useSearchParams } from "react-router-dom";

import ProfileResponsiveTabs from "../../components/userFlow/main-portal-competent/ProfileResponsiveTabs";
import ProfileNodalDetails from "./Edit-Profile-Regulator/ProfileNodalDetail";
import ProfileRegulatorDetails from "./Edit Profile/ProfileRegulatorDetails";
import ProfileUploadDocuments from "./Edit-Profile-Regulator/ProfileUploadDocuments";

import { useDepositTakerRegistrationStore } from "../../zust/deposit-taker-registration/registrationStore";

import DashboardProfileSidebarRegulator from "../../components/userFlow/mainPortal-Regulator/DashboardProfileSidebar";

import CompetentDetails from "./Edit-profile-competent/CompetentDetails";
import NodalDetails from "./Edit-profile-competent/NodalDetails";
import UploadDocument from "./Edit-profile-competent/UploadDocument";
import TaskTabsCompetent from "../../components/userFlow/main-portal-competent/TaskTabs";
import { axiosTokenInstance } from "../../utils/axios";

type Props = {};

const DashboardProfileCompetent = (props: Props) => {
  const [loader, setLoader] = useState(false);
  const entityUniqueId = sessionStorage.getItem("entityUniqueId");

  const [searchParams, setSearchParams] = useSearchParams();
  const { setAllFormData, setAllDocumentData } =
    useDepositTakerRegistrationStore((state) => state);
  const fetchFormFields = () => {
    setLoader(true)
    axiosTokenInstance
      .get(`/registration/field-data/3?status=addToProfile`)
      .then(async (response) => {
        // if (response?.data?.success) {
        //   let dtData: any = [];
        //   try {
        //     let competentData = await     axiosTokenInstance.get(
        //       `/competent-authority/${entityUniqueId}`
        //     );
        //     // console.log(
        //     //   competentData?.data?.data?.competentAuthority
        //     //     ?.competentAuthorityData,
        //     //   "data"
        //     // );
        //     dtData =
        //       competentData?.data?.data?.competentAuthority
        //         ?.competentAuthorityData;
        //   } catch (error) {
        //     console.log("Error");
        //   }
        //   let modifiedFormFields = response.data.data?.formFields?.map(
        //     (o: any) => ({
        //       ...o,
        //       userInput: dtData
        //         ? dtData?.find((data: any) => data?.fieldId === o?.id)?.value
        //         : "",
        //       error: "",
        //     })
        //   );

        //   let modifiedFileFields =
        //     response?.data?.data?.registrationDocumentFields?.map((o: any) => ({
        //       ...o,
        //       file: dtData
        //         ? dtData?.find((data: any) => data?.fieldId === o?.id)?.value
        //         : "",
        //       error: "",
        //       fileName: dtData
        //         ? dtData?.find((data: any) => data?.fieldId === o?.id)?.value
        //         : "",
        //       uploadFileId: dtData
        //         ? dtData?.find((data: any) => data?.fieldId === o?.id)?.value
        //         : "",
        //     }));

        //   let obj = {
        //     ...response?.data?.data,
        //     formFields: { form_fields: modifiedFormFields },
        //   };
        //   setAllFormData(obj);
        //   setAllDocumentData(modifiedFileFields);
        // } else {
        //   throw new Error("Error getting data, Please try later!");
        // }
        if (response?.data?.success) {
          setLoader(false)
          let dtData: any = [];
          try {
            let depositTakerData = await axiosTokenInstance.get(
              `/competent-authority/${entityUniqueId}`
            );
            dtData =
              depositTakerData?.data?.data?.competentAuthority
                ?.competentAuthorityData;
          } catch (error) {
            setLoader(false)
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
            response?.data?.data?.registrationDocumentFields
              ?.map((o: any) => ({
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
              }))
              ?.sort((a: any, b: any) => a.sortOrder - b.sortOrder);

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
        <TaskTabsCompetent />
      </div>
      <div className="flex flex-row">
        <div className="hidden lg:block">
          <DashboardProfileSidebar fetchFormFields={fetchFormFields} />
        </div>

        {current === "competent" && <CompetentDetails />}
        {current === "document" && <UploadDocument />}

        {current === "nodal" && <NodalDetails />}
      </div>
    </>
  );
};

export default DashboardProfileCompetent;
