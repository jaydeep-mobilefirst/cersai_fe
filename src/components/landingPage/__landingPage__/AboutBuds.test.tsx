import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import AboutBuds from "../AboutBuds";
import { useLandingStore } from "../../../zust/useLandingStore";
import VideoComp from "../VideoComp";

// Mock the `useLandingStore` hook
jest.mock("../../zust/useLandingStore");

// Define the mock data and texts
// Define the mock data and texts
const texts = {
    heading: "About Buds Heading", // Adjust to match the expected heading text
    description: "This is a description about Buds.", // Adjust to match the expected description text
    link1: {
      text: "Learn more about Buds",
      url: "https://example.com/about-buds", // Adjust to the expected URL
    },
    link2: {
      text: "Join our community",
      url: "https://example.com/join-community", // Adjust to the expected URL
    },
    video: {
      link: "https://example.com/video", // Adjust this to the expected video URL
    },
  };
  
  // Mock homePageData
  const mockHomePageData = {
    homePageData: {
      aboutBudsComp: [
        { text: texts.heading },
        { text: texts.description },
        { text: texts.link1.text, link: texts.link1.url },
        { text: texts.link2.text, link: texts.link2.url },
        { link: texts.video.link }, // Add this object for the video link
      ],
    },
  };
  
// Mock implementation of `useLandingStore`
useLandingStore.mockReturnValue({
  homePageData: mockHomePageData,
});

describe("AboutBuds Component", () => {
  it("renders the heading, description, and links correctly", () => {
    render(
      <Router>
        <AboutBuds />
      </Router>
    );

    // Check if the heading is rendered
    expect(screen.getByText(texts.heading)).toBeInTheDocument();

    // Check if the description is rendered
    expect(screen.getByText(texts.description)).toBeInTheDocument();

    // Check if the links are rendered with the correct text and URL
    const link1 = screen.getByText(texts.link1.text);
    expect(link1).toBeInTheDocument();
    expect(link1.closest("a")).toHaveAttribute("href", texts.link1.url);

    const link2 = screen.getByText(texts.link2.text);
    expect(link2).toBeInTheDocument();
    expect(link2.closest("a")).toHaveAttribute("href", texts.link2.url);
  });

  
});
