import { render } from "@testing-library/react";
import TotalFoundationLineChart from "../TotalFoundationLineChart";
import React from "react";

test("renders TotalFoundationLineChart component", () => {
    render(<TotalFoundationLineChart />);
});

test("renders the chart with correct data", () => {
    const { getByText } = render(<TotalFoundationLineChart />);
    
    expect(getByText("Total Foundation Registered")).toBeInTheDocument();
    expect(getByText("Jan")).toBeInTheDocument();
    expect(getByText("Feb")).toBeInTheDocument();
    expect(getByText("Mar")).toBeInTheDocument();
    expect(getByText("Apr")).toBeInTheDocument();
    expect(getByText("May")).toBeInTheDocument();
    expect(getByText("Jun")).toBeInTheDocument();
});

// Add more test cases as needed
