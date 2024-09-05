import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import OtpModel from "../OtpModal";

describe("OtpModel", () => {
    test("renders without error", () => {
        render(<OtpModel />);
        // Assert that the component renders without throwing an error
    });

    test("displays OTP verification title", () => {
        render(<OtpModel />);
        const titleElement = screen.getByText("OTP Verification");
        expect(titleElement).toBeInTheDocument();
    });

    test("displays send button", () => {
        render(<OtpModel />);
        const sendButton = screen.getByText("Send");
        expect(sendButton).toBeInTheDocument();
    });

    test("sends OTP when send button is clicked", () => {
        render(<OtpModel />);
        const sendButton = screen.getByText("Send");
        fireEvent.click(sendButton);
        // Add assertions to check if OTP is sent
    });

    test("displays mobile and email input fields", () => {
        render(<OtpModel />);
        const mobileInput = screen.getByLabelText("Mobile");
        const emailInput = screen.getByLabelText("Email");
        expect(mobileInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
    });

    test("updates email OTP value when input changes", () => {
        render(<OtpModel />);
        const emailInput = screen.getByLabelText("Email") as HTMLInputElement;
        fireEvent.change(emailInput, { target: { value: "123456" } });
        expect(emailInput.value).toBe("123456");
    });

    test("updates email OTP value when input changes", () => {
        render(<OtpModel />);
        const emailInput = screen.getByLabelText("Email") as HTMLInputElement;
        fireEvent.change(emailInput, { target: { value: "123456" } });
        expect(emailInput.value).toBe("123456");
    });

    test("displays error message for invalid mobile OTP", () => {
        render(<OtpModel />);
        const mobileInput = screen.getByLabelText("Mobile");
        fireEvent.change(mobileInput, { target: { value: "abc123" } });
        const errorMessage = screen.getByText("Please enter valid OTP");
        expect(errorMessage).toBeInTheDocument();
    });

    test("displays error message for invalid email OTP", () => {
        render(<OtpModel />);
        const emailInput = screen.getByLabelText("Email");
        fireEvent.change(emailInput, { target: { value: "abc123" } });
        const errorMessage = screen.getByText("Please enter valid OTP");
        expect(errorMessage).toBeInTheDocument();
    });

    test("displays time left for OTP verification", () => {
        render(<OtpModel />);
        const timeLeftElement = screen.getByText(/Time Left : \d{2}:\d{2}/);
        expect(timeLeftElement).toBeInTheDocument();
    });

    // Add more test cases as needed
});
