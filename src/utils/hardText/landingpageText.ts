import PhoneIcon from "../../assets/images/phoneicon.svg";
import Sms from "../../assets/images/sms.svg";
import Download from "../../assets/images/download.svg";
import mobile from "../../assets/images/mobile.svg";
import link from "../../assets/images/link.svg";
import shieldSearch from "../../assets/images/shieldSearch.svg";
import global from "../../assets/images/global.svg";
import closeCircle from "../../assets/images/white_close.png";

export const languageData = ["English", "हिन्दी"];

export const languageLable = "Language: ";

export const contactDetails = [
  {
    imgsrc: PhoneIcon,
    text: "022 61102592 / 022 50623300",
  },
  {
    imgsrc: Sms,
    text: "helpdesk.ckycindia.in",
  },
  {
    imgsrc: Download,
    text: "Download Helpdesk Query Form",
  },
];
export const authlable = ["Login", "Register"];

// AboutBuds Component
export const aboutBuds = [
  { heading: "About BUDS" },
  {
    description:
      "Central KYC Registry is a centralized repository of KYC records of customers in the financial sector with uniform KYC norms and inter-usability of the KYC records across the sector with an objective to reduce the burden of producing KYC documents and getting those verified every time when the customer creates a new relationship with a financial entity.",
  },
  { click1: "Click here for more details" },
  { click2: "Click here for Board of Directors of CERSAI" },
];
// LatestNewsComp Component
export const latestNewsComp = [
  { button: "Latest News" },
  {
    description:
      "Are you aware about Public Interest Disclosure & Protection of Informer (PIDPI) ? Click here to know.Rejection in upload of KYC records due to mismatch of PIN Code and other matters.",
  },
];
// QueryResolutionComp Component
export const queryResolutionComp = [
  { heading: "Query Resolution Session" },
  { date: "13", month: "Mar" },
  { location: "Location", city: "Mumbai" },
  {
    onlineHeading: "Online Hand-holding session",
    descritpion:
      "Link for the online training session 1 will be shared few hours prior to the meeting.",
  },
  { button: "Book Now" },
];
// AboutBudsHeadingComp Component
export const aboutBudsHeadingComp = [
  { heading: "About BUDS" },
  {
    description:
      "Central KYC Registry is a centralized repository of KYC records of customers in the financial sector with uniform.",
  },
];
export const aboutBudsHeadingComp1 = [
  {
    imageSrc: mobile,
    text: "Ask for your CKYC Identifier now and open account faster with reduced paper-work",
  },
  {
    imageSrc: link,
    text: "CKYC identifier is linked to your KYC data",
  },
  {
    imageSrc: shieldSearch,
    text: "No need to submit your KYC documents at any financial Institution if you have your CKYC identifier",
  },
  {
    imageSrc: global,
    text: "To know more login to ",
    link: "www.ckycindia.in",
  },
];

export const footer = {
  arr: [
    { heading: "Home", link: "#" },
    { heading: "FAQ", link: "#" },
    { heading: "Notifications", link: "#" },
    { heading: "Operating Guidelines", link: "#" },
    { heading: "Downloads", link: "#" },
    { heading: "Training", link: "#" },
    { heading: "Contact Us", link: "#" },
    { heading: "Sitemap", link: "#" },
  ],
};

export const navbar = [
  "HOME",
  "FAQ",
  "NOTIFICATIONS",
  "OPERATING GUIDELINES",
  "DOWNLOADS",
  "TRAINING",
  "CONTACT US",
];

export const hero = [
  {
    title: "Public Search",
    subtitle:
      "General Public can undertake an online search in the Central Register on payment of prescribed fee.",
    btn1: "Scheme Search",
    btn2: "Deposit Taker Search",
  },
  {},
  {},
];

export const registrationFirstPage = [
  { heading: "Entity Type", removeBtn: closeCircle },
  { btn1: "Cacel", btn2: "Select" },
];
export const radioButtons = [
  { id: 1, text: "Deposit Taker" },
  { id: 2, text: "Regulator" },
  { id: 3, text: "Designated Court" },
  { id: 4, text: "Competent Authority" },
];
