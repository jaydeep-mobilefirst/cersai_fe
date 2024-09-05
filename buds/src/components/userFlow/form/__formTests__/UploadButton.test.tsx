import React from "react";
import { render, fireEvent } from "@testing-library/react";
import UploadButton from "../UploadButton";

describe("UploadButton", () => {
    it("renders without errors", () => {
        render(<UploadButton />);
        // Add your assertion here
    });

    it("calls onFileUpload when a file is selected", () => {
        const onFileUpload = jest.fn();
        const { getByLabelText } = render(<UploadButton onFileUpload={onFileUpload} />);
        const fileInput = getByLabelText("Upload File");
        const file = new File(["test file"], "test.txt", { type: "text/plain" });
        fireEvent.change(fileInput, { target: { files: [file] } });
        // Add your assertion here
        expect(onFileUpload).toHaveBeenCalledWith(file);
    });

    it("updates fileSelected state when a file is selected", () => {
        const { getByLabelText } = render(<UploadButton />);
        const fileInput = getByLabelText("Upload File");
        const file = new File(["test file"], "test.txt", { type: "text/plain" });
        fireEvent.change(fileInput, { target: { files: [file] } });
        // Add your assertion here
        // You can access the fileSelected state using the component's instance or by querying the DOM
    });

    it("calls handleButtonClick when the button is clicked", () => {
        const handleButtonClick = jest.fn();
        const { getByRole } = render(<UploadButton handleButtonClick={handleButtonClick} />);
        const button = getByRole("button");
        fireEvent.click(button);
        // Add your assertion here
        expect(handleButtonClick).toHaveBeenCalled();
    });
});

