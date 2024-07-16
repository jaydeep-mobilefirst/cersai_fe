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
import { data } from "../utils/hardText/landingPageText2";

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

  const ckycQuestions: FaqItem[] = faqPageData?.ckycQuestions?.map(
    (q: any) => ({
      question: q[0]?.text,
      answer: q[1]?.text,
    })
  );
  sections.push({ title: "A) About CKYC", items: ckycQuestions });

  const reportingEntityQuestions: FaqItem[] =
    faqPageData?.reportingEntityQuestions?.map((q: any) => ({
      question: q[0]?.text,
      answer: q[1]?.text,
    }));
  sections.push({
    title: "B) Reporting Entity Registration",
    items: reportingEntityQuestions,
  });

  const connectivityQueryQuestions: FaqItem[] =
    faqPageData?.connectivityQueryQuestions?.map((q: any) => ({
      question: q[0]?.text,
      answer: q[1]?.text,
    }));
  sections.push({
    title: "C) Connectivity queries",
    items: connectivityQueryQuestions,
  });

  return sections;
};

const Faq: React.FC = () => {
  const { homePageData, setHomePageData } = useLandingStore((state) => state);
  const { faqPageDataa, setFaqPageData } = useFaqStore((state) => state);
  const [state, setState] = useState(true);
  const [loader, setLoader] = useState(false);
  const [isOpen, setIsOpen] = useState("");

  const toggleOpen = (text: string) => () => {
    if (isOpen === text) {
      setIsOpen(""); // Close the FAQ answer if it's already open
    } else {
      setIsOpen(text); // Open the FAQ answer if it's closed
    }
  };

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
        console.log("response", response);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  };
  console.log("FAQdataupdated", faqPageDataa);
  const faqSections = restructureFaqData(faqPageDataa);

  return (
    // <div></div>
    <div className="min-h-screen flex flex-col">
      <LanguageBar />
      <TopDetail />
      <Navbar />
      {loader ? (
        <div className="h-[850px] p-10 pt-[100px]">
          <LoaderSpin />
        </div>
      ) : (
        // <div className="md:p-[56px] p-[16px] buds-faq-background-image">
        //   <h1 className="text-[#24222B] text-xl font-bold text-gilroy-bold">
        //     {faqPageDataa?.heading?.[0]?.text}
        //   </h1>
        //   <main>

        //   {faqSections?.map((section, index) => (
        //         <FaqSection key={index} title={section.title} items={section.items} />
        //       ))}
        //   </main>
        // </div>
        <div className="md:p-[56px] p-[16px] buds-faq-background-image">
          <div>
            <h1 className="text-[#24222B] text-xl font-bold text-gilroy-bold">
              {faqPageDataa?.heading?.[0]?.text}
            </h1>
            {faqPageDataa?.questionSections?.map(
              (section: any, sectionIndex: any) => (
                <div key={sectionIndex}>
                  <h2 className="text-[#000508] text-base font-bold text-gilroy-semibold mt-[28px] mb-[12px]">
                    {section?.subHeading?.[0]?.text}
                  </h2>
                  {section?.questions?.map(
                    (question: any, questionIndex: any) => (
                      <div className="bg-white rounded-lg border border-neutral-300 mb-4 ">
                        <div className="flex justify-between items-center cursor-pointer md:p-4 p-3">
                          <div key={questionIndex} className="w-[90%]">
                            <h3 className="text-[#666] md:text-base text-[14px] font-medium text-gilroy-medium">
                              {question?.question}
                            </h3>
                          </div>
                          <div
                            className="flex justify-center items-center w-10 h-10"
                            onClick={toggleOpen(question?.question)}
                          >
                            <img
                              src={
                                isOpen === question?.question
                                  ? faqPageDataa?.arrows?.[1]?.img
                                  : faqPageDataa?.arrows?.[0]?.img
                              }
                              alt="toggle"
                              className="md:w-8 md:h-8 w-6 h-6"
                            />
                          </div>
                        </div>
                        {isOpen === question?.question && (
                          <div className=" px-4 pb-4 text-[#666] md:text-base text-[14px] font-normal py-4 border rounded max-h-52 overflow-auto text-gilroy-medium">
                            {Array.isArray(question?.answer) ? (
                              <ul className="list-disc pl-5">
                                {question?.answer?.map(
                                  (answer: any, answerIndex: any) => (
                                    <li key={answerIndex}>{answer}</li>
                                  )
                                )}
                              </ul>
                            ) : (
                              <p>{question?.answer}</p>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>
              )
            )}
          </div>
        </div>
      )}
      <div className="md:pt-24">
        <Footer />
      </div>
    </div>
  );
};
export default Faq;
