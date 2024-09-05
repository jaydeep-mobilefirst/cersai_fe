import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SchemeDetails from "../SchemaDetails";
import React from "react";

describe("SchemeDetails", () => {
    test("renders Scheme Name input field", () => {
        render(<SchemeDetails />);
        const schemeNameInput = screen.getByLabelText("Scheme Name");
        expect(schemeNameInput).toBeInTheDocument();
    });

    test("renders Scheme Description input field", () => {
        render(<SchemeDetails />);
        const schemeDescriptionInput = screen.getByLabelText("Scheme Description");
        expect(schemeDescriptionInput).toBeInTheDocument();
    });

    test("renders Scheme Start Date input field", () => {
        render(<SchemeDetails />);
        const schemeStartDateInput = screen.getByLabelText("Scheme Start Date");
        expect(schemeStartDateInput).toBeInTheDocument();
    });

    test("renders Last day to enter scheme input field", () => {
        render(<SchemeDetails />);
        const lastDayInput = screen.getByLabelText("Last day to enter scheme");
        expect(lastDayInput).toBeInTheDocument();
    });

    test("renders Minimum Investment amount input field", () => {
        render(<SchemeDetails />);
        const minInvestmentInput = screen.getByLabelText("Minimum Investment amount");
        expect(minInvestmentInput).toBeInTheDocument();
    });

    test("renders Maximum Investment amount input field", () => {
        render(<SchemeDetails />);
        const maxInvestmentInput = screen.getByLabelText("Maximum Investment amount");
        expect(maxInvestmentInput).toBeInTheDocument();
    });

    test("renders Regulator Name input field", () => {
        render(<SchemeDetails />);
        const regulatorNameInput = screen.getByLabelText("Regulator Name");
        expect(regulatorNameInput).toBeInTheDocument();
    });

    test("renders Number of Investors input field", () => {
        render(<SchemeDetails />);
        const numInvestorsInput = screen.getByLabelText("Number of Investors");
        expect(numInvestorsInput).toBeInTheDocument();
    });

    test("renders Scheme Act input field", () => {
        render(<SchemeDetails />);
        const schemeActInput = screen.getByLabelText("Scheme Act");
        expect(schemeActInput).toBeInTheDocument();
    });

    test("renders ReactTable component", () => {
        render(<SchemeDetails />);
        const reactTable = screen.getByRole("table");
        expect(reactTable).toBeInTheDocument();
    });

    // Add more test cases as needed
});
