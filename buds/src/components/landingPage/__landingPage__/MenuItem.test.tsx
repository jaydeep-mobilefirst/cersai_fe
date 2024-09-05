import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MenuItem from "../MenuItem";

describe("MenuItem", () => {
    const mockOnClick = jest.fn();

    it("renders correctly", () => {
        const { getByText } = render(
            <MenuItem text="Menu Item" onClick={mockOnClick} isActive={false} />
        );

        expect(getByText("Menu Item")).toBeInTheDocument();
    });

    it("calls onClick when clicked", () => {
        const { getByText } = render(
            <MenuItem text="Menu Item" onClick={mockOnClick} isActive={false} />
        );

        fireEvent.click(getByText("Menu Item"));

        expect(mockOnClick).toHaveBeenCalled();
    });

    it("applies active class when isActive is true", () => {
        const { container } = render(
            <MenuItem text="Menu Item" onClick={mockOnClick} isActive={true} />
        );

        expect(container.firstChild).toHaveClass("bg-[#0b2551]");
    });
});
