// export const data = {
//     status: "success",
//     message: "Home - Website Content",
//     code: 200,
//     data: {
//       id: 1,
//       name: "Home",
//       language_name: "Home",
//       language_alingment: "left",
//       content: {
//         homePageData: {
//           hero: [
//             {
//               name: "btn1",
//               text: "Scheme Search",
//               img: null,
//               link: null,
//             },
//             {
//               name: "btn2",
//               text: "Deposit Taker Search",
//               img: null,
//               link: null,
//             },
//             {
//               name: "title",
//               text: "Public Search",
//               img: null,
//               link: null,
//             },
//             {
//               name: "subtitle",
//               text: "General Public can undertake an online search in the Central Register on payment of prescribed fee.",
//               img: null,
//               link: null,
//             },
//           ],
//           footer: [
//             {
//               name: "home",
//               text: "Home",
//               img: null,
//               link: null,
//             },
//             {
//               name: "faq",
//               text: "FAQ",
//               img: null,
//               link: null,
//             },
//             {
//               name: "notification",
//               text: "Notifications",
//               img: null,
//               link: null,
//             },
//             {
//               name: "Operating guidelines",
//               text: "Operating Guidelines",
//               img: null,
//               link: null,
//             },
//             {
//               name: "downloads",
//               text: "Downloads",
//               img: null,
//               link: null,
//             },
//             {
//               name: "contactus",
//               text: "Contact Us",
//               img: null,
//               link: null,
//             },
//             {
//               name: "sitemap",
//               text: "Sitemap",
//               img: null,
//               link: null,
//             },
//           ],
  
//           navbar: [
//             {
//               name: "home",
//               text: "HOME",
//               img: null,
//               link: null,
//             },
//             {
//               name: "faq",
//               text: "FAQ",
//               img: null,
//               link: null,
//             },
//             {
//               name: "notification",
//               text: "NOTIFICATIONS",
//               img: null,
//               link: null,
//             },
//             {
//               name: "Operating guidelines",
//               text: "OPERATING GUIDELINES",
//               img: null,
//               link: null,
//             },
//             {
//               name: "downloads",
//               text: "DOWNLOADS",
//               img: null,
//               link: null,
//             },
//             {
//               name: "contactus",
//               text: "CONTACT US",
//               img: null,
//               link: null,
//             },
//           ],
  
//           authlable: [
//             {
//               name: "Login",
//               text: "Login",
//               img: null,
//               link: null,
//             },
//             {
//               name: "Register",
//               text: "Register",
//               img: null,
//               link: null,
//             },
//           ],
//           languageData: [
//             {
//               name: "English",
//               text: "English",
//               img: null,
//               link: null,
//             },
//             {
//               name: "हिन्दी",
//               text: "हिन्दी",
//               img: null,
//               link: null,
//             },
//           ],
//           languageLable: [
//             {
//               name: "Language:ss",
//               text: "Language:ss",
//               img: null,
//               link: null,
//             },
//           ],
//         },
//       },
//     },
//   };


import { useLandingStore } from "../../zust/useLandingStore";
import Logo from "../../assets/images/logo.svg";
import PhoneIcon from "../../assets/images/new_images/call-calling.png";
import Sms from "../../assets/images/new_images/sms.png";
import Download from "../../assets/images/new_images/document-text.png";
import mobile from "../../assets/images/new_images/mobile.png";
import link from "../../assets/images/new_images/link-2.png";
import shieldSearch from "../../assets/images/new_images/shield-search.png";
import global from "../../assets/images/new_images/global.png";
import search_status from "../../assets/images/search-status.svg";
import user_search from "../../assets/images/user-search.svg";
import archive_book from "../../assets/images/archive-book.svg";
import cards from "../../assets/images/cards.svg";

