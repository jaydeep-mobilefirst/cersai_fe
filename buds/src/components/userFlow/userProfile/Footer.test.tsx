import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
    it("renders the save button", () => {
        const { getByText } = render(<Footer />);
        const saveButton = getByText("Save and Continue");
        expect(saveButton).toBeInTheDocument();
    });

    it("calls onSubmit when save button is clicked", () => {
        const onSubmit = jest.fn();
        const { getByText } = render(<Footer onSubmit={onSubmit} />);
        const saveButton = getByText("Save and Continue");
        fireEvent.click(saveButton);
        expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it("disables the save button when disabled prop is true", () => {
        const { getByText } = render(<Footer disabled={true} />);
        const saveButton = getByText("Save and Continue");
        expect(saveButton).toBeDisabled();
    });

    it("renders the loader when loader prop is true", () => {
        const { getByTestId } = render(<Footer loader={true} />);
        const loader = getByTestId("loader");
        expect(loader).toBeInTheDocument();
    });
});

