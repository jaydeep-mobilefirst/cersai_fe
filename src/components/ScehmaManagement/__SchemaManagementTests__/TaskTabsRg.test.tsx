import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TaskTabsDc from "../TaskTabs";
import React from "react";

// Define all text elements and test IDs in an object
const texts = {
  tabs: {
    depositTakers: "Deposit Takers",
    schemes: "Schemes",
  },
  activeSuffix: "(active)",
  routes: {
    myTask: "/dc/my-task",
    depositTaker: "/dc/deposit-taker",
  },
  testIds: {
    taskTabItem: "task-tab-item",
  },
};

describe("TaskTabsDc Component", () => {
  test("renders TaskTabsDc component with tabs", () => {
    render(
      <MemoryRouter initialEntries={[texts.routes.myTask]}>
        <TaskTabsDc />
      </MemoryRouter>
    );

    // Check if the tabs are rendered
    expect(screen.getByText(texts.tabs.depositTakers)).toBeInTheDocument();
    expect(screen.getByText(texts.tabs.schemes)).toBeInTheDocument();
  });

  test("sets the active tab correctly based on the URL", () => {
    render(
      <MemoryRouter initialEntries={[texts.routes.depositTaker]}>
        <TaskTabsDc />
      </MemoryRouter>
    );

    // Ensure the 'Deposit Takers' tab is marked as active
    expect(screen.getByText(`${texts.tabs.depositTakers} ${texts.activeSuffix}`)).toBeInTheDocument();
  });

  test("changes active tab when clicked", () => {
    render(
      <MemoryRouter initialEntries={[texts.routes.myTask]}>
        <TaskTabsDc />
      </MemoryRouter>
    );

    // Verify that 'Schemes' is initially active
    expect(screen.getByText(`${texts.tabs.schemes} ${texts.activeSuffix}`)).toBeInTheDocument();

    // Click on the 'Deposit Takers' tab
    fireEvent.click(screen.getByText(texts.tabs.depositTakers));

    // Ensure that 'Deposit Takers' is now active and 'Schemes' is not
    expect(screen.getByText(`${texts.tabs.depositTakers} ${texts.activeSuffix}`)).toBeInTheDocument();
    expect(screen.queryByText(`${texts.tabs.schemes} ${texts.activeSuffix}`)).not.toBeInTheDocument();
  });

  test("URL updates correctly when the tab is clicked", () => {
    render(
      <MemoryRouter initialEntries={[texts.routes.myTask]}>
        <TaskTabsDc />
      </MemoryRouter>
    );

    // Click on the 'Deposit Takers' tab
    fireEvent.click(screen.getByText(texts.tabs.depositTakers));

    // The URL should update to /dc/deposit-taker (based on Link component)
    expect(window.location.pathname).toBe(texts.routes.depositTaker);
  });

  test("renders TaskTabsItem with correct props", () => {
    render(
      <MemoryRouter initialEntries={[texts.routes.myTask]}>
        <TaskTabsDc />
      </MemoryRouter>
    );

    // Check if two TaskTabItem components are rendered
    const taskTabItems = screen.getAllByTestId(texts.testIds.taskTabItem);
    expect(taskTabItems).toHaveLength(2);

    // Ensure the tab items have correct text
    expect(taskTabItems[0]).toHaveTextContent(texts.tabs.depositTakers);
    expect(taskTabItems[1]).toHaveTextContent(texts.tabs.schemes);
  });
});
