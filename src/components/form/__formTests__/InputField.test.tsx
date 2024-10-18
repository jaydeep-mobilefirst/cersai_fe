import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputField from "../InputField";

describe("InputField", () => {
    test("renders without error", () => {
        render(<InputField />);
        const inputElement = screen.getByRole("textbox");
        expect(inputElement).toBeInTheDocument();
    });

    test("applies custom height, width, and padding styles", () => {
        const height = "56px";
        const width = "200px";
        const padding = "4px 8px";
        render(<InputField height={height} width={width} padding={padding} />);
        const inputElement = screen.getByRole("textbox");
        expect(inputElement).toHaveStyle(`height: 56px`);
        expect(inputElement).toHaveStyle(`width: ${width}`);
        expect(inputElement).toHaveStyle(`padding: ${padding}`);
    });

    test("applies error styles when error prop is true", () => {
        render(<InputField error />);
        const inputElement = screen.getByRole("textbox");
        expect(inputElement).toHaveClass("border-[red] text-[red]");
    });



    test("passes rest props to the input element", () => {
        const dataTestId = "input-field";
        render(<InputField data-testid={dataTestId} />);
        const inputElement = screen.getByTestId(dataTestId);
        expect(inputElement).toBeInTheDocument();
    });

    // Add more test cases as needed
});
