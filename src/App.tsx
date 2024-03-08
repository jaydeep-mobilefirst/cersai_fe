import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Landing from "./pages/Landing";
import Review from "./pages/Review";
import { Route, Routes } from "react-router-dom";
import ModelDiv from "./components/ModelPage/ModelDiv";
function App() {
  const { value } = useSelector((state: RootState) => state.common);

  console.log({ value });
  return (
    <Routes>
      <Route path="/landingpage" element={<Landing />} />
      <Route path="/" element={<ModelDiv />} />
      {/* <Route path="/" element={<Review />} /> */}
    </Routes>
  );
}

export default App;
