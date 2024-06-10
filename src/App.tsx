import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import PrivateRoutes from "./utils/PrivateRoute";
//import DepositeTakerSignup from "./pages/depositeTaker/DepositeTakerSignup";
//import SignUpSideBar from "./components/userFlow/depositeTaker/SignUpSideBar";
import VarificationForm from "./pages/depositeTaker/VarificationForm";
import DepositTakerRegisterFlow from "./layouts/depositTakerRegisterFlow/DepositTakerRegisterFlow";
import NodalDetails from "./pages/depositeTaker/NodalDetails";
import RegularDetailsForm from "./pages/depositeTaker/RegularDetailsForm";
import ReviewMain from "./pages/depositeTaker/ReviewMain";
import EntityDetails from "./pages/depositeTaker/EntityDetails";

//import CompetentDetails from './pages/competentAuthority/CompetentDetails'
//import UploadDocuments from './pages/competentAuthority/UploadDocuments'
import NodalDetailsCompetent from "./pages/competentAuthority/NodalDetailsCompetent";
import ReviewDetails from "./pages/competentAuthority/ReviewDetails";
import ComponentDetails from "./pages/competentAuthority/CompetentDetails";
import CompetentAuthorityRegister from "./layouts/competentAuthorityRegister/CompetentAuthorityRegister";
import UploadDocuments from "./pages/competentAuthority/UploadDocuments";
import DesignatedCourtRegister from "./layouts/designatedCourtRegister/DesignatedCourtRegister";
import DesignatedCourtDetails from "./pages/designatedCourt/DesignatedCourtDetails";
import NodalDetailsDesignated from "./pages/designatedCourt/NodalDetailsDesignated";
import UploloadDocumentsDesignated from "./pages/designatedCourt/UploadDocumentsDesignated";
import ReviewDetailsDesignated from "./pages/designatedCourt/ReviewDetailsDesignated";

import RegulatorRegister from "./layouts/regulatorRegister/RegulatorRegister";
import RegulatorDetails from "./pages/regulator/RegulatorDetails";
import NodalDetailsRegulator from "./pages/regulator/NodalDetailsRegulator";
import UploadDocumentsRegulator from "./pages/regulator/UploadDocumentsRegulator";
import ReviewDetailsRegulator from "./pages/regulator/ReviewDetailsRegulator";
import MainPortalLayout from "./layouts/portal/MainPortalLayout";
import Dashboard from "./pages/mainPortal/Dashboard";
import DashboardProfile from "./pages/mainPortal/DashboardProfile";
import ResetPassword from "./pages/mainPortal/ResetPassword";
import SchemaCreationForm from "./pages/mainPortal/SchemaManagemet/SchemaCreationForm";
import SchemaCreation from "./pages/mainPortal/SchemaManagemet/SchemaCreation";
import SchemeMasterForm from "./pages/mainPortal/SchemaManagemet/SchemaMasterDetail";

import SchemaCreationFormRg from "./pages/regulator/SchemaManagemetRg/SchemaCreationFormRg";
import SchemaCreationRg from "./pages/regulator/SchemaManagemetRg/SchemaCreationRg";
import SchemeMasterFormRg from "./pages/regulator/SchemaManagemetRg/SchemaMasterDetailRg";
import MyTaskStatus from "./pages/regulator/MyTask/MyTaskStatus";
import MyTaskForm from "./pages/regulator/MyTask/MyTaskForm";

import SchemaCreationCa from "./pages/competentAuthority/SchemaManagemetCa/SchemaCreationCa";
import SchemaCreationFormCa from "./pages/competentAuthority/SchemaManagemetCa/SchemaCreationFormCa";
import SchemeMasterFormCa from "./pages/competentAuthority/SchemaManagemetCa/SchemaMasterDetailCa";

import SchemaCreationDc from "./pages/designatedCourt/SchemaManagemetDc/SchemaCreationDc";
import SchemaCreationFormDc from "./pages/designatedCourt/SchemaManagemetDc/SchemaCreationFormDc";
import SchemeMasterFormDc from "./pages/designatedCourt/SchemaManagemetDc/SchemaMasterDetailDc";

