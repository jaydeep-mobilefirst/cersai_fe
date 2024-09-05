import React from "react";
import TaskTabs from "../../components/userFlow/mainPortal/TaskTabs";
import { Outlet } from "react-router-dom";

type Props = {};

const DashboardDesignated = (props: Props) => {
  return (
    <div className="relative xl:ml-[40px]">
      <div className="mt-6">{/* <TaskTabs /> */}</div>
      {/* <Outlet /> */}
      in progress page
    </div>
  );
};

export default DashboardDesignated;
