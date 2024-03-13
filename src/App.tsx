import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Landing from "./pages/Landing";
import PrivateRoutes from "./utils/PrivateRoute";
import DepositeTakerSignup from "./pages/depositeTaker/DepositeTakerSignup";
import SignUpSideBar from "./components/userFlow/depositeTaker/SignUpSideBar";
import VarificationForm from "./pages/depositeTaker/VarificationForm";
import NodalDetails from "./pages/depositeTaker/NodalDetails";
import DepositeTaker from "./components/userFlow/depositeTaker/DepositeTaker";
import DepositTakerRegisterFlow from "./layouts/depositTakerRegisterFlow/DepositTakerRegisterFlow";



function App() {
  const { value } = useSelector((state: RootState) => state.common);

  console.log({ value });
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<DepositTakerRegisterFlow />} path="/depositetaker/signup" >
              
              <Route element={<NodalDetails />} path="nodaldetails" />
            </Route>
          </Route>
          <Route element={<Landing />} path="/" />
          <Route element={<SignUpSideBar />} path="/sidebar" />
        </Routes>
      </Router> 
      {/* <SignUpSideBar/> */}
      {/* <VarificationForm/> */}
      {/* <DepositeTaker/> */}
    </div>
  );
}

export default App;