import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import UmTabs from "../UmTabs";

// Define expected texts for maintainability
const roleCreationText = "Role Creation";
const userCreationText = "User Creation";
const roleCreationUrl = "/ca/usermanagement";
const userCreationUrl = "/ca/usermanagement/usercreation";

describe("UmTabs Component", () => {
  const renderComponent = (initialEntries = [roleCreationUrl]) =>
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <UmTabs text={""} isActive={false} onClick={function (): void {
          throw new Error("Function not implemented.");
        } } />
      </MemoryRouter>
    );

  test("renders with default active tab", () => {
    renderComponent();

    // Check if the default active tab is "Role Creation"
    const defaultActiveTab = screen.getByText(roleCreationText);
    expect(defaultActiveTab).toBeInTheDocument();
    expect(defaultActiveTab).toHaveClass("font-bold text-[#1C468E]");
  });

  test("changes active tab when a different tab is clicked", () => {
    renderComponent();

    // Find the "User Creation" tab and click it
    const userCreationTab = screen.getByText(userCreationText);
    fireEvent.click(userCreationTab);

    // Check if "User Creation" tab becomes active
    expect(userCreationTab).toBeInTheDocument();
    expect(userCreationTab).toHaveClass("font-bold text-[#1C468E]"); // Adjust to the classes used for active tabs
  });

  // test("updates active tab based on URL", () => {
  //   // Render the component with the URL set to "usercreation"
  //   renderComponent([userCreationUrl]);

  //   // Verify if "User Creation" is the active tab based on the URL
  //   const userCreationTab = screen.getByText(userCreationText);
  //   expect(userCreationTab).toBeInTheDocument();
  //   expect(userCreationTab).toHaveClass("font-bold text-[#1C468E]"); // Adjust to the classes used for active tabs
  // });
});