export const data = {
  status: "success",
  message: "Home - Website Content",
  code: 200,
  data: {
    id: 1,
    name: "Home",
    language_name: "Home",
    language_alingment: "left",
    content: {
      homePageData: {
        hero: [
          {
            name: "btn1",
            text: "Scheme Search",
            img: null,
            link: null,
          },
          {
            name: "btn2",
            text: "Deposit Taker Search",
            img: null,
            link: null,
          },
          {
            name: "title",
            text: "Public Search",
            img: null,
            link: null,
          },
          {
            name: "subtitle",
            text: "General Public can undertake an online search in the Central Register on payment of prescribed fee.",
            img: null,
            link: null,
          },
        ],
        footer: [
          {
            name: "home",
            text: "Home",
            img: null,
            link: null,
          },
          {
            name: "faq",
            text: "FAQ",
            img: null,
            link: null,
          },
          {
            name: "notification",
            text: "Notifications",
            img: null,
            link: null,
          },
          {
            name: "Operating guidelines",
            text: "Operating Guidelines",
            img: null,
            link: null,
          },
          {
            name: "downloads",
            text: "Downloads",
            img: null,
            link: null,
          },
          {
            name: "contactus",
            text: "Contact Us",
            img: null,
            link: null,
          },
          {
            name: "sitemap",
            text: "Sitemap",
            img: null,
            link: null,
          },
        ],
        footerDescription: [
          {
            name: "text",
            text: "COPYRIGHT © 2021 CBRS AI. ALL RIGHTS RESERVED.",
            img: null,
            link: null,
          },
          {
            name: "text",
            text: "Powered and managed by",
            img: null,
            link: "NSE Data and Analytics Limited",
          },
        ],

        navbar: [
          {
            name: "home",
            text: "Home",
            img: null,
            link: null,
          },
          {
            name: "faq",
            text: "FAQ",
            img: null,
            link: null,
          },
          {
            name: "notification",
            text: "Notifications",
            img: null,
            link: null,
          },
          {
            name: "Operating guidelines",
            text: "Operating Guidelines",
            img: null,
            link: null,
          },
          {
            name: "downloads",
            text: "Downloads",
            img: null,
            link: null,
          },
          {
            name: "contactus",
            text: "Contact Us",
            img: null,
            link: null,
          },
        ],

        authlable: [
          {
            name: "Login",
            text: "Login",
            img: null,
            link: null,
          },
          {
            name: "Register",
            text: "Register",
            img: null,
            link: null,
          },
        ],
        languageData: [
          {
            name: "English",
            text: "English",
            img: null,
            link: null,
          },
          {
            name: "हिन्दी",
            text: "हिन्दी",
            img: null,
            link: null,
          },
        ],
        languageLable: [
          {
            name: "Language: ",
            text: "Language: ",
            img: null,
            link: null,
          },
        ],
        authbuds: [
          {
            name: "heading",
            text: "About BUDS",
            img: null,
            link: null,
          },
          {
            name: "description",
            text: "Central KYC Registry is a centralized repository of KYC records of customers in the financial sector with uniform KYC norms and inter-usability of the KYC records across the sector with an objective to reduce the burden of producing KYC documents and getting those verified every time when the customer creates a new relationship with a financial entity.",
            img: null,
            link: null,
          },
          {
            name: "url1",
            text: "Click here for more details",
            img: null,
            link: "https://www.ckycindia.in/ckyc/assets/images/about_us.pdf",
          },
          {
            name: "url2",
            text: "Click here for Board of Directors of CERSAI",
            img: null,
            link: "https://www.ckycindia.in/ckyc/assets/doc/Board_of_Directors_April_2024.pdf",
          },
        ],
        logo:[
          
          {
            name: "Logo",
            text: null,
            img: "http://dev.niyamitnivesh.in/static/media/logo.f7c7f092bb5e20589263f3889ca000e1.svg",
            link: null,
          },
        ],
        contactDetails: [
          {
            name: "contact details",
            text: "022 61102592 / 022 50623300",
            img: "https://res.cloudinary.com/dvcd5kmjq/image/upload/v1720612090/call-calling_r6gjxn.png",
            link: null,
          },
          {
            name: "email",
            text: "helpdesk.ckycindia.in",
            img: "https://res.cloudinary.com/dvcd5kmjq/image/upload/v1720612091/sms_ldnzzo.png",
            link: null,
          },
          {
            name: "download",
            text: "Download Helpdesk Query Form",
            img: "https://res.cloudinary.com/dvcd5kmjq/image/upload/v1720612090/document-text_s499hr.png",
            link: null,
          },
        ],
        latestNewsComp: [
          {
            name: "button",
            text: "Latest News",
            img: null,
            link: null,
          },
          {
            name: "description",
            text: "Are you aware about Public Interest Disclosure & Protection of Informer (PIDPI) ? Click here to know. Rejection in upload of KYC records due to mismatch of PIN Code and other matters.",
            img: null,
            link: null,
          },
        ],
        aboutBudsHeadingComp: [
          {
            name: "heading",
            text: "About BUDS",
            img: null,
            link: null,
          },
          {
            name: "description",
            text: "Central KYC Registry is a centralized repository of KYC records of customers in the financial sector with uniform.",
            img: null,
            link: null,
          },
        ],
        aboutBudsHeadingComp1: [
          {
            name: "text",
            text: "Ask for your CKYC Identifier now and open account faster with reduced paper-work",
            img: "https://res.cloudinary.com/dvcd5kmjq/image/upload/v1720611809/cersai/ufj4k50gd9gpwjfgim7p.png",
            link: null,
          },
          {
            name: "text",
            text: "CKYC identifier is linked to your KYC data",
            img: "https://res.cloudinary.com/dvcd5kmjq/image/upload/v1720612090/link-2_coohi2.png",
            link: null,
          },
          {
            name: "text",
            text: "No need to submit your KYC documents at any financial Institution if you have your CKYC identifier",
            img: "https://res.cloudinary.com/dvcd5kmjq/image/upload/v1720611835/cersai/vy4u8keyebck9a0hgepn.png",
            link: null,
          },
          {
            name: "text",
            text: "To know more login to ",
            img: "https://res.cloudinary.com/dvcd5kmjq/image/upload/v1720612090/global_vy6jsh.png",
            link: "www.ckycindia.in",
          },
        ],
        
        aboutBudsComp: [
          {
            name: "heading",
            text: "About BUDS",
            img: null,
            link: null,
          },
          {
            name: "description",
            text: "Central KYC Registry is a centralized repository of KYC records of customers in the financial sector with uniform KYC norms and inter-usability of the KYC records across the sector with an objective to reduce the burden of producing KYC documents and getting those verified every time when the customer creates a new relationship with a financial entity.",
            img: null,
            link: null,
          },
          {
            name: "text",
            text: null,
            img: null,
            link: "Click here for more details",
          },
          {
            name: "text",
            text: null,
            img: null,
            link: "Click here for Board of Directors of CERSAI",
          },
          {
            name: "text",
            text: null,
            img: null,
            link: "https://www.youtube.com/embed/FF3fuYLnApQ",
          },

        ],
        carousel: [
          {
            name: "text",
            text: "Asset Based Search.",
            img: "http://dev.niyamitnivesh.in/static/media/search-status.26e2ceb681e7105c2a1e803338a1c11d.svg",
            link: null,
            altText: "search_status",
            class: "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#D0FCC9]",
            card_class: "w-[242px] h-[242px] bg-white rounded-[8px] shadow-custom mb-[34px] lg:mb-0",
          },
          {
            name: "image",
            text: "Search for Movable, Immovable and Intangible properties.",
            img: "http://dev.niyamitnivesh.in/static/media/archive-book.da477b2f2e7c6105230485b3ab08fcd3.svg",
            link: null,
            altText: "archive_book",
            class: "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#BBEBF0]",
            card_class: "w-[242px] h-[242px] bg-white rounded-[8px] shadow-custom md:mt-[32px] lg:ml-[32px] mb-[34px] lg:mb-0",
          },
          {
            name: "image",
            text: "Borrowers can perform this search based on their PAN, DOB, Name.",
            img: "http://dev.niyamitnivesh.in/static/media/cards.41c1236db14acae776432047266d0265.svg",
            link: null,
            altText: "cards",
            class: "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#E1DFFE]",
            card_class: "w-[242px] h-[242px] bg-white rounded-[8px] border-10 shadow-custom  mb-[34px] lg:mb-0",
          },
          {
            name: "image",
            text: "Borrower Based Search.",
            img: "http://dev.niyamitnivesh.in/static/media/user-search.fe81db1509bf21fe879fe3cde64db9e0.svg",
            link: null,
            altText: "user_search",
            class: "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#FDDAFC]",
            card_class: "w-[242px] h-[242px] bg-white rounded-[8px] shadow-custom lg:ml-[32px] md:mt-[32px]  mb-[34px] lg:mb-0",
          },
          {
            name: "image",
            text: "Asset Based Search.",
            img: "http://dev.niyamitnivesh.in/static/media/search-status.26e2ceb681e7105c2a1e803338a1c11d.svg",
            link: null,
            altText: "search_status",
            class: "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#D0FCC9]",
            card_class: "w-[242px] h-[242px] bg-white rounded-[8px] shadow-custom mb-[34px] lg:mb-0",
          },
          {
            name: "image",
            text: "Search for Movable, Immovable and Intangible properties.",
            img: "http://dev.niyamitnivesh.in/static/media/archive-book.da477b2f2e7c6105230485b3ab08fcd3.svg",
            link: null,
            altText: "archive_book",
            class: "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#BBEBF0]",
            card_class: "w-[242px] h-[242px] bg-white rounded-[8px] shadow-custom md:mt-[32px] lg:ml-[32px] mb-[34px] lg:mb-0",
          },
          {
            name: "image",
            text: "Borrowers can perform this search based on their PAN, DOB, Name.",
            img: "http://dev.niyamitnivesh.in/static/media/cards.41c1236db14acae776432047266d0265.svg",
            link: null,
            altText: "cards",
            class: "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#E1DFFE]",
            card_class: "w-[242px] h-[242px] bg-white rounded-[8px] border-10 shadow-custom   mb-[34px] lg:mb-0",
          },
          {
            name: "image",
            text: "Borrower Based Search.",
            img: "http://dev.niyamitnivesh.in/static/media/user-search.fe81db1509bf21fe879fe3cde64db9e0.svg",
            link: null,
            altText: "user_search",
            class: "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#FDDAFC]",
            card_class: "w-[242px] h-[242px] bg-white rounded-[8px] shadow-custom lg:ml-[32px] md:mt-[32px] mb-[34px] lg:mb-0",
          },
          {
            name: "image",
            text: "Asset Based Search.",
            img: "http://dev.niyamitnivesh.in/static/media/search-status.26e2ceb681e7105c2a1e803338a1c11d.svg",
            link: null,
            altText: "search_status",
            class: "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#D0FCC9]",
            card_class: "w-[242px] h-[242px] bg-white rounded-[8px] shadow-custom mb-[34px] lg:mb-0",
          },
          {
            name: "image",
            text: "Search for Movable, Immovable and Intangible properties.",
            img: "http://dev.niyamitnivesh.in/static/media/archive-book.da477b2f2e7c6105230485b3ab08fcd3.svg",
            link: null,
            altText: "archive_book",
            class: "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#BBEBF0]",
            card_class: "w-[242px] h-[242px] bg-white rounded-[8px] shadow-custom md:mt-[32px] lg:ml-[32px] mb-[34px] lg:mb-0",
          },
          {
            name: "image",
            text: "Borrower Based Search.",
            img: "http://dev.niyamitnivesh.in/static/media/user-search.fe81db1509bf21fe879fe3cde64db9e0.svg",
            link: null,
            altText: "user_search",
            class: "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#FDDAFC]",
            card_class: "w-[242px] h-[242px] bg-white rounded-[8px] shadow-custom mb-[34px] lg:mb-0",
          },
          {
            name: "image",
            text: "Borrower Based Search.",
            img: "http://dev.niyamitnivesh.in/static/media/user-search.fe81db1509bf21fe879fe3cde64db9e0.svg",
            link: null,
            altText: "user_search",
            class: "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#FDDAFC]",
            card_class: "w-[242px] h-[242px] bg-white rounded-[8px] shadow-custom lg:ml-[32px] md:mt-[32px] mb-[34px] lg:mb-0",
          },
        ]
        
      },
    },
  },
};
