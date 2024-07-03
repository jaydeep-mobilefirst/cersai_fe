import { useEffect, useState } from "react";
import FaqSection from "../components/faq/FaqSection";
import Footer from "../components/landingPage/Footer";
import LanguageBar from "../components/landingPage/LanguageBar";
import Navbar from "../components/landingPage/Navbar";
import TopDetail from "../components/landingPage/TopDetail";
import { faqData } from "../utils/hardText/faqComponent";
import { useLandingStore } from "../zust/useLandingStore";
import axios from "axios";
import { bffUrl } from "../utils/api";
const Faq: React.FC = () => {
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
      <div className="md:p-[56px] p-[16px] buds-faq-background-image">
        <h1 className="text-[#24222B] text-xl font-bold text-gilroy-bold">
          Frequently asked questions (FAQs)
        </h1>
        <main>
          {Object.entries(faqData).map(([key, section]) => (
            <FaqSection key={key} title={section.title} items={section.items} />
          ))}
        </main>
      </div>
      <div className="md:pt-24">
        <Footer />
      </div>
    </div>
  );
};
export default Faq;
