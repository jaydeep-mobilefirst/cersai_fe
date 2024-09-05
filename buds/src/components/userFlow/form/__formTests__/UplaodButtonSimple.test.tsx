import React from "react";
import { render, fireEvent } from "@testing-library/react";
import UploadButtonSimple from "../UploadButtonSimple";

describe("UploadButtonSimple", () => {
    it("should call onFileUpload when a file is selected", () => {
        const onFileUpload = jest.fn();
        const { getByLabelText } = render(<UploadButtonSimple onFileUpload={onFileUpload} />);
        const fileInput = getByLabelText("Upload File");

        fireEvent.change(fileInput, { target: { files: [new File([], "test.png")] } });

        expect(onFileUpload).toHaveBeenCalledWith(expect.any(File));
    });

    it("should call onFileUpload with null when no file is selected", () => {
        const onFileUpload = jest.fn();
        const { getByLabelText } = render(<UploadButtonSimple onFileUpload={onFileUpload} />);
        const fileInput = getByLabelText("Upload File");

        fireEvent.change(fileInput, { target: { files: [] } });

        expect(onFileUpload).toHaveBeenCalledWith(null);
    });
});

