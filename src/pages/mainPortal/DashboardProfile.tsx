import React, { useEffect, useState } from "react";
import DashboardProfileSidebar from "../../components/userFlow/mainPortal/DashboardProfileSidebar";
import { useSearchParams } from "react-router-dom";
import ProfileEntityDetails from "./Edit Profile/ProfileEntityDetails";
import TaskTabs from "../../components/userFlow/mainPortal/TaskTabs";
import ProfileResponsiveTabs from "../../components/userFlow/mainPortal/ProfileResponsiveTabs";
import ProfileNodalDetails from "./Edit Profile/ProfileNodalDetails";
import ProfileRegulatorDetails from "./Edit Profile/ProfileRegulatorDetails";
import ProfileUploadDocuments from "./Edit Profile/ProfileUploadDocuments";
import ProfileBranches from "./Edit Profile/ProfileBranches";
import { useDepositTakerRegistrationStore } from "../../zust/deposit-taker-registration/registrationStore";
import { axiosTokenInstance } from "../../utils/axios";

type Props = {};

const DashboardProfile = (props: Props) => {
  const [loader, setLoader] = useState(false);
  const entityUniqueId = sessionStorage.getItem("entityUniqueId");

  const [searchParams, setSearchParams] = useSearchParams();
  const { setAllFormData, setAllDocumentData } =
    useDepositTakerRegistrationStore((state) => state);
  const fetchFormFields = () => {
    axiosTokenInstance
      .get(`/registration/field-data/1?status=addToProfile`)
      .then(async (response) => {
        if (response?.data?.success) {
          let dtData: any = [];
          try {
            let depositTakerData = await axiosTokenInstance.get(
              `/deposit-taker/${entityUniqueId}`
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
        <TaskTabs />
      </div>
      <div className="flex flex-row">
        <div className="hidden lg:block">
          <DashboardProfileSidebar />
        </div>
        {current === "entity" && <ProfileEntityDetails />}
        {current === "nodal" && <ProfileNodalDetails />}
        {current === "regulator" && <ProfileRegulatorDetails />}
        {current === "documents" && <ProfileUploadDocuments />}
        {current === "branches" && <ProfileBranches />}
      </div>
    </>
  );
};

export default DashboardProfile;
