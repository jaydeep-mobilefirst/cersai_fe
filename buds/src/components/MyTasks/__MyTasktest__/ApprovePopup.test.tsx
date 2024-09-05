import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ApprovePopup from "../ApprovePopup";

describe("ApprovePopup", () => {
    test("renders without error", () => {
        render(<ApprovePopup onClose={() => {}} onSave={() => {}} />);
        // Assert that the component renders without throwing an error
    });

    test("calls onClose when modal is closed", () => {
        const onCloseMock = jest.fn();
        render(<ApprovePopup onClose={onCloseMock} onSave={() => {}} />);
        // Simulate closing the modal
        fireEvent.click(screen.getByAltText("icon"));
        // Assert that the onClose function is called
        expect(onCloseMock).toHaveBeenCalled();
    });

    test("updates text state when input value changes", () => {
        render(<ApprovePopup onClose={() => {}} onSave={() => {}} />);
        const inputElement = screen.getByLabelText("Text Input") as HTMLInputElement;
        // Simulate changing the input value
        fireEvent.change(inputElement, { target: { value: "Hello World" } });
        // Assert that the text state is updated
        expect(inputElement.value).toBe("Hello World");
    });

    test("calls onSave when form is submitted", () => {
        const onSaveMock = jest.fn();
        render(<ApprovePopup onClose={() => {}} onSave={onSaveMock} />);
        const formElement = screen.getByTestId("form");
        // Simulate submitting the form
        fireEvent.submit(formElement);
        // Assert that the onSave function is called
        expect(onSaveMock).toHaveBeenCalled();
    });

    // Add more test cases for other functionality in the component
});

