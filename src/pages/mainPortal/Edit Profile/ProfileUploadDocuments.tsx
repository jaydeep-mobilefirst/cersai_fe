import React from "react";
import ProfileUploadDocument from "../../../components/userFlow/form/ProfileUploadDocument";
import Footer from "../../../components/userFlow/userProfile/Footer";
import { useScreenWidth } from "../../../utils/screenSize";

type Props = {};

const ProfileUploadDocuments = (props: Props) => {
  const screenWidth = useScreenWidth();
  return (
    <>
      <div
        className="bg-white w-full flex flex-col justify-between"
        style={{
          height: `${screenWidth > 1024 ? "calc(100vh - 155px)" : "100%"}`,
        }}
      >
        <div className="p-6 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-5 space-y-0">
          <div>
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
          </div>
          <div>
            <ProfileUploadDocument
              id="Dsc"
              type="button"
              deleteFile={() => {}}
            />
          </div>
        </div>
        <div className="p-4">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ProfileUploadDocuments;
