import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect'; // for extra matchers
import TaskTabsRegulator from "../TaskTabsRegulator";
import React from "react";

// Mock TaskTabsItem component
jest.mock("./TaskTabItem", () => ({ text, isActive, onClick }: any) => (
  <li data-testid="task-tab-item" className={isActive ? "active" : "inactive"} onClick={onClick}>
    {text}
  </li>
));

describe("TaskTabsRegulator Component", () => {
  const tabs = [
    { title: "Profile", url: "profile", rurl: "/rg/profile" },
    { title: "Reset Password", url: "resetpassword", rurl: "/rg/resetpassword" },
    { title: "Update DSC 3 Certificate", url: "uploaddsc3", rurl: "/rg/uploaddsc3" },
  ];

  test("renders all tabs", () => {
    render(
      <MemoryRouter initialEntries={["/rg/profile"]}>
        <TaskTabsRegulator />
      </MemoryRouter>
    );

    // Check that all tabs are rendered
    tabs.forEach((tab) => {
      expect(screen.getByText(tab.title)).toBeInTheDocument();
    });
  });

  test("sets the correct active tab based on URL", () => {
    render(
      <MemoryRouter initialEntries={["/rg/resetpassword"]}>
        <TaskTabsRegulator />
      </MemoryRouter>
    );

    const activeTab = screen.getByText("Reset Password");
    const inactiveTab = screen.getByText("Profile");

    // Check if the "Reset Password" tab is active
    expect(activeTab.parentElement).toHaveClass("active");
    expect(inactiveTab.parentElement).toHaveClass("inactive");
  });

  test("changes active tab when clicked", () => {
    render(
      <MemoryRouter initialEntries={["/rg/profile"]}>
        <TaskTabsRegulator />
      </MemoryRouter>
    );

    const resetPasswordTab = screen.getByText("Reset Password");
    fireEvent.click(resetPasswordTab);

    // After clicking, "Reset Password" tab should be active
    expect(resetPasswordTab.parentElement).toHaveClass("active");
  });

  test("renders correct URLs for each tab", () => {
    render(
      <MemoryRouter initialEntries={["/rg/profile"]}>
        <TaskTabsRegulator />
      </MemoryRouter>
    );

    // Check the correct href for each tab
    tabs.forEach((tab) => {
      expect(screen.getByText(tab.title).closest("a")).toHaveAttribute("href", tab.rurl);
    });
  });
});
