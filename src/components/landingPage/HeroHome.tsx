import React, { useState, useEffect } from "react";
import HeroButton from "./HeroButton";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useLandingStore } from "../../zust/useLandingStore";
import axios from "axios";
import { bffUrl } from "../../utils/api";

const HeroHome = () => {
  const [stateData, setStateData] = useState<any>();
  const [loader, setLoader] = useState<boolean>(false);
  const { homePageData } = useLandingStore((state) => state);
  const navigate = useNavigate();
  const buttons = [
    { text: homePageData?.homePageData?.hero[0]?.text },
    { text: homePageData?.homePageData?.hero[1]?.text },
  ];

  useEffect(() => {
    setLoader(true);
    axios
      .post(bffUrl + "/websitecontent/stats", {
        keylist: [
          "totalSchemeUnderLetigation",
          "totalDepositTakerRegistered",
          "totalDepositTakerApproved",
          "totalDepositTakerPending",
          "totalSchemeRegistered",
          "totalSchemeBanned",
        ],
      })
      .then((response) => {
        setStateData(response?.data?.data);
        setLoader(false);
      })
      .catch((error) => {
        console.error(error);
        setLoader(false);
      });
  }, []);

  const onNavigateToSchemeSearch = (text: string) => {
    if (/scheme/i.test(text)) {
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

  function getValue(key: string) {
    const item = stateData?.find((item: any) => key in item);
    if (item) {
      return item[key];
    }
    return '0';
  }

  return (
    <div className='w-[100%] flex items-center justify-between px-4 lg:px-[100px] py-4 lg:py-[48px] flex-col lg:flex-row landing-hero-bg-image overflow-x-hidden'>
      <div className='md:mr-2 md:w-[40%]'>
        <div className='text-[34px] w-full text-gilroy-medium text-center lg:text-start'>
          {homePageData?.homePageData?.hero[2]?.text}
        </div>
        <div className='xl:w-[485px] w-full text-[16px] leading-[24px] mt-[16px] text-gilroy-regular text-center lg:text-start'>
          {homePageData?.homePageData?.hero[3]?.text}
        </div>
        <div className='buttons-container flex flex-wrap gap-[16px] justify-center lg:justify-start mt-[24px]'>
          {buttons?.map((menuItem, index) => (
            <HeroButton
              key={index}
              text={menuItem?.text}
              onClick={onNavigateToSchemeSearch}
            />
          ))}
        </div>
      </div>
      <div className='md:w-[40%] w-full md:flex md:items-center md:justify-center mt-4 lg:mt-0 md:flex-col md:-ml-2 hidden -z-0'>
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={5000}
        >
          {groupedCardData1?.map((group, idx) => (
            <div key={idx} className='  md:px-12 px-4 py-2 pb-12'>
              <div className='flex flex-col md:flex-row gap-x-12 md:gap-x-0'>
                {group?.slice(0, 2).map((card, index) => (
                  <div
                    key={index}
                    className={`w-[242px] h-[242px] bg-white rounded-[8px] shadow-custom p-2 ${
                      index === 1 ? "md:mt-[32px] md:ml-[32px]" : ""
                    }`}
                  >
                    {" "}
                    <div className={` pl-[24px] pr-[24px] pt-[32px] text-wrap`}>
                      <div className='flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#FDDAFC]'>
                        <img
                          src={card?.img}
                          alt={card?.altText}
                          className='w-[56px] h-[56px]'
                        />
                      </div>
                      <p className='text-[18px] text-left leading-[24px] mt-[24px] text-gilroy-medium'>
                        {card?.text} : {getValue(card?.keylist)}
                 
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div
                className={`flex flex-col md:flex-row md:justify-start gap-x-12 md:gap-x-0`}
              >
                {group.slice(2, 4).map((card, index) => (
                  <div
                    key={index}
                    className={`w-[242px] h-[242px] bg-white rounded-[8px] shadow-custom p-2 ${
                      index === 1 ? "md:mt-[32px]" : `md:mr-[32px] `
                    }`}
                  >
                    {" "}
                    <div className={`pl-[24px] pr-[24px] pt-[32px] `}>
                      <div className='flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#FDDAFC]'>
                        <img
                          src={card?.img}
                          alt={card?.altText}
                          className='w-[56px] h-[56px]'
                        />
                      </div>
                      <p className='text-[18px] text-left leading-[24px] mt-[24px] text-gilroy-medium'>
                        {card?.text} : {getValue(card?.keylist)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <div className='mt-[32px] md:hidden -z-0'>
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={5000}
        >
          {homePageData?.homePageData?.carousel?.map(
            (card: any, index: any) => (
              <div className='flex flex-row items-center justify-center pb-8'>
                <div
                  key={index}
                  className='w-[242px] h-[242px] bg-white rounded-[8px] shadow-custom p-2'
                >
                  <div className='ml-[24px] mr-[24px] mt-[32px]'>
                    <div className='flex items-center justify-center w-[56px] h-[56px] rounded-[8px] bg-[#FDDAFC]'>
                      <img
                        src={card?.img}
                        alt={card?.altText}
                        className='w-[56px] h-[56px]'
                      />
                    </div>
                    <p className='text-[20px] text-left leading-[24px] mt-[24px] text-gilroy-medium'>
                      {card?.text} : {getValue(card?.keylist)}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default HeroHome;
