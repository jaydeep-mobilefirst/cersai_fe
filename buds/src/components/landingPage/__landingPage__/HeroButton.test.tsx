import React from "react";
import { render, fireEvent } from "@testing-library/react";
import HeroButton from "../HeroButton";

describe("HeroButton", () => {
    test("renders button with correct text", () => {
        const text = "Click me";
        const { getByText } = render(<HeroButton text={text} onClick={() => {}} />);
        const buttonElement = getByText(text);
        expect(buttonElement).toBeInTheDocument();
    });

    test("calls onClick function when button is clicked", () => {
        const onClickMock = jest.fn();
        const text = "Click me";
        const { getByText } = render(<HeroButton text={text} onClick={onClickMock} />);
        const buttonElement = getByText(text);
        fireEvent.click(buttonElement);
        expect(onClickMock).toHaveBeenCalledWith(text);
    });
});
