import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TextArea from "../TextArea";

describe("TextArea", () => {
    it("renders without crashing", () => {
        render(<TextArea />);
    });

    it("renders with custom background color", () => {
        const { container } = render(<TextArea backgroundColor="customColor" />);
        const textarea = container.querySelector("textarea");
        expect(textarea).toHaveClass("customColor");
    });

    it("calls onChange callback when text is entered", () => {
        const onChange = jest.fn();
        const { container } = render(<TextArea onChange={onChange} />);
        const textarea = container.querySelector("textarea");
        if (textarea) {
            fireEvent.change(textarea, { target: { value: "Hello, World!" } });
            expect(onChange).toHaveBeenCalledTimes(1);
            expect(onChange).toHaveBeenCalledWith("Hello, World!");
        }
    });
});
