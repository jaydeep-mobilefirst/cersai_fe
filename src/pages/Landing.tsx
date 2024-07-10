import React, { useEffect, useState } from "react";
import LanguageBar from "../components/landingPage/LanguageBar";
import TopDetail from "../components/landingPage/TopDetail";
import LatestNewsComp from "../components/landingPage/LatestNewsComp";
import AboutBudsHeadingComp from "../components/landingPage/AboutBudsHeadingComp";
import Footer from "../components/landingPage/Footer";
import AboutBuds from "../components/landingPage/AboutBuds";
import QueryResolutoinComp from "../components/landingPage/QueryResolutionCom";
import Navbar from "../components/landingPage/Navbar";
import HeroHome from "../components/landingPage/HeroHome";
import axios from "axios";
import { bffUrl } from "../utils/api";
import { useLandingStore } from "../zust/useLandingStore";
import {data} from '../utils/hardText/landingPageText2';

const Landing = () => {
  const { homePageData, setHomePageData } = useLandingStore((state) => state);
  const [state, setState] = useState(true);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    homePageCmsApi();
  }, [state]);

  const homePageCmsApi = () => {
    setLoader(true);
    setHomePageData(data.data.content)
    axios
      .get(bffUrl + `/websitecontent/list/1`)
      .then((response) => {
        // setHomePageData(response?.data?.data?.content);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  };
  return (
    <div>
      <LanguageBar />
      <TopDetail />
      <Navbar />
      <HeroHome />
      <LatestNewsComp />
      <AboutBudsHeadingComp />
      <AboutBuds />
      {/* <QueryResolutoinComp /> */}
      <Footer />
    </div>
  );
};

export default Landing;
