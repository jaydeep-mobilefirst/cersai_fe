import { useEffect, useState } from "react";
import { useLandingStore } from "../zust/useLandingStore";
import axios from "axios";
import { bffUrl } from "../utils/api";
import LanguageBar from "../components/landingPage/LanguageBar";
import TopDetail from "../components/landingPage/TopDetail";
import Navbar from "../components/landingPage/Navbar";
import Footer from "../components/landingPage/Footer";
import { trainingPageData } from "../utils/hardText/trainingPageText";
import QueryResolutionSessionComponent from "../components/training/QueryResolutionSessionComponent";

const Training = () => {
  const { homePageData, setHomePageData } = useLandingStore((state) => state);
  const [state, setState] = useState(true);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    homePageCmsApi();
  }, [state]);

  const homePageCmsApi = () => {
    setLoader(true);
    axios
      .get(bffUrl + `/websitecontent/list/1`)
      .then((response) => {
        setHomePageData(response?.data?.data?.content);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  };
  return (
    <div className="min-h-screen flex flex-col">
      <LanguageBar />
      <TopDetail />
      <Navbar />
      <div className="buds-faq-background-image">
        <div className="mt-[56px] md:px-[56px] px-[16px] ">
          <h1 className="text-xl font-bold text-[#24222B] text-gilroy-bold mb-[12px]">
            {trainingPageData.heading}
          </h1>
          <p className="text-[#727272] md:max-w-[967px] w-full text-base font-normal text-gilroy-medium leading-normal">
            {trainingPageData.description}
          </p>
          {trainingPageData.sessions.map((session, index) => (
            <QueryResolutionSessionComponent
              key={index}
              session={session}
              buttonText={trainingPageData.buttonText}
            />
          ))}
        </div>
        <div className="mt-[292px]">
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default Training;
