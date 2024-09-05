import { render, screen, fireEvent } from "@testing-library/react";
import CreatedBy from "../CreatedBy";
import React from "react";

describe("CreatedBy component", () => {
    test("renders all input fields", () => {
        render(<CreatedBy />);
        
        // Assert that all input fields are rendered
        expect(screen.getByLabelText("Entity Name")).toBeInTheDocument();
        expect(screen.getByLabelText("Entity Type")).toBeInTheDocument();
        expect(screen.getByLabelText("Unique ID Number")).toBeInTheDocument();
        expect(screen.getByLabelText("Address Line 1")).toBeInTheDocument();
        expect(screen.getByLabelText("Address Line 2")).toBeInTheDocument();
        expect(screen.getByLabelText("PIN Code")).toBeInTheDocument();
        expect(screen.getByLabelText("State")).toBeInTheDocument();
        expect(screen.getByLabelText("District")).toBeInTheDocument();
        expect(screen.getByLabelText("Nodal Officer Name")).toBeInTheDocument();
    });

    test("handles input changes correctly", () => {
        render(<CreatedBy />);
        
        // Simulate input changes
        fireEvent.change(screen.getByLabelText("Entity Name"), { target: { value: "Test Entity" } });
        fireEvent.change(screen.getByLabelText("Entity Type"), { target: { value: "Pvt Ltd" } });
        fireEvent.change(screen.getByLabelText("Unique ID Number"), { target: { value: "123456" } });
        fireEvent.change(screen.getByLabelText("Address Line 1"), { target: { value: "123 Main St" } });
        fireEvent.change(screen.getByLabelText("Address Line 2"), { target: { value: "Apt 4B" } });
        fireEvent.change(screen.getByLabelText("PIN Code"), { target: { value: "12345" } });
        fireEvent.change(screen.getByLabelText("State"), { target: { value: "Gujarat" } });
        fireEvent.change(screen.getByLabelText("District"), { target: { value: "Ahmedabad" } });
        fireEvent.change(screen.getByLabelText("Nodal Officer Name"), { target: { value: "John Doe" } });
        
        // Assert that input values are updated correctly
        expect(screen.getByLabelText("Entity Name")).toHaveValue("Test Entity");
        expect(screen.getByLabelText("Entity Type")).toHaveValue("Pvt Ltd");
        expect(screen.getByLabelText("Unique ID Number")).toHaveValue("123456");
        expect(screen.getByLabelText("Address Line 1")).toHaveValue("123 Main St");
        expect(screen.getByLabelText("Address Line 2")).toHaveValue("Apt 4B");
        expect(screen.getByLabelText("PIN Code")).toHaveValue("12345");
        expect(screen.getByLabelText("State")).toHaveValue("Gujarat");
        expect(screen.getByLabelText("District")).toHaveValue("Ahmedabad");
        expect(screen.getByLabelText("Nodal Officer Name")).toHaveValue("John Doe");
    });

    // Add more test cases as needed...
});

