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
    <div className="hero-container">
      <div className="hero-content flex flex-wrap justify-between">
        {/* Left side */}
        <div className="left-side w-full lg:w-1/2">
          <div className="text-[34px] w-full h-[38px] leading-[1.2]">
            Public Search
          </div>
          <div className="description w-full opacity-80 text-[16px] leading-[24px] mt-[16px]">
            General Public can undertake an online search in the Central
            Register on payment of prescribed fee.
          </div>
          <div className="buttons-container flex flex-wrap gap-[16px] justify-start mt-[24px]">
            {buttons.map((menuItem, index) => (
              <HeroButton key={index} text={menuItem.text} />
            ))}
          </div>
        </div>

        {/* Right side */}
        <div className="right-side w-full lg:w-1/2 relative ">
          <img src={Vector} alt="" className="vector-image" />
          <div className="right-content absolute inset-y-0 z-10 w-full h-full flex flex-wrap justify-center items-center gap-[32px] lg:gap-[48px]">
            {cardData.map((card, index) => (
              <div
                key={index}
                className="search-card w-[242px] h-[242px] bg-white rounded-[8px] shadow-md"
              >
                <div className="card-image flex items-center justify-center w-[194px] h-[108px] mx-[24px]">
                  <img
                    src={card.image}
                    alt={card.altText}
                    className="w-[56px] h-[56px] mx-[16px] rounded-[8px]"
                  />
                </div>
                <p className="card-title text-[20px] leading-[28px] mt-[24px] text-center">
                  {card.title}
                </p>
                <p className="card-description text-[16px] leading-[24px] text-center mt-[8px] hidden lg:block">
                  {card.description}
                </p>
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
    title: "Asset Based Search",
    description:
      "Search for assets based on various criteria, including location, type, and owner.",
  },
  {
    image: archive_book,
    altText: "archive_book",
    title: "Search Properties",
    description:
      "Search for movable, immovable, and intangible properties based on specific details.",
  },
  {
    image: cards,
    altText: "cards",
    title: "Borrower Search",
    description:
      "Perform a search for borrowers based on their PAN, DOB, and name.",
  },
  {
    image: user_search,
    altText: "user_search",
    title: "Borrower Based Search",
    description: "Search for specific information related to borrowers.",
  },
];

export default Hero;
