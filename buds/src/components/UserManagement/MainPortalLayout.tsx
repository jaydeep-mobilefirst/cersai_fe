import MainPortalSidebar from "../../components/userFlow/mainPortal/MainPortalSidebar";
import { Outlet } from "react-router-dom";
import Header from "../../components/userFlow/mainPortal/Header";
import FormHandlerProviders from "../../contextAPI/useFormFieldHandlers";
import React from "react";

type Props = {};

const MainPortalLayout = (props: Props) => {
  return (
    <div>
      <MainPortalSidebar
        layout={
          <FormHandlerProviders>
            <Outlet />
          </FormHandlerProviders>
        }
      />
    </div>
  );
};

export default MainPortalLayout;
