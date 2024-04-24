import React from "react";

import { Outlet } from "react-router-dom";
import SignUpSideBar from "../../components/userFlow/competentAuthority/SignUpSideBar";

const CompetentAuthorityRegister = () => {
  return (
    <div className="flex">
      <SignUpSideBar />

      {/* <Outlet /> */}
      <div className=" flex w-full flex-col">
        <div className="w-full mt-20">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CompetentAuthorityRegister;
