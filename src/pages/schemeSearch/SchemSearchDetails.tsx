import LanguageBar from "../../components/landingPage/LanguageBar";
import TopDetail from "../../components/landingPage/TopDetail";
import Navbar from "../../components/landingPage/Navbar";
import Footer from "../../components/landingPage/Footer";
import Accordion from "../../components/customAccordin/CustomAccordin";
import SchemeDetails from "../../components/schemeSearch/schemeDetails";

import EntityDetails from "../../components/schemeSearch/EntityDetails";
import CreatedBy from "../../components/schemeSearch/CreatedBy";
import AuditTrail from "../../components/schemeSearch/AuditTrail";
import { useScreenWidth } from "../../utils/screenSize";
import { useNavigate } from "react-router-dom";

interface AccordionItem {
  header: React.ReactNode;
  content: React.ReactNode;
}

const SchemeSearchDetails: React.FC = () => {
  const screenWidth = useScreenWidth();
  const navigate = useNavigate();
  const accordionItems: AccordionItem[] = [
    {
      header: "Scheme Details",
      content: <SchemeDetails />,
    },
    {
      header: "Entity Details",
      content: <EntityDetails />,
    },
    {
      header: "CreatedBy",
      content: <CreatedBy />,
    },

    {
      header: "Audit Trail",
      content: <AuditTrail />,
    },
  ];

  const onNavigateToBack = () => {
    navigate("/scheme-search");
  };
  return (
    <div className="flex flex-col min-h-screen">
      <LanguageBar />
      <TopDetail />
      <Navbar />
      <div className="mt-8 mb-8 mx-8">
        <Accordion items={accordionItems} />
      </div>

      <div className="mb-8">
        <div
          style={{
            width: `${screenWidth > 1024 ? "calc(100vw - 349px)" : "100vw"}`,
          }}
        >
          <div className="flex flex-row items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="shrink-0"
            >
              <path
                d="M15 6L9 12L15 18"
                stroke="#1D1D1B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <button
              onClick={onNavigateToBack}
              className="text-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#385723]"
            >
              Back
            </button>
          </div>
        </div>
        <div>
          <div className="border-[#E6E6E6] border-[1px] mt-4"></div>
        </div>
      </div>

      <div className="mt-[100px]">
        <Footer />
      </div>
    </div>
  );
};

export default SchemeSearchDetails;
