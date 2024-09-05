import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DscButton from "../Dscbutton";

describe("DscButton", () => {
    it("renders without errors", () => {
        render(<DscButton />);
    });

    // it("calls onFileUpload when a file is selected", () => {
    //     const onFileUpload = jest.fn();
    //     const { getByLabelText } = render(<DscButton onFileUpload={onFileUpload} />);
    //     const fileInput = getByLabelText("Upload DSC");
    //     const file = new File(["test"], "test.crt", { type: "application/x-x509-ca-cert" });
    //     fireEvent.change(fileInput, { target: { files: [file] } });
    //     expect(onFileUpload).toHaveBeenCalledWith(file);
    // });

    // it("calls onFileUpload with null when no file is selected", () => {
    //     const onFileUpload = jest.fn();
    //     const { getByLabelText } = render(<DscButton onFileUpload={onFileUpload} />);
    //     const fileInput = getByLabelText("Upload DSC");
    //     fireEvent.change(fileInput, { target: { files: [] } });
    //     expect(onFileUpload).toHaveBeenCalledWith(null);
    // });

    // it("disables the button when disabled prop is true", () => {
    //     const { getByRole } = render(<DscButton disabled />);
    //     const button = getByRole("button");
    //     expect(button).toBeDisabled();
    // });

    // it("enables the button when disabled prop is false", () => {
    //     const { getByRole } = render(<DscButton disabled={false} />);
    //     const button = getByRole("button");
    //     expect(button).not.toBeDisabled();
    // });
});
