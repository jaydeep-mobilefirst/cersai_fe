import React from "react";
import { render, fireEvent } from "@testing-library/react";
import OtpInput from "../OtpInput";

describe("OtpInput", () => {
    const defaultProps = {
        label: "OTP",
        infoText: "Enter the OTP",
        resendText: "Resend OTP",
        timer: "60",
        error: "",
        onResend: jest.fn(),
        onChange: jest.fn(),
        value: ["", "", "", "", "", ""],
    };

    it("renders correctly", () => {
        const { getByLabelText, getByText, getAllByPlaceholderText } = render(
            <OtpInput {...defaultProps} />
        );

        expect(getByLabelText("OTP")).toBeInTheDocument();
        expect(getByText("Enter the OTP")).toBeInTheDocument();
        expect(getByText("Resend OTP")).toBeInTheDocument();
        expect(getAllByPlaceholderText("0")).toHaveLength(6);
    });

    // it("calls onResend when the resend button is clicked", () => {
    //     const { getByText } = render(<OtpInput {...defaultProps} />);

    //     fireEvent.click(getByText("Resend OTP"));

    //     expect(defaultProps.onResend).toHaveBeenCalled();
    // });

    it("calls onChange when the input value changes", () => {
        const { getAllByPlaceholderText } = render(<OtpInput {...defaultProps} />);
        const inputElements = getAllByPlaceholderText("0");

        fireEvent.change(inputElements[0], { target: { value: "1" } });

        expect(defaultProps.onChange).toHaveBeenCalledWith(expect.any(Object), 0);
    });
});
