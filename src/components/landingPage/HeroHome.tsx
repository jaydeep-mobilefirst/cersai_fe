import React from "react";
import HeroButton from "./HeroButton";
import search_status from "../../assets/images/search-status.svg";
import user_search from "../../assets/images/user-search.svg";
import archive_book from "../../assets/images/archive-book.svg";
import cards from "../../assets/images/cards.svg";

const HeroHome = () => {
  const buttons = [{ text: "Scheme Search" }, { text: "Deposit Taker Search" }];
  return (
    <div className="flex items-center justify-between px-4 lg:px-[100px] py-4 lg:py-[48px] flex-col lg:flex-row landing-hero-bg-image">
      <div className="md:mr-2">
        {" "}
        <div className="text-[34px] w-full text-gilroy-medium text-center lg:text-start">
          Public Search
        </div>
        <div className="xl:w-[485px] w-full text-[16px] leading-[24px] mt-[16px] text-gilroy-regular text-center lg:text-start">
          General Public can undertake an online search in the Central Register
          on payment of prescribed fee.
        </div>
        <div className="buttons-container flex flex-wrap gap-[16px] justify-center lg:justify-start mt-[24px]">
          {buttons.map((menuItem, index) => (
            <HeroButton key={index} text={menuItem.text} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center mt-4 lg:mt-0 flex-col md:-ml-2">
        <div className="flex items-center justify-center flex-col lg:flex-row">
          {cardData1.map((card, index) => (
            <div key={index} className={card.card_class}>
              <div className="ml-[24px] mr-[24px] mt-[32px]">
                <div className={card.class}>
                  <img src={card.image} alt={card.altText} className=" " />
                </div>
                <p className="text-[20px] leading-[24px] mt-[24px]">
                  {card.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center mt-4 lg:mt-8 flex-col lg:flex-row">
          {cardData2.map((card, index) => (
            <div key={index} className={card.card_class}>
              <div className="ml-[24px] mr-[24px] mt-[32px]">
                <div className={card.class}>
                  <img src={card.image} alt={card.altText} className=" " />
                </div>
                <p className="text-[20px] leading-[24px] mt-[24px]">
                  {card.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const cardData1 = [
  {
    image: search_status,
    altText: "search_status",
    title: "Asset Based Search.",
    class:
      "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#D0FCC9]",
    card_class:
      " w-[242px] h-[242px] bg-white rounded-[8px] shadow-custom mb-[34px] lg:mb-0",
  },
  {
    image: archive_book,
    altText: "archive_book",
    title: "Search for Movable, Immovable and Intangible properties.",
    class:
      "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#BBEBF0]",
    card_class:
      "w-[242px] h-[242px] bg-white rounded-[8px] shadow-custom lg:mt-[32px] lg:ml-[32px] mb-[34px] lg:mb-0",
  },
];

const cardData2 = [
  {
    image: cards,
    altText: "cards",
    title: "Borrowers can perform this search based on their PAN, DOB, Name.",
    class:
      "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#E1DFFE]",
    card_class:
      "w-[242px] h-[242px] bg-white rounded-[8px] border-10 shadow-custom lg:mt-[-32px] mb-[34px] lg:mb-0",
  },
  {
    image: user_search,
    altText: "user_search",
    title: "Borrower Based Search.",
    class:
      "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#FDDAFC]",
    card_class:
      "w-[242px] h-[242px] bg-white rounded-[8px] shadow-custom lg:ml-[32px] mb-[34px] lg:mb-0",
  },
];

export default HeroHome;