import RoleCreation from "./pages/mainPortal/UserManagement/RoleCreation";
import UserCreation from "./pages/mainPortal/UserManagement/UserCreation";
import UserMasterForm from "./pages/mainPortal/UserManagement/UserMasterForm";
import EditUserForm from "./pages/mainPortal/UserManagement/EditUserMasterForm";
import EditUserFormRg from "./pages/regulator/UserManagementRg/EditUserMasterForm";
import EditUserFormCa from "./pages/competentAuthority/UserManagementCa/EditUserMasterForm";
import EditRolePopupDc from "./pages/designatedCourt/UserManagementDc/EditUserMasterForm";
import SetNewPasswordModel from "./components/userFlow/common/SetNewPasswordModel";
import OtpModel from "./components/userFlow/common/OtpModal";
import MainPortalLayoutRegulator from "./layouts/portal/MainPortalLayoutRegulator";
import DashboardProfileRegulator from "./pages/mainPortal/DashboardProfileRegulator";
import ResetPasswordRegulator from "./pages/mainPortal/ResetPasswordRegulator";
import MainPortalLayoutCompetent from "./layouts/portal/MainPortalLayoutCompetent";
import DashboardCompetent from "./pages/mainPortal/DashboardCompetent";
import DashboardProfileCompetent from "./pages/mainPortal/DashboardProfileCompetent";
import ResetPasswordCompetent from "./pages/mainPortal/ResetPasswordCompetent";
import ResetPasswordDesignated from "./pages/mainPortal/ResetPasswordDesignated";
import DashboardProfileDesignateCourt from "./pages/mainPortal/DashboardProfileDesiganted";
import MainPortalLayoutDesignated from "./layouts/portal/MainPortalLayoutDesignated";
import DepositTakerSearchForm from "./pages/depositTakerSearch/DeposittakerSearchForm";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<MainPortalLayout />} path="/dt">
              <Route element={<Dashboard />} path="dashboard" />
              <Route element={<DashboardProfile />} path="profile" />
              <Route element={<ResetPassword />} path="resetpassword" />
              <Route element={<SchemaCreation />} path="mytask" />
              <Route element={<SchemaCreationForm />} path="mytask/form" />
              <Route element={<SchemeMasterForm />} path="mytask/schema" />
              <Route
                element={<UserCreation entityType="DT" />}
                path="usermanagement/usercreation"
              />
              <Route
                element={<RoleCreation entityType="DT" />}
                path="usermanagement"
              />

              <Route
                element={<UserMasterForm />}
                path="usermanagement/usermaster"
              />
              <Route
                element={<EditUserForm />}
                path="usermanagement/editusermasterum"
              />
            </Route>
            <Route element={<MainPortalLayoutRegulator />} path="/rg">
              <Route element={<Dashboard />} path="dashboard" />
              <Route element={<MyTaskStatus />} path="mytask" />
              <Route element={<MyTaskForm />} path="mytask/form" />

              <Route element={<SchemaCreationRg />} path="my-task" />
              <Route element={<SchemaCreationFormRg />} path="my-task/form" />
              <Route element={<SchemeMasterFormRg />} path="my-task/schema" />
              <Route
                element={<RoleCreation entityType="RG" />}
                path="usermanagement"
              />
              <Route
                element={<UserCreation entityType="RG" />}
                path="usermanagement/usercreation"
              />
              <Route
                element={<UserMasterForm />}
                path="usermanagement/usermaster"
              />
              <Route
                element={<EditUserFormRg />}
                path="usermanagement/editusermaster"
              />

              <Route element={<DashboardProfileRegulator />} path="profile" />
              <Route
                element={<ResetPasswordRegulator />}
                path="resetpassword"
              />
            </Route>
            <Route element={<MainPortalLayoutCompetent />} path="/ca">
              <Route element={<DashboardCompetent />} path="dashboard" />
              <Route element={<SchemaCreationCa />} path="my-task" />
              <Route element={<SchemaCreationFormCa />} path="my-task/form" />
              <Route element={<SchemeMasterFormCa />} path="my-task/schema" />

              <Route
                element={<RoleCreation entityType="CA" />}
                path="usermanagement"
              />
              <Route
                element={<UserCreation entityType="CA" />}
                path="usermanagement/usercreation"
              />
              <Route
                element={<UserMasterForm />}
                path="usermanagement/usermaster"
              />
              <Route
                element={<EditUserFormCa />}
                path="usermanagement/editusermasterum"
              />

              <Route element={<DashboardProfileCompetent />} path="profile" />
              <Route
                element={<ResetPasswordCompetent />}
                path="resetpassword"
              />
            </Route>
            <Route element={<MainPortalLayoutDesignated />} path="/dc">
              <Route element={<DashboardCompetent />} path="dashboard" />
              <Route element={<SchemaCreationDc />} path="my-task" />
              <Route element={<SchemaCreationFormDc />} path="my-task/form" />
              <Route element={<SchemeMasterFormDc />} path="my-task/schema" />

              <Route
                element={<RoleCreation entityType="DC" />}
                path="usermanagement"
              />
              <Route
                element={<UserCreation entityType="CA" />}
                path="usermanagement/usercreation"
              />
              <Route
                element={<UserMasterForm />}
                path="usermanagement/usermaster"
              />
              <Route
                element={<EditRolePopupDc />}
                path="usermanagement/editusermasterum"
              />
              <Route
                element={<DashboardProfileDesignateCourt />}
                path="profile"
              />
              <Route
                element={<ResetPasswordDesignated />}
                path="resetpassword"
              />
            </Route>

            <Route
              element={<DepositTakerRegisterFlow />}
              path="/depositetaker/signup"
            >
              <Route element={<NodalDetails />} path="nodaldetails" />
              <Route element={<VarificationForm />} path="verification" />
              <Route element={<EntityDetails />} path="entitydetails" />
              <Route element={<RegularDetailsForm />} path="regulatordetails" />
              <Route element={<ReviewMain />} path="reviewdetails" />
            </Route>

            <Route element={<RegulatorRegister />} path="/regulator/court">
              <Route element={<RegulatorDetails />} path="regulatordetails" />
              <Route
                element={<UploadDocumentsRegulator />}
                path="uploaddocuments"
              />
              <Route element={<NodalDetailsRegulator />} path="nodaldetails" />
              <Route
                element={<ReviewDetailsRegulator />}
                path="reviewdetails"
              />
            </Route>

            <Route
              element={<DesignatedCourtRegister />}
              path="/designated/court"
            >
              <Route
                element={<DesignatedCourtDetails />}
                path="designateddetails"
              />
              <Route
                element={<UploloadDocumentsDesignated />}
                path="uploaddocuments"
              />
              <Route element={<NodalDetailsDesignated />} path="nodaldetails" />
              <Route
                element={<ReviewDetailsDesignated />}
                path="reviewdetails"
              />
            </Route>

            <Route
              element={<CompetentAuthorityRegister />}
              path="/competent/authority"
            >
              <Route element={<ComponentDetails />} path="competentdetails" />
              <Route element={<UploadDocuments />} path="uploaddocuments" />
              <Route element={<NodalDetailsCompetent />} path="nodaldetails" />
              <Route element={<ReviewDetails />} path="reviewdetails" />
            </Route>
          </Route>
          <Route element={<Landing />} path="/" />
          {/* <Route element={<SetPassword />} path="/set-password" /> */}
          <Route element={<SetNewPasswordModel />} path="/set-password" />
          <Route element={<OtpModel />} path="/otp-verification" />
          {/* <Route element={<RoleCreation />} path="/role" /> */}
          <Route element={<DepositTakerSearchForm />} path="/searchform" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
