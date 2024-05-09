import React, { useContext } from "react";
import ProfileUploadDocument from "../../../components/userFlow/form/ProfileUploadDocument";
import Footer from "../../../components/userFlow/userProfile/Footer";
import { useScreenWidth } from "../../../utils/screenSize";
import { useDepositTakerRegistrationStore } from "../../../zust/deposit-taker-registration/registrationStore";
import { FormHandlerContext } from "../../../contextAPI/useFormFieldHandlers";

type Props = {};

const ProfileUploadDocuments = (props: Props) => {
  const screenWidth = useScreenWidth();
  const { allFormData } = useDepositTakerRegistrationStore((state) => state);
  const { onChange, handleValidationChecks, updatePanFormField } =
    useContext(FormHandlerContext);
  console.log(allFormData?.registrationDocumentFields, "allformat");

  // const entityDetailsSectionId = allFormData?.entitySections?.find(
  //   (s: any) => s?.sectionName === "Entity Details"
  // );

  return (
    <>
      <div
        className="bg-white w-full flex flex-col justify-between"
        style={{
          height: `${screenWidth > 1024 ? "calc(100vh - 155px)" : "100%"}`,
        }}
      >
        <div className="p-6 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-5 space-y-0">
          {allFormData &&
            allFormData?.registrationDocumentFields.map((item: any) => {
              return (
                <div key={item.id}>
                  <ProfileUploadDocument
                    documentName={item.documentName}
                    id="Dsc"
                    type="button"
                    deleteFile={() => {}}
                  />
                </div>
              );
            })}

          {/* <div>
            <ProfileUploadDocument
              id="Dsc"
              type="button"
              deleteFile={() => {}}
            />
          </div>
          <div>
            <ProfileUploadDocument
              id="Dsc"
              type="button"
              deleteFile={() => {}}
            />
          </div> */}
        </div>
        <div className="p-4">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ProfileUploadDocuments;
