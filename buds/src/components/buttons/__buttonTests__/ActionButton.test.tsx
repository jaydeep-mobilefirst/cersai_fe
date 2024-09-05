import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ActionButton from "../ActionButton";

describe("ActionButton", () => {
    it("renders with default props", () => {
        const { getByAltText } = render(<ActionButton />);
        const button = getByAltText("edit Icon");
        expect(button).toBeInTheDocument();
    });

    it("renders with specified variant", () => {
        const { getByAltText } = render(<ActionButton variant="delete" />);
        const button = getByAltText("delete Icon");
        expect(button).toBeInTheDocument();
    });

    it("calls onClick handler when clicked", () => {
        const onClick = jest.fn();
        const { getByAltText } = render(<ActionButton onClick={onClick} />);
        const button = getByAltText("edit Icon");
        fireEvent.click(button);
        expect(onClick).toHaveBeenCalled();
    });
});

