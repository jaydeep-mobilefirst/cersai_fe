import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TextArea from "../TextArea";

describe("TextArea", () => {
    test("renders without errors", () => {
        render(<TextArea />);
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    test("applies default props correctly", () => {
        render(<TextArea />);
        const textarea = screen.getByRole("textbox");

        expect(textarea).toHaveStyle({ backgroundColor: "#ffffff" });
        expect(textarea).toHaveClass("form-textarea");
        // expect(textarea).toHaveAttribute("placeholder", "");
    });

    test("applies custom props correctly", () => {
        render(<TextArea mdWidth="500px" bgColor="#f0f0f0" placeholder="Enter text" />);
        const textarea = screen.getByRole("textbox");

        expect(textarea).toHaveStyle({ backgroundColor: "#f0f0f0" });
        expect(textarea).toHaveClass("form-textarea");
        expect(textarea).toHaveAttribute("placeholder", "Enter text");
    });

    test("triggers onChange event correctly", () => {
        const handleChange = jest.fn();
        render(<TextArea onChange={handleChange} />);
        const textarea = screen.getByRole("textbox");

        userEvent.type(textarea, "Hello, World!");

        expect(handleChange).toHaveBeenCalledTimes(13); // Number of characters typed
        expect(handleChange).toHaveBeenCalledWith(expect.anything());
    });
});
