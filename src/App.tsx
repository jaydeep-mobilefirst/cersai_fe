import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Landing from "./pages/Landing";
import PrivateRoutes from "./utils/PrivateRoute";
import DepositeTakerSignup from "./pages/depositeTaker/DepositeTakerSignup";
import EntityDetails from "./pages/entityDetails/EntityDetails";

function App() {
  const { value } = useSelector((state: RootState) => state.common);

  console.log({ value });
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route
              element={<DepositeTakerSignup />}
              path="/depositetaker/signup"
            />
          </Route>
          <Route element={<Landing />} path="/" />
          <Route element={<EntityDetails />} path="/entity-details" />
        </Routes>
      </Router>
      {/* <SignUpSideBar/> */}
    </div>
  );
}

export default App;
