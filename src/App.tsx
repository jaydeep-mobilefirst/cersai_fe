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



import DesignatedCourtRegister  from "./layouts/designatedCourtRegister/DesignatedCourtRegister";
import DesignatedCourtDetails from "./pages/designatedCourt/DesignatedCourtDetails";
import NodalDetailsDesignated from "./pages/designatedCourt/NodalDetailsDesignated";
import UploloadDocumentsDesignated from './pages/designatedCourt/UploadDocumentsDesignated';
import ReviewDetailsDesignated from "./pages/designatedCourt/ReviewDetailsDesignated";

import RegulatorRegister from "./layouts/regulatorRegister/RegulatorRegister";
import RegulatorDetails from "./pages/regulator/RegulatorDetails";
import NodalDetailsRegulator from "./pages/regulator/NodalDetailsRegulator";
import UploadDocumentsRegulator from "./pages/regulator/UploadDocumentsRegulator";
import ReviewDetailsRegulator from "./pages/regulator/ReviewDetailsRegulator";

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
  {<RegulatorRegister/>} path="/regulator/court">

  <Route element={<RegulatorDetails />} path="regulatordetails" />
  <Route element={<UploadDocumentsRegulator />} path="uploaddocuments" />
  <Route element={<NodalDetailsRegulator />} path="nodaldetails" />
  <Route element={<ReviewDetailsRegulator />} path="reviewdetails" />
    
  </Route>


  <Route element= 
  {<DesignatedCourtRegister/>} path="/designated/court">

  <Route element={<DesignatedCourtDetails />} path="designateddetails" />
  <Route element={<UploloadDocumentsDesignated />} path="uploaddocuments" />
  <Route element={<NodalDetailsDesignated />} path="nodaldetails" />
  <Route element={<ReviewDetailsDesignated />} path="reviewdetails" />
    
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