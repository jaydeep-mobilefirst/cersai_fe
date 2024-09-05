import React from "react";
import { render, fireEvent } from "@testing-library/react";
import InputFields from "../InputField";

describe("InputFields", () => {
    // it("renders a text input field", () => {
    //     const { getByRole } = render(<InputFields type="text" />);
    //     const inputElement = getByRole("textbox");
    //     expect(inputElement).toBeInTheDocument();
    // });

    // it("renders a date input field", () => {
    //     const { getByRole } = render(<InputFields type="date" />);
    //     const inputElement = getByRole("textbox");
    //     expect(inputElement).toBeInTheDocument();
    // });

    // it("calls onChangeHandler when input value changes", () => {
    //     const onChangeHandler = jest.fn();
    //     const { getByRole } = render(
    //         <InputFields type="text" onChange={onChangeHandler} />
    //     );
    //     const inputElement = getByRole("textbox");
    //     fireEvent.change(inputElement, { target: { value: "Test" } });
    //     expect(onChangeHandler).toHaveBeenCalledTimes(1);
    // });

    // it("calls handleDateButtonClick when date button is clicked", () => {
    //     const handleDateButtonClick = jest.fn();
    //     const { getByRole } = render(
    //         <InputFields type="date" onChange={handleDateButtonClick} />
    //     );
    //     const buttonElement = getByRole("button");
    //     fireEvent.click(buttonElement);
    //     expect(handleDateButtonClick).toHaveBeenCalledTimes(1);
    // });
});

