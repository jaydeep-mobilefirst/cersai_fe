import { useEffect, useState } from "react";
import FaqSection from "../components/faq/FaqSection";
import Footer from "../components/landingPage/Footer";
import LanguageBar from "../components/landingPage/LanguageBar";
import Navbar from "../components/landingPage/Navbar";
import TopDetail from "../components/landingPage/TopDetail";
import { faqDataa } from "../utils/hardText/faqPageContent";
import { useLandingStore } from "../zust/useLandingStore";
import { useFaqStore } from "../zust/useFaqStore";
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
const restructureFaqData = (faqPageData: any): FaqSection[] => {
  const sections: FaqSection[] = [];

  const ckycQuestions: FaqItem[] = faqPageData?.ckycQuestions?.map((q: any) => ({
    question: q[0]?.text,
    answer: q[1]?.text,
  }));
  sections.push({ title: 'A) About CKYC', items: ckycQuestions });

  const reportingEntityQuestions: FaqItem[] = faqPageData?.reportingEntityQuestions?.map((q: any) => ({
    question: q[0]?.text,
    answer: q[1]?.text,
  }));
  sections.push({ title: 'B) Reporting Entity Registration', items: reportingEntityQuestions });

  const connectivityQueryQuestions: FaqItem[] = faqPageData?.connectivityQueryQuestions?.map((q: any) => ({
    question: q[0]?.text,
    answer: q[1]?.text,
  }));
  sections.push({ title: 'C) Connectivity queries', items: connectivityQueryQuestions });

  return sections;
};


const Faq: React.FC = () => {
  const { homePageData, setHomePageData } = useLandingStore((state) => state);
  const { faqPageDataa, setFaqPageData } = useFaqStore((state) => state);
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
    faqPageCmsApi();
  }, [state]);

  const faqPageCmsApi = () => {
    setLoader(true);

    axios
      .get(bffUrl + `/websitecontent/list/2`)
      .then((response) => {
        setFaqPageData(response?.data?.data?.content?.faqPageData);
        setLoader(false);
        console.log("response",response)
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  };
  console.log("FAQdataupdated",faqPageDataa)
  const faqSections = restructureFaqData(faqPageDataa);

  return (
    // <div></div>
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
          {faqPageDataa?.heading?.[0]?.text}
        </h1>
        <main>
          
        {faqSections?.map((section, index) => (
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
