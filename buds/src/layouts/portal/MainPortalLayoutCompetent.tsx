import MainPortalSidebar from "../../components/userFlow/main-portal-competent/MainPortalSidebar";
import { Outlet } from "react-router-dom";
import Header from "../../components/userFlow/mainPortal/Header";
import FormHandlerProviders from "../../contextAPI/useFormFieldHandlers";

type Props = {};

const MainPortalLayoutCompetent = (props: Props) => {
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

export default MainPortalLayoutCompetent;
