import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ButtonAuth from "../ButtonAuth";

describe("ButtonAuth", () => {
    it("renders the button with the correct label", () => {
        const label = "Submit";
        const { getByText } = render(<ButtonAuth label={label} />);
        expect(getByText(label)).toBeInTheDocument();
    });

    it("applies the basic variant styles by default", () => {
        const { container } = render(<ButtonAuth label="Button" />);
        expect(container.firstChild).toHaveClass("bg-[#1C468E] text-white font-normal");
    });

    it("applies the outline variant styles when variant prop is set to 'outline'", () => {
        const { container } = render(<ButtonAuth label="Button" variant="outline" />);
        expect(container.firstChild).toHaveClass("border border-green-700 text-green-600");
    });

    it("applies the disabled style when disabled prop is set to true", () => {
        const { container } = render(<ButtonAuth label="Button" disabled />);
        expect(container.firstChild).toHaveClass("opacity-50");
    });

    it("calls the onClick handler when the button is clicked", () => {
        const onClick = jest.fn();
        const { getByText } = render(<ButtonAuth label="Button" onClick={onClick} />);
        fireEvent.click(getByText("Button"));
        expect(onClick).toHaveBeenCalled();
    });
});
