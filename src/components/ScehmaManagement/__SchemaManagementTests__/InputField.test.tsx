import React from "react";
import { render, screen } from "@testing-library/react";
import InputFields from "../InputField";

describe("InputFields", () => {
    it("renders without error", () => {
        render(<InputFields />);
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("applies custom height, width, and padding styles", () => {
        const height = "100px";
        const width = "200px";
        const padding = "10px 20px";

        render(<InputFields height={height} width={width} padding={padding} />);
        const inputElement = screen.getByRole("textbox");

        expect(inputElement).toHaveStyle(`height: ${height}`);
        expect(inputElement).toHaveStyle(`width: ${width}`);
        expect(inputElement).toHaveStyle(`padding: ${padding}`);
    });

    it("applies error styles when error prop is true", () => {
        render(<InputFields error />);
        const inputElement = screen.getByRole("textbox");

        expect(inputElement).toHaveClass("border-[red] text-[red]");
    });
});
