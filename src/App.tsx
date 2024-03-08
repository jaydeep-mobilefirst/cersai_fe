import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
// import Landing from "./pages/Landing";
import AboutBuds from "./components/landingPage/AboutBuds";
import QueryResolutoinComp from "./components/landingPage/QueryResolutionCom";
import Landing from "./pages/Landing";
import LatestNewsComp from "./components/landingPage/LatestNewsComp";
import AboutBudsHeadingComp from "./components/landingPage/AboutBudsHeadingComp";
import Footer from "./components/landingPage/Footer";
import PrivateRoutes from "./utils/PrivateRoute";
import DepositeTakerSignup from "./pages/depositeTaker/DepositeTakerSignup";
import SingUpPopup from "./components/userFlow/common/Modal";
import RegisterModel from "./components/userFlow/common/RegisterModal";
import VerificationSuccess from "./components/userFlow/common/VerificationSuccess";

function App() {
  const { value } = useSelector((state: RootState) => state.common);

  console.log({ value });
  return (
    <div>
      {/* <Landing/> */}
      
      {/* <LatestNewsComp/> */}
      {/* <AboutBudsHeadingComp/> */}
      
      {/* <AboutBuds/> */}
      {/* <QueryResolutoinComp /> */}
      {/* <Footer/> */}
      {/* <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<DepositeTakerSignup />} path="/depositetaker/signup" />
          </Route>
          <Route element={<Landing />} path="/" />
        </Routes>
      </Router> */}
      <RegisterModel/>
      <VerificationSuccess/>
    </div>
  );
}

export default App;
