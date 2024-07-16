import { useEffect, useState } from "react";
import { operatingGuidlinesData } from "../utils/hardText/operatingGuidelines";
import axios from "axios";
import { bffUrl } from "../utils/api";
import { useOperatingGuidelinesStore } from "../zust/useOperatingGuidelinesStore";
import { useLandingStore } from "../zust/useLandingStore";
import LanguageBar from "../components/landingPage/LanguageBar";
import TopDetail from "../components/landingPage/TopDetail";
import Navbar from "../components/landingPage/Navbar";
import Footer from "../components/landingPage/Footer";

const OpertaingGuidelines = () => {
  const { homePageData, setHomePageData } = useLandingStore((state) => state);
  const { guidelinesPageData, setGuidelinesPageData } =
    useOperatingGuidelinesStore((state) => state);

  const [state, setState] = useState(true);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    homePageCmsApi();
  }, [state]);

  const homePageCmsApi = () => {
    setLoader(true);
    // setHomePageData(data.data.content)
    axios
      .get(bffUrl + `/websitecontent/list/1`)
      .then((response) => {
        setHomePageData(response?.data?.data?.content?.updatedStructure);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  };

  useEffect(() => {
    guidelinesPageCmsApi();
  }, [state]);

  const guidelinesPageCmsApi = () => {
    setLoader(true);
    // setHomePageData(data.data.content)
    axios
      .get(bffUrl + `/websitecontent/list/4`)
      .then((response) => {
        setGuidelinesPageData(
          response?.data?.data?.content?.operatingGuidlinesPageData?.link?.[0]
            ?.link
        );
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });

    const operatingGuidelinesLink = guidelinesPageData; // Adjust according to your API response structure
    console.log("link", operatingGuidelinesLink);
    if (operatingGuidelinesLink) {
      window.open(operatingGuidelinesLink, "_blank");
    } else {
      console.error("Operating guidelines link not found in API response.");
    }
  };

  return (
    <div>
      <div className="min-h-screen flex flex-col">
        <LanguageBar />
        <TopDetail />
        <Navbar />
        <div className="p-5 px-12 flex justify-center text-xl font-bold text-[#24222B] text-gilroy-bold">
          Please go through the downloaded file.
        </div>
        <div className="md:mt-[600px] mt-10">
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default OpertaingGuidelines;
