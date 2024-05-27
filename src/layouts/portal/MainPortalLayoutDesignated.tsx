import { Outlet } from "react-router-dom";
import MainPortalSidebar from "../../components/userFlow/main-portal-designated/MainPortalSidebar";

import FormHandlerProviders from "../../contextAPI/useFormFieldHandlers";

type Props = {};

const MainPortalLayoutDesignated = (props: Props) => {
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

export default MainPortalLayoutDesignated;
