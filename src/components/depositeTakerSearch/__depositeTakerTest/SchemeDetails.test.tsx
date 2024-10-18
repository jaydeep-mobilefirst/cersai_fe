import { render, screen } from "@testing-library/react";
import SchemeDetails from "../schemeDetails";
import React from "react";

test("renders SchemeDetails component", () => {
    render(<SchemeDetails />);
    const schemeNameLabel = screen.getByText(/Scheme Name/i);
    const schemeDescriptionLabel = screen.getByText(/Scheme Description/i);
    const startDateLabel = screen.getByText(/Select Start Date/i);
    const lastDayLabel = screen.getByText(/Last day to enter scheme/i);
    const minInvestmentLabel = screen.getByText(/Minimum Investment/i);
    const maxInvestmentLabel = screen.getByText(/Maximum Investment/i);
    const regulatorNameLabel = screen.getByText(/Regulator Name/i);
    const schemeActLabel = screen.getByText(/Scheme Act/i);
    const numInvestorsLabel = screen.getByText(/Number of investors/i);
    const statusLabel = screen.getByText(/Status/i);

    expect(schemeNameLabel).toBeInTheDocument();
    expect(schemeDescriptionLabel).toBeInTheDocument();
    expect(startDateLabel).toBeInTheDocument();
    expect(lastDayLabel).toBeInTheDocument();
    expect(minInvestmentLabel).toBeInTheDocument();
    expect(maxInvestmentLabel).toBeInTheDocument();
    expect(regulatorNameLabel).toBeInTheDocument();
    expect(schemeActLabel).toBeInTheDocument();
    expect(numInvestorsLabel).toBeInTheDocument();
    expect(statusLabel).toBeInTheDocument();
});
