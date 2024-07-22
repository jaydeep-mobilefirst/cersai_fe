import React, { useEffect, useState } from "react";
import { contactUsData } from "../utils/hardText/contactUsTest";
import LanguageBar from "../components/landingPage/LanguageBar";
import TopDetail from "../components/landingPage/TopDetail";
import Navbar from "../components/landingPage/Navbar";
import { useLandingStore } from "../zust/useLandingStore";
import { useContactUsStore } from "../zust/usContactUsStore";
import axios from "axios";
import { bffUrl } from "../utils/api";
import Footer from "../components/landingPage/Footer";
import { data } from "../utils/hardText/landingPageText2";
import { contactUsPageData } from "../utils/hardText/contactUs";
import LoaderSpin from "../components/LoaderSpin";
import { useLangugaeStore } from "../zust/useLanguageUsStore";
import { hero } from "../utils/hardText/landingpageText";

const ContactUs: React.FC = () => {
  const { homePageData, setHomePageData } = useLandingStore((state) => state);
  const { contactUsPageDataa, setcontactUsPageData } = useContactUsStore((state) => state);
  const {language} = useLangugaeStore((state) => state);
  const [state, setState] = useState(true);
  const [loader, setLoader] = useState(false);
  const mapUrl =
    "https://www.google.com/maps/embed/v1/place?key=&q=CERSAI%2C%20Tower%20%E2%80%93%201%2C%20Office%20Block%2C%204th%20Floor%2C%20Plate-A%20%28Adjacent%20to%20Ring%20Road%29%2C%20NBCC%2C%20Kidwai%20Nagar%20East%2C%20New%20Delhi%20%E2%80%93%20110023&zoom=13";
  useEffect(() => {
    homePageCmsApi();
  }, [state,language]);

  const homePageCmsApi = () => {
    setLoader(true);
    // setHomePageData(data.data.content)
    axios
      .get(bffUrl + `/websitecontent/get/name?wcname=home`,{
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
    contactUsPageCmsApi();
  }, [state,language]);

  const contactUsPageCmsApi = () => {
    setLoader(true);
    // setHomePageData(data.data.content)
    axios
      .get(bffUrl + `/websitecontent/get/name?wcname=contact us`,{
          headers: {
            'Accept-Language': language
        }
      })
      .then((response) => {
        console.log("responsecontactuspage",response)
        setcontactUsPageData(response?.data?.data?.content?.data);
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
      {loader ? (
        <div className="h-[850px] p-10 pt-[100px]">
          <LoaderSpin />
        </div>
      ) : (
        <>
      <div className="md:my-[56px] my-[12px] md:px-[56px] px-[16px] w-full">
        <h1 className="text-xl font-bold text-[#24222B] text-gilroy-bold mb-[24px]">
          {contactUsPageDataa?.heading?.[0]?.text}
        </h1>

        <div className="mb-6">
          <h2 className="md:text-base text-[14px] font-bold text-gilroy-semibold">
            {contactUsPageDataa?.heldDeskHeading?.[0]?.text}
          </h2>
          <p className="md:text-base text-[14px] font-normal text-gilroy-medium mt-2">
            {contactUsPageDataa?.phoneNumberLabel?.[0]?.text}: {contactUsPageDataa?.helpDeskDetails?.[0]?.text}
          </p>
          <p className="md:text-base text-[14px] font-normal text-gilroy-medium">
            {contactUsPageDataa?.emailLabel?.[0]?.text}: {contactUsPageDataa?.helpDeskDetails?.[1]?.text}
          </p>
        </div>
        <div className="md:flex md:flex-row md:gap-x-28 xl:gap-x-52 flex flex-col">
          <div className="mb-6">
            <h2 className="md:text-base text-[14px] font-bold text-gilroy-semibold">
              {contactUsPageDataa?.ckycRegistrationQueriesHeading?.[0]?.text}
            </h2>
            <p className="md:text-base text-[14px] font-normal text-gilroy-medium mt-2">
              {contactUsPageDataa?.nameLabel?.[0]?.text}:{" "}
              {contactUsPageDataa?.ckycRegistrationQueriesDetails?.[0]?.text}
            </p>
            <p className="md:text-base text-[14px] font-normal text-gilroy-medium">
              {contactUsPageDataa?.phoneNumberLabel?.[0]?.text}:{" "}
              {contactUsPageDataa?.ckycRegistrationQueriesDetails?.[1]?.text}
            </p>
            <p className="md:text-base text-[14px] font-normal text-gilroy-medium">
              {contactUsPageDataa?.emailLabel?.[0]?.text}:{" "}
              {contactUsPageDataa?.ckycRegistrationQueriesDetails?.[2]?.text}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="md:text-base text-[14px] font-bold text-gilroy-semibold">
              {contactUsPageDataa?.complainceOfficerHeading?.[0]?.text}
            </h2>
            <p className="md:text-base text-[14px] font-normal text-gilroy-medium mt-2">
              {contactUsPageDataa?.nameLabel?.[0]?.text}:{" "}
              {contactUsPageDataa?.complainceOfficerDetails?.[0]?.text}
            </p>
            <p className="md:text-base text-[14px] font-normal text-gilroy-medium">
              {contactUsPageDataa?.phoneNumberLabel?.[0]?.text}:{" "}
              {contactUsPageDataa?.complainceOfficerDetails?.[1]?.text}
            </p>
            <p className="md:text-base text-[14px] font-normal text-gilroy-medium">
              {contactUsPageDataa?.emailLabel?.[0]?.text}:{" "}
              {contactUsPageDataa?.complainceOfficerDetails?.[2]?.text}
            </p>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="md:text-base text-[14px] font-bold text-gilroy-semibold">
            {contactUsPageDataa?.addressHeading?.[0]?.text}
          </h2>
          <p className="md:text-base text-[14px] font-normal text-gilroy-medium mt-2">
            {contactUsPageDataa?.addressLabel?.[0]?.text}: {contactUsPageDataa?.addressDetails?.[0]?.text}
          </p>
        </div>

        <div className="mb-6">
          <h2 className="md:text-base text-[14px] font-bold text-gilroy-semibold">
            {contactUsPageDataa?.residentailProcessHeading?.[0]?.text}
          </h2>
          <p className="md:text-base text-[14px] font-normal text-gilroy-medium mt-2">
            {contactUsPageDataa?.residentailProcessDetails?.[0]?.text}
          </p>

          <p className="">
            <a href="" className="text-blue-500 underline">
              {contactUsPageDataa?.residentailProcessDetails?.[0]?.link}
            </a>
          </p>

          <p className="">
            <a href="" className="text-blue-500 underline">
              {contactUsPageDataa?.residentailProcessDetails?.[0]?.link2}
            </a>
          </p>
        </div>
      </div>

      <div className="w-full" style={{ width: "100%", height: "500px" }}>
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          src={mapUrl}
          aria-hidden="false"
          title="Google Map"
        ></iframe>
      </div>
      <div className="">
        <Footer />
      </div>
      </>)}
    </div>
  );
};

export default ContactUs;
