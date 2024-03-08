import React from "react";
import HeroButton from "./HeroButton";
import search_status from "../../assets/images/search-status.svg";
import user_search from "../../assets/images/user-search.svg";
import archive_book from "../../assets/images/archive-book.svg";
import cards from "../../assets/images/cards.svg";
import Vector from "../../assets/images/Vector.svg";

const Hero = () => {
  const buttons = [{ text: "Scheme Search" }, { text: "Deposit Taker Search" }];

  return (
    <div className="container mx-auto">
      <div className="lg:flex justify-center items-start lg:justify-between">
        {/* Left side */}
        <div className=" m-[16px] lg:w-[484.44px] lg:h-[166px] lg:ml-[169px] lg:mt-[191px] w-full justify-center lg:justify-start text-center lg:text-left">
          <div className="text-[34px] w-full">Public Search</div>
          <div className="description w-full opacity-80 text-[16px] leading-[24px] mt-[16px] text-wrap">
            General Public can undertake an online search in the Central
            Register on payment of prescribed fee.
          </div>
          <div className="buttons-container flex flex-wrap gap-[16px] justify-center lg:justify-start mt-[24px]">
            {buttons.map((menuItem, index) => (
              <HeroButton key={index} text={menuItem.text} />
            ))}
          </div>
        </div>

        {/* Right side */}
        <div className="w-full lg:w-[717px] relative lg:mx-auto">
          <img src={Vector} alt="" className="opacity-500" />
          <div className="space-x-4 space-y-4 absolute inset-y-0 z-10 w-full lg:w-[516px] lg:h-[548px] h-full flex flex-wrap justify-center lg:justify-start lg:ml-[90.44px] lg:mr-auto lg:mt-0 mt-[20px]">
            {cardData.map((card, index) => (
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
    </div>
  );
};

const cardData = [
  {
    image: search_status,
    altText: "search_status",
    title: "Asset Based Search.",
    class:
      "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#D0FCC9]",
    card_class: " w-[242px] h-[242px] bg-white rounded-[8px] shadow-md  ",
  },
  {
    image: archive_book,
    altText: "archive_book",
    title: "Search for Movable, Immovable and Intangible properties.",
    class:
      "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#BBEBF0]",
    card_class:
      "w-[242px] h-[242px] bg-white rounded-[8px] shadow-md lg:mt-[32px] lg:ml-[32px]",
  },
  {
    image: cards,
    altText: "cards",
    title: "Borrowers can perform this search based on their PAN, DOB, Name.",
    class:
      "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#E1DFFE]",
    card_class:
      "w-[242px] h-[242px] bg-white rounded-[8px] shadow-md lg:mt-[-32px]",
  },
  {
    image: user_search,
    altText: "user_search",
    title: "Borrower Based Search.",
    class:
      "flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#FDDAFC]",
    card_class:
      "w-[242px] h-[242px] bg-white rounded-[8px] shadow-md lg:ml-[32px]",
  },
];

export default Hero;
