import React from "react";
import TaskTabs from "../../components/userFlow/mainPortal/TaskTabs";
import { Outlet } from "react-router-dom";

type Props = {};

const DashboardCompetent = (props: Props) => {
  return (
    <div className="relative xl:ml-[40px]">
      <div className="mt-6">{/* <TaskTabs /> */}</div>
      {/* <Outlet /> */}
      in progress page
    </div>
  );
};

export default DashboardCompetent;
