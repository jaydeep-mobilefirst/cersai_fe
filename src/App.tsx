import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
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
//import CompetentAuthorityRegister from "./layouts/competentAuthorityRegister/CompetentAuthorityRegister";

function App() {
  const { value } = useSelector((state: RootState) => state.common);

  console.log({ value });
  return (
    <div>
     
     
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<DepositTakerRegisterFlow />} path="/depositetaker/signup">
              <Route element={<NodalDetails />} path="nodaldetails" />
              <Route element={<VarificationForm />} path="verification" />
              <Route element={<EntityDetails />} path="entitydetials" />
              <Route element={<RegularDetailsForm />} path="regulatordetails" />
              <Route element={<ReviewMain />} path="reviewdetails" />
              

  </Route>

  <Route element= 
  {<CompetentAuthorityRegister/>} path="/competent/authority">

  <Route element={<ComponentDetails />} path="competentdetails" />
  <Route element={<UploadDocuments />} path="uploaddocuments" />
  <Route element={<NodalDetailsCompetent />} path="nodaldetails" />
  <Route element={<ReviewDetails />} path="reviewdetails" />
    
  </Route>

          </Route>
          <Route element={<Landing />} path="/" />
        </Routes>
  </Router> 
    </div>
  );
}

export default App;