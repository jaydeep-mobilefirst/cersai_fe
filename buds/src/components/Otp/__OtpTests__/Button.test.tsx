import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "../Button";

describe("Button component", () => {
    test("renders button with label", () => {
        const label = "Submit";
        const { getByText } = render(<Button label={label} variant="filled" />);
        const buttonElement = getByText(label);
        expect(buttonElement).toBeInTheDocument();
    });

    test("calls onClick handler when button is clicked", () => {
        const onClick = jest.fn();
        const { getByText } = render(
            <Button label="Submit" variant="filled" onClick={onClick} />
        );
        const buttonElement = getByText("Submit");
        fireEvent.click(buttonElement);
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    test("disables button when disabled prop is true", () => {
        const { getByText } = render(
            <Button label="Submit" variant="filled" disabled={true} />
        );
        const buttonElement = getByText("Submit");
        expect(buttonElement).toBeDisabled();
    });

    test("renders loader when loader prop is true", () => {
        const { getByTestId } = render(
            <Button label="Submit" variant="filled" loader={true} />
        );
        const loaderElement = getByTestId("loader");
        expect(loaderElement).toBeInTheDocument();
    });
});

