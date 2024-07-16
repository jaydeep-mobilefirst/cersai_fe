// import React from "react";
// import HeroButton from "./HeroButton";
// import search_status from "../../assets/images/search-status.svg";
// import user_search from "../../assets/images/user-search.svg";
// import archive_book from "../../assets/images/archive-book.svg";
// import cards from "../../assets/images/cards.svg";
// import { useNavigate } from "react-router-dom";

// const HeroHome = () => {

//   const navigate = useNavigate();
//   const buttons = [{ text: "Scheme Search" }, { text: "Deposit Taker Search" }];

//   const onNavigateToSchemeSearch = (text: string) => {
//     if (text === "Scheme Search") {
//       navigate("/scheme-search");
//     } else {
//       navigate("/deposite-taker-search");
//     }
//   };

//   return (
//     <div className="flex items-center justify-between px-4 lg:px-[100px] py-4 lg:py-[48px] flex-col lg:flex-row landing-hero-bg-image">
//       <div className="md:mr-2">
//         {" "}
//         <div className="text-[34px] w-full text-gilroy-medium text-center lg:text-start">
//           Public Search
//         </div>
//         <div className="xl:w-[485px] w-full text-[16px] leading-[24px] mt-[16px] text-gilroy-regular text-center lg:text-start">
//           General Public can undertake an online search in the Central Register
//           on payment of prescribed fee.
//         </div>
//         <div
//           className="buttons-container flex flex-wrap gap-[16px] justify-center lg:justify-start mt-[24px]"
//           // onClick={onNavigateToSchemeSearch}
//         >
//           {buttons.map((menuItem, index) => (
//             <HeroButton
//               key={index}
//               text={menuItem.text}
//               onClick={onNavigateToSchemeSearch}
//             />
//           ))}
//         </div>
//       </div>
//       <div className="flex items-center justify-center mt-4 lg:mt-0 flex-col md:-ml-2">
//         <div className="flex items-center justify-center flex-col lg:flex-row">
//           {/* <Carousel responsive={responsive}> */}
//             {cardData1.map((card, index) => (
//               <div key={index} className={card.card_class}>
//                 <div className="ml-[24px] mr-[24px] mt-[32px]">
//                   <div className={card.class}>
//                     <img src={card.image} alt={card.altText} className=" " />
//                   </div>
//                   <p className="text-[20px] leading-[24px] mt-[24px] text-gilroy-medium">
//                     {card.title}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           {/* </Carousel> */}
//         </div>

//         <div className="flex items-center justify-center mt-4 lg:mt-8 flex-col lg:flex-row">
//           {cardData2.map((card, index) => (
//             <div key={index} className={card.card_class}>
//               <div className="ml-[24px] mr-[24px] mt-[32px]">
//                 <div className={card.class}>
//                   <img src={card.image} alt={card.altText} className=" " />
//                 </div>
//                 <p className="text-[20px] leading-[24px] mt-[24px]">
//                   {card.title}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const cardData1 = [
//   {
//     image: search_status,
//     altText: "search_status",
//     title: "Asset Based Search.",
//     class:
//       "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#D0FCC9]",
//     card_class:
//       " w-[242px] h-[242px] bg-white rounded-[8px] shadow-custom mb-[34px] lg:mb-0",
//   },
//   {
//     image: archive_book,
//     altText: "archive_book",
//     title: "Search for Movable, Immovable and Intangible properties.",
//     class:
//       "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#BBEBF0]",
//     card_class:
//       "w-[242px] h-[242px] bg-white rounded-[8px] shadow-custom lg:mt-[32px] lg:ml-[32px] mb-[34px] lg:mb-0",
//   },
// ];

// const cardData2 = [
//   {
//     image: cards,
//     altText: "cards",
//     title: "Borrowers can perform this search based on their PAN, DOB, Name.",
//     class:
//       "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#E1DFFE]",
//     card_class:
//       "w-[242px] h-[242px] bg-white rounded-[8px] border-10 shadow-custom lg:mt-[-32px] mb-[34px] lg:mb-0",
//   },
//   {
//     image: user_search,
//     altText: "user_search",
//     title: "Borrower Based Search.",
//     class:
//       "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#FDDAFC]",
//     card_class:
//       "w-[242px] h-[242px] bg-white rounded-[8px] shadow-custom lg:ml-[32px] mb-[34px] lg:mb-0",
//   },
// ];

