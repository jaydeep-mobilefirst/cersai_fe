import { render, screen } from "@testing-library/react";
import QueryResolutionComp from "../QueryResolutionCom";
import React from "react";

// Mock data (assuming the structure of queryResolutionComp)
const queryResolutionComp = [
  { heading: "Heading" },
  { date: "12", month: "December" },
  { location: "Location", city: "New York" },
  { onlineHeading: "Join Online", descritpion: "This is the online description." },
  { button: "Register Now" }
];

jest.mock("../../utils/hardText/landingpageText", () => ({
  queryResolutionComp,
}));

describe("QueryResolutionComp", () => {
  test("renders the city name correctly", () => {
    render(<QueryResolutionComp />);

    // Check if the city is rendered
    const cityElement = screen.getByText("New York");
    expect(cityElement).toBeInTheDocument();
  });

  test("renders the description correctly", () => {
    render(<QueryResolutionComp />);

    // Check if the description is rendered
    const descriptionElement = screen.getByText("This is the online description.");
    expect(descriptionElement).toBeInTheDocument();
  });

  test("renders the month correctly", () => {
    render(<QueryResolutionComp />);

    // Check if the month is rendered
    const monthElement = screen.getByText("December");
    expect(monthElement).toBeInTheDocument();
  });

  test("renders the online heading correctly", () => {
    render(<QueryResolutionComp />);

    // Check if the online heading is rendered
    const onlineHeadingElement = screen.getByText("Join Online");
    expect(onlineHeadingElement).toBeInTheDocument();
  });
});
