import { useEffect, useState } from "react";
import { useLandingStore } from "../zust/useLandingStore";
import axios from "axios";
import { bffUrl } from "../utils/api";
import LanguageBar from "../components/landingPage/LanguageBar";
import TopDetail from "../components/landingPage/TopDetail";
import Navbar from "../components/landingPage/Navbar";
import Footer from "../components/landingPage/Footer";
import DownloadList from "../components/downloads/DownloadList";
import {data} from '../utils/hardText/landingPageText2';

const Downloads=()=>{
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
    return(
        <div className="min-h-screen flex flex-col">
          <LanguageBar />
          <TopDetail />
          <Navbar />
          <div className="buds-faq-background-image">
          <div className="mt-[56px] md:px-[56px] px-[16px] ">
            <h1 className="text-xl font-bold text-[#24222B] text-gilroy-bold mb-[24px]">
              Downloads
            </h1>
          </div>
          <DownloadList/>
          <div className="mt-[124px]">
            <Footer />
          </div>
    
        </div>
        </div>
    )
}
export default Downloads;