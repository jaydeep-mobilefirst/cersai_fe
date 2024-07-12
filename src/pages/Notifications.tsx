import { useEffect, useState } from "react";
import Footer from "../components/landingPage/Footer";
import LanguageBar from "../components/landingPage/LanguageBar";
import Navbar from "../components/landingPage/Navbar";
import TopDetail from "../components/landingPage/TopDetail";
import NotificationsList from "../components/notifications/NotificationList";
import { useLandingStore } from "../zust/useLandingStore";
import { useNotificationStore } from "../zust/useNotificationStore";
import axios from "axios";
import { bffUrl } from "../utils/api";
import { notifcationsPageData } from "../utils/hardText/notificationsPageText";

const Notifications: React.FC = () => {
  const { homePageData, setHomePageData } = useLandingStore((state) => state);
  const { notificationPageDataa, setNotificationPageData } = useNotificationStore((state) => state);
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
    notificationsPageCmsApi();
  }, [state]);

  const notificationsPageCmsApi = () => {
    setLoader(true);
    // setHomePageData(data.data.content)
    axios
      .get(bffUrl + `/websitecontent/list/3`)
      .then((response) => {
        setNotificationPageData(response?.data?.data?.content?.notificationsPageData);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  };
  console.log("notificationdataupdated", notificationPageDataa);

  return (
    <div className="min-h-screen flex flex-col">
      <LanguageBar />
      <TopDetail />
      <Navbar />
      <div className="buds-faq-background-image">
        <div className="mt-[56px] md:px-[56px] px-[16px] ">
          <h1 className="text-xl font-bold text-[#24222B] text-gilroy-bold mb-[24px]">
            {
              notificationPageDataa
                ?.heading?.[0]?.text
            }
          </h1>
        </div>
        <NotificationsList
          notificationsData={
            notificationPageDataa
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
