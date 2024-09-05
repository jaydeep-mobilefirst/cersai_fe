import React from "react";
import { render, fireEvent } from "@testing-library/react";
import UploadButtonV2 from "../UploadButtonV2";

describe("UploadButtonV2", () => {
    it("should render without errors", () => {
        render(<UploadButtonV2 />);
    });

    it("should call onFileUpload when a file is selected", () => {
        const onFileUpload = jest.fn();
        const { getByLabelText } = render(<UploadButtonV2 onFileUpload={onFileUpload} />);
        const fileInput = getByLabelText("Upload File");
        const file = new File(["test"], "test.png", { type: "image/png" });
        fireEvent.change(fileInput, { target: { files: [file] } });
        expect(onFileUpload).toHaveBeenCalledWith(file);
    });

    it("should call onFileUpload with null when no file is selected", () => {
        const onFileUpload = jest.fn();
        const { getByLabelText } = render(<UploadButtonV2 onFileUpload={onFileUpload} />);
        const fileInput = getByLabelText("Upload File");
        fireEvent.change(fileInput, { target: { files: [] } });
        expect(onFileUpload).toHaveBeenCalledWith(null);
    });

    // Add more test cases as needed
});

