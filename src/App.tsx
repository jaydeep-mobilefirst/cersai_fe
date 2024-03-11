import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Landing from "./pages/Landing";
<<<<<<<<< Temporary merge branch 1
import LatestNewsComp from "./components/landingPage/LatestNewsComp";
import AboutBudsHeadingComp from "./components/landingPage/AboutBudsHeadingComp";
import Footer from "./components/landingPage/Footer";
=========
import PrivateRoutes from "./utils/PrivateRoute";
import DepositeTakerSignup from "./pages/depositeTaker/DepositeTakerSignup";
>>>>>>>>> Temporary merge branch 2

function App() {
  const { value } = useSelector((state: RootState) => state.common);

  console.log({ value });
  return (
    <div>
<<<<<<<<< Temporary merge branch 1
      {/* <Landing/> */}
      
      {/* <LatestNewsComp/> */}
      <AboutBudsHeadingComp/>
      
      {/* <AboutBuds/> */}
      {/* <QueryResolutoinComp /> */}
      {/* <Footer/> */}
=========
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<DepositeTakerSignup />} path="/depositetaker/signup" />
          </Route>
          <Route element={<Landing />} path="/" />
        </Routes>
      </Router>
>>>>>>>>> Temporary merge branch 2
    </div>
  );
}

export default App;
