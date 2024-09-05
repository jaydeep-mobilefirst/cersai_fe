import { render, screen, fireEvent } from "@testing-library/react";
import EntityDetails from "../EntityDetails";
import React from "react";

describe("EntityDetails", () => {
    test("renders Entity Name input field", () => {
        render(<EntityDetails />);
        const entityNameInput = screen.getByLabelText(/Entity Name/i);
        expect(entityNameInput).toBeInTheDocument();
    });

    test("renders PAN input field", () => {
        render(<EntityDetails />);
        const panInput = screen.getByLabelText(/PAN/i);
        expect(panInput).toBeInTheDocument();
    });

    test("renders Type of Entity select button", () => {
        render(<EntityDetails />);
        const typeOfEntitySelectButton = screen.getByLabelText(/Type of Entity/i);
        expect(typeOfEntitySelectButton).toBeInTheDocument();
    });

    test("renders Unique ID Number input field", () => {
        render(<EntityDetails />);
        const uniqueIdNumberInput = screen.getByLabelText(/Unique ID Number/i);
        expect(uniqueIdNumberInput).toBeInTheDocument();
    });

    test("renders Address Line 1 input field", () => {
        render(<EntityDetails />);
        const addressLine1Input = screen.getByLabelText(/Address Line 1/i);
        expect(addressLine1Input).toBeInTheDocument();
    });

    test("renders Address Line 2 input field", () => {
        render(<EntityDetails />);
        const addressLine2Input = screen.getByLabelText(/Address Line 2/i);
        expect(addressLine2Input).toBeInTheDocument();
    });

    test("renders PIN Code input field", () => {
        render(<EntityDetails />);
        const pinCodeInput = screen.getByLabelText(/PIN Code/i);
        expect(pinCodeInput).toBeInTheDocument();
    });

    test("renders State select button", () => {
        render(<EntityDetails />);
        const stateSelectButton = screen.getByLabelText(/State/i);
        expect(stateSelectButton).toBeInTheDocument();
    });

    test("renders District select button", () => {
        render(<EntityDetails />);
        const districtSelectButton = screen.getByLabelText(/District/i);
        expect(districtSelectButton).toBeInTheDocument();
    });

    test("renders GST Number input field", () => {
        render(<EntityDetails />);
        const gstNumberInput = screen.getByLabelText(/GST Number/i);
        expect(gstNumberInput).toBeInTheDocument();
    });

    test("submits the form successfully", () => {
        render(<EntityDetails />);
        const submitButton = screen.getByText(/Submit/i);
        fireEvent.click(submitButton);
        // Add your assertions for form submission here
    });
});
