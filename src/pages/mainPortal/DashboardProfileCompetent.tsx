import React, { useEffect, useState } from "react";
import DashboardProfileSidebar from "../../components/userFlow/main-portal-competent/DashboardProfileSidebar";
import { useSearchParams } from "react-router-dom";

import ProfileResponsiveTabs from "../../components/userFlow/main-portal-competent/ProfileResponsiveTabs";
import ProfileNodalDetails from "./Edit-Profile-Regulator/ProfileNodalDetail";
import ProfileRegulatorDetails from "./Edit Profile/ProfileRegulatorDetails";
import ProfileUploadDocuments from "./Edit-Profile-Regulator/ProfileUploadDocuments";

import { useDepositTakerRegistrationStore } from "../../zust/deposit-taker-registration/registrationStore";
import axios from "axios";
import { backendBaseUrl, bffUrl } from "../../utils/api";
import DashboardProfileSidebarRegulator from "../../components/userFlow/mainPortal-Regulator/DashboardProfileSidebar";

import CompetentDetails from "./Edit-profile-competent/CompetentDetails";
import NodalDetails from "./Edit-profile-competent/NodalDetails";
import UploadDocument from "./Edit-profile-competent/UploadDocument";
import TaskTabsCompetent from "../../components/userFlow/main-portal-competent/TaskTabs";

type Props = {};

const DashboardProfileCompetent = (props: Props) => {
  const [loader, setLoader] = useState(false);
  const entityUniqueId = sessionStorage.getItem("entityUniqueId");

  const [searchParams, setSearchParams] = useSearchParams();
  const { setAllFormData, setAllDocumentData } =
    useDepositTakerRegistrationStore((state) => state);
  const fetchFormFields = () => {
    axios
      .get(`${bffUrl}/registration/field-data/1?status=addToProfile`)
      .then(async (response) => {
        if (response?.data?.success) {
          let dtData: any = [];
          try {
            let depositTakerData = await axios.get(
              `${bffUrl}/deposit-taker/${entityUniqueId}`
            );
            dtData =
              depositTakerData?.data?.data?.depositTaker?.depositTakerFormData;
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
              file: "",
              error: "",
              fileName: "",
            }));

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
          <DashboardProfileSidebar />
        </div>

        {current === "competent" && <CompetentDetails />}
        {current === "nodal" && <NodalDetails />}
        {current === "document" && <UploadDocument />}
      </div>
    </>
  );
};

export default DashboardProfileCompetent;
