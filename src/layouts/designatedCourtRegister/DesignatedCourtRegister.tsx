import React from "react";

import { Outlet } from "react-router-dom";
import SignUpSideBar from "../../components/userFlow/designatedCourt/SignUpSideBar";

const DesignatedCourtRegister = () => {
  return (
    <div className="flex">
      <SignUpSideBar />

      {/* <Outlet/> */}
      <div className=" flex w-full flex-col">
        <div className="w-full mt-20">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DesignatedCourtRegister;
