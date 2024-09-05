import { render, screen, fireEvent } from "@testing-library/react";
import RoleDetails from "../RoleDetails";
import React from "react";

describe("RoleDetails", () => {
    test("renders RoleDetails component", () => {
        render(<RoleDetails />);
        // Add your assertions here
    });

    test("handles Scheme Name input change", () => {
        render(<RoleDetails />);
        const schemeNameInput = screen.getByPlaceholderText("ABCD Scheme");
        fireEvent.change(schemeNameInput, { target: { value: "New Scheme" } });
        // Add your assertions here
    });

    test("handles Scheme Description input change", () => {
        render(<RoleDetails />);
        const schemeDescriptionInput = screen.getByPlaceholderText("Scheme  Description");
        fireEvent.change(schemeDescriptionInput, { target: { value: "New Description" } });
        // Add your assertions here
    });

    // Add more test cases for other input fields, select buttons, and date pickers

});
