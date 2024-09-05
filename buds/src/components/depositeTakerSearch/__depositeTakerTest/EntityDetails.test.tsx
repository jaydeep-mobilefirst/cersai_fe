import { render, screen, fireEvent } from "@testing-library/react";
import EntityDetails from "../EntityDetails";
import React from "react";

describe("EntityDetails", () => {
    test("renders all input fields", () => {
        render(<EntityDetails />);

        // Assert that all input fields are rendered
        expect(screen.getByLabelText("Entity Name")).toBeInTheDocument();
        expect(screen.getByLabelText("PAN")).toBeInTheDocument();
        expect(screen.getByLabelText("Type of Entity")).toBeInTheDocument();
        expect(screen.getByLabelText("Unique ID Number")).toBeInTheDocument();
        expect(screen.getByLabelText("Address Line 1")).toBeInTheDocument();
        expect(screen.getByLabelText("Address Line 2")).toBeInTheDocument();
        expect(screen.getByLabelText("PIN Code")).toBeInTheDocument();
        expect(screen.getByLabelText("State")).toBeInTheDocument();
        expect(screen.getByLabelText("District")).toBeInTheDocument();
        expect(screen.getByLabelText("GST Number")).toBeInTheDocument();
    });

    test("submits the form successfully", () => {
        render(<EntityDetails />);

        // Fill in the form fields
        fireEvent.change(screen.getByLabelText("Entity Name"), {
            target: { value: "Test Entity" },
        });
        fireEvent.change(screen.getByLabelText("PAN"), {
            target: { value: "ABCD1234" },
        });
        // ... fill in the rest of the form fields

        // Submit the form
        fireEvent.submit(screen.getByRole("button", { name: "Submit" }));

        // Assert that the form submission was successful
        expect(screen.getByText("Form submitted successfully!")).toBeInTheDocument();
    });
});
