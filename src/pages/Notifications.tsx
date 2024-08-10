import { useEffect, useState } from "react";
import Footer from "../components/landingPage/Footer";
import LanguageBar from "../components/landingPage/LanguageBar";
import Navbar from "../components/landingPage/Navbar";
import TopDetail from "../components/landingPage/TopDetail";
import NotificationsList from "../components/notifications/NotificationList";
import { useLandingStore } from "../zust/useLandingStore";
import { useNotificationStore } from "../zust/useNotificationStore";
import { notifcationsPageData } from "../utils/hardText/notificationsPageText";
import LoaderSpin from "../components/LoaderSpin";
import { useLangugaeStore } from "../zust/useLanguageUsStore";
import { axiosTraceIdInstance } from "../utils/axios";

const Notifications: React.FC = () => {
  const { homePageData, setHomePageData } = useLandingStore((state) => state);
  const {language} = useLangugaeStore((state) => state);
  const { notificationPageDataa, setNotificationPageData } =
    useNotificationStore((state) => state);
  const [state, setState] = useState(true);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    homePageCmsApi();
  }, [state,language]);

  const homePageCmsApi = () => {
    setLoader(true);
    // setHomePageData(data.data.content)
    axiosTraceIdInstance
      .get(`/websitecontent/get/name?wcname=home`,{
        headers: {
          'Accept-Language': language
        }
    })
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
  }, [state,language]);

  const notificationsPageCmsApi = () => {
    setLoader(true);
    // setHomePageData(data.data.content)
    axiosTraceIdInstance
      .get(`/websitecontent/get/name?wcname=notification`,{
        headers: {
          'Accept-Language': language
        }
      })
      .then((response) => {
        setNotificationPageData(
          response?.data?.data?.content?.data?.[0]?.notificationsPageData
        );
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
      {loader ? (
        <div className="h-[850px] p-10 pt-[100px]">
          <LoaderSpin />
        </div>
      ) : notificationPageDataa?.heading?.length >0 ?(
        <div className="buds-faq-background-image">
          <div className="mt-[56px] md:px-[56px] px-[16px] ">
            <h1 className="text-xl font-bold text-[#24222B] text-gilroy-bold mb-[24px]">
              {notificationPageDataa?.heading?.[0]?.text}
            </h1>
          </div>
          <NotificationsList notificationsData={notificationPageDataa} />

          
        </div>
      ):(
        <div className="flex justify-center items-center h-[450px] text-xl font-bold text-[#24222B] text-gilroy-bold">
          <h1>No data available</h1>
        </div>
      )}
      <div className={` ${notificationPageDataa?.notifications?.length <=6 ? "mt-[600px]":"mt-[124px]"}`}>
            <Footer />
          </div>
    </div>
  );
};
export default Notifications;
