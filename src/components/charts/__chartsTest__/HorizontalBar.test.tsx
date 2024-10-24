import React from "react";
import { render, screen } from "@testing-library/react";
import HorizontalBarChart from "../HorizontalBarChart";
import "@testing-library/jest-dom";

describe("HorizontalBarChart", () => {
  it("renders the title correctly", () => {
    render(<HorizontalBarChart />);
    expect(screen.getByText("Lorem ipsum")).toBeInTheDocument();
  });

  it("renders the download button with the correct text", () => {
    render(<HorizontalBarChart />);
    const downloadButton = screen.getByRole("button", { name: /Download/i });
    expect(downloadButton).toBeInTheDocument();
  });

  it("renders the bar chart", () => {
    render(<HorizontalBarChart />);
    const bars = screen.getAllByRole("img", { hidden: true });
    expect(bars).toHaveLength(1); // Checks for one chart rendering (BarChart).
  });

  it("renders the description correctly", () => {
    render(<HorizontalBarChart />);
    expect(
      screen.getByText(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      )
    ).toBeInTheDocument();
  });

  it("contains the bars with correct values", () => {
    render(<HorizontalBarChart />);
    expect(screen.getByText("At sea")).toBeInTheDocument();
    expect(screen.getByText("Drifting")).toBeInTheDocument();
    expect(screen.getAllByText("In port")).toHaveLength(2); // Checks for two occurrences of "In port"
  });
});
