import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import DashboardProfileSidebar from "../DashboardProfileSidebar";
import { BrowserRouter as Router } from "react-router-dom";

// Mock the profileSideBarListCompetent array and image imports
jest.mock("../../../utils/hardText/portalText", () => ({
  profileSideBarListCompetent: [
    { title: "Competent", rurl: "/competent", url: "competent", percentage: 25 },
    { title: "Intermediate", rurl: "/intermediate", url: "intermediate", percentage: 50 },
  ],
}));

jest.mock("../../../assets/images/ArrowDark.svg", () => "ArrowDark.svg");
jest.mock("../../../assets/images/rightArrowWhiteallWhite.svg", () => "rightArrowWhiteallWhite.svg");

describe("DashboardProfileSidebar", () => {
  const mockFetchFormFields = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  const setup = () => {
    render(
      <Router>
        <DashboardProfileSidebar fetchFormFields={mockFetchFormFields} />
      </Router>
    );
  };

  it("renders the sidebar with user name and percentage completed", () => {
    sessionStorage.setItem("firstName", "John");
    sessionStorage.setItem("lastName", "Doe");

    setup();

    expect(screen.getByText("JohnDoe")).toBeInTheDocument();
    expect(screen.getByText("CERSAI")).toBeInTheDocument();
    expect(screen.getByText("0% Completed")).toBeInTheDocument();
  });

  it("updates percentage when an option is clicked", () => {
    setup();

    const competentLink = screen.getByText("Competent");
    fireEvent.click(competentLink);

    expect(screen.getByText("25% Completed")).toBeInTheDocument();
  });

  it("triggers fetchFormFields when an option is clicked", () => {
    setup();

    const competentLink = screen.getByText("Competent");
    fireEvent.click(competentLink);

    expect(mockFetchFormFields).toHaveBeenCalledTimes(1);
  });

  it("updates the selected sidebar item correctly", () => {
    setup();

    const competentLink = screen.getByText("Competent");
    fireEvent.click(competentLink);

    expect(competentLink.closest("div")).toHaveClass("bg-[#1C468E]");

    const intermediateLink = screen.getByText("Intermediate");
    expect(intermediateLink.closest("div")).toHaveClass("bg-[#FFFFFF]");
  });

  it("toggles the sidebar on button click", () => {
    setup();

    const toggleButton = screen.getByRole("button", { name: /open sidebar/i });
    fireEvent.click(toggleButton);

    // Check if the sidebar has opened (or closed, depending on initial state)
    // Assuming the sidebar should now be open and class should change accordingly
    const sidebar = screen.getByLabelText("Sidebar");
    expect(sidebar).toHaveClass("translate-x-0");
  });

  it("navigates back when goBackRoute is called", () => {
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      useNavigate: () => mockNavigate,
    }));

    setup();

    // Call goBackRoute by firing the back button (if implemented)
    const backButton = screen.getByRole("button", { name: /back/i });
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it("renders sidebar items correctly based on profileSideBarListCompetent", () => {
    setup();

    expect(screen.getByText("Competent")).toBeInTheDocument();
    expect(screen.getByText("Intermediate")).toBeInTheDocument();
  });

  it("shows the correct arrow icon based on current selection", () => {
    setup();

    const competentLink = screen.getByText("Competent");
    fireEvent.click(competentLink);

    const arrowIcon = screen.getByAltText(""); // Select based on the empty alt text
    expect(arrowIcon).toHaveAttribute("src", "rightArrowWhiteallWhite.svg");

    const intermediateLink = screen.getByText("Intermediate");
    fireEvent.click(intermediateLink);

    expect(arrowIcon).toHaveAttribute("src", "ArrowDark.svg");
  });
});
