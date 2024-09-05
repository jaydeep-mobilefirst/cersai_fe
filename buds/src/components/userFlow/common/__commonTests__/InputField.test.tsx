import React from "react";
import { render, fireEvent } from "@testing-library/react";
import InputFields from "../InputField";

describe("InputFields", () => {
    it("renders without error", () => {
        render(<InputFields />);
    });

    it("renders with default props", () => {
        const { getByTestId } = render(<InputFields />);
        const inputElement = getByTestId("input-field");
        
        expect(inputElement).toHaveStyle("height: 56px");
        expect(inputElement).toHaveStyle("width: 100%");
        expect(inputElement).toHaveStyle("padding: 8px 16px");
        expect(inputElement).toHaveStyle("color: gray");
        expect(inputElement).toHaveStyle("background-color: white");
    });

    it("renders with custom props", () => {
        const { getByTestId } = render(
            <InputFields
                height="40px"
                width="200px"
                padding="4px 8px"
                error
                disabled
                backgroundColor="blue"
            />
        );
        const inputElement = getByTestId("input-field");
        
        expect(inputElement).toHaveStyle("height: 40px");
        expect(inputElement).toHaveStyle("width: 200px");
        expect(inputElement).toHaveStyle("padding: 4px 8px");
        expect(inputElement).toHaveStyle("color: red");
        expect(inputElement).toHaveStyle("background-color: blue");
    });

    it("triggers onChange event", () => {
        const handleChange = jest.fn();
        const { getByTestId } = render(<InputFields onChange={handleChange} />);
        const inputElement = getByTestId("input-field");

        fireEvent.change(inputElement, { target: { value: "Hello" } });

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
    });
});
