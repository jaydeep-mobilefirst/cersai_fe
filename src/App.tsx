import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
// import Landing from "./pages/Landing";
import AboutBuds from "./components/landingPage/AboutBuds";
import QueryResolutoinComp from "./components/landingPage/QueryResolutionCom";
import Landing from "./pages/Landing";
import LatestNewsComp from "./components/landingPage/LatestNewsComp";
import AboutBudsHeadingComp from "./components/landingPage/AboutBudsHeadingComp";
import Footer from "./components/landingPage/Footer";

function App() {
  const { value } = useSelector((state: RootState) => state.common);

  console.log({ value });
  return (
    <div>
      {/* <Landing/> */}
      <AboutBuds/>
      <QueryResolutoinComp />
      <LatestNewsComp/>
      <AboutBudsHeadingComp/>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
