import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TextArea from "../TextArea";

describe("TextArea", () => {
    test("renders without errors", () => {
        render(<TextArea />);
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    test("applies default background color when not provided", () => {
        render(<TextArea />);
        const textarea = screen.getByRole("textbox");
        expect(textarea).toHaveStyle({ backgroundColor: "white" });
    });

    test("applies custom background color when provided", () => {
        render(<TextArea backgroundColor="red" />);
        const textarea = screen.getByRole("textbox");
        expect(textarea).toHaveStyle({ backgroundColor: "red" });
    });

    test("applies custom class name", () => {
        render(<TextArea className="custom-class" />);
        const textarea = screen.getByRole("textbox");
        expect(textarea).toHaveClass("custom-class");
    });

    test("applies custom placeholder", () => {
        render(<TextArea placeholder="Enter your text" />);
        const textarea = screen.getByRole("textbox");
        expect(textarea).toHaveAttribute("placeholder", "Enter your text");
    });

    test("triggers onChange event", () => {
        const handleChange = jest.fn();
        render(<TextArea onChange={handleChange} />);
        const textarea = screen.getByRole("textbox");
        userEvent.type(textarea, "Hello");
        expect(handleChange).toHaveBeenCalledTimes(5);
    });
});

