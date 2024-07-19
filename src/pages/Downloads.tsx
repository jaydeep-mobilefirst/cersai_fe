import { useEffect, useState } from "react";
import { useLandingStore } from "../zust/useLandingStore";

import axios from "axios";
import { bffUrl } from "../utils/api";
import LanguageBar from "../components/landingPage/LanguageBar";
import TopDetail from "../components/landingPage/TopDetail";
import Navbar from "../components/landingPage/Navbar";
import Footer from "../components/landingPage/Footer";
import DownloadList from "../components/downloads/DownloadList";
import { data } from "../utils/hardText/landingPageText2";
import { downloadPageData } from "../utils/hardText/downloadPageText";
import { useDownloadStore } from "../zust/useDownloadStore";
import { useLangugaeStore } from "../zust/useLanguageUsStore";
import LoaderSpin from "../components/LoaderSpin";

const Downloads = () => {
  const { homePageData, setHomePageData } = useLandingStore((state) => state);
  const {language} = useLangugaeStore((state) => state);
  const { downloadPageDataa, setDownloadPageData } = useDownloadStore(
    (state) => state
  );
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
    downloadPageCmsApi();
  }, [state,language]);

  const downloadPageCmsApi = () => {
    setLoader(true);
    // setHomePageData(data.data.content)
    axios
      .get(bffUrl + `/websitecontent/get/name?wcname=downloads`,{
        headers: {
          'Accept-Language': language
        }
      })
      .then((response) => {
        setDownloadPageData(response?.data?.data?.content?.data?.[0]?.downloadPageData);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  };
  console.log("downloadPageUpdatedData", downloadPageDataa);

  return (
    <div className="min-h-screen flex flex-col">
      <LanguageBar />
      <TopDetail />
      <Navbar />
      {loader ? (
        <div className="h-[850px] p-10 pt-[100px]">
          <LoaderSpin />
        </div>
      ) : downloadPageDataa?.heading?.length > 0 ? (
        <div className="buds-faq-background-image">
          <div className="mt-[56px] md:px-[56px] px-[16px] ">
            <h1 className="text-xl font-bold text-[#24222B] text-gilroy-bold mb-[24px]">
              {downloadPageDataa?.heading?.[0]?.text}
            </h1>
          </div>
          <DownloadList />
        </div>
      ) : (
        <div className="flex justify-center items-center h-[450px] text-xl font-bold text-[#24222B] text-gilroy-bold">
          <h1>No data available</h1>
        </div>
      )}

      <div className="mt-[124px]">
        <Footer />
      </div>
    </div>
  );
};
export default Downloads;
