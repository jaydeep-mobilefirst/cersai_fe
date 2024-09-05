import { render } from "@testing-library/react";
import AuditTrail from "../AuditTrail";
import React from "react";

describe("AuditTrail", () => {
    it("renders the component without errors", () => {
        render(<AuditTrail />);
        // Add your assertions here
    });

    it("renders the correct number of rows", () => {
        const { getAllByRole } = render(<AuditTrail />);
        const rows = getAllByRole("row");
        expect(rows.length).toBe(5); // Update the expected value based on the number of defaultData items
    });

    it("renders the correct column headers", () => {
        const { getByText } = render(<AuditTrail />);
        expect(getByText("S.No.")).toBeInTheDocument();
        expect(getByText("Status Change By")).toBeInTheDocument();
        expect(getByText("From")).toBeInTheDocument();
        expect(getByText("To")).toBeInTheDocument();
        expect(getByText("Remarks")).toBeInTheDocument();
        expect(getByText("Date")).toBeInTheDocument();
    });

    // Add more test cases as needed
});