// export default HeroHome;

import React from "react";
import HeroButton from "./HeroButton";
import search_status from "../../assets/images/search-status.svg";
import user_search from "../../assets/images/user-search.svg";
import archive_book from "../../assets/images/archive-book.svg";
import cards from "../../assets/images/cards.svg";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useLandingStore } from "../../zust/useLandingStore";
import {data} from '../../utils/hardText/landingPageText2';

const HeroHome = () => {
  const { homePageData } = useLandingStore((state) => state);
  const navigate = useNavigate();
  const buttons = [{ text: homePageData?.homePageData?.hero[0]?.text }, { text: homePageData?.homePageData?.hero[1]?.text }];

  const onNavigateToSchemeSearch = (text: string) => {
    if (text === "Scheme Search") {
      navigate("/scheme-search");
    } else {
      navigate("/deposite-taker-search");
    }
  };

  const chunkArray = (array: any[], chunkSize: number): any[][] => {
    const chunks = [];
    for (let i = 0; i < array?.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };


  const groupedCardData1 = chunkArray(homePageData?.homePageData?.carousel, 4); // Update chunk size to 4
  console.log("4 data", groupedCardData1);

 

  return (
    <div className="w-[100%] flex items-center justify-between px-4 lg:px-[100px] py-4 lg:py-[48px] flex-col lg:flex-row landing-hero-bg-image overflow-x-hidden">
      <div className="md:mr-2 md:w-[40%]">
        <div className="text-[34px] w-full text-gilroy-medium text-center lg:text-start">
          {homePageData?.homePageData?.hero[2]?.text}
        </div>
        <div className="xl:w-[485px] w-full text-[16px] leading-[24px] mt-[16px] text-gilroy-regular text-center lg:text-start">
        {homePageData?.homePageData?.hero[3]?.text}
        </div>
        <div className="buttons-container flex flex-wrap gap-[16px] justify-center lg:justify-start mt-[24px]">
          {buttons?.map((menuItem, index) => (
            <HeroButton
              key={index}
              text={menuItem?.text}
              onClick={onNavigateToSchemeSearch}
            />
          ))}
        </div>
      </div>
      <div className="md:w-[50%] w-full md:flex md:items-center md:justify-center mt-4 lg:mt-0 md:flex-col md:-ml-2 hidden -z-0">
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={5000}
        >
          {groupedCardData1?.map((group, index) => (
            <div
              key={index}
              className="flex flex-col items-center md:flex-wrap md:justify-center md:px-12 px-4 py-2 pb-12"
            >
              <div className="flex flex-col md:flex-row gap-x-12 md:gap-x-0">
                {group?.slice(0, 2).map(
                  (
                    card,
                    index 
                  ) => (
                    <div key={index}  className={`w-[242px] h-[242px] bg-white rounded-[8px] shadow-custom p-2 ${
                      index === 1 ? "md:mt-[32px] md:ml-[32px]" : ""
                    }`} >
                      {" "}
                      <div className={` pl-[24px] pr-[24px] pt-[32px] `} >
                        <div className="flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#FDDAFC]">
                          <img
                            src={card?.img}
                            alt={card?.altText}
                            className="w-[56px] h-[56px]"
                          />
                        </div>
                        <p className="text-[18px] text-left leading-[24px] mt-[24px] text-gilroy-medium">
                          {card?.text}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className="flex flex-col md:flex-row gap-x-12 md:gap-x-0">
                {group.slice(2, 4).map(
                  (
                    card,
                    index 
                  ) => (
                    <div key={index} className={`w-[242px] h-[242px] bg-white rounded-[8px] shadow-custom p-2 ${
                      index === 1 ? "md:mt-[32px]" : "md:mr-[32px]"
                    }` } >
                      {" "}
                      <div className={`pl-[24px] pr-[24px] pt-[32px]  `} >
                        <div className="flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#FDDAFC]">
                          <img
                            src={card?.img}
                            alt={card?.altText}
                            className="w-[56px] h-[56px]"
                          />
                        </div>
                        <p className="text-[18px] text-left leading-[24px] mt-[24px] text-gilroy-medium">
                          {card?.text}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="mt-[32px] md:hidden -z-0">
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={5000}
        >
          {homePageData?.homePageData?.carousel?.map((card:any, index:any) => (
            <div className="flex flex-row items-center justify-center">
              <div key={index} className={card?.card_class}>
                <div className="ml-[24px] mr-[24px] mt-[32px]">
                  <div className={card?.class}>
                    <img src={card?.img} alt={card?.altText} className="w-[56px] h-[56px]" />
                  </div>
                  <p className="text-[20px] text-left leading-[24px] mt-[24px] text-gilroy-medium">
                    {card?.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

interface CardData {
  image: string;
  altText: string;
  title: string;
  class: string;
  card_class: string;
}

const cardData1: CardData[] = [
  {
    image: search_status,
    altText: "search_status",
    title: "Asset Based Search.",
    class:
      "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#D0FCC9]",
    card_class:
      "w-[242px] h-[242px] bg-white rounded-[8px] shadow-custom mb-[34px] lg:mb-0",
  },
  {
    image: archive_book,
    altText: "archive_book",
    title: "Search for Movable, Immovable and Intangible properties.",
    class:
      "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#BBEBF0]",
    card_class:
      "w-[242px] h-[242px] bg-white rounded-[8px] shadow-custom md:mt-[32px] lg:ml-[32px] mb-[34px] lg:mb-0",
  },
  {
    image: cards,
    altText: "cards",
    title: "Borrowers can perform this search based on their PAN, DOB, Name.",
    class:
      "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#E1DFFE]",
    card_class:
      "w-[242px] h-[242px] bg-white rounded-[8px] border-10 shadow-custom  mb-[34px] lg:mb-0",
  },
  {
    image: user_search,
    altText: "user_search",
    title: "Borrower Based Search.",
    class:
      "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#FDDAFC]",
    card_class:
      "w-[242px] h-[242px] bg-white rounded-[8px] shadow-custom lg:ml-[32px] md:mt-[32px]  mb-[34px] lg:mb-0",
  },
  {
    image: search_status,
    altText: "search_status",
    title: "Asset Based Search.",
    class:
      "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#D0FCC9]",
    card_class:
      "w-[242px] h-[242px] bg-white rounded-[8px] shadow-custom mb-[34px] lg:mb-0",
  },
  {
    image: archive_book,
    altText: "archive_book",
    title: "Search for Movable, Immovable and Intangible properties.",
    class:
      "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#BBEBF0]",
    card_class:
      "w-[242px] h-[242px] bg-white rounded-[8px] shadow-custom md:mt-[32px] lg:ml-[32px] mb-[34px] lg:mb-0",
  },
  {
    image: cards,
    altText: "cards",
    title: "Borrowers can perform this search based on their PAN, DOB, Name.",
    class:
      "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#E1DFFE]",
    card_class:
      "w-[242px] h-[242px] bg-white rounded-[8px] border-10 shadow-custom   mb-[34px] lg:mb-0",
  },
  {
    image: user_search,
    altText: "user_search",
    title: "Borrower Based Search.",
    class:
      "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#FDDAFC]",
    card_class:
      "w-[242px] h-[242px] bg-white rounded-[8px] shadow-custom lg:ml-[32px] md:mt-[32px] mb-[34px] lg:mb-0",
  },
  {
    image: search_status,
    altText: "search_status",
    title: "Asset Based Search.",
    class:
      "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#D0FCC9]",
    card_class:
      "w-[242px] h-[242px] bg-white rounded-[8px] shadow-custom mb-[34px] lg:mb-0",
  },
  {
    image: archive_book,
    altText: "archive_book",
    title: "Search for Movable, Immovable and Intangible properties.",
    class:
      "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#BBEBF0]",
    card_class:
      "w-[242px] h-[242px] bg-white rounded-[8px] shadow-custom md:mt-[32px] lg:ml-[32px] mb-[34px] lg:mb-0",
  },
  {
    image: user_search,
    altText: "user_search",
    title: "Borrower Based Search.",
    class:
      "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#FDDAFC]",
    card_class:
      "w-[242px] h-[242px] bg-white rounded-[8px] shadow-custom mb-[34px] lg:mb-0",
  },
  {
    image: user_search,
    altText: "user_search",
    title: "Borrower Based Search.",
    class:
      "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#FDDAFC]",
    card_class:
      "w-[242px] h-[242px] bg-white rounded-[8px] shadow-custom lg:ml-[32px] md:mt-[32px] mb-[34px] lg:mb-0",
  },
];

export default HeroHome;