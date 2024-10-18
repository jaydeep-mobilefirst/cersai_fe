import React from "react";
import { render, screen } from "@testing-library/react";
import VideoComp from "../VideoComp";
import { useLandingStore } from "../../../zust/useLandingStore";

// Mock the `useLandingStore` hook
jest.mock("../../zust/useLandingStore");

// Define the mock data and texts
const texts = {
    video: {
      link: "https://example.com/video", // This should match the mock data used in VideoComp
    },
  };
  
  // Mock homePageData
  const mockHomePageData = {
    homePageData: {
      aboutBudsComp: [
        {}, {}, {}, {}, // Other elements
        { link: texts.video.link }, // Video link at the correct index
      ],
    },
  };
  

// Mock implementation of `useLandingStore`
useLandingStore.mockReturnValue({
  homePageData: mockHomePageData,
});

describe("VideoComp Component", () => {
    it("renders the video iframe with the correct src and title", () => {
      render(<VideoComp />);
  
      // Check if the iframe is rendered with the correct attributes
      const iframe = screen.getByTitle(texts.video.link);
      expect(iframe).toBeInTheDocument();
      expect(iframe).toHaveAttribute("src", texts.video.link);
      expect(iframe).toHaveAttribute("allowFullScreen");
    });
  
    it("applies the correct classes to the iframe", () => {
        render(<VideoComp />);
      
        // Check if the iframe has the expected class names for responsive styles
        const iframe = screen.getByTitle(texts.video.link);
        expect(iframe).toHaveClass(
          "w-[100%]",
          "md:w-[350px]",
          "md:h-[302px]",
          "lg:w-[500px]",
          "lg:h-[280px]",
          "xl:w-[540px]",
          "xl:h-[302px]",
          "mt-5",
          "video-border"
        );
      });
  });
  