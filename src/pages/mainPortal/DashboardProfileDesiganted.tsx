import React, { useEffect, useState } from "react";

import DashboardProfileSidebar from "../../components/userFlow/main-portal-designated/DashboardProfileSidebar";
import { useSearchParams } from "react-router-dom";

import ProfileResponsiveTabs from "../../components/userFlow/main-portal-designated/ProfileResponsiveTabs";

import { useDepositTakerRegistrationStore } from "../../zust/deposit-taker-registration/registrationStore";
import axios from "axios";
import { bffUrl } from "../../utils/api";

import CourtDetails from "./Edit-profile-designatedCourt/CourtDetails";
import NodalDetails from "./Edit-profile-designatedCourt/NodalDetail";
import UploadDocument from "./Edit-profile-designatedCourt/UploadDocument";

import TaskTabsDesignated from "../../components/userFlow/main-portal-designated/TaskTabs";

type Props = {};

const DashboardProfileDesignateCourt = (props: Props) => {
  const [loader, setLoader] = useState(false);
  const entityUniqueId = sessionStorage.getItem("entityUniqueId");

  const [searchParams, setSearchParams] = useSearchParams();
  const { setAllFormData, setAllDocumentData } =
    useDepositTakerRegistrationStore((state) => state);
  const fetchFormFields = () => {
    axios
      .get(`${bffUrl}/registration/field-data/4?status=addToProfile`)
      .then(async (response) => {
        console.log(response?.data, "response");

        // if (response?.data?.success) {
        //   let dcData: any = [];
        //   try {
        //     let designatedCourt = await axios.get(
        //       `${bffUrl}/designated-court/${entityUniqueId}`
        //     );

        //     dcData =
        //       designatedCourt.data.data.designatedCourt
        //         ?.designatedCourtFormData;
        //   } catch (error) {
        //     console.log("Error");
        //   }

        //   let modifiedFormFields = response.data.data?.formFields?.map(
        //     (o: any) => ({
        //       ...o,
        //       userInput: dcData
        //         ? dcData?.find((data: any) => data?.fieldId === o?.id)?.value
        //         : "",
        //       error: "",
        //     })
        //   );

        //   let modifiedFileFields =
        //     response?.data?.data?.registrationDocumentFields?.map((o: any) => ({
        //       ...o,
        //       file: "",
        //       error: "",
        //       fileName: "",
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
          let dcData: any = [];
          try {
            let designatedCourt = await axios.get(
              `${bffUrl}/designated-court/${entityUniqueId}`
            );
            dcData =
              designatedCourt.data.data.designatedCourt
                ?.designatedCourtFormData;
          } catch (error) {
            console.log("Error");
          }
          // console.log(dtData, "respnse--------------");
          let modifiedFormFields = response.data.data?.formFields?.map(
            (o: any) => ({
              ...o,
              userInput: dcData
                ? dcData?.find((data: any) => data?.fieldId === o?.id)?.value
                : "",
              error: "",
            })
          )?.sort((a  :any, b : any) => a.sortOrder - b.sortOrder)


          let modifiedFileFields =
            response?.data?.data?.registrationDocumentFields?.map((o: any) => ({
              ...o,
              file: dcData
                ? dcData?.find((data: any) => data?.fieldId === o?.id)?.value
                : "",
              error: "",
              fileName: dcData
                ? dcData?.find((data: any) => data?.fieldId === o?.id)?.value
                : "",
              uploadFileId: dcData
                ? dcData?.find((data: any) => data?.fieldId === o?.id)?.value
                : "",
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
        <TaskTabsDesignated />
      </div>
      <div className="flex flex-row">
        <div className="hidden lg:block">
          <DashboardProfileSidebar />
        </div>

        {current === "court" && <CourtDetails />}
        {current === "nodal" && <NodalDetails />}
        {current === "document" && <UploadDocument />}
      </div>
    </>
  );
};

export default DashboardProfileDesignateCourt;
