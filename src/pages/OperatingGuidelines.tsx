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
import { Link } from "react-router-dom";
import { error } from "console";
import { useLangugaeStore } from "../zust/useLanguageUsStore";

const OpertaingGuidelines = () => {
  const { homePageData, setHomePageData } = useLandingStore((state) => state);
  const {language} = useLangugaeStore((state) => state);
  const { guidelinesPageData, setGuidelinesPageData } =
    useOperatingGuidelinesStore((state) => state);

  const [state, setState] = useState(true);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    homePageCmsApi();
  }, [state,language]);

  const homePageCmsApi = () => {
    setLoader(true);
    // setHomePageData(data.data.content)
    axios
      .get(bffUrl + `/websitecontent/get/name?wcname=home`,{
        headers: {
          'Accept-Language': language
        }
    })
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
  }, [state,language]);

  const guidelinesPageCmsApi = () => {
    setLoader(true);
    // setHomePageData(data.data.content)
    axios
      .get(bffUrl + `/websitecontent/get/name?wcname=operating guidelines`,{
        headers: {
          'Accept-Language': language
        }
    })
      .then((response) => {

        // setGuidelinesPageData(
        //   response?.data?.data?.content?.operatingGuidlinesPageData?.link?.[0]?.link
        // );
        const link = response?.data?.data?.content?.link;
        if (link) {
          setGuidelinesPageData(link);
          window.open(link, "_blank");
        }else{
          console.log("No link found");
        }
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
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
