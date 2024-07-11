import { useEffect, useState } from "react";
import Footer from "../components/landingPage/Footer";
import LanguageBar from "../components/landingPage/LanguageBar";
import Navbar from "../components/landingPage/Navbar";
import TopDetail from "../components/landingPage/TopDetail";
import NotificationsList from "../components/notifications/NotificationList";
import { useLandingStore } from "../zust/useLandingStore";
import axios from "axios";
import { bffUrl } from "../utils/api";
import { data } from "../utils/hardText/landingPageText2";
import { notifcationsPageData } from "../utils/hardText/notificationsPageText";

const Notifications: React.FC = () => {
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
        setHomePageData(response?.data?.data?.content?.updatedStructure);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  };
  console.log("notificationdata", notifcationsPageData);

  return (
    <div className="min-h-screen flex flex-col">
      <LanguageBar />
      <TopDetail />
      <Navbar />
      <div className="buds-faq-background-image">
        <div className="mt-[56px] md:px-[56px] px-[16px] ">
          <h1 className="text-xl font-bold text-[#24222B] text-gilroy-bold mb-[24px]">
            {
              notifcationsPageData?.data?.content?.notificationsPageData
                ?.heading[0]?.text
            }
          </h1>
        </div>
        <NotificationsList
          notificationsData={
            notifcationsPageData?.data?.content?.notificationsPageData
          }
        />
        <div className="md:mt-[124px]">
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default Notifications;
