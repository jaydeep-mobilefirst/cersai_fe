import React from "react";
import InputFields from "../../components/userFlow/common/InputField";
import Footer from "../../components/userFlow/userProfile/Footer";
import { useScreenWidth } from "../../utils/screenSize";
import TaskTabs from "../../components/userFlow/mainPortal/TaskTabs";

type Props = {};

const ResetPassword = (props: Props) => {
  const screenWidth = useScreenWidth();
  const customclass = `flex flex-col w-full mt-4 justify-between w-full`;
  const emailId = sessionStorage.getItem("emailId");
  const entityType = sessionStorage.getItem("entityType");
  // console.log(entityType, "entityType");

  return (
    <>
      <div className="mt-6 mx-6">
        <TaskTabs />
      </div>
      <div className={customclass}>
        <form
          className="flex flex-col justify-between p-6"
          style={{
            height: `${screenWidth > 1024 ? "calc(100vh - 170px)" : "100%"}`,
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label
                htmlFor="oldPassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Old Password<span className="text-red-500">*</span>
              </label>
              <InputFields
                type="password"
                id="oldPassword"
                placeholder="Type Old Password"
              />
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                New Password<span className="text-red-500">*</span>
              </label>
              <InputFields
                type="password"
                id="newPassword"
                placeholder="Type Old Password"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Confirm Password<span className="text-red-500">*</span>
              </label>
              <InputFields
                type="password"
                id="confirmPassword"
                placeholder="Type Old Password"
              />
            </div>
          </div>
          <div>
            <Footer />
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
