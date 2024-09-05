import { useEffect, useState } from "react";
import FaqSection from "../components/faq/FaqSection";
import Footer from "../components/landingPage/Footer";
import LanguageBar from "../components/landingPage/LanguageBar";
import Navbar from "../components/landingPage/Navbar";
import TopDetail from "../components/landingPage/TopDetail";
import { faqDataa } from "../utils/hardText/faqPageContent";
import { useLandingStore } from "../zust/useLandingStore";
import axios from "axios";
import { bffUrl } from "../utils/api";
import LoaderSpin from "../components/LoaderSpin";
import {data} from '../utils/hardText/landingPageText2';

interface FaqItem {
  question: string;
  answer: string | string[];
}

interface FaqSection {
  title: string;
  items: FaqItem[];
}
const restructureFaqData = (faqDataa: any): FaqSection[] => {
  const sections: FaqSection[] = [];

  const ckycQuestions: FaqItem[] = faqDataa.data.content.faqPageData.ckycQuestions.map((q: any) => ({
    question: q[0].text,
    answer: q[1].text,
  }));
  sections.push({ title: 'A) About CKYC', items: ckycQuestions });

  const reportingEntityQuestions: FaqItem[] = faqDataa.data.content.faqPageData.reportingEntityQuestions.map((q: any) => ({
    question: q[0].text,
    answer: q[1].text,
  }));
  sections.push({ title: 'B) Reporting Entity Registration', items: reportingEntityQuestions });

  const connectivityQueryQuestions: FaqItem[] = faqDataa.data.content.faqPageData.connectivityQueryQuestions.map((q: any) => ({
    question: q[0].text,
    answer: q[1].text,
  }));
  sections.push({ title: 'C) Connectivity queries', items: connectivityQueryQuestions });

  return sections;
};


const Faq: React.FC = () => {
  const { homePageData, setHomePageData } = useLandingStore((state) => state);
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
        // setHomePageData(response?.data?.data?.content);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  };
  const faqSections = restructureFaqData(faqDataa);

  return (

    <div className="min-h-screen flex flex-col">
      <LanguageBar />
      <TopDetail />
      <Navbar />
      {loader? 
      <div className="h-[500px] p-10">
      <LoaderSpin/>
      </div>
      :
      <div className="md:p-[56px] p-[16px] buds-faq-background-image">
        <h1 className="text-[#24222B] text-xl font-bold text-gilroy-bold">
          {faqDataa?.data?.content?.faqPageData?.heading[0]?.text}
        </h1>
        <main>
          
        {faqSections.map((section, index) => (
              <FaqSection key={index} title={section.title} items={section.items} />
            ))}
        </main>
      </div>
}
      <div className="md:pt-24">
        <Footer />
      </div>
    </div>
  );
};
export default Faq;
