import React from "react";
// import logo from "./logo.svg";
import "./App.css";
// import QueryResolutionSession from "./pages/QueryResolutionSession";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Landing from "./pages/Landing";
import Review from "./pages/Review";
import ModelDiv from "./components/ModelPage/ModelDiv";
import PrivateRoutes from "./utils/PrivateRoute";
import DepositeTakerSignup from "./pages/depositeTaker/DepositeTakerSignup";

function App() {
  const { value } = useSelector((state: RootState) => state.common);

  console.log({ value });
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<DepositeTakerSignup />} path="/depositetaker/signup" />
          </Route>
          <Route element={<Landing />} path="/" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
