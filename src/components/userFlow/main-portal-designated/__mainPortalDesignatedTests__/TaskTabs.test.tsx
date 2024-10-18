import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import TaskTabsDesignated from "../TaskTabItems";
import TaskTabsItem from "../TaskTabItems";
import React from "react";

jest.mock("./TaskTabItems", () => jest.fn(({ text, isActive, onClick }) => (
  <div data-testid="tab-item" onClick={onClick} className={isActive ? "active" : ""}>
    {text}
  </div>
)));

describe("TaskTabsDesignated component", () => {
  const tabs = [
    { title: "Profile", url: "profile", rurl: "/dc/profile" },
    { title: "Reset Password", url: "resetpassword", rurl: "/dc/resetpassword" },
    { title: "Update DSC 3 Certificate", url: "uploaddsc3", rurl: "/dc/uploaddsc3" },
  ];

  const mockUseLocation = {
    pathname: "/dc/profile",
  };

  beforeEach(() => {
    jest.spyOn(require("react-router-dom"), "useLocation").mockReturnValue(mockUseLocation);
  });

  it("renders all tabs", () => {
    render(
      <Router>
        <TaskTabsDesignated text={""} isActive={false} onClick={function (): void {
                throw new Error("Function not implemented.");
            } } />
      </Router>
    );

    tabs.forEach((tab) => {
      expect(screen.getByText(tab.title)).toBeInTheDocument();
    });
  });

  it("sets the correct active tab based on the URL", () => {
    render(
      <Router>
        <TaskTabsDesignated text={""} isActive={false} onClick={function (): void {
                throw new Error("Function not implemented.");
            } } />
      </Router>
    );

    const activeTab = screen.getByText("Profile");
    expect(activeTab.closest(".active")).toBeTruthy();
  });

  it("switches the active tab when a tab is clicked", () => {
    render(
      <Router>
        <TaskTabsDesignated text={""} isActive={false} onClick={function (): void {
                throw new Error("Function not implemented.");
            } } />
      </Router>
    );

    const resetPasswordTab = screen.getByText("Reset Password");
    fireEvent.click(resetPasswordTab);

    expect(resetPasswordTab.closest(".active")).toBeTruthy();
  });

  it("renders the TaskTabsItem component for each tab", () => {
    render(
      <Router>
        <TaskTabsDesignated text={""} isActive={false} onClick={function (): void {
                throw new Error("Function not implemented.");
            } } />
      </Router>
    );

    const taskTabItems = screen.getAllByTestId("tab-item");
    expect(taskTabItems.length).toBe(tabs.length);
  });

  it("calls handleTabClick when a tab is clicked", () => {
    render(
      <Router>
        <TaskTabsDesignated text={""} isActive={false} onClick={function (): void {
                throw new Error("Function not implemented.");
            } } />
      </Router>
    );

    const profileTab = screen.getByText("Profile");
    fireEvent.click(profileTab);

    const resetPasswordTab = screen.getByText("Reset Password");
    fireEvent.click(resetPasswordTab);

    expect(resetPasswordTab.closest(".active")).toBeTruthy();
    expect(profileTab.closest(".active")).toBeFalsy();
  });
});
