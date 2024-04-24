import React from "react";
import SignUpSideBar from "../../components/userFlow/depositeTaker/SignUpSideBar";
import { Outlet } from "react-router-dom";

const DepositTakerRegisterFlow = () => {
  return (
    <div className="flex">
      <SignUpSideBar />
      <div className=" flex w-full flex-col">
        <div className="w-full mt-20">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DepositTakerRegisterFlow;
