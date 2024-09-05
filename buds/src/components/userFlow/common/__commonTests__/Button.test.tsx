import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "../Button";

describe("Button component", () => {
    it("renders the button with the correct label", () => {
        const label = "Click me";
        const { getByText } = render(<Button label={label} type={"submit"} />);
        expect(getByText(label)).toBeInTheDocument();
    });

    it("calls the onClick function when clicked", () => {
        const onClick = jest.fn();
        const { getByText } = render(<Button label="Click me" onClick={onClick} type={"submit"} />);
        fireEvent.click(getByText("Click me"));
        expect(onClick).toHaveBeenCalled();
    });

    it("disables the button when disabled prop is true", () => {
        const { getByText } = render(<Button label="Click me" disabled type={"button"} />);
        expect(getByText("Click me")).toBeDisabled();
    });

    // Add more test cases as needed
});

