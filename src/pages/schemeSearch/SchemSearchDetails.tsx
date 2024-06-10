import LanguageBar from "../../components/landingPage/LanguageBar";
import TopDetail from "../../components/landingPage/TopDetail";
import Navbar from "../../components/landingPage/Navbar";
import Footer from "../../components/landingPage/Footer";
import Accordion from "../../components/customAccordin/CustomAccordin";
import SchemeDetails from "../../components/schemeSearch/schemeDetails";
import AuditTrail from "../../components/ScehmaManagement/AuditTrail";

interface AccordionItem {
  header: React.ReactNode;
  content: React.ReactNode;
}

const SchemeSearchDetails: React.FC = () => {
  const accordionItems: AccordionItem[] = [
    {
      header: "Scheme Details",
      content: <SchemeDetails />,
    },

    {
      header: "Audit Trail",
      content: <AuditTrail />,
    },
  ];
  return (
    <div>
      <LanguageBar />
      <TopDetail />
      <Navbar />
      <div className="mt-8">
        <Accordion items={accordionItems} />
      </div>
    </div>
  );
};

export default SchemeSearchDetails;
