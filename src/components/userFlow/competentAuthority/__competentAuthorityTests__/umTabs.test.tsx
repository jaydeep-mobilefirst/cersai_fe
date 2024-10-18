import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UmTabs from "../UmTabs";

test("renders UmTabs component with default active tab", () => {
  render(
    <BrowserRouter>
      <UmTabs text={""} isActive={false} onClick={function (): void {
              throw new Error("Function not implemented.");
          } } />
    </BrowserRouter>
  );

  // Check if the default active tab is "Role Creation"
  const defaultActiveTab = screen.getByText(/Role Creation/i);
  expect(defaultActiveTab).toBeInTheDocument();
  
});

test("changes active tab when a different tab is clicked", () => {
  render(
    <BrowserRouter>
      <UmTabs text={""} isActive={false} onClick={function (): void {
              throw new Error("Function not implemented.");
          } } />
    </BrowserRouter>
  );

  
  
});
