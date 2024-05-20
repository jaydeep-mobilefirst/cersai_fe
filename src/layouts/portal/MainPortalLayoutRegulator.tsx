import { Outlet } from "react-router-dom";
import MainPortalSidebar from "../../components/userFlow/mainPortal-Regulator/MainPortalSidebar";

import FormHandlerProviders from "../../contextAPI/useFormFieldHandlers";

type Props = {};

const MainPortalLayoutRegulator = (props: Props) => {
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

export default MainPortalLayoutRegulator;
