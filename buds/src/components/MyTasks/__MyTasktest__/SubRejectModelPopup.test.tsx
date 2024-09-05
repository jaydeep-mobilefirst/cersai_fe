import { render, screen, fireEvent } from "@testing-library/react";
import SubRejectModelPopup from "../SubRejectModelPopup";
import React from "react";

describe("SubRejectModelPopup", () => {
    test("renders modal with correct content", () => {
        render(<SubRejectModelPopup onClose={() => {}} onSave={() => {}} />);

        // Assert that the modal is rendered
        const modalElement = screen.getByRole("dialog");
        expect(modalElement).toBeInTheDocument();

        // Assert that the modal content is rendered correctly
        expect(
            screen.getByText("Are you sure you want to reject this Deposit Taker")
        ).toBeInTheDocument();
        expect(screen.getByLabelText("Rejection Reasons *")).toBeInTheDocument();
        expect(screen.getByLabelText("Reason *")).toBeInTheDocument();
        expect(screen.getByText("Submit & reject")).toBeInTheDocument();
    });

    test("calls onClose function when close button is clicked", () => {
        const onCloseMock = jest.fn();
        render(<SubRejectModelPopup onClose={onCloseMock} onSave={() => {}} />);

        // Simulate click on close button
        fireEvent.click(screen.getByAltText("icon"));

        // Assert that onClose function is called
        expect(onCloseMock).toHaveBeenCalled();
    });

    test("displays error message when reason is not selected", () => {
        render(<SubRejectModelPopup onClose={() => {}} onSave={() => {}} />);

        // Simulate form submission without selecting a reason
        fireEvent.submit(screen.getByRole("form"));

        // Assert that error message is displayed
        expect(screen.getByText("Please select reason.")).toBeInTheDocument();
    });

    test("displays error message when remarks are not entered", () => {
        render(<SubRejectModelPopup onClose={() => {}} onSave={() => {}} />);

        // Simulate form submission without entering remarks
        fireEvent.submit(screen.getByRole("form"));

        // Assert that error message is displayed
        expect(screen.getByText("Please enter remarks.")).toBeInTheDocument();
    });

    test("calls onSave function when form is submitted with valid data", () => {
        const onSaveMock = jest.fn();
        render(<SubRejectModelPopup onClose={() => {}} onSave={onSaveMock} />);

        // Select a reason
        fireEvent.change(screen.getByLabelText("Rejection Reasons *"), {
            target: { value: "reason1" },
        });

        // Enter remarks
        fireEvent.change(screen.getByLabelText("Reason *"), {
            target: { value: "Test remarks" },
        });

        // Simulate form submission
        fireEvent.submit(screen.getByRole("form"));

        // Assert that onSave function is called
        expect(onSaveMock).toHaveBeenCalled();
    });
});
