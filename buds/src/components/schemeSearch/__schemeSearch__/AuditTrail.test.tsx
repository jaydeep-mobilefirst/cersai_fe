import { render } from "@testing-library/react";
import AuditTrail from "../AuditTrail";
import React from "react";

describe("AuditTrail", () => {
    it("renders the component without errors", () => {
        render(<AuditTrail />);
        // Add your assertions here
    });

    // it("renders the correct number of rows", () => {
    //     const { getAllByRole } = render(<AuditTrail />);
    //     const rows = getAllByRole("row");
    //     expect(rows.length).toBe(5); // Update the expected value based on your defaultData length
    // });

    // Add more test cases as needed
});
