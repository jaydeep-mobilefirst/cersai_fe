import React from "react";
import LanguageBar from "../components/landingPage/LanguageBar";
import TopDetail from "../components/landingPage/TopDetail";
import LatestNewsComp from "../components/landingPage/LatestNewsComp";
import AboutBudsHeadingComp from "../components/landingPage/AboutBudsHeadingComp";
import Footer from "../components/landingPage/Footer";
import AboutBuds from "../components/landingPage/AboutBuds";
import QueryResolutoinComp from "../components/landingPage/QueryResolutionCom";
import Navbar from "../components/landingPage/Navbar";
import Hero2 from "../components/landingPage/Hero2";

const Landing = () => {
  return (
    <div>
      <LanguageBar />
      <TopDetail />
      <Navbar />
      <Hero2 />
      <LatestNewsComp />
      <AboutBudsHeadingComp />
      <AboutBuds />
      <QueryResolutoinComp />
      <Footer />
    </div>
  );
};

export default Landing;
