import React from "react";
import { render, screen } from "@testing-library/react";
import InputField2 from "../InputField2";

describe("InputField2", () => {
    test("renders without error", () => {
        render(<InputField2 />);
        const inputElement = screen.getByRole("textbox");
        expect(inputElement).toBeInTheDocument();
    });

    test("applies custom height, width, and padding styles", () => {
        const height = "56px";
        const width = "200px";
        const padding = "4px 8px";
        render(<InputField2 height={height} width={width} padding={padding} />);
        const inputElement = screen.getByRole("textbox");
        expect(inputElement).toHaveStyle(`height: ${height}`);
        expect(inputElement).toHaveStyle(`width: ${width}`);
        expect(inputElement).toHaveStyle(`padding: ${padding}`);
    });

    test("applies error styles when error prop is true", () => {
        render(<InputField2 error />);
        const inputElement = screen.getByRole("textbox");
        expect(inputElement).toHaveClass("border-[red] text-[red]");
    });
});
