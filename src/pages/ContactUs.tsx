import React, { useEffect, useState } from "react";
import { contactUsData } from "../utils/hardText/contactUsTest";
import LanguageBar from "../components/landingPage/LanguageBar";
import TopDetail from "../components/landingPage/TopDetail";
import Navbar from "../components/landingPage/Navbar";
import { useLandingStore } from "../zust/useLandingStore";
import axios from "axios";
import { bffUrl } from "../utils/api";
import Footer from "../components/landingPage/Footer";
import {data} from '../utils/hardText/landingPageText2';

interface ContactUsData {
  contactUs: {
    title: string;
    phoneNumberLabel:string,
    nameLabel:string,
    emailLabel:string,
    addressLabel:string,
    helpdeskDetails: {
      title: string;
      phoneNumbers: string[];
      email: string;
    };
    queriesRelatedToCKYC: {
      title: string;
      name: string;
      phone: string;
      email: string;
    };
    complianceOfficer: {
      title: string;
      name: string;
      phone: string;
      email: string;
    };
    address: {
      title: string;
      details: string;
    };
    complaintRedressalProcess: {
      title: string;
      description: string;
      links: { text: string; url: string }[];
    };
  };
}



const ContactUs: React.FC = () => {
  const {
    title,
    phoneNumberLabel,
    emailLabel,
    nameLabel,
    addressLabel,
    helpdeskDetails,
    queriesRelatedToCKYC,
    complianceOfficer,
    address,
    complaintRedressalProcess,
  } = contactUsData.contactUs;
  const { homePageData, setHomePageData } = useLandingStore((state) => state);
  const [state, setState] = useState(true);
  const [loader, setLoader] = useState(false);
  const mapUrl = "https://www.google.com/maps/embed/v1/place?key=&q=CERSAI%2C%20Tower%20%E2%80%93%201%2C%20Office%20Block%2C%204th%20Floor%2C%20Plate-A%20%28Adjacent%20to%20Ring%20Road%29%2C%20NBCC%2C%20Kidwai%20Nagar%20East%2C%20New%20Delhi%20%E2%80%93%20110023&zoom=13"
  useEffect(() => {
    homePageCmsApi();
  }, [state]);

  const homePageCmsApi = () => {
    setLoader(true);
    setHomePageData(data.data.content)
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

  return (
    <div className="min-h-screen flex flex-col">
      <LanguageBar />
      <TopDetail />
      <Navbar />

      <div className="md:my-[56px] my-[12px] md:px-[56px] px-[16px] w-full">
        <h1 className="text-xl font-bold text-[#24222B] text-gilroy-bold mb-[24px]">
          {title}
        </h1>

        <div className="mb-6">
          <h2 className="md:text-base text-[14px] font-bold text-gilroy-semibold">
            {helpdeskDetails.title}
          </h2>
          <p className="md:text-base text-[14px] font-normal text-gilroy-medium mt-2">
          {phoneNumberLabel}: {helpdeskDetails.phoneNumbers.join(" / ")}
          </p>
          <p className="md:text-base text-[14px] font-normal text-gilroy-medium">
            {emailLabel}:{" "}
            {helpdeskDetails.email.replace("[at]", "@").replace("[dot]", ".")}
          </p>
        </div>
        <div className="md:flex md:flex-row md:gap-x-28 xl:gap-x-52 flex flex-col">
          <div className="mb-6">
            <h2 className="md:text-base text-[14px] font-bold text-gilroy-semibold">
              {queriesRelatedToCKYC.title}
            </h2>
            <p className="md:text-base text-[14px] font-normal text-gilroy-medium mt-2">
              {nameLabel}: {queriesRelatedToCKYC.name}
            </p>
            <p className="md:text-base text-[14px] font-normal text-gilroy-medium">
              {phoneNumberLabel}: {queriesRelatedToCKYC.phone}
            </p>
            <p className="md:text-base text-[14px] font-normal text-gilroy-medium">
              {emailLabel}:{" "}
              {queriesRelatedToCKYC.email
                .replace("[at]", "@")
                .replace("[dot]", ".")}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="md:text-base text-[14px] font-bold text-gilroy-semibold">
              {complianceOfficer.title}
            </h2>
            <p className="md:text-base text-[14px] font-normal text-gilroy-medium mt-2">
              {nameLabel}: {complianceOfficer.name}
            </p>
            <p className="md:text-base text-[14px] font-normal text-gilroy-medium">
              {phoneNumberLabel}: {complianceOfficer.phone}
            </p>
            <p className="md:text-base text-[14px] font-normal text-gilroy-medium">
              {emailLabel}:{" "}
              {complianceOfficer.email
                .replace("[at]", "@")
                .replace("[dot]", ".")}
            </p>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="md:text-base text-[14px] font-bold text-gilroy-semibold">
            {address.title}
          </h2>
          <p className="md:text-base text-[14px] font-normal text-gilroy-medium mt-2">
            {addressLabel}: {address.details}
          </p>
        </div>

        <div className="mb-6">
          <h2 className="md:text-base text-[14px] font-bold text-gilroy-semibold">
            {complaintRedressalProcess.title}
          </h2>
          <p className="md:text-base text-[14px] font-normal text-gilroy-medium mt-2">
            {complaintRedressalProcess.description}
          </p>
          {complaintRedressalProcess.links.map((link, index) => (
            <p key={index} className="">
              <a href={link.url} className="text-blue-500 underline">
                {link.text}
              </a>
            </p>
          ))}
        </div>
      </div>
    
      <div className="w-full" style={{ width: '100%', height: '500px' }}>
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
    </div>
  );
};

export default ContactUs;
